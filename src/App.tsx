import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SchedulerPage from './pages/SchedulerPage';

export default function App() {
  return (
    <BrowserRouter basename="/ExamDuty">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/schedule-generator" element={<SchedulerPage />} />
      </Routes>
    </BrowserRouter>
  );
}