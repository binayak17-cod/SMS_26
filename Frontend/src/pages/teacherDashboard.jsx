import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import TeacherLayout from '../components/TeacherDashboard/TeacherLayout'
import DashboardPage from '../components/TeacherDashboard/DashboardPage'
import AttendancePage from '../components/TeacherDashboard/AttendancePage'
import StudentsPage from '../components/TeacherDashboard/StudentsPage'
import TeachersPage from '../components/TeacherDashboard/TeachersPage'
import PerformancePred from '../components/TeacherDashboard/PerformancePred'
import ResultPage from '../components/TeacherDashboard/ResultPage'

const TeacherDashboard = () => {
    return (
        <TeacherLayout>
            <Routes>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="attendance" element={<AttendancePage />} />
                <Route path="students" element={<StudentsPage />} />
                <Route path="teachers" element={<TeachersPage />} />
                <Route path="result" element={<ResultPage />} />
                <Route path='PerformancePred' element={<PerformancePred/>} />
                <Route path="" element={<Navigate to="dashboard" replace />} />
            </Routes>
        </TeacherLayout >
    )
}

export default TeacherDashboard
