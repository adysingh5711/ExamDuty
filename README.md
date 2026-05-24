<div align="center">

# ExamDuty

**Automated exam invigilation duty scheduler**

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646cff?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)](https://tailwindcss.com)

[Live Demo](https://examination-duty.vercel.app/) · [Report Bug](https://github.com/adysingh5711/ExamDuty/issues) · [Request Feature](https://github.com/adysingh5711/ExamDuty/issues)

</div>

---

## What is this?

ExamDuty eliminates the manual spreadsheet chaos of assigning exam invigilation duties. Upload your faculty/staff list as an Excel file, set the number of exam days and rooms, optionally pin specific faculty to specific days, and get a balanced, constraint-validated schedule in one click.

Designed for IIIT Ranchi, but the scheduling engine is general enough for any institution using a similar duty-rotation model.

---

## Features

- **Excel import** -- Upload `.xlsx`/`.xls` with faculty names and types (faculty/staff)
- **Seniority-aware balancing** -- Senior faculty, listed in the top of the Excel, get proportionally adjusted duty counts
- **Hard constraint enforcement** -- No person assigned twice on the same day; no consecutive same-room assignments
- **Pre-assignment support** -- Pin faculty members to specific days before generation
- **Workload targets** -- Staff duty target auto-calculated as `total_positions / staff_count`
- **Validation layer** -- Post-generation checks catch and report any violated constraints
- **Export-ready output** -- Rendered schedule table ready for copy/print

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18.3.1 + TypeScript 5.5.3 |
| Styling | Tailwind CSS + Lucide React |
| Build | Vite 5.4.2 |
| Excel Parsing | SheetJS (xlsx) |
| Linting | ESLint with TypeScript plugin |

---

## Project Structure

```
ExamDuty/
├── src/
│   ├── pages/
│   │   ├── LandingPage.tsx       # Marketing/intro page
│   │   └── SchedulerPage.tsx     # Main scheduler UI
│   ├── utils/
│   │   └── scheduleGenerator.ts  # Core scheduling engine
│   ├── ScheduleDisplay.tsx       # Schedule output & rendering
│   ├── types.ts                  # Shared TypeScript types
│   └── App.tsx                   # Route definitions
├── public/                       # Static assets & SEO files
├── try_ExamDuty.xlsx             # Sample input file
└── index.html
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
git clone https://github.com/adysingh5711/ExamDuty.git
cd ExamDuty
npm install
```

### Development

```bash
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Production build to dist/
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

---

## Usage

### Input File Format

Your Excel file must have these columns (see `try_ExamDuty.xlsx` for a working example):

| Column | Required | Values |
|---|---|---|
| `Name` | Yes | Full name string |
| `Type` | Yes | `faculty` or `staff` |

### Workflow

1. **Upload** the Excel file via the file input
2. **Configure** number of exam days (1-10) and rooms (1-20)
3. **Pre-assign** (optional) -- specify which faculty appear on which days
4. **Generate** -- the scheduler runs constraint satisfaction and workload balancing
5. **Review** the output table; fix any flagged warnings
6. **Export** or print the schedule

### Scheduling Constraints

The engine enforces these hard constraints:

- A person cannot be assigned to more than one room on the same day
- A person cannot be assigned to the same room on consecutive days
- Staff duty count target = `floor((days * rooms * 2) / staff_count)`
- Faculty receive fewer duties; senior faculty receive the fewest

---

## Algorithm Overview

The scheduler is a **greedy constraint-satisfaction** algorithm with a validation pass:

1. **Setup** -- parse inputs, compute duty targets per person
2. **Pre-assign** -- place faculty pinned to specific days first
3. **Greedy fill** -- for each (day, room, slot), select the best eligible candidate using a priority score based on remaining duty budget and seniority rank
4. **Validate** -- scan the full schedule for hard constraint violations and attempt local repair
5. **Fallback** -- if repair fails, surfaces a detailed error rather than silently producing a broken schedule

---

## Contributing

Contributions are welcome. Please follow this workflow:

1. Fork the repository
2. Create a branch: `git checkout -b feat/your-feature-name`
3. Commit using [Conventional Commits](https://www.conventionalcommits.org/): `git commit -m "feat: add PDF export"`
4. Push and open a Pull Request against `main`
5. Ensure `npm run lint` passes before submitting

For significant changes, open an issue first to discuss the approach.

### Good First Issues

- [ ] PDF / CSV export of generated schedule
- [ ] Dark mode support
- [ ] Configurable seniority tiers
- [ ] Unit tests for the scheduler modules

---

## License

Distributed under the [MIT License](LICENSE).

---

## Author

**[Aditya Singh](https://x.com/singhaditya5711)** (2022UG2062)
Indian Institute of Information Technology, Ranchi

---

<div align="center">
Built for efficient exam duty management.
</div>
