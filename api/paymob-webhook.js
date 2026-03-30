export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body;
  console.log('Full webhook body:', JSON.stringify(body));
  
  const isSuccess = body?.success === true || body?.obj?.success === true;
  const orderId = body?.id || body?.obj?.id || body?.order?.id;
  const email = body?.billing_data?.email || body?.obj?.billing_data?.email;

  console.log(`Payment ${isSuccess ? 'SUCCESS' : 'FAILED'} - Order: ${orderId}, Email: ${email}`);

  return res.status(200).json({ received: true });
}
