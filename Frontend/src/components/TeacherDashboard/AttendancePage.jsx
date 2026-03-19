import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const AttendancePage = () => {
  const [view, setView] = useState('list')
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [sessionType, setSessionType] = useState('Theory')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [students, setStudents] = useState([])
  const [attendance, setAttendance] = useState({})
  const [loading, setLoading] = useState(false)
  const [totalHours, setTotalHours] = useState(1)
  const [assignedClasses, setAssignedClasses] = useState([])

  useEffect(() => {
    fetchAssignedClasses()
  }, [])

  const fetchAssignedClasses = async () => {
    try {
      const teacherId = localStorage.getItem('userId')
      const res = await fetch(`http://localhost:5000/api/teacher-assignments/${teacherId}`)
      const data = await res.json()
      if (data.success) {
        setAssignedClasses(data.assignments.map(a => ({
          section: a.section,
          subject: a.subject,
          type: a.session_type
        })))
      }
    } catch (err) {
      console.error('Error fetching assignments:', err)
    }
  }

  const handleUpdateClick = (section, subject, type) => {
    setSelectedClass(section)
    setSelectedSubject(subject)
    setSessionType(type)
    setView('update')
  }

  const handleBackToList = () => {
    setView('list')
    setSelectedClass('')
    setSelectedSubject('')
    setStudents([])
    setAttendance({})
  }

  const fetchStudents = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `http://localhost:5000/api/attendance?class=${selectedClass}&date=${date}&session_type=${sessionType}&subject=${encodeURIComponent(selectedSubject)}`
      )
      const data = await res.json()

      if (data.success) {
        setStudents(data.attendance)
        const attendanceMap = {}
        data.attendance.forEach(student => {
          attendanceMap[student.id] = student.hours_present > 0
          if (student.total_hours) {
            setTotalHours(student.total_hours)
          }
        })
        setAttendance(attendanceMap)
      }
    } catch (err) {
      console.error('Error fetching students:', err)
    }
    setLoading(false)
  }

  const handleAttendanceToggle = (studentId) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }))
  }

  const handleSubmitAttendance = async () => {
    try {
      const promises = students.map(student => {
        const isPresent = attendance[student.id] || false
        return fetch('http://localhost:5000/api/attendance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentId: student.id,
            date: date,
            class: selectedClass,
            subject: selectedSubject,
            session_type: sessionType,
            status: isPresent ? 'Present' : 'Absent',
            hours_present: isPresent ? totalHours : 0,
            total_hours: totalHours,
            remarks: ''
          })
        })
      })

      await Promise.all(promises)
      alert('Attendance submitted successfully')
      handleBackToList()
    } catch (err) {
      console.error('Error submitting attendance:', err)
      alert('Error submitting attendance')
    }
  }

  const presentCount = Object.values(attendance).filter(Boolean).length

  if (view === 'list') {
    return (
      <motion.div
        className="page-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h3 style={{ color: '#2b3674', marginBottom: '20px' }}>My Assigned Classes</h3>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{ background: '#f4f7fe', borderBottom: '2px solid #e0e0e0' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#2b3674' }}>Section</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#2b3674' }}>Subject</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#2b3674' }}>Type</th>
                <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#2b3674' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {assignedClasses.map((cls, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e0e0e0' }}>
                  <td style={{ padding: '12px', color: '#2b3674', fontWeight: '500' }}>{cls.section}</td>
                  <td style={{ padding: '12px', color: '#2b3674' }}>{cls.subject}</td>
                  <td style={{ padding: '12px', color: '#2b3674' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '6px',
                      background: cls.type === 'Lab' ? '#E6F8F1' : '#F4F7FE',
                      color: cls.type === 'Lab' ? '#0CA678' : '#4318ff',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {cls.type}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button
                      onClick={() => handleUpdateClick(cls.section, cls.subject, cls.type)}
                      style={{
                        padding: '8px 20px',
                        background: '#4318ff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '14px'
                      }}
                    >
                      Update Attendance
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="page-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button
          onClick={handleBackToList}
          style={{
            padding: '8px 16px',
            background: '#e0e0e0',
            color: '#2b3674',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          ← Back
        </button>
        <div>
          <h3 style={{ color: '#2b3674', margin: 0 }}>Update Attendance</h3>
          <p style={{ color: '#a3aed0', margin: '5px 0 0 0', fontSize: '14px' }}>
            {selectedSubject} - {selectedClass} ({sessionType})
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              padding: '10px 15px',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none'
            }}
          />

          <input
            type="number"
            min="1"
            max="8"
            value={totalHours}
            onChange={(e) => setTotalHours(parseInt(e.target.value) || 1)}
            placeholder="Total Hours"
            style={{
              padding: '10px 15px',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              width: '120px'
            }}
          />

          <button
            onClick={fetchStudents}
            style={{
              padding: '10px 20px',
              background: '#4318ff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Load Students
          </button>
        </div>
      </div>

      {students.length > 0 && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '15px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ marginBottom: '15px', color: '#a3aed0', fontWeight: '600' }}>
            Present: {presentCount} / {students.length} | Total Hours: {totalHours} per student | Session: {sessionType}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
          ) : (
            <>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginBottom: '20px'
              }}>
                <thead>
                  <tr style={{ background: '#f4f7fe', borderBottom: '2px solid #e0e0e0' }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#2b3674', paddingLeft: '40px' }}>Present</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#2b3674' }}>Roll No</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#2b3674' }}>Student Name</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => {
                    const isPresent = attendance[student.id] || false
                    return (
                      <tr
                        key={student.id}
                        style={{
                          borderBottom: '1px solid #e0e0e0',
                          background: isPresent ? '#E6F8F1' : 'white'
                        }}
                      >
                        <td style={{ padding: '12px', paddingLeft: '40px' }}>
                          <input
                            type="checkbox"
                            checked={isPresent}
                            onChange={() => handleAttendanceToggle(student.id)}
                            style={{
                              cursor: 'pointer',
                              width: '18px',
                              height: '18px'
                            }}
                          />
                        </td>
                        <td style={{ padding: '12px', color: '#2b3674', fontWeight: '500' }}>
                          {student.roll}
                        </td>
                        <td style={{ padding: '12px', color: '#2b3674' }}>
                          {student.name}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              <button
                onClick={handleSubmitAttendance}
                style={{
                  padding: '10px 20px',
                  background: '#0CA678',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Submit Attendance
              </button>
            </>
          )}
        </div>
      )}
    </motion.div>
  )
}

export default AttendancePage
