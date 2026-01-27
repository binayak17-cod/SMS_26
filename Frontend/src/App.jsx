import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage/Landingpage'
import Login from './components/Login/Login'
import AdminDashboard from './pages/AdminDashboard.jsx'
import StudentDashboard from './pages/studentDashboard'
import TeacherDashboard from './pages/teacherDashboard'

function App() {
  return (
    <Router>
      <div className="app-root">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes - The AdminDashboard component handles its own sub-routes /admin/* */}
          <Route path="/admin/*" element={<AdminDashboard />} />

          {/* Student Routes */}
          <Route path="/student/*" element={<StudentDashboard />} />

          {/* Teacher Routes */}
          <Route path="/teacher/*" element={<TeacherDashboard />} />

          {/* Catch all - Redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App