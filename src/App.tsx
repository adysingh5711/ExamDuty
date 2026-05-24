import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import LandingPage from './pages/LandingPage';
import SchedulerPage from './pages/SchedulerPage';

export default function App() {
  return (
    <BrowserRouter basename="/ExamDuty">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/schedule-generator" element={<SchedulerPage />} />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}