import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
        { name: 'Users', path: '/admin/users', icon: '👥' },
        { name: 'Attendance', path: '/admin/attendance', icon: '📅' },
        { name: 'Marks/Grades', path: '/admin/marks', icon: '📝' },
        { name: 'ID Creation', path: '/admin/id-creation', icon: '🆔' },
        { name: 'Batch Assignment', path: '/admin/role-assignment', icon: '🔑' },
        { name: 'Analytics', path: '/admin/analytics', icon: '📈' },
        { name: 'Settings', path: '/admin/settings', icon: '⚙️' },
    ];

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <motion.aside
                className={`admin-sidebar`}
                initial={false}
                animate={{ width: sidebarOpen ? 260 : 80 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                <div className="sidebar-header">
                    <motion.div
                        className="logo-container"
                        animate={{ opacity: sidebarOpen ? 1 : 0 }}
                    >
                        <h2>SMS Admin</h2>
                    </motion.div>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="toggle-btn"
                        aria-label="Toggle Sidebar"
                    >
                        {sidebarOpen ? '◀' : '▶'}
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `nav-item ${isActive ? 'active' : ''}`
                            }
                        >
                            <span className="nav-icon" title={item.name}>{item.icon}</span>
                            <AnimatePresence>
                                {sidebarOpen && (
                                    <motion.span
                                        className="nav-text"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {item.name}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="admin-profile-mini">
                        <div className="avatar">A</div>
                        {sidebarOpen && (
                            <div className="info">
                                <p className="name">Admin User</p>
                                <p className="role">Super Admin</p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <div className="main-wrapper">
                {/* Topbar */}
                <header className="admin-header">
                    <div className="header-left">
                        <h1 className="page-title">
                            {menuItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
                        </h1>
                    </div>
                    <div className="header-right">
                        <div className="search-bar">
                            <span className="search-icon">🔍</span>
                            <input type="text" placeholder="Global search..." />
                        </div>
                        <button className="icon-btn notification-btn">
                            🔔
                            <span className="badge">3</span>
                        </button>
                        <div className="profile-dropdown">
                            <div className="avatar">A</div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="admin-content">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="page-transition-wrapper"
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
