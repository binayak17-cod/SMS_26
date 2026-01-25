import React, { useState } from 'react'
import { motion } from 'framer-motion'
import AdminLayout from './AdminLayout'

const TeachersManagePage = () => {
  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Dr. Sarah Wilson', teacherId: 'T001', email: 'sarah.wilson@school.edu', subject: 'Mathematics', experience: 8, salary: 65000, status: 'Active' },
    { id: 2, name: 'Prof. John Davis', teacherId: 'T002', email: 'john.davis@school.edu', subject: 'Physics', experience: 12, salary: 72000, status: 'Active' },
    { id: 3, name: 'Ms. Emily Brown', teacherId: 'T003', email: 'emily.brown@school.edu', subject: 'English', experience: 5, salary: 58000, status: 'Active' },
    { id: 4, name: 'Dr. Michael Johnson', teacherId: 'T004', email: 'michael.j@school.edu', subject: 'Chemistry', experience: 15, salary: 78000, status: 'Active' },
    { id: 5, name: 'Mrs. Lisa Anderson', teacherId: 'T005', email: 'lisa.anderson@school.edu', subject: 'Biology', experience: 7, salary: 62000, status: 'On Leave' }
  ])

  const [editingCell, setEditingCell] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSubject, setFilterSubject] = useState('All')

  const handleEdit = (teacherId, field, currentValue) => {
    setEditingCell(`${teacherId}-${field}`)
    setEditValue(currentValue)
  }

  const handleSave = (teacherId, field) => {
    setTeachers(prev => prev.map(teacher => 
      teacher.id === teacherId 
        ? { ...teacher, [field]: field === 'experience' || field === 'salary' ? Number(editValue) : editValue }
        : teacher
    ))
    setEditingCell(null)
    setEditValue('')
  }

  const handleCancel = () => {
    setEditingCell(null)
    setEditValue('')
  }

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.teacherId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = filterSubject === 'All' || teacher.subject === filterSubject
    return matchesSearch && matchesSubject
  })

  const EditableCell = ({ teacher, field, value }) => {
    const isEditing = editingCell === `${teacher.id}-${field}`
    
    if (isEditing) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type={field === 'experience' || field === 'salary' ? 'number' : 'text'}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            style={{
              border: '2px solid #4f46e5',
              borderRadius: '6px',
              padding: '4px 8px',
              fontSize: '14px',
              width: field === 'salary' ? '100px' : '80px'
            }}
            autoFocus
          />
          <button
            onClick={() => handleSave(teacher.id, field)}
            style={{
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            ✓
          </button>
          <button
            onClick={handleCancel}
            style={{
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>
      )
    }

    return (
      <div
        onClick={() => handleEdit(teacher.id, field, value)}
        style={{
          cursor: 'pointer',
          padding: '4px 8px',
          borderRadius: '4px',
          transition: 'background 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.background = '#f8fafc'}
        onMouseLeave={(e) => e.target.style.background = 'transparent'}
      >
        {field === 'salary' ? `$${value.toLocaleString()}` : 
         field === 'experience' ? `${value} years` : value}
      </div>
    )
  }

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ padding: '24px' }}
      >
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>
            Teachers Management
          </h1>
          <p style={{ color: '#64748b' }}>View and manage all teacher records</p>
        </div>

        {/* Filters */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '24px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <input
              type="text"
              placeholder="Search by name, teacher ID, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '14px',
              outline: 'none',
              background: 'white'
            }}
          >
            <option value="All">All Subjects</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="English">English</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            + Add Teacher
          </motion.button>
        </div>

        {/* Table */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Name</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Teacher ID</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Email</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Subject</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Experience</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Salary</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Status</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.map((teacher, index) => (
                  <motion.tr
                    key={teacher.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={{ borderBottom: '1px solid #f1f5f9' }}
                  >
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: '#059669',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '600'
                        }}>
                          {teacher.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', color: '#1f2937' }}>{teacher.name}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px', color: '#64748b' }}>{teacher.teacherId}</td>
                    <td style={{ padding: '16px', color: '#64748b' }}>{teacher.email}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        background: '#fef3c7',
                        color: '#92400e',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {teacher.subject}
                      </span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <EditableCell teacher={teacher} field="experience" value={teacher.experience} />
                    </td>
                    <td style={{ padding: '16px' }}>
                      <EditableCell teacher={teacher} field="salary" value={teacher.salary} />
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        background: teacher.status === 'Active' ? '#dcfce7' : '#fef2f2',
                        color: teacher.status === 'Active' ? '#166534' : '#dc2626',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {teacher.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            background: '#f3f4f6',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '8px',
                            cursor: 'pointer',
                            fontSize: '14px'
                          }}
                        >
                          👁️
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            background: '#fef3c7',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '8px',
                            cursor: 'pointer',
                            fontSize: '14px'
                          }}
                        >
                          ✏️
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            background: '#fecaca',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '8px',
                            cursor: 'pointer',
                            fontSize: '14px'
                          }}
                        >
                          🗑️
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredTeachers.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '48px',
            color: '#64748b'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>👨🏫</div>
            <h3 style={{ marginBottom: '8px' }}>No teachers found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </motion.div>
    </AdminLayout>
  )
}

export default TeachersManagePage