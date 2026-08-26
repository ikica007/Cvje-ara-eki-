import { createHash } from 'node:crypto';
import { importSPKI, jwtVerify } from 'jose';

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

  console.log('Webhook:', { event, reference, status: t?.status, amount: t?.amount });

  if (t?.status === 'APPROVED' && t?.processing_code === '0000') {
    console.log(`PLAĆENO: ${reference} — ${(t.amount / 100).toFixed(2)} EUR`);
  } else {
    console.log(`NIJE PLAĆENO: ${reference} — ${t?.status} (${t?.response_message})`);
  }

  return new Response('OK', { status: 200 });
}
