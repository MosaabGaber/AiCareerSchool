'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { useModals } from '../context/ModalContext';

export function Footer() {
  const { setIsPromptsModalOpen, setIsPrivacyOpen, setIsTermsOpen, setIsRefundOpen } = useModals();

  return (
    <footer className="border-t border-white/10 py-10 mt-12 relative z-10 w-full">
      <div className="container mx-auto px-6 flex flex-col items-center gap-6">
        {/* Logo + copyright */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center opacity-80">
            <img src="/logo.png" alt="AI Career School Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-outfit font-bold text-gray-300">AI Career School &copy; {new Date().getFullYear()}</span>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-6">
          <a href="https://www.instagram.com/aicareer.school" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-all duration-200 hover:scale-110" aria-label="Instagram">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
          </a>
          <a href="https://www.tiktok.com/@ai.career.school" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-all duration-200 hover:scale-110" aria-label="TikTok">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" /></svg>
          </a>
          <button onClick={() => setIsPromptsModalOpen(true)} className="ml-4 px-5 py-1.5 rounded-full border border-white/30 bg-white/5 text-white hover:bg-white/10 transition-all duration-300 text-sm font-medium tracking-wide flex items-center justify-center">
            Prompts
          </button>
          <Link href="/checkout" className="ml-2 px-5 py-1.5 rounded-full border border-white/30 bg-white/5 text-white hover:bg-white/10 transition-all duration-300 text-sm font-medium tracking-wide flex items-center justify-center">
            Checkout
          </Link>
        </div>

        {/* Bottom row */}
        <div className="flex items-center text-sm text-gray-500 gap-6">
          <span className="flex items-center gap-1"><ShieldCheck size={16} /> SSL Secured</span>
          <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-white transition-colors cursor-pointer">Privacy</button>
          <button onClick={() => setIsTermsOpen(true)} className="hover:text-white transition-colors cursor-pointer">Terms</button>
          <button onClick={() => setIsRefundOpen(true)} className="hover:text-white transition-colors cursor-pointer">Refund Policy</button>
          <Link href="/contact" className="hover:text-white transition-colors text-white/80">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
