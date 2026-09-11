import { createHash } from 'node:crypto';
import { importSPKI, jwtVerify } from 'jose';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const sirovoTijelo = await getRawBody(req);

  const authHeader = req.headers['authorization'] ?? '';
  const [shema, token] = authHeader.split(' ');

  if (shema !== 'Bearer' || !token) {
    console.warn('Webhook bez Bearer tokena — odbijen.');
    return res.status(401).send('Unauthorized');
  }

  const javniKljuc = process.env.FINRELAY_MERCHANT_PUBLIC_KEY;
  if (!javniKljuc) {
    console.error('FINRELAY_MERCHANT_PUBLIC_KEY nije postavljen.');
    return res.status(500).send('Server misconfigured');
  }

  try {
    const kljuc = await importSPKI(javniKljuc.replace(/\\n/g, '\n'), 'RS256');
    const { payload } = await jwtVerify(token, kljuc);

    const ocekivani = payload?.data?.SHA512;
    if (!ocekivani) {
      console.warn('JWT bez SHA512 claima — odbijen.');
      return res.status(401).send('Unauthorized');
    }

    const hex = createHash('sha512').update(sirovoTijelo, 'utf8').digest('hex');
    const b64 = createHash('sha512').update(sirovoTijelo, 'utf8').digest('base64');

    const odgovara =
      ocekivani.toLowerCase() === hex.toLowerCase() || ocekivani === b64;

    if (!odgovara) {
      console.warn('Digest se ne poklapa — odbijen.');
      return res.status(401).send('Unauthorized');
    }

  } catch (e) {
    console.warn('Verifikacija webhooka pala:', e.message);
    return res.status(401).send('Unauthorized');
  }

  let dogadjaj;
  try {
    dogadjaj = JSON.parse(sirovoTijelo);
  } catch {
    return res.status(400).send('Bad request');
  }

  const { event, payload: t } = dogadjaj;
  const reference = t?.reference;
  const iznos = t?.amount ? (t.amount / 100).toFixed(2) : '?';
  const narudzba = t?.description || 'Nije navedeno';

  console.log('Webhook:', { event, reference, status: t?.status, amount: t?.amount });

  if (t?.status === 'APPROVED' && t?.processing_code === '0000') {
    console.log(`PLAĆENO: ${reference} — ${iznos} EUR`);

    try {
      await resend.emails.send({
        from: 'Cvjećara Šćekić <noreply@cvjecarascekic.me>',
        to: 'scekiccvjecara@hotmail.com',
        subject: `Nova narudžba karticom — ${iznos} EUR`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2d6a4f; margin-bottom: 20px;">🌸 Nova narudžba karticom!</h2>
            <p style="color: #444;">Primljeno je kartično plaćanje. Kontaktirajte kupca radi potvrde i dostave.</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr style="background: #f9f9f9;">
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #888; width: 40%;">Narudžba</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; font-weight: bold; color: #2d6a4f;">${narudzba}</td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #888;">Iznos</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; font-weight: bold;">${iznos} EUR</td>
              </tr>
              <tr style="background: #f9f9f9;">
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #888;">Ime kupca</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee;">${t?.customer_first_name || ''} ${t?.customer_last_name || ''}</td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #888;">Telefon</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee;">${t?.customer_phone_number || 'Nije naveden'}</td>
              </tr>
              <tr style="background: #f9f9f9;">
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #888;">Email kupca</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee;">${t?.customer_email || 'Nije naveden'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #888;">Adresa dostave</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee;">${t?.customer_address || ''}, ${t?.customer_city || ''}</td>
              </tr>
              <tr style="background: #f9f9f9;">
                <td style="padding: 10px 12px; color: #888;">Referenca</td>
                <td style="padding: 10px 12px; font-size: 12px; color: #999;">${reference}</td>
              </tr>
            </table>
            <p style="margin-top: 24px; padding: 12px; background: #f0f7f4; border-radius: 8px; color: #2d6a4f; font-size: 14px;">
              ✅ Plaćanje potvrđeno — možete pripremiti narudžbu.
            </p>
          </div>
        `,
      });
      console.log('Email poslan cvjećari.');
    } catch (emailErr) {
      console.error('Greška pri slanju emaila:', emailErr.message);
    }

  } else {
    console.log(`NIJE PLAĆENO: ${reference} — ${t?.status} (${t?.response_message})`);
  }

  return res.status(200).send('OK');
}
