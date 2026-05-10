'use client';

import React from 'react';
import { Search, X } from 'lucide-react';
import { Product } from './productData';
import { categories, suppliers } from './productData';

interface ProductFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  filterCategory: string;
  onCategoryChange: (v: string) => void;
  filterStatus: string;
  onStatusChange: (v: string) => void;
  filterSupplier: string;
  onSupplierChange: (v: string) => void;
  products: Product[];
}

const statusOptions = [
  { value: 'activo', label: 'Activo' },
  { value: 'stock_bajo', label: 'Stock Bajo' },
  { value: 'sin_stock', label: 'Sin Stock' },
  { value: 'por_vencer', label: 'Por Vencer' },
  { value: 'descontinuado', label: 'Descontinuado' },
];

export default function ProductFilters({
  search,
  onSearchChange,
  filterCategory,
  onCategoryChange,
  filterStatus,
  onStatusChange,
  filterSupplier,
  onSupplierChange,
}: ProductFiltersProps) {
  const hasFilters =
    search !== '' ||
    filterCategory !== '' ||
    filterStatus !== '' ||
    filterSupplier !== '';

  const clearAll = () => {
    onSearchChange('');
    onCategoryChange('');
    onStatusChange('');
    onSupplierChange('');
  };

  return (
    <div className="card p-4">
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Buscar por nombre, SKU o código de barras…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input-field pl-9"
          />
        </div>

        {/* Category */}
        <select
          value={filterCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="input-field w-auto min-w-[150px]"
        >
          <option value="">Todas las categorías</option>
          {categories.map((c) => (
            <option key={`cat-opt-${c}`} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          value={filterStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="input-field w-auto min-w-[150px]"
        >
          <option value="">Todos los estados</option>
          {statusOptions.map((s) => (
            <option key={`status-opt-${s.value}`} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        {/* Supplier */}
        <select
          value={filterSupplier}
          onChange={(e) => onSupplierChange(e.target.value)}
          className="input-field w-auto min-w-[180px]"
        >
          <option value="">Todos los proveedores</option>
          {suppliers.map((s) => (
            <option key={`supplier-opt-${s}`} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* Clear */}
        {hasFilters && (
          <button
            onClick={clearAll}
            className="btn-ghost gap-1.5 text-xs text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <X size={14} />
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Active filter chips */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border">
          {search && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
              Búsqueda: &ldquo;{search}&rdquo;
              <button onClick={() => onSearchChange('')} className="hover:text-blue-900">
                <X size={11} />
              </button>
            </span>
          )}
          {filterCategory && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
              Cat: {filterCategory}
              <button onClick={() => onCategoryChange('')} className="hover:text-purple-900">
                <X size={11} />
              </button>
            </span>
          )}
          {filterStatus && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
              Estado: {statusOptions.find((s) => s.value === filterStatus)?.label}
              <button onClick={() => onStatusChange('')} className="hover:text-amber-900">
                <X size={11} />
              </button>
            </span>
          )}
          {filterSupplier && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-200 text-gray-800 text-xs font-medium">
              Proveedor: {filterSupplier}
              <button onClick={() => onSupplierChange('')} className="hover:text-gray-900">
                <X size={11} />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}