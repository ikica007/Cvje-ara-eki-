import { Resend } from 'resend';

const USER_AGENT = 'CvjecaraScekic/1.0 (+https://cvjecarascekic.vercel.app)';

function ocisti(val) {
  return (val || '').replace(/\s+/g, '').replace(/\/+$/, '');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ greska: 'Dozvoljen je samo POST.' });
  }

  const env = {
    tokenUrl: ocisti(process.env.FINRELAY_TOKEN_URL),
    apiUrl: ocisti(process.env.FINRELAY_API_URL),
    clientId: ocisti(process.env.FINRELAY_CLIENT_ID),
    clientSecret: ocisti(process.env.FINRELAY_CLIENT_SECRET),
    terminalId: ocisti(process.env.FINRELAY_TERMINAL_ID),
    siteUrl: ocisti(process.env.SITE_URL),
  };

  const nedostaje = Object.entries(env)
    .filter(([, v]) => !v)
    .map(([k]) => k);

  if (nedostaje.length) {
    console.error('Nedostaju env varijable:', nedostaje.join(', '));
    return res.status(500).json({ error: 'Plaćanje trenutno nije dostupno.' });
  }

  const { amount, customer, delivery, items } = req.body ?? {};

  const centi = Math.round((amount || 0) * 100);

  if (!centi || centi < 100 || centi > 500000) {
    return res.status(400).json({ error: 'Neispravan iznos.' });
  }

  if (!customer?.name) {
    return res.status(400).json({ error: 'Ime je obavezno.' });
  }

  const dijelovi = customer.name.trim().split(/\s+/);
  const ime = dijelovi[0] || '';
  const prezime = dijelovi.slice(1).join(' ') || '';

  const stavke = items && items.length > 0
    ? items.map(i => `${i.quantity}x ${i.name}${i.price ? ` — ${Number(i.price).toFixed(2)} EUR` : ''}`).join('<br>')
    : 'Nije navedeno';

  const reference = `CS-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const successLink = `${env.siteUrl}/?payment=success&ref=${reference}`;
  const errorLink = `${env.siteUrl}/?payment=error&ref=${reference}`;
  const cancelLink = `${env.siteUrl}/?payment=cancel&ref=${reference}`;

  try {
    // 1. Token
    const tokenRes = await fetch(env.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'User-Agent': USER_AGENT,
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: env.clientId,
        client_secret: env.clientSecret,
      }),
    });

    const tokenTekst = await tokenRes.text();
    if (!tokenRes.ok) {
      return res.status(502).json({ error: 'Plaćanje trenutno nije dostupno.' });
    }

    const { access_token } = JSON.parse(tokenTekst);
    if (!access_token) {
      return res.status(502).json({ error: 'Plaćanje trenutno nije dostupno.' });
    }

    // 2. HPP
    const opisDijelovi = [
      items?.map(i => `${i.quantity}x ${i.name}`).join(', ') || 'Narudžba',
      delivery?.recipientName ? `Primalac: ${delivery.recipientName}` : '',
    ].filter(Boolean);

    const opis = opisDijelovi.join(' | ').slice(0, 100);

    const hppRes = await fetch(`${env.apiUrl}/api/hosted-payment-page`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'User-Agent': USER_AGENT,
        'Authorization': `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        reference,
        terminal_id: env.terminalId,
        currency: 'EUR',
        amount: centi,
        transaction_type: 'PURCHASE',
        description: opis,
        return_url: successLink,
        successUrl: successLink,
        success_url: successLink,
        errorUrl: errorLink,
        error_url: errorLink,
        cancelUrl: cancelLink,
        cancel_url: cancelLink,
        customer_first_name: cist(ime, 100),
        customer_last_name: cist(prezime, 100),
        customer_email: cist(customer.email, 200),
        customer_phone_number: cist(customer.phone, 20),
        customer_address: cist(delivery?.address || customer.address, 200),
        customer_city: cist(delivery?.city || customer.city, 100),
        customer_country: 'ME',
      }),
    });

    const hppTekst = await hppRes.text();

    if (!hppRes.ok || !hppTekst.trim()) {
      console.error('HPP greška:', hppRes.status, hppTekst);
      return res.status(502).json({ error: `Plaćanje nije dostupno (${hppRes.status}).` });
    }

    const hppData = JSON.parse(hppTekst);
    console.log('Sesija kreirana:', { reference, amount: centi });

    // 3. Pošalji email sa detaljima narudžbe
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'Cvjećara Šćekić <noreply@cvjecarascekic.me>',
        to: 'scekiccvjecara@hotmail.com',
        subject: `Nova narudžba — ${(centi / 100).toFixed(2)} EUR`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 24px; color: #1a1a1a;">
            <h2 style="color: #2d6a4f; margin-bottom: 4px;">🌸 Nova narudžba!</h2>
            <p style="color: #666; margin-top: 0; margin-bottom: 24px;">Zaprimljena narudžba — čeka se potvrda plaćanja karticom.</p>

            <div style="background: #f0f7f4; border-radius: 10px; padding: 16px; margin-bottom: 20px;">
              <p style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #2d6a4f; font-weight: bold;">Narudžba</p>
              <p style="margin: 0; font-size: 15px; color: #1a1a1a;">${stavke}</p>
              <p style="margin: 10px 0 0 0; font-size: 18px; font-weight: bold; color: #2d6a4f;">${(centi / 100).toFixed(2)} EUR</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="width: 50%; vertical-align: top; padding-right: 10px;">
                  <div style="border: 1px solid #eee; border-radius: 10px; padding: 16px;">
                    <p style="margin: 0 0 12px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888; font-weight: bold;">Podaci naručioca</p>
                    <p style="margin: 0 0 4px 0; font-weight: 600; font-size: 14px;">${customer.name}</p>
                    <p style="margin: 0 0 4px 0; font-size: 13px; color: #555;"><a href="tel:${customer.phone}" style="color: #2d6a4f; text-decoration: none;">${customer.phone || 'Nije naveden'}</a></p>
                    <p style="margin: 0; font-size: 13px; color: #555;"><a href="mailto:${customer.email}" style="color: #2d6a4f; text-decoration: none;">${customer.email || 'Nije naveden'}</a></p>
                  </div>
                </td>
                <td style="width: 50%; vertical-align: top; padding-left: 10px;">
                  <div style="border: 1px solid #eee; border-radius: 10px; padding: 16px;">
                    <p style="margin: 0 0 12px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888; font-weight: bold;">Adresa za dostavu</p>
                    <p style="margin: 0 0 4px 0; font-weight: 600; font-size: 14px;">${delivery?.recipientName || customer.name}</p>
                    <p style="margin: 0 0 4px 0; font-size: 13px; color: #555;">${delivery?.address || 'Nije navedena'}</p>
                    <p style="margin: 0 0 4px 0; font-size: 13px; color: #555;">${delivery?.city || ''}</p>
                    ${delivery?.recipientPhone ? `<p style="margin: 0; font-size: 13px;"><a href="tel:${delivery.recipientPhone}" style="color: #2d6a4f; text-decoration: none;">${delivery.recipientPhone}</a></p>` : ''}
                  </div>
                </td>
              </tr>
            </table>

            ${delivery?.date || delivery?.message ? `
            <div style="border: 1px solid #eee; border-radius: 10px; padding: 16px; margin-bottom: 20px;">
              <p style="margin: 0 0 12px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888; font-weight: bold;">Dodatne informacije</p>
              <table style="width: 100%; border-collapse: collapse;">
                ${delivery?.date ? `<tr><td style="padding: 5px 0; color: #888; width: 40%; font-size: 13px;">Datum isporuke</td><td style="padding: 5px 0; font-weight: 500; font-size: 13px;">${delivery.date}</td></tr>` : ''}
                ${delivery?.message ? `<tr><td style="padding: 5px 0; color: #888; font-size: 13px; vertical-align: top;">Poruka</td><td style="padding: 5px 0; font-size: 13px; font-style: italic;">"${delivery.message}"</td></tr>` : ''}
              </table>
            </div>` : ''}

            <p style="color: #bbb; font-size: 11px;">Referenca: ${reference}</p>
            <div style="padding: 12px 16px; background: #fff8e1; border-radius: 8px; border-left: 3px solid #f9a825;">
              <p style="margin: 0; color: #795548; font-size: 13px;">⏳ Čeka se potvrda plaćanja karticom.</p>
            </div>
          </div>
        `,
      });
      console.log('Email narudžbe poslan.');
    } catch (emailErr) {
      console.error('Email greška:', emailErr.message);
    }

    return res.status(200).json({
      redirectUrl: hppData.redirect_url,
      reference,
    });

  } catch (e) {
    console.error('Neočekivana greška:', e.message);
    return res.status(500).json({ error: 'Plaćanje trenutno nije dostupno.' });
  }
}

function cist(vrijednost, maxDuzina) {
  if (!vrijednost) return undefined;
  return String(vrijednost)
    .replace(/[<>"'`\\]/g, '')
    .replace(/\.\.\//g, '')
    .trim()
    .slice(0, maxDuzina) || undefined;
}
