'use client';

import React from 'react';
import { HomeRealEstate } from './HomeRealEstate';
import { useModals } from '../context/ModalContext';

export function RealEstatePageClient() {
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
