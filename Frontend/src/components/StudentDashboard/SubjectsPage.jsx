import React, { useState } from 'react'
import { motion } from 'framer-motion'
import StudentLayout from './StudentLayout'
import '../../App.css'

export default function SubjectsPage() {
  const [searchCourse, setSearchCourse] = useState('')

  const courses = [
    { id: 1, name: 'Data Structures', code: 'CS201', credits: 4, progress: 75 },
    { id: 2, name: 'Operating Systems', code: 'CS301', credits: 3, progress: 50 },
    { id: 3, name: 'Discrete Mathematics', code: 'MA210', credits: 3, progress: 90 },
    { id: 4, name: 'Database Systems', code: 'CS302', credits: 3, progress: 60 },
  ]

  const filteredCourses = courses.filter(c => {
    const q = searchCourse.toLowerCase()
    return !q || c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
  })

  return (
    <StudentLayout>
      <motion.div 
        className="dashboard-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.section 
          className="content-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="left-cards" style={{ gridTemplateRows: 'auto auto' }}>
            <motion.div className="db-card">
              <motion.div className="card-title">Subjects</motion.div>
              <motion.div style={{ marginBottom: '16px' }}>
                <input 
                  type="text"
                  placeholder="Search by subject name or code..."
                  value={searchCourse}
                  onChange={(e) => setSearchCourse(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontFamily: 'inherit'
                  }}
                />
              </motion.div>
              <motion.table className="db-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Subject</th>
                    <th>Credits</th>
                    <th>Progress</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map(c => (
                    <motion.tr 
                      key={c.id} 
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td>{c.code}</td>
                      <td>{c.name}</td>
                      <td>{c.credits}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{
                            flex: 1,
                            height: '6px',
                            background: '#e5e7eb',
                            borderRadius: '3px',
                            overflow: 'hidden'
                          }}>
                            <motion.div 
                              style={{
                                height: '100%',
                                background: c.progress >= 70 ? '#10b981' : '#f59e0b',
                                width: `${c.progress}%`
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: `${c.progress}%` }}
                              transition={{ duration: 0.5, delay: 0.1 }}
                            />
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: '600', minWidth: '40px' }}>{c.progress}%</span>
                        </div>
                      </td>
                      <td><span style={{ color: c.progress >= 70 ? '#10b981' : '#f59e0b', fontWeight: '600' }}>{c.progress >= 70 ? 'On Track' : 'In Progress'}</span></td>
                    </motion.tr>
                  ))}
                </tbody>
              </motion.table>
            </motion.div>
          </div>

          <motion.aside 
            className="rightcol"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <motion.div className="card" style={{ marginBottom: '16px' }}>
              <motion.div className="card-title">Subject Statistics</motion.div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <motion.li 
                  style={{ padding: '12px', borderRadius: '8px', background: '#f9fafb', marginBottom: '8px' }}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div style={{ fontSize: '13px', color: '#6b7280' }}>Total Subjects</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>{courses.length}</div>
                </motion.li>
                <motion.li 
                  style={{ padding: '12px', borderRadius: '8px', background: '#f9fafb', marginBottom: '8px' }}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <div style={{ fontSize: '13px', color: '#6b7280' }}>Total Credits</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>{courses.reduce((sum, c) => sum + c.credits, 0)}</div>
                </motion.li>
                <motion.li 
                  style={{ padding: '12px', borderRadius: '8px', background: '#f9fafb', marginBottom: '8px' }}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div style={{ fontSize: '13px', color: '#6b7280' }}>Average Progress</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>{Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / courses.length)}%</div>
                </motion.li>
              </ul>
            </motion.div>

            <motion.div className="card">
              <motion.div className="card-title">Quick Info</motion.div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <motion.li 
                  style={{ padding: '10px', borderRadius: '8px', background: '#f9fafb', marginBottom: '8px', fontSize: '13px', color: '#374151' }}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Click on any subject for detailed information
                </motion.li>
                <motion.li 
                  style={{ padding: '10px', borderRadius: '8px', background: '#f9fafb', marginBottom: '8px', fontSize: '13px', color: '#374151' }}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  Track your progress in each subject
                </motion.li>
              </ul>
            </motion.div>
          </motion.aside>
        </motion.section>
      </motion.div>
    </StudentLayout>
  )
}
