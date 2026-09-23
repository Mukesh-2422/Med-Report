import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'

import Introduction from './pages/Introduction.jsx'
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
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      {/* Introduction Page */}
      <Route path="/" element={<Introduction />} />
      <Route path="/intro" element={<Introduction />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />

      {/* Protected Workspace */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/analysis/new" element={<ProtectedRoute><NewAnalysis /></ProtectedRoute>} />
      <Route path="/analysis/processing" element={<ProtectedRoute><AnalysisProcessing /></ProtectedRoute>} />
      <Route path="/analysis/result" element={<ProtectedRoute><AnalysisResult /></ProtectedRoute>} />
      <Route path="/analysis/verification" element={<ProtectedRoute><Verification /></ProtectedRoute>} />

      {/* Report Review and Report Details */}
      <Route path="/reports" element={<ProtectedRoute><ReportsHistory /></ProtectedRoute>} />
      <Route path="/reports/:id" element={<ProtectedRoute><ReportReview /></ProtectedRoute>} />

      <Route path="/patients" element={<ProtectedRoute><Patients /></ProtectedRoute>} />
      <Route path="/patients/:id" element={<ProtectedRoute><PatientDetails /></ProtectedRoute>} />

      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />} />
    </Routes>
  )
}
