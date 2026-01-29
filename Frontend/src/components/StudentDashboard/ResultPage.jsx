import React from 'react'
import StudentLayout from './StudentLayout'
import '../../App.css'

export default function ResultPage() {
  const results = [
    { 
      id: 1,
      subject: 'Data Structures & Algorithms', 
      code: 'CS201',
      score: 87, 
      maxScore: 100,
      date: '2024-01-15', 
      grade: 'A-', 
      status: 'Pass',
      semester: 'Fall 2023'
    },
    { 
      id: 2,
      subject: 'Operating Systems', 
      code: 'CS301',
      score: 78, 
      maxScore: 100,
      date: '2024-01-10', 
      grade: 'B+', 
      status: 'Pass',
      semester: 'Fall 2023'
    },
    { 
      id: 3,
      subject: 'Discrete Mathematics', 
      code: 'MA210',
      score: 92, 
      maxScore: 100,
      date: '2023-12-18', 
      grade: 'A', 
      status: 'Pass',
      semester: 'Fall 2023'
    },
    { 
      id: 4,
      subject: 'Database Management', 
      code: 'CS302',
      score: 65, 
      maxScore: 100,
      date: '2023-12-20', 
      grade: 'C+', 
      status: 'Pass',
      semester: 'Fall 2023'
    },
  ]

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return '#10b981'
    if (grade.startsWith('B')) return '#3b82f6'
    if (grade.startsWith('C')) return '#f59e0b'
    if (grade.startsWith('D')) return '#ef4444'
    return '#6b7280'
  }

  const averageScore = Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length)
  const gpa = (results.reduce((sum, r) => {
    const gradePoints = {
      'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0
    }
    return sum + (gradePoints[r.grade] || 0)
  }, 0) / results.length).toFixed(2)

  return (
    <StudentLayout>
      <div style={{ padding: '20px', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh' }}>
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ margin: '0 0 5px 0', fontSize: '28px', fontWeight: '700', color: '#2d3748', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Academic Results</h2>
          <p style={{ margin: 0, color: '#4a5568', fontSize: '15px', fontWeight: '500' }}>Fall 2023 Semester • GPA: {gpa} • Average: {averageScore}%</p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '20px' 
        }}>
          {results.map(result => (
            <div key={result.id} style={{
              background: 'linear-gradient(135deg, #747779 0%, #55cfd5 100%)',
              border: 'none',
              borderRadius: '12px',
              padding: '24px',
              color: 'white',
              boxShadow: '0 8px 32px rgba(79, 172, 254, 0.3)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-4px)'
              e.target.style.boxShadow = '0 12px 40px rgba(79, 172, 254, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 8px 32px rgba(79, 172, 254, 0.3)'
            }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '16px'
              }}>
                <div>
                  <h3 style={{ 
                    margin: '0 0 8px 0', 
                    fontSize: '20px', 
                    fontWeight: '600',
                    color: 'white'
                  }}>
                    {result.subject}
                  </h3>
                  <span style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: 'white',
                    backdropFilter: 'blur(10px)'
                  }}>
                    {result.code}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '18px',
                    color: 'white',
                    fontWeight: '700',
                    marginBottom: '4px'
                  }}>
                    {result.grade}
                  </div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>
                    {result.score}/{result.maxScore}
                  </div>
                </div>
              </div>
              
              <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.7' }}>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Score:</strong> {result.score}% ({result.status})
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Exam Date:</strong> {new Date(result.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div>
                  <strong>Semester:</strong> {result.semester}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ 
          marginTop: '30px',
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '15px',
          padding: '10px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
         
        }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: '600', color: '#2d3748' }}>Performance Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#3b82f6' }}>{gpa}</div>
              <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Cumulative GPA</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#10b981' }}>{averageScore}%</div>
              <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Average Score</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#f59e0b' }}>{results.length}</div>
              <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Subjects Completed</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#10b981' }}>{results.filter(r => r.status === 'Pass').length}</div>
              <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Subjects Passed</div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  )
}
