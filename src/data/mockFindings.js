// Comprehensive Entity-Grounded Verification Dataset for MEDORA
export const mockFindingsByAnalysis = {
  'AN-2024-0917': [
    {
      id: 'f1',
      entity: 'Cardiomegaly',
      description: 'Mild enlargement of the cardiac silhouette with CTR approximately 0.54.',
      confidence: 0.88,
      aiConfidence: 0.88,
      verificationScore: 0.89,
      status: 'SUPPORTED',
      verificationStatus: 'supported',
      requiresClinicianReview: false,
      imageEvidence: {
        description: 'Transverse cardiac diameter > 50% of thoracic cavity on upright PA projection.',
        location: 'Cardiac silhouette'
      },
      clinicalContext: {
        symptoms: ['shortness of breath', 'chest pain'],
        history: ['hypertension']
      },
      verificationReason: 'The finding is consistent with available image evidence and verified against RSNA diagnostic criteria (CTR > 0.50).',
      scoringBreakdown: {
        aiConfidence: 0.88,
        evidenceRelevance: 0.94,
        evidenceAvailability: 1.0,
        contextConsistency: 0.90,
        finalScore: 0.89
      },
      trail: {
        imageEvidence: { status: 'consistent', label: 'Image Consistent', detail: 'CTR > 0.50' },
        patientContext: { status: 'relevant', label: 'History Relevant', detail: 'Hypertension & Dyspnea' },
        medicalEvidence: { status: 'retrieved', label: 'RSNA Grounded', detail: 'RSNA Level 1 Evidence' },
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
      aiConfidence: 0.92,
      verificationScore: 0.93,
      status: 'SUPPORTED',
      verificationStatus: 'supported',
      requiresClinicianReview: false,
      imageEvidence: {
        description: 'Dense alveolar opacity with visible branching air bronchograms in right lower lung zone.',
        location: 'Right lower lobe'
      },
      clinicalContext: {
        symptoms: ['productive cough', 'fever'],
        history: ['smoker']
      },
      verificationReason: 'Dense alveolar opacity with air bronchograms matches ATS/IDSA consensus guidelines for community-acquired pneumonia.',
      scoringBreakdown: {
        aiConfidence: 0.92,
        evidenceRelevance: 0.96,
        evidenceAvailability: 1.0,
        contextConsistency: 0.95,
        finalScore: 0.93
      },
      trail: {
        imageEvidence: { status: 'consistent', label: 'Image Consistent', detail: 'Air bronchogram sign' },
        patientContext: { status: 'relevant', label: 'Clinical Match', detail: 'Productive cough, fever' },
        medicalEvidence: { status: 'retrieved', label: 'ATS/IDSA Grounded', detail: 'ATS Consensus Guideline' },
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
      aiConfidence: 0.62,
      verificationScore: 0.61,
      status: 'NEEDS_REVIEW',
      verificationStatus: 'needs_review',
      requiresClinicianReview: true,
      imageEvidence: {
        description: 'Borderline lateral costophrenic sulcus haziness without classic meniscus sign.',
        location: 'Right costophrenic sulcus'
      },
      clinicalContext: {
        symptoms: ['shortness of breath'],
        history: ['mild pleuritic pain']
      },
      verificationReason: 'Upright PA radiograph requires ~175 mL fluid for definite blunting; borderline visual clarity requires clinician confirmation.',
      scoringBreakdown: {
        aiConfidence: 0.62,
        evidenceRelevance: 0.78,
        evidenceAvailability: 1.0,
        contextConsistency: 0.75,
        finalScore: 0.61
      },
      trail: {
        imageEvidence: { status: 'uncertain', label: 'Image Equivocal', detail: 'Subtle angle blunting' },
        patientContext: { status: 'relevant', label: 'Clinical Correlation', detail: 'Pleuritic discomfort' },
        medicalEvidence: { status: 'retrieved', label: 'ACR Guideline', detail: 'ACR Practice Criteria' },
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
  'AN-2024-0918': [
    {
      id: 'f4',
      entity: 'Pneumothorax',
      description: 'Apical visceral pleural line with absent peripheral bronchovascular markings.',
      confidence: 0.89,
      aiConfidence: 0.89,
      verificationScore: 0.90,
      status: 'SUPPORTED',
      verificationStatus: 'supported',
      requiresClinicianReview: false,
      imageEvidence: {
        description: 'Sharp visceral pleural white line with complete peripheral lung lucency.',
        location: 'Right apical hemithorax'
      },
      clinicalContext: {
        symptoms: ['sudden sharp chest pain', 'acute dyspnea'],
        history: []
      },
      verificationReason: 'Visceral pleural line and absent vascular markings match BTS radiological consensus guidelines.',
      scoringBreakdown: {
        aiConfidence: 0.89,
        evidenceRelevance: 0.93,
        evidenceAvailability: 1.0,
        contextConsistency: 0.95,
        finalScore: 0.90
      },
      trail: {
        imageEvidence: { status: 'consistent', label: 'Image Consistent', detail: 'Visceral pleural line' },
        patientContext: { status: 'relevant', label: 'Clinical Match', detail: 'Sudden sharp chest pain' },
        medicalEvidence: { status: 'retrieved', label: 'BTS Grounded', detail: 'BTS Pleural Guideline' },
      },
      evidence: {
        source: 'British Thoracic Society (BTS) Pleural Disease Guideline',
        pmid: 'PMID: 36725221',
        doi: '10.1136/thoraxjnl-2022-219460',
        url: 'https://pubmed.ncbi.nlm.nih.gov/36725221/',
        level: 'International Consensus',
        relevance: 93,
        snippet:
          'Identification of a thin visceral pleural line with absent peripheral lung markings confirms pneumothorax. Expiratory views may assist equivocal apical cases.',
      },
    },
    {
      id: 'f5',
      entity: 'Pleural Effusion',
      description: 'Bilateral blunting of the costophrenic angles with meniscus contour.',
      confidence: 0.71,
      aiConfidence: 0.71,
      verificationScore: 0.68,
      status: 'NEEDS_REVIEW',
      verificationStatus: 'needs_review',
      requiresClinicianReview: true,
      imageEvidence: {
        description: 'Bilateral sulcus blunting with lateral elevation.',
        location: 'Bilateral costophrenic angles'
      },
      clinicalContext: {
        symptoms: ['orthopnea', 'pedal edema'],
        history: ['congestive heart failure']
      },
      verificationReason: 'Visual features suggestive of effusion; clinician review advised to assess fluid volume.',
      scoringBreakdown: {
        aiConfidence: 0.71,
        evidenceRelevance: 0.85,
        evidenceAvailability: 1.0,
        contextConsistency: 0.90,
        finalScore: 0.68
      },
      trail: {
        imageEvidence: { status: 'uncertain', label: 'Image Suggestive', detail: 'Bilateral blunting' },
        patientContext: { status: 'relevant', label: 'Clinical Match', detail: 'Heart failure history' },
        medicalEvidence: { status: 'retrieved', label: 'ACR Grounded', detail: 'ACR Criteria' },
      },
      evidence: {
        source: 'American College of Radiology (ACR Appropriateness Criteria)',
        pmid: 'PMID: 29778216',
        doi: '10.1016/j.jacr.2018.03.018',
        url: 'https://pubmed.ncbi.nlm.nih.gov/29778216/',
        level: 'ACR Recommendation',
        relevance: 85,
        snippet:
          'Homogeneous fluid density with concave lateral meniscus is diagnostic of pleural effusion on upright chest radiography.',
      },
    },
  ],
  'AN-2024-0910': [
    {
      id: 'f6',
      entity: 'Pneumonia',
      description: 'Right middle lobe dense consolidation with loss of right heart border silhouette.',
      confidence: 0.94,
      aiConfidence: 0.94,
      verificationScore: 0.95,
      status: 'SUPPORTED',
      verificationStatus: 'supported',
      requiresClinicianReview: false,
      imageEvidence: {
        description: 'Positive silhouette sign along right heart border.',
        location: 'Right middle lobe'
      },
      clinicalContext: {
        symptoms: ['high fever', 'chills', 'productive cough'],
        history: []
      },
      verificationReason: 'Silhouette sign along right heart border confirms right middle lobe airspace disease per Fleischner criteria.',
      scoringBreakdown: {
        aiConfidence: 0.94,
        evidenceRelevance: 0.97,
        evidenceAvailability: 1.0,
        contextConsistency: 0.95,
        finalScore: 0.95
      },
      trail: {
        imageEvidence: { status: 'consistent', label: 'Image Consistent', detail: 'Silhouette sign' },
        patientContext: { status: 'relevant', label: 'Clinical Match', detail: 'High fever, leukocytosis' },
        medicalEvidence: { status: 'retrieved', label: 'Fleischner Grounded', detail: 'Fleischner Society' },
      },
      evidence: {
        source: 'Fleischner Society Glossary of Terms for Thoracic Imaging',
        pmid: 'PMID: 29778216',
        doi: '10.1148/radiol.2018172658',
        url: 'https://pubmed.ncbi.nlm.nih.gov/29778216/',
        level: 'Fleischner Society Standard',
        relevance: 97,
        snippet:
          'Loss of anatomical silhouette occurs when adjacent pulmonary tissue has increased attenuation equal to the cardiac structure.',
      },
    },
  ]
}

export function getFindings(analysisId) {
  return mockFindingsByAnalysis[analysisId] || mockFindingsByAnalysis['AN-2024-0917']
}
