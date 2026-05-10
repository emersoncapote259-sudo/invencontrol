'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { Product, categories, suppliers, units } from './productData';
import { ProductStatus } from '@/components/ui/StatusBadge';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Product) => void;
  product: Product | null;
}

type FormData = Omit<Product, 'id'>;

export default function ProductFormModal({
  isOpen,
  onClose,
  onSave,
  product,
}: ProductFormModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    defaultValues: {
      sku: '',
      barcode: '',
      name: '',
      category: '',
      supplier: '',
      quantity: 0,
      minStock: 0,
      maxStock: 0,
      unitCost: 0,
      salePrice: 0,
      unit: 'unidad',
      expiryDate: '',
      status: 'activo',
      location: '',
      notes: '',
    },
  });

  const quantityValue = watch('quantity');
  const minStockValue = watch('minStock');

  useEffect(() => {
    if (product) {
      reset({
        sku: product.sku,
        barcode: product.barcode,
        name: product.name,
        category: product.category,
        supplier: product.supplier,
        quantity: product.quantity,
        minStock: product.minStock,
        maxStock: product.maxStock,
        unitCost: product.unitCost,
        salePrice: product.salePrice,
        unit: product.unit,
        expiryDate: product.expiryDate,
        status: product.status,
        location: product.location,
        notes: product.notes,
      });
    } else {
      reset({
        sku: `PRD-${String(Math.floor(100 + Math.random() * 900)).padStart(4, '0')}`,
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
      });
    }
    setSaveSuccess(false);
  }, [product, isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    // BACKEND INTEGRATION POINT: POST /api/products or PUT /api/products/:id
    await new Promise((r) => setTimeout(r, 900));

    // Auto-compute status based on quantity
    let computedStatus: ProductStatus = data.status as ProductStatus;
    if (data.quantity === 0) computedStatus = 'sin_stock';
    else if (data.quantity <= data.minStock) computedStatus = 'stock_bajo';

    onSave({ ...data, status: computedStatus, id: product?.id ?? '' });
    setSaveSuccess(true);
    setIsLoading(false);
    setTimeout(() => {
      onClose();
      setSaveSuccess(false);
    }, 700);
  };

  const isEditing = !!product;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? `Editar: ${product?.name}` : 'Agregar Nuevo Producto'}
      size="xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="px-6 py-5 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Success banner */}
          {saveSuccess && (
            <div className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 fade-in">
              <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
              <p className="text-sm text-gray-800 font-medium">
                Producto {isEditing ? 'actualizado' : 'registrado'} correctamente.
              </p>
            </div>
          )}

          {/* Section 1: Identification */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-primary rounded-full" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Identificación del Producto
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* SKU */}
              <div>
                <label htmlFor="sku" className="label-text">
                  Código SKU
                </label>
                <p className="helper-text">Código interno único del producto.</p>
                <input
                  id="sku"
                  type="text"
                  className={`input-field mt-1 font-mono ${errors.sku ? 'border-red-400' : ''}`}
                  {...register('sku', { required: 'El SKU es obligatorio.' })}
                />
                {errors.sku && (
                  <p className="error-text">
                    <AlertCircle size={12} />
                    {errors.sku.message}
                  </p>
                )}
              </div>

              {/* Barcode */}
              <div>
                <label htmlFor="barcode" className="label-text">
                  Código de Barras
                </label>
                <p className="helper-text">EAN-13 o código del fabricante.</p>
                <input
                  id="barcode"
                  type="text"
                  placeholder="Ej. 7702001110032"
                  className={`input-field mt-1 font-mono ${errors.barcode ? 'border-red-400' : ''}`}
                  {...register('barcode', {
                    pattern: {
                      value: /^\d{8,14}$/,
                      message: 'Debe ser numérico de 8–14 dígitos.',
                    },
                  })}
                />
                {errors.barcode && (
                  <p className="error-text">
                    <AlertCircle size={12} />
                    {errors.barcode.message}
                  </p>
                )}
              </div>

              {/* Unit */}
              <div>
                <label htmlFor="unit" className="label-text">
                  Unidad de Medida
                </label>
                <p className="helper-text">Cómo se mide este producto.</p>
                <select
                  id="unit"
                  className="input-field mt-1"
                  {...register('unit', { required: 'Selecciona la unidad.' })}
                >
                  {units.map((u) => (
                    <option key={`unit-opt-${u}`} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product Name — full width */}
            <div className="mt-4">
              <label htmlFor="name" className="label-text">
                Nombre del Producto
              </label>
              <p className="helper-text">Nombre completo incluyendo marca y presentación.</p>
              <input
                id="name"
                type="text"
                placeholder="Ej. Leche entera 1L Alpina"
                className={`input-field mt-1 ${errors.name ? 'border-red-400' : ''}`}
                {...register('name', {
                  required: 'El nombre es obligatorio.',
                  minLength: { value: 3, message: 'Mínimo 3 caracteres.' },
                })}
              />
              {errors.name && (
                <p className="error-text">
                  <AlertCircle size={12} />
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

          {/* Section 2: Classification */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-blue-500 rounded-full" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Clasificación y Proveedor
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category */}
              <div>
                <label htmlFor="category" className="label-text">
                  Categoría
                </label>
                <select
                  id="category"
                  className={`input-field ${errors.category ? 'border-red-400' : ''}`}
                  {...register('category', { required: 'Selecciona una categoría.' })}
                >
                  <option value="">Seleccionar categoría…</option>
                  {categories.map((c) => (
                    <option key={`cat-form-${c}`} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="error-text">
                    <AlertCircle size={12} />
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Supplier */}
              <div>
                <label htmlFor="supplier" className="label-text">
                  Proveedor
                </label>
                <select
                  id="supplier"
                  className={`input-field ${errors.supplier ? 'border-red-400' : ''}`}
                  {...register('supplier', { required: 'Selecciona un proveedor.' })}
                >
                  <option value="">Seleccionar proveedor…</option>
                  {suppliers.map((s) => (
                    <option key={`sup-form-${s}`} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.supplier && (
                  <p className="error-text">
                    <AlertCircle size={12} />
                    {errors.supplier.message}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="label-text">
                  Ubicación en Tienda
                </label>
                <p className="helper-text">Estante, nevera o zona de almacenamiento.</p>
                <input
                  id="location"
                  type="text"
                  placeholder="Ej. Nevera A-1, Estante B-3"
                  className="input-field"
                  {...register('location')}
                />
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="label-text">
                  Estado
                </label>
                <p className="helper-text">Se actualiza automáticamente según el stock.</p>
                <select
                  id="status"
                  className="input-field"
                  {...register('status')}
                >
                  <option value="activo">Activo</option>
                  <option value="stock_bajo">Stock Bajo</option>
                  <option value="sin_stock">Sin Stock</option>
                  <option value="por_vencer">Por Vencer</option>
                  <option value="descontinuado">Descontinuado</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Stock */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-amber-500 rounded-full" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Control de Stock
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Quantity */}
              <div>
                <label htmlFor="quantity" className="label-text">
                  Cantidad Actual
                </label>
                <p className="helper-text">Unidades disponibles en bodega.</p>
                <input
                  id="quantity"
                  type="number"
                  min="0"
                  className={`input-field tabular-nums ${
                    errors.quantity ? 'border-red-400' : ''
                  } ${
                    quantityValue <= minStockValue && quantityValue > 0
                      ? 'border-amber-400 bg-amber-50'
                      : quantityValue === 0
                      ? 'border-red-400 bg-red-50' :''
                  }`}
                  {...register('quantity', {
                    required: 'La cantidad es obligatoria.',
                    min: { value: 0, message: 'No puede ser negativa.' },
                    valueAsNumber: true,
                  })}
                />
                {errors.quantity && (
                  <p className="error-text">
                    <AlertCircle size={12} />
                    {errors.quantity.message}
                  </p>
                )}
              </div>

              {/* Min Stock */}
              <div>
                <label htmlFor="minStock" className="label-text">
                  Stock Mínimo
                </label>
                <p className="helper-text">Alerta cuando baje de este nivel.</p>
                <input
                  id="minStock"
                  type="number"
                  min="0"
                  className={`input-field tabular-nums ${errors.minStock ? 'border-red-400' : ''}`}
                  {...register('minStock', {
                    required: 'El stock mínimo es obligatorio.',
                    min: { value: 0, message: 'No puede ser negativo.' },
                    valueAsNumber: true,
                  })}
                />
                {errors.minStock && (
                  <p className="error-text">
                    <AlertCircle size={12} />
                    {errors.minStock.message}
                  </p>
                )}
              </div>

              {/* Max Stock */}
              <div>
                <label htmlFor="maxStock" className="label-text">
                  Stock Máximo
                </label>
                <p className="helper-text">Nivel de alerta por exceso de inventario.</p>
                <input
                  id="maxStock"
                  type="number"
                  min="0"
                  className={`input-field tabular-nums ${errors.maxStock ? 'border-red-400' : ''}`}
                  {...register('maxStock', {
                    required: 'El stock máximo es obligatorio.',
                    min: { value: 1, message: 'Debe ser mayor a 0.' },
                    valueAsNumber: true,
                  })}
                />
                {errors.maxStock && (
                  <p className="error-text">
                    <AlertCircle size={12} />
                    {errors.maxStock.message}
                  </p>
                )}
              </div>
            </div>

            {/* Stock health indicator */}
            {quantityValue !== undefined && minStockValue !== undefined && (
              <div className={`mt-3 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${
                quantityValue === 0
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : quantityValue <= minStockValue
                  ? 'bg-amber-50 text-amber-700 border border-amber-200' :'bg-gray-100 text-gray-800 border border-gray-300'
              }`}>
                <span>
                  {quantityValue === 0
                    ? '⚠ Sin stock — se generará alerta crítica al guardar.'
                    : quantityValue <= minStockValue
                    ? `⚠ Stock bajo el mínimo (${minStockValue}) — se generará alerta de reorden.`
                    : '✓ Nivel de stock saludable.'}
                </span>
              </div>
            )}
          </div>

          {/* Section 4: Pricing */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-gray-800 rounded-full" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Precios
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Unit Cost */}
              <div>
                <label htmlFor="unitCost" className="label-text">
                  Costo Unitario ($)
                </label>
                <p className="helper-text">Precio de compra al proveedor.</p>
                <input
                  id="unitCost"
                  type="number"
                  min="0"
                  step="100"
                  className={`input-field tabular-nums ${errors.unitCost ? 'border-red-400' : ''}`}
                  {...register('unitCost', {
                    required: 'El costo es obligatorio.',
                    min: { value: 0, message: 'No puede ser negativo.' },
                    valueAsNumber: true,
                  })}
                />
                {errors.unitCost && (
                  <p className="error-text">
                    <AlertCircle size={12} />
                    {errors.unitCost.message}
                  </p>
                )}
              </div>

              {/* Sale Price */}
              <div>
                <label htmlFor="salePrice" className="label-text">
                  Precio de Venta ($)
                </label>
                <p className="helper-text">Precio al que se vende al cliente.</p>
                <input
                  id="salePrice"
                  type="number"
                  min="0"
                  step="100"
                  className={`input-field tabular-nums ${errors.salePrice ? 'border-red-400' : ''}`}
                  {...register('salePrice', {
                    required: 'El precio de venta es obligatorio.',
                    min: { value: 0, message: 'No puede ser negativo.' },
                    valueAsNumber: true,
                  })}
                />
                {errors.salePrice && (
                  <p className="error-text">
                    <AlertCircle size={12} />
                    {errors.salePrice.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 5: Expiry & Notes */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-orange-500 rounded-full" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Vencimiento y Notas
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Expiry Date */}
              <div>
                <label htmlFor="expiryDate" className="label-text">
                  Fecha de Vencimiento
                </label>
                <p className="helper-text">
                  Dejar vacío si el producto no vence.
                </p>
                <input
                  id="expiryDate"
                  type="date"
                  className="input-field"
                  {...register('expiryDate')}
                />
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="label-text">
                  Notas Internas
                </label>
                <p className="helper-text">
                  Observaciones para el equipo de bodega.
                </p>
                <textarea
                  id="notes"
                  rows={3}
                  placeholder="Ej. Producto de alta rotación, revisar temperatura…"
                  className="input-field resize-none"
                  {...register('notes')}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sticky footer */}
        <div className="px-6 py-4 border-t border-border bg-muted/30 flex items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            {isDirty && !saveSuccess && (
              <span className="text-xs text-amber-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                Cambios sin guardar
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading || saveSuccess}
              className="btn-primary min-w-[140px]"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Guardando…
                </span>
              ) : saveSuccess ? (
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={15} />
                  Guardado ✓
                </span>
              ) : isEditing ? (
                'Guardar Cambios'
              ) : (
                'Registrar Producto'
              )}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}