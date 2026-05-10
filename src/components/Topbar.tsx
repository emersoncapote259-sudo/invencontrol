'use client';

import React, { useState } from 'react';
import { Search, Bell, RefreshCw } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';

interface TopbarProps {
  sidebarCollapsed: boolean;
}

export default function Topbar({ sidebarCollapsed }: TopbarProps) {
  const [search, setSearch] = useState('');

  return (
    <header className="h-14 border-b border-border bg-card flex items-center px-6 gap-4 flex-shrink-0 z-20">
      {/* Mobile logo */}
      <div className="flex items-center gap-2 lg:hidden">
        <AppLogo size={28} />
        <span className="font-bold text-sm text-foreground">control-inven-grupo67-E,C</span>
      </div>

      {/* Search */}
      <div className="relative flex-1 max-w-md hidden sm:block">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          placeholder="Buscar productos, movimientos…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-input bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-150"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Last updated */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-2.5 py-1.5 rounded-lg">
          <RefreshCw size={12} />
          <span>Actualizado: 10/05/2026 17:28</span>
        </div>

        {/* Notifications */}
        <div className="tooltip-wrapper">
          <button className="relative btn-ghost p-2">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              4
            </span>
          </button>
          <span className="tooltip-label">Alertas (4)</span>
        </div>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
          MA
        </div>
      </div>
    </header>
  );
}