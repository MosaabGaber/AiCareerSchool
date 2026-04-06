'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div key="payment-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-darkspace/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative z-10 w-full max-w-md rounded-2xl p-8 border border-neongreen/20 shadow-[0_0_30px_rgba(1,240,142,0.1)] overflow-hidden"
            style={{
              background: 'rgba(20, 25, 45, 0.97)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1"
            >
              <X size={24} />
            </button>
            <div className="text-center mb-6 mt-2">
              <h2 className="text-2xl font-outfit font-bold text-white mb-2">
                Course Starts <span className="text-neongreen glow-text">Available NOW</span>
              </h2>
              <p className="text-xl font-bold text-white mb-1">Register NOW</p>
              <p className="text-xl font-bold text-neongreen mb-4" dir="rtl">الحق مكانك الآن</p>
            </div>

            <div className="bg-white/5 rounded-xl p-6 mb-6 border border-white/5">
              <div className="text-center mb-4">
                <p className="text-lg text-gray-300">Step #1: Pay <span className="text-neongreen font-bold">LE 950</span> instead of <span className="line-through text-gray-500">LE 2,200</span> using one of the following payment methods</p>
              </div>

              <div className="space-y-4 mt-6">
                <div className="bg-darkspace/50 p-4 rounded-lg border border-white/10 text-center">
                  <p className="text-white font-medium mb-2">Instapay Transaction: <span className="text-neongreen">@mosaabgaber</span></p>
                  <a
                    href="https://ipn.eg/S/mosaabgaber/instapay/5MzMB3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    Open Instapay Link
                  </a>
                </div>

                <div className="bg-darkspace/50 p-4 rounded-lg border border-white/10 text-center">
                  <p className="text-gray-400 text-sm mb-2">Save the transaction screen to confirm the order</p>
                  <p className="text-white font-medium mb-2">Send a screenshot and email to this number:<br /><span className="text-neongreen">+201065716446</span></p>
                  <a
                    href="https://wa.link/hc7cmh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/50 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                  >
                    Send on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
