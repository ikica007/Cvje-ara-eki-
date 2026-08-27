import { createHash } from 'node:crypto';
import { importSPKI, jwtVerify } from 'jose';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const sirovoTijelo = JSON.stringify(req.body);

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

  const { event, payload: t } = req.body;
  const reference = t?.reference;

  console.log('Webhook:', { event, reference, status: t?.status, amount: t?.amount });

  if (t?.status === 'APPROVED' && t?.processing_code === '0000') {
    console.log(`PLAĆENO: ${reference} — ${(t.amount / 100).toFixed(2)} EUR`);
  } else {
    console.log(`NIJE PLAĆENO: ${reference} — ${t?.status} (${t?.response_message})`);
  }

  return res.status(200).send('OK');
}
