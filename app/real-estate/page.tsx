'use client';

import React from 'react';
import { HomeRealEstate } from '../../src/components/HomeRealEstate';
import { useModals } from '../../src/context/ModalContext';

export default function RealEstatePage() {
  const { setIsPromptsModalOpen, setIsPrivacyOpen, setIsTermsOpen, setIsRefundOpen } = useModals();

  return (
    <HomeRealEstate 
      setIsPromptsModalOpen={setIsPromptsModalOpen}
      setIsPrivacyOpen={setIsPrivacyOpen}
      setIsTermsOpen={setIsTermsOpen}
      setIsRefundOpen={setIsRefundOpen}
    />
  );
}
