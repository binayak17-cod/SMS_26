import React, { useEffect, useState } from 'react'
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

const StudentDashboard = () => {
  const [attendanceStats, setAttendanceStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState(null);
  const [studentName, setStudentName] = useState('Student');
  
  useEffect(() => {
    const id = localStorage.getItem('userId');
    console.log('Student ID from localStorage:', id);
    setStudentId(id);
    if (id) {
      fetchAttendanceStats(id);
    } else {
      console.log('No student ID found in localStorage');
    }
  }, []);

const fetchAttendanceStats = async (id) => {
  console.log('Fetching attendance for student:', id);
  setLoading(true);
  try {
    const res = await fetch(`http://localhost:5000/api/student/attendance?studentId=${id}`);
    console.log('Response status:', res.status);
    
    if (!res.ok) {
      throw new Error('Failed to fetch attendance');
    }
    
    const data = await res.json();
    console.log('Full API Response:', data); // ADD THIS
    console.log('Statistics object:', data.statistics); // ADD THIS
    console.log('Overall stats:', data.statistics?.overall); // ADD THIS
    
    setAttendanceStats(data.statistics);
    if (data.student?.name) {
      setStudentName(data.student.name);
    }
  } catch (err) {
    console.error('Error fetching attendance:', err);
  } finally {
    setLoading(false);
  }
};

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return '#10b981'; // green
    if (percentage >= 75) return '#3b82f6'; // blue
    if (percentage >= 60) return '#f59e0b'; // orange
    return '#ef4444'; 
  }

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

  return (
    <StudentLayout studentName={studentName}>
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
              <h1>Good Morning, {studentName}!</h1>
              <p>You have 2 assignments due this week and 3 upcoming classes today. Keep up the great work!</p>
              <button className="banner-btn">Check Assignments</button>
            </div>
            <div style={{ fontSize: '120px', lineHeight: 1, opacity: 0.4}}>🎓</div>
          </motion.div>

          {/* Attendance Overview */}
          <div className="card-section">
            <div className="section-title">Attendance Overview</div>
            
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <p style={{ color: '#a3aed0' }}>Loading attendance...</p>
              </div>
            ) : !attendanceStats || attendanceStats.overall.total === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                <p>No attendance records found</p>
                <p style={{ fontSize: '12px', marginTop: '10px' }}>Debug: {JSON.stringify(attendanceStats)}</p>
              </div>
            ) : (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-around', 
                alignItems: 'center', 
                padding: '20px 0', 
                flexWrap: 'wrap', 
                gap: '30px' 
              }}>
                {/* Theory Attendance */}
                {attendanceStats.theory.total > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: '140px',
                      height: '140px',
                      borderRadius: '50%',
                      background: `conic-gradient(${getAttendanceColor(attendanceStats.theory.percentage)} 0% ${attendanceStats.theory.percentage}%, #f4f7fe ${attendanceStats.theory.percentage}% 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      marginBottom: '10px'
                    }}>
                      <div style={{ 
                        background: 'white', 
                        width: '110px', 
                        height: '110px', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}>
                        <span style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>
                          {attendanceStats.theory.percentage}%
                        </span>
                      </div>
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>Theory</div>
                    <div style={{ fontSize: '13px', color: '#a3aed0' }}>
                      {attendanceStats.theory.present}/{attendanceStats.theory.total}
                    </div>
                  </div>
                )}

                {/* Lab Attendance */}
                {attendanceStats.lab.total > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: '140px',
                      height: '140px',
                      borderRadius: '50%',
                      background: `conic-gradient(${getAttendanceColor(attendanceStats.lab.percentage)} 0% ${attendanceStats.lab.percentage}%, #f4f7fe ${attendanceStats.lab.percentage}% 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      marginBottom: '10px'
                    }}>
                      <div style={{ 
                        background: 'white', 
                        width: '110px', 
                        height: '110px', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}>
                        <span style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>
                          {attendanceStats.lab.percentage}%
                        </span>
                      </div>
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>Lab</div>
                    <div style={{ fontSize: '13px', color: '#a3aed0' }}>
                      {attendanceStats.lab.present}/{attendanceStats.lab.total}
                    </div>
                  </div>
                )}

                {/* Overall Attendance */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '140px',
                    height: '140px',
                    borderRadius: '50%',
                    background: `conic-gradient(${getAttendanceColor(attendanceStats.overall.percentage)} 0% ${attendanceStats.overall.percentage}%, #f4f7fe ${attendanceStats.overall.percentage}% 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    marginBottom: '10px'
                  }}>
                    <div style={{ 
                      background: 'white', 
                      width: '110px', 
                      height: '110px', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      <span style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>
                        {attendanceStats.overall.percentage}%
                      </span>
                    </div>
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>Overall</div>
                  <div style={{ fontSize: '13px', color: '#a3aed0' }}>
                    {attendanceStats.overall.present}/{attendanceStats.overall.total}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Panel Column */}
        <div className="right-panel-col">

          {/* Full Calendar Widget */}
          <div className="calendar-widget" style={{ padding: '20px' }}>
            <div className="calendar-header" style={{ marginBottom: '10px' }}>
              <span>{monthNames[currentMonth]} {currentYear}</span>
            </div>
            <div className="calendar-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: '8px' }}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <div key={i} style={{
                  fontSize: '11px',
                  color: i === 0 ? '#dc2626' : '#a3aed0',
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

          {/* Today's Routine Widget */}
          <div className="applicants-widget" style={{ marginTop: '30px' }}>
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

export default StudentDashboard