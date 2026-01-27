import React, { useState } from 'react'
import { motion } from 'framer-motion'
import AdminLayout from './AdminLayout'
import '../../App.css'

export default function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const teachers = [
    { id: 1, name: 'Dr. Johnson', email: 'johnson@school.edu', subject: 'Computer Science', experience: '8 years', status: 'Active' },
    { id: 2, name: 'Prof. Davis', email: 'davis@school.edu', subject: 'Mathematics', experience: '12 years', status: 'Active' },
    { id: 3, name: 'Ms. Wilson', email: 'wilson@school.edu', subject: 'Physics', experience: '5 years', status: 'Active' },
    { id: 4, name: 'Dr. Brown', email: 'brown@school.edu', subject: 'Chemistry', experience: '10 years', status: 'On Leave' },
  ]

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
            <div className="section-title">Teachers Management</div>
            <motion.button
              className="banner-btn"
              style={{ background: '#4318ff', color: 'white', padding: '10px 20px', borderRadius: '10px', border: 'none' }}
              whileHover={{ scale: 1.05 }}
              onClick={() => alert('Add new teacher form')}
            >
              Add New Teacher
            </motion.button>
          </div>

          <input
            type="text"
            placeholder="Search teachers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              border: '2px solid #f1f5f9',
              background: 'white',
              fontSize: '14px',
              width: '300px',
              marginBottom: '24px',
              outline: 'none'
            }}
          />

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', color: '#a3aed0', fontSize: '14px', fontWeight: '500', padding: '12px' }}>Teacher</th>
                  <th style={{ textAlign: 'left', color: '#a3aed0', fontSize: '14px', fontWeight: '500', padding: '12px' }}>Subject</th>
                  <th style={{ textAlign: 'left', color: '#a3aed0', fontSize: '14px', fontWeight: '500', padding: '12px' }}>Experience</th>
                  <th style={{ textAlign: 'left', color: '#a3aed0', fontSize: '14px', fontWeight: '500', padding: '12px' }}>Status</th>
                  <th style={{ textAlign: 'left', color: '#a3aed0', fontSize: '14px', fontWeight: '500', padding: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.map(teacher => (
                  <motion.tr key={teacher.id} style={{ background: 'white' }} whileHover={{ scale: 1.01 }}>
                    <td style={{ padding: '16px', borderRadius: '12px 0 0 12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '40px', height: '40px', borderRadius: '50%', background: '#4318ff',
                          color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700'
                        }}>
                          {teacher.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', color: '#2b3674' }}>{teacher.name}</div>
                          <div style={{ fontSize: '12px', color: '#a3aed0' }}>{teacher.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px', fontWeight: '600', color: '#2b3674' }}>{teacher.subject}</td>
                    <td style={{ padding: '16px', fontWeight: '600', color: '#2b3674' }}>{teacher.experience}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
                        background: teacher.status === 'Active' ? '#dcfce7' : '#fee2e2',
                        color: teacher.status === 'Active' ? '#16a34a' : '#dc2626'
                      }}>
                        {teacher.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px', borderRadius: '0 12px 12px 0' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <motion.button
                          style={{ padding: '8px 12px', borderRadius: '8px', border: 'none', background: '#f4f7fe', color: '#4318ff', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
                          whileHover={{ background: '#4318ff', color: 'white' }}
                          onClick={() => alert(`View ${teacher.name} details`)}
                        >
                          View
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  )
}