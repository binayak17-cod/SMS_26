import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const ResultPage = () => {
  const [teacherId, setTeacherId] = useState('')
  const [assignments, setAssignments] = useState([])
  const [sections, setSections] = useState([])
  const [semesters, setSemesters] = useState([])
  const [subjects, setSubjects] = useState([])
  const [students, setStudents] = useState([])

  const [selectedSection, setSelectedSection] = useState('')
  const [selectedSemester, setSelectedSemester] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedExamType, setSelectedExamType] = useState('Internal')
  const [selectedStudentId, setSelectedStudentId] = useState('')

  const [marks, setMarks] = useState('')
  const [totalMarks, setTotalMarks] = useState('100')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState('')

  // Get teacher ID from localStorage
  useEffect(() => {
    const id = localStorage.getItem('userId')
    if (id) {
      setTeacherId(id)
      fetchAssignments(id)
    }
  }, [])

  // Derive unique semesters from assignments
  useEffect(() => {
    const uniqueSemesters = [...new Set(assignments.map(a => a.semester))].sort()
    setSemesters(uniqueSemesters)
    if (uniqueSemesters.length > 0 && !selectedSemester) {
      setSelectedSemester(uniqueSemesters[0])
    }
  }, [assignments])

  // When semester changes, derive sections for that semester
  useEffect(() => {
    if (!selectedSemester) return
    const secs = [...new Set(
      assignments.filter(a => a.semester === selectedSemester).map(a => a.section)
    )].sort()
    setSections(secs)
    if (secs.length > 0 && !secs.includes(selectedSection)) {
      setSelectedSection(secs[0])
    }
  }, [selectedSemester, assignments])

  // When section or semester changes, derive subjects
  useEffect(() => {
    if (!selectedSection || !selectedSemester) return
    const subs = assignments
      .filter(a => a.section === selectedSection && a.semester === selectedSemester)
      .map(a => a.subject)
    const uniqueSubs = [...new Set(subs)].sort()
    setSubjects(uniqueSubs)
    if (uniqueSubs.length > 0 && !uniqueSubs.includes(selectedSubject)) {
      setSelectedSubject(uniqueSubs[0])
    }
    
    // Also fetch students for this section and semester
    fetchStudents(selectedSection, selectedSemester)
  }, [selectedSection, selectedSemester, assignments])

  const fetchAssignments = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/teacher-assignments/${id}`)
      if (res.ok) {
        const data = await res.json()
        setAssignments(data.assignments || [])
      }
    } catch (err) {
      console.error('Error fetching assignments:', err)
    }
  }

  const fetchStudents = async (section, semester) => {
    try {
      const res = await fetch('http://localhost:5000/api/users?role=student')
      if (res.ok) {
        const data = await res.json()
        const allStudents = data.users || []
        const filtered = allStudents.filter(
          s => `${s.department}${s.sec}` === section && s.semester === semester
        )
        setStudents(filtered)
        setSelectedStudentId('')
      }
    } catch (err) {
      console.error('Error fetching students:', err)
    }
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedStudentId || !selectedSubject || !marks) {
      showToast('Please fill all required fields')
      return
    }

    const marksNum = parseFloat(marks)
    const totalNum = parseFloat(totalMarks) || 100
    if (isNaN(marksNum) || marksNum < 0) {
      showToast('Please enter valid marks')
      return
    }
    if (marksNum > totalNum) {
      showToast(`Marks cannot exceed ${totalNum}`)
      return
    }

    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: selectedStudentId,
          semester: selectedSemester,
          examType: selectedExamType,
          subject: selectedSubject,
          marks: marksNum,
          totalMarks: totalNum
        })
      })

      const data = await res.json()

      if (res.ok && data.success) {
        showToast(`✓ ${data.message}`)
        setMarks('')
      } else {
        showToast(`Error: ${data.message || 'Failed to submit marks'}`)
      }
    } catch (error) {
      console.error('Error uploading marks:', error)
      showToast('Failed to connect to the server')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #e0e0e0',
    background: '#f4f7fe',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.2s',
  }

  const labelStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#2b3674',
    marginBottom: '6px',
    display: 'block'
  }

  const selectedStudent = students.find(s => s.id === selectedStudentId)

  return (
    <motion.div
      className="page-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ margin: 0, color: '#2b3674' }}>Upload Results</h3>
        <p style={{ margin: 0, color: '#a3aed0', fontSize: '14px' }}>Select section, student and subject to update marks</p>
      </div>

      <div className="card-section" style={{ maxWidth: '650px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Row 1: Semester & Section */}
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Semester</label>
              <select
                value={selectedSemester}
                onChange={(e) => {
                  setSelectedSemester(e.target.value)
                  // Student will visually reset because the useEffect fetches students and resets selectedStudentId
                }}
                required
                style={inputStyle}
              >
                <option value="">Select Semester</option>
                {semesters.map(sem => (
                  <option key={sem} value={sem}>{sem}</option>
                ))}
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Section</label>
              <select
                value={selectedSection}
                onChange={(e) => {
                  setSelectedSection(e.target.value)
                }}
                required
                disabled={!selectedSemester}
                style={{ ...inputStyle, opacity: !selectedSemester ? 0.6 : 1 }}
              >
                <option value="">Select Section</option>
                {sections.map(sec => (
                  <option key={sec} value={sec}>{sec}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Student ID dropdown */}
          <div>
            <label style={labelStyle}>Student Name / ID</label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              required
              style={inputStyle}
            >
              <option value="">Select Student</option>
              {students.map(s => (
                <option key={s.id} value={s.id}>
                  {s.id} — {s.name}
                </option>
              ))}
            </select>
            {selectedStudent && (
              <div style={{ marginTop: '6px', fontSize: '12px', color: '#6b7280' }}>
                Selected: <strong>{selectedStudent.name}</strong> ({selectedStudent.id})
              </div>
            )}
          </div>

          {/* Row 3: Subject & Exam Type */}
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                required
                disabled={!selectedSemester}
                style={{ ...inputStyle, opacity: !selectedSemester ? 0.6 : 1 }}
              >
                <option value="">Select Subject</option>
                {subjects.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Exam Type</label>
              <select
                value={selectedExamType}
                onChange={(e) => setSelectedExamType(e.target.value)}
                required
                style={inputStyle}
              >
                <option value="Internal">Internal</option>
                <option value="Semester">Semester</option>
              </select>
            </div>
          </div>

          {/* Row 4: Marks */}
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Marks Obtained</label>
              <input
                type="number"
                placeholder="e.g. 85"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                required
                min="0"
                max={totalMarks}
                style={inputStyle}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Total Marks</label>
              <input
                type="number"
                value={totalMarks}
                onChange={(e) => setTotalMarks(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="banner-btn"
            style={{
              background: loading ? '#a0aec0' : '#4318ff',
              color: 'white',
              marginTop: '10px',
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '15px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s'
            }}
          >
            {loading ? 'Uploading...' : 'Upload Marks'}
          </button>
        </form>
      </div>

      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: toast.startsWith('Error') ? '#fee2e2' : '#d1fae5',
            color: toast.startsWith('Error') ? '#dc2626' : '#059669',
            padding: '12px 24px',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            zIndex: 1000
          }}
        >
          {toast}
        </motion.div>
      )}
    </motion.div>
  )
}

export default ResultPage
