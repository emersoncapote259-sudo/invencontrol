'use client';

import React, { useState } from 'react';
import { ArrowUpFromLine, Plus, CheckCircle2, AlertCircle, Search, Trash2 } from 'lucide-react';
import { initialProducts, Product } from '@/app/product-management/components/productData';

interface ExitItem {
  productId: string;
  productName: string;
  sku: string;
  category: string;
  quantity: number;
  salePrice: number;
  unit: string;
  currentStock: number;
}

interface ExitForm {
  destination: string;
  referenceNumber: string;
  date: string;
  reason: string;
  notes: string;
  items: ExitItem[];
}

const reasonOptions = [
  'Venta mostrador',
  'Venta a domicilio',
  'Devolución a proveedor',
  'Merma / Pérdida',
  'Vencimiento',
  'Ajuste de inventario',
  'Transferencia entre bodegas',
  'Otro',
];

export default function InventoryExitsContent() {
  const [products] = useState<Product[]>(initialProducts);
  const [form, setForm] = useState<ExitForm>({
    destination: '',
    referenceNumber: '',
    date: new Date().toISOString().split('T')[0],
    reason: 'Venta mostrador',
    notes: '',
    items: [],
  });
  const [productSearch, setProductSearch] = useState('');
  const [showProductSearch, setShowProductSearch] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const filteredProducts = products.filter(
    (p) =>
      productSearch === '' ||
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.barcode.includes(productSearch)
  );

  const addItem = (product: Product) => {
    const exists = form.items.find((i) => i.productId === product.id);
    if (exists) {
      setForm((prev) => ({
        ...prev,
        items: prev.items.map((i) =>
          i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        items: [
          ...prev.items,
          {
            productId: product.id,
            productName: product.name,
            sku: product.sku,
            category: product.category,
            quantity: 1,
            salePrice: product.salePrice,
            unit: product.unit,
            currentStock: product.quantity,
          },
        ],
      }));
    }
    setProductSearch('');
    setShowProductSearch(false);
  };

  const removeItem = (productId: string) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i.productId !== productId),
    }));
  };

  const updateItemQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setForm((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i.productId === productId ? { ...i, quantity } : i
      ),
    }));
  };

  const totalItems = form.items.reduce((acc, i) => acc + i.quantity, 0);
  const totalValue = form.items.reduce((acc, i) => acc + i.quantity * i.salePrice, 0);

  const hasStockError = form.items.some((i) => i.quantity > i.currentStock);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.items.length === 0) {
      setError('Debes agregar al menos un producto a la salida.');
      return;
    }
    if (hasStockError) {
      setError('Uno o más productos tienen cantidad mayor al stock disponible.');
      return;
    }
    setSubmitting(true);
    // BACKEND INTEGRATION POINT: POST /api/inventory/exits
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSuccess(true);
    setForm({
      destination: '',
      referenceNumber: '',
      date: new Date().toISOString().split('T')[0],
      reason: 'Venta mostrador',
      notes: '',
      items: [],
    });
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ArrowUpFromLine size={22} className="text-amber-600" />
            <h1 className="page-title">Registro de Salidas</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Registra la salida de mercancía del inventario
          </p>
        </div>
      </div>

      {/* Success */}
      {success && (
        <div className="flex items-center gap-3 bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 fade-in">
          <CheckCircle2 size={18} className="text-gray-800 flex-shrink-0" />
          <p className="text-sm text-gray-800 font-medium">
            Salida registrada exitosamente. El inventario ha sido actualizado.
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3 fade-in">
          <AlertCircle size={18} className="text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Info */}
        <div className="card p-6">
          <h2 className="section-header mb-4">Información General</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="label-text">Destino / Cliente</label>
              <input
                type="text"
                className="input-field"
                placeholder="Nombre del cliente o destino"
                value={form.destination}
                onChange={(e) => setForm((prev) => ({ ...prev, destination: e.target.value }))}
              />
            </div>
            <div>
              <label className="label-text">N° Referencia</label>
              <input
                type="text"
                className="input-field"
                placeholder="VTA-0001"
                value={form.referenceNumber}
                onChange={(e) => setForm((prev) => ({ ...prev, referenceNumber: e.target.value }))}
              />
            </div>
            <div>
              <label className="label-text">Fecha de Salida *</label>
              <input
                type="date"
                className="input-field"
                value={form.date}
                onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
              />
            </div>
            <div>
              <label className="label-text">Motivo *</label>
              <select
                className="input-field"
                value={form.reason}
                onChange={(e) => setForm((prev) => ({ ...prev, reason: e.target.value }))}
              >
                {reasonOptions.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="label-text">Observaciones</label>
            <textarea
              className="input-field resize-none"
              rows={2}
              placeholder="Notas adicionales sobre esta salida…"
              value={form.notes}
              onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
            />
          </div>
        </div>

        {/* Products */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-header">Productos a Retirar</h2>
            <button
              type="button"
              onClick={() => setShowProductSearch((v) => !v)}
              className="btn-primary gap-2 text-sm"
            >
              <Plus size={15} />
              Agregar Producto
            </button>
          </div>

          {/* Product search */}
          {showProductSearch && (
            <div className="mb-4 p-4 bg-muted/40 rounded-lg border border-border">
              <div className="relative mb-3">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  className="input-field pl-9"
                  placeholder="Buscar por nombre, SKU o código de barras…"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="max-h-52 overflow-y-auto space-y-1">
                {filteredProducts.slice(0, 8).map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => addItem(p)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-card border border-transparent hover:border-border transition-all text-left"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.sku} · {p.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Stock disponible</p>
                      <p className={`text-sm font-semibold ${p.quantity === 0 ? 'text-red-600' : p.quantity < p.minStock ? 'text-amber-600' : 'text-foreground'}`}>
                        {p.quantity} {p.unit}
                      </p>
                    </div>
                  </button>
                ))}
                {filteredProducts.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No se encontraron productos</p>
                )}
              </div>
            </div>
          )}

          {/* Items table */}
          {form.items.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    {['Producto', 'SKU', 'Stock Actual', 'Cantidad', 'Precio Unit.', 'Subtotal', ''].map((col) => (
                      <th key={col} className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {form.items.map((item) => {
                    const overStock = item.quantity > item.currentStock;
                    return (
                      <tr key={item.productId} className={`hover:bg-muted/30 ${overStock ? 'bg-red-50' : ''}`}>
                        <td className="px-3 py-3">
                          <p className="font-medium text-foreground truncate max-w-[180px]">{item.productName}</p>
                        </td>
                        <td className="px-3 py-3 text-muted-foreground">{item.sku}</td>
                        <td className="px-3 py-3">
                          <span className={`badge ${item.currentStock === 0 ? 'bg-red-100 text-red-700' : item.currentStock < 10 ? 'bg-amber-100 text-amber-700' : 'bg-gray-200 text-gray-800'}`}>
                            {item.currentStock} {item.unit}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) => updateItemQuantity(item.productId, parseInt(e.target.value) || 1)}
                            className={`input-field w-20 text-center py-1.5 ${overStock ? 'border-red-400 focus:ring-red-400' : ''}`}
                          />
                          {overStock && (
                            <p className="text-xs text-red-600 mt-1">Excede stock</p>
                          )}
                        </td>
                        <td className="px-3 py-3 text-muted-foreground">
                          ${item.salePrice.toLocaleString('es-CO')}
                        </td>
                        <td className="px-3 py-3 font-semibold text-foreground whitespace-nowrap">
                          ${(item.quantity * item.salePrice).toLocaleString('es-CO')}
                        </td>
                        <td className="px-3 py-3">
                          <button
                            type="button"
                            onClick={() => removeItem(item.productId)}
                            className="p-1.5 rounded-md text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-border rounded-lg">
              <ArrowUpFromLine size={32} className="text-muted-foreground mb-3" />
              <p className="text-sm font-medium text-muted-foreground">No hay productos agregados</p>
              <p className="text-xs text-muted-foreground mt-1">Haz clic en "Agregar Producto" para comenzar</p>
            </div>
          )}

          {/* Summary */}
          {form.items.length > 0 && (
            <div className="mt-4 flex items-center justify-end gap-6 pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{form.items.length}</span> producto(s) ·{' '}
                <span className="font-medium text-foreground">{totalItems}</span> unidades
              </div>
              <div className="text-base font-bold text-foreground">
                Total: ${totalValue.toLocaleString('es-CO')}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setForm({ destination: '', referenceNumber: '', date: new Date().toISOString().split('T')[0], reason: 'Venta mostrador', notes: '', items: [] })}
            className="btn-secondary"
          >
            Limpiar
          </button>
          <button
            type="submit"
            disabled={submitting || hasStockError}
            className="btn-primary gap-2 min-w-[160px] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Registrando…
              </span>
            ) : (
              <>
                <ArrowUpFromLine size={15} />
                Registrar Salida
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
