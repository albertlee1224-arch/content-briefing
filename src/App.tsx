import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Dashboard } from '@/pages/Dashboard';
import { Briefings } from '@/pages/Briefings';
import { Subscriptions } from '@/pages/Subscriptions';
import { Saved } from '@/pages/Saved';
import { SettingsPage } from '@/pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/briefings" element={<Briefings />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
