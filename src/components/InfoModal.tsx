'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export function InfoModal({ isOpen, onClose, title, content }: InfoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div key="info-modal" className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            onClick={onClose}
            className="absolute inset-0 bg-darkspace/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.95, 1, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 1, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative z-10 w-full max-w-2xl rounded-2xl p-8 border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden"
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
            <h2 className="text-2xl font-outfit font-bold text-white mb-6 pr-8">
              {title}
            </h2>
            
            <div className="text-gray-300 space-y-4 leading-relaxed max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              {content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
