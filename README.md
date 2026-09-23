# MEDORA — Clinical Intelligence

Frontend for "Agentic Multimodal RAG with Entity-Grounded Clinical Verification
for Automated Medical Report Generation" (final-year project).

MEDORA is an **AI-assisted** clinical reporting workspace: it analyzes medical
images, retrieves supporting evidence, verifies findings against that
evidence, and drafts a report for a clinician to review, edit, and approve.
It does not diagnose autonomously — every report is labelled
**AI DRAFT — PENDING CLINICIAN REVIEW** until a doctor approves it.

## Stack

React 18 · Vite · Tailwind CSS · React Router · Axios (service layer) ·
Lucide React icons.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL. Sign in with the demo account:

- Email: `doctor@medora.ai`
- Password: `demo123`

## Project structure

```
src/
  components/   Reusable UI: Layout, Sidebar, Topbar, Button, Input, Modal,
                StatusBadge, tables, ImageUploader/Viewer, FindingCard,
                VerificationCard, EvidenceCard, ProgressPipeline,
                ReportViewer/Editor, Toast, EmptyState, LoadingState, etc.
  pages/        One file per route (Login, Dashboard, NewAnalysis,
                AnalysisProcessing, AnalysisResult, Verification,
                ReportReview, ReportsHistory, Patients, PatientDetails,
                Settings).
  context/      AuthContext (mock session auth) and ToastContext.
  data/         Centralized mock data (mockPatients, mockAnalyses,
                mockFindings, mockReports) — nothing is hardcoded in
                components.
  services/api.js   Every backend call the app will ever need
                     (login, getPatients, createAnalysis, getVerification,
                     getReports, updateReport, approveReport,
                     downloadReport, ...), currently backed by mock data
                     with a simulated network delay.
```

## Connecting the real FastAPI backend later

Everything the app does goes through `src/services/api.js`. To go live:

1. Set `VITE_API_BASE_URL` (e.g. in a `.env` file) to your FastAPI base URL.
2. Replace each function body in `api.js` with the matching Axios call, e.g.:

   ```js
   export async function getReports() {
     return client.get('/reports').then((r) => r.data)
   }
   ```

3. No page or component needs to change — they only ever call the functions
   exported from `api.js`.

Expected backend routes (from the original spec):

```
POST /api/auth/login
POST /api/patients
GET  /api/patients
POST /api/analysis
GET  /api/analysis/:id
GET  /api/analysis/:id/verification
GET  /api/reports
GET  /api/reports/:id
PUT  /api/reports/:id
POST /api/reports/:id/approve
GET  /api/reports/:id/pdf
```

## Notes on scope

- The uploaded medical image itself is not analyzed — this is a frontend-only
  demo with dummy data, matching the assignment brief.
- "Report Review" and "Report Details" share one page/route (`/reports/:id`):
  opening a report from history or continuing from an analysis lands on the
  same review workspace, since the two flows need the same information and
  actions (view, edit, approve, export).
- PDF export is a simulated action (shows a confirmation toast) — wire it to
  `GET /api/reports/:id/pdf` when the backend is ready.
