import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CheckoutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-4 relative z-10 py-20">
      <div className="absolute top-8 left-8 z-50">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 cursor-pointer"
        >
          <ArrowLeft size={20} />
          <span className="font-medium text-sm">Back to Home</span>
        </button>
      </div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full max-w-2xl glassmorphism rounded-2xl p-8 md:p-12 border border-neongreen/20 shadow-[0_0_30px_rgba(1,240,142,0.1)] overflow-hidden"
      >
        <div className="text-center mb-8 mt-2">
          <h1 className="text-3xl md:text-4xl font-outfit font-bold text-white mb-4">
            Get Lifetime Access to The Course
          </h1>
          <p className="text-xl md:text-2xl font-bold text-neongreen mb-4" dir="rtl">
            Course Available NOW / الحق مكانك الآن
          </p>
        </div>
        
        <div className="bg-white/5 rounded-xl p-6 md:p-8 mb-6 border border-white/5">
          <div className="text-center mb-6">
            <p className="text-lg md:text-xl text-gray-300">
              Step #1: Pay <span className="text-neongreen font-bold">LE 950</span> instead of <span className="line-through text-gray-500">LE 2,500</span> using one of the following payment methods
            </p>
          </div>
          
          <div className="space-y-6 mt-8">
            <div className="bg-darkspace/50 p-6 rounded-lg border border-white/10 text-center flex flex-col items-center">
              <p className="text-white font-medium mb-3 text-lg">Instapay Transaction: <span className="text-neongreen">@mosaabgaber</span></p>
              <a 
                href="https://ipn.eg/S/mosaabgaber/instapay/5MzMB3" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors text-sm font-medium"
              >
                Open Instapay Link
              </a>
            </div>

            <div className="bg-darkspace/50 p-6 rounded-lg border border-white/10 text-center flex flex-col items-center">
              <p className="text-gray-400 text-sm mb-3">Save the transaction screen to confirm the order</p>
              <p className="text-white font-medium mb-4 text-lg">
                Send a screenshot and email to this number:<br/>
                <span className="text-neongreen mt-2 block">+201065716446</span>
              </p>
              <a 
                href="https://wa.link/hc7cmh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/50 px-6 py-3 rounded-lg transition-colors text-sm font-medium"
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
