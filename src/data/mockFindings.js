// Demo data — for frontend development only. Replace with GET /api/analysis/:id
export const mockFindingsByAnalysis = {
  'AN-2024-0917': [
    {
      id: 'f1',
      entity: 'Cardiomegaly',
      description: 'Mild enlargement of the cardiac silhouette.',
      confidence: 0.87,
      verificationStatus: 'supported',
      evidenceStatus: 'supported',
      trail: {
        imageEvidence: { status: 'consistent', label: 'Consistent' },
        patientContext: { status: 'relevant', label: 'Relevant' },
        medicalEvidence: { status: 'retrieved', label: 'Retrieved' },
      },
      evidence: {
        source: 'Trusted Medical Reference',
        relevance: 89,
        snippet:
          'Cardiothoracic ratio exceeding 0.5 on a standard PA chest radiograph is a commonly used indicator of cardiac enlargement, and mild elevations are frequently associated with hypertensive heart disease.',
      },
    },
    {
      id: 'f2',
      entity: 'No focal consolidation',
      description: 'No focal pulmonary consolidation identified.',
      confidence: 0.93,
      verificationStatus: 'supported',
      evidenceStatus: 'supported',
      trail: {
        imageEvidence: { status: 'consistent', label: 'Consistent' },
        patientContext: { status: 'relevant', label: 'Relevant' },
        medicalEvidence: { status: 'retrieved', label: 'Retrieved' },
      },
      evidence: {
        source: 'Trusted Medical Reference',
        relevance: 82,
        snippet:
          'Absence of focal airspace opacity on chest radiography is generally used to support the exclusion of acute focal pneumonia in the appropriate clinical context.',
      },
    },
    {
      id: 'f3',
      entity: 'Pleural effusion',
      description: 'Possible small bilateral pleural effusion.',
      confidence: 0.61,
      verificationStatus: 'needs_review',
      evidenceStatus: 'uncertain',
      trail: {
        imageEvidence: { status: 'uncertain', label: 'Uncertain' },
        patientContext: { status: 'relevant', label: 'Relevant' },
        medicalEvidence: { status: 'retrieved', label: 'Retrieved' },
      },
      evidence: {
        source: 'Trusted Medical Reference',
        relevance: 74,
        snippet:
          'Blunting of the costophrenic angles can indicate small pleural effusions, though this finding can be subtle on supine or low-quality films and often warrants correlation with lateral views.',
      },
    },
  ],
}

export function getFindings(analysisId) {
  return mockFindingsByAnalysis[analysisId] || mockFindingsByAnalysis['AN-2024-0917']
}
