import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import TeacherLayout from '../components/TeacherDashboard/TeacherLayout'
import DashboardPage from '../components/TeacherDashboard/DashboardPage'

import AttendancePage from '../components/TeacherDashboard/AttendancePage'
import StudentsPage from '../components/TeacherDashboard/StudentsPage'
import TeachersPage from '../components/TeacherDashboard/TeachersPage'
import ResultPage from '../components/TeacherDashboard/ResultPage'

const TeacherDashboard = () => {
    return (
        <TeacherLayout>
            <Routes>
                <Route path="/teacher/dashboard" element={<DashboardPage />} />
                <Route path="/teacher/attendance" element={<AttendancePage />} />
                <Route path="/teacher/students" element={<StudentsPage />} />
                <Route path="/teacher/teachers" element={<TeachersPage />} />
                <Route path="/teacher/result" element={<ResultPage />} />
                <Route path="/teacher" element={<Navigate to="/teacher/dashboard" replace />} />
                <Route path="/" element={<Navigate to="/teacher/dashboard" replace />} />
            </Routes>
        </TeacherLayout >
    )
}

export default TeacherDashboard
