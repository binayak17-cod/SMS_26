import React from 'react'
import { motion } from 'framer-motion'
import StudentLayout from './StudentLayout'
import '../../App.css'

export default function AssignmentsPage() {
  const assignments = [
    { id: 1, title: 'Lab Report 3', course: 'Operating Systems', due: '2026-01-30', status: 'Pending' },
    { id: 2, title: 'Project Proposal', course: 'Database Systems', due: '2026-02-02', status: 'In Review' },
    { id: 3, title: 'Problem Set 5', course: 'Discrete Mathematics', due: '2026-01-25', status: 'Submitted' },
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'Submitted': return '#10b981'
      case 'In Review': return '#f59e0b'
      case 'Pending': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getStatusBg = (status) => {
    switch(status) {
      case 'Submitted': return '#ecfdf5'
      case 'In Review': return '#fffbeb'
      case 'Pending': return '#fef2f2'
      default: return '#f3f4f6'
    }
  }

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
              <motion.div className="card-title">Assignments</motion.div>
              <motion.table className="db-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Subject</th>
                    <th>Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((a, idx) => (
                    <motion.tr 
                      key={a.id} 
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                    >
                      <td style={{ fontWeight: '600', color: '#1f2937' }}>{a.title}</td>
                      <td>{a.course}</td>
                      <td>
                        <motion.span style={{ 
                          background: '#f3f4f6', 
                          padding: '4px 8px', 
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          {new Date(a.due).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </motion.span>
                      </td>
                      <td>
                        <motion.span 
                          style={{ 
                            background: getStatusBg(a.status),
                            color: getStatusColor(a.status),
                            padding: '4px 10px', 
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {a.status}
                        </motion.span>
                      </td>
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
              <motion.div className="card-title">Assignment Summary</motion.div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <motion.li 
                  style={{ padding: '12px', borderRadius: '8px', background: '#fef2f2', marginBottom: '8px' }}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div style={{ fontSize: '13px', color: '#6b7280' }}>Pending</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#ef4444' }}>
                    {assignments.filter(a => a.status === 'Pending').length}
                  </div>
                </motion.li>
                <motion.li 
                  style={{ padding: '12px', borderRadius: '8px', background: '#fffbeb', marginBottom: '8px' }}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <div style={{ fontSize: '13px', color: '#6b7280' }}>In Review</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#f59e0b' }}>
                    {assignments.filter(a => a.status === 'In Review').length}
                  </div>
                </motion.li>
                <motion.li 
                  style={{ padding: '12px', borderRadius: '8px', background: '#ecfdf5', marginBottom: '8px' }}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div style={{ fontSize: '13px', color: '#6b7280' }}>Submitted</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#10b981' }}>
                    {assignments.filter(a => a.status === 'Submitted').length}
                  </div>
                </motion.li>
              </ul>
            </motion.div>

            <motion.div className="card">
              <motion.div className="card-title">Upcoming Due Dates</motion.div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {assignments
                  .sort((a, b) => new Date(a.due) - new Date(b.due))
                  .map((a, idx) => (
                  <motion.li 
                    key={a.id}
                    style={{ 
                      padding: '10px', 
                      borderRadius: '8px', 
                      background: '#f9fafb', 
                      marginBottom: '8px', 
                      fontSize: '12px',
                      borderLeft: `3px solid ${getStatusColor(a.status)}`
                    }}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>{a.title}</div>
                    <div style={{ color: '#6b7280' }}>
                      Due: {new Date(a.due).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.aside>
        </motion.section>
      </motion.div>
    </StudentLayout>
  )
}
