'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// BACKEND INTEGRATION POINT: GET /api/dashboard/categories
const categoryData = [
  { name: 'Lácteos', value: 187, color: '#16a34a' },
  { name: 'Carnes', value: 134, color: '#f59e0b' },
  { name: 'Bebidas', value: 210, color: '#3b82f6' },
  { name: 'Aseo', value: 98, color: '#8b5cf6' },
  { name: 'Panadería', value: 76, color: '#f97316' },
  { name: 'Otros', value: 142, color: '#64748b' },
];

interface TooltipPayload {
  name: string;
  value: number;
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
}) {
  if (!active || !payload || payload.length === 0) return null;
  const item = payload[0];
  return (
    <div className="bg-card border border-border rounded-lg shadow-lg px-3 py-2 text-sm">
      <p className="font-semibold text-foreground">{item.name}</p>
      <p className="text-muted-foreground">
        <span className="font-semibold text-foreground tabular-nums">
          {item.value}
        </span>{' '}
        SKUs
      </p>
    </div>
  );
}

export default function CategoryChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={categoryData}
          cx="40%"
          cy="50%"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={3}
          dataKey="value"
        >
          {categoryData.map((entry) => (
            <Cell key={`cell-${entry.name}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          iconType="circle"
          iconSize={8}
          formatter={(value: string) => (
            <span className="text-xs text-muted-foreground">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}