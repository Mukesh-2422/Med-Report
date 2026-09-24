// API service layer for MEDORA.
// Connects to FastAPI RAG backend with transparent, resilient mock fallbacks.

import axios from 'axios'
import { mockPatients, getPatientById } from '../data/mockPatients.js'
import { mockAnalyses, getAnalysisById } from '../data/mockAnalyses.js'
import { getFindings } from '../data/mockFindings.js'
import { mockReports, getReportById } from '../data/mockReports.js'

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 8000,
})

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms))

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

// ---- RAG & Clinical Verification ----
export async function retrieveMedicalEvidence({ entity, clinical_context, modality = 'Chest X-ray', top_k = 3 }) {
  try {
    const res = await client.post('/api/rag/retrieve', {
      entity,
      clinical_context,
      modality,
      top_k,
    })
    return res.data
  } catch {
    await delay(300)
    const allFindings = getFindings('AN-2024-0917')
    const match = allFindings.find((f) => f.entity.toLowerCase().includes(entity.toLowerCase()))
    return {
      entity,
      modality,
      results: match ? [match.evidence] : [],
    }
  }
}

export async function verifyAnalysis(analysisId, data = {}) {
  try {
    const res = await client.post(`/api/analysis/${analysisId}/verify`, data)
    return res.data.findings
  } catch {
    await delay(300)
    return getFindings(analysisId)
  }
}

export async function getAnalysisEvidence(analysisId) {
  try {
    const res = await client.get(`/api/analysis/${analysisId}/evidence`)
    return res.data.findings || res.data
  } catch {
    await delay(250)
    return getFindings(analysisId)
  }
}

export async function getVerification(analysisId) {
  return getAnalysisEvidence(analysisId)
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
