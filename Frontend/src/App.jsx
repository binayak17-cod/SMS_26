import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage/'
import Login from './components/Login/Login'
import StudentDashboard from './pages/studentDashboard'
import TeacherDashboard from './pages/teacherDashboard'
import AdminDashboard from './pages/AdminDashboard'



function App() {
  return (
    <Router>
      <div className="app-root">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          <Route path ="/logout" element={<Login/>}/>
          
          {/*Admin Route */}
          <Route path="/admin/*" element={<AdminDashboard />} />

          {/* Student Route */}
          <Route path="/student/*" element={<StudentDashboard />} />

          {/* Teacher Route */}
          <Route path="/teacher/*" element={<TeacherDashboard />} />

          {/* Catch all - Redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App