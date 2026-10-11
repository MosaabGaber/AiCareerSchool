'use client';

import React from 'react';
import { HomeWebCreation } from '../../src/components/HomeWebCreation';
import { useModals } from '../../src/context/ModalContext';

export default function WebCreationPage() {
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
