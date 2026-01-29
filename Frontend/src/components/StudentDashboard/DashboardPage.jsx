import React from 'react'
import { motion } from 'framer-motion'
import StudentLayout from './StudentLayout'
import '../../App.css'

const StatCard = ({ title, value, icon, color }) => {
  return (
    <motion.div
      className="stat-card"
      whileHover={{ translateY: -5 }}
    >
      <div className={`stat-icon ${color}`}>
        {icon}
      </div>
      <div className="stat-body">
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
      </div>
    </motion.div>
  )
}

export default function StudentDashboardPage() {
  const courses = [
    { id: 1, name: 'Data Structures', code: 'CS201', credits: 4, progress: 75 },
    { id: 2, name: 'Operating Systems', code: 'CS301', credits: 3, progress: 50 },
    { id: 3, name: 'Discrete Mathematics', code: 'MA210', credits: 3, progress: 90 },
    { id: 4, name: 'Database Systems', code: 'CS302', credits: 3, progress: 60 },
  ]

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const calendarDays = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const weeklyTimetable = [
    { day: 'Mon', subject: 'Data Structures', time: '09:00', room: 'A-201', status: 'Upcoming' },
    { day: 'Tue', subject: 'Database Systems', time: '10:00', room: 'Lab-3', status: 'Completed' },
    { day: 'Wed', subject: 'Operating Systems', time: '09:00', room: 'B-105', status: 'Upcoming' },
    { day: 'Thu', subject: 'Discrete Math', time: '11:20', room: 'C-210', status: 'Upcoming' },
    { day: 'Fri', subject: 'DS Tutorial', time: '09:00', room: 'A-203', status: 'Cancelled' }
  ]

  return (
    <StudentLayout>
      <motion.div
        className="dashboard-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Left Main Column */}
        <div className="left-main-col">

          
          <motion.div
            className="welcome-banner"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="banner-content">
              <h4>April 24, 2026</h4>
              <h1>Good Morning, Student!</h1>
              <p>You have 2 assignments due this week and 3 upcoming classes today. Keep up the great work!</p>
              <button className="banner-btn">Check Assignments</button>
            </div>
            <div style={{ fontSize: '120px', lineHeight: 1, opacity: 0.4}}>🎓</div>
          </motion.div>

          <div className="card-section">
            <div className="section-title">Attendance Overview</div>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '20px 0', flexWrap: 'wrap', gap: '20px' }}>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'conic-gradient(#3b82f6 0% 85%, #bfcbe7 85% 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  marginBottom: '10px'
                }}>
                  <div style={{ background: 'white', width: '90px', height: '90px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '20px', fontWeight: '700', color: '#384557' }}>80%</span>
                  </div>
                </div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>Class Attendance</div>
                <div style={{ fontSize: '12px', color: '#a3aed0' }}>34/40</div>
              </div>

              {/* Lab Attendance */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'conic-gradient(#10b981 0% 92%, #f4f7fe 92% 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  marginBottom: '10px'
                }}>
                  <div style={{ background: 'white', width: '90px', height: '90px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937' }}>92%</span>
                  </div>
                </div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>Lab Attendance</div>
                <div style={{ fontSize: '12px', color: '#a3aed0' }}>23/25</div>
              </div>

              {/* Overall Attendance */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'conic-gradient(#f59e0b 0% 88%, #f4f7fe 88% 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  marginBottom: '10px'
                }}>
                  <div style={{ background: 'white', width: '90px', height: '90px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937' }}>88%</span>
                  </div>
                </div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>Overall Attendance</div>
                <div style={{ fontSize: '12px', color: '#a3aed0' }}>57/65</div>
              </div>

            </div>
          </div>

          {/* Timetable Section */}

        </div>

        {/* Right Panel Column */}
        <div className="right-panel-col">

          {/* Full Calendar Widget */}
          {/* Full Calendar Widget */}
          <div className="calendar-widget" style={{ padding: '20px' }}>
            <div className="calendar-header" style={{ marginBottom: '10px' }}>
              <span>{monthNames[currentMonth]} {currentYear}</span>
            </div>
            <div className="calendar-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: '8px' }}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <div key={i} style={{
                  fontSize: '11px',
                  color: i === 0 ? '#dc2626' : '#a3aed0', // Sunday Red
                  textAlign: 'center',
                  fontWeight: '600'
                }}>
                  {d}
                </div>
              ))}
            </div>

            <div className="calendar-days-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
              {calendarDays.map((day, i) => {
                const isSunday = i % 7 === 0;
                return (
                  <div key={i} style={{
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    color: !day ? 'transparent' : (day === currentDate.getDate() ? 'white' : (isSunday ? '#dc2626' : '#2b3674')),
                    background: day === currentDate.getDate() ? '#4318ff' : (day ? 'transparent' : 'transparent'),
                    borderRadius: '6px',
                    fontWeight: day === currentDate.getDate() ? '700' : '500',
                    cursor: day ? 'pointer' : 'default',
                    transition: 'all 0.2s'
                  }}
                    onMouseEnter={(e) => { if (day && day !== currentDate.getDate()) e.target.style.background = '#f4f7fe' }}
                    onMouseLeave={(e) => { if (day && day !== currentDate.getDate()) e.target.style.background = 'transparent' }}
                  >
                    {day}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Ready For Training / Extra Widget */}

          <div className="applicants-widget">
            <div className="widget-header">
              <span>Today's Routine</span>
              <span style={{ fontSize: '12px', color: '#a3aed0' }}>Mon</span>
            </div>
            <div className="routine-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="routine-item" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ width: '4px', height: '40px', background: '#4318ff', borderRadius: '2px' }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#2b3674' }}>Data Structures</div>
                  <div style={{ fontSize: '12px', color: '#a3aed0' }}>09:00 - 10:00 • A-201</div>
                </div>
              </div>
              <div className="routine-item" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ width: '4px', height: '40px', background: '#3b82f6', borderRadius: '2px' }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#2b3674' }}>Operating Systems</div>
                  <div style={{ fontSize: '12px', color: '#a3aed0' }}>10:00 - 11:00 • B-105</div>
                </div>
              </div>

              {/* Break */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.6 }}>
                <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }}></div>
                <div style={{ fontSize: '11px', fontWeight: '600', color: '#a3aed0' }}>BREAK (20m)</div>
                <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }}></div>
              </div>

              <div className="routine-item" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ width: '4px', height: '40px', background: '#10b981', borderRadius: '2px' }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#2b3674' }}>Discrete Mathematics</div>
                  <div style={{ fontSize: '12px', color: '#a3aed0' }}>11:20 - 12:20 • C-210</div>
                </div>
              </div>
              <div className="routine-item" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ width: '4px', height: '40px', background: '#f59e0b', borderRadius: '2px' }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#2b3674' }}>Database Systems</div>
                  <div style={{ fontSize: '12px', color: '#a3aed0' }}>12:20 - 01:20 • Lab-3</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </StudentLayout>
  )
}
