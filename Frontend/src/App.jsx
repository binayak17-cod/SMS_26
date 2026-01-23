import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import {
  TeacherDashboard,
  StudentDashboard,
  StudentDashboardPage,
  StudentSubjectsPage,
  StudentResultPage
} from './pages'

function App() {
  const [dashboardType, setDashboardType] = useState('student') // 'admin' or 'student'

  return (
    <Router>
      <div className="app-root">
        {dashboardType === 'admin' ? (
          <TeacherDashboard />
        ) : (
          <Routes>
            <Route path="/student/dashboard" element={<StudentDashboardPage />} />
            <Route path="/student/subjects" element={<StudentSubjectsPage />} />
            <Route path="/student/result" element={<StudentResultPage />} />
            <Route path="/" element={<Navigate to="/student/dashboard" replace />} />
          </Routes>
        )}

        {/* Dashboard Switcher */}
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
          <button
            onClick={() => setDashboardType('student')}
            style={{
              padding: '8px 12px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              background: dashboardType === 'student' ? '#3b82f6' : '#e5e7eb',
              color: dashboardType === 'student' ? 'white' : '#374151',
              transition: 'all 0.2s ease'
            }}
          >
            Student
          </button>
          <button
            onClick={() => setDashboardType('admin')}
            style={{
              padding: '8px 12px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              background: dashboardType === 'admin' ? '#3b82f6' : '#e5e7eb',
              color: dashboardType === 'admin' ? 'white' : '#374151',
              transition: 'all 0.2s ease'
            }}
          >
            Admin
          </button>
        </div>
      </div>
    </Router>
  )
}

export default App
