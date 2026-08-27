import { izracunajTotal } from './_katalog.js';

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
    return res.status(500).json({ greska: 'Plaćanje trenutno nije dostupno.' });
  }

  const { korpa, kupac } = req.body ?? {};

  let total;
  try {
    total = izracunajTotal(korpa);
  } catch (e) {
    return res.status(400).json({ greska: e.message });
  }

  if (!kupac?.email || !String(kupac.email).includes('@')) {
    return res.status(400).json({ greska: 'Email je obavezan.' });
  }

  const reference = `CS-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  try {
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

    if (!tokenRes.ok) {
      console.error('Token greška:', tokenRes.status, await tokenRes.text());
      return res.status(502).json({ greska: 'Plaćanje trenutno nije dostupno.' });
    }

    const { access_token } = await tokenRes.json();

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
        amount: total.amount,
        transaction_type: 'PURCHASE',
        description: total.opis,
        return_url: `${env.siteUrl}/placanje/rezultat?ref=${reference}`,
        customer_first_name: cist(kupac.ime, 100),
        customer_last_name: cist(kupac.prezime, 100),
        customer_email: cist(kupac.email, 200),
        customer_phone_number: cist(kupac.telefon, 20),
        customer_address: cist(kupac.adresa, 200),
        customer_city: cist(kupac.grad, 100),
        customer_country: 'ME',
        customer_postal_code: cist(kupac.postanski, 20),
      }),
    });

    if (!hppRes.ok) {
      console.error('HPP greška:', hppRes.status, await hppRes.text());
      return res.status(502).json({ greska: 'Plaćanje trenutno nije dostupno.' });
    }

    const { redirect_url, session_id } = await hppRes.json();

    console.log('Sesija kreirana:', { reference, session_id, amount: total.amount });

    return res.status(200).json({ redirect_url, reference });

  } catch (e) {
    console.error('Neočekivana greška:', e);
    return res.status(500).json({ greska: 'Plaćanje trenutno nije dostupno.' });
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
