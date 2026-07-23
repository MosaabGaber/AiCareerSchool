export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  console.log('Request body:', JSON.stringify(req.body));
  
  const { name, email, address, amount } = req.body || {};
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Missing name or email' });
  }
  
  const finalAmount = amount || 120000;
  const firstName = name.split(' ')[0] || 'N/A';
  const lastName = name.split(' ')[1] || 'N/A';

  try {
    console.log('Starting Paymob fetch...', finalAmount);
    const response = await fetch('https://accept.paymob.com/v1/intention/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.PAYMOB_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: finalAmount,
        currency: 'EGP',
        payment_methods: [parseInt(process.env.PAYMOB_INTEGRATION_ID)],
        items: [{
          name: 'AI Career School Course',
          amount: finalAmount,
          description: 'Lifetime access to AI Career School',
          quantity: 1
        }],
        billing_data: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone_number: 'N/A',
          street: address || 'N/A',
          building: 'N/A',
          floor: 'N/A',
          apartment: 'N/A',
          city: 'Cairo',
          country: 'EG',
          state: 'Cairo',
        },
        redirection_url: 'https://www.aicareerschool.com/thank-you',
        notification_url: 'https://www.aicareerschool.com/api/paymob-webhook',
      }),
    });
    console.log('Paymob response status:', response.status);
    const data = await response.json();
    console.log('Paymob response data:', JSON.stringify(data));
    if (data.client_secret) {
      res.status(200).json({ client_secret: data.client_secret });
    } else {
      res.status(400).json({ error: 'Failed to create intention', details: data });
    }
  } catch (error) {
    console.error('Fetch failed:', error.message);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
}
