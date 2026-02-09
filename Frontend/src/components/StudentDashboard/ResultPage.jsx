import React, { useState } from 'react'
import StudentLayout from './StudentLayout'

export default function ResultPage() {
  const [openSemester, setOpenSemester] = useState('Fall 2023')

  const results = [
    { id: 1, subject: 'Data Structures & Algorithms', code: 'CS201', score: 87, grade: 'A-', date: '2024-01-15', status: 'Pass', semester: 'Fall 2023' },
    { id: 2, subject: 'Operating Systems', code: 'CS301', score: 78, grade: 'B+', date: '2024-01-10', status: 'Pass', semester: 'Fall 2023' },
    { id: 3, subject: 'Discrete Mathematics', code: 'MA210', score: 92, grade: 'A', date: '2023-12-18', status: 'Pass', semester: 'Fall 2023' },
    { id: 4, subject: 'Database Management', code: 'CS302', score: 65, grade: 'C+', date: '2023-12-20', status: 'Pass', semester: 'Fall 2023' },

    { id: 5, subject: 'Computer Networks', code: 'CS401', score: 81, grade: 'B+', date: '2023-06-10', status: 'Pass', semester: 'Spring 2023' },
    { id: 6, subject: 'Software Engineering', code: 'CS402', score: 89, grade: 'A-', date: '2023-06-15', status: 'Pass', semester: 'Spring 2023' },
  ]

  const gradePoints = {
    'A': 4, 'A-': 3.7, 'B+': 3.3, 'B': 3,
    'C+': 2.3, 'C': 2, 'D': 1, 'F': 0
  }

  const semesters = [...new Set(results.map(r => r.semester))]

  const calculateStats = (list) => {
    const avg = Math.round(list.reduce((s, r) => s + r.score, 0) / list.length)
    const gpa = (
      list.reduce((s, r) => s + (gradePoints[r.grade] || 0), 0) / list.length
    ).toFixed(2)
    return { avg, gpa }
  }

  const gradeColor = (g) =>
    g.startsWith('A') ? '#16a34a' :
    g.startsWith('B') ? '#2563eb' :
    g.startsWith('C') ? '#d97706' : '#dc2626'

  return (
    <StudentLayout>
      <div style={{ padding: '32px', background: '#f8fafc', minHeight: '100vh' }}>

        <h2 style={{ marginBottom: '24px', fontSize: '26px' }}>
          Academic Results
        </h2>

        {semesters.map(semester => {
          const semesterResults = results.filter(r => r.semester === semester)
          const { avg, gpa } = calculateStats(semesterResults)
          const isOpen = openSemester === semester

          return (
            <div key={semester} style={{
              marginBottom: '18px',
              background: 'white',
              borderRadius: '14px',
              boxShadow: '0 4px 12px rgba(0,0,0,.08)'
            }}>
              {/* Semester Header */}
              <div
                onClick={() => setOpenSemester(isOpen ? null : semester)}
                style={{
                  padding: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: isOpen ? '1px solid #e5e7eb' : 'none'
                }}
              >
                <div>
                  <h3 style={{ margin: 0 }}>{semester}</h3>
                  <small style={{ color: '#64748b' }}>
                    GPA {gpa} • Avg {avg}%
                  </small>
                </div>
                <span style={{ fontSize: '22px' }}>
                  {isOpen ? '▾' : '▸'}
                </span>
              </div>

              {/* Subjects */}
              {isOpen && (
                <div style={{ padding: '20px' }}>
                  {semesterResults.map(r => (
                    <div key={r.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '14px 0',
                      borderBottom: '1px solid #f1f5f9'
                    }}>
                      <div>
                        <div style={{ fontWeight: 600 }}>{r.subject}</div>
                        <small style={{ color: '#64748b' }}>
                          {r.code} • {new Date(r.date).toLocaleDateString()}
                        </small>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          fontWeight: 700,
                          color: gradeColor(r.grade)
                        }}>
                          {r.grade}
                        </div>
                        <small>{r.score}%</small>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}

      </div>
    </StudentLayout>
  )
}
