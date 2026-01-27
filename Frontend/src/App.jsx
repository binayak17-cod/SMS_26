import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage/Landingpage'
import Login from './components/Login/Login'
import StudentDashboard from './pages/studentDashboard'
import TeacherDashboard from './pages/teacherDashboard'
import OverviewPage from './components/TeacherDashboard/OverviewPage'
import ResultPage from './components/TeacherDashboard/ResultPage'
import AttendancePage from './components/TeacherDashboard/AttendancePage'
import StudentsPage from './components/TeacherDashboard/StudentsPage'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          {/*Teacher page Routes */}
         <Route path="/faculty-dashboard" element={<TeacherDashboard />} />
          <Route path="overview" element ={<OverviewPage/>}/>
          <Route path="result" element={<ResultPage/>}/>
          <Route path="attendance" element={<AttendancePage/>}/>
          <Route path="student-view" element={<StudentsPage/>}/>
          
        </Routes>
      </div>
    </Router>
  )
}

export default App