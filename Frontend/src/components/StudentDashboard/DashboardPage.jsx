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
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [showSubjectWise, setShowSubjectWise] = useState(false);

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
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/student/attendance?studentId=${id}`
      );

      if (!res.ok) {
        throw new Error('Failed to fetch attendance');
      }

      const data = await res.json();

      if (data.success) {
        setAttendanceStats(data.statistics);
        setAttendanceRecords(data.attendance || []);
        if (data.student?.name) {
          setStudentName(data.student.name);
        }
      }
    } catch (err) {
      console.error("Error fetching attendance:", err);
    } finally {
      setLoading(false);
    }
  }

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return '#10b981';
    if (percentage >= 75) return '#3b82f6';
    if (percentage >= 60) return '#f59e0b';
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

  const getColName = (record) => {
    const subj = record.subject && record.subject.trim() ? record.subject.trim() : record.session_type;
    const suffix = record.session_type === 'Theory' ? 'T' : 'L';
    return `${subj}-${suffix}`;
  };

  const getSubjectColumns = () => {
    if (!attendanceRecords || attendanceRecords.length === 0) return [];
    const cols = new Set();
    attendanceRecords.forEach(record => {
      cols.add(getColName(record));
    });
    return Array.from(cols).sort();
  };

  const getDayWiseData = () => {
    if (!attendanceRecords || attendanceRecords.length === 0) return [];
    const datesMap = {};
    attendanceRecords.forEach(record => {
      if (!datesMap[record.date]) {
        datesMap[record.date] = {};
      }
      datesMap[record.date][getColName(record)] = record.status;
    });

    // Sort dates descending
    return Object.keys(datesMap).sort((a, b) => new Date(b) - new Date(a)).map(date => ({
      date,
      ...datesMap[date]
    }));
  };

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

          {/* Attendance Overview */}
          <div className="card-section">
            <div className="section-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Attendance Overview</span>
              <button
                onClick={() => setShowSubjectWise(!showSubjectWise)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0e7490',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  textDecoration: 'underline'
                }}
              >
                {showSubjectWise ? 'Hide Subject Wise Attendance' : 'View Subject Wise Attendance'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                  <path d="m9 12 3 3 3-3" />
                </svg>
              </button>
            </div>

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

            {/* Day Wise Attendance Table */}
            {showSubjectWise && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                style={{ marginTop: '20px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px', color: '#374151', fontWeight: '600' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Day Wise Attendance
                </div>

                <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', background: 'white' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc' }}>
                        <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '700', color: '#1f2937', borderBottom: '2px solid #e2e8f0', borderRight: '1px solid #e2e8f0' }}>AttendanceDate</th>
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
                            const status = row[col];
                            let cellText = 'NC';
                            let cellBg = 'transparent';

                            if (status === 'Present') {
                              cellText = '1/1';
                              cellBg = '#bfdbfe'; // Light blue like image
                            } else if (status === 'Absent') {
                              cellText = '0/1';
                              cellBg = '#fca5a5'; // Light red like image
                            } else if (status === 'Late') {
                              cellText = '0.5/1';
                              cellBg = '#fef08a'; // Yellow
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
                            );
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
              </motion.div>
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