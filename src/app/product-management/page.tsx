import React from 'react';
import AppLayout from '@/components/AppLayout';
import ProductManagementContent from './components/ProductManagementContent';

export default function Page() {
  return (
    <AppLayout>
      <ProductManagementContent />
    </AppLayout>
  );
}