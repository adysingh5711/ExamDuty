import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileUp,
  Download,
  RefreshCw,
  Plus,
  X,
  ArrowLeft,
  CalendarDays,
  Settings2,
  Users,
  CheckCircle2,
  Clock3
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { Person, Schedule, FacultyConstraint } from '../types';
import { generateSchedule } from '../utils/scheduleGenerator';
import ScheduleDisplay from '../ScheduleDisplay';
import { updateSEO } from '../utils/seo';

export default function SchedulerPage() {
  useEffect(() => {
    updateSEO({
      title: "Automated Exam Roster Generator | ExamDuty",
      description: "Set days, classrooms, and faculty constraints. Instantly generate fair, conflict-free, seniority-respecting exam duty rosters.",
      canonical: "https://examination-duty.vercel.app/schedule-generator"
    });
  }, []);

  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [faculty, setFaculty] = useState<Person[]>([]);
  const [staff, setStaff] = useState<Person[]>([]);
  const [isGenerated, setIsGenerated] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [constraints, setConstraints] = useState<FacultyConstraint[]>([]);
  const [days, setDays] = useState(6);
  const [rooms, setRooms] = useState(11);
  const [newConstraintFaculty, setNewConstraintFaculty] = useState('');
  const [newConstraintDay, setNewConstraintDay] = useState(1);

  const totalSlots = useMemo(() => days * rooms, [days, rooms]);

  const resetAll = useCallback(() => {
    setFileName(null);
    setFaculty([]);
    setStaff([]);
    setSchedule(null);
    setIsGenerated(false);
    setConstraints([]);
    setNewConstraintFaculty('');
    setNewConstraintDay(1);
    setDays(6);
    setRooms(11);
  }, []);

  const buildConstraintMap = useCallback(() => {
    const constraintMap: { [day: number]: string[] } = {};
    constraints.forEach((constraint) => {
      if (!constraintMap[constraint.day]) constraintMap[constraint.day] = [];
      constraintMap[constraint.day].push(constraint.facultyName);
    });
    return constraintMap;
  }, [constraints]);

  const generateAndSetSchedule = useCallback(
    (nextFaculty: Person[] = faculty, nextStaff: Person[] = staff) => {
      const generatedSchedule = generateSchedule(
        nextFaculty,
        nextStaff,
        buildConstraintMap(),
        days,
        rooms
      );
      setSchedule(generatedSchedule);
      setIsGenerated(true);
    },
    [faculty, staff, buildConstraintMap, days, rooms]
  );

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    event.target.value = '';
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);

      const nextFaculty: Person[] = [];
      const nextStaff: Person[] = [];

      jsonData.forEach((row: any) => {
        if (row.Faculty) {
          nextFaculty.push({ name: String(row.Faculty).trim(), type: 'faculty' });
        }
        if (row.Staff) {
          nextStaff.push({ name: String(row.Staff).trim(), type: 'staff' });
        }
      });

      setFaculty(nextFaculty);
      setStaff(nextStaff);
      setConstraints([]);
      generateAndSetSchedule(nextFaculty, nextStaff);
    };

    reader.readAsArrayBuffer(file);
  }, [generateAndSetSchedule]);

  const addConstraint = useCallback(() => {
    if (!newConstraintFaculty.trim()) {
      alert('Please select a faculty member');
      return;
    }

    if (newConstraintDay < 1 || newConstraintDay > days) {
      alert(`Day must be between 1 and ${days}`);
      return;
    }

    const facultyExists = faculty.some((f) => f.name === newConstraintFaculty);
    if (!facultyExists) {
      alert('Selected faculty member not found in the uploaded list');
      return;
    }

    const duplicate = constraints.some(
      (c) => c.facultyName === newConstraintFaculty && c.day === newConstraintDay
    );
    if (duplicate) {
      alert('This constraint already exists');
      return;
    }

    setConstraints((prev) => [
      ...prev,
      { facultyName: newConstraintFaculty, day: newConstraintDay },
    ]);
    setNewConstraintFaculty('');
    setNewConstraintDay(1);
  }, [newConstraintFaculty, newConstraintDay, days, faculty, constraints]);

  const removeConstraint = useCallback((index: number) => {
    setConstraints((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const regenerate = useCallback(() => {
    if (faculty.length === 0 || staff.length === 0) {
      alert('Please upload a file first.');
      return;
    }
    generateAndSetSchedule();
  }, [faculty.length, staff.length, generateAndSetSchedule]);

  const downloadSchedule = useCallback(() => {
    if (!schedule) return;

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([]);
    const columnWidths = [{ wch: 22 }, ...Array.from({ length: days }, () => ({ wch: 18 }))];
    ws['!cols'] = columnWidths;

    const getCellRef = (r: number, c: number): string => {
      const col = XLSX.utils.encode_col(c);
      return `${col}${r + 1}`;
    };

    ws[getCellRef(0, 0)] = { t: 's', v: 'Date & Day / Classroom' };

    for (let col = 1; col <= days; col++) {
      ws[getCellRef(0, col)] = { t: 's', v: `Day ${col}` };
    }

    for (let room = 1; room <= rooms; room++) {
      const roomRow = 1 + (room - 1) * 2;
      ws[getCellRef(roomRow, 0)] = { t: 's', v: `Room ${room}` };
      ws['!merges'] = ws['!merges'] || [];
      ws['!merges'].push({ s: { r: roomRow, c: 0 }, e: { r: roomRow + 1, c: 0 } });

      for (let day = 1; day <= days; day++) {
        const entry = schedule.entries.find((e) => e.day === day && e.room === room);
        if (entry) {
          ws[getCellRef(roomRow, day)] = { t: 's', v: entry.faculty.name };
          ws[getCellRef(roomRow + 1, day)] = { t: 's', v: entry.staff.name };
        }
      }
    }

    ws['!ref'] = `A1:${XLSX.utils.encode_col(days)}${1 + rooms * 2}`;
    XLSX.utils.book_append_sheet(wb, ws, 'Examination Schedule');

    const dutyCounts = [
      ['Faculty Duties'],
      ['Name', 'Count'],
      ...schedule.facultyDuties.map((f) => [f.name, f.count]),
      [],
      ['Staff Duties'],
      ['Name', 'Count'],
      ...schedule.staffDuties.map((s) => [s.name, s.count]),
    ];

    const dutyWs = XLSX.utils.aoa_to_sheet(dutyCounts);
    XLSX.utils.book_append_sheet(wb, dutyWs, 'Duty Counts');
    XLSX.writeFile(wb, 'examination-schedule.xlsx');
  }, [schedule, days, rooms]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 h-14 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={14} />
              Back
            </Link>
            <div className="hidden sm:block w-px h-5 bg-slate-200" />
            <div className="flex items-center gap-2 min-w-0">
              <CalendarDays size={18} className="text-indigo-600" />
              <div className="min-w-0">
                <h1 className="text-sm font-semibold tracking-tight truncate">ExamDuty</h1>
                <p className="text-xs text-slate-500 truncate">Examination Duty Schedule Generator</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isGenerated && schedule && (
              <button
                onClick={downloadSchedule}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Download size={15} />
                <span className="hidden sm:inline">Download</span>
              </button>
            )}
            <button
              onClick={regenerate}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
            >
              <RefreshCw size={15} />
              <span className="hidden sm:inline">{isGenerated ? 'Regenerate' : 'Generate'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-[360px_minmax(0,1fr)] gap-6 items-start">
          <aside className="space-y-6 xl:sticky xl:top-24">
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600 mb-2">
                  Upload
                </p>
                <h2 className="text-lg font-semibold text-slate-900">Faculty spreadsheet</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Upload an Excel file with <span className="font-medium text-slate-700">Faculty</span> and <span className="font-medium text-slate-700">Staff</span> columns.
                </p>
              </div>

              <div className="p-6">
                <label
                  htmlFor="file-upload"
                  className="group relative block cursor-pointer rounded-2xl border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <input
                    id="file-upload"
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                    className="sr-only"
                  />

                  <div className="p-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                      <FileUp size={22} />
                    </div>

                    {fileName ? (
                      <>
                        <p className="text-sm font-semibold text-slate-900 break-all">{fileName}</p>
                        <p className="mt-1 text-sm text-slate-500">File loaded. Upload another file to replace it.</p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-slate-900">Click to upload your file</p>
                        <p className="mt-1 text-sm text-slate-500">Supports .xlsx and .xls files</p>
                      </>
                    )}
                  </div>
                </label>

                {fileName && (
                  <button
                    onClick={resetAll}
                    className="mt-4 inline-flex items-center gap-2 text-sm text-rose-600 hover:text-rose-700 transition-colors"
                  >
                    <X size={14} />
                    Clear uploaded data
                  </button>
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100">
                <div className="flex items-center gap-2 mb-2 text-indigo-600">
                  <Settings2 size={16} />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em]">Configuration</p>
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Schedule setup</h2>
              </div>

              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Number of days</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={days}
                      onChange={(e) => setDays(parseInt(e.target.value) || 6)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Number of rooms</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={rooms}
                      onChange={(e) => setRooms(parseInt(e.target.value) || 11)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-sm font-medium text-slate-900">Quick summary</p>
                  <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="text-slate-400">Faculty</p>
                      <p className="font-semibold text-slate-900">{faculty.length}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Staff</p>
                      <p className="font-semibold text-slate-900">{staff.length}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Slots</p>
                      <p className="font-semibold text-slate-900">{totalSlots}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100">
                <div className="flex items-center gap-2 mb-2 text-indigo-600">
                  <Users size={16} />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em]">Constraints</p>
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Faculty day fixing</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Lock a faculty member to a specific day before generating the schedule.
                </p>
              </div>

              <div className="p-6 space-y-4">
                {faculty.length > 0 ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Faculty member</label>
                      <select
                        value={newConstraintFaculty}
                        onChange={(e) => setNewConstraintFaculty(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      >
                        <option value="">Select faculty</option>
                        {faculty.map((f, index) => (
                          <option key={`${f.name}-${index}`} value={f.name}>
                            {f.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-end gap-3">
                      <div className="w-24">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Day</label>
                        <input
                          type="number"
                          min={1}
                          max={days}
                          value={newConstraintDay}
                          onChange={(e) => setNewConstraintDay(parseInt(e.target.value) || 1)}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>

                      <button
                        onClick={addConstraint}
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
                      >
                        <Plus size={15} />
                        Add
                      </button>
                    </div>

                    {constraints.length > 0 ? (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {constraints.map((constraint, index) => (
                          <div
                            key={`${constraint.facultyName}-${constraint.day}-${index}`}
                            className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-sm text-indigo-700"
                          >
                            <span>{constraint.facultyName} · Day {constraint.day}</span>
                            <button
                              onClick={() => removeConstraint(index)}
                              className="text-indigo-500 hover:text-indigo-700 transition-colors"
                              aria-label={`Remove constraint for ${constraint.facultyName} day ${constraint.day}`}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">No faculty locks added yet.</p>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-slate-500">Upload a faculty list first to add constraints.</p>
                )}
              </div>
            </section>
          </aside>

          <section className="min-w-0 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600 mb-2">
                    Output
                  </p>
                  <h2 className="text-lg font-semibold text-slate-900">Generated schedule</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Review the assignment table, validate the output, then export the Excel file.
                  </p>
                </div>

                <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm self-start ${schedule
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {schedule ? <CheckCircle2 size={14} /> : <Clock3 size={14} />}
                  {schedule ? 'Schedule ready' : 'Waiting for input'}
                </div>
              </div>

              <div className="p-6 min-w-0">
                {schedule ? (
                  <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-3 sm:p-4">
                    <div className="min-w-0 overflow-x-auto">
                      <ScheduleDisplay schedule={schedule} />
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                      <CalendarDays size={22} />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900">No schedule yet</h3>
                    <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
                      Upload your spreadsheet, adjust days and rooms if needed, and generate the schedule.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
