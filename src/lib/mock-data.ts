export type SourceType = 'twitter' | 'youtube' | 'web' | 'newsletter';

export interface BriefingItem {
  id: string;
  sourceType: SourceType;
  sourceName: string;
  title: string;
  summary: string;
  url: string;
  publishedAt: string;
  isSaved: boolean;
}

export interface Briefing {
  id: string;
  date: string;
  title: string;
  totalItems: number;
  items: BriefingItem[];
}

export interface Subscription {
  id: string;
  type: SourceType;
  name: string;
  handle: string;
  isActive: boolean;
  itemCount: number;
}

export interface DailyStats {
  date: string;
  items: number;
  subscriptions: number;
}

export const subscriptions: Subscription[] = [
  { id: '1', type: 'twitter', name: 'Andrej Karpathy', handle: '@karpathy', isActive: true, itemCount: 45 },
  { id: '2', type: 'twitter', name: 'Jim Fan', handle: '@DrJimFan', isActive: true, itemCount: 38 },
  { id: '3', type: 'twitter', name: 'Yann LeCun', handle: '@ylecun', isActive: true, itemCount: 52 },
  { id: '4', type: 'twitter', name: 'Ethan Mollick', handle: '@emollick', isActive: true, itemCount: 33 },
  { id: '5', type: 'youtube', name: 'Lex Fridman', handle: '@lexfridman', isActive: true, itemCount: 12 },
  { id: '6', type: 'youtube', name: '3Blue1Brown', handle: '@3blue1brown', isActive: true, itemCount: 8 },
  { id: '7', type: 'youtube', name: 'Fireship', handle: '@fireship', isActive: true, itemCount: 15 },
  { id: '8', type: 'newsletter', name: 'The Rundown AI', handle: 'therundownai.com', isActive: true, itemCount: 30 },
  { id: '9', type: 'newsletter', name: 'TLDR AI', handle: 'tldr.tech/ai', isActive: true, itemCount: 28 },
  { id: '10', type: 'web', name: 'Hacker News', handle: 'news.ycombinator.com', isActive: true, itemCount: 60 },
  { id: '11', type: 'web', name: 'TechCrunch AI', handle: 'techcrunch.com/ai', isActive: true, itemCount: 40 },
  { id: '12', type: 'twitter', name: 'Naval', handle: '@naval', isActive: true, itemCount: 18 },
  { id: '13', type: 'twitter', name: 'Dan Koe', handle: '@thedankoe', isActive: true, itemCount: 22 },
  { id: '14', type: 'youtube', name: 'Chris Williamson', handle: '@ChrisWillx', isActive: true, itemCount: 10 },
];

export const briefings: Briefing[] = [
  {
    id: 'b1',
    date: '2026-03-10',
    title: '오늘의 브리핑',
    totalItems: 24,
    items: [
      {
        id: 'i1', sourceType: 'twitter', sourceName: 'Andrej Karpathy',
        title: 'LLM의 새로운 학습 패러다임에 대한 스레드',
        summary: 'Karpathy가 최신 LLM 훈련 방식의 변화에 대해 설명. 기존 RLHF에서 벗어나 Constitutional AI와 자기 개선 루프가 핵심이 되고 있다고 분석. 특히 합성 데이터의 품질 관리가 차세대 모델의 성능을 좌우할 것이라는 전망.',
        url: '#', publishedAt: '2026-03-10T09:30:00Z', isSaved: true,
      },
      {
        id: 'i2', sourceType: 'youtube', sourceName: 'Lex Fridman',
        title: 'Sam Altman 인터뷰: AGI까지의 로드맵',
        summary: '3시간 인터뷰에서 Altman이 GPT-5와 그 이후의 비전을 공유. AI 안전성, 오픈소스 전략, 그리고 AGI가 사회에 미칠 영향에 대해 깊이 있는 대화. 특히 AI 에이전트가 2026년 하반기 핵심 제품이 될 것이라는 언급이 주목할 만함.',
        url: '#', publishedAt: '2026-03-10T08:00:00Z', isSaved: false,
      },
      {
        id: 'i3', sourceType: 'newsletter', sourceName: 'The Rundown AI',
        title: 'Claude 4.5 출시와 AI 에이전트 시장의 변화',
        summary: 'Anthropic의 Claude 4.5가 코딩, 수학, 추론에서 새로운 벤치마크를 세움. 특히 에이전트 모드에서의 자율 작업 수행 능력이 크게 향상. Google DeepMind의 Gemini 2.5와의 경쟁 구도 분석.',
        url: '#', publishedAt: '2026-03-10T07:00:00Z', isSaved: true,
      },
      {
        id: 'i4', sourceType: 'twitter', sourceName: 'Ethan Mollick',
        title: 'AI를 활용한 교육 혁신 사례',
        summary: 'Wharton에서 진행 중인 AI 튜터링 실험 결과 공유. 학생들의 학습 성과가 30% 향상되었으며, 특히 개인화된 피드백이 핵심 요인. "AI는 교사를 대체하는 것이 아니라 교사의 능력을 확장한다"는 결론.',
        url: '#', publishedAt: '2026-03-10T06:30:00Z', isSaved: false,
      },
      {
        id: 'i5', sourceType: 'web', sourceName: 'Hacker News',
        title: 'Rust로 작성된 새로운 AI 추론 엔진 오픈소스 공개',
        summary: 'vLLM 대비 2배 빠른 추론 속도를 보여주는 새로운 엔진이 GitHub에 공개됨. 메모리 효율성도 40% 개선. 이미 1만 스타를 돌파하며 커뮤니티에서 큰 관심을 받고 있음.',
        url: '#', publishedAt: '2026-03-10T05:00:00Z', isSaved: false,
      },
    ],
  },
  {
    id: 'b2',
    date: '2026-03-09',
    title: '어제의 브리핑',
    totalItems: 31,
    items: [
      {
        id: 'i6', sourceType: 'twitter', sourceName: 'Jim Fan',
        title: 'NVIDIA의 차세대 로보틱스 플랫폼 분석',
        summary: 'NVIDIA GTC에서 발표된 로봇 학습 플랫폼의 기술적 세부사항. 시뮬레이션에서 현실로의 전이 학습이 핵심. 물리 기반 AI가 2026-2027년 가장 큰 기술 트렌드가 될 것이라는 전망.',
        url: '#', publishedAt: '2026-03-09T10:00:00Z', isSaved: false,
      },
      {
        id: 'i7', sourceType: 'youtube', sourceName: 'Fireship',
        title: '100초만에 이해하는 MCP (Model Context Protocol)',
        summary: 'Anthropic의 MCP를 100초 포맷으로 설명. AI 에이전트가 외부 도구와 소통하는 표준 프로토콜. REST API가 웹에서 한 것처럼 MCP가 AI 에이전트 생태계에서 할 것이라는 비유가 인상적.',
        url: '#', publishedAt: '2026-03-09T09:00:00Z', isSaved: true,
      },
      {
        id: 'i8', sourceType: 'twitter', sourceName: 'Naval',
        title: '지식 노동의 미래와 개인의 레버리지',
        summary: '"AI 시대에 가장 가치 있는 능력은 명확한 사고와 글쓰기다. AI는 실행을 자동화하지만, 무엇을 실행할지 결정하는 것은 여전히 인간의 몫." 지식 노동자의 역할 변화에 대한 통찰.',
        url: '#', publishedAt: '2026-03-09T08:00:00Z', isSaved: true,
      },
    ],
  },
  {
    id: 'b3',
    date: '2026-03-08',
    title: '3월 8일 브리핑',
    totalItems: 18,
    items: [
      {
        id: 'i9', sourceType: 'newsletter', sourceName: 'TLDR AI',
        title: '이번 주 AI 하이라이트 정리',
        summary: '주요 뉴스: Apple의 온디바이스 LLM 업데이트, Meta의 Llama 4 프리뷰, OpenAI의 에이전트 API 정식 출시. 스타트업 동향: AI 코딩 도구 시장이 100억 달러 규모로 성장.',
        url: '#', publishedAt: '2026-03-08T07:00:00Z', isSaved: false,
      },
    ],
  },
];

export const dailyStats: DailyStats[] = [
  { date: '03/04', items: 0, subscriptions: 14 },
  { date: '03/05', items: 47, subscriptions: 14 },
  { date: '03/06', items: 69, subscriptions: 14 },
  { date: '03/07', items: 76, subscriptions: 14 },
  { date: '03/08', items: 74, subscriptions: 14 },
  { date: '03/09', items: 58, subscriptions: 14 },
  { date: '03/10', items: 75, subscriptions: 14 },
];

export const savedItems: BriefingItem[] = briefings
  .flatMap(b => b.items)
  .filter(item => item.isSaved);

export function getSourceStats() {
  const stats = new Map<SourceType, { items: number; processed: number; subscriptions: number }>();

  for (const sub of subscriptions) {
    const existing = stats.get(sub.type) || { items: 0, processed: 0, subscriptions: 0 };
    existing.items += sub.itemCount;
    existing.processed += Math.floor(sub.itemCount * 0.7);
    existing.subscriptions += 1;
    stats.set(sub.type, existing);
  }

  return stats;
}
