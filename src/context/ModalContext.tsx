'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GlobalModals } from './GlobalModals';

interface ModalContextType {
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (isOpen: boolean) => void;
  isPromptsModalOpen: boolean;
  setIsPromptsModalOpen: (isOpen: boolean) => void;
  isPrivacyOpen: boolean;
  setIsPrivacyOpen: (isOpen: boolean) => void;
  isTermsOpen: boolean;
  setIsTermsOpen: (isOpen: boolean) => void;
  isRefundOpen: boolean;
  setIsRefundOpen: (isOpen: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPromptsModalOpen, setIsPromptsModalOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isRefundOpen, setIsRefundOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
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
      }}
    >
      {children}
      <GlobalModals />
    </ModalContext.Provider>
  );
}

export function useModals() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModals must be used within a ModalProvider');
  }
  return context;
}
