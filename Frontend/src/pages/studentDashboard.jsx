import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import StudentDashboardPage from '../components/StudentDashboard/DashboardPage'
import SubjectsPage from '../components/StudentDashboard/SubjectsPage'
import ResultPage from '../components/StudentDashboard/ResultPage'

const StudentDashboard = () => {
    return (
        <Routes>
            <Route path="dashboard" element={<StudentDashboardPage />} />
            <Route path="subjects" element={<SubjectsPage />} />
            <Route path="result" element={<ResultPage />} />
            <Route path="" element={<Navigate to="dashboard" replace />} />
        </Routes>
    )
}

export default StudentDashboard
