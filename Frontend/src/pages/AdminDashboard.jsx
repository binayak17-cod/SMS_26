
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/AdminDashboard/AdminLayout';
import DashboardPage from '../components/AdminDashboard/DashboardPage';
import UsersPage from '../components/AdminDashboard/UsersPage';
import AttendancePage from '../components/AdminDashboard/AttendancePage';
import MarksPage from '../components/AdminDashboard/MarksPage';
import IDCreationPage from '../components/AdminDashboard/IDCreationPage';
import RoleAssignmentPage from '../components/AdminDashboard/RoleAssignmentPage';
import AnalyticsPage from '../components/AdminDashboard/AnalyticsPage';
import SettingsPage from '../components/AdminDashboard/SettingsPage';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="marks" element={<MarksPage />} />
        <Route path="id-creation" element={<IDCreationPage />} />
        <Route path="role-assignment" element={<RoleAssignmentPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="settings" element={<SettingsPage />} />

        {/* Default Redirect */}
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;