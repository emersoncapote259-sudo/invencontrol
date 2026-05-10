'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const MovementChart = dynamic(() => import('./MovementChart'), { ssr: false });
const CategoryChart = dynamic(() => import('./CategoryChart'), { ssr: false });

export default function DashboardCharts() {
  const [activeTab, setActiveTab] = useState<'movements' | 'categories'>('movements');

  return (
    <div className="card p-5 h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="section-header">Movimientos de Inventario</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Entradas vs Salidas — últimos 7 días
          </p>
        </div>
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          {(['movements', 'categories'] as const).map((tab) => (
            <button
              key={`tab-${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`text-xs font-medium px-3 py-1.5 rounded-md transition-all duration-150 ${
                activeTab === tab
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'movements' ? 'Movimientos' : 'Categorías'}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64">
        {activeTab === 'movements' ? <MovementChart /> : <CategoryChart />}
      </div>

      {activeTab === 'movements' && (
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-primary" />
            <span className="text-xs text-muted-foreground">Entradas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-accent" />
            <span className="text-xs text-muted-foreground">Salidas</span>
          </div>
        </div>
      )}
    </div>
  );
}