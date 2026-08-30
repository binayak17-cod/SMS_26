import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const BatchAssignmentPage = () => {
  const [teachers, setTeachers] = useState([])
  const [sections, setSections] = useState([])
  const [formData, setFormData] = useState({
    teacher_id: '',
    section: '',
    subject: '',
    session_type: 'Theory',
    semester: ''
  })

  useEffect(() => {
    fetchTeachers()
    fetchSections()
  }, [])

  const fetchTeachers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users?role=teacher')
      const data = await res.json()
      if (data.success) {
        setTeachers(data.users)
      }
    } catch (err) {
      console.error('Error fetching teachers:', err)
    }
  }

  const fetchSections = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users?role=student')
      const data = await res.json()
      if (data.success) {
        const uniqueSections = [...new Set(
          data.users.map(s => `${s.department}${s.sec}`)
        )].sort()
        setSections(uniqueSections)
      }
    } catch (err) {
      console.error('Error fetching sections:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:5000/api/teacher-assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success) {
        alert('Assignment created successfully')
        setFormData({ teacher_id: '', section: '', subject: '', session_type: 'Theory', semester: '' })
      } else {
        alert('Error: ' + data.message)
      }
    } catch (err) {
      console.error('Error creating assignment:', err)
      alert('Error creating assignment')
    }
  }

  return (
    <motion.div
      className="page-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h3 style={{ color: '#2b3674', marginBottom: '20px' }}>Batch Assignment</h3>

      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        maxWidth: '600px'
      }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#2b3674', fontWeight: '600' }}>
              Teacher
            </label>
            <select
              value={formData.teacher_id}
              onChange={(e) => setFormData({ ...formData, teacher_id: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            >
              <option value="">Select Teacher</option>
              {teachers.map(teacher => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name} ({teacher.id})
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#2b3674', fontWeight: '600' }}>
              Section
            </label>
            <select
              value={formData.section}
              onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            >
              <option value="">Select Section</option>
              {sections.map(section => (
                <option key={section} value={section}>{section}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#2b3674', fontWeight: '600' }}>
              Semester
            </label>
            <select
              value={formData.semester}
              onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            >
              <option value="">Select Semester</option>
              <option value="Sem 1">Sem 1</option>
              <option value="Sem 2">Sem 2</option>
              <option value="Sem 3">Sem 3</option>
              <option value="Sem 4">Sem 4</option>
              <option value="Sem 5">Sem 5</option>
              <option value="Sem 6">Sem 6</option>
              <option value="Sem 7">Sem 7</option>
              <option value="Sem 8">Sem 8</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#2b3674', fontWeight: '600' }}>
              Subject
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
              placeholder="Enter subject name"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#2b3674', fontWeight: '600' }}>
              Session Type
            </label>
            <select
              value={formData.session_type}
              onChange={(e) => setFormData({ ...formData, session_type: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            >
              <option value="Theory">Theory</option>
              <option value="Lab">Lab</option>
            </select>
          </div>

          <button
            type="submit"
            style={{
              padding: '10px 20px',
              background: '#4318ff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px'
            }}
          >
            Assign Teacher
          </button>
        </form>
      </div>
    </motion.div>
  )
}

export default BatchAssignmentPage
