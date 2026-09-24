// API service layer for MEDORA.
// Connects to FastAPI RAG backend with transparent, resilient mock fallbacks.

import axios from 'axios'
import { mockPatients, getPatientById } from '../data/mockPatients.js'
import { mockAnalyses, getAnalysisById } from '../data/mockAnalyses.js'
import { getFindings, updateFindingDoctorDecision, getMockReviewSummary, getMockAuditTrail } from '../data/mockFindings.js'
import { mockReports, getReportById } from '../data/mockReports.js'

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 8000,
})

const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms))

// ---- Auth ----
export async function login(email, password) {
  try {
    const res = await client.post('/api/auth/login', { email, password })
    return res.data
  } catch {
    await delay(300)
    if (email === 'doctor@medora.ai' && password === 'demo123') {
      return { name: 'Dr. Mukesh', email, specialty: 'Radiology & Internal Medicine' }
    }
    throw new Error('Invalid credentials')
  }
}

// ---- Patients ----
export async function getPatients() {
  try {
    const res = await client.get('/api/patients')
    return res.data
  } catch {
    await delay(200)
    return mockPatients
  }
}

export async function getPatient(id) {
  try {
    const res = await client.get(`/api/patients/${id}`)
    return res.data
  } catch {
    await delay(200)
    return getPatientById(id)
  }
}

export async function createPatient(payload) {
  try {
    const res = await client.post('/api/patients', payload)
    return res.data
  } catch {
    await delay(300)
    return { ...payload, id: `P${Math.floor(1000 + Math.random() * 9000)}` }
  }
}

// ---- Analysis ----
export async function createAnalysis(payload) {
  try {
    const res = await client.post('/api/analysis', payload)
    return res.data
  } catch {
    await delay(350)
    return { id: `AN-2024-${Math.floor(1000 + Math.random() * 9000)}`, ...payload }
  }
}

export async function getAnalysis(id) {
  try {
    const res = await client.get(`/api/analysis/${id}`)
    return res.data
  } catch {
    await delay(200)
    return getAnalysisById(id)
  }
}

// ---- Claim-Level Verification & Traceability ----
export async function getClaims(analysisId = 'AN-2024-0917') {
  try {
    const res = await client.get(`/api/analysis/${analysisId}/claims`)
    return res.data
  } catch {
    await delay(250)
    return getFindings(analysisId)
  }
}

export async function getClaimEvidence(claimId, analysisId = 'AN-2024-0917') {
  try {
    const res = await client.get(`/api/claims/${claimId}/evidence?analysis_id=${analysisId}`)
    return res.data
  } catch {
    await delay(200)
    const claims = getFindings(analysisId)
    return claims.find((c) => c.id === claimId) || claims[0]
  }
}

export async function verifyClaim(data) {
  try {
    const res = await client.post(`/api/claims/${data.claimId || 'clm_1'}/verify`, null, { params: data })
    return res.data
  } catch {
    await delay(250)
    return data
  }
}

// ---- Doctor Feedback Loop ----
export async function submitDoctorDecision(claimId, decisionPayload, analysisId = 'AN-2024-0917') {
  try {
    const res = await client.post(`/api/claims/${claimId}/doctor-decision?analysis_id=${analysisId}`, decisionPayload)
    return res.data
  } catch {
    await delay(250)
    return updateFindingDoctorDecision(analysisId, claimId, decisionPayload)
  }
}

export async function getReviewSummary(analysisId = 'AN-2024-0917') {
  try {
    const res = await client.get(`/api/analysis/${analysisId}/review-summary`)
    return res.data
  } catch {
    await delay(150)
    return getMockReviewSummary(analysisId)
  }
}

export async function getAuditTrail(analysisId = 'AN-2024-0917') {
  try {
    const res = await client.get(`/api/analysis/${analysisId}/audit-trail`)
    return res.data
  } catch {
    await delay(150)
    return getMockAuditTrail(analysisId)
  }
}

// Legacy Verification Support
export async function getVerification(analysisId) {
  return getClaims(analysisId)
}

// ---- Reports ----
export async function getReports() {
  try {
    const res = await client.get('/api/reports')
    return res.data
  } catch {
    await delay(200)
    return mockReports
  }
}

export async function getReport(id) {
  try {
    const res = await client.get(`/api/reports/${id}`)
    return res.data
  } catch {
    await delay(200)
    return getReportById(id)
  }
}

export async function updateReport(id, updates) {
  try {
    const res = await client.put(`/api/reports/${id}`, updates)
    return res.data
  } catch {
    await delay(200)
    return { ...getReportById(id), ...updates }
  }
}

export async function approveReport(id, reviewer = 'Dr. Mukesh') {
  try {
    const res = await client.post(`/api/reports/${id}/approve`, { reviewer })
    return res.data
  } catch {
    await delay(300)
    return {
      ...getReportById(id),
      status: 'approved',
      reviewedBy: reviewer,
      reviewedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
    }
  }
}

export async function downloadReport(id) {
  try {
    const res = await client.get(`/api/reports/${id}/pdf`)
    return res.data
  } catch {
    await delay(200)
    return { url: `#report-${id}.pdf` }
  }
}
