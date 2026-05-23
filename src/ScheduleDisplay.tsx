import React, { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, BarChart3 } from 'lucide-react';
import { Schedule, ScheduleEntry } from './types';

interface ScheduleDisplayProps {
    schedule: Schedule;
}

const ScheduleDisplay: React.FC<ScheduleDisplayProps> = ({ schedule }) => {
    const days: number[] = useMemo(
        () =>
            Array.from(new Set(schedule.entries.map((entry: ScheduleEntry) => entry.day))).sort(
                (a, b) => a - b
            ),
        [schedule.entries]
    );

    const [selectedDay, setSelectedDay] = useState<number>(days[0] || 1);
    const [showStats, setShowStats] = useState<boolean>(false);

    const getEntriesForDay = (day: number): ScheduleEntry[] => {
        return schedule.entries
            .filter((entry: ScheduleEntry) => entry.day === day)
            .sort((a: ScheduleEntry, b: ScheduleEntry) => a.room - b.room);
    };

    const currentEntries: ScheduleEntry[] = getEntriesForDay(selectedDay);

    const stats = useMemo(() => {
        const facultyStats = [...schedule.facultyDuties].sort((a, b) => b.count - a.count);
        const staffStats = [...schedule.staffDuties].sort((a, b) => b.count - a.count);

        const facultyAvg =
            facultyStats.length > 0
                ? facultyStats.reduce((sum, item) => sum + item.count, 0) / facultyStats.length
                : 0;

        const staffAvg =
            staffStats.length > 0
                ? staffStats.reduce((sum, item) => sum + item.count, 0) / staffStats.length
                : 0;

        return {
            facultyAvg: facultyAvg.toFixed(2),
            staffAvg: staffAvg.toFixed(2),
            facultyMin: facultyStats.length ? facultyStats[facultyStats.length - 1].count : 0,
            facultyMax: facultyStats.length ? facultyStats[0].count : 0,
            staffMin: staffStats.length ? staffStats[staffStats.length - 1].count : 0,
            staffMax: staffStats.length ? staffStats[0].count : 0,
            facultyStats,
            staffStats,
        };
    }, [schedule.facultyDuties, schedule.staffDuties]);

    return (
        <div className="p-0 max-w-full mx-auto space-y-5">
            {/* Day selector tabs */}
            <div className="border-b border-slate-100 bg-slate-50">
                <div className="flex overflow-x-auto px-2 sm:px-3">
                    {days.map((day: number) => (
                        <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`relative whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors ${selectedDay === day
                                ? 'text-indigo-700'
                                : 'text-slate-500 hover:text-slate-900'
                                }`}
                        >
                            Day {day}
                            {selectedDay === day && (
                                <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-indigo-600" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Schedule grid */}
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead className="bg-white">
                        <tr className="border-b border-slate-100">
                            <th className="w-28 px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                                Room
                            </th>
                            <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                                Supervisors
                            </th>
                        </tr>
                    </thead>

                    <tbody className="bg-white">
                        {currentEntries.map((entry: ScheduleEntry) => (
                            <tr
                                key={`${entry.day}-${entry.room}`}
                                className="border-b border-slate-100 align-top transition-colors hover:bg-slate-50/70"
                            >
                                <td className="px-5 py-4 whitespace-nowrap">
                                    <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-700">
                                        Room {entry.room}
                                    </span>
                                </td>

                                <td className="px-5 py-4">
                                    <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
                                        <div className="min-w-0 flex-1 rounded-xl border border-indigo-100 bg-indigo-50 p-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                                                    {entry.faculty.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="truncate text-sm font-semibold text-slate-900">
                                                        {entry.faculty.name}
                                                    </div>
                                                    <div className="mt-1 inline-flex rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-700">
                                                        {entry.faculty.type}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 p-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-white">
                                                    {entry.staff.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="truncate text-sm font-semibold text-slate-900">
                                                        {entry.staff.name}
                                                    </div>
                                                    <div className="mt-1 inline-flex rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                                                        {entry.staff.type}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {currentEntries.length === 0 && (
                            <tr>
                                <td colSpan={2} className="px-6 py-10 text-center text-sm text-slate-500">
                                    No schedule entries for this day.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Stats toggle */}
            <button
                onClick={() => setShowStats(!showStats)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            >
                <BarChart3 size={16} className="text-indigo-600" />
                <span>{showStats ? 'Hide distribution statistics' : 'Show distribution statistics'}</span>
                {showStats ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {/* Statistics section */}
            {showStats && (
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                    <div className="border-b border-slate-100 px-5 py-4">
                        <h2 className="text-base font-semibold text-slate-900">Duty distribution</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Visual breakdown of duty allocation across faculty and staff.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 p-5 xl:grid-cols-2">
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900">Faculty duties</h3>
                            <div className="mt-2 flex justify-between text-sm text-slate-500">
                                <span>Average: {stats.facultyAvg}</span>
                                <span>
                                    Range: {stats.facultyMin} - {stats.facultyMax}
                                </span>
                            </div>

                            <div className="mt-4 space-y-3">
                                {stats.facultyStats.map((item: { name: string; count: number }) => (
                                    <div key={item.name}>
                                        <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                                            <span className="truncate pr-2 font-medium text-slate-700">{item.name}</span>
                                            <span className="shrink-0 text-slate-500">{item.count}</span>
                                        </div>
                                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                                            <div
                                                className="h-full rounded-full bg-indigo-500"
                                                style={{
                                                    width: `${stats.facultyMax ? (item.count / stats.facultyMax) * 100 : 0}%`,
                                                    minWidth: item.count > 0 ? '24px' : '0px',
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-slate-900">Staff duties</h3>
                            <div className="mt-2 flex justify-between text-sm text-slate-500">
                                <span>Average: {stats.staffAvg}</span>
                                <span>
                                    Range: {stats.staffMin} - {stats.staffMax}
                                </span>
                            </div>

                            <div className="mt-4 space-y-3">
                                {stats.staffStats.map((item: { name: string; count: number }) => (
                                    <div key={item.name}>
                                        <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                                            <span className="truncate pr-2 font-medium text-slate-700">{item.name}</span>
                                            <span className="shrink-0 text-slate-500">{item.count}</span>
                                        </div>
                                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                                            <div
                                                className="h-full rounded-full bg-slate-500"
                                                style={{
                                                    width: `${stats.staffMax ? (item.count / stats.staffMax) * 100 : 0}%`,
                                                    minWidth: item.count > 0 ? '24px' : '0px',
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-5 py-4">
                <p className="text-sm font-medium text-indigo-900">Scheduling note</p>
                <p className="mt-1 text-sm leading-relaxed text-indigo-700">
                    The schedule is generated to balance duties fairly across faculty and staff while respecting the configured constraints.
                </p>
            </div>
        </div>
    );
};

export default ScheduleDisplay;