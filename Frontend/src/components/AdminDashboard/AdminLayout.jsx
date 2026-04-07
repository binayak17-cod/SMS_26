import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import './AdminLayout.css';
import {
  LayoutDashboard,
  ClipboardCheck,
  Users,
  FileText,
  Bell,
  User,
  LogOut,
  Menu,
  ChevronRight,
  IdCard,
  BarChart3,
  Settings,
  Link2
} from 'lucide-react'


const API_BASE = 'http://localhost:5000/api';

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState({ name: 'Admin', role: 'admin' });
    const dropdownRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const userRole = localStorage.getItem('userRole');
        if (userId) {
            axios.get(`${API_BASE}/users`)
                .then(res => {
                    if (res.data.success) {
                        const found = res.data.users.find(u => u.id === userId);
                        if (found) {
                            setUser({ name: found.name, role: found.role });
                        }
                    }
                })
                .catch(err => console.error('Failed to fetch user info:', err));

            if (userRole) {
                setUser(prev => ({ ...prev, role: userRole }));
            }
        }
    }, []);

  
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        window.location.href = "/login";
    };

    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Users', path: '/admin/users', icon: Users },
        { name: 'Attendance', path: '/admin/attendance', icon: ClipboardCheck },
        { name: 'Marks/Grades', path: '/admin/marks', icon: FileText },
        { name: 'ID Creation', path: '/admin/id-creation', icon: IdCard },
        { name: 'Batch Assignment', path: '/admin/batch-assignment', icon: Link2 },

        { name: 'Settings', path: '/admin/settings', icon: Settings },
    ];

    const getInitial = (name) => name ? name.charAt(0).toUpperCase() : 'A';

    return (
        <div className="admin-layout">
          
            <motion.aside
                className="admin-sidebar"
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
                            <span className="nav-icon" title={item.name}><item.icon size={20} /></span>
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
                        <div className="avatar">{getInitial(user.name)}</div>
                        {sidebarOpen && (
                            <div className="info">
                                <p className="name">{user.name}</p>
                                <p className="role">{user.role}</p>
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
                        <div
                            className="profile-dropdown"
                            ref={dropdownRef}
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <div className="avatar">{getInitial(user.name)}</div>
                            <div className="profile-info">
                                <p className="profile-name">{user.name}</p>
                                <p className="profile-role">{user.role}</p>
                            </div>
                            <span className="dropdown-arrow">▼</span>

                            <AnimatePresence>
                                {dropdownOpen && (
                                    <motion.div
                                        className="dropdown-menu"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <button className="dropdown-item">Profile</button>
                                        <button className="dropdown-item">Settings</button>
                                        <button className="dropdown-item logout" onClick={handleLogout}>Logout</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
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
