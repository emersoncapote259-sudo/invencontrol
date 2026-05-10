'use client';

import React, { useState } from 'react';
import { Plus, Download, Upload } from 'lucide-react';
import ProductFilters from './ProductFilters';
import ProductTable from './ProductTable';
import ProductFormModal from './ProductFormModal';
import { Product, initialProducts } from './productData';

export default function ProductManagementContent() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSupplier, setFilterSupplier] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filtered = products.filter((p) => {
    const matchSearch =
      search === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.barcode.includes(search);
    const matchCat = filterCategory === '' || p.category === filterCategory;
    const matchStatus = filterStatus === '' || p.status === filterStatus;
    const matchSupplier =
      filterSupplier === '' || p.supplier === filterSupplier;
    return matchSearch && matchCat && matchStatus && matchSupplier;
  });

  const handleAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    // BACKEND INTEGRATION POINT: DELETE /api/products/:id
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleBulkDelete = () => {
    // BACKEND INTEGRATION POINT: DELETE /api/products/bulk
    setProducts((prev) => prev.filter((p) => !selectedIds.has(p.id)));
    setSelectedIds(new Set());
  };

  const handleSave = (data: Product) => {
    // BACKEND INTEGRATION POINT: POST/PUT /api/products
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? { ...data, id: p.id } : p))
      );
    } else {
      const newId = `product-${Date.now()}`;
      setProducts((prev) => [{ ...data, id: newId }, ...prev]);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="page-title">Gestión de Productos</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {products.length} productos registrados — {filtered.length} visibles con filtros actuales
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="tooltip-wrapper">
            <button className="btn-secondary gap-2">
              <Upload size={15} />
              Importar
            </button>
            <span className="tooltip-label">Importar productos desde Excel</span>
          </div>
          <div className="tooltip-wrapper">
            <button className="btn-secondary gap-2">
              <Download size={15} />
              Exportar
            </button>
            <span className="tooltip-label">Exportar inventario a Excel</span>
          </div>
          <button onClick={handleAdd} className="btn-primary gap-2">
            <Plus size={15} />
            Agregar Producto
          </button>
        </div>
      </div>

      {/* Filters */}
      <ProductFilters
        search={search}
        onSearchChange={setSearch}
        filterCategory={filterCategory}
        onCategoryChange={setFilterCategory}
        filterStatus={filterStatus}
        onStatusChange={setFilterStatus}
        filterSupplier={filterSupplier}
        onSupplierChange={setFilterSupplier}
        products={products}
      />

      {/* Table */}
      <ProductTable
        products={filtered}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onBulkDelete={handleBulkDelete}
      />

      {/* Modal */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSave}
        product={editingProduct}
      />
    </div>
  );
}