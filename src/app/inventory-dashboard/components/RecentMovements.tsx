'use client';

import React, { useState } from 'react';
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Search,
  Filter,
} from 'lucide-react';

type MovementType = 'entrada' | 'salida';

interface Movement {
  id: string;
  type: MovementType;
  product: string;
  sku: string;
  category: string;
  quantity: number;
  unit: string;
  reason: string;
  user: string;
  date: string;
  time: string;
}

// BACKEND INTEGRATION POINT: GET /api/movements?limit=10&sort=date_desc
const movements: Movement[] = [
  {
    id: 'mov-001',
    type: 'entrada',
    product: 'Leche entera 1L Alpina',
    sku: 'PRD-0041',
    category: 'Lácteos',
    quantity: 48,
    unit: 'unidades',
    reason: 'Compra proveedor',
    user: 'María Alejandra',
    date: '10/05/2026',
    time: '16:45',
  },
  {
    id: 'mov-002',
    type: 'salida',
    product: 'Aceite vegetal 900ml Premier',
    sku: 'PRD-0083',
    category: 'Despensa',
    quantity: 24,
    unit: 'unidades',
    reason: 'Venta mostrador',
    user: 'Juan Camilo R.',
    date: '10/05/2026',
    time: '16:20',
  },
  {
    id: 'mov-003',
    type: 'salida',
    product: 'Arroz Diana 500g',
    sku: 'PRD-0027',
    category: 'Granos',
    quantity: 36,
    unit: 'unidades',
    reason: 'Venta mostrador',
    user: 'Juan Camilo R.',
    date: '10/05/2026',
    time: '15:58',
  },
  {
    id: 'mov-004',
    type: 'entrada',
    product: 'Jabón de baño Protex 125g',
    sku: 'PRD-0112',
    category: 'Aseo',
    quantity: 120,
    unit: 'unidades',
    reason: 'Compra proveedor',
    user: 'María Alejandra',
    date: '10/05/2026',
    time: '14:30',
  },
  {
    id: 'mov-005',
    type: 'salida',
    product: 'Yogur fresa 200g Colanta',
    sku: 'PRD-0019',
    category: 'Lácteos',
    quantity: 8,
    unit: 'unidades',
    reason: 'Venta mostrador',
    user: 'Luisa Fernanda M.',
    date: '10/05/2026',
    time: '14:05',
  },
  {
    id: 'mov-006',
    type: 'entrada',
    product: 'Pan tajado Bimbo 500g',
    sku: 'PRD-0064',
    category: 'Panadería',
    quantity: 30,
    unit: 'unidades',
    reason: 'Compra proveedor',
    user: 'María Alejandra',
    date: '10/05/2026',
    time: '10:15',
  },
  {
    id: 'mov-007',
    type: 'salida',
    product: 'Gaseosa Coca-Cola 1.5L',
    sku: 'PRD-0033',
    category: 'Bebidas',
    quantity: 15,
    unit: 'unidades',
    reason: 'Venta mostrador',
    user: 'Luisa Fernanda M.',
    date: '09/05/2026',
    time: '18:40',
  },
  {
    id: 'mov-008',
    type: 'entrada',
    product: 'Queso doble crema 500g',
    sku: 'PRD-0057',
    category: 'Lácteos',
    quantity: 20,
    unit: 'unidades',
    reason: 'Compra proveedor',
    user: 'María Alejandra',
    date: '09/05/2026',
    time: '16:00',
  },
];

export default function RecentMovements() {
  const [filter, setFilter] = useState<'todos' | 'entrada' | 'salida'>('todos');
  const [search, setSearch] = useState('');

  const filtered = movements.filter((m) => {
    const matchType = filter === 'todos' || m.type === filter;
    const matchSearch =
      search === '' ||
      m.product.toLowerCase().includes(search.toLowerCase()) ||
      m.sku.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="card">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="section-header">Movimientos Recientes</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Últimas entradas y salidas registradas
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Buscar producto…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-2 text-sm rounded-lg border border-input bg-background w-48 focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>
          {/* Type filter */}
          <div className="flex gap-1 bg-muted rounded-lg p-1">
            {(['todos', 'entrada', 'salida'] as const).map((f) => (
              <button
                key={`filter-${f}`}
                onClick={() => setFilter(f)}
                className={`text-xs font-medium px-3 py-1.5 rounded-md capitalize transition-all duration-150 ${
                  filter === f
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <button className="btn-ghost gap-1.5 text-xs">
            <Filter size={14} />
            Filtros
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {[
                'Tipo',
                'Producto',
                'SKU',
                'Categoría',
                'Cantidad',
                'Motivo',
                'Usuario',
                'Fecha',
                'Hora',
              ].map((col) => (
                <th
                  key={`th-mov-${col}`}
                  className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((m) => (
              <tr
                key={m.id}
                className="hover:bg-muted/40 transition-colors duration-100"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {m.type === 'entrada' ? (
                      <ArrowDownToLine
                        size={14}
                        className="text-primary flex-shrink-0"
                      />
                    ) : (
                      <ArrowUpFromLine
                        size={14}
                        className="text-amber-600 flex-shrink-0"
                      />
                    )}
                    <span
                      className={`badge ${
                        m.type === 'entrada' ?'bg-gray-200 text-gray-800' :'bg-gray-400 text-gray-900'
                      }`}
                    >
                      {m.type === 'entrada' ? 'Entrada' : 'Salida'}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-foreground text-sm truncate max-w-[200px]">
                    {m.product}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs font-mono text-muted-foreground">
                    {m.sku}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="badge bg-blue-100 text-blue-700">
                    {m.category}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`font-semibold tabular-nums ${
                      m.type === 'entrada' ? 'text-primary' : 'text-amber-700'
                    }`}
                  >
                    {m.type === 'entrada' ? '+' : '-'}
                    {m.quantity}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">
                    {m.unit}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                  {m.reason}
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                  {m.user}
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap tabular-nums">
                  {m.date}
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground tabular-nums">
                  {m.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm text-muted-foreground">
              No se encontraron movimientos con los filtros aplicados.
            </p>
          </div>
        )}
      </div>

      <div className="px-5 py-3 border-t border-border flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Mostrando {filtered.length} de {movements.length} movimientos
        </p>
        <button className="text-xs text-primary font-medium hover:underline">
          Ver historial completo →
        </button>
      </div>
    </div>
  );
}