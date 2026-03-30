import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { InfoModal } from './InfoModal';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xgadpsudjrlgrvhofqkd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnYWRwc3VkanJsZ3J2aG9mcWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MzM4MDIsImV4cCI6MjA5MDMwOTgwMn0.ZkjHb1XNa7Svt_sngzVT_uG7KFshoNAOpVV_D-xWJTA';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function CheckoutPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isRefundOpen, setIsRefundOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('Enrollments')
        .insert([{ name: fullName, email, address }]);

      if (error) throw error;
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error saving enrollment:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative z-10 py-20">
      <div className="absolute top-20 left-8 z-[100]">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full border border-gray-200 cursor-pointer"
        >
          <ArrowLeft size={20} />
          <span className="font-medium text-sm">Back to Home</span>
        </button>
      </div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full max-w-4xl"
      >
        {/* Order Summary Bar */}
        <div className="w-full bg-[#f7f7f7] border border-gray-200 rounded-xl px-4 md:px-6 py-4 flex justify-between items-center mb-8 mt-20">
          <button className="flex items-center gap-2 text-black hover:text-gray-700 transition-colors cursor-pointer">
            <span className="font-medium">Order summary</span>
            <ChevronDown size={18} className="text-gray-500" />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-gray-500 line-through text-sm">EGP 2,500</span>
            <span className="text-black font-bold text-lg">EGP 950</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-outfit font-bold text-black mb-4">
            Get Lifetime Access to The Course
          </h1>
          <p className="text-xl md:text-2xl font-bold text-[#1a9a46] mb-4" dir="rtl">
            Course Available NOW / الحق مكانك الآن
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 md:p-8 mb-6 border border-gray-100">

          {submitSuccess ? (
            <div className="text-center mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium text-lg">
                Details confirmed successfully! Please proceed to payment.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
              <div className="text-center mb-6">
                <p className="text-lg md:text-xl text-gray-800">
                  Step #1: Fill in your details below
                </p>
              </div>

              <div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your Full Name / اسمك بالكامل"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition-colors"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Your Address / عنوانك (Optional)"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address / بريدك الإلكتروني"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg shadow-[#25D366]/30"
              >
                {isSubmitting ? 'Confirming...' : 'Confirm Details'}
              </button>
            </form>
          )}

          <div className="flex flex-col md:flex-row-reverse gap-8 items-start border-t border-gray-200 pt-8 mt-4">
            {/* Payment Summary Box */}
            <div className="w-full md:w-[320px] shrink-0 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-black font-bold text-xl mb-6">Order Summary</h3>
              <div className="text-gray-800 mb-6 font-medium text-base">
                AI Career School Course
              </div>

              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Promo Code"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] bg-white text-black text-sm"
                />
                <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium">
                  Apply
                </button>
              </div>

              <div className="border-t border-gray-200 pt-4 flex justify-between items-center mt-auto">
                <span className="text-black font-bold text-lg">Total:</span>
                <span className="text-[#1a9a46] font-bold text-xl">LE 950</span>
              </div>
            </div>

            {/* Payment Methods Section */}
            <div className="flex-1 w-full">
              <div className="text-center md:text-left mb-6">
                <p className="text-lg md:text-xl text-gray-800">
                  Step #2: Pay <span className="text-[#1a9a46] font-bold">LE 950</span> instead of <span className="line-through text-gray-500">LE 2,500</span>
                </p>
                <h3 className="text-black text-xl font-bold mt-8 mb-4">Payment Methods:</h3>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center flex flex-col items-center">
                  <p className="text-black font-medium mb-3 text-lg">Instapay Transaction: <span className="text-[#1a9a46]">@mosaabgaber</span></p>
                  <a
                    href="https://ipn.eg/S/mosaabgaber/instapay/5MzMB3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gray-100 hover:bg-gray-200 text-black px-6 py-3 rounded-lg transition-colors text-sm font-medium border border-gray-200"
                  >
                    Open Instapay Link
                  </a>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center flex flex-col items-center">
                  <p className="text-gray-500 text-sm mb-3">Save the transaction screen to confirm the order</p>
                  <p className="text-black font-medium mb-4 text-lg">
                    Send a screenshot and email to this number:<br />
                    <span className="text-[#1a9a46] mt-2 block">+201065716446</span>
                  </p>
                  <a
                    href="https://wa.link/hc7cmh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#1a9a46] border border-[#25D366]/50 px-6 py-3 rounded-lg transition-colors text-sm font-medium"
                  >
                    Send on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm font-medium" dir="rtl">
              More payment methods coming soon / طرق دفع إضافية قريباً
            </p>
          </div>
        </div>
      </motion.div>

      {/* Simple Footer */}
      <footer className="w-full max-w-4xl mt-12 mb-4 border-t border-gray-200 pt-6">
        <div className="flex flex-row items-center justify-center gap-6 text-sm text-gray-500">
          <Link to="/contact" className="hover:text-black transition-colors cursor-pointer">
            Contact
          </Link>
          <button
            onClick={() => setIsRefundOpen(true)}
            className="hover:text-black transition-colors cursor-pointer"
          >
            Refund Policy
          </button>
        </div>
      </footer>

      <InfoModal
        isOpen={isRefundOpen}
        onClose={() => setIsRefundOpen(false)}
        title="AI Career School - Refund Policy"
        content="Refunds are handled on a case-by-case basis. If you're not satisfied with your purchase, please contact us within 2 days of purchase at: theaicareerschool@gmail.com — Include your full name, purchase date, and reason for the refund request. Refunds are processed within 5-7 business days if approved. Once refunded, course access will be revoked immediately. For any questions, contact us at theaicareerschool@gmail.com"
      />
    </div>
  );
}
