import { CheckCircle } from "lucide-react";
import Fade from "../shared/Fade";
import { scheduleRooms } from "../../data/landing";

export default function ScheduleMockup() {
  const headers = ["Room", "Day 1", "Day 2", "Day 3", "Day 4"];

  return (
    <Fade delay={60}>
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {/* fake browser bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50">
          <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
          <span className="ml-3 text-xs text-slate-400 font-mono">
            ExamDuty · Scheduler
          </span>
        </div>

        {/* table */}
        <div className="overflow-x-auto">
          <table
            className="text-xs border-collapse"
            style={{ minWidth: 520, width: "100%" }}
          >
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {headers.map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-slate-400 font-medium uppercase tracking-wider"
                    style={{ fontSize: 11 }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {scheduleRooms.map((row, ri) => (
                <tr
                  key={row.room}
                  className={ri % 2 === 1 ? "bg-slate-50/50" : "bg-white"}
                >
                  <td className="px-5 py-3.5 text-slate-400 font-medium">
                    {row.room}
                  </td>
                  {row.cells.map((cell, ci) => (
                    <td key={ci} className="px-5 py-3.5">
                      <p className="text-slate-800 font-medium">
                        {cell.name}
                      </p>
                      <span
                        className={`inline-block mt-0.5 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${cell.tc}`}
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

        {/* status bar */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center gap-1.5">
            <CheckCircle size={12} className="text-emerald-500" />
            <span className="text-emerald-700 text-xs font-semibold">
              All constraints satisfied
            </span>
          </div>
          <div>
            <span className="text-slate-400 text-xs font-mono hidden sm:block">
              8 staff · 6 faculty · 4 days · 3 rooms
            </span>
          </div>
          <button className="text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-lg transition-colors">
            Export .xlsx
          </button>
        </div>
      </div>
    </Fade>
  );
}
