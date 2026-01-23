import React from 'react'
import { motion } from 'framer-motion'
import TeacherLayout from './TeacherLayout'
import '../../App.css'

const StatCard = ({ title, value, icon, color }) => {
  const colorGradients = {
    purple: 'linear-gradient(135deg, #a855f7, #9333ea)',
    pink: 'linear-gradient(135deg, #ec4899, #db2777)',
    blue: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    orange: 'linear-gradient(135deg, #f97316, #ea580c)'
  }

  return (
    <motion.div
      className="stat-card"
      whileHover={{ translateY: -5 }}
    >
      <div
        className={`stat-icon`}
        style={{ background: colorGradients[color] || color, color: 'white', borderRadius: '12px' }}
      >
        {icon}
      </div>
      <div className="stat-body">
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
      </div>
    </motion.div>
  )
}

export default function DashboardPage() {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const studentsData = [
    { name: 'Glenn Maxwell', score: '80/100', submitted: '12/10/22 10 PM', grade: 'Excellent', status: 'Pass' },
    { name: 'Cathe Heuavn', score: '70/100', submitted: '12/10/22 10 PM', grade: 'Average', status: 'Pass' },
    { name: 'Yeodar Gil', score: '35/100', submitted: '12/10/22 10 PM', grade: 'Poor', status: 'Fail' },
    { name: 'Preeth Shing', score: '80/100', submitted: '12/10/22 10 PM', grade: 'Excellent', status: 'Pass' }
  ]

  return (
    <TeacherLayout>
      <motion.div
        className="dashboard-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Left Main Column */}
        <div className="left-main-col">

          {/* Welcome Banner */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#2b3674' }}>Dashboard</h2>
            <p style={{ color: '#a3aed0', fontSize: '14px' }}>Welcome back, Jara Khan</p>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            <StatCard title="Total Students" value="1,220" icon="👥" color="purple" />
            <StatCard title="Total Teachers" value="120" icon="👨‍🏫" color="pink" />
            <StatCard title="Total Courses" value="15" icon="📚" color="blue" />
            <StatCard title="Faculty Rooms" value="100" icon="🏢" color="orange" />
          </div>

          {/* Middle Section: Statistics & Course Progress */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div className="card-section" style={{ height: '300px', marginBottom: 0 }}>
              <div className="section-title">Statistics</div>
              {/* Placeholder for chart */}
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a3aed0' }}>
                Chart Placeholder
              </div>
            </div>

            <div className="card-section" style={{ height: '300px', marginBottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div className="section-title" style={{ alignSelf: 'flex-start', marginBottom: 'auto' }}>Course Progress</div>
              <div style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: 'conic-gradient(#4318ff 0% 75%, #f4f7fe 75% 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <div style={{ background: 'white', width: '110px', height: '110px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <span style={{ fontSize: '24px', fontWeight: '700', color: '#2b3674' }}>75%</span>
                </div>
              </div>
              <p style={{ marginTop: '20px', color: '#a3aed0', fontSize: '14px' }}>Completion Rate</p>
              <div style={{ marginTop: 'auto' }}></div>
            </div>
          </div>

          {/* Database Table */}
          <div className="card-section">
            <div className="section-header">
              <div className="section-title">Database</div>
            </div>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Student name</th>
                  <th>Score</th>
                  <th>Submitted</th>
                  <th>Grade</th>
                  <th>Pass/Fail</th>
                </tr>
              </thead>
              <tbody>
                {studentsData.map((student, idx) => (
                  <tr key={idx}>
                    <td><div style={{ fontWeight: '700' }}>{student.name}</div></td>
                    <td>{student.score}</td>
                    <td>{student.submitted}</td>
                    <td>{student.grade}</td>
                    <td>
                      <span className="status-badge" style={{
                        background: student.status === 'Pass' ? '#E6F8F1' : '#FFF0F0',
                        color: student.status === 'Pass' ? '#0CA678' : '#E03131'
                      }}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel Column */}
        <div className="right-panel-col">

          {/* Calendar Widget */}
          <div className="calendar-widget">
            <div className="calendar-header">
              <span>{monthNames[currentMonth]} {currentYear}</span>
              <span style={{ fontSize: '12px', color: '#a3aed0' }}>Fri, Jan 23 - 11:04 PM</span>
            </div>
            <div className="calendar-days">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} style={{ fontSize: '12px', color: '#a3aed0', textAlign: 'center', width: '30px' }}>{d}</div>
              ))}
            </div>
            {/* Simple Grid Calendar Simulation */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginTop: '10px' }}>
              {[...Array(3).keys()].map(i => <div key={`e-${i}`}></div>)} {/* Empty slots */}
              {[...Array(31).keys()].map(i => {
                const day = i + 1;
                const isToday = day === 23;
                return (
                  <div key={day} style={{
                    textAlign: 'center',
                    padding: '6px',
                    borderRadius: '8px',
                    background: isToday ? '#4318ff' : 'transparent',
                    color: isToday ? 'white' : '#2b3674',
                    fontWeight: isToday ? '700' : '400',
                    fontSize: '14px'
                  }}>
                    {day}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Notice Board */}
          <div className="applicants-widget">
            <div className="widget-header">
              <span>Notice Board</span>
            </div>
            <div className="applicant-list">
              {[
                { title: 'Notice of Special Examinations' },
                { title: 'Time Extension Notice of Semester Admission' },
                { title: 'COVID 19 Vaccination Survey October 2021' }
              ].map((notice, idx) => (
                <div key={idx} style={{
                  padding: '12px',
                  marginBottom: '10px',
                  background: 'white',
                  borderLeft: '4px solid #4318ff',
                  borderRadius: '4px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                  fontSize: '13px',
                  color: '#2b3674'
                }}>
                  {notice.title}
                </div>
              ))}
            </div>
          </div>

          {/* Admin Card */}
          <div className="applicants-widget" style={{ background: 'transparent', boxShadow: 'none', padding: 0 }}>
            <button style={{
              width: '100%',
              padding: '16px',
              background: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              fontWeight: '700',
              color: '#2b3674',
              cursor: 'pointer'
            }}>
              Get Analytics
            </button>
          </div>

        </div>
      </motion.div>
    </TeacherLayout>
  )
}
