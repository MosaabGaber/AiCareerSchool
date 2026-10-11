'use client';

import React from 'react';
import { HomeWebCreation } from './HomeWebCreation';
import { useModals } from '../context/ModalContext';

export function WebCreationPageClient() {
  const { setIsPromptsModalOpen, setIsPrivacyOpen, setIsTermsOpen, setIsRefundOpen } = useModals();

  return (
    <HomeWebCreation 
      setIsPromptsModalOpen={setIsPromptsModalOpen}
      setIsPrivacyOpen={setIsPrivacyOpen}
      setIsTermsOpen={setIsTermsOpen}
      setIsRefundOpen={setIsRefundOpen}
    />
  );
}
