import type { Metadata } from 'next';
import { CheckoutPageAiContentLive } from '../../src/components/CheckoutPageAiContentLive';

export const metadata: Metadata = {
  title: 'كورس صناعة الصور والفيديوهات بالذكاء الاصطناعي — لايف | Checkout',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AiContentLiveCheckout() {
  return <CheckoutPageAiContentLive />;
}
