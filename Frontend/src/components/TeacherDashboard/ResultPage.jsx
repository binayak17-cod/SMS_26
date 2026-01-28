import React from 'react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const ResultPage = () => {
  const [formData, setFormData] = useState({
    semester: '',
    examType: '',
    studentId: '',
    subject: '',
    marks: '',
    totalMarks: '100'
  })

  // Dummy subjects data mapped by semester
  const subjectsBySemester = {
    '1': ['Mathematics-I', 'Physics', 'Basic Electrical', 'Engineering Graphics'],
    '2': ['Mathematics-II', 'Chemistry', 'Programming in C', 'English'],
    '3': ['Data Structures', 'Digital Logic', 'Discrete Math', 'OOPs'],
    '4': ['Operating Systems', 'COA', 'Design Algorithms', 'Database Systems'],
    '5': ['Computer Networks', 'Software Engineering', 'Automata', 'Web Tech'],
    '6': ['Compiler Design', 'AI', 'Machine Learning', 'Cloud Computing'],
    '7': ['Cryptography', 'Big Data', 'Distributed Systems', 'Project-I'],
    '8': ['IoT', 'Blockchain', 'Cyber Security', 'Project-II']
  }

  const currentSubjects = formData.semester ? subjectsBySemester[formData.semester] : []

  const handleSubmit = (e) => {
    e.preventDefault()
    // DATABASE CONNECTION:
    // This function will connect to your backend API to save the results
    console.log('Uploading marks for:', formData)
    alert(`Marks for ${formData.studentId} (${formData.subject}) uploaded locally.`)
  }

  return (
    <motion.div
      className="page-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ margin: 0, color: '#2b3674' }}>Upload Results</h3>
        <p style={{ margin: 0, color: '#a3aed0', fontSize: '14px' }}>Enter student marks to update the database</p>
      </div>

      <div className="card-section" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Row 1: Semester & Exam Type */}
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#2b3674' }}>Semester</label>
              <select
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value, subject: '' })}
                required
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e0e0e0', background: '#f4f7fe' }}
              >
                <option value="">Select Semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#2b3674' }}>Exam Type</label>
              <select
                value={formData.examType}
                onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
                required
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e0e0e0', background: '#f4f7fe' }}
              >
                <option value="">Select Exam Type</option>
                <option value="Internal">Internal Assessment</option>
                <option value="Semester">Semester End Exam</option>
                <option value="ClassTest">Class Test</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#2b3674' }}>Student Name / ID</label>
            <input
              type="text"
              placeholder="Enter student Roll No or Name"
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              required
              style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e0e0e0', background: '#f4f7fe' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#2b3674' }}>Subject</label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
              disabled={!formData.semester}
              style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e0e0e0', background: '#f4f7fe', opacity: !formData.semester ? 0.7 : 1 }}
            >
              <option value="">Select Subject</option>
              {currentSubjects.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#2b3674' }}>Marks Obtained</label>
              <input
                type="number"
                placeholder="e.g. 85"
                value={formData.marks}
                onChange={(e) => setFormData({ ...formData, marks: e.target.value })}
                required
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e0e0e0', background: '#f4f7fe' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#2b3674' }}>Total Marks</label>
              <input
                type="number"
                value={formData.totalMarks}
                onChange={(e) => setFormData({ ...formData, totalMarks: e.target.value })}
                style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e0e0e0', background: '#f4f7fe' }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="banner-btn"
            style={{ background: '#4318ff', color: 'white', marginTop: '10px' }}
          >
            Upload Marks
          </button>

        </form>
      </div>
    </motion.div>
  )
}

export default ResultPage
