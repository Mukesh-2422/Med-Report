// Demo data — for frontend development only. Replace with GET /api/reports
export const mockReports = [
  {
    id: 'R-1024-A',
    analysisId: 'AN-2024-0917',
    patientId: 'P1024',
    age: 56,
    gender: 'Male',
    examination: 'Chest X-Ray',
    date: '23 Sep 2026',
    status: 'approved',
    reviewedBy: 'Dr. Mukesh',
    reviewedDate: '23 September 2026',
    clinicalHistory: 'Chest pain and shortness of breath. History of hypertension.',
    findings: [
      'Mild enlargement of the cardiac silhouette.',
      'No focal pulmonary consolidation identified.',
      'No pleural effusion identified.',
    ],
    impression: 'Mild cardiomegaly.',
    evidenceStatus: [
      { label: 'Cardiomegaly', status: 'supported' },
      { label: 'No consolidation', status: 'supported' },
      { label: 'No effusion', status: 'supported' },
    ],
  },
  {
    id: 'R-1025-A',
    analysisId: 'AN-2024-0918',
    patientId: 'P1025',
    age: 42,
    gender: 'Female',
    examination: 'Chest X-Ray',
    date: '23 Sep 2026',
    status: 'pending_review',
    reviewedBy: null,
    reviewedDate: null,
    clinicalHistory: 'Persistent cough for three weeks. No prior respiratory conditions.',
    findings: [
      'No focal pulmonary consolidation identified.',
      'Possible small bilateral pleural effusion.',
      'Cardiac silhouette within normal limits.',
    ],
    impression: 'Findings suggestive of small bilateral pleural effusion — clinical correlation advised.',
    evidenceStatus: [
      { label: 'No consolidation', status: 'supported' },
      { label: 'Pleural effusion', status: 'needs_review' },
      { label: 'Cardiac silhouette', status: 'supported' },
    ],
  },
  {
    id: 'R-1026-A',
    analysisId: 'AN-2024-0910',
    patientId: 'P1026',
    age: 67,
    gender: 'Male',
    examination: 'Chest X-Ray',
    date: '22 Sep 2026',
    status: 'approved',
    reviewedBy: 'Dr. Mukesh',
    reviewedDate: '22 September 2026',
    clinicalHistory: 'Known COPD. Presenting for routine follow-up imaging.',
    findings: [
      'Hyperinflated lung fields consistent with known COPD.',
      'No focal consolidation or effusion.',
      'Cardiac silhouette within normal limits.',
    ],
    impression: 'Stable chronic obstructive changes. No acute findings.',
    evidenceStatus: [
      { label: 'Hyperinflation', status: 'supported' },
      { label: 'No consolidation', status: 'supported' },
      { label: 'Cardiac silhouette', status: 'supported' },
    ],
  },
]

export function getReportById(id) {
  return mockReports.find((r) => r.id === id)
}

export function getReportByAnalysisId(analysisId) {
  return mockReports.find((r) => r.analysisId === analysisId)
}
