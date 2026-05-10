'use client';

import React, { useState } from 'react';
import {
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Eye,
  Package,
} from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import { ProductStatus } from '@/components/ui/StatusBadge';
import ConfirmModal from '@/components/ui/ConfirmModal';
import EmptyState from '@/components/ui/EmptyState';
import { Product } from './productData';

type SortKey = keyof Product;
type SortDir = 'asc' | 'desc';

interface ProductTableProps {
  products: Product[];
  selectedIds: Set<string>;
  onSelectionChange: (ids: Set<string>) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onBulkDelete: () => void;
}

function SortIcon({
  column,
  sortKey,
  sortDir,
}: {
  column: SortKey;
  sortKey: SortKey | null;
  sortDir: SortDir;
}) {
  if (sortKey !== column)
    return <ChevronsUpDown size={13} className="text-muted-foreground/50" />;
  return sortDir === 'asc' ? (
    <ChevronUp size={13} className="text-primary" />
  ) : (
    <ChevronDown size={13} className="text-primary" />
  );
}

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50];

export default function ProductTable({
  products,
  selectedIds,
  onSelectionChange,
  onEdit,
  onDelete,
  onBulkDelete,
}: ProductTableProps) {
  const [sortKey, setSortKey] = useState<SortKey | null>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [bulkConfirmOpen, setBulkConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const sorted = [...products].sort((a, b) => {
    if (!sortKey) return 0;
    const av = a[sortKey];
    const bv = b[sortKey];
    if (typeof av === 'number' && typeof bv === 'number') {
      return sortDir === 'asc' ? av - bv : bv - av;
    }
    return sortDir === 'asc'
      ? String(av).localeCompare(String(bv))
      : String(bv).localeCompare(String(av));
  });

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(1);
  };

  const toggleAll = () => {
    if (selectedIds.size === paginated.length) {
      onSelectionChange(new Set());
    } else {
      onSelectionChange(new Set(paginated.map((p) => p.id)));
    }
  };

  const toggleOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onSelectionChange(next);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    await new Promise((r) => setTimeout(r, 600));
    onDelete(deleteTarget.id);
    setDeleteTarget(null);
    setIsDeleting(false);
  };

  const handleBulkDeleteConfirm = async () => {
    setIsDeleting(true);
    await new Promise((r) => setTimeout(r, 700));
    onBulkDelete();
    setBulkConfirmOpen(false);
    setIsDeleting(false);
  };

  const formatCurrency = (v: number) =>
    `$${v.toLocaleString('es-CO')}`;

  const columns: { key: SortKey; label: string; sortable?: boolean }[] = [
    { key: 'sku', label: 'SKU', sortable: true },
    { key: 'name', label: 'Producto', sortable: true },
    { key: 'category', label: 'Categoría', sortable: true },
    { key: 'supplier', label: 'Proveedor', sortable: true },
    { key: 'quantity', label: 'Cant.', sortable: true },
    { key: 'minStock', label: 'Stock Mín.', sortable: true },
    { key: 'unitCost', label: 'Costo Unit.', sortable: true },
    { key: 'salePrice', label: 'Precio Venta', sortable: true },
    { key: 'expiryDate', label: 'Vencimiento', sortable: true },
    { key: 'status', label: 'Estado', sortable: true },
  ];

  return (
    <>
      {/* Bulk action bar */}
      {selectedIds.size > 0 && (
        <div className="slide-up fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-foreground text-background rounded-xl shadow-2xl px-5 py-3 flex items-center gap-4">
          <span className="text-sm font-medium">
            {selectedIds.size} producto{selectedIds.size > 1 ? 's' : ''} seleccionado{selectedIds.size > 1 ? 's' : ''}
          </span>
          <div className="w-px h-5 bg-white/20" />
          <button
            onClick={() => setBulkConfirmOpen(true)}
            className="flex items-center gap-1.5 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
          >
            <Trash2 size={15} />
            Eliminar selección
          </button>
          <button
            onClick={() => onSelectionChange(new Set())}
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Cancelar
          </button>
        </div>
      )}

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[1000px]">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {/* Checkbox */}
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={
                      paginated.length > 0 && selectedIds.size === paginated.length}
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-input accent-primary"
                    aria-label="Seleccionar todos"
                  />
                </th>
                {columns.map((col) => (
                  <th
                    key={`th-${col.key}`}
                    className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap"
                  >
                    {col.sortable ? (
                      <button
                        onClick={() => toggleSort(col.key)}
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                      >
                        {col.label}
                        <SortIcon column={col.key} sortKey={sortKey} sortDir={sortDir} />
                      </button>
                    ) : (
                      col.label
                    )}
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={12}>
                    <EmptyState
                      icon={<Package size={24} className="text-muted-foreground" />}
                      title="No se encontraron productos"
                      description="Ningún producto coincide con los filtros aplicados. Intenta con otros criterios de búsqueda."
                      action={
                        <button className="btn-primary gap-2 mt-2">
                          + Agregar Producto
                        </button>
                      }
                    />
                  </td>
                </tr>
              ) : (
                paginated.map((product) => {
                  const isSelected = selectedIds.has(product.id);
                  const isLow = product.quantity <= product.minStock && product.quantity > 0;
                  const isOut = product.quantity === 0;

                  return (
                    <tr
                      key={product.id}
                      className={`group transition-colors duration-100 ${
                        isSelected
                          ? 'bg-gray-100'
                          : isOut
                          ? 'bg-red-50/30 hover:bg-red-50/50'
                          : isLow
                          ? 'bg-amber-50/30 hover:bg-amber-50/50' :'hover:bg-muted/40'
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleOne(product.id)}
                          className="w-4 h-4 rounded border-input accent-primary"
                        />
                      </td>

                      {/* SKU */}
                      <td className="px-4 py-3">
                        <span className="text-xs font-mono text-muted-foreground">
                          {product.sku}
                        </span>
                      </td>

                      {/* Name */}
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-foreground truncate max-w-[200px]">
                            {product.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                            {product.barcode}
                          </p>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3">
                        <span className="badge bg-blue-100 text-blue-700">
                          {product.category}
                        </span>
                      </td>

                      {/* Supplier */}
                      <td className="px-4 py-3">
                        <p className="text-xs text-muted-foreground truncate max-w-[140px]">
                          {product.supplier}
                        </p>
                      </td>

                      {/* Quantity */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`font-bold tabular-nums text-sm ${
                              isOut
                                ? 'text-red-600'
                                : isLow
                                ? 'text-amber-600' :'text-foreground'
                            }`}
                          >
                            {product.quantity}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {product.unit}
                          </span>
                        </div>
                        {/* Mini stock bar */}
                        <div className="w-16 h-1 bg-muted rounded-full mt-1 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              isOut
                                ? 'bg-red-500'
                                : isLow
                                ? 'bg-amber-500' :'bg-primary'
                            }`}
                            style={{
                              width: `${Math.min(
                                100,
                                (product.quantity / product.maxStock) * 100
                              )}%`,
                            }}
                          />
                        </div>
                      </td>

                      {/* Min Stock */}
                      <td className="px-4 py-3">
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {product.minStock}
                        </span>
                      </td>

                      {/* Unit Cost */}
                      <td className="px-4 py-3">
                        <span className="text-sm tabular-nums font-medium text-foreground">
                          {formatCurrency(product.unitCost)}
                        </span>
                      </td>

                      {/* Sale Price */}
                      <td className="px-4 py-3">
                        <span className="text-sm tabular-nums font-medium text-primary">
                          {formatCurrency(product.salePrice)}
                        </span>
                      </td>

                      {/* Expiry Date */}
                      <td className="px-4 py-3">
                        {product.expiryDate ? (
                          <span
                            className={`text-xs tabular-nums ${
                              product.status === 'por_vencer' ?'text-orange-600 font-semibold' :'text-muted-foreground'
                            }`}
                          >
                            {product.expiryDate.split('-').reverse().join('/')}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <StatusBadge status={product.status as ProductStatus} />
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                          <div className="tooltip-wrapper">
                            <button
                              onClick={() => onEdit(product)}
                              className="btn-ghost p-1.5 rounded-lg"
                              aria-label={`Editar ${product.name}`}
                            >
                              <Pencil size={15} />
                            </button>
                            <span className="tooltip-label">Editar producto</span>
                          </div>
                          <div className="tooltip-wrapper">
                            <button
                              className="btn-ghost p-1.5 rounded-lg"
                              aria-label={`Ver detalle ${product.name}`}
                            >
                              <Eye size={15} />
                            </button>
                            <span className="tooltip-label">Ver detalle</span>
                          </div>
                          <div className="tooltip-wrapper">
                            <button
                              onClick={() => setDeleteTarget(product)}
                              className="btn-ghost p-1.5 rounded-lg hover:bg-red-50 hover:text-red-600"
                              aria-label={`Eliminar ${product.name}`}
                            >
                              <Trash2 size={15} />
                            </button>
                            <span className="tooltip-label">
                              Eliminar producto — no se puede deshacer
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {sorted.length > 0 && (
          <div className="px-5 py-3 border-t border-border flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Filas por página:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setPage(1);
                }}
                className="text-xs border border-input rounded-md px-2 py-1 bg-background focus:outline-none focus:ring-1 focus:ring-ring"
              >
                {ITEMS_PER_PAGE_OPTIONS.map((n) => (
                  <option key={`ipp-${n}`} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <span className="text-xs text-muted-foreground">
                {(page - 1) * itemsPerPage + 1}–
                {Math.min(page * itemsPerPage, sorted.length)} de {sorted.length} productos
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(1)}
                disabled={page === 1}
                className="btn-ghost px-2 py-1 text-xs disabled:opacity-40"
              >
                «
              </button>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="btn-ghost px-2 py-1 text-xs disabled:opacity-40"
              >
                ‹
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum =
                  totalPages <= 5
                    ? i + 1
                    : page <= 3
                    ? i + 1
                    : page >= totalPages - 2
                    ? totalPages - 4 + i
                    : page - 2 + i;
                return (
                  <button
                    key={`page-${pageNum}`}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${
                      page === pageNum
                        ? 'bg-primary text-primary-foreground'
                        : 'btn-ghost'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="btn-ghost px-2 py-1 text-xs disabled:opacity-40"
              >
                ›
              </button>
              <button
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
                className="btn-ghost px-2 py-1 text-xs disabled:opacity-40"
              >
                »
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Single delete confirm */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Eliminar producto"
        message={`¿Estás seguro de que deseas eliminar "${deleteTarget?.name}"? Esta acción no se puede deshacer y eliminará todo el historial asociado.`}
        confirmLabel="Eliminar producto"
        isLoading={isDeleting}
      />

      {/* Bulk delete confirm */}
      <ConfirmModal
        isOpen={bulkConfirmOpen}
        onClose={() => setBulkConfirmOpen(false)}
        onConfirm={handleBulkDeleteConfirm}
        title="Eliminar productos seleccionados"
        message={`¿Eliminar ${selectedIds.size} producto${selectedIds.size > 1 ? 's' : ''}? Esta acción no se puede deshacer.`}
        confirmLabel={`Eliminar ${selectedIds.size} productos`}
        isLoading={isDeleting}
      />
    </>
  );
}