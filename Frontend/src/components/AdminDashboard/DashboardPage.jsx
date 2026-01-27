import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import './DashboardPage.css';

const DashboardPage = () => {
    const navigate = useNavigate();

    const kpiData = [
        { title: 'Total Students', value: '1,248', change: '+12%', color: '#4285f4' },
        { title: 'Total Teachers', value: '84', change: '+2%', color: '#34a853' },
        { title: 'Total Employees', value: '24', change: '0%', color: '#fbbc04' },
        { title: 'Active Classes', value: '42', change: '+5%', color: '#4285f4' },
    ];

    const recentActivity = [
        { id: 1, user: 'Sarah Connor', action: 'Created new Student ID', time: '10 mins ago', avatar: 'S', color: '#4285f4' },
        { id: 2, user: 'Admin User', action: 'Updated Attendance for Class 10A', time: '1 hour ago', avatar: 'A', color: '#34a853' },
        { id: 3, user: 'John Doe', action: 'Uploaded Marks for English', time: '2 hours ago', avatar: 'J', color: '#ea4335' },
        { id: 4, user: 'System', action: 'Backup completed successfully', time: '1 day ago', avatar: 'S', color: '#fbbc04' },
    ];

    return (
        <AdminLayout>
            <div className="modern-dashboard">
                {/* KPI Cards Grid */}
                <div className="kpi-cards-grid">
                    {kpiData.map((kpi, index) => (
                        <motion.div 
                            key={index} 
                            className="modern-kpi-card"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="kpi-content">
                                <div className="kpi-title">{kpi.title}</div>
                                <div className="kpi-value">{kpi.value}</div>
                                <div className="kpi-change" style={{ color: kpi.color }}>
                                    {kpi.change}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="dashboard-main-grid">
                    {/* Quick Actions */}
                    <div className="quick-actions-section">
                        <h3>Quick Actions</h3>
                        <div className="action-buttons">
                            <button className="action-btn primary">
                                <span className="btn-icon">🆔</span>
                                Create New ID
                            </button>
                            <button className="action-btn secondary">
                                <span className="btn-icon">📅</span>
                                Update Attendance
                            </button>
                            <button className="action-btn secondary">
                                <span className="btn-icon">📝</span>
                                Update Marks
                            </button>
                            <button className="action-btn secondary">
                                <span className="btn-icon">📢</span>
                                Manage Users
                            </button>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="recent-activity-section">
                        <div className="section-header">
                            <h3>Recent Activity</h3>
                            <button className="view-reports-btn">View Reports</button>
                        </div>
                        <div className="activity-list">
                            {recentActivity.map(activity => (
                                <div key={activity.id} className="activity-item">
                                    <div 
                                        className="activity-avatar" 
                                        style={{ backgroundColor: activity.color }}
                                    >
                                        {activity.avatar}
                                    </div>
                                    <div className="activity-content">
                                        <div className="activity-action">{activity.action}</div>
                                        <div className="activity-meta">
                                            {activity.user} • {activity.time}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default DashboardPage;
