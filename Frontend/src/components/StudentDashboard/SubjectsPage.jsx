import React, { useState, useEffect } from 'react'
import StudentLayout from './StudentLayout'
import '../../App.css'

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState([])
  const [semesters, setSemesters] = useState([])
  const [selectedSemester, setSelectedSemester] = useState('')
  const [searchCourse, setSearchCourse] = useState('')
  const [loading, setLoading] = useState(true)
  const [studentName, setStudentName] = useState('Student')
  const [studentClass, setStudentClass] = useState('')

  useEffect(() => {
    const studentId = localStorage.getItem('userId')
    if (studentId) {
      fetchSubjects(studentId)
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (selectedSemester) {
      const studentId = localStorage.getItem('userId')
      if (studentId) {
        fetchSubjects(studentId, selectedSemester)
      }
    }
  }, [selectedSemester])

  const fetchSubjects = async (id, semester) => {
    setLoading(true)
    try {
      let url = `http://localhost:5000/api/student/subjects?studentId=${id}`
      if (semester) {
        url += `&semester=${encodeURIComponent(semester)}`
      }
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch subjects')
      const data = await res.json()

      if (data.success) {
        setSubjects(data.subjects || [])
        if (data.semesters && data.semesters.length > 0) {
          setSemesters(data.semesters)
          if (!selectedSemester) {
            // Default to the latest semester
            setSelectedSemester(data.semesters[data.semesters.length - 1])
          }
        }
        if (data.student?.name) setStudentName(data.student.name)
        if (data.student?.class) setStudentClass(data.student.class)
      }
    } catch (err) {
      console.error('Error fetching subjects:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredSubjects = subjects.filter(s => {
    const q = searchCourse.toLowerCase()
    return !q || s.subject.toLowerCase().includes(q) || s.teacher.toLowerCase().includes(q)
  })

  const getSessionColor = (type) => {
    if (type === 'Lab') return { bg: '#d1fae5', color: '#065f46' }
    return { bg: '#dbeafe', color: '#1e40af' }
  }

  return (
    <StudentLayout studentName={studentName}>
      <div style={{ padding: '30px', background: '#f8f9fa', minHeight: '100vh' }}>
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ margin: '0 0 5px 0', fontSize: '28px', fontWeight: '600', color: '#2b3674' }}>My Subjects</h2>
          <p style={{ margin: 0, color: '#8f9bba', fontSize: '14px' }}>
            {studentClass && <span>Section: {studentClass} • </span>}
            {selectedSemester && <span>{selectedSemester} • </span>}
            {subjects.length} subject{subjects.length !== 1 ? 's' : ''} assigned
          </p>
        </div>

       
        <div style={{ display: 'flex', gap: '12px', marginBottom: '25px', flexWrap: 'wrap', alignItems: 'center' }}>
          
          {semesters.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#2b3674' }}>Semester:</label>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                style={{
                  padding: '10px 14px',
                  border: '1px solid #e0e5f2',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: 'white',
                  color: '#2b3674',
                  outline: 'none',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                {semesters.map(sem => (
                  <option key={sem} value={sem}>{sem}</option>
                ))}
              </select>
            </div>
          )}

          {/* Search */}
          <input
            type="text"
            placeholder="Search subjects or teachers..."
            value={searchCourse}
            onChange={(e) => setSearchCourse(e.target.value)}
            style={{
              padding: '10px 16px',
              border: '1px solid #e0e5f2',
              borderRadius: '8px',
              fontSize: '14px',
              flex: '1',
              minWidth: '200px',
              maxWidth: '400px',
              background: 'white',
              color: '#2b3674',
              outline: 'none'
            }}
          />
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#8f9bba' }}>
            <p>Loading subjects...</p>
          </div>
        ) : (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '20px'
            }}>
              {filteredSubjects.map(subject => {
                const sessionStyle = getSessionColor(subject.session_type)
                return (
                  <div key={subject.id} style={{
                    background: 'white',
                    border: '1px solid #e0e5f2',
                    borderRadius: '12px',
                    padding: '20px',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                    cursor: 'default'
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                      <div>
                        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600', color: '#2b3674' }}>
                          {subject.subject}
                        </h3>
                        <span style={{
                          display: 'inline-block',
                          background: '#f8f1f1ff',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: sessionStyle.color
                        }}>
                          {subject.session_type}
                        </span>
                      </div>
                      <span style={{
                        
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        color: '#1c1c1dff',
                        fontWeight: '600'
                      }}>
                        {subject.semester}
                      </span>
                    </div>

                    <div style={{ fontSize: '13px', color: '#2b3674', lineHeight: '1.8' }}>
                      <div style={{ marginBottom: '8px' }}>
                        <span style={{ color: '#8f9bba', fontWeight: '500' }}>Instructor:</span> {subject.teacher}
                      </div>
                      <div>
                        <span style={{ color: '#8f9bba', fontWeight: '500' }}>Section:</span> {subject.section}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {filteredSubjects.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#8f9bba' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}>
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <div style={{ fontSize: '16px', fontWeight: '500' }}>
                  {searchCourse ? 'No subjects match your search' : 'No subjects assigned for this semester'}
                </div>
                <p style={{ fontSize: '13px', marginTop: '8px' }}>
                  {searchCourse ? 'Try a different search term' : 'Subjects will appear here once assigned by a teacher'}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </StudentLayout>
  )
}
