export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body = await request.json();
    const { amount, customer } = body;

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
      return new Response(JSON.stringify({ error: 'Autorizacija nije uspjela' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 2. Kreiranje platne sesije
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
      return new Response(JSON.stringify({ error: paymentError }), {
        status: paymentResponse.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const paymentData = await paymentResponse.json();
    return new Response(JSON.stringify(paymentData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Server error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
