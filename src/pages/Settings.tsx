import { useState } from 'react';

type DigestMode = 'daily' | 'weekly' | 'realtime';
type DigestTime = '07:00' | '08:00' | '09:00' | '12:00' | '18:00';

export function SettingsPage() {
  const [digestMode, setDigestMode] = useState<DigestMode>('daily');
  const [digestTime, setDigestTime] = useState<DigestTime>('08:00');
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [language, setLanguage] = useState('ko');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-bold">설정</h2>

      {/* Digest Mode */}
      <div className="rounded-xl border bg-white p-6 shadow space-y-4">
        <h3 className="font-semibold">브리핑 모드</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {([
            { value: 'daily', label: '매일', desc: '매일 정해진 시간에 브리핑' },
            { value: 'weekly', label: '매주', desc: '매주 월요일 브리핑' },
            { value: 'realtime', label: '실시간', desc: '새 콘텐츠 발견 시 즉시' },
          ] as const).map(mode => (
            <button
              key={mode.value}
              onClick={() => setDigestMode(mode.value)}
              className={`rounded-lg border p-4 text-left transition-colors ${
                digestMode === mode.value
                  ? 'border-primary bg-accent'
                  : 'hover:bg-accent/50'
              }`}
            >
              <p className="font-medium">{mode.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{mode.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Digest Time */}
      {digestMode === 'daily' && (
        <div className="rounded-xl border bg-white p-6 shadow space-y-4">
          <h3 className="font-semibold">브리핑 시간</h3>
          <select
            value={digestTime}
            onChange={e => setDigestTime(e.target.value as DigestTime)}
            className="rounded-md border px-3 py-2 text-sm w-full sm:w-48"
          >
            <option value="07:00">오전 7:00</option>
            <option value="08:00">오전 8:00</option>
            <option value="09:00">오전 9:00</option>
            <option value="12:00">오후 12:00</option>
            <option value="18:00">오후 6:00</option>
          </select>
        </div>
      )}

      {/* Email Notification */}
      <div className="rounded-xl border bg-white p-6 shadow space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">이메일 알림</h3>
            <p className="text-sm text-muted-foreground">브리핑을 이메일로도 받기</p>
          </div>
          <button
            onClick={() => setEmailEnabled(!emailEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              emailEnabled ? 'bg-primary' : 'bg-zinc-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                emailEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Language */}
      <div className="rounded-xl border bg-white p-6 shadow space-y-4">
        <h3 className="font-semibold">요약 언어</h3>
        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className="rounded-md border px-3 py-2 text-sm w-full sm:w-48"
        >
          <option value="ko">한국어</option>
          <option value="en">English</option>
          <option value="ja">日本語</option>
        </select>
        <p className="text-xs text-muted-foreground">AI가 콘텐츠를 요약할 때 사용하는 언어</p>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          {saved ? '저장됨 ✓' : '설정 저장'}
        </button>
      </div>
    </div>
  );
}
