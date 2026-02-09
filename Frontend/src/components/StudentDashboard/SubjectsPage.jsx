import React, { useState } from 'react'
import StudentLayout from './StudentLayout'
import '../../App.css'

export default function SubjectsPage() {
  const [searchCourse, setSearchCourse] = useState('')

  const subjects = [
    { 
      id: 1, 
      name: 'Data Structures & Algorithms', 
      code: 'CS201', 
      credits: 4, 
      instructor: 'Mr. GVS Narayan',
      time: 'MWF 10:00-11:00 AM',
      room: 'CSB-5'
    },
    { 
      id: 2, 
      name: 'Operating Systems', 
      code: 'CS301', 
      credits: 3, 
      instructor: 'Mr Kedarnath panda',
      time: 'TTh 2:00-3:30 PM',
      room: 'CSB-5'
    },
    { 
      id: 3, 
      name: 'Discrete Mathematics', 
      code: 'MA210', 
      credits: 3, 
      instructor: 'Dr. Boina Anil Kumar',
      time: 'MW 1:00-2:30 PM',
      room: 'CSB-5'
    },
    { 
      id: 4, 
      name: 'Database Management Systems', 
      code: 'CS302', 
      credits: 3, 
      instructor: 'Mr. Sujit Kumar patra',
      time: 'TTh 11:00-12:30 PM',
      room: 'LAB-3'
    }
  ]

  const filteredSubjects = subjects.filter(s => {
    const q = searchCourse.toLowerCase()
    return !q || s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)
  })

  return (
    <StudentLayout>
      <div style={{ padding: '30px', background: '#f8f9fa', minHeight: '100vh' }}>
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ margin: '0 0 5px 0', fontSize: '28px', fontWeight: '600', color: '#2b3674' }}>My Subjects</h2>
          <p style={{ margin: 0, color: '#8f9bba', fontSize: '14px' }}>
            {subjects.length} subjects • {subjects.reduce((sum, s) => sum + s.credits, 0)} credits
          </p>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <input 
            type="text"
            placeholder="Search subjects..."
            value={searchCourse}
            onChange={(e) => setSearchCourse(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '1px solid #e0e5f2',
              borderRadius: '8px',
              fontSize: '14px',
              width: '100%',
              maxWidth: '400px',
              background: 'white',
              color: '#2b3674',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
          gap: '20px' 
        }}>
          {filteredSubjects.map(subject => (
            <div key={subject.id} style={{
              background: 'white',
              border: '1px solid #e0e5f2',
              borderRadius: '12px',
              padding: '20px',
              transition: 'box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: '600', color: '#2b3674' }}>
                    {subject.name}
                  </h3>
                  <span style={{
                    display: 'inline-block',
                    background: '#f4f7fe',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#4318ff'
                  }}>
                    {subject.code}
                  </span>
                </div>
                <span style={{
                  background: '#f4f7fe',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  color: '#2b3674',
                  fontWeight: '600'
                }}>
                  {subject.credits} CR
                </span>
              </div>

              <div style={{ fontSize: '13px', color: '#2b3674', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ color: '#8f9bba', fontWeight: '500' }}>Instructor:</span> {subject.instructor}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ color: '#8f9bba', fontWeight: '500' }}>Schedule:</span> {subject.time}
                </div>
                <div>
                  <span style={{ color: '#8f9bba', fontWeight: '500' }}>Room:</span> {subject.room}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSubjects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#8f9bba' }}>
            <div style={{ fontSize: '16px', fontWeight: '500' }}>No subjects found</div>
          </div>
        )}
      </div>
    </StudentLayout>
  )
}
