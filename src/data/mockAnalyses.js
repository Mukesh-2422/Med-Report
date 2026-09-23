// Demo data — for frontend development only. Replace with GET /api/analysis/:id
export const mockAnalyses = [
  {
    id: 'AN-2024-0917',
    patientId: 'P1024',
    age: 56,
    gender: 'Male',
    examination: 'Chest X-Ray',
    date: '23 Sep 2026',
    status: 'reviewed',
    evidenceSourcesRetrieved: 3,
    entitiesDetected: 5,
    imageFileName: 'chest_xray_p1024.png',
  },
  {
    id: 'AN-2024-0918',
    patientId: 'P1025',
    age: 42,
    gender: 'Female',
    examination: 'Chest X-Ray',
    date: '23 Sep 2026',
    status: 'pending_review',
    evidenceSourcesRetrieved: 2,
    entitiesDetected: 4,
    imageFileName: 'chest_xray_p1025.png',
  },
  {
    id: 'AN-2024-0910',
    patientId: 'P1026',
    age: 67,
    gender: 'Male',
    examination: 'Chest X-Ray',
    date: '22 Sep 2026',
    status: 'reviewed',
    evidenceSourcesRetrieved: 3,
    entitiesDetected: 3,
    imageFileName: 'chest_xray_p1026.png',
  },
]

export function getAnalysisById(id) {
  return mockAnalyses.find((a) => a.id === id) || mockAnalyses[0]
}
