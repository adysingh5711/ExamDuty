import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import LandingPage from './pages/LandingPage';

const SchedulerPage = lazy(() => import('./pages/SchedulerPage'));

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.VITE_BASE_PATH ?? "/"}>
      <Suspense fallback={
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white text-slate-900 gap-2 font-medium">
          <div className="w-10 h-10 border-[3.5px] border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold select-none">
            Loading...
          </span>
        </div>
      }>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/schedule-generator" element={<SchedulerPage />} />
        </Routes>
      </Suspense>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}