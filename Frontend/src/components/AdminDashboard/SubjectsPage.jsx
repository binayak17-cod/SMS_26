import React from 'react'
import { motion } from 'framer-motion'
import AdminLayout from './AdminLayout'
import '../../App.css'

export default function SubjectsPage() {
  const subjects = [
    { id: 1, name: 'Data Structures', code: 'CS201', credits: 4, teacher: 'Dr. Johnson', students: 45 },
    { id: 2, name: 'Operating Systems', code: 'CS301', credits: 3, teacher: 'Prof. Davis', students: 38 },
    { id: 3, name: 'Database Systems', code: 'CS302', credits: 3, teacher: 'Dr. Brown', students: 42 },
    { id: 4, name: 'Discrete Mathematics', code: 'MA210', credits: 3, teacher: 'Ms. Wilson', students: 50 },
  ]

  return (
    <AdminLayout>
      <motion.div
        className="dashboard-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{ gridTemplateColumns: '1fr' }}
      >
        <div className="card-section">
          <div className="section-header">
            <div className="section-title">Subjects Management</div>
            <motion.button
              className="banner-btn"
              style={{ background: '#4318ff', color: 'white', padding: '10px 20px', borderRadius: '10px', border: 'none' }}
              whileHover={{ scale: 1.05 }}
              onClick={() => alert('Add new subject form')}
            >
              Add New Subject
            </motion.button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {subjects.map(subject => (
              <motion.div
                key={subject.id}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0px 18px 40px rgba(112, 144, 176, 0.12)',
                  border: '1px solid #f1f5f9'
                }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ color: '#2b3674', fontWeight: '700', marginBottom: '4px' }}>{subject.name}</h3>
                    <p style={{ color: '#a3aed0', fontSize: '14px' }}>{subject.code}</p>
                  </div>
                  <span style={{
                    background: '#f4f7fe',
                    color: '#4318ff',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {subject.credits} Credits
                  </span>
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#a3aed0', fontSize: '14px' }}>Teacher:</span>
                    <span style={{ color: '#2b3674', fontWeight: '600', fontSize: '14px' }}>{subject.teacher}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#a3aed0', fontSize: '14px' }}>Students:</span>
                    <span style={{ color: '#2b3674', fontWeight: '600', fontSize: '14px' }}>{subject.students}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <motion.button
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '8px',
                      border: 'none',
                      background: '#4318ff',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                    whileHover={{ background: '#3311cc' }}
                    onClick={() => alert(`View ${subject.name} details`)}
                  >
                    View Details
                  </motion.button>
                  <motion.button
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '8px',
                      border: '2px solid #f1f5f9',
                      background: 'white',
                      color: '#2b3674',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                    whileHover={{ borderColor: '#4318ff', color: '#4318ff' }}
                    onClick={() => alert(`Edit ${subject.name}`)}
                  >
                    Edit
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  )
}