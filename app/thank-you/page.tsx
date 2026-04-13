import type { Metadata } from 'next';
import { ThankYouPage } from '../../src/components/ThankYouPage';

export const metadata: Metadata = {
  title: 'تم الدفع بنجاح | AI Career School',
  description: 'مبروك! تم تأكيد اشتراكك في AI Career School. تواصل معنا على واتساب لاستلام لينك الدخول للكورس فوراً.',
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return <ThankYouPage />;
}
