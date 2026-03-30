export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const transaction = req.body;
  
  console.log('Paymob webhook received:', JSON.stringify(transaction));

  const isSuccess = transaction?.obj?.success === true;
  const orderId = transaction?.obj?.order?.id;
  const amount = transaction?.obj?.amount_cents;
  const email = transaction?.obj?.payment_key_claims?.billing_data?.email;

  console.log(`Payment ${isSuccess ? 'SUCCESS' : 'FAILED'} - Order: ${orderId}, Email: ${email}, Amount: ${amount}`);

  return res.status(200).json({ received: true });
}
