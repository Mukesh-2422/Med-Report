// API service layer.
//
// Every function currently resolves with mock data after a short simulated
// delay. When the FastAPI backend is ready, swap the body of each function
// for the matching Axios call — the function signatures and return shapes
// are designed to stay the same, so components will not need to change.
//
// Example of the intended future implementation:
//   export const login = (email, password) =>
//     client.post('/api/auth/login', { email, password }).then(r => r.data)

import axios from 'axios'
import { mockPatients, getPatientById } from '../data/mockPatients.js'
import { mockAnalyses, getAnalysisById } from '../data/mockAnalyses.js'
import { getFindings } from '../data/mockFindings.js'
import { mockReports, getReportById } from '../data/mockReports.js'

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
})

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms))

// ---- Auth ----
export async function login(email, password) {
  await delay(400)
  if (email === 'doctor@medora.ai' && password === 'demo123') {
    return { name: 'Dr. Mukesh', email, specialty: 'Radiology & Internal Medicine' }
  }
  throw new Error('Invalid credentials')
}

// ---- Patients ----
export async function getPatients() {
  await delay(300)
  return mockPatients
}

export async function getPatient(id) {
  await delay(300)
  return getPatientById(id)
}

export async function createPatient(payload) {
  await delay(300)
  return { ...payload, id: `P${Math.floor(1000 + Math.random() * 9000)}` }
}

// ---- Analysis ----
export async function createAnalysis(payload) {
  await delay(400)
  return { id: `AN-2024-${Math.floor(1000 + Math.random() * 9000)}`, ...payload }
}

export async function getAnalysis(id) {
  await delay(300)
  return getAnalysisById(id)
}

export async function getVerification(analysisId) {
  await delay(300)
  return getFindings(analysisId)
}

// ---- Reports ----
export async function getReports() {
  await delay(300)
  return mockReports
}

export async function getReport(id) {
  await delay(300)
  return getReportById(id)
}

export async function updateReport(id, updates) {
  await delay(300)
  return { ...getReportById(id), ...updates }
}

export async function approveReport(id, reviewer = 'Dr. Mukesh') {
  await delay(400)
  return {
    ...getReportById(id),
    status: 'approved',
    reviewedBy: reviewer,
    reviewedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
  }
}

export async function downloadReport(id) {
  await delay(300)
  return { url: `#report-${id}.pdf` }
}
