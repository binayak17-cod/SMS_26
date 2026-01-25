import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import {
  AdminDashboard,
  StudentDashboardPage,
  StudentSubjectsPage,
  StudentResultPage
} from './pages'

function App() {
  return (
    <Router>
      <div className="app-root">
        <Routes>
          {/* Admin Routes - The AdminDashboard component handles its own sub-routes /admin/* */}
          <Route path="/admin/*" element={<AdminDashboard />} />

          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboardPage />} />
          <Route path="/student/subjects" element={<StudentSubjectsPage />} />
          <Route path="/student/result" element={<StudentResultPage />} />

          {/* Student specific redirects */}
          <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />

          {/* Root Redirect - Default to student dashboard for now, or could point to a landing page */}
          <Route path="/" element={<Navigate to="/student/dashboard" replace />} />

          {/* Catch all - Redirect to root */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
