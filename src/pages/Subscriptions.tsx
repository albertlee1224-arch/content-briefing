import { useState } from 'react';
import { Plus, Trash2, Video, Globe, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { subscriptions as initialSubscriptions, type Subscription, type SourceType } from '@/lib/mock-data';

const sourceConfig: Record<SourceType, { icon: React.ReactNode; bg: string; label: string }> = {
  twitter: { icon: <span className="text-xs font-black">X</span>, bg: 'bg-zinc-100', label: 'Twitter/X' },
  youtube: { icon: <Video className="h-4 w-4 text-red-500" />, bg: 'bg-red-50', label: 'YouTube' },
  web: { icon: <Globe className="h-4 w-4 text-zinc-500" />, bg: 'bg-zinc-100', label: 'Web' },
  newsletter: { icon: <Mail className="h-4 w-4 text-blue-500" />, bg: 'bg-blue-50', label: 'Newsletter' },
};

export function Subscriptions() {
  const [subs, setSubs] = useState<Subscription[]>(initialSubscriptions);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newHandle, setNewHandle] = useState('');
  const [newType, setNewType] = useState<SourceType>('twitter');
  const [filter, setFilter] = useState<SourceType | 'all'>('all');

  const filtered = filter === 'all' ? subs : subs.filter(s => s.type === filter);

  const handleAdd = () => {
    if (!newName.trim() || !newHandle.trim()) return;
    const newSub: Subscription = {
      id: Date.now().toString(),
      type: newType,
      name: newName.trim(),
      handle: newHandle.trim(),
      isActive: true,
      itemCount: 0,
    };
    setSubs(prev => [...prev, newSub]);
    setNewName('');
    setNewHandle('');
    setShowAdd(false);
  };

  const handleDelete = (id: string) => {
    setSubs(prev => prev.filter(s => s.id !== id));
  };

  const handleToggle = (id: string) => {
    setSubs(prev => prev.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">구독</h2>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          구독 추가
        </button>
      </div>

      {showAdd && (
        <div className="rounded-xl border bg-white p-4 shadow space-y-3">
          <h3 className="font-semibold">새 구독 추가</h3>
          <div className="grid gap-3 sm:grid-cols-4">
            <select
              value={newType}
              onChange={e => setNewType(e.target.value as SourceType)}
              className="rounded-md border px-3 py-2 text-sm"
            >
              <option value="twitter">Twitter/X</option>
              <option value="youtube">YouTube</option>
              <option value="newsletter">Newsletter</option>
              <option value="web">Web/RSS</option>
            </select>
            <input
              type="text"
              placeholder="이름 (예: Andrej Karpathy)"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              className="rounded-md border px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="핸들/URL (예: @karpathy)"
              value={newHandle}
              onChange={e => setNewHandle(e.target.value)}
              className="rounded-md border px-3 py-2 text-sm"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="flex-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                추가
              </button>
              <button
                onClick={() => setShowAdd(false)}
                className="rounded-md border px-3 py-2 text-sm hover:bg-accent"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'twitter', 'youtube', 'newsletter', 'web'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
              filter === f
                ? 'bg-primary text-primary-foreground'
                : 'border bg-white hover:bg-accent'
            )}
          >
            {f === 'all' ? '전체' : sourceConfig[f].label} ({f === 'all' ? subs.length : subs.filter(s => s.type === f).length})
          </button>
        ))}
      </div>

      {/* Subscription List */}
      <div className="space-y-2">
        {filtered.map(sub => (
          <div key={sub.id} className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm hover:shadow transition-shadow">
            <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', sourceConfig[sub.type].bg)}>
              {sourceConfig[sub.type].icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium">{sub.name}</p>
              <p className="text-sm text-muted-foreground">{sub.handle} · {sub.itemCount}개 항목</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggle(sub.id)}
                className={cn(
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                  sub.isActive ? 'bg-primary' : 'bg-zinc-200'
                )}
              >
                <span
                  className={cn(
                    'inline-block h-4 w-4 rounded-full bg-white transition-transform',
                    sub.isActive ? 'translate-x-6' : 'translate-x-1'
                  )}
                />
              </button>
              <button
                onClick={() => handleDelete(sub.id)}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
