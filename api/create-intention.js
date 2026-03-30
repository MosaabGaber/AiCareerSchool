export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, address } = req.body;

  try {
    const response = await fetch('https://accept.paymob.com/v1/intention/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.PAYMOB_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 95000,
        currency: 'EGP',
        payment_methods: [parseInt(process.env.PAYMOB_INTEGRATION_ID)],
        items: [{
          name: 'AI Career School Course',
          amount: 95000,
          description: 'Lifetime access to AI Career School',
          quantity: 1
        }],
        billing_data: {
          first_name: name.split(' ')[0],
          last_name: name.split(' ')[1] || 'N/A',
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
        redirection_url: 'https://www.aicareerschool.com/checkout',
      }),
    });

    const data = await response.json();
    
    if (data.client_secret) {
      res.status(200).json({ client_secret: data.client_secret });
    } else {
      res.status(400).json({ error: 'Failed to create intention', details: data });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
}
