import { useState } from 'react';
import { Bookmark, ExternalLink, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { savedItems as initialSaved, type SourceType } from '@/lib/mock-data';

const sourceColors: Record<SourceType, string> = {
  twitter: 'bg-zinc-800 text-white',
  youtube: 'bg-red-500 text-white',
  web: 'bg-zinc-500 text-white',
  newsletter: 'bg-blue-500 text-white',
};

const sourceLabels: Record<SourceType, string> = {
  twitter: 'X',
  youtube: 'YouTube',
  web: 'Web',
  newsletter: 'Newsletter',
};

export function Saved() {
  const [items, setItems] = useState(initialSaved);

  const handleRemove = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">보관함</h2>
        <span className="text-sm text-muted-foreground">{items.length}개 항목</span>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Bookmark className="h-12 w-12 text-muted-foreground/30 mb-4" />
          <h3 className="font-semibold text-lg mb-1">보관된 항목이 없습니다</h3>
          <p className="text-sm text-muted-foreground">브리핑에서 북마크 아이콘을 눌러 저장하세요</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="rounded-xl border bg-white p-4 shadow-sm hover:shadow transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn('inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold', sourceColors[item.sourceType])}>
                      {sourceLabels[item.sourceType]}
                    </span>
                    <span className="text-sm text-muted-foreground">{item.sourceName}</span>
                  </div>
                  <h4 className="font-medium mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.summary}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <a href={item.url} className="rounded-md p-1.5 hover:bg-accent transition-colors">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="rounded-md p-1.5 hover:bg-red-50 hover:text-red-500 transition-colors text-muted-foreground"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
