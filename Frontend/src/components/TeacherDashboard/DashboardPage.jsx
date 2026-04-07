import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, GraduationCap, BookOpen } from 'lucide-react'
import axios from 'axios'
import '../../App.css'

const StatCard = ({ title, value, icon: Icon, accent, bgTint }) => {
  return (
    <motion.div
      whileHover={{ translateY: -3 }}
      style={{
        background: 'white',
        borderRadius: '16px',
        padding: '22px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        border: '1px solid #f0f0f0',
        cursor: 'default',
        transition: 'box-shadow 0.2s ease',
      }}
    >
      <div style={{
        width: '46px',
        height: '46px',
        borderRadius: '12px',
        background: bgTint,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon size={22} color={accent} strokeWidth={2} />
      </div>
      <div>
        <div style={{ fontSize: '13px', color: '#8993a4', fontWeight: 500, letterSpacing: '0.01em' }}>{title}</div>
        <div style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginTop: '2px', lineHeight: 1.2 }}>{value}</div>
      </div>
    </motion.div>
  )
}

export default function DashboardPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [totalStudents, setTotalStudents] = useState('--')
  const [totalTeachers, setTotalTeachers] = useState('--')
  const [assignedCourses, setAssignedCourses] = useState('--')

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/dashboard/stats')
      .then(res => {
        if (res.data.success) {
          setTotalStudents(res.data.totalStudents)
          setTotalTeachers(res.data.totalTeachers)
        }
      })
      .catch(err => console.error('Error fetching stats:', err))

    const teacherId = localStorage.getItem('userId')
    if (teacherId) {
      axios.get(`http://127.0.0.1:5000/api/teacher-assignments/${teacherId}`)
        .then(res => {
          if (res.data.success) {
            const uniqueSubjects = new Set(res.data.assignments.map(a => a.subject))
            setAssignedCourses(String(uniqueSubjects.size))
          }
        })
        .catch(err => console.error('Error fetching assignments:', err))
    }
  }, [])

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const currentDay = currentDate.getDate()

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  const hours = String(currentDate.getHours() % 12 || 12).padStart(2, '0')
  const minutes = String(currentDate.getMinutes()).padStart(2, '0')
  const ampm = currentDate.getHours() >= 12 ? 'PM' : 'AM'
  const formattedTime = `${hours}:${minutes} ${ampm}`

  return (
    <motion.div
      className="dashboard-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Left Main Column */}
      <div className="left-main-col">

        <div className="stats-grid">
          <StatCard title="Total Students" value={totalStudents} icon={Users} accent="#4f46e5" bgTint="#eef2ff" />
          <StatCard title="Total Teachers" value={totalTeachers} icon={Users} accent="#0891b2" bgTint="#ecfeff" />
          <StatCard title="Assigned Courses" value={assignedCourses} icon={GraduationCap} accent="#c2410c" bgTint="#fff7ed" />
        </div>

        {/* Middle Section: Statistics & Course Progress */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div className="card-section" style={{ height: '300px', marginBottom: 0 }}>
            <div className="section-title">Statistics</div>
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

      </div>

      {/* Right Panel Column */}
      <div className="right-panel-col">

        {/* Calendar Widget */}
        <div className="calendar-widget">
          <div className="calendar-header">
            <span>{monthNames[currentMonth]} {currentYear}</span>
            <span style={{ fontSize: '12px', color: '#a3aed0' }}>{formattedTime}</span>
          </div>
          <div className="calendar-days">
            {dayNames.map(d => (
              <div key={d} style={{ fontSize: '12px', color: '#a3aed0', textAlign: 'center', width: '30px' }}>{d}</div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginTop: '10px' }}>
            {[...Array(firstDayOfMonth).keys()].map(i => <div key={`e-${i}`}></div>)}
            {[...Array(daysInMonth).keys()].map(i => {
              const day = i + 1;
              const isToday = day === currentDay;
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
  )
}
