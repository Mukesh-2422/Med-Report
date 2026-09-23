import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'

import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import NewAnalysis from './pages/NewAnalysis.jsx'
import AnalysisProcessing from './pages/AnalysisProcessing.jsx'
import AnalysisResult from './pages/AnalysisResult.jsx'
import Verification from './pages/Verification.jsx'
import ReportReview from './pages/ReportReview.jsx'
import ReportsHistory from './pages/ReportsHistory.jsx'
import Patients from './pages/Patients.jsx'
import PatientDetails from './pages/PatientDetails.jsx'
import Settings from './pages/Settings.jsx'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/analysis/new" element={<ProtectedRoute><NewAnalysis /></ProtectedRoute>} />
      <Route path="/analysis/processing" element={<ProtectedRoute><AnalysisProcessing /></ProtectedRoute>} />
      <Route path="/analysis/result" element={<ProtectedRoute><AnalysisResult /></ProtectedRoute>} />
      <Route path="/analysis/verification" element={<ProtectedRoute><Verification /></ProtectedRoute>} />

      {/* Report Review and Report Details share one view-model: viewing an
          existing report from history is the same workspace as reviewing a
          freshly generated draft. */}
      <Route path="/reports" element={<ProtectedRoute><ReportsHistory /></ProtectedRoute>} />
      <Route path="/reports/:id" element={<ProtectedRoute><ReportReview /></ProtectedRoute>} />

      <Route path="/patients" element={<ProtectedRoute><Patients /></ProtectedRoute>} />
      <Route path="/patients/:id" element={<ProtectedRoute><PatientDetails /></ProtectedRoute>} />

      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
