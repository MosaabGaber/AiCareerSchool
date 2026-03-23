import { useEffect } from 'react';
import { X } from 'lucide-react';

interface PromptsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PromptsModal({ isOpen, onClose }: PromptsModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-[#0a0f23] border border-white/10 rounded-2xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-outfit font-bold text-white mb-6">Prompts</h2>

        <div className="space-y-3">
          <a 
            href="https://docs.google.com/document/d/1EdXVLEe3HfYPFv1FRjXbszWFTJAZTSskr1BGhrbA4QA/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-200 group"
          >
            <h3 className="text-white font-medium group-hover:text-neongreen transition-colors">
              Create Building Video - فيديو المبنى
            </h3>
          </a>
        </div>
      </div>
    </div>
  );
}
