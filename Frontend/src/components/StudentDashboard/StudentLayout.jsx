import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import '../../App.css'

const getIcon = (item, isActive) => {
  const color = isActive ? '#0284c7' : '#64748b'; // Sky 600 when active, Slate 500 when inactive
  switch (item) {
    case 'Dashboard':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      );
    case 'Attendance':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="m9 15 2 2 4-4" />
        </svg>
      );
    case 'Subjects':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      );
    case 'Result':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    case 'performance prediction':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
};

const StudentLayout = ({ children, studentName = 'Student' }) => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const menuItems = ['Dashboard', 'Attendance', 'Subjects', 'Result', 'performance'];

  useEffect(() => {
    const currentPath = location.pathname.split('/').pop();
    const activeItem = menuItems.find(item => item.toLowerCase() === currentPath);
    if (activeItem) {
      setActiveMenu(activeItem);
    }
  }, [location]);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#f8fafc', width: '100%' }}>
      <motion.aside
        style={{
          width: '260px',
          background: '#ffffff', // white
          color: '#475569',      // slate-600
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          flexShrink: 0,
          borderRight: '1px solid #e2e8f0' // slate-200
        }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '24px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: '#636667ff', // sky-600
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: '18px'
          }}>
            S
          </div>
          <div style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', letterSpacing: '-0.02em' }}>
            Student <span style={{ color: '#535759ff' }}>Portal</span>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '0 16px', flex: 1 }}>
          <div style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', paddingLeft: '12px' }}>

          </div>
          {menuItems.map(item => {
            const isActive = activeMenu === item;
            return (
              <Link to={`/student/${item.toLowerCase()}`} key={item} style={{ textDecoration: 'none' }}>
                <motion.div
                  onClick={() => setActiveMenu(item)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontWeight: isActive ? '600' : '500',
                    color: isActive ? '#0f172a' : '#475569',
                    background: isActive ? '#f0f9ff' : 'transparent',
                    borderLeft: isActive ? '3px solid #0284c7' : '3px solid transparent',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = '#f8fafc';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'transparent';
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {getIcon(item, isActive)}
                  <span style={{ fontSize: '14px' }}>{item}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      style={{ position: 'absolute', right: '12px', width: '6px', height: '6px', borderRadius: '50%', background: '#0284c7' }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '24px', borderTop: '1px solid #e2e8f0', marginTop: 'auto' }}>
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>Need assistance?</div>
            <button style={{ background: '#ffffff', color: '#0f172a', border: '1px solid #cbd5e1', width: '100%', padding: '8px', borderRadius: '4px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#ffffff'}
            >
              Contact Support
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
        {/* Topbar - Clean White ERP Style */}
        <motion.header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 32px',
            background: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            position: 'sticky',
            top: 0,
            zIndex: 50
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <motion.h2
              key={activeMenu}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {activeMenu}
            </motion.h2>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
              Academic Session 2025-26
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search resources..."
                style={{
                  padding: '8px 16px 8px 36px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  background: '#f8fafc',
                  fontSize: '13px',
                  width: '240px',
                  outline: 'none'
                }}
              />
              <svg style={{ position: 'absolute', left: '12px', top: '9px', color: '#94a3b8' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                cursor: 'pointer',
                position: 'relative',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%', border: '2px solid white' }}></span>
            </motion.div>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '24px', borderLeft: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>{studentName}</span>
                <span style={{ fontSize: '11px', color: '#64748b' }}>Student Portal</span>
              </div>
              <motion.div
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#1e3a8a',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  border: '2px solid #e2e8f0'
                }}
              >
                {studentName.substring(0, 2).toUpperCase()}
              </motion.div>
            </div>
          </div>
        </motion.header>

        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'fixed',
              top: '72px',
              right: '32px',
              width: '200px',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              padding: '8px',
              zIndex: 999999,
              border: '1px solid #e2e8f0'
            }}
          >
            <div style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9', marginBottom: '4px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>Signed in as</div>
              <div style={{ fontSize: '12px', color: '#64748b', truncate: 'true' }}>{studentName}</div>
            </div>
            <div
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#334155',
                fontWeight: '500',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              My Profile
            </div>
            <div
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#334155',
                fontWeight: '500',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
              Settings
            </div>
            <Link to='/logout' style={{ textDecoration: 'none' }}>
              <div
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: '#dc2626',
                  fontWeight: '500',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'background 0.2s',
                  marginTop: '4px',
                  borderTop: '1px solid #f1f5f9'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#fef2f2'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                Sign Out
              </div>
            </Link>
          </motion.div>
        )}

        <div style={{ padding: '32px', flex: 1, background: '#f8fafc' }}>
          {children}
        </div>
      </main>
    </div>
  )
}

export default StudentLayout

