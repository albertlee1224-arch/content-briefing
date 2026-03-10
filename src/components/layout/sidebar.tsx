import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Inbox, Eye, Bookmark, Settings, FileText, ExternalLink, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/dashboard', label: '대시보드', icon: LayoutDashboard },
  { to: '/briefings', label: '브리핑', icon: Inbox },
  { to: '/subscriptions', label: '구독', icon: Eye },
  { to: '/saved', label: '보관함', icon: Bookmark },
];

const bottomItems = [
  { to: '/settings', label: '설정', icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={onClose} />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-white transition-transform duration-300 md:static md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-14 items-center justify-between border-b px-5">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">📡</span>
            <span className="text-base font-bold">Content Briefing</span>
          </div>
          <button className="md:hidden rounded p-1 hover:bg-accent" onClick={onClose}>
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 p-2">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                  isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                )
              }
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
          <div className="my-2 border-t" />
          {bottomItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                  isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                )
              }
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <FileText className="h-4 w-4 shrink-0" />
            <span className="flex items-center gap-1">
              문서
              <ExternalLink className="h-3 w-3" />
            </span>
          </a>
        </nav>
      </aside>
    </>
  );
}
