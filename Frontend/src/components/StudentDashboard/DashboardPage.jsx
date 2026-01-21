import React from 'react'
import { motion } from 'framer-motion'
import StudentLayout from './StudentLayout'
import '../../App.css'

const StatCard = ({ title, value, color, icon, onClick }) => {
  const colorGradients = {
    purple: 'linear-gradient(135deg, #a855f7, #9333ea)',
    pink: 'linear-gradient(135deg, #ec4899, #db2777)',
    blue: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    orange: 'linear-gradient(135deg, #f97316, #ea580c)'
  }

  return (
    <motion.div 
      className="stat-card"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.4 }}
      whileHover={{ 
        scale: 1.03, 
        translateY: -8,
        boxShadow: '0 20px 40px rgba(0,0,0,0.12)'
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div 
        className={`stat-icon ${color}`}
        style={{ background: colorGradients[color] }}
        whileHover={{ rotate: 8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
      >
        {icon}
      </motion.div>
      <div className="stat-body">
        <div className="stat-title">{title}</div>
        <motion.div 
          className="stat-value"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {value}
        </motion.div>
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

  const attendanceData = { 
    class: 85,
    lab: 92,
    overall: 88,
    classCount: { attended: 34, total: 40 },
    labCount: { attended: 23, total: 25 },
    overallCount: { attended: 57, total: 65 }
  }

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const today = currentDate.getDate()
  
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
    {
      day: 'Mon',
      periods: [
        { time: '09:00–10:00', subject: 'Data Structures', room: 'A-201' },
        { time: '10:00–11:00', subject: 'Operating Systems', room: 'B-105' },
        { break: true, time: '11:00–11:20' },
        { time: '11:20–12:20', subject: 'Discrete Mathematics', room: 'C-210' },
        { time: '12:20–13:20', subject: 'Database Systems', room: 'Lab-3' }
      ]
    },
    {
      day: 'Tue',
      periods: [
        { time: '09:00–10:00', subject: 'Database Systems', room: 'Lab-3' },
        { time: '10:00–11:00', subject: 'Discrete Mathematics', room: 'C-210' },
        { break: true, time: '11:00–11:20' },
        { time: '11:20–12:20', subject: 'Data Structures', room: 'A-201' },
        { time: '12:20–13:20', subject: 'Operating Systems', room: 'B-105' }
      ]
    },
    {
      day: 'Wed',
      periods: [
        { time: '09:00–10:00', subject: 'Operating Systems', room: 'B-105' },
        { time: '10:00–11:00', subject: 'Data Structures', room: 'A-201' },
        { break: true, time: '11:00–11:20' },
        { time: '11:20–12:20', subject: 'Database Systems', room: 'Lab-3' },
        { time: '12:20–13:20', subject: 'Discrete Mathematics', room: 'C-210' }
      ]
    },
    {
      day: 'Thu',
      periods: [
        { time: '09:00–10:00', subject: 'Discrete Mathematics', room: 'C-210' },
        { time: '10:00–11:00', subject: 'Database Systems', room: 'Lab-3' },
        { break: true, time: '11:00–11:20' },
        { time: '11:20–12:20', subject: 'Operating Systems', room: 'B-105' },
        { time: '12:20–13:20', subject: 'Data Structures', room: 'A-201' }
      ]
    },
    {
      day: 'Fri',
      periods: [
        { time: '09:00–10:00', subject: 'Data Structures Tutorial', room: 'A-203' },
        { time: '10:00–11:00', subject: 'Operating Systems Lab', room: 'Lab-2' },
        { break: true, time: '11:00–11:20' },
        { time: '11:20–12:20', subject: 'Discrete Mathematics', room: 'C-210' },
        { time: '12:20–13:20', subject: 'Database Systems', room: 'Lab-3' }
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  return (
    <StudentLayout>
      <motion.div 
        className="dashboard-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.section 
          className="stats-row"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <StatCard title="Attendance" value={courses.length.toString()} color="blue" icon="📚" />
          <StatCard title="Marks" value={courses.reduce((sum, c) => sum + c.credits, 0).toString()} color="purple" icon="🎓" />
          <StatCard title="Attendance Prediction" value={"3.8"} color="orange" icon="⭐" />
          <StatCard title="Semester" value={"6"} color="pink" icon="📝" />
        </motion.section>

        <motion.section 
          className="content-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div className="card" style={{ padding: '24px' }}>
            <motion.div className="card-title">Attendance Overview📈</motion.div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '900px', margin: '0 auto', padding: '10px 30px' }}>
              <div style={{ textAlign: 'center', flex: '1' }}>
                <motion.div 
                  style={{ 
                    width: '100px', 
                    height: '100px', 
                    borderRadius: '50%', 
                    background: `conic-gradient(#3b82f6 0deg ${attendanceData.class * 3.6}deg, #e5e7eb ${attendanceData.class * 3.6}deg 360deg)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 15px',
                    position: 'relative'
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                >
                  <div style={{
                    width: '75px',
                    height: '75px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#1f2937'
                  }}>
                    {attendanceData.class}%
                  </div>
                </motion.div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Class Attendance</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>{attendanceData.classCount.attended}/{attendanceData.classCount.total}</div>
              </div>
              <div style={{ textAlign: 'center', flex: '1' }}>
                <motion.div 
                  style={{ 
                    width: '100px', 
                    height: '100px', 
                    borderRadius: '50%', 
                    background: `conic-gradient(#10b981 0deg ${attendanceData.lab * 3.6}deg, #e5e7eb ${attendanceData.lab * 3.6}deg 360deg)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 15px',
                    position: 'relative'
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <div style={{
                    width: '75px',
                    height: '75px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#1f2937'
                  }}>
                    {attendanceData.lab}%
                  </div>
                </motion.div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Lab Attendance</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>{attendanceData.labCount.attended}/{attendanceData.labCount.total}</div>
              </div>
              <div style={{ textAlign: 'center', flex: '1' }}>
                <motion.div 
                  style={{ 
                    width: '100px', 
                    height: '100px', 
                    borderRadius: '50%', 
                    background: `conic-gradient(#f59e0b 0deg ${attendanceData.overall * 3.6}deg, #e5e7eb ${attendanceData.overall * 3.6}deg 360deg)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 15px',
                    position: 'relative'
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div style={{
                    width: '75px',
                    height: '75px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#1f2937'
                  }}>
                    {attendanceData.overall}%
                  </div>
                </motion.div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Overall Attendance</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>{attendanceData.overallCount.attended}/{attendanceData.overallCount.total}</div>
              </div>
            </div>
          </motion.div>

          <motion.div className="card" style={{ marginBottom: '16px' }}>
            <motion.div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>{monthNames[currentMonth]} {currentYear}</span>
              <motion.span 
                style={{ fontSize: '12px', color: '#6b7280' }}
                animate={{ opacity: [0.5, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {currentDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} - {currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </motion.span>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', fontSize: '12px' }}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <div key={day} style={{ textAlign: 'center', fontWeight: '600', color: index === 0 ? '#dc2626' : '#6b7280', padding: '4px' }}>{day}</div>
              ))}
              {calendarDays.map((day, index) => {
                const isSunday = index % 7 === 0
                return (
                  <motion.div 
                    key={index}
                    style={{
                      textAlign: 'center',
                      padding: '6px 4px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: day === today ? '700' : '500',
                      color: day === today ? '#ffffff' : day ? (isSunday ? '#dc2626' : '#374151') : 'transparent',
                      background: day === today ? '#3b82f6' : 'transparent',
                      cursor: day ? 'pointer' : 'default'
                    }}
                    whileHover={day ? { backgroundColor: day === today ? '#2563eb' : '#f3f4f6' } : {}}
                  >
                    {day || ''}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          <div className="left-cards" style={{ gridColumn: '1 / span 1' }}>
            <motion.div className="db-card">
              <motion.div className="card-title">Timetable📓</motion.div>
              <motion.table className="db-table">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>09:00–10:00</th>
                    <th>10:00–11:00</th>
                    <th>Break (20m)</th>
                    <th>11:20–12:20</th>
                    <th>12:20–13:20</th>
                  </tr>
                </thead>
                <tbody>
                  {weeklyTimetable.map((d) => (
                    <motion.tr key={d.day} whileHover={{ backgroundColor: '#f3f4f6' }}>
                      <td>{d.day}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{d.periods[0].subject}</div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>{d.periods[0].room}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{d.periods[1].subject}</div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>{d.periods[1].room}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 700 }}>Break</div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>11:00–11:20</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{d.periods[3].subject}</div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>{d.periods[3].room}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{d.periods[4].subject}</div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>{d.periods[4].room}</div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </motion.table>
            </motion.div>
          </div>

          <motion.aside 
            className="rightcol"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <motion.div className="card">
              <motion.div className="card-title">Notifications🔔</motion.div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Exam schedule released', 'Library hours updated', 'New workshop: Cloud Basics'].map((n, idx) => (
                  <motion.li 
                    key={idx}
                    style={{ padding: '10px', borderRadius: '8px', background: '#f9fafb', marginBottom: '8px', fontSize: '13px', color: '#374151' }}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    {n}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.aside>
        </motion.section>
      </motion.div>
    </StudentLayout>
  )
}
