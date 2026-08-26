import { izracunajTotal } from './_katalog.js';

const USER_AGENT = 'CvjecaraScekic/1.0 (+https://cvjecarascekic.vercel.app)';

export default async function handler(request) {
  if (request.method !== 'POST') {
    return json({ greska: 'Dozvoljen je samo POST.' }, 405);
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
    return json({ greska: 'Plaćanje trenutno nije dostupno.' }, 500);
  }

  let tijelo;
  try {
    tijelo = await request.json();
  } catch {
    return json({ greska: 'Neispravan zahtjev.' }, 400);
  }

  const { korpa, kupac } = tijelo ?? {};

  let total;
  try {
    total = izracunajTotal(korpa);
  } catch (e) {
    return json({ greska: e.message }, 400);
  }

  if (!kupac?.email || !String(kupac.email).includes('@')) {
    return json({ greska: 'Email je obavezan.' }, 400);
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
      return json({ greska: 'Plaćanje trenutno nije dostupno.' }, 502);
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
      return json({ greska: 'Plaćanje trenutno nije dostupno.' }, 502);
    }

    const { redirect_url, session_id } = await hppRes.json();

    console.log('Sesija kreirana:', { reference, session_id, amount: total.amount });

    return json({ redirect_url, reference });

  } catch (e) {
    console.error('Neočekivana greška:', e);
    return json({ greska: 'Plaćanje trenutno nije dostupno.' }, 500);
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

function json(podaci, status = 200) {
  return new Response(JSON.stringify(podaci), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
