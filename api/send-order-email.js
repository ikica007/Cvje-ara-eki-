import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { customer, delivery, items, amount, reference } = req.body ?? {};

  if (!customer?.name) {
    return res.status(400).json({ error: 'Podaci nisu kompletni.' });
  }

  const stavke = items && items.length > 0
    ? items.map(i => `${i.quantity}x ${i.name} — ${(i.price).toFixed(2)} EUR`).join('<br>')
    : 'Nije navedeno';

  try {
    await resend.emails.send({
      from: 'Cvjećara Šćekić <noreply@cvjecarascekic.me>',
      to: 'scekiccvjecara@hotmail.com',
      subject: `Nova narudžba — ${amount?.toFixed(2)} EUR`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 24px; color: #1a1a1a;">

          <h2 style="color: #2d6a4f; margin-bottom: 4px;">🌸 Nova narudžba!</h2>
          <p style="color: #666; margin-top: 0; margin-bottom: 24px;">Zaprimljena narudžba putem web sajta.</p>

          <!-- NARUDŽBA -->
          <div style="background: #f0f7f4; border-radius: 10px; padding: 16px; margin-bottom: 20px;">
            <p style="margin: 0 0 10px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #2d6a4f; font-weight: bold;">Narudžba</p>
            <p style="margin: 0; font-size: 15px; color: #1a1a1a;">${stavke}</p>
            <p style="margin: 10px 0 0 0; font-size: 18px; font-weight: bold; color: #2d6a4f;">${amount?.toFixed(2)} EUR</p>
          </div>

          <!-- DVE KOLONE -->
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="width: 50%; vertical-align: top; padding-right: 10px;">
                <div style="border: 1px solid #eee; border-radius: 10px; padding: 16px;">
                  <p style="margin: 0 0 12px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888; font-weight: bold;">Podaci naručioca</p>
                  <p style="margin: 0 0 4px 0; font-weight: 600; font-size: 14px;">${customer.name}</p>
                  <p style="margin: 0 0 4px 0; font-size: 13px; color: #555;">
                    <a href="tel:${customer.phone}" style="color: #2d6a4f; text-decoration: none;">${customer.phone || 'Nije naveden'}</a>
                  </p>
                  <p style="margin: 0; font-size: 13px; color: #555;">
                    <a href="mailto:${customer.email}" style="color: #2d6a4f; text-decoration: none;">${customer.email || 'Nije naveden'}</a>
                  </p>
                </div>
              </td>
              <td style="width: 50%; vertical-align: top; padding-left: 10px;">
                <div style="border: 1px solid #eee; border-radius: 10px; padding: 16px;">
                  <p style="margin: 0 0 12px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888; font-weight: bold;">Adresa za dostavu</p>
                  <p style="margin: 0 0 4px 0; font-weight: 600; font-size: 14px;">${delivery?.recipientName || customer.name}</p>
                  <p style="margin: 0 0 4px 0; font-size: 13px; color: #555;">${delivery?.address || 'Nije navedena'}</p>
                  <p style="margin: 0 0 4px 0; font-size: 13px; color: #555;">${delivery?.city || ''}</p>
                  ${delivery?.recipientPhone ? `<p style="margin: 0; font-size: 13px; color: #555;"><a href="tel:${delivery.recipientPhone}" style="color: #2d6a4f; text-decoration: none;">${delivery.recipientPhone}</a></p>` : ''}
                </div>
              </td>
            </tr>
          </table>

          <!-- DATUM I PORUKA -->
          ${delivery?.date || delivery?.message ? `
          <div style="border: 1px solid #eee; border-radius: 10px; padding: 16px; margin-bottom: 20px;">
            <p style="margin: 0 0 12px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888; font-weight: bold;">Dodatne informacije</p>
            <table style="width: 100%; border-collapse: collapse;">
              ${delivery?.date ? `
              <tr>
                <td style="padding: 5px 0; color: #888; width: 40%; font-size: 13px;">Datum isporuke</td>
                <td style="padding: 5px 0; font-weight: 500; font-size: 13px;">${delivery.date}</td>
              </tr>` : ''}
              ${delivery?.message ? `
              <tr>
                <td style="padding: 5px 0; color: #888; font-size: 13px; vertical-align: top;">Poruka</td>
                <td style="padding: 5px 0; font-size: 13px; font-style: italic;">"${delivery.message}"</td>
              </tr>` : ''}
            </table>
          </div>` : ''}

          <!-- REFERENCA -->
          <p style="color: #bbb; font-size: 11px;">Referenca: ${reference || 'N/A'}</p>

          <div style="padding: 12px 16px; background: #fff8e1; border-radius: 8px; border-left: 3px solid #f9a825;">
            <p style="margin: 0; color: #795548; font-size: 13px;">⏳ Čeka se potvrda plaćanja karticom.</p>
          </div>
        </div>
      `,
    });

    console.log('Email narudžbe poslan.');
    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error('Greška pri slanju emaila narudžbe:', err.message);
    return res.status(500).json({ error: 'Email nije poslan.' });
  }
}
