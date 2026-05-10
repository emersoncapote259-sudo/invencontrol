'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import {
  LayoutDashboard,
  Package,
  ArrowDownToLine,
  ArrowUpFromLine,
  Bell,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Users,
  Plus,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  group?: string;
}

const navItems: NavItem[] = [
  {
    id: 'nav-dashboard',
    label: 'Panel de Control',
    href: '/inventory-dashboard',
    icon: <LayoutDashboard size={18} />,
    group: 'principal',
  },
  {
    id: 'nav-products',
    label: 'Productos',
    href: '/product-management',
    icon: <Package size={18} />,
    group: 'inventario',
  },
  {
    id: 'nav-add-product',
    label: 'Agregar Producto',
    href: '/add-product',
    icon: <Plus size={18} />,
    group: 'inventario',
  },
  {
    id: 'nav-entries',
    label: 'Entradas',
    href: '/inventory-entries',
    icon: <ArrowDownToLine size={18} />,
    group: 'inventario',
  },
  {
    id: 'nav-exits',
    label: 'Salidas',
    href: '/inventory-exits',
    icon: <ArrowUpFromLine size={18} />,
    group: 'inventario',
  },
  {
    id: 'nav-alerts',
    label: 'Alertas',
    href: '/inventory-dashboard',
    icon: <Bell size={18} />,
    badge: 4,
    group: 'inventario',
  },
  {
    id: 'nav-reports',
    label: 'Reportes',
    href: '/inventory-dashboard',
    icon: <BarChart3 size={18} />,
    group: 'admin',
  },
  {
    id: 'nav-users',
    label: 'Usuarios',
    href: '/inventory-dashboard',
    icon: <Users size={18} />,
    group: 'admin',
  },
  {
    id: 'nav-settings',
    label: 'Configuración',
    href: '/inventory-dashboard',
    icon: <Settings size={18} />,
    group: 'admin',
  },
];

const groupLabels: Record<string, string> = {
  principal: 'Principal',
  inventario: 'Inventario',
  admin: 'Administración',
};

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    // BACKEND INTEGRATION POINT: POST /api/auth/logout
    await new Promise((r) => setTimeout(r, 500));
    router.push('/sign-up-login-screen');
  };

  const groups = ['principal', 'inventario', 'admin'];

  return (
    <aside
      className={`sidebar-transition flex flex-col bg-card border-r border-border h-screen sticky top-0 z-30 ${
        collapsed ? 'w-16 min-w-[64px]' : 'w-60 min-w-[240px]'
      }`}
    >
      {/* Logo */}
      <div
        className={`flex items-center border-b border-border px-3 py-4 ${
          collapsed ? 'justify-center' : 'gap-2'
        }`}
      >
        <AppLogo size={32} />
        {!collapsed && (
          <span className="font-bold text-base text-foreground tracking-tight">
control-inven-grupo67-E,C
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {groups.map((group) => {
          const items = navItems.filter((n) => n.group === group);
          if (items.length === 0) return null;
          return (
            <div key={`group-${group}`} className="mb-2">
              {!collapsed && (
                <p className="metric-label px-3 py-1.5">{groupLabels[group]}</p>
              )}
              {items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <div key={item.id} className="tooltip-wrapper">
                    <Link
                      href={item.href}
                      className={`nav-item ${isActive ? 'nav-item-active' : ''} ${
                        collapsed ? 'justify-center px-0' : ''
                      }`}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      {!collapsed && (
                        <span className="flex-1 truncate">{item.label}</span>
                      )}
                      {!collapsed && item.badge && item.badge > 0 && (
                        <span className="badge bg-red-100 text-red-700">
                          {item.badge}
                        </span>
                      )}
                      {collapsed && item.badge && item.badge > 0 && (
                        <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                    {collapsed && (
                      <span className="tooltip-label">{item.label}</span>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Bottom: User + Logout */}
      <div className="border-t border-border px-2 py-3 space-y-1">
        {!collapsed && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0">
              EY
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">
                Emerson Yamir Capote Hermida
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                Administrador
              </p>
            </div>
          </div>
        )}
        <div className="tooltip-wrapper">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className={`nav-item w-full text-red-600 hover:bg-red-50 hover:text-red-700 ${collapsed ? 'justify-center px-0' : ''}`}
          >
            <LogOut size={18} />
            {!collapsed && (
              <span>{loggingOut ? 'Cerrando sesión…' : 'Cerrar Sesión'}</span>
            )}
          </button>
          {collapsed && <span className="tooltip-label">Cerrar Sesión</span>}
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center shadow-sm hover:bg-muted transition-colors duration-150 z-40"
        aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
      >
        {collapsed ? (
          <ChevronRight size={12} className="text-muted-foreground" />
        ) : (
          <ChevronLeft size={12} className="text-muted-foreground" />
        )}
      </button>
    </aside>
  );
}