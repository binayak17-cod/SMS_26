import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import '../../App.css'

const StudentLayout = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState('Dashboard')

  const menuItems = ['Dashboard', 'Subjects', 'Assignments', 'Result']

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
            <motion.div className="search">
              <motion.input 
                placeholder="Search subjects" 
                whileFocus={{ borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
            <motion.div 
              className="profile" 
              onClick={() => alert('Profile menu')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div className="avatar">ST</motion.div>
              <div className="profile-name">Student Name</div>
            </motion.div>
          </div>
        </motion.header>

        {children}
      </motion.main>
    </motion.div>
  )
}

export default StudentLayout
