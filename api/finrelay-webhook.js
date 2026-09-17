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

function parsirajOpis(opis) {
  const dijelovi = (opis || '').split(' | ');
  const result = {
    stavke: '',
    primalac: '',
    telPrimaoca: '',
    adresa: '',
    grad: '',
    datum: '',
    poruka: '',
  };

  for (const dio of dijelovi) {
    if (dio.startsWith('Primalac: ')) result.primalac = dio.replace('Primalac: ', '');
    else if (dio.startsWith('Tel: ')) result.telPrimaoca = dio.replace('Tel: ', '');
    else if (dio.startsWith('Adresa: ')) result.adresa = dio.replace('Adresa: ', '');
    else if (dio.startsWith('Grad: ')) result.grad = dio.replace('Grad: ', '');
    else if (dio.startsWith('Datum: ')) result.datum = dio.replace('Datum: ', '');
    else if (dio.startsWith('Poruka: ')) result.poruka = dio.replace('Poruka: ', '');
    else result.stavke = dio;
  }

  return result;
}

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
  const info = parsirajOpis(t?.description);

  console.log('Webhook:', { event, reference, status: t?.status, amount: t?.amount });

  if (t?.status === 'APPROVED' && t?.processing_code === '0000') {
    console.log(`PLAĆENO: ${reference} — ${iznos} EUR`);

    try {
      await resend.emails.send({
        from: 'Cvjećara Šćekić <noreply@cvjecarascekic.me>',
        to: 'scekiccvjecara@hotmail.com',
        subject: `Nova narudžba karticom — ${iznos} EUR`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; background: #fff;">

            <h2 style="color: #2d6a4f; margin-bottom: 4px;">🌸 Nova narudžba karticom!</h2>
            <p style="color: #666; margin-top: 0; margin-bottom: 24px;">Primljeno kartično plaćanje — <strong>${iznos} EUR</strong></p>

            <div style="background: #f0f7f4; border-radius: 10px; padding: 16px; margin-bottom: 16px;">
              <p style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #2d6a4f; font-weight: bold;">Narudžba</p>
              <p style="margin: 0; font-size: 16px; font-weight: bold; color: #1a1a1a;">${info.stavke || 'Nije navedeno'}</p>
              <p style="margin: 4px 0 0 0; color: #2d6a4f; font-weight: bold;">${iznos} EUR</p>
            </div>

            <div style="border: 1px solid #eee; border-radius: 10px; padding: 16px; margin-bottom: 16px;">
              <p style="margin: 0 0 12px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888; font-weight: bold;">Podaci naručioca</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; color: #888; width: 40%; font-size: 13px;">Ime</td>
                  <td style="padding: 6px 0; font-weight: 500; font-size: 13px;">${t?.customer_first_name || ''} ${t?.customer_last_name || ''}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px;">Telefon</td>
                  <td style="padding: 6px 0; font-weight: 500; font-size: 13px;">
                    <a href="tel:${t?.customer_phone_number || ''}" style="color: #2d6a4f; text-decoration: none;">${t?.customer_phone_number || 'Nije naveden'}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px;">Email</td>
                  <td style="padding: 6px 0; font-weight: 500; font-size: 13px;">
                    <a href="mailto:${t?.customer_email || ''}" style="color: #2d6a4f; text-decoration: none;">${t?.customer_email || 'Nije naveden'}</a>
                  </td>
                </tr>
              </table>
            </div>

            <div style="border: 1px solid #eee; border-radius: 10px; padding: 16px; margin-bottom: 16px;">
              <p style="margin: 0 0 12px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888; font-weight: bold;">Podaci isporuke</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; color: #888; width: 40%; font-size: 13px;">Primalac</td>
                  <td style="padding: 6px 0; font-weight: 500; font-size: 13px;">${info.primalac || (t?.customer_first_name + ' ' + t?.customer_last_name) || 'Nije naveden'}</td>
                </tr>
                ${info.telPrimaoca ? `
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px;">Telefon primaoca</td>
                  <td style="padding: 6px 0; font-weight: 500; font-size: 13px;">
                    <a href="tel:${info.telPrimaoca}" style="color: #2d6a4f; text-decoration: none;">${info.telPrimaoca}</a>
                  </td>
                </tr>` : ''}
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px;">Adresa</td>
                  <td style="padding: 6px 0; font-weight: 500; font-size: 13px;">${info.adresa || t?.customer_address || 'Nije navedena'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px;">Grad</td>
                  <td style="padding: 6px 0; font-weight: 500; font-size: 13px;">${info.grad || t?.customer_city || 'Nije naveden'}</td>
                </tr>
                ${info.datum ? `
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px;">Datum isporuke</td>
                  <td style="padding: 6px 0; font-weight: 500; font-size: 13px;">${info.datum}</td>
                </tr>` : ''}
                ${info.poruka ? `
                <tr>
                  <td style="padding: 6px 0; color: #888; font-size: 13px;">Poruka</td>
                  <td style="padding: 6px 0; font-weight: 500; font-size: 13px; font-style: italic;">"${info.poruka}"</td>
                </tr>` : ''}
              </table>
            </div>

            <p style="color: #bbb; font-size: 11px; margin-top: 16px;">Referenca: ${reference}</p>

            <div style="margin-top: 16px; padding: 12px 16px; background: #f0f7f4; border-radius: 8px;">
              <p style="margin: 0; color: #2d6a4f; font-size: 13px;">✅ Plaćanje potvrđeno — možete pripremiti narudžbu.</p>
            </div>
          </div>
        `,
      });
      console.log('Email poslan cvjećari.');
    } catch (emailErr) {
      console.error('Greška pri slanju emaila:', emailErr.message);
    }

  } else {
    console.log(`NIJE PLAĆENO: ${reference} — ${t?.status} (${t?.response_message})`);
  }

  return res.status(200).send('OK');
}
