import { useEffect, useState } from "react";
import { initialSlotData, resolvedTypes, Slot, SlotType } from "../../data/landing";

export default function ConflictCard() {
  const [slots, setSlots] = useState<Slot[]>(initialSlotData);
  const [conflicts, setConflicts] = useState(8);
  const [resolved, setResolved] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [phaseText, setPhaseText] = useState(
    "Manual assignment - 8 conflicts detected"
  );
  const [phaseColor, setPhaseColor] = useState("#ef4444");
  const [phaseIconCheck, setPhaseIconCheck] = useState(false);
  const [solving, setSolving] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Run solver");

  useEffect(() => {
    // initial remaining is equal to conflicts
    setRemaining(conflicts);
  }, []);

  // auto-run once on mount, like f.html
  useEffect(() => {
    const t = setTimeout(() => {
      handleRun();
    }, 1400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetState = () => {
    setSlots(initialSlotData);
    setConflicts(8);
    setResolved(0);
    setRemaining(8);
    setPhaseText("Manual assignment - 8 conflicts detected");
    setPhaseColor("#ef4444");
    setPhaseIconCheck(false);
    setButtonLabel("Run solver");
    setSolving(false);
  };

  const handleRun = () => {
    if (solving) return;
    if (buttonLabel === "Reset") {
      resetState();
      return;
    }

    setSolving(true);
    setButtonLabel("Solving...");

    const conflictIndices = slots
      .map((s, i) => (s.type === "conflict" ? i : -1))
      .filter((i) => i >= 0);

    if (!conflictIndices.length) {
      setSolving(false);
      setButtonLabel("Reset");
      return;
    }

    let done = 0;
    conflictIndices.forEach((slotIndex, idx) => {
      setTimeout(() => {
        setSlots((prev) => {
          const next = [...prev];
          const s = next[slotIndex];
          const resolvedType = resolvedTypes[idx] ?? "resolved-fac";
          next[slotIndex] = { ...s, type: resolvedType };
          return next;
        });

        done += 1;
        const remainingNow = conflictIndices.length - done;
        setConflicts(remainingNow);
        setResolved(done);
        setRemaining(remainingNow);

        if (remainingNow === 0) {
          setPhaseText("ExamDuty · all constraints satisfied");
          setPhaseColor("#16a34a");
          setPhaseIconCheck(true);
          setButtonLabel("Reset");
          setSolving(false);
        } else if (idx === conflictIndices.length - 1) {
          setSolving(false);
          setButtonLabel("Reset");
        }
      }, 300 + idx * 220);
    });
  };

  const slotBase =
    "h-8 rounded-md flex items-center justify-center text-[0.55rem] font-semibold transition-all duration-500 relative";

  const typeToClass: Record<SlotType, string> = {
    conflict:
      "bg-red-50 border border-red-300 text-red-600 shadow-sm after:content-['!'] after:absolute after:-top-1.5 after:-right-1.5 after:w-[13px] after:h-[13px] after:rounded-full after:bg-red-500 after:text-white after:text-[0.5rem] after:font-extrabold after:flex after:items-center after:justify-center after:leading-[13px]",
    "ok-fac":
      "bg-indigo-50 border border-indigo-200 text-indigo-600 shadow-sm",
    "ok-staff":
      "bg-emerald-50 border border-emerald-200 text-emerald-600 shadow-sm",
    "ok-senior":
      "bg-violet-50 border border-violet-200 text-violet-600 shadow-sm",
    "ok-preset":
      "bg-amber-50 border border-amber-200 text-amber-600 shadow-sm",
    "resolved-fac":
      "bg-indigo-50 border-[1.5px] border-indigo-300 text-indigo-700 shadow-sm resolved-tick",
    "resolved-staff":
      "bg-emerald-50 border-[1.5px] border-emerald-300 text-emerald-700 shadow-sm resolved-tick",
    "resolved-senior":
      "bg-violet-50 border-[1.5px] border-violet-300 text-violet-700 shadow-sm resolved-tick",
    "resolved-preset":
      "bg-amber-50 border-[1.5px] border-amber-300 text-amber-700 shadow-sm resolved-tick",
  };

  return (
    <div
      className="bg-white border border-slate-200 rounded-2xl shadow-lg p-4 sm:p-5 w-[280px] sm:w-[320px] select-none"
      style={{
        fontSize: "10px",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className={`flex h-5 w-5 items-center justify-center rounded-full ${phaseIconCheck ? "bg-emerald-50" : "bg-red-50"}`}>
          {phaseIconCheck ? (
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              className="text-emerald-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              className="text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="7" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12" y2="17.01" />
            </svg>
          )}
        </div>
        <span
          className="text-[0.65rem] font-semibold uppercase tracking-[0.08em]"
          style={{ color: phaseColor }}
        >
          {phaseText}
        </span>
      </div>

      <div className="grid grid-cols-5 gap-1.5 mb-3">
        {slots.map((s) => (
          <div
            key={s.id}
            className={`${slotBase} ${typeToClass[s.type]}`}
          >
            {s.init}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm mb-2">
        <div className="flex flex-col items-center gap-0.5">
          <div
            className={`text-[1.15rem] font-extrabold tabular-nums ${conflicts > 0 ? "text-red-500" : "text-slate-900"
              }`}
          >
            {conflicts}
          </div>
          <div className="text-[0.55rem] font-semibold text-slate-400 uppercase tracking-[0.06em]">
            Conflicts
          </div>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-[1.15rem] font-extrabold tabular-nums text-emerald-500">
            {resolved}
          </div>
          <div className="text-[0.55rem] font-semibold text-slate-400 uppercase tracking-[0.06em]">
            Resolved
          </div>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div
            className="text-[1.15rem] font-extrabold tabular-nums"
            style={{ color: remaining === 0 ? "#16a34a" : "#94a3b8" }}
          >
            {remaining}
          </div>
          <div className="text-[0.55rem] font-semibold text-slate-400 uppercase tracking-[0.06em]">
            Remaining
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleRun}
          disabled={solving}
          className="text-[0.7rem] font-semibold rounded-lg px-3 py-1.5 text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 transition-transform duration-150 disabled:cursor-default"
          style={{
            transform: solving ? "none" : "translateY(0)",
          }}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
