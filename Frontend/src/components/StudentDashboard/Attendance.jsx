import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import StudentLayout from './StudentLayout'

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [assignedSubjects, setAssignedSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [studentName, setStudentName] = useState('Student')

  useEffect(() => {
    const studentId = localStorage.getItem('userId')
    if (studentId) {
      fetchData(studentId)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchData = async (id) => {
    setLoading(true)
    try {
      const [attendanceRes, subjectsRes] = await Promise.all([
        fetch(`http://localhost:5000/api/student/attendance?studentId=${id}`),
        fetch(`http://localhost:5000/api/student/subjects?studentId=${id}`)
      ])

      if (attendanceRes.ok) {
        const data = await attendanceRes.json()
        if (data.success) {
          setAttendanceRecords(data.attendance || [])
          if (data.student?.name) {
            setStudentName(data.student.name)
          }
        }
      }

      if (subjectsRes.ok) {
        const data = await subjectsRes.json()
        if (data.success) {
          setAssignedSubjects(data.subjects || [])
        }
      }
    } catch (err) {
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  const getColKey = (subject, sessionType) => {
    const suffix = sessionType === 'Theory' ? 'T' : 'L'
    return `${subject}-${suffix}`
  }

  const getSubjectColumns = () => {
    if (assignedSubjects.length > 0) {
      const seen = new Set()
      return assignedSubjects
        .map(s => ({
          key: getColKey(s.subject, s.session_type),
          label: s.subject,
          sessionType: s.session_type
        }))
        .filter(c => {
          if (seen.has(c.key)) return false
          seen.add(c.key)
          return true
        })
        .sort((a, b) => a.label.localeCompare(b.label))
    }

    if (attendanceRecords.length > 0) {
      const colMap = new Map()
      attendanceRecords.forEach(record => {
        const subj = record.subject && record.subject.trim() ? record.subject.trim() : record.session_type
        const key = getColKey(subj, record.session_type)
        if (!colMap.has(key)) {
          colMap.set(key, { key, label: subj, sessionType: record.session_type })
        }
      })
      return Array.from(colMap.values()).sort((a, b) => a.label.localeCompare(b.label))
    }

    return []
  }

  const getDayWiseData = () => {
    if (!attendanceRecords || attendanceRecords.length === 0) return []
    const datesMap = {}
    attendanceRecords.forEach(record => {
      if (!datesMap[record.date]) {
        datesMap[record.date] = {}
      }
      const subj = record.subject && record.subject.trim() ? record.subject.trim() : record.session_type
      const key = getColKey(subj, record.session_type)
      if (!datesMap[record.date][key]) {
        datesMap[record.date][key] = { present: 0, total: 0 }
      }
      datesMap[record.date][key].total += 1
      if (record.status === 'Present') {
        datesMap[record.date][key].present += 1
      }
    })

    return Object.keys(datesMap).sort((a, b) => new Date(b) - new Date(a)).map(date => ({
      date,
      ...datesMap[date]
    }))
  }

  const columns = getSubjectColumns()
  const dayWiseData = getDayWiseData()

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
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '700', color: '#1f2937', borderBottom: '2px solid #e2e8f0', borderRight: '1px solid #e2e8f0', position: 'sticky', left: 0, background: '#f8fafc', zIndex: 1 }}>
                    Attendance Date
                  </th>
                  {columns.map(col => (
                    <th key={col.key} style={{ padding: '10px 12px', textAlign: 'center', fontWeight: '700', color: '#1f2937', borderBottom: '2px solid #e2e8f0', borderRight: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>
                      <div>{col.label}</div>
                      <div style={{ fontSize: '10px', fontWeight: '500', color: '#6b7280', marginTop: '2px' }}>
                        ({col.sessionType})
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dayWiseData.map((row, idx) => (
                  <tr key={row.date} style={{ background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0', color: '#4b5563', position: 'sticky', left: 0, background: idx % 2 === 0 ? '#ffffff' : '#f8fafc', zIndex: 1, whiteSpace: 'nowrap' }}>
                      {new Date(row.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-')}
                    </td>
                    {columns.map(col => {
                      const cell = row[col.key]
                      let cellText = '-'
                      let cellBg = 'transparent'
                      let cellColor = '#9ca3af'

                      if (cell && cell.total > 0) {
                        cellText = `${cell.present}/${cell.total}`
                        if (cell.present === cell.total) {
                          
                          cellBg = '#d1fae5'
                          cellColor = '#059669'
                        } else if (cell.present === 0) {
                          
                          cellBg = '#fee2e2'
                          cellColor = '#dc2626'
                        } else {
                       
                          cellBg = '#fef3c7'
                          cellColor = '#d97706'
                        }
                      }

                      return (
                        <td key={col.key} style={{
                          padding: '10px 12px',
                          borderBottom: '1px solid #e2e8f0',
                          borderRight: '1px solid #e2e8f0',
                          background: cellBg,
                          color: cellColor,
                          textAlign: 'center',
                          fontWeight: cell ? '700' : '400',
                          fontSize: '14px'
                        }}>
                          {cellText}
                        </td>
                      )
                    })}
                  </tr>
                ))}
                {dayWiseData.length === 0 && (
                  <tr>
                    <td colSpan={columns.length + 1} style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>
                      No attendance records found yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Legend */}
         
        </div>
      </motion.div>
    </StudentLayout>
  )
}

export default Attendance