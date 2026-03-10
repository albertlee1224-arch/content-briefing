import { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Bookmark, BookmarkCheck, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { briefings, type SourceType } from '@/lib/mock-data';

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

export function Briefings() {
  const [expandedId, setExpandedId] = useState<string | null>(briefings[0]?.id ?? null);
  const [savedMap, setSavedMap] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    briefings.forEach(b => b.items.forEach(i => { map[i.id] = i.isSaved; }));
    return map;
  });

  const toggleSave = (itemId: string) => {
    setSavedMap(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">브리핑</h2>
      <div className="space-y-4">
        {briefings.map(briefing => (
          <div key={briefing.id} className="rounded-xl border bg-white shadow">
            <button
              className="flex w-full items-center justify-between p-4 text-left hover:bg-accent/50 transition-colors rounded-t-xl"
              onClick={() => setExpandedId(expandedId === briefing.id ? null : briefing.id)}
            >
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-semibold">{briefing.title}</h3>
                  <p className="text-sm text-muted-foreground">{briefing.date} · {briefing.totalItems}개 항목</p>
                </div>
              </div>
              {expandedId === briefing.id ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
            {expandedId === briefing.id && (
              <div className="border-t divide-y">
                {briefing.items.map(item => (
                  <div key={item.id} className="p-4 hover:bg-accent/30 transition-colors">
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
                        <button
                          onClick={() => toggleSave(item.id)}
                          className="rounded-md p-1.5 hover:bg-accent transition-colors"
                          title={savedMap[item.id] ? '보관 취소' : '보관하기'}
                        >
                          {savedMap[item.id] ? (
                            <BookmarkCheck className="h-4 w-4 text-primary" />
                          ) : (
                            <Bookmark className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                        <a href={item.url} className="rounded-md p-1.5 hover:bg-accent transition-colors">
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
