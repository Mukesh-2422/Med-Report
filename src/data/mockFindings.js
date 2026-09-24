// Comprehensive Claim-Level Verification and Doctor Feedback Mock Dataset
export const mockFindingsByAnalysis = {
  'AN-2024-0917': [
    {
      id: 'clm_1',
      entity: 'Cardiomegaly',
      claimText: 'Cardiomegaly is present with cardiothoracic ratio exceeding 0.50.',
      description: 'Mild enlargement of the cardiac silhouette with CTR approximately 0.54.',
      confidence: 0.88,
      aiConfidence: 0.88,
      verificationScore: 0.89,
      status: 'SUPPORTED',
      verificationStatus: 'supported',
      requiresClinicianReview: false,
      rag_query: 'Cardiomegaly Chest X-ray radiographic criteria cardiothoracic ratio > 0.50',
      imageEvidence: {
        description: 'Transverse cardiac diameter > 50% of thoracic cavity on upright PA projection.',
        location: 'Cardiac silhouette'
      },
      clinicalContext: {
        symptoms: ['shortness of breath', 'chest pain'],
        history: ['hypertension']
      },
      verificationReason: 'The claim is consistent with available image evidence and verified against RSNA diagnostic criteria (CTR > 0.50).',
      doctorDecision: {
        claim_id: 'clm_1',
        doctor_id: 'Dr. Mukesh',
        decision: 'CONFIRMED',
        original_ai_claim: 'Cardiomegaly is present with cardiothoracic ratio exceeding 0.50.',
        modified_claim: null,
        modified_entity: null,
        doctor_comment: 'CTR verified on PA projection (~0.54). Agreed with AI claim.',
        timestamp: '2026-09-24 11:20:00'
      },
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
        page: 4,
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
      id: 'clm_2',
      entity: 'Right Lower Lobe Consolidation',
      claimText: 'Focal alveolar consolidation with air bronchograms in the right lower lobe.',
      description: 'Focal alveolar consolidation with air bronchograms in the right basilar region.',
      confidence: 0.92,
      aiConfidence: 0.92,
      verificationScore: 0.93,
      status: 'SUPPORTED',
      verificationStatus: 'supported',
      requiresClinicianReview: false,
      rag_query: 'Consolidation Chest X-ray alveolar opacity air bronchogram right lower lobe',
      imageEvidence: {
        description: 'Dense alveolar opacity with visible branching air bronchograms in right lower lung zone.',
        location: 'Right lower lobe'
      },
      clinicalContext: {
        symptoms: ['productive cough', 'fever'],
        history: ['smoker']
      },
      verificationReason: 'Dense alveolar opacity with air bronchograms matches ATS/IDSA consensus guidelines for community-acquired pneumonia.',
      doctorDecision: {
        claim_id: 'clm_2',
        doctor_id: 'Dr. Mukesh',
        decision: 'CONFIRMED',
        original_ai_claim: 'Focal alveolar consolidation with air bronchograms in the right lower lobe.',
        modified_claim: null,
        modified_entity: null,
        doctor_comment: 'Classic air bronchogram sign visible in right basilar zone.',
        timestamp: '2026-09-24 11:21:00'
      },
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
        page: 6,
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
      id: 'clm_3',
      entity: 'Trace Pleural Effusion',
      claimText: 'Subtle blunting of the right costophrenic angle suggesting trace pleural effusion.',
      description: 'Possible subtle blunting of the right costophrenic angle.',
      confidence: 0.62,
      aiConfidence: 0.62,
      verificationScore: 0.61,
      status: 'NEEDS_REVIEW',
      verificationStatus: 'needs_review',
      requiresClinicianReview: true,
      rag_query: 'Pleural effusion costophrenic angle blunting fluid meniscus criteria',
      imageEvidence: {
        description: 'Borderline lateral costophrenic sulcus haziness without classic meniscus sign.',
        location: 'Right costophrenic sulcus'
      },
      clinicalContext: {
        symptoms: ['shortness of breath'],
        history: ['mild pleuritic pain']
      },
      verificationReason: 'Upright PA radiograph requires ~175 mL fluid for definite blunting; borderline visual clarity requires clinician confirmation.',
      doctorDecision: {
        claim_id: 'clm_3',
        doctor_id: 'Dr. Mukesh',
        decision: 'MODIFIED',
        original_ai_claim: 'Subtle blunting of the right costophrenic angle suggesting trace pleural effusion.',
        modified_claim: 'Equivocal right costophrenic angle blunting; recommend lateral decubitus view or ultrasound if clinically indicated.',
        modified_entity: 'Equivocal Costophrenic Blunting',
        doctor_comment: 'Sulcus obliteration is borderline (<100mL). Clarified recommendation for lateral decubitus view.',
        timestamp: '2026-09-24 11:22:15'
      },
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
        page: 2,
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
      id: 'clm_4',
      entity: 'Pneumothorax',
      claimText: 'Apical visceral pleural line with absent peripheral lung markings is identified.',
      description: 'Apical visceral pleural line with absent peripheral bronchovascular markings.',
      confidence: 0.89,
      aiConfidence: 0.89,
      verificationScore: 0.90,
      status: 'SUPPORTED',
      verificationStatus: 'supported',
      requiresClinicianReview: false,
      rag_query: 'Pneumothorax visceral pleural line peripheral lung markings BTS',
      imageEvidence: {
        description: 'Sharp visceral pleural white line with complete peripheral lung lucency.',
        location: 'Right apical hemithorax'
      },
      clinicalContext: {
        symptoms: ['sudden sharp chest pain', 'acute dyspnea'],
        history: []
      },
      verificationReason: 'Visceral pleural line and absent vascular markings match BTS radiological consensus guidelines.',
      doctorDecision: {
        claim_id: 'clm_4',
        doctor_id: 'Dr. Mukesh',
        decision: 'CONFIRMED',
        original_ai_claim: 'Apical visceral pleural line with absent peripheral lung markings is identified.',
        modified_claim: null,
        modified_entity: null,
        doctor_comment: 'Thin apical pleural line confirmed without tension physiology.',
        timestamp: '2026-09-24 11:23:00'
      },
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
        page: 5,
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
      id: 'clm_5',
      entity: 'Bilateral Pleural Effusion',
      claimText: 'Small bilateral pleural effusions with costophrenic angle blunting.',
      description: 'Bilateral blunting of the costophrenic angles with meniscus contour.',
      confidence: 0.71,
      aiConfidence: 0.71,
      verificationScore: 0.68,
      status: 'NEEDS_REVIEW',
      verificationStatus: 'needs_review',
      requiresClinicianReview: true,
      rag_query: 'Bilateral pleural effusion meniscus sign heart failure orthopnea',
      imageEvidence: {
        description: 'Bilateral sulcus blunting with lateral elevation.',
        location: 'Bilateral costophrenic angles'
      },
      clinicalContext: {
        symptoms: ['orthopnea', 'pedal edema'],
        history: ['congestive heart failure']
      },
      verificationReason: 'Visual features suggestive of effusion; clinician review advised to assess fluid volume.',
      doctorDecision: {
        claim_id: 'clm_5',
        doctor_id: 'Dr. Mukesh',
        decision: 'PENDING',
        original_ai_claim: 'Small bilateral pleural effusions with costophrenic angle blunting.',
        modified_claim: null,
        modified_entity: null,
        doctor_comment: null,
        timestamp: null
      },
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
        page: 3,
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
}

export function getFindings(analysisId) {
  return mockFindingsByAnalysis[analysisId] || mockFindingsByAnalysis['AN-2024-0917']
}

export function updateFindingDoctorDecision(analysisId, claimId, payload) {
  const list = getFindings(analysisId)
  const item = list.find((c) => c.id === claimId)
  if (item) {
    item.doctorDecision = {
      claim_id: claimId,
      doctor_id: payload.doctor_id || 'Dr. Mukesh',
      decision: payload.decision,
      original_ai_claim: item.claimText || item.description,
      modified_claim: payload.modified_claim || null,
      modified_entity: payload.modified_entity || null,
      doctor_comment: payload.doctor_comment || null,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    }
    return item
  }
  return null
}

export function getMockReviewSummary(analysisId) {
  const claims = getFindings(analysisId)
  const total = claims.length
  const supported = claims.filter((c) => c.verificationStatus === 'supported').length
  const needs_review = claims.filter((c) => c.verificationStatus === 'needs_review').length
  const insufficient = claims.filter((c) => c.verificationStatus === 'insufficient_evidence').length

  const confirmed = claims.filter((c) => c.doctorDecision?.decision === 'CONFIRMED').length
  const modified = claims.filter((c) => c.doctorDecision?.decision === 'MODIFIED').length
  const rejected = claims.filter((c) => c.doctorDecision?.decision === 'REJECTED').length
  const pending = claims.filter((c) => !c.doctorDecision || c.doctorDecision?.decision === 'PENDING' || c.doctorDecision?.decision === 'NEEDS_FURTHER_REVIEW').length

  const decidedTotal = confirmed + modified + rejected
  const correction_rate = decidedTotal > 0 ? Number(((modified + rejected) / decidedTotal).toFixed(2)) : 0.0

  return {
    analysis_id: analysisId,
    total_claims: total,
    supported_claims: supported,
    needs_review_claims: needs_review,
    insufficient_evidence_claims: insufficient,
    doctor_confirmed_claims: confirmed,
    doctor_modified_claims: modified,
    doctor_rejected_claims: rejected,
    pending_review_claims: pending,
    unsupported_claim_rate: total > 0 ? Number((insufficient / total).toFixed(2)) : 0.0,
    clinician_correction_rate: correction_rate,
    evidence_retrieval_relevance_avg: 0.91
  }
}

export function getMockAuditTrail(analysisId) {
  return [
    {
      id: 'aud_1',
      analysis_id: analysisId,
      event_type: 'IMAGE_UPLOADED',
      description: 'Medical image chest_xray_p1024.png ingested and preprocessed',
      actor: 'CLINICIAN',
      timestamp: '2026-09-24 11:15:02'
    },
    {
      id: 'aud_2',
      analysis_id: analysisId,
      event_type: 'AI_ANALYSIS_STARTED',
      description: 'Multimodal vision transformer feature extraction and zone segmentation',
      actor: 'AI_SYSTEM',
      timestamp: '2026-09-24 11:15:04'
    },
    {
      id: 'aud_3',
      analysis_id: analysisId,
      event_type: 'CLAIMS_EXTRACTED',
      description: 'Extracted 3 atomic clinical statements from visual feature tokens',
      actor: 'AI_SYSTEM',
      timestamp: '2026-09-24 11:15:06'
    },
    {
      id: 'aud_4',
      analysis_id: analysisId,
      event_type: 'RAG_QUERY_GENERATED',
      description: 'Formulated clinical queries across RSNA, ATS, and ACR guideline ontologies',
      actor: 'AI_SYSTEM',
      timestamp: '2026-09-24 11:15:07'
    },
    {
      id: 'aud_5',
      analysis_id: analysisId,
      event_type: 'EVIDENCE_RETRIEVED',
      description: 'Retrieved 3 authoritative evidence references with average relevance 91%',
      actor: 'AI_SYSTEM',
      timestamp: '2026-09-24 11:15:08'
    },
    {
      id: 'aud_6',
      analysis_id: analysisId,
      event_type: 'CLAIM_VERIFIED',
      description: 'Entity-grounded verification completed (2 SUPPORTED, 1 NEEDS_REVIEW)',
      actor: 'AI_SYSTEM',
      timestamp: '2026-09-24 11:15:09'
    },
    {
      id: 'aud_7',
      analysis_id: analysisId,
      event_type: 'DOCTOR_DECISION_SUBMITTED',
      description: 'Clinician reviewed and updated claim decisions (2 Confirmed, 1 Modified)',
      actor: 'Dr. Mukesh',
      timestamp: '2026-09-24 11:22:15'
    }
  ]
}
