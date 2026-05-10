'use client';

import React, { useState } from 'react';
import { Bell, AlertTriangle, Clock, XCircle, X, ChevronRight } from 'lucide-react';

type AlertSeverity = 'critical' | 'warning' | 'info';

interface Alert {
  id: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  time: string;
  product?: string;
}

// BACKEND INTEGRATION POINT: GET /api/alerts?status=active
const initialAlerts: Alert[] = [
  {
    id: 'alert-001',
    severity: 'critical',
    title: 'Sin Stock',
    description: 'Leche entera 1L (Alpina) llegó a 0 unidades.',
    time: 'Hace 12 min',
    product: 'PRD-0041',
  },
  {
    id: 'alert-002',
    severity: 'critical',
    title: 'Sin Stock',
    description: 'Aceite vegetal 900ml (Premier) agotado.',
    time: 'Hace 45 min',
    product: 'PRD-0083',
  },
  {
    id: 'alert-003',
    severity: 'warning',
    title: 'Stock Bajo',
    description: 'Yogur fresa 200g — 4 unidades restantes (mín. 12).',
    time: 'Hace 1 h',
    product: 'PRD-0019',
  },
  {
    id: 'alert-004',
    severity: 'warning',
    title: 'Por Vencer',
    description: 'Queso doble crema 500g vence el 18/05/2026.',
    time: 'Hace 2 h',
    product: 'PRD-0057',
  },
  {
    id: 'alert-005',
    severity: 'info',
    title: 'Exceso de Stock',
    description: 'Jabón de baño 125g — 380 unidades (máx. 200).',
    time: 'Hace 3 h',
    product: 'PRD-0112',
  },
];

const severityConfig: Record<
  AlertSeverity,
  { icon: React.ReactNode; bg: string; iconColor: string; border: string }
> = {
  critical: {
    icon: <XCircle size={15} />,
    bg: 'bg-red-50',
    iconColor: 'text-red-600',
    border: 'border-red-200',
  },
  warning: {
    icon: <AlertTriangle size={15} />,
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    border: 'border-amber-200',
  },
  info: {
    icon: <Clock size={15} />,
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    border: 'border-blue-200',
  },
};

export default function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const criticalCount = alerts.filter((a) => a.severity === 'critical').length;

  return (
    <div className="card p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="section-header">Alertas Activas</h2>
          {criticalCount > 0 && (
            <span className="badge bg-red-100 text-red-700">
              {criticalCount} críticas
            </span>
          )}
        </div>
        <Bell size={16} className="text-muted-foreground" />
      </div>

      {alerts.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-8 text-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mb-3">
            <Bell size={18} className="text-primary" />
          </div>
          <p className="text-sm font-medium text-foreground">Sin alertas activas</p>
          <p className="text-xs text-muted-foreground mt-1">
            Todos los productos están en niveles normales.
          </p>
        </div>
      ) : (
        <div className="flex-1 space-y-2 overflow-y-auto">
          {alerts.map((alert) => {
            const config = severityConfig[alert.severity];
            return (
              <div
                key={alert.id}
                className={`${config.bg} border ${config.border} rounded-lg p-3 flex items-start gap-2.5 group slide-up`}
              >
                <span className={`flex-shrink-0 mt-0.5 ${config.iconColor}`}>
                  {config.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-semibold text-foreground">
                      {alert.title}
                    </p>
                    {alert.product && (
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {alert.product}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {alert.description}
                  </p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[10px] text-muted-foreground">
                      {alert.time}
                    </span>
                    <button className="text-[10px] text-primary font-medium flex items-center gap-0.5 hover:underline">
                      Ver producto <ChevronRight size={10} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => dismissAlert(alert.id)}
                  className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
                  aria-label={`Descartar alerta: ${alert.title}`}
                >
                  <X size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <button className="btn-secondary w-full mt-4 text-xs">
        Ver todas las alertas
      </button>
    </div>
  );
}