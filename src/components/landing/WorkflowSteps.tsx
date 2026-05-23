import Fade from "../shared/Fade";
import { workflowSteps } from "../../data/landing";

// Pictograms
function UploadPictogram() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="w-12 h-12"
      aria-hidden
    >
      <rect
        x="4"
        y="8"
        width="28"
        height="36"
        rx="4"
        fill="#eef2ff"
        stroke="#c7d2fe"
        strokeWidth="1.5"
      />
      <rect x="8" y="16" width="16" height="2.5" rx="1.5" fill="#a5b4fc" />
      <rect x="8" y="22" width="12" height="2.5" rx="1.5" fill="#c7d2fe" />
      <rect x="8" y="28" width="14" height="2.5" rx="1.5" fill="#c7d2fe" />
      <circle cx="37" cy="34" r="9" fill="#4f46e5" />
      <path
        d="M37 38v-8M34 33l3-3 3 3"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function SlidersPictogram() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="w-12 h-12"
      aria-hidden
    >
      <rect
        x="4"
        y="10"
        width="40"
        height="5"
        rx="2.5"
        fill="#e2e8f0"
      />
      <circle cx="16" cy="12.5" r="5" fill="#4f46e5" />
      <rect
        x="4"
        y="22"
        width="40"
        height="5"
        rx="2.5"
        fill="#e2e8f0"
      />
      <circle cx="30" cy="24.5" r="5" fill="#4f46e5" />
      <rect
        x="4"
        y="34"
        width="40"
        height="5"
        rx="2.5"
        fill="#e2e8f0"
      />
      <circle cx="22" cy="36.5" r="5" fill="#4f46e5" />
    </svg>
  );
}

function ExportPictogram() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="w-12 h-12"
      aria-hidden
    >
      <rect
        x="4"
        y="6"
        width="28"
        height="36"
        rx="4"
        fill="#f0fdf4"
        stroke="#bbf7d0"
        strokeWidth="1.5"
      />
      <rect x="8" y="14" width="16" height="2.5" rx="1.5" fill="#86efac" />
      <rect x="8" y="20" width="12" height="2.5" rx="1.5" fill="#bbf7d0" />
      <rect x="8" y="26" width="14" height="2.5" rx="1.5" fill="#bbf7d0" />
      <circle cx="37" cy="34" r="9" fill="#16a34a" />
      <path
        d="M37 30v8M34 35l3 3 3-3"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle
        cx="34"
        cy="11"
        r="5"
        fill="#dcfce7"
        stroke="#86efac"
        strokeWidth="1.5"
      />
      <path
        d="M32 11l1.5 1.5L36 9"
        stroke="#16a34a"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

const pictogramMap = {
  upload: <UploadPictogram />,
  sliders: <SlidersPictogram />,
  export: <ExportPictogram />,
};

export default function WorkflowSteps() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {workflowSteps.map((s) => (
        <Fade key={s.step} delay={s.delay}>
          <div className="bg-white rounded-2xl border border-slate-100 p-7 h-full relative overflow-hidden">
            <span
              className="absolute top-4 right-5 font-bold text-slate-100 select-none pointer-events-none"
              style={{ fontSize: "3.5rem", lineHeight: 1 }}
            >
              {s.step}
            </span>
            <div className="mb-5">{pictogramMap[s.iconType]}</div>
            <h3 className="font-semibold text-slate-900 text-base mb-2">
              {s.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              {s.body}
            </p>
          </div>
        </Fade>
      ))}
    </div>
  );
}
