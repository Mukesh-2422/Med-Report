// Demo data — for frontend development only. Replace with GET /api/patients
export const mockPatients = [
  {
    id: 'P1024',
    age: 56,
    gender: 'Male',
    lastAnalysis: '23 Sep 2026',
    reportsCount: 4,
    clinicalHistory: 'Chest pain and shortness of breath. History of hypertension, managed with lisinopril.',
    timeline: [
      { date: '23 Sep 2026', exam: 'Chest X-Ray', status: 'approved' },
      { date: '18 Sep 2026', exam: 'Chest X-Ray', status: 'approved' },
      { date: '02 Aug 2026', exam: 'Chest X-Ray', status: 'approved' },
      { date: '11 Jun 2026', exam: 'Chest X-Ray', status: 'approved' },
    ],
  },
  {
    id: 'P1025',
    age: 42,
    gender: 'Female',
    lastAnalysis: '23 Sep 2026',
    reportsCount: 2,
    clinicalHistory: 'Persistent cough for three weeks. No prior respiratory conditions.',
    timeline: [
      { date: '23 Sep 2026', exam: 'Chest X-Ray', status: 'pending' },
      { date: '30 Jul 2026', exam: 'Chest X-Ray', status: 'approved' },
    ],
  },
  {
    id: 'P1026',
    age: 67,
    gender: 'Male',
    lastAnalysis: '22 Sep 2026',
    reportsCount: 6,
    clinicalHistory: 'Known COPD. Presenting for routine follow-up imaging.',
    timeline: [
      { date: '22 Sep 2026', exam: 'Chest X-Ray', status: 'approved' },
      { date: '15 Aug 2026', exam: 'Chest X-Ray', status: 'approved' },
    ],
  },
  {
    id: 'P1027',
    age: 34,
    gender: 'Female',
    lastAnalysis: '21 Sep 2026',
    reportsCount: 1,
    clinicalHistory: 'First presentation. Mild fever and chest tightness.',
    timeline: [{ date: '21 Sep 2026', exam: 'Chest X-Ray', status: 'pending' }],
  },
  {
    id: 'P1028',
    age: 71,
    gender: 'Male',
    lastAnalysis: '19 Sep 2026',
    reportsCount: 3,
    clinicalHistory: 'History of smoking. Referred for evaluation of chronic cough.',
    timeline: [{ date: '19 Sep 2026', exam: 'Chest X-Ray', status: 'approved' }],
  },
]

export function getPatientById(id) {
  return mockPatients.find((p) => p.id === id)
}
