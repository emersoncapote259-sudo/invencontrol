'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Package, CheckCircle2, AlertCircle, Plus } from 'lucide-react';
import { Product, categories, suppliers, units } from '@/app/product-management/components/productData';
import { useRouter } from 'next/navigation';

type FormData = Omit<Product, 'id'>;

export default function AddProductContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      sku: '',
      barcode: '',
      name: '',
      category: '',
      supplier: '',
      quantity: 0,
      minStock: 10,
      maxStock: 100,
      unitCost: 0,
      salePrice: 0,
      unit: 'unidad',
      expiryDate: '',
      status: 'activo',
      location: '',
      notes: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    // BACKEND INTEGRATION POINT: POST /api/products
    await new Promise((r) => setTimeout(r, 900));
    setIsLoading(false);
    setSaveSuccess(true);
    reset();
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Plus size={22} className="text-primary" />
            <h1 className="page-title">Agregar Nuevo Producto</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Registra un nuevo producto en el inventario
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.push('/product-management')}
          className="btn-secondary"
        >
          Ver todos los productos
        </button>
      </div>

      {/* Success */}
      {saveSuccess && (
        <div className="flex items-center gap-3 bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 fade-in">
          <CheckCircle2 size={18} className="text-gray-800 flex-shrink-0" />
          <p className="text-sm text-gray-800 font-medium">
            Producto registrado exitosamente en el inventario.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <div className="card p-6">
          <h2 className="section-header mb-4">Información Básica</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="label-text">Nombre del Producto *</label>
              <input
                type="text"
                className={`input-field ${errors.name ? 'border-red-400' : ''}`}
                placeholder="Ej: Leche entera 1L Alpina"
                {...register('name', { required: 'El nombre es obligatorio.' })}
              />
              {errors.name && (
                <p className="error-text flex items-center gap-1 mt-1">
                  <AlertCircle size={12} /> {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="label-text">SKU</label>
              <input
                type="text"
                className="input-field"
                placeholder="PRD-0001"
                {...register('sku')}
              />
            </div>
            <div>
              <label className="label-text">Código de Barras</label>
              <input
                type="text"
                className="input-field"
                placeholder="7702001110032"
                {...register('barcode')}
              />
            </div>
            <div>
              <label className="label-text">Categoría *</label>
              <select
                className={`input-field ${errors.category ? 'border-red-400' : ''}`}
                {...register('category', { required: 'La categoría es obligatoria.' })}
              >
                <option value="">Seleccionar categoría</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.category && (
                <p className="error-text flex items-center gap-1 mt-1">
                  <AlertCircle size={12} /> {errors.category.message}
                </p>
              )}
            </div>
            <div>
              <label className="label-text">Proveedor</label>
              <select className="input-field" {...register('supplier')}>
                <option value="">Seleccionar proveedor</option>
                {suppliers.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-text">Unidad de Medida</label>
              <select className="input-field" {...register('unit')}>
                {units.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stock & Pricing */}
        <div className="card p-6">
          <h2 className="section-header mb-4">Stock y Precios</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="label-text">Cantidad Inicial *</label>
              <input
                type="number"
                min={0}
                className={`input-field ${errors.quantity ? 'border-red-400' : ''}`}
                {...register('quantity', { required: true, min: 0, valueAsNumber: true })}
              />
            </div>
            <div>
              <label className="label-text">Stock Mínimo</label>
              <input
                type="number"
                min={0}
                className="input-field"
                {...register('minStock', { min: 0, valueAsNumber: true })}
              />
            </div>
            <div>
              <label className="label-text">Stock Máximo</label>
              <input
                type="number"
                min={0}
                className="input-field"
                {...register('maxStock', { min: 0, valueAsNumber: true })}
              />
            </div>
            <div>
              <label className="label-text">Costo Unitario ($) *</label>
              <input
                type="number"
                min={0}
                step="0.01"
                className={`input-field ${errors.unitCost ? 'border-red-400' : ''}`}
                {...register('unitCost', { required: true, min: 0, valueAsNumber: true })}
              />
            </div>
            <div>
              <label className="label-text">Precio de Venta ($) *</label>
              <input
                type="number"
                min={0}
                step="0.01"
                className={`input-field ${errors.salePrice ? 'border-red-400' : ''}`}
                {...register('salePrice', { required: true, min: 0, valueAsNumber: true })}
              />
            </div>
            <div>
              <label className="label-text">Estado</label>
              <select className="input-field" {...register('status')}>
                <option value="activo">Activo</option>
                <option value="stock_bajo">Stock Bajo</option>
                <option value="sin_stock">Sin Stock</option>
                <option value="por_vencer">Por Vencer</option>
                <option value="descontinuado">Descontinuado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="card p-6">
          <h2 className="section-header mb-4">Información Adicional</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label-text">Fecha de Vencimiento</label>
              <input
                type="date"
                className="input-field"
                {...register('expiryDate')}
              />
            </div>
            <div>
              <label className="label-text">Ubicación en Bodega</label>
              <input
                type="text"
                className="input-field"
                placeholder="Ej: Estante A-1, Nevera B-2"
                {...register('location')}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label-text">Notas</label>
              <textarea
                className="input-field resize-none"
                rows={3}
                placeholder="Observaciones adicionales sobre el producto…"
                {...register('notes')}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="btn-secondary"
          >
            Limpiar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary gap-2 min-w-[180px]"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Guardando…
              </span>
            ) : (
              <>
                <Package size={15} />
                Guardar Producto
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
