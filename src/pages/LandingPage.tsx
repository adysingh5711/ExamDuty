import { useEffect, useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Github, ArrowRight } from "lucide-react";
import Fade from "../components/shared/Fade";
import WorkflowSteps from "../components/landing/WorkflowSteps";
import FeatureGrid from "../components/landing/FeatureGrid";
import ScheduleMockup from "../components/landing/ScheduleMockup";

// Lazy-load the heavyweight animation and solver graphic component
const HeroGraphic = lazy(() => import("../components/landing/HeroGraphic"));

export default function LandingPage() {
  const [top, setTop] = useState(true);

  useEffect(() => {
    const fn = () => setTop(window.scrollY < 8);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-slate-900">
      {/* NAV */}
      <header
        className={`fixed inset-x-0 top-0 z-50 h-14 transition-all duration-200 ${top
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-sm border-b border-slate-100"
          }`}
      >
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarDays size={18} className="text-indigo-600" />
            <span className="font-semibold text-sm tracking-tight">
              ExamDuty
            </span>
            <span className="hidden sm:inline text-slate-300 text-sm mx-1">
              |
            </span>
            <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400">
              <span>Exam duty rosters</span>
              <span className="w-1 h-1 rounded-full bg-emerald-500" />
              <span>Open source</span>
            </div>
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
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-150"
            >
              <CalendarDays size={14} />
              <span>Open app</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO + TRUST STRIP combined viewport fill ── */}
      <div className="flex flex-col min-h-svh pt-14">

        {/* Hero grid — grows to fill remaining space */}
        <section className="flex-1 flex items-center px-6 py-12">
          <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 items-center gap-12">

            {/* left copy */}
            <div className="flex flex-col gap-5">
              <div
                className="inline-flex self-start items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full"
                style={{ animation: "up 0.5s ease both" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />
                <span>Exam Scheduling Tool</span>
              </div>

              <h1
                className="font-bold text-slate-900 leading-[1.08] tracking-tight mb-6"
                style={{
                  fontSize: "clamp(2.4rem, 6vw, 4rem)",
                  animation: "up 0.5s ease 60ms both",
                }}
              >
                Exam duty rosters.
                <br />
                Done in <span className="text-indigo-600">two minutes</span>.
                <br />
                Not two hours.
              </h1>

              <p
                className="text-slate-500 leading-relaxed mb-10 max-w-xl"
                style={{
                  fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                  animation: "up 0.5s ease 120ms both",
                }}
              >
                Upload your faculty excel sheet. Set rooms and exam days. The
                algorithm assigns every duty slot - respecting seniority,
                pre-assignments, and hard constraints - and exports a clean
                roster.
              </p>

              <div
                className="flex flex-wrap items-center gap-3 pb-10"
                style={{ animation: "up 0.5s ease 180ms both" }}
              >
                <Link
                  to="/schedule-generator"
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-150 shadow-sm"
                >
                  <CalendarDays size={16} />
                  <span>Generate schedule</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* right graphic */}
            <Suspense
              fallback={
                <div className="h-[320px] sm:h-[450px] md:h-[520px] flex flex-col items-center justify-center text-slate-400 gap-2 font-medium">
                  <div className="w-10 h-10 border-[3.5px] border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold select-none">
                    Loading solver...
                  </span>
                </div>
              }
            >
              <HeroGraphic />
            </Suspense>

          </div>
        </section>

        {/* Trust strip — pinned to bottom of the viewport block */}
        <div className="relative border-y border-slate-100 bg-gradient-to-r from-indigo-50/60 via-white to-indigo-50/60 shrink-0 mb-0">
          {/* subtle animated shimmer line at top border */}
          <div
            className="absolute top-0 left-0 h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #6366f1 40%, #818cf8 60%, transparent 100%)",
              animation: "shimmer 3s linear infinite",
            }}
          />

          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-center sm:justify-between gap-4">
            {/* left: label */}
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                Actively used at
              </span>
            </div>

            {/* center: logo + name */}
            <a
              href="https://iiitranchi.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <img
                src="https://iiitranchi.ac.in/images/logoXL.png"
                alt="IIIT Ranchi logo"
                className="h-9 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="flex flex-col">
                <span className="text-sm font-700 font-bold text-slate-800 leading-tight group-hover:text-indigo-700 transition-colors">
                  IIIT Ranchi
                </span>
                <span className="text-xs text-slate-400 leading-tight">
                  Indian Institute of Information Technology
                </span>
              </div>
            </a>

            {/* right: proof pill */}
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3.5 py-1.5 shadow-sm text-xs font-semibold text-slate-600">
              <svg className="w-3.5 h-3.5 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Exam rosters generated every semester
            </div>
          </div>

          {/* shimmer line at bottom border */}
          <div
            className="absolute bottom-0 left-0 h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #6366f1 40%, #818cf8 60%, transparent 100%)",
              animation: "shimmer 3s linear infinite reverse",
            }}
          />
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <Fade className="mb-14">
            <p className="text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-3">
              Workflow
            </p>
            <h2 className="font-bold text-slate-900 text-3xl">
              Three steps, then it&apos;s done.
            </h2>
          </Fade>

          <WorkflowSteps />
        </div>
      </section>

      {/* FEATURES */}
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

          <FeatureGrid />
        </div>
      </section>

      {/* SCHEDULE MOCKUP */}
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
              Every assignment tagged by role and seniority. No hidden logic -
              just a clean, auditable table ready to export.
            </p>
          </Fade>

          <ScheduleMockup />
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 px-6 bg-white relative overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle, #e0e7ff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        {/* radial fade overlay so dots fade at edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, white 100%)",
          }}
        />
        <div className="max-w-2xl mx-auto text-center relative z-10">
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
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors duration-150 shadow-sm"
            >
              <CalendarDays size={16} />
              <span>Generate schedule now</span>
              <ArrowRight size={14} />
            </Link>
            <p className="text-slate-400 text-sm mt-5">
              Free · Open source · MIT licence
            </p>
          </Fade>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 border-t border-slate-100 bg-slate-50">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <CalendarDays size={15} className="text-indigo-600" />
            <span className="font-semibold text-sm text-slate-900">
              ExamDuty
            </span>
            <span className="text-slate-300 mx-1">|</span>
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
              <span>GitHub</span>
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
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
