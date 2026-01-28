import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import '../../App.css'

const StudentLayout = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState('Dashboard')
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const menuItems = ['Dashboard', 'Subjects', 'Result']

  return (
    <motion.div className="dashboard-root">
      <motion.aside
        className="sidebar"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="brand">
          <div className="logo-mark">ST</div>
          <div className="brand-text">Student Panel</div>
        </div>
        <nav className="menu">
          {menuItems.map(item => (
            <Link to={`/student/${item.toLowerCase()}`} key={item} style={{ textDecoration: 'none' }}>
              <motion.div
                className={`menu-item ${activeMenu === item ? 'active' : ''}`}
                onClick={() => setActiveMenu(item)}
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.98 }}
              >
                {item}
              </motion.div>
            </Link>
          ))}
        </nav>
        <motion.div className="invite">
          <div className="invite-illustration">🎓</div>
          <motion.button
            className="invite-btn"
            onClick={() => alert('Explore resources coming soon!')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Resources
          </motion.button>
        </motion.div>
      </motion.aside>

      <motion.main className="maincol">
        <motion.header
          className="topbar"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div className="top-left">
            <motion.h2
              className="page-title"
              key={activeMenu}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeMenu}
            </motion.h2>
            <div className="subtext">Welcome back, Student</div>
          </motion.div>
          <div className="top-right">
            <motion.div
              className="notification-icon"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                cursor: 'pointer',
                background: 'white',
                padding: '10px',
                borderRadius: '50%',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#a3aed0'
              }}
            >
              <span style={{ fontSize: '20px' }}>🔔</span>
            </motion.div>
            <div style={{ position: 'relative' }}>
              <motion.div
                className="profile"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div className="avatar">ST</motion.div>
                <div className="profile-name">Student Name</div>
              </motion.div>

              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  style={{
                    position: 'absolute',
                    top: '120%',
                    right: 0,
                    width: '200px',
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    padding: '8px',
                    zIndex: 100,
                    border: '1px solid #f0f0f0'
                  }}
                >
                  <div
                    style={{
                      padding: '10px 16px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#2b3674',
                      fontWeight: '500',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => (e.target.style.background = '#f4f7fe')}
                    onMouseLeave={(e) => (e.target.style.background = 'transparent')}
                    onClick={() => alert('Update Profile Clicked')}
                  >
                    <span>👤</span> Update Profile
                  </div>
                  <div
                    style={{
                      padding: '10px 16px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#e31a1a',
                      fontWeight: '500',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginTop: '4px'
                    }}
                    onMouseEnter={(e) => (e.target.style.background = '#fff5f5')}
                    onMouseLeave={(e) => (e.target.style.background = 'transparent')}
                    onClick={() => {
                      alert('Logging out...')
                      // window.location.href = '/' // Uncomment when auth is ready
                    }}
                  >
                    <span>🚪</span> Logout
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.header>

        {children}
      </motion.main>
    </motion.div>
  )
}

export default StudentLayout
