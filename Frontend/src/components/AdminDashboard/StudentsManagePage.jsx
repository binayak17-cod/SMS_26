import React, { useState } from 'react'
import { motion } from 'framer-motion'
import AdminLayout from './AdminLayout'

const StudentsManagePage = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Smith', rollNo: 'CS001', email: 'john@school.edu', class: '10A', attendance: 85, marks: 78, status: 'Active' },
    { id: 2, name: 'Sarah Johnson', rollNo: 'CS002', email: 'sarah@school.edu', class: '10A', attendance: 92, marks: 85, status: 'Active' },
    { id: 3, name: 'Mike Davis', rollNo: 'CS003', email: 'mike@school.edu', class: '10B', attendance: 78, marks: 72, status: 'Active' },
    { id: 4, name: 'Emma Wilson', rollNo: 'CS004', email: 'emma@school.edu', class: '10B', attendance: 88, marks: 91, status: 'Active' },
    { id: 5, name: 'Alex Brown', rollNo: 'CS005', email: 'alex@school.edu', class: '10A', attendance: 95, marks: 89, status: 'Active' }
  ])

  const [editingCell, setEditingCell] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterClass, setFilterClass] = useState('All')

  const handleEdit = (studentId, field, currentValue) => {
    setEditingCell(`${studentId}-${field}`)
    setEditValue(currentValue)
  }

  const handleSave = (studentId, field) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, [field]: field === 'attendance' || field === 'marks' ? Number(editValue) : editValue }
        : student
    ))
    setEditingCell(null)
    setEditValue('')
  }

  const handleCancel = () => {
    setEditingCell(null)
    setEditValue('')
  }

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = filterClass === 'All' || student.class === filterClass
    return matchesSearch && matchesClass
  })

  const EditableCell = ({ student, field, value }) => {
    const isEditing = editingCell === `${student.id}-${field}`
    
    if (isEditing) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type={field === 'attendance' || field === 'marks' ? 'number' : 'text'}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            style={{
              border: '2px solid #4f46e5',
              borderRadius: '6px',
              padding: '4px 8px',
              fontSize: '14px',
              width: '80px'
            }}
            autoFocus
          />
          <button
            onClick={() => handleSave(student.id, field)}
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
        onClick={() => handleEdit(student.id, field, value)}
        style={{
          cursor: 'pointer',
          padding: '4px 8px',
          borderRadius: '4px',
          transition: 'background 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.background = '#f8fafc'}
        onMouseLeave={(e) => e.target.style.background = 'transparent'}
      >
        {field === 'attendance' || field === 'marks' ? `${value}${field === 'attendance' ? '%' : ''}` : value}
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
            Students Management
          </h1>
          <p style={{ color: '#64748b' }}>View and manage all student records</p>
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
              placeholder="Search by name, roll number, or email..."
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
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '14px',
              outline: 'none',
              background: 'white'
            }}
          >
            <option value="All">All Classes</option>
            <option value="10A">Class 10A</option>
            <option value="10B">Class 10B</option>
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
            + Add Student
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
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Roll No</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Email</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Class</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Attendance</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Marks</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Status</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <motion.tr
                    key={student.id}
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
                          background: '#4f46e5',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '600'
                        }}>
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', color: '#1f2937' }}>{student.name}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px', color: '#64748b' }}>{student.rollNo}</td>
                    <td style={{ padding: '16px', color: '#64748b' }}>{student.email}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        background: '#dbeafe',
                        color: '#1e40af',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {student.class}
                      </span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <EditableCell student={student} field="attendance" value={student.attendance} />
                    </td>
                    <td style={{ padding: '16px' }}>
                      <EditableCell student={student} field="marks" value={student.marks} />
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        background: student.status === 'Active' ? '#dcfce7' : '#fef2f2',
                        color: student.status === 'Active' ? '#166534' : '#dc2626',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {student.status}
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

        {filteredStudents.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '48px',
            color: '#64748b'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>👨‍🎓</div>
            <h3 style={{ marginBottom: '8px' }}>No students found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </motion.div>
    </AdminLayout>
  )
}

export default StudentsManagePage