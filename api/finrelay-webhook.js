import { createHash } from 'node:crypto';
import { importSPKI, jwtVerify } from 'jose';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const sirovoTijelo = await request.text();

  const authHeader = request.headers.get('authorization') ?? '';
  const [shema, token] = authHeader.split(' ');

  if (shema !== 'Bearer' || !token) {
    console.warn('Webhook bez Bearer tokena — odbijen.');
    return new Response('Unauthorized', { status: 401 });
  }

  const javniKljuc = process.env.FINRELAY_MERCHANT_PUBLIC_KEY;
  if (!javniKljuc) {
    console.error('FINRELAY_MERCHANT_PUBLIC_KEY nije postavljen.');
    return new Response('Server misconfigured', { status: 500 });
  }

  try {
    const kljuc = await importSPKI(javniKljuc.replace(/\\n/g, '\n'), 'RS256');
    const { payload } = await jwtVerify(token, kljuc);

    const ocekivani = payload?.data?.SHA512;
    if (!ocekivani) {
      console.warn('JWT bez SHA512 claima — odbijen.');
      return new Response('Unauthorized', { status: 401 });
    }

    const hex = createHash('sha512').update(sirovoTijelo, 'utf8').digest('hex');
    const b64 = createHash('sha512').update(sirovoTijelo, 'utf8').digest('base64');

    const odgovara =
      ocekivani.toLowerCase() === hex.toLowerCase() || ocekivani === b64;

    if (!odgovara) {
      console.warn('Digest se ne poklapa — odbijen.');
      return new Response('Unauthorized', { status: 401 });
    }

  } catch (e) {
    console.warn('Verifikacija webhooka pala:', e.message);
    return new Response('Unauthorized', { status: 401 });
  }

  let dogadjaj;
  try {
    dogadjaj = JSON.parse(sirovoTijelo);
  } catch {
    return new Response('Bad request', { status: 400 });
  }

  const { event, payload: t } = dogadjaj;
  const reference = t?.reference;
  const iznos = t?.amount ? (t.amount / 100).toFixed(2) : '?';

  console.log('Webhook:', { event, reference, status: t?.status, amount: t?.amount });

  if (t?.status === 'APPROVED' && t?.processing_code === '0000') {
    console.log(`PLAĆENO: ${reference} — ${iznos} EUR`);

    try {
      await resend.emails.send({
        from: 'Cvjećara Šćekić <onboarding@resend.dev>',
        to: 'scekiccvjecara@hotmail.com',
        subject: `Nova narudžba karticom — ${iznos} EUR`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
            <h2 style="color: #2d6a4f;">Nova narudžba karticom! 🌸</h2>
            <p>Primljeno je kartično plaćanje.</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Referenca</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${reference}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Narudžba</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${t?.description || 'Nije navedeno'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Iznos</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${iznos} EUR</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Ime kupca</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${t?.customer_first_name || ''} ${t?.customer_last_name || ''}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Email kupca</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${t?.customer_email || 'Nije naveden'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Telefon</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${t?.customer_phone_number || 'Nije naveden'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Adresa</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${t?.customer_address || ''}, ${t?.customer_city || ''}</td>
              </tr>
            </table>
            <p style="margin-top: 24px; color: #666; font-size: 14px;">
              Kontaktirajte kupca radi potvrde i dostave.
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

  return new Response('OK', { status: 200 });
}
