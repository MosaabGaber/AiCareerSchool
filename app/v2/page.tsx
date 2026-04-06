'use client';

import React from 'react';
import { HomeV2 } from '../../src/components/HomeV2';
import { useModals } from '../../src/context/ModalContext';

export default function V2Page() {
  const { setIsPromptsModalOpen, setIsPrivacyOpen, setIsTermsOpen, setIsRefundOpen } = useModals();

  return (
    <HomeV2 
      setIsPromptsModalOpen={setIsPromptsModalOpen}
      setIsPrivacyOpen={setIsPrivacyOpen}
      setIsTermsOpen={setIsTermsOpen}
      setIsRefundOpen={setIsRefundOpen}
    />
  );
}
