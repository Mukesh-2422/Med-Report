// Comprehensive Clinical Evidence Dataset for MEDORA RAG & Verification
export const mockFindingsByAnalysis = {
  'AN-2024-0917': [
    {
      id: 'f1',
      entity: 'Cardiomegaly',
      description: 'Mild enlargement of the cardiac silhouette with CTR approximately 0.54.',
      confidence: 0.88,
      verificationStatus: 'supported',
      evidenceStatus: 'supported',
      imageEvidence: 'Transverse cardiac diameter > 50% of thoracic cavity on upright PA projection.',
      reason: 'The detected finding is consistent with the retrieved RSNA radiographic reference standards.',
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
      verificationStatus: 'supported',
      evidenceStatus: 'supported',
      imageEvidence: 'Branching dark tubular air-filled bronchi surrounded by dense opacified alveoli.',
      reason: 'Dense alveolar opacity with air bronchograms matches ATS/IDSA diagnostic criteria for pneumonia.',
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
      verificationStatus: 'needs_review',
      evidenceStatus: 'needs_review',
      imageEvidence: 'Borderline lateral sulcus obliteration without classic meniscus sign.',
      reason: 'Upright PA radiograph requires ~175 mL fluid for definite blunting; borderline visual clarity requires clinician confirmation.',
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
      verificationStatus: 'supported',
      evidenceStatus: 'supported',
      imageEvidence: 'Sharp visceral pleural white line with complete peripheral lucency.',
      reason: 'Visceral pleural line matches BTS radiological consensus guidelines.',
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
      entity: 'Bilateral Pleural Effusion',
      description: 'Blunting of bilateral costophrenic sulci with meniscus sign.',
      confidence: 0.91,
      verificationStatus: 'supported',
      evidenceStatus: 'supported',
      imageEvidence: 'Concave upward meniscus tracking along lateral chest walls.',
      reason: 'Classic meniscus sign and bilateral costophrenic obliteration support pleural effusion.',
      trail: {
        imageEvidence: { status: 'consistent', label: 'Image Consistent', detail: 'Meniscus sign visible' },
        patientContext: { status: 'relevant', label: 'Clinical Match', detail: 'Orthopnea, pedal edema' },
        medicalEvidence: { status: 'retrieved', label: 'ACR Grounded', detail: 'ACR Criteria' },
      },
      evidence: {
        source: 'American College of Radiology (ACR Appropriateness Criteria)',
        pmid: 'PMID: 29778216',
        doi: '10.1016/j.jacr.2018.03.018',
        url: 'https://pubmed.ncbi.nlm.nih.gov/29778216/',
        level: 'ACR Recommendation',
        relevance: 95,
        snippet:
          'Homogeneous fluid density with concave lateral meniscus is diagnostic of pleural effusion on upright chest radiography.',
      },
    },
  ],
  'AN-2024-0910': [
    {
      id: 'f6',
      entity: 'Bacterial Pneumonia',
      description: 'Right middle lobe dense consolidation with positive silhouette sign along right heart border.',
      confidence: 0.94,
      verificationStatus: 'supported',
      evidenceStatus: 'supported',
      imageEvidence: 'Loss of right cardiac border contour due to adjacent dense airspace opacity.',
      reason: 'Silhouette sign along right heart border confirms right middle lobe airspace involvement.',
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
