import { useState } from 'react';
import { ListChecks, FileText, Radio, Video, Globe, Mail } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import { cn } from '@/lib/utils';
import { briefings, subscriptions, dailyStats, getSourceStats, type SourceType } from '@/lib/mock-data';

type Period = '7d' | '30d' | '90d';

const sourceIcons: Record<SourceType, { icon: React.ReactNode; bg: string }> = {
  twitter: { icon: <span className="text-xs font-black">X</span>, bg: 'bg-zinc-100' },
  youtube: { icon: <Video className="h-5 w-5 text-red-500" />, bg: 'bg-red-50' },
  web: { icon: <Globe className="h-5 w-5 text-zinc-500" />, bg: 'bg-zinc-100' },
  newsletter: { icon: <Mail className="h-5 w-5 text-blue-500" />, bg: 'bg-blue-50' },
};

export function Dashboard() {
  const [period, setPeriod] = useState<Period>('30d');
  const sourceStats = getSourceStats();

  const totalBriefings = briefings.length;
  const totalItems = briefings.reduce((sum, b) => sum + b.totalItems, 0);
  const activeSubscriptions = subscriptions.filter(s => s.isActive).length;

  const statCards = [
    { label: '총 브리핑', value: totalBriefings, sub: `기간 내 ${totalBriefings}건`, icon: ListChecks },
    { label: '처리된 항목', value: totalItems, sub: `기간 내 ${totalItems}건`, icon: FileText },
    { label: '활성 구독', value: activeSubscriptions, sub: undefined, icon: Radio },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">대시보드</h2>
        <div className="flex items-center gap-2">
          {(['7d', '30d', '90d'] as Period[]).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                'inline-flex items-center justify-center rounded-md px-3 h-8 text-xs font-medium transition-colors',
                period === p
                  ? 'bg-primary text-primary-foreground shadow'
                  : 'border border-border bg-white shadow-sm hover:bg-accent'
              )}
            >
              {p === '7d' ? '7일' : p === '30d' ? '30일' : '90일'}
            </button>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {statCards.map(card => (
          <div key={card.label} className="rounded-xl border bg-white shadow">
            <div className="flex items-center justify-between p-6 pb-2">
              <span className="text-sm font-medium tracking-tight">{card.label}</span>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{card.value}</div>
              {card.sub && <p className="text-xs text-muted-foreground">{card.sub}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Source Type Cards */}
      <div>
        <h3 className="text-lg font-semibold mb-3">타입별 콘텐츠</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(Object.entries(sourceIcons) as [SourceType, typeof sourceIcons[SourceType]][]).map(([type, config]) => {
            const stats = sourceStats.get(type) || { items: 0, processed: 0, subscriptions: 0 };
            return (
              <div key={type} className="rounded-xl border bg-white shadow">
                <div className="flex items-center gap-4 p-4">
                  <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', config.bg)}>
                    {config.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium capitalize">{type}</p>
                    <p className="text-xs text-muted-foreground">
                      {stats.items} 항목 · {stats.processed} 처리됨 · {stats.subscriptions} 구독
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-xl border bg-white shadow">
        <div className="p-6">
          <h3 className="font-semibold leading-none tracking-tight">최근 30일 (일별)</h3>
        </div>
        <div className="p-6 pt-0">
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={dailyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="items" fill="#8884d8" name="항목" />
              <Line yAxisId="right" type="monotone" dataKey="subscriptions" stroke="#f97316" name="구독" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
