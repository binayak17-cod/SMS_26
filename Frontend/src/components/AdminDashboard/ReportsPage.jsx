import React from 'react'
import { motion } from 'framer-motion'
import AdminLayout from './AdminLayout'
import '../../App.css'

export default function ReportsPage() {
  const reports = [
    { id: 1, title: 'Student Performance Report', description: 'Overall academic performance analysis', type: 'Academic', lastGenerated: '2 days ago' },
    { id: 2, title: 'Attendance Summary', description: 'Monthly attendance statistics', type: 'Attendance', lastGenerated: '1 week ago' },
    { id: 3, title: 'Teacher Workload Report', description: 'Teaching assignments and workload distribution', type: 'Staff', lastGenerated: '3 days ago' },
    { id: 4, title: 'Financial Summary', description: 'Fee collection and expense report', type: 'Financial', lastGenerated: '1 day ago' },
  ]

  const quickStats = [
    { label: 'Total Reports Generated', value: '156', change: '+12 this month' },
    { label: 'Pending Reviews', value: '8', change: '-3 from last week' },
    { label: 'Automated Reports', value: '24', change: '+6 this quarter' },
  ]

  return (
    <AdminLayout>
      <motion.div
        className="dashboard-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="left-main-col">
          {/* Quick Stats */}
          <div className="stats-grid">
            {quickStats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                whileHover={{ translateY: -5 }}
              >
                <div className="stat-body">
                  <div className="stat-title">{stat.label}</div>
                  <div className="stat-value">{stat.value}</div>
                  <div style={{ fontSize: '12px', color: '#10b981', marginTop: '4px' }}>
                    {stat.change}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Available Reports */}
          <div className="card-section">
            <div className="section-header">
              <div className="section-title">Available Reports</div>
              <motion.button
                className="banner-btn"
                style={{ background: '#4318ff', color: 'white', padding: '10px 20px', borderRadius: '10px', border: 'none' }}
                whileHover={{ scale: 1.05 }}
                onClick={() => alert('Create custom report')}
              >
                Create Custom Report
              </motion.button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {reports.map(report => (
                <motion.div
                  key={report.id}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0px 18px 40px rgba(112, 144, 176, 0.12)',
                    border: '1px solid #f1f5f9'
                  }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                      <h3 style={{ color: '#2b3674', fontWeight: '700', fontSize: '16px' }}>{report.title}</h3>
                      <span style={{
                        background: report.type === 'Academic' ? '#dbeafe' : 
                                   report.type === 'Attendance' ? '#fef3c7' :
                                   report.type === 'Staff' ? '#f3e8ff' : '#dcfce7',
                        color: report.type === 'Academic' ? '#1d4ed8' : 
                               report.type === 'Attendance' ? '#d97706' :
                               report.type === 'Staff' ? '#7c3aed' : '#16a34a',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {report.type}
                      </span>
                    </div>
                    <p style={{ color: '#a3aed0', fontSize: '14px', marginBottom: '12px' }}>{report.description}</p>
                    <p style={{ color: '#6b7280', fontSize: '12px' }}>Last generated: {report.lastGenerated}</p>
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
                      onClick={() => alert(`Generate ${report.title}`)}
                    >
                      Generate
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
                      onClick={() => alert(`View ${report.title} history`)}
                    >
                      View History
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="right-panel-col">
          {/* Recent Reports */}
          <div className="card-section">
            <div className="section-title" style={{ marginBottom: '16px' }}>Recent Reports</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'Monthly Attendance', date: '2 hours ago', status: 'Completed' },
                { name: 'Grade Analysis', date: '1 day ago', status: 'Completed' },
                { name: 'Fee Collection', date: '2 days ago', status: 'Processing' },
              ].map((item, index) => (
                <div key={index} style={{
                  padding: '12px',
                  background: '#f8fafc',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontWeight: '600', color: '#2b3674', fontSize: '14px' }}>{item.name}</div>
                    <div style={{ fontSize: '12px', color: '#a3aed0' }}>{item.date}</div>
                  </div>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: '600',
                    background: item.status === 'Completed' ? '#dcfce7' : '#fef3c7',
                    color: item.status === 'Completed' ? '#16a34a' : '#d97706'
                  }}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div className="card-section">
            <div className="section-title" style={{ marginBottom: '16px' }}>Export Options</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['PDF', 'Excel', 'CSV'].map(format => (
                <motion.button
                  key={format}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #f1f5f9',
                    background: 'white',
                    color: '#2b3674',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    textAlign: 'left'
                  }}
                  whileHover={{ borderColor: '#4318ff', color: '#4318ff' }}
                  onClick={() => alert(`Export as ${format}`)}
                >
                  Export as {format}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  )
}