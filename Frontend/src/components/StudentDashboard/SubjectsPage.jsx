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
      instructor: 'Dr. Boina AAnil Kumar',
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
      <div style={{ padding: '20px', background: 'linear-gradient(135deg, #fcf1f1 0%, #e5eaf1 100%)', minHeight: '100vh' }}>
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ margin: '0 0 5px 0', fontSize: '28px', fontWeight: '700', color: '#2d3748', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Current Subjects</h2>
          <p style={{ margin: 0, color: '#4a5568', fontSize: '15px', fontWeight: '500' }}>Spring 2024 • {subjects.length} subjects • {subjects.reduce((sum, s) => sum + s.credits, 0)} total credits</p>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <input 
            type="text"
            placeholder="Search subjects..."
            value={searchCourse}
            onChange={(e) => setSearchCourse(e.target.value)}
            style={{
              padding: '12px 18px',
              border: 'none',
              borderRadius: '25px',
              fontSize: '14px',
              width: '320px',
              maxWidth: '100%',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              color: '#2d3748',
              fontWeight: '500'
            }}
          />
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '20px' 
        }}>
          {filteredSubjects.map(subject => (
            <div key={subject.id} style={{
              background: 'linear-gradient(135deg, #bcbfca 0%, #5b4471 100%)',
              border: 'none',
              borderRadius: '12px',
              padding: '24px',
              color: 'white',
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-4px)'
              e.target.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 8px 32px rgba(102, 126, 234, 0.3)'
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
                    {subject.name}
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
                    {subject.code}
                  </span>
                </div>
                <span style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  color: 'white',
                  fontWeight: '600'
                }}>
                  {subject.credits} credits
                </span>
              </div>
              
              <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.7' }}>
                <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '8px', opacity: 0.4 }}>👨‍🏫</span>
                  <span><strong>Instructor:</strong> {subject.instructor}</span>
                </div>
                <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '8px', opacity: 0.4 }}>⏰</span>
                  <span><strong>Schedule:</strong> {subject.time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '8px', opacity: 0.4}}>📍</span>
                  <span><strong>Room:</strong> {subject.room}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  )
}
