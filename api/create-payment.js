const USER_AGENT = 'CvjecaraScekic/1.0 (+https://cvjecarascekic.vercel.app)';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ greska: 'Dozvoljen je samo POST.' });
  }

  const env = {
    tokenUrl: process.env.FINRELAY_TOKEN_URL,
    apiUrl: process.env.FINRELAY_API_URL,
    clientId: process.env.FINRELAY_CLIENT_ID,
    clientSecret: process.env.FINRELAY_CLIENT_SECRET,
    terminalId: process.env.FINRELAY_TERMINAL_ID,
    siteUrl: process.env.SITE_URL,
  };

  const nedostaje = Object.entries(env)
    .filter(([, v]) => !v)
    .map(([k]) => k);

  if (nedostaje.length) {
    console.error('Nedostaju env varijable:', nedostaje.join(', '));
    return res.status(500).json({ error: 'Plaćanje trenutno nije dostupno.' });
  }

  const { amount, customer, items } = req.body ?? {};

  // amount dolazi u eurima (75.00), Finrelay treba cente (7500)
  const centi = Math.round((amount || 0) * 100);

  if (!centi || centi < 100 || centi > 500000) {
    console.error('Neispravan iznos:', amount, '→', centi);
    return res.status(400).json({ error: 'Neispravan iznos.' });
  }

  if (!customer?.name) {
    return res.status(400).json({ error: 'Ime je obavezno.' });
  }

  // Razdvoji ime i prezime
  const dijelovi = customer.name.trim().split(/\s+/);
  const ime = dijelovi[0] || '';
  const prezime = dijelovi.slice(1).join(' ') || '';

  // Opis za Finrelay (max 100 znakova)
  let opis = 'Narudžba sa sajta';
  if (items && items.length > 0) {
    opis = items.map(i => `${i.quantity}x ${i.name}`).join(', ').slice(0, 100);
  }

  const reference = `CS-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  try {
    // 1. Token
    console.log('Tražim token...');
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
    console.log('Token status:', tokenRes.status);

    if (!tokenRes.ok) {
      console.error('Token greška:', tokenRes.status, tokenTekst);
      return res.status(502).json({ error: 'Plaćanje trenutno nije dostupno.' });
    }

    let tokenData;
    try {
      tokenData = JSON.parse(tokenTekst);
    } catch {
      console.error('Token nije JSON:', tokenTekst.slice(0, 200));
      return res.status(502).json({ error: 'Plaćanje trenutno nije dostupno.' });
    }

    const access_token = tokenData.access_token;
    if (!access_token) {
      console.error('Nema access_token:', Object.keys(tokenData));
      return res.status(502).json({ error: 'Plaćanje trenutno nije dostupno.' });
    }

    console.log('Token dobijen, pravim HPP sesiju...');

    // 2. HPP
    const hppUrl = `${env.apiUrl}/api/hosted-payment-page`;
    const hppBody = {
      reference,
      terminal_id: env.terminalId,
      currency: 'EUR',
      amount: centi,
      transaction_type: 'PURCHASE',
      description: opis,
      return_url: `${env.siteUrl}/?payment=success&ref=${reference}`,
      customer_first_name: cist(ime, 100),
      customer_last_name: cist(prezime, 100),
      customer_email: cist(customer.email, 200),
      customer_phone_number: cist(customer.phone, 20),
      customer_address: cist(customer.address, 200),
      customer_city: cist(customer.city, 100),
      customer_country: 'ME',
      customer_postal_code: cist(customer.postalCode, 20),
    };

    console.log('HPP URL:', hppUrl);
    console.log('HPP body:', JSON.stringify(hppBody));

    const hppRes = await fetch(hppUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'User-Agent': USER_AGENT,
        'Authorization': `Bearer ${access_token}`,
      },
      body: JSON.stringify(hppBody),
    });

    const hppTekst = await hppRes.text();
    console.log('HPP status:', hppRes.status);
    console.log('HPP odgovor:', hppTekst.slice(0, 500));

    if (!hppRes.ok) {
      console.error('HPP greška:', hppRes.status, hppTekst);
      return res.status(502).json({ error: `Plaćanje nije dostupno (${hppRes.status}).` });
    }

    if (!hppTekst || hppTekst.trim() === '') {
      console.error('HPP vratio prazan odgovor');
      return res.status(502).json({ error: 'Plaćanje nije dostupno.' });
    }

    let hppData;
    try {
      hppData = JSON.parse(hppTekst);
    } catch {
      console.error('HPP nije JSON:', hppTekst.slice(0, 200));
      return res.status(502).json({ error: 'Plaćanje nije dostupno.' });
    }

    console.log('Sesija kreirana:', { reference, session_id: hppData.session_id, amount: centi });

    // Frontend očekuje redirectUrl
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
