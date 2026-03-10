import { Menu } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-white px-4">
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="rounded-md p-2 hover:bg-accent"
          aria-label="사이드바 토글"
          onClick={onToggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
          A
        </div>
      </div>
    </header>
  );
}
