import { mockFindingsByAnalysis } from './mockFindings.js'

// Base Report Templates
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
      'Cardiomegaly: Cardiomegaly is present with cardiothoracic ratio exceeding 0.50 (AI Confidence: 88%, Verification Score: 89%, Status: SUPPORTED).',
      'Right Lower Lobe Consolidation: Focal alveolar consolidation with air bronchograms in the right lower lobe (AI Confidence: 92%, Verification Score: 93%, Status: SUPPORTED).',
      'Equivocal Costophrenic Blunting: Equivocal right costophrenic angle blunting; recommend lateral decubitus view or ultrasound if clinically indicated. [Clinician Note: Laterality specified after viewing right sulcus.] (Clinician Modified).',
    ],
    impression: '1. Cardiomegaly with mild cardiothoracic ratio enlargement.\n2. Right lower lobe consolidation concerning for pneumonia.\n3. Equivocal right costophrenic angle blunting — clinical correlation advised.',
    evidenceStatus: [
      { label: 'Cardiomegaly (89% match)', status: 'supported' },
      { label: 'Right Lower Lobe Consolidation (93% match)', status: 'supported' },
      { label: 'Equivocal Costophrenic Blunting (Clinician Modified)', status: 'reviewed' },
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
      'Pneumothorax: Apical visceral pleural line with absent peripheral lung markings is identified (AI Confidence: 89%, Verification Score: 90%, Status: SUPPORTED).',
      'Small bilateral pleural effusions with costophrenic angle blunting (Verification Score: 68%, Status: NEEDS CLINICIAN REVIEW).',
    ],
    impression: '1. Apical pneumothorax without tension physiology.\n2. Small bilateral pleural effusions.',
    evidenceStatus: [
      { label: 'Apical Pneumothorax (90% match)', status: 'supported' },
      { label: 'Bilateral Pleural Effusion (Needs Review)', status: 'needs_review' },
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
      'Bacterial Pneumonia: Right middle lobe dense consolidation with positive silhouette sign (AI Confidence: 94%, Verification Score: 95%, Status: SUPPORTED).',
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
  const base = mockReports.find((r) => r.id === id) || mockReports[0]
  const analysisId = base.analysisId
  const liveClaims = mockFindingsByAnalysis[analysisId]

  if (!liveClaims || liveClaims.length === 0) {
    return base
  }

  // Synthesize report incorporating live doctor decisions
  const dynamicFindings = []
  const dynamicEvidenceStatus = []
  const dynamicImpressions = []

  for (const claim of liveClaims) {
    const dec = claim.doctorDecision
    const decType = dec?.decision || 'PENDING'

    if (decType === 'REJECTED') {
      // Excluded completely from report!
      continue
    } else if (decType === 'MODIFIED') {
      const ent = dec.modified_entity || claim.entity
      const txt = dec.modified_claim || claim.claimText || claim.description
      const cmt = dec.doctor_comment ? ` [Clinician Note: ${dec.doctor_comment}]` : ''
      dynamicFindings.push(`${ent}: ${txt}${cmt} (Clinician Modified).`)
      dynamicImpressions.push(`${ent}: ${txt}`)
      dynamicEvidenceStatus.push({
        label: `${ent} (Clinician Modified)`,
        status: 'reviewed'
      })
    } else if (decType === 'CONFIRMED' || claim.verificationStatus === 'supported') {
      const scorePct = Math.round((claim.verificationScore || 0.85) * 100)
      const confPct = Math.round((claim.aiConfidence || 0.85) * 100)
      dynamicFindings.push(`${claim.entity}: ${claim.claimText || claim.description} (AI Confidence: ${confPct}%, Verification Score: ${scorePct}%, Status: SUPPORTED).`)
      dynamicImpressions.push(`${claim.entity} confirmed with radiographic criteria.`)
      dynamicEvidenceStatus.push({
        label: `${claim.entity} (${scorePct}% match)`,
        status: 'supported'
      })
    } else if (claim.verificationStatus === 'needs_review') {
      const scorePct = Math.round((claim.verificationScore || 0.60) * 100)
      dynamicFindings.push(`Possible ${claim.entity}: ${claim.claimText || claim.description} (Verification Score: ${scorePct}%, Status: NEEDS CLINICIAN REVIEW).`)
      dynamicImpressions.push(`Borderline ${claim.entity} — clinical correlation advised.`)
      dynamicEvidenceStatus.push({
        label: `${claim.entity} (Needs Review)`,
        status: 'needs_review'
      })
    } else if (claim.verificationStatus === 'insufficient_evidence') {
      dynamicFindings.push(`Ungrounded Claim (${claim.entity}): ${claim.claimText || claim.description} (Status: INSUFFICIENT EVIDENCE).`)
      dynamicEvidenceStatus.push({
        label: `${claim.entity} (Ungrounded)`,
        status: 'insufficient_evidence'
      })
    }
  }

  return {
    ...base,
    findings: dynamicFindings.length > 0 ? dynamicFindings : base.findings,
    evidenceStatus: dynamicEvidenceStatus.length > 0 ? dynamicEvidenceStatus : base.evidenceStatus,
    impression: dynamicImpressions.length > 0 
      ? dynamicImpressions.map((imp, idx) => `${idx + 1}. ${imp}`).join('\n')
      : base.impression
  }
}

export function getReportByAnalysisId(analysisId) {
  const base = mockReports.find((r) => r.analysisId === analysisId) || mockReports[0]
  return getReportById(base.id)
}
