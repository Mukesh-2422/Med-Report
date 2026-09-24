// Clinical Report Datasets for MEDORA with Grounded RAG Verifications
export const mockReports = [
  {
    id: 'R-1024-A',
    analysisId: 'AN-2024-0917',
    patientId: 'P1024',
    age: 56,
    gender: 'Male',
    examination: 'Chest X-Ray',
    date: '23 Sep 2026',
    status: 'pending_review',
    reviewedBy: null,
    reviewedDate: null,
    clinicalHistory: 'Chest pain and shortness of breath. History of hypertension.',
    findings: [
      'Cardiomegaly: Mild enlargement of the cardiac silhouette with CTR approximately 0.54 (AI Confidence: 88%, Verified: SUPPORTED).',
      'Right Lower Lobe Consolidation: Focal alveolar consolidation with air bronchograms in the right basilar region (AI Confidence: 92%, Verified: SUPPORTED).',
      'Trace Pleural Effusion: Possible subtle blunting of the right costophrenic angle (AI Confidence: 62%, Verified: NEEDS CLINICIAN REVIEW).',
    ],
    impression: '1. Cardiomegaly with mild cardiothoracic ratio enlargement.\n2. Right lower lobe consolidation concerning for pneumonia.\n3. Trace right pleural effusion requiring clinical correlation.',
    evidenceStatus: [
      { label: 'Cardiomegaly (CTR > 0.50)', status: 'supported' },
      { label: 'Right Basilar Consolidation', status: 'supported' },
      { label: 'Trace Pleural Effusion', status: 'needs_review' },
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
    clinicalHistory: 'Sudden onset chest pain and dyspnea.',
    findings: [
      'Pneumothorax: Apical visceral pleural line with absent peripheral lung markings (AI Confidence: 89%, Verified: SUPPORTED).',
      'Small bilateral pleural effusions with blunted costophrenic angles (AI Confidence: 91%, Verified: SUPPORTED).',
      'No focal consolidation or mediastinal shift.',
    ],
    impression: '1. Apical pneumothorax without tension physiology.\n2. Bilateral small pleural effusions.',
    evidenceStatus: [
      { label: 'Apical Pneumothorax', status: 'supported' },
      { label: 'Bilateral Pleural Effusion', status: 'supported' },
      { label: 'No Consolidation', status: 'supported' },
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
    clinicalHistory: 'Fever and productive cough for four days.',
    findings: [
      'Bacterial Pneumonia: Right middle lobe dense consolidation with positive silhouette sign (AI Confidence: 94%, Verified: SUPPORTED).',
      'Cardiac silhouette within normal physiological limits.',
      'Clear pleural costophrenic angles bilaterally.',
    ],
    impression: 'Right middle lobe pneumonia. Recommended antibiotic therapy and follow-up imaging in 6 weeks.',
    evidenceStatus: [
      { label: 'Right Middle Lobe Pneumonia', status: 'supported' },
      { label: 'Cardiac Silhouette Normal', status: 'supported' },
      { label: 'No Pleural Effusion', status: 'supported' },
    ],
  },
]

export function getReportById(id) {
  return mockReports.find((r) => r.id === id) || mockReports[0]
}

export function getReportByAnalysisId(analysisId) {
  return mockReports.find((r) => r.analysisId === analysisId) || mockReports[0]
}
