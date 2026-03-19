import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import StudentLayout from './StudentLayout'

const Attendance = () => {
  const [attendanceStats, setAttendanceStats] = useState(null)
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [subjectsStats, setSubjectsStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [studentName, setStudentName] = useState('Student')

  useEffect(() => {
    const studentId = localStorage.getItem('userId')
    if (studentId) {
      fetchAttendance(studentId)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchAttendance = async (id) => {
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:5000/api/student/attendance?studentId=${id}`)
      if (!res.ok) throw new Error('Failed to fetch attendance')
      const data = await res.json()

      if (data.success) {
        setAttendanceStats(data.statistics)
        setAttendanceRecords(data.attendance || [])
        setSubjectsStats(data.subjects_stats || [])
        if (data.student?.name) {
          setStudentName(data.student.name)
        }
      }
    } catch (err) {
      console.error('Error fetching attendance:', err)
    } finally {
      setLoading(false)
    }
  }

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return '#10b981'
    if (percentage >= 75) return '#3b82f6'
    if (percentage >= 60) return '#f59e0b'
    return '#ef4444'
  }

  const getColName = (record) => {
    const subj = record.subject && record.subject.trim() ? record.subject.trim() : record.session_type
    const suffix = record.session_type === 'Theory' ? 'T' : 'L'
    return `${subj}-${suffix}`
  }

  const getSubjectColumns = () => {
    if (!attendanceRecords || attendanceRecords.length === 0) return []
    const cols = new Set()
    attendanceRecords.forEach(record => {
      cols.add(getColName(record))
    })
    return Array.from(cols).sort()
  }

  const getDayWiseData = () => {
    if (!attendanceRecords || attendanceRecords.length === 0) return []
    const datesMap = {}
    attendanceRecords.forEach(record => {
      if (!datesMap[record.date]) {
        datesMap[record.date] = {}
      }
      datesMap[record.date][getColName(record)] = record.status
    })

    return Object.keys(datesMap).sort((a, b) => new Date(b) - new Date(a)).map(date => ({
      date,
      ...datesMap[date]
    }))
  }

  return (
    <StudentLayout studentName={studentName}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="card-section" style={{ marginTop: '24px' }}>
          <div className="section-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#374151', fontWeight: '600' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Day Wise Attendance
            </div>
          </div>

          <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px', marginTop: '15px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', background: 'white' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '700', color: '#1f2937', borderBottom: '2px solid #e2e8f0', borderRight: '1px solid #e2e8f0' }}>Attendance Date</th>
                  {getSubjectColumns().map(col => (
                    <th key={col} style={{ padding: '10px 12px', textAlign: 'center', fontWeight: '700', color: '#1f2937', borderBottom: '2px solid #e2e8f0', borderRight: '1px solid #e2e8f0' }}>
                      {col.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {getDayWiseData().map((row, idx) => (
                  <tr key={row.date} style={{ background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0', color: '#4b5563' }}>
                      {new Date(row.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-')}
                    </td>
                    {getSubjectColumns().map(col => {
                      const status = row[col]
                      let cellText = 'NC'
                      let cellBg = 'transparent'

                      if (status === 'Present') {
                        cellText = '1/1'
                        cellBg = '#bfdbfe'
                      } else if (status === 'Absent') {
                        cellText = '0/1'
                        cellBg = '#fca5a5'
                      } else if (status === 'Late') {
                        cellText = '0.5/1'
                        cellBg = '#fef08a'
                      }

                      return (
                        <td key={col} style={{
                          padding: '10px 12px',
                          borderBottom: '1px solid #e2e8f0',
                          borderRight: '1px solid #e2e8f0',
                          background: cellBg,
                          color: cellText !== 'NC' ? '#1f2937' : '#9ca3af',
                          textAlign: 'center'
                        }}>
                          {cellText}
                        </td>
                      )
                    })}
                  </tr>
                ))}
                {getDayWiseData().length === 0 && (
                  <tr>
                    <td colSpan={getSubjectColumns().length + 1} style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>
                      No attendance records found yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </StudentLayout>
  )
}

export default Attendance