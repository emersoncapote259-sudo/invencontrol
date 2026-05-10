'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// BACKEND INTEGRATION POINT: GET /api/dashboard/movements?days=7
const movementData = [
  { day: 'Lun 04', entradas: 42, salidas: 38 },
  { day: 'Mar 05', entradas: 31, salidas: 47 },
  { day: 'Mié 06', entradas: 65, salidas: 29 },
  { day: 'Jue 07', entradas: 28, salidas: 52 },
  { day: 'Vie 08', entradas: 74, salidas: 61 },
  { day: 'Sáb 09', entradas: 83, salidas: 78 },
  { day: 'Dom 10', entradas: 18, salidas: 20 },
];

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-card border border-border rounded-lg shadow-lg px-3 py-2.5 text-sm">
      <p className="font-semibold text-foreground mb-1.5">{label}</p>
      {payload.map((entry) => (
        <div
          key={`tooltip-${entry.name}`}
          className="flex items-center gap-2"
        >
          <div
            className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-semibold text-foreground tabular-nums">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function MovementChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={movementData}
        margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
        barCategoryGap="30%"
        barGap={4}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--chart-grid)"
          vertical={false}
        />
        <XAxis
          dataKey="day"
          tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--muted)', opacity: 0.5 }} />
        <Bar
          dataKey="entradas"
          name="Entradas"
          fill="var(--chart-entries)"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="salidas"
          name="Salidas"
          fill="var(--chart-exits)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}