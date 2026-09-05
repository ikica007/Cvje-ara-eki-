export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // U Node.js / Vercel okruženju req.body je već parsiran JSON
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { amount, customer } = body || {};

    // 1. Dobijanje OAuth tokena od FinRelay-a
    const tokenResponse = await fetch(process.env.FINRELAY_TOKEN_URL, {
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
      console.error('FinRelay Token error:', tokenResponse.status, tokenError);
      return res.status(401).json({ error: 'Autorizacija sa payment servisom nije uspjela.' });
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 2. Kreiranje platne transakcije
    const orderReference = `ORD-${Date.now()}`;

    const paymentResponse = await fetch(`${process.env.FINRELAY_API_URL}/payments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        terminalId: process.env.FINRELAY_TERMINAL_ID,
        amount: Math.round(amount * 100),
        currency: 'EUR',
        reference: orderReference,
        returnUrl: `${process.env.SITE_URL || 'https://www.cvjecarascekic.me'}/order-status`,
        customer: customer ? {
          email: customer.email,
          firstName: customer.firstName,
          lastName: customer.lastName,
          phone: customer.phone,
        } : undefined,
      }),
    });

    if (!paymentResponse.ok) {
      const paymentError = await paymentResponse.text();
      console.error('FinRelay Payment error:', paymentResponse.status, paymentError);
      return res.status(paymentResponse.status).json({ error: paymentError });
    }

    const paymentData = await paymentResponse.json();
    return res.status(200).json(paymentData);

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: error.message || 'Interna greška na serveru' });
  }
}
