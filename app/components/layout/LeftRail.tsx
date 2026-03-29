'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, BarChart3, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LeftRail() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <nav className={`h-full border-r border-border bg-background flex flex-col transition-all duration-300 shrink-0 ${isCollapsed ? 'w-16' : 'w-16 sm:w-64'}`}>
      {/* Brand */}
      <div className={`h-16 flex items-center border-b border-border ${isCollapsed ? 'justify-center' : 'justify-center sm:justify-start sm:px-6'}`}>
        <div className="w-8 h-8 rounded border border-text-tertiary flex items-center justify-center shrink-0">
          <span className="font-mono-display text-xs text-text-secondary">R</span>
        </div>
        {!isCollapsed && <span className="hidden sm:block ml-3 font-mono-display text-xl tracking-tight text-text-primary leading-none mt-1">RoleJet</span>}
      </div>

      {/* Nav Links */}
      <div className="flex-1 py-6 flex flex-col gap-2 px-2 sm:px-4">
        <NavItem href="/" icon={<Home size={20} />} label="Analyser" active={pathname === '/'} collapsed={isCollapsed} />
        <NavItem href="/applications" icon={<FileText size={20} />} label="Applications" active={pathname === '/applications'} collapsed={isCollapsed} />
        <NavItem href="/signals" icon={<BarChart3 size={20} />} label="Market Signals" active={pathname === '/signals'} collapsed={isCollapsed} />
      </div>

      {/* Footer Settings */}
      <div className="p-2 sm:p-4 border-t border-border flex flex-col gap-2">
        <NavItem href="/settings" icon={<Settings size={20} />} label="Settings" active={pathname === '/settings'} collapsed={isCollapsed} />

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`hidden sm:flex items-center h-10 rounded transition-colors text-text-secondary hover:bg-surface hover:text-text-primary ${isCollapsed ? 'justify-center w-full' : 'justify-start px-3'
            }`}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          aria-label="Toggle Sidebar"
        >
          <span className="shrink-0 flex items-center justify-center">
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </span>
          {!isCollapsed && <span className="ml-3 font-sans text-sm">Collapse</span>}
        </button>
      </div>
    </nav>
  );
}

function NavItem({ href, icon, label, active = false, collapsed = false }: { href: string; icon: React.ReactNode; label: string; active?: boolean; collapsed?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center h-10 rounded transition-colors ${collapsed ? 'justify-center w-full' : 'justify-center sm:justify-start sm:px-3'
        } ${active
          ? 'bg-surface text-text-primary font-medium'
          : 'text-text-secondary hover:bg-surface hover:text-text-primary'
        }`}
      title={collapsed ? label : undefined}
    >
      <span className="shrink-0 flex items-center justify-center">{icon}</span>
      {!collapsed && <span className="hidden sm:block ml-3 font-sans text-sm">{label}</span>}
    </Link>
  );
}
