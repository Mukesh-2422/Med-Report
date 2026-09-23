export const mockFindingsByAnalysis = {
  'AN-2024-0917': [
    {
      id: 'f1',
      entity: 'Cardiomegaly',
      description: 'Mild enlargement of the cardiac silhouette with CTR approximately 0.54.',
      confidence: 0.88,
      verificationStatus: 'supported',
      evidenceStatus: 'supported',
      trail: {
        imageEvidence: { status: 'consistent', label: 'Image Consistent' },
        patientContext: { status: 'relevant', label: 'History Relevant' },
        medicalEvidence: { status: 'retrieved', label: 'PubMed Grounded' },
      },
      evidence: {
        source: 'Radiology / RSNA Diagnostic Guidelines',
        pmid: 'PMID: 31855142',
        doi: '10.1148/radiol.2019191024',
        url: 'https://pubmed.ncbi.nlm.nih.gov/31855142/',
        level: 'Level 1 Diagnostic Evidence',
        relevance: 94,
        snippet:
          'Cardiothoracic ratio (CTR) exceeding 0.50 on posteroanterior radiography correlates with echocardiographic left ventricular enlargement with 86% sensitivity.',
      },
    },
    {
      id: 'f2',
      entity: 'Right Lower Lobe Consolidation',
      description: 'Focal alveolar consolidation with air bronchograms in the right basilar region.',
      confidence: 0.92,
      verificationStatus: 'supported',
      evidenceStatus: 'supported',
      trail: {
        imageEvidence: { status: 'consistent', label: 'Image Consistent' },
        patientContext: { status: 'relevant', label: 'Clinical Match' },
        medicalEvidence: { status: 'retrieved', label: 'PubMed Grounded' },
      },
      evidence: {
        source: 'American Thoracic Society & IDSA Consensus',
        pmid: 'PMID: 31573350',
        doi: '10.1164/rccm.201908-1581ST',
        url: 'https://pubmed.ncbi.nlm.nih.gov/31573350/',
        level: 'Clinical Practice Guideline',
        relevance: 96,
        snippet:
          'Demonstration of an infiltrative opacity on chest radiography remains the diagnostic standard for community-acquired pneumonia in adult presentations.',
      },
    },
    {
      id: 'f3',
      entity: 'Trace Pleural Effusion',
      description: 'Possible subtle blunting of the right costophrenic angle.',
      confidence: 0.62,
      verificationStatus: 'needs_review',
      evidenceStatus: 'uncertain',
      trail: {
        imageEvidence: { status: 'uncertain', label: 'Image Equivocal' },
        patientContext: { status: 'relevant', label: 'Clinical Correlation' },
        medicalEvidence: { status: 'retrieved', label: 'ACR Guideline' },
      },
      evidence: {
        source: 'American College of Radiology (ACR Appropriateness Criteria)',
        pmid: 'PMID: 29778216',
        doi: '10.1016/j.jacr.2018.03.018',
        url: 'https://pubmed.ncbi.nlm.nih.gov/29778216/',
        level: 'ACR Recommendation',
        relevance: 78,
        snippet:
          'Upright PA view requires ~175 mL of fluid for definite costophrenic angle blunting. Lateral decubitus or thoracic ultrasound is recommended if clinically suspected.',
      },
    },
  ],
}

export function getFindings(analysisId) {
  return mockFindingsByAnalysis[analysisId] || mockFindingsByAnalysis['AN-2024-0917']
}
