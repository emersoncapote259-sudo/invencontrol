'use client';

import React from 'react';
import AppLayout from '@/components/AppLayout';
import InventoryEntriesContent from './components/InventoryEntriesContent';

export default function InventoryEntriesPage() {
  return (
    <AppLayout>
      <InventoryEntriesContent />
    </AppLayout>
  );
}
