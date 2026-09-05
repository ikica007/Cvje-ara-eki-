export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { amount, customer } = body || {};

    // 1. Dobijanje OAuth access tokena
    const tokenUrl = process.env.FINRELAY_TOKEN_URL || 'https://api.finrelay.com/oauth/token';

    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.FINRELAY_CLIENT_ID,
        client_secret: process.env.FINRELAY_CLIENT_SECRET,
      }),
    });

    if (!tokenResponse.ok) {
      const tokenError = await tokenResponse.text();
      console.error('FinRelay Token Error:', tokenResponse.status, tokenError);
      return res.status(401).json({ error: 'Autorizacija sa payment servisom nije uspjela.' });
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 2. Kreiranje HPP (Hosted Payment Page) sesije
    const baseUrl = (process.env.FINRELAY_API_URL || 'https://api.finrelay.com').replace(/\/+$/, '');
    const hppEndpoint = `${baseUrl}/api/hosted-payment-page`;

    const siteUrl = process.env.SITE_URL || 'https://www.cvjecarascekic.me';
    const orderReference = `ORD-${Date.now()}`;

    // Payload konstruisan po tačnoj specifikaciji iz HPP dokumentacije
    const payload = {
      reference: orderReference.substring(0, 40),
      terminal_id: process.env.FINRELAY_TERMINAL_ID,
      description: `Narudžba ${orderReference}`,
      currency: 'EUR',
      amount: Math.round((parseFloat(amount) || 0) * 100), // Iznos u centima (npr. 10.00 EUR = 1000)
      transaction_type: 'PURCHASE',
      success_url: `${siteUrl}/order-status?status=success`,
      cancel_url: `${siteUrl}/order-status?status=cancelled`,
      error_url: `${siteUrl}/order-status?status=error`,
      customer_first_name: customer?.firstName || '',
      customer_last_name: customer?.lastName || '',
      customer_email: customer?.email || '',
      customer_phone_number: customer?.phone || '',
      language: 'bs' // Postavlja interfejs forme na lokalni jezik
    };

    console.log('Slanje zahtjeva na FinRelay HPP:', hppEndpoint);

    const paymentResponse = await fetch(hppEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
    });

    const responseData = await paymentResponse.json();

    if (!paymentResponse.ok) {
      console.error('FinRelay HPP Error:', paymentResponse.status, responseData);
      return res.status(paymentResponse.status).json(responseData);
    }

    // 3. Vraćamo odgovor sa redirect_url na frontend
    return res.status(200).json(responseData);

  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: error.message || 'Interna greška na serveru' });
  }
}
