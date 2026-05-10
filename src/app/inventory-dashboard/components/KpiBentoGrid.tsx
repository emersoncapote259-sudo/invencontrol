import React from 'react';
import {
  Package,
  AlertTriangle,
  XCircle,
  Clock,
  DollarSign,
  TrendingUp,
  ArchiveX,
} from 'lucide-react';

// BACKEND INTEGRATION POINT: GET /api/dashboard/kpis
const kpiData = {
  totalSkus: { value: 847, change: '+12 esta semana', positive: true },
  lowStock: { value: 23, change: '+5 desde ayer', positive: false },
  outOfStock: { value: 7, change: '-2 desde ayer', positive: true },
  expiringSoon: { value: 14, change: 'Próximos 30 días', positive: false },
  inventoryValue: { value: '$48.230.500', change: '+$1.2M esta semana', positive: true },
  movementsToday: { value: 38, change: '18 entradas / 20 salidas', positive: true },
  overstock: { value: 11, change: '-3 desde ayer', positive: true },
};

interface KpiCardProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string | number;
  change: string;
  positive: boolean;
  hero?: boolean;
  alert?: boolean;
  warning?: boolean;
}

function KpiCard({
  icon,
  iconBg,
  label,
  value,
  change,
  positive,
  hero = false,
  alert = false,
  warning = false,
}: KpiCardProps) {
  let cardBg = 'bg-card';
  let valueCls = 'text-foreground';
  if (alert) {
    cardBg = 'bg-red-50 border-red-200';
    valueCls = 'text-red-700';
  } else if (warning) {
    cardBg = 'bg-amber-50 border-amber-200';
    valueCls = 'text-amber-700';
  }

  return (
    <div
      className={`card border ${cardBg} p-5 flex flex-col justify-between ${
        hero ? 'row-span-1' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            positive
              ? 'bg-gray-200 text-gray-800' :'bg-red-100 text-red-600'
          }`}
        >
          {positive ? '▲' : '▼'}
        </span>
      </div>
      <div className="mt-3">
        <p className="metric-label">{label}</p>
        <p className={`text-hero-metric tabular-nums mt-1 ${valueCls}`}>
          {value}
        </p>
        <p className="text-xs text-muted-foreground mt-1">{change}</p>
      </div>
    </div>
  );
}

export default function KpiBentoGrid() {
  // Grid plan: 7 cards → grid-cols-4
  // Row 1: hero (col-span-2) + 2 regular = 4 cols
  // Row 2: 4 regular cards = 4 cols
  // Total: 7 — hero spans 2, remaining 5 across row 2 + 1 more in row 1

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      {/* Hero: Inventory Value — col-span-2 */}
      <div className="sm:col-span-2 lg:col-span-2 card bg-primary p-5 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
            <DollarSign size={18} className="text-white" />
          </div>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/20 text-white">
            ▲ Esta semana
          </span>
        </div>
        <div className="mt-4">
          <p className="text-xs font-medium text-white/70 uppercase tracking-wide">
            Valor Total del Inventario
          </p>
          <p className="text-4xl font-bold text-white tabular-nums mt-1">
            {kpiData.inventoryValue.value}
          </p>
          <p className="text-xs text-white/60 mt-1">
            {kpiData.inventoryValue.change}
          </p>
        </div>
      </div>

      {/* Total SKUs */}
      <KpiCard
        icon={<Package size={18} className="text-blue-600" />}
        iconBg="bg-blue-100"
        label="Total Productos (SKUs)"
        value={kpiData.totalSkus.value}
        change={kpiData.totalSkus.change}
        positive={kpiData.totalSkus.positive}
      />

      {/* Movements today */}
      <KpiCard
        icon={<TrendingUp size={18} className="text-primary" />}
        iconBg="bg-gray-200"
        label="Movimientos Hoy"
        value={kpiData.movementsToday.value}
        change={kpiData.movementsToday.change}
        positive={kpiData.movementsToday.positive}
      />

      {/* Low Stock — warning */}
      <KpiCard
        icon={<AlertTriangle size={18} className="text-amber-600" />}
        iconBg="bg-amber-100"
        label="Productos Stock Bajo"
        value={kpiData.lowStock.value}
        change={kpiData.lowStock.change}
        positive={kpiData.lowStock.positive}
        warning
      />

      {/* Out of Stock — alert */}
      <KpiCard
        icon={<XCircle size={18} className="text-red-600" />}
        iconBg="bg-red-100"
        label="Sin Stock"
        value={kpiData.outOfStock.value}
        change={kpiData.outOfStock.change}
        positive={kpiData.outOfStock.positive}
        alert
      />

      {/* Expiring Soon — warning */}
      <KpiCard
        icon={<Clock size={18} className="text-orange-600" />}
        iconBg="bg-orange-100"
        label="Por Vencer (30 días)"
        value={kpiData.expiringSoon.value}
        change={kpiData.expiringSoon.change}
        positive={kpiData.expiringSoon.positive}
        warning
      />

      {/* Overstock */}
      <KpiCard
        icon={<ArchiveX size={18} className="text-slate-600" />}
        iconBg="bg-slate-100"
        label="Exceso de Inventario"
        value={kpiData.overstock.value}
        change={kpiData.overstock.change}
        positive={kpiData.overstock.positive}
      />
    </div>
  );
}