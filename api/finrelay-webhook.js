import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

const obradjeneReference = new Set();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const sirovoTijelo = await getRawBody(req);
  console.log('Webhook primljen.');

  let dogadjaj;
  try {
    dogadjaj = JSON.parse(sirovoTijelo);
  } catch {
    return res.status(400).send('Bad request');
  }

  const { event, payload: t } = dogadjaj;
  const reference = t?.reference;
  const iznos = t?.amount ? (t.amount / 100).toFixed(2) : '?';

  console.log('Webhook:', { event, reference, status: t?.status, amount: t?.amount });

  if (t?.status === 'APPROVED' && t?.processing_code === '0000') {
    if (obradjeneReference.has(reference)) {
      console.log(`Duplikat webhook za ${reference} — preskačem.`);
      return res.status(200).send('OK');
    }
    obradjeneReference.add(reference);
    console.log(`PLAĆENO: ${reference} — ${iznos} EUR`);

    try {
      await resend.emails.send({
        from: 'Cvjećara Šćekić <noreply@cvjecarascekic.me>',
        to: 'scekiccvjecara@hotmail.com',
        subject: `✅ Plaćanje potvrđeno — ${iznos} EUR`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px;">
            <h2 style="color: #2d6a4f;">✅ Plaćanje potvrđeno!</h2>
            <p style="color: #444;">Kartica je naplaćena — možete pripremiti narudžbu.</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr>
                <td style="padding: 8px 0; color: #888; width: 40%; font-size: 13px;">Iznos</td>
                <td style="padding: 8px 0; font-weight: bold; font-size: 15px; color: #2d6a4f;">${iznos} EUR</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 13px;">Referenca</td>
                <td style="padding: 8px 0; font-size: 12px; color: #999;">${reference}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 13px;">Kupac</td>
                <td style="padding: 8px 0; font-size: 13px;">${t?.customer_first_name || ''} ${t?.customer_last_name || ''}</td>
              </tr>
            </table>
            <p style="margin-top: 20px; color: #999; font-size: 12px;">Detalji narudžbe su stigli u prethodnom emailu.</p>
          </div>
        `,
      });
      console.log('Email potvrde poslan.');
    } catch (emailErr) {
      console.error('Greška pri slanju emaila:', emailErr.message);
    }

  } else {
    console.log(`NIJE PLAĆENO: ${reference} — ${t?.status} (${t?.response_message})`);
  }

  return res.status(200).send('OK');
}
