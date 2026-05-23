export type SlotType =
  | "conflict"
  | "ok-fac"
  | "ok-staff"
  | "ok-senior"
  | "ok-preset"
  | "resolved-fac"
  | "resolved-staff"
  | "resolved-senior"
  | "resolved-preset";

export interface Slot {
  id: string;
  init: string;
  type: SlotType;
}

export interface WorkflowStep {
  step: string;
  iconType: "upload" | "sliders" | "export";
  title: string;
  body: string;
  delay: number;
}

export interface FeatureItem {
  iconName: "Cpu" | "Lock" | "Scale" | "FileSpreadsheet" | "Shield" | "CheckCircle";
  title: string;
  body: string;
  delay: number;
}

export interface ScheduleCell {
  name: string;
  tag: string;
  tc: string;
}

export interface ScheduleRoom {
  room: string;
  cells: ScheduleCell[];
}

export const initialSlotData: Slot[] = [
  { id: "s0", init: "DM", type: "conflict" },
  { id: "s1", init: "AK", type: "conflict" },
  { id: "s2", init: "PM", type: "conflict" },
  { id: "s3", init: "RS", type: "conflict" },
  { id: "s4", init: "VK", type: "conflict" },
  { id: "s5", init: "NR", type: "ok-fac" },
  { id: "s6", init: "SM", type: "ok-fac" },
  { id: "s7", init: "BT", type: "conflict" },
  { id: "s8", init: "KS", type: "ok-senior" },
  { id: "s9", init: "LG", type: "conflict" },
  { id: "s10", init: "MJ", type: "ok-staff" },
  { id: "s11", init: "AR", type: "ok-fac" },
  { id: "s12", init: "PK", type: "conflict" },
  { id: "s13", init: "SB", type: "ok-staff" },
  { id: "s14", init: "GV", type: "ok-fac" },
];

export const resolvedTypes: SlotType[] = [
  "resolved-fac",
  "resolved-staff",
  "resolved-senior",
  "resolved-preset",
  "resolved-fac",
  "resolved-fac",
  "resolved-fac",
  "resolved-staff",
  "resolved-senior",
  "resolved-preset",
  "resolved-staff",
  "resolved-fac",
  "resolved-fac",
  "resolved-staff",
  "resolved-fac",
];

export const workflowSteps: WorkflowStep[] = [
  {
    step: "01",
    iconType: "upload",
    title: "Upload your spreadsheet",
    body: "Drop any .xlsx or .xls file with faculty names and roles. No reformatting, no template - just your existing data.",
    delay: 0,
  },
  {
    step: "02",
    iconType: "sliders",
    title: "Set rooms and days",
    body: "Configure exam days and rooms. Optionally lock specific faculty to fixed days before generation.",
    delay: 60,
  },
  {
    step: "03",
    iconType: "export",
    title: "Export a clean roster",
    body: "Review the validated schedule in the table. Zero constraint violations? Export to Excel with one click.",
    delay: 120,
  },
];

export const featureItems: FeatureItem[] = [
  {
    iconName: "Cpu",
    title: "Constraint satisfaction",
    body: "Distributes duties across all staff respecting hard rules - no manual juggling needed.",
    delay: 0,
  },
  {
    iconName: "Lock",
    title: "Pre-assignment locks",
    body: "Lock specific faculty to specific days. Everything else gets balanced around your fixed assignments.",
    delay: 40,
  },
  {
    iconName: "Scale",
    title: "Seniority weighting",
    body: "Senior faculty get preferential allocation. Staff duty targets are calculated from room-day totals.",
    delay: 80,
  },
  {
    iconName: "FileSpreadsheet",
    title: "Direct Excel import",
    body: "Parsed via the XLSX library. No CSV conversion, no reformatting - just upload and go.",
    delay: 120,
  },
  {
    iconName: "Shield",
    title: "Validator built in",
    body: "Post-generation checks catch consecutive same-room conflicts and duty-count violations.",
    delay: 160,
  },
  {
    iconName: "CheckCircle",
    title: "Role-tagged output",
    body: "Faculty and staff are colour-coded in the schedule table. Coordinators see exactly what was assigned.",
    delay: 200,
  },
];

export const scheduleRooms: ScheduleRoom[] = [
  {
    room: "Room 101",
    cells: [
      {
        name: "Dr. Malviya",
        tag: "Faculty",
        tc: "bg-indigo-50 text-indigo-700",
      },
      {
        name: "Mr. Kumar",
        tag: "Staff",
        tc: "bg-slate-100 text-slate-600",
      },
      {
        name: "Dr. Sharma",
        tag: "Senior Faculty",
        tc: "bg-violet-50 text-violet-700",
      },
      {
        name: "Ms. Singh",
        tag: "Staff",
        tc: "bg-slate-100 text-slate-600",
      },
    ],
  },
  {
    room: "Room 102",
    cells: [
      {
        name: "Dr. Mishra",
        tag: "Faculty",
        tc: "bg-indigo-50 text-indigo-700",
      },
      {
        name: "Mr. Rao",
        tag: "Staff",
        tc: "bg-slate-100 text-slate-600",
      },
      {
        name: "Ms. Patel",
        tag: "Staff",
        tc: "bg-slate-100 text-slate-600",
      },
      {
        name: "Dr. Mahto",
        tag: "Faculty",
        tc: "bg-indigo-50 text-indigo-700",
      },
    ],
  },
  {
    room: "Room 103",
    cells: [
      {
        name: "Mr. Das",
        tag: "Staff",
        tc: "bg-slate-100 text-slate-600",
      },
      {
        name: "Prof. Mehra",
        tag: "Pre-Set",
        tc: "bg-amber-50 text-amber-700",
      },
      {
        name: "Mr. Khan",
        tag: "Staff",
        tc: "bg-slate-100 text-slate-600",
      },
      {
        name: "Dr. Yadav",
        tag: "Faculty",
        tc: "bg-indigo-50 text-indigo-700",
      },
    ],
  },
];
