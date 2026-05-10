import React from 'react';

export type ProductStatus =
  | 'activo' |'stock_bajo' |'sin_stock' |'por_vencer' |'descontinuado';

const statusConfig: Record<
  ProductStatus,
  { label: string; className: string }
> = {
  activo: {
    label: 'Activo',
    className: 'bg-gray-200 text-gray-800',
  },
  stock_bajo: {
    label: 'Stock Bajo',
    className: 'bg-amber-100 text-amber-700',
  },
  sin_stock: {
    label: 'Sin Stock',
    className: 'bg-red-100 text-red-700',
  },
  por_vencer: {
    label: 'Por Vencer',
    className: 'bg-orange-100 text-orange-700',
  },
  descontinuado: {
    label: 'Descontinuado',
    className: 'bg-slate-100 text-slate-600',
  },
};

interface StatusBadgeProps {
  status: ProductStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={`badge ${config.className}`}>{config.label}</span>
  );
}