import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const AttendancePage = () => {
  const [selectedClass, setSelectedClass] = useState('')
  const [sessionType, setSessionType] = useState('Theory')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [students, setStudents] = useState([])
  const [attendance, setAttendance] = useState({})
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchClasses()
  }, [])

  useEffect(() => {
    if (selectedClass) {
      fetchStudents()
    }
  }, [selectedClass, date, sessionType])

  const fetchClasses = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users?role=student')
      const data = await res.json()
      const uniqueClasses = [...new Set(
        data.users.map(s => `${s.department}${s.sec}`)
      )].sort()
      setClasses(uniqueClasses)
    } catch (err) {
      console.error('Error fetching classes:', err)
    }
  }

  const fetchStudents = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `http://localhost:5000/api/attendance?class=${selectedClass}&date=${date}&session_type=${sessionType}`
      )
      const data = await res.json()
      
      if (data.success) {
        setStudents(data.attendance)
        const attendanceMap = {}
        data.attendance.forEach(student => {
          attendanceMap[student.id] = student.status === 'Present'
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
      const promises = students.map(student => 
        fetch('http://localhost:5000/api/attendance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentId: student.id,
            date: date,
            class: selectedClass,
            session_type: sessionType,
            status: attendance[student.id] ? 'Present' : 'Absent',
            remarks: ''
          })
        })
      )
      
      await Promise.all(promises)
      alert('Attendance submitted successfully')
    } catch (err) {
      console.error('Error submitting attendance:', err)
      alert('Error submitting attendance')
    }
  }

  const presentCount = Object.values(attendance).filter(Boolean).length

  return (
    <motion.div 
      className="page-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#2b3674', marginBottom: '15px' }}>Mark Attendance</h3>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            style={{
              padding: '10px 15px',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              minWidth: '150px'
            }}
          >
            <option value="">Select Class</option>
            {classes.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>

          <select
            value={sessionType}
            onChange={(e) => setSessionType(e.target.value)}
            style={{
              padding: '10px 15px',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              minWidth: '120px'
            }}
          >
            <option value="Theory">Theory</option>
            <option value="Lab">Lab</option>
          </select>

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
        </div>
      </div>

      {selectedClass && (
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ marginBottom: '15px', color: '#a3aed0', fontWeight: '600' }}>
            Present: {presentCount} / {students.length} | Session: {sessionType}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
          ) : students.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>No students found</div>
          ) : (
            <>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginBottom: '20px'
              }}>
                <thead>
                  <tr style={{ background: '#f4f7fe', borderBottom: '2px solid #e0e0e0' }}>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#2b3674' }}>Present</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#2b3674' }}>Roll No</th>
                    <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#2b3674' }}>Student Name</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr 
                      key={student.id}
                      style={{ 
                        borderBottom: '1px solid #e0e0e0',
                        background: attendance[student.id] ? '#E6F8F1' : 'white'
                      }}
                    >
                      <td style={{ padding: '12px' }}>
                        <input 
                          type="checkbox"
                          checked={attendance[student.id] || false}
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
                  ))}
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
