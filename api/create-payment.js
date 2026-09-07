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

  const { korpa, kupac, amount: frontendAmount } = req.body ?? {};

  // Ako frontend šalje amount direktno (iz postojeće korpe), koristi ga
  // Ali samo ako nema korpe za katalog provjeru
  let amount;
  let opis;

  if (korpa && Array.isArray(korpa) && korpa.length > 0) {
    try {
      const total = izracunajTotal(korpa);
      amount = total.amount;
      opis = total.opis;
    } catch (e) {
      return res.status(400).json({ greska: e.message });
    }
  } else if (frontendAmount && Number.isInteger(frontendAmount) && frontendAmount > 0) {
    amount = frontendAmount;
    opis = 'Narudžba sa sajta';
  } else {
    return res.status(400).json({ greska: 'Korpa je prazna.' });
  }

  if (!kupac?.email || !String(kupac.email).includes('@')) {
    return res.status(400).json({ greska: 'Email je obavezan.' });
  }

  const reference = `CS-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  try {
    // 1. Token
    console.log('Tražim token od:', env.tokenUrl);
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
      return res.status(502).json({ greska: 'Plaćanje trenutno nije dostupno (token).' });
    }

    let tokenData;
    try {
      tokenData = JSON.parse(tokenTekst);
    } catch {
      console.error('Token nije JSON:', tokenTekst.slice(0, 200));
      return res.status(502).json({ greska: 'Plaćanje trenutno nije dostupno (token format).' });
    }

    const access_token = tokenData.access_token;
    if (!access_token) {
      console.error('Nema access_token u odgovoru:', Object.keys(tokenData));
      return res.status(502).json({ greska: 'Plaćanje trenutno nije dostupno (no token).' });
    }

    console.log('Token dobijen, pravim HPP sesiju...');

    // 2. HPP
    const hppUrl = `${env.apiUrl}/api/hosted-payment-page`;
    const hppBody = {
      reference,
      terminal_id: env.terminalId,
      currency: 'EUR',
      amount,
      transaction_type: 'PURCHASE',
      description: opis || 'Narudžba sa sajta',
      return_url: `${env.siteUrl}/placanje/rezultat?ref=${reference}`,
      customer_first_name: cist(kupac.ime, 100),
      customer_last_name: cist(kupac.prezime, 100),
      customer_email: cist(kupac.email, 200),
      customer_phone_number: cist(kupac.telefon, 20),
      customer_address: cist(kupac.adresa, 200),
      customer_city: cist(kupac.grad, 100),
      customer_country: 'ME',
      customer_postal_code: cist(kupac.postanski, 20),
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
      return res.status(502).json({ greska: `Plaćanje nije dostupno (HPP ${hppRes.status}).` });
    }

    if (!hppTekst || hppTekst.trim() === '') {
      console.error('HPP vratio prazan odgovor');
      return res.status(502).json({ greska: 'Plaćanje nije dostupno (prazan odgovor).' });
    }

    let hppData;
    try {
      hppData = JSON.parse(hppTekst);
    } catch {
      console.error('HPP nije JSON:', hppTekst.slice(0, 200));
      return res.status(502).json({ greska: 'Plaćanje nije dostupno (format).' });
    }

    const { redirect_url, session_id } = hppData;
    console.log('Sesija kreirana:', { reference, session_id, amount });

    return res.status(200).json({ redirect_url, reference });

  } catch (e) {
    console.error('Neočekivana greška:', e.message);
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
