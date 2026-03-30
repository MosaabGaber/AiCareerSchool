export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body;
  console.log('Full webhook body:', JSON.stringify(body));
  
  const isSuccess = body?.transaction?.success === true;
  const orderId = body?.transaction?.order?.id;
  const email = body?.intention?.intention_detail?.billing_data?.email;
  const amount = body?.transaction?.amount_cents;
  const firstName = body?.intention?.intention_detail?.billing_data?.first_name;

  console.log(`Payment ${isSuccess ? 'SUCCESS' : 'FAILED'} - Order: ${orderId}, Email: ${email}, Amount: ${amount}, Name: ${firstName}`);

  return res.status(200).json({ received: true });
}
