import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDays,
  Github,
  ArrowRight,
  Upload,
  Sliders,
  Download,
  Shield,
  Scale,
  Lock,
  Cpu,
  FileSpreadsheet,
  CheckCircle,
} from 'lucide-react';

/* ─── tiny scroll-reveal ─────────────────────────────────────────────────── */
function useFade() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, on };
}

function Fade({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, on } = useFade();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? 'none' : 'translateY(16px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── component ──────────────────────────────────────────────────────────── */
export default function LandingPage() {
  const [top, setTop] = useState(true);
  useEffect(() => {
    const fn = () => setTop(window.scrollY < 8);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-slate-900">

      {/* ── NAV ───────────────────────────────────────────────────────── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 h-14 transition-all duration-200 ${top ? 'bg-transparent' : 'bg-white/95 backdrop-blur-sm border-b border-slate-100'
          }`}
      >
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarDays size={18} className="text-indigo-600" />
            <span className="font-semibold text-sm tracking-tight">ExamDuty</span>
            <span className="hidden sm:inline text-slate-300 text-sm mx-1">·</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="#how"
              className="hidden md:block text-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              How it works
            </a>
            <Link
              to="/schedule-generator"
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700
                         text-white text-sm font-medium px-4 py-2 rounded-lg
                         transition-colors duration-150"
            >
              Open app
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="pt-36 pb-28 px-6">
        <div className="max-w-3xl mx-auto">

          <div
            className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100
                        text-indigo-600 text-xs font-semibold uppercase tracking-widest
                        px-3 py-1.5 rounded-full mb-8"
            style={{ animation: 'up 0.5s ease both' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />
            Exam Scheduling Tool
          </div>

          <h1
            className="font-bold text-slate-900 leading-[1.08] tracking-tight mb-6"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4rem)',
              animation: 'up 0.5s ease 60ms both',
            }}
          >
            Exam duty rosters.<br />
            Done in&nbsp;
            <span className="text-indigo-600">two minutes</span>.<br />
            Not two hours.
          </h1>

          <p
            className="text-slate-500 leading-relaxed mb-10 max-w-xl"
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              animation: 'up 0.5s ease 120ms both',
            }}
          >
            Upload your faculty excel sheet. Set rooms and exam days.
            The algorithm assigns every duty slot - respecting seniority,
            pre-assignments, and hard constraints - and exports a clean roster.
          </p>

          <div
            className="flex flex-wrap items-center gap-3"
            style={{ animation: 'up 0.5s ease 180ms both' }}
          >
            <Link
              to="/schedule-generator"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700
                         text-white font-semibold px-6 py-3 rounded-xl
                         transition-colors duration-150 shadow-sm"
            >
              <CalendarDays size={16} />
              Generate schedule
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Social proof strip */}
          <div
            className="flex flex-wrap items-center gap-6 mt-10 pt-10 border-t border-slate-100"
            style={{ animation: 'up 0.5s ease 240ms both' }}
          >
            {[
              ['≤ 10', 'exam days'],
              ['≤ 20', 'rooms'],
              ['8', 'scheduler modules'],
              ['0', 'manual conflicts'],
            ].map(([n, l]) => (
              <div key={l}>
                <span className="font-bold text-slate-900 text-xl">{n}</span>
                <span className="text-slate-400 text-sm ml-1.5">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section id="how" className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <Fade className="mb-14">
            <p className="text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-3">
              Workflow
            </p>
            <h2 className="font-bold text-slate-900 text-3xl">
              Three steps, then it's done.
            </h2>
          </Fade>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                icon: <Upload size={20} className="text-indigo-600" />,
                title: 'Upload your spreadsheet',
                body:
                  'Drop any .xlsx or .xls file with faculty names and roles. No reformatting, no template - just your existing data.',
                delay: 0,
              },
              {
                step: '02',
                icon: <Sliders size={20} className="text-indigo-600" />,
                title: 'Set rooms and days',
                body:
                  'Configure up to 10 exam days and 20 rooms. Optionally lock specific faculty to fixed days before generation.',
                delay: 60,
              },
              {
                step: '03',
                icon: <Download size={20} className="text-indigo-600" />,
                title: 'Export a clean roster',
                body:
                  'Review the validated schedule in the table. Zero constraint violations? Export to Excel with one click.',
                delay: 120,
              },
            ].map((s) => (
              <Fade key={s.step} delay={s.delay}>
                <div className="bg-white rounded-2xl border border-slate-100 p-7 h-full relative overflow-hidden">
                  <span
                    className="absolute top-4 right-5 font-bold text-slate-100 select-none pointer-events-none"
                    style={{ fontSize: '3.5rem', lineHeight: 1 }}
                  >
                    {s.step}
                  </span>
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-5">
                    {s.icon}
                  </div>
                  <h3 className="font-semibold text-slate-900 text-base mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.body}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <Fade className="mb-14">
            <p className="text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-3">
              Capabilities
            </p>
            <h2 className="font-bold text-slate-900 text-3xl">
              Every constraint, handled automatically.
            </h2>
          </Fade>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100 rounded-2xl overflow-hidden border border-slate-100">
            {[
              {
                icon: <Cpu size={18} className="text-indigo-600" />,
                title: 'Constraint satisfaction',
                body: 'Distributes duties across all staff respecting hard rules - no manual juggling needed.',
                delay: 0,
              },
              {
                icon: <Lock size={18} className="text-indigo-600" />,
                title: 'Pre-assignment locks',
                body: 'Lock specific faculty to specific days. Everything else gets balanced around your fixed assignments.',
                delay: 40,
              },
              {
                icon: <Scale size={18} className="text-indigo-600" />,
                title: 'Seniority weighting',
                body: 'Senior faculty get preferential allocation. Staff duty targets are calculated from room-day totals.',
                delay: 80,
              },
              {
                icon: <FileSpreadsheet size={18} className="text-indigo-600" />,
                title: 'Direct Excel import',
                body: 'Parsed via the XLSX library. No CSV conversion, no reformatting - just upload and go.',
                delay: 120,
              },
              {
                icon: <Shield size={18} className="text-indigo-600" />,
                title: 'Validator built in',
                body: 'Post-generation checks catch consecutive same-room conflicts and duty-count violations.',
                delay: 160,
              },
              {
                icon: <CheckCircle size={18} className="text-indigo-600" />,
                title: 'Role-tagged output',
                body: 'Faculty and staff are colour-coded in the schedule table. Coordinators see exactly what was assigned.',
                delay: 200,
              },
            ].map((f) => (
              <Fade key={f.title} delay={f.delay}>
                <div className="bg-white p-7">
                  <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                    {f.icon}
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm mb-1.5">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.body}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCHEDULE MOCKUP ───────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <Fade className="mb-14">
            <p className="text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-3">
              Output
            </p>
            <h2 className="font-bold text-slate-900 text-3xl">
              The full picture, at a glance.
            </h2>
            <p className="text-slate-500 text-base mt-3 max-w-lg">
              Every assignment tagged by role and seniority. No hidden logic - just a
              clean, auditable table ready to export.
            </p>
          </Fade>

          <Fade delay={60}>
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              {/* Fake browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50">
                <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
                <span className="ml-3 text-xs text-slate-400 font-mono">
                  ExamDuty Scheduler
                </span>
              </div>

              {/* Table: overflow-x-auto stays inside the card */}
              <div className="overflow-x-auto">
                <table className="text-xs border-collapse" style={{ minWidth: '520px', width: '100%' }}>
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      {['Room', 'Day 1', 'Day 2', 'Day 3', 'Day 4'].map((h) => (
                        <th
                          key={h}
                          className="text-left px-5 py-3 text-slate-400 font-medium uppercase tracking-wider"
                          style={{ fontSize: '11px' }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      {
                        room: 'Room 101',
                        cells: [
                          { name: 'Dr. Malviya', tag: 'Faculty', tc: 'bg-indigo-50 text-indigo-700' },
                          { name: 'Mr. Kumar', tag: 'Staff', tc: 'bg-slate-100 text-slate-600' },
                          { name: 'Dr. Sharma', tag: 'Senior Faculty', tc: 'bg-violet-50 text-violet-700' },
                          { name: 'Ms. Singh', tag: 'Staff', tc: 'bg-slate-100 text-slate-600' },
                        ],
                      },
                      {
                        room: 'Room 102',
                        cells: [
                          { name: 'Dr. Mishra', tag: 'Faculty', tc: 'bg-indigo-50 text-indigo-700' },
                          { name: 'Mr. Rao', tag: 'Staff', tc: 'bg-slate-100 text-slate-600' },
                          { name: 'Ms. Patel', tag: 'Staff', tc: 'bg-slate-100 text-slate-600' },
                          { name: 'Dr. Mahto', tag: 'Faculty', tc: 'bg-indigo-50 text-indigo-700' },
                        ],
                      },
                      {
                        room: 'Room 103',
                        cells: [
                          { name: 'Mr. Das', tag: 'Staff', tc: 'bg-slate-100 text-slate-600' },
                          { name: 'Prof. Mehra', tag: 'Pre-Set', tc: 'bg-amber-50 text-amber-700' },
                          { name: 'Mr. Khan', tag: 'Staff', tc: 'bg-slate-100 text-slate-600' },
                          { name: 'Dr. Yadav', tag: 'Faculty', tc: 'bg-indigo-50 text-indigo-700' },
                        ],
                      },
                    ].map((row, ri) => (
                      <tr key={row.room} className={ri % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}>
                        <td className="px-5 py-3.5 text-slate-400 font-medium">{row.room}</td>
                        {row.cells.map((cell, ci) => (
                          <td key={ci} className="px-5 py-3.5">
                            <p className="text-slate-800 font-medium">{cell.name}</p>
                            <span
                              className={`inline-block mt-0.5 text-[10px] font-semibold uppercase
                                          tracking-wider px-1.5 py-0.5 rounded ${cell.tc}`}
                            >
                              {cell.tag}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50">
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={12} className="text-emerald-500" />
                  <span className="text-emerald-700 text-xs font-semibold">All constraints satisfied</span>
                </div>
                <span className="text-slate-400 text-xs font-mono hidden sm:block">
                  8 staff · 6 faculty · 4 days · 3 rooms
                </span>
                <button
                  className="text-xs font-semibold text-white bg-emerald-600
                             hover:bg-emerald-700 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Export .xlsx
                </button>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <Fade>
            <h2 className="font-bold text-slate-900 text-3xl mb-4">
              Ready to skip the spreadsheet math?
            </h2>
            <p className="text-slate-500 text-base mb-10 max-w-md mx-auto">
              No login. No setup. Upload your file, hit generate, and download
              a validated roster - today.
            </p>

            <Link
              to="/schedule-generator"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700
                         text-white font-semibold px-8 py-3.5 rounded-xl
                         transition-colors duration-150 shadow-sm"
            >
              <CalendarDays size={16} />
              Generate schedule now
              <ArrowRight size={14} />
            </Link>

            <p className="text-slate-400 text-sm mt-5">
              Free · Open source · MIT licence
            </p>
          </Fade>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer className="py-10 px-6 border-t border-slate-100 bg-slate-50">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <CalendarDays size={15} className="text-indigo-600" />
            <span className="font-semibold text-sm text-slate-900">ExamDuty</span>
            <span className="text-slate-300 mx-1">·</span>
            <a
              href="https://www.linkedin.com/in/singhaditya5711"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 text-xs hover:text-slate-600 transition-colors"
            >
              Built by Aditya Singh
            </a>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a
              href="https://github.com/adysingh5711/Exam-Duty-IIITR"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-600 transition-colors flex items-center gap-1"
            >
              <Github size={12} />
              GitHub
            </a>
            <span className="text-slate-300">MIT Licence</span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}
