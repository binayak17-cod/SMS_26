import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './App.css'
import TeacherDashboard from './pages/teacherDashboard'
import StudentDashboard from './pages/studentDashboard'

function DashboardSwitcher() {
  const location = useLocation()
  const isStudent = location.pathname.startsWith('/student')
  const isAdmin = location.pathname.startsWith('/teacher')

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      zIndex: 9999,
      display: 'flex',
      gap: '8px',
      background: 'white',
      padding: '8px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    }}>
      <a
        href="/student/dashboard"
        onClick={(e) => {
          // If already on student section, standard link behavior (or prevent default to avoid reload?)
          // Since we want to switch context, a full reload or simple href is fine, but React Router Link is better.
          // However, using <a> with href works for switching apps, but let's use Navigate or simple href.
          // To preserve SPA, we should use a Link component, but imports are outside.
          // Let's just use window.location or simple href if we don't import Link.
          // I'll import Link.
        }}
        style={{ textDecoration: 'none' }}
      >
        <div
          style={{
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            background: isStudent ? '#3b82f6' : '#e5e7eb',
            color: isStudent ? 'white' : '#374151',
            transition: 'all 0.2s ease'
          }}
        >
          Student
        </div>
      </a>
      <a
        href="/teacher/dashboard"
        style={{ textDecoration: 'none' }}
      >
        <div
          style={{
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            background: isAdmin ? '#3b82f6' : '#e5e7eb',
            color: isAdmin ? 'white' : '#374151',
            transition: 'all 0.2s ease'
          }}
        >
          Admin
        </div>
      </a>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="app-root">
        <Routes>
          <Route path="/student/*" element={<StudentDashboard />} />
          <Route path="/teacher/*" element={<TeacherDashboard />} />
          <Route path="*" element={<Navigate to="/student/dashboard" replace />} />
        </Routes>

        <DashboardSwitcher />
      </div>
    </Router>
  )
}

export default App
