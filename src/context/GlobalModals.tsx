'use client';

import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModals } from './ModalContext';
import { PromptsModal } from '../components/PromptsModal';
import { PaymentModal } from '../components/PaymentModal';

function ModalShell({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          key={title}
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ zIndex: 9999 }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(6, 6, 12, 0.85)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          />

          {/* Modal card — z-index ensures it's above backdrop */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              position: 'relative',
              zIndex: 10,
              width: '100%',
              maxWidth: '640px',
              background: 'rgba(20, 25, 45, 0.96)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '32px',
              padding: '40px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)',
              overflowY: 'auto',
              maxHeight: '85vh',
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                color: '#9ca3af',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              <X size={24} />
            </button>

            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '24px',
                paddingRight: '32px',
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              {title}
            </h2>

            <div
              style={{
                color: '#ffffff',
                lineHeight: 1.75,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function GlobalModals() {
  const {
    isPaymentModalOpen,
    setIsPaymentModalOpen,
    isPromptsModalOpen,
    setIsPromptsModalOpen,
    isPrivacyOpen,
    setIsPrivacyOpen,
    isTermsOpen,
    setIsTermsOpen,
    isRefundOpen,
    setIsRefundOpen,
  } = useModals();

  return (
    <>
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />

      <PromptsModal
        isOpen={isPromptsModalOpen}
        onClose={() => setIsPromptsModalOpen(false)}
      />

      {/* ── Privacy Policy ── */}
      <ModalShell
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        title="Privacy Policy"
      >
        <p>AI Career School respects your privacy. We collect basic information such as your name and email when you enroll in our courses.</p>
        <p>This information is used solely to provide you with course access and updates. We do not sell or share your personal data with third parties.</p>
        <p>We may use cookies to improve your browsing experience on our website. By using our website, you consent to our privacy practices.</p>
        <p>If you have any questions, contact us at <strong style={{ color: '#ffffff' }}>theaicareerschoo@gmail.com</strong></p>
      </ModalShell>

      {/* ── Terms of Service ── */}
      <ModalShell
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        title="Terms of Service"
      >
        <p>By enrolling in AI Career School courses, you agree to the following terms.</p>
        <p>All course content is for personal use only and may not be shared, resold, or distributed without written permission.</p>
        <p>Course access is granted to the individual purchaser only. We reserve the right to update course content at any time.</p>
        <p>Refunds are handled on a case-by-case basis — contact us within 7 days of purchase.</p>
        <p>AI Career School is not responsible for any outcomes or results from applying course knowledge.</p>
        <p>For questions contact us at <strong style={{ color: '#ffffff' }}>theaicareerschoo@gmail.com</strong></p>
      </ModalShell>

      {/* ── Refund Policy ── */}
      <ModalShell
        isOpen={isRefundOpen}
        onClose={() => setIsRefundOpen(false)}
        title="AI Career School — Refund Policy"
      >
        <p>Refunds are handled on a case-by-case basis.</p>
        <p>If you&apos;re not satisfied with your purchase, please contact us within 2 days of purchase at: <strong style={{ color: '#ffffff' }}>theaicareerschool@gmail.com</strong></p>
        <p>Include your full name, purchase date, and reason for the refund request.</p>
        <p>Refunds are processed within 5–7 business days if approved. Once refunded, course access will be revoked immediately.</p>
        <p>For any questions, contact us at <strong style={{ color: '#ffffff' }}>theaicareerschool@gmail.com</strong></p>
      </ModalShell>
    </>
  );
}
