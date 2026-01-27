import React, { useState } from 'react'
import { motion } from 'framer-motion'

const AttendancePage = () => {
  const [selectedSection, setSelectedSection] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [attendance, setAttendance] = useState({})

  // Demo sections data (will be connected to database)
  const sectionsData = [
    { id: 1, slNo: 1, batch: 'Batch A', section: 'Section A1', students: 30 },
    { id: 2, slNo: 2, batch: 'Batch A', section: 'Section A2', students: 28 },
    { id: 3, slNo: 3, batch: 'Batch B', section: 'Section B1', students: 32 },
    { id: 4, slNo: 4, batch: 'Batch B', section: 'Section B2', students: 29 },
    { id: 5, slNo: 5, batch: 'Batch C', section: 'Section C1', students: 31 }
  ]

  // Demo students data for selected section
  const getStudentsForSection = (sectionId) => {
    const studentsList = [
      { id: 1, rollNo: '001', name: 'John Smith' },
      { id: 2, rollNo: '002', name: 'Emma Johnson' },
      { id: 3, rollNo: '003', name: 'Michael Brown' },
      { id: 4, rollNo: '004', name: 'Sarah Davis' },
      { id: 5, rollNo: '005', name: 'James Wilson' },
      { id: 6, rollNo: '006', name: 'Olivia Martinez' },
      { id: 7, rollNo: '007', name: 'William Taylor' },
      { id: 8, rollNo: '008', name: 'Sophia Anderson' },
      { id: 9, rollNo: '009', name: 'Benjamin Thomas' },
      { id: 10, rollNo: '010', name: 'Ava Jackson' }
    ]
    return studentsList
  }

  const filteredSections = sectionsData.filter(section =>
    section.batch.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.section.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSectionClick = (section) => {
    setSelectedSection(section)
    setAttendance({})
  }

  const handleAttendanceToggle = (studentId) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }))
  }

  const handleSubmitAttendance = () => {
    console.log('Attendance submitted:', attendance)
    alert('Attendance submitted successfully')
  }

  if (selectedSection) {
    const students = getStudentsForSection(selectedSection.id)
    const presentCount = Object.values(attendance).filter(Boolean).length

    return (
      <motion.div 
        className="page-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={() => setSelectedSection(null)}
            style={{
              padding: '8px 16px',
              background: '#4318ff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              marginBottom: '15px'
            }}
          >
            ← Back to Sections
          </button>
          <h3 style={{ color: '#2b3674', marginTop: '10px' }}>
            Attendance - {selectedSection.batch} / {selectedSection.section}
          </h3>
        </div>

        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ marginBottom: '15px', color: '#a3aed0' }}>
            Present: {presentCount} / {students.length}
          </div>

          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '20px'
          }}>
            <thead>
              <tr style={{ background: '#f4f7fe', borderBottom: '2px solid #e0e0e0' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#2b3674' }}>Select</th>
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
                    {student.rollNo}
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
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#2b3674', marginBottom: '15px' }}>Manage Attendance</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input 
            type="text"
            placeholder="Search by batch or section..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              padding: '10px 15px',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <button 
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
            Search
          </button>
        </div>
      </div>

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
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#2b3674' }}>Sl No</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#2b3674' }}>Batch</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#2b3674' }}>Section</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#2b3674' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSections.map((section) => (
              <tr 
                key={section.id}
                style={{ borderBottom: '1px solid #e0e0e0' }}
              >
                <td style={{ padding: '12px', color: '#2b3674', fontWeight: '500' }}>
                  {section.slNo}
                </td>
                <td style={{ padding: '12px', color: '#2b3674' }}>
                  {section.batch}
                </td>
                <td style={{ padding: '12px', color: '#2b3674' }}>
                  {section.section}
                </td>
                <td style={{ padding: '12px' }}>
                  <button 
                    onClick={() => handleSectionClick(section)}
                    style={{
                      padding: '6px 12px',
                      background: '#4318ff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    Mark Attendance
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

export default AttendancePage
