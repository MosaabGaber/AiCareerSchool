import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CheckoutPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would probably send data to a backend or save to state.
    // For now, it just prevents default form submission behavior.
  };

  useEffect(() => {
    window.scrollTo(0, 0);
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
        className="relative w-full max-w-2xl bg-white rounded-2xl p-8 md:p-12 border border-gray-200 shadow-xl overflow-hidden"
      >
        <div className="text-center mb-8 mt-2">
          <h1 className="text-3xl md:text-4xl font-outfit font-bold text-black mb-4">
            Get Lifetime Access to The Course
          </h1>
          <p className="text-xl md:text-2xl font-bold text-[#1a9a46] mb-4" dir="rtl">
            Course Available NOW / الحق مكانك الآن
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 md:p-8 mb-6 border border-gray-100">
          
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
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg shadow-[#25D366]/30"
            >
              Confirm Details
            </button>
          </form>

          <div className="text-center mb-6 border-t border-gray-200 pt-8">
            <p className="text-lg md:text-xl text-gray-800">
              Step #2: Pay <span className="text-[#1a9a46] font-bold">LE 950</span> instead of <span className="line-through text-gray-500">LE 2,500</span>
            </p>
          </div>

          <div className="space-y-6 mt-8">
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

          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm font-medium" dir="rtl">
              More payment methods coming soon / طرق دفع إضافية قريباً
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
