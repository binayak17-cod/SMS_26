import React from 'react'
import { motion } from 'framer-motion'
import StudentLayout from './StudentLayout'
import '../../App.css'

export default function ResultPage() {
  const results = [
    { subject: 'Operating Systems', score: 85, date: '2026-01-18', grade: 'A', status: 'Pass' },
    { subject: 'Database Systems', score: 62, date: '2026-01-10', grade: 'C', status: 'Pass' },
    { subject: 'Discrete Mathematics', score: 45, date: '2025-12-02', grade: 'D', status: 'Fail' },
  ]

  const getGradeColor = (grade) => {
    switch(grade) {
      case 'A': return { color: '#10b981', bg: '#ecfdf5' }
      case 'B': return { color: '#3b82f6', bg: '#eff6ff' }
      case 'C': return { color: '#f59e0b', bg: '#fffbeb' }
      case 'D': return { color: '#ef4444', bg: '#fef2f2' }
      default: return { color: '#6b7280', bg: '#f3f4f6' }
    }
  }

  const getStatusColor = (status) => {
    return status === 'Pass' ? '#10b981' : '#ef4444'
  }

  const getStatusBg = (status) => {
    return status === 'Pass' ? '#ecfdf5' : '#fef2f2'
  }

  const averageScore = Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length)

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
              <motion.div className="card-title">Examination Results</motion.div>
              <motion.table className="db-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Score</th>
                    <th>Date</th>
                    <th>Grade</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => {
                    const gradeStyle = getGradeColor(r.grade)
                    const statusStyle = getStatusColor(r.status)
                    return (
                      <motion.tr 
                        key={i} 
                        whileHover={{ backgroundColor: '#f3f4f6' }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                      >
                        <td style={{ fontWeight: '600', color: '#1f2937' }}>{r.subject}</td>
                        <td>
                          <motion.span style={{ 
                            background: '#f3f4f6', 
                            padding: '4px 8px', 
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>
                            {r.score}
                          </motion.span>
                        </td>
                        <td>{new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}</td>
                        <td>
                          <motion.span 
                            style={{ 
                              background: gradeStyle.bg,
                              color: gradeStyle.color,
                              padding: '4px 10px', 
                              borderRadius: '4px',
                              fontSize: '12px',
                              fontWeight: '700'
                            }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {r.grade}
                          </motion.span>
                        </td>
                        <td>
                          <motion.span 
                            style={{ 
                              background: getStatusBg(r.status),
                              color: statusStyle,
                              padding: '4px 10px', 
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: '600'
                            }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {r.status}
                          </motion.span>
                        </td>
                      </motion.tr>
                    )
                  })}
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
              <motion.div className="card-title">Performance Overview</motion.div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <motion.li 
                  style={{ padding: '12px', borderRadius: '8px', background: '#eff6ff', marginBottom: '8px' }}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div style={{ fontSize: '13px', color: '#6b7280' }}>Average Score</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#3b82f6' }}>{averageScore}%</div>
                </motion.li>
                <motion.li 
                  style={{ padding: '12px', borderRadius: '8px', background: '#ecfdf5', marginBottom: '8px' }}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <div style={{ fontSize: '13px', color: '#6b7280' }}>Passed Exams</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#10b981' }}>
                    {results.filter(r => r.status === 'Pass').length}/{results.length}
                  </div>
                </motion.li>
                <motion.li 
                  style={{ padding: '12px', borderRadius: '8px', background: '#fef2f2', marginBottom: '8px' }}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div style={{ fontSize: '13px', color: '#6b7280' }}>Failed Exams</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#ef4444' }}>
                    {results.filter(r => r.status === 'Fail').length}/{results.length}
                  </div>
                </motion.li>
              </ul>
            </motion.div>

            <motion.div className="card">
              <motion.div className="card-title">Grade Distribution</motion.div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['A', 'B', 'C', 'D'].map((grade, idx) => {
                  const count = results.filter(r => r.grade === grade).length
                  const style = getGradeColor(grade)
                  return (
                    <motion.li 
                      key={grade}
                      style={{ 
                        padding: '10px', 
                        borderRadius: '8px', 
                        background: style.bg, 
                        marginBottom: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <span style={{ color: style.color, fontWeight: '600' }}>Grade {grade}</span>
                      <span style={{ color: style.color, fontWeight: '700' }}>{count}</span>
                    </motion.li>
                  )
                })}
              </ul>
            </motion.div>
          </motion.aside>
        </motion.section>
      </motion.div>
    </StudentLayout>
  )
}
