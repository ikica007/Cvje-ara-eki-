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

    // Lista svih mogućih FinRelay API produkcionih ruta za kreiranje sesije
    const endpointsToTry = [
      'https://api.finrelay.io/v1/payments',
      'https://api.finrelay.io/api/v1/payments',
      'https://api.finrelay.io/payments',
      'https://api.finrelay.io/v1/checkout/sessions',
      'https://api.finrelay.io/api/v1/checkout/sessions',
      'https://api.finrelay.io/checkout/sessions'
    ];

    let paymentResponse = null;
    let paymentErrorText = '';

    const payload = {
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
    };

    // Automatski pokušaj svake rute dok jedna ne vrati uspeh
    for (const endpoint of endpointsToTry) {
      console.log(`Pokušavam FinRelay endpoint: ${endpoint}`);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.status !== 404) {
        paymentResponse = response;
        break;
      }
      
      paymentErrorText = await response.text();
    }

    if (!paymentResponse || !paymentResponse.ok) {
      const errorMsg = paymentResponse ? await paymentResponse.text() : paymentErrorText;
      console.error('FinRelay Payment error:', paymentResponse?.status || 404, errorMsg);
      return res.status(paymentResponse?.status || 404).json({ error: errorMsg });
    }

    const paymentData = await paymentResponse.json();
    return res.status(200).json(paymentData);

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: error.message || 'Interna greška na serveru' });
  }
}
