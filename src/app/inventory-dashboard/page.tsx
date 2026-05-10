import React from 'react';
import AppLayout from '@/components/AppLayout';
import KpiBentoGrid from './components/KpiBentoGrid';
import DashboardCharts from './components/DashboardCharts';
import AlertsPanel from './components/AlertsPanel';
import RecentMovements from './components/RecentMovements';

export default function Page() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">Panel de Control</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Supermercado La Esperanza — Domingo, 10 de mayo de 2026
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-secondary gap-2">
              <span className="text-sm">Exportar reporte</span>
            </button>
            <button className="btn-primary gap-2">
              + Registrar movimiento
            </button>
          </div>
        </div>

        {/* KPI Bento Grid */}
        <KpiBentoGrid />

        {/* Charts + Alerts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <DashboardCharts />
          </div>
          <div className="xl:col-span-1">
            <AlertsPanel />
          </div>
        </div>

        {/* Recent Movements */}
        <RecentMovements />
      </div>
    </AppLayout>
  );
}