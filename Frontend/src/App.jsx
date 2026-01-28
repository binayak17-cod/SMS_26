import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage/Landingpage'
import Login from './components/Login/Login'
import StudentDashboard from './pages/studentDashboard'
import TeacherDashboard from './pages/teacherDashboard'
import OverviewPage from './components/TeacherDashboard/OverviewPage'
import ResultPage from './components/TeacherDashboard/ResultPage'

import StudentsPage from './components/TeacherDashboard/StudentsPage'
import AdminDashboard from './pages/AdminDashboard'




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