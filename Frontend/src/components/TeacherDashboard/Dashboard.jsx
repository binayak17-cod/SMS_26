import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import '../../App.css'

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const menuVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: 'easeOut'
      }
    })
  }

  return (
    <motion.aside 
      className="sidebar"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div 
        className="brand"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <motion.div 
          className="logo-mark"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          G
        </motion.div>
        <div className="brand-text">GIETU</div>
      </motion.div>
      <nav className="menu">
        {['Dashboard', 'Overview', 'Courses', 'Students', 'Teachers', 'Result'].map((item, i) => (
          <motion.a 
            key={item}
            className={`menu-item ${activeMenu === item ? 'active' : ''}`}
            onClick={() => setActiveMenu(item)}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={menuVariants}
            whileHover={{ x: 6, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
          >
            {item}
          </motion.a>
        ))}
      </nav>
      <motion.div 
        className="invite"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <motion.div 
          className="invite-illustration"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          📊
        </motion.div>
        <motion.button 
          className="invite-btn"
          onClick={() => alert('Analytics feature coming soon!')}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          Get Analytics
        </motion.button>
      </motion.div>
    </motion.aside>
  )
}

const StatCard = ({ title, value, color, icon, onClick }) => {
  const colorGradients = {
    purple: 'linear-gradient(135deg, #a855f7, #9333ea)',
    pink: 'linear-gradient(135deg, #ec4899, #db2777)',
    blue: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    orange: 'linear-gradient(135deg, #f97316, #ea580c)'
  }

  return (
    <motion.div 
      className="stat-card"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.4 }}
      whileHover={{ 
        scale: 1.03, 
        translateY: -8,
        boxShadow: '0 20px 40px rgba(0,0,0,0.12)'
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div 
        className={`stat-icon ${color}`}
        style={{ background: colorGradients[color] }}
        whileHover={{ rotate: 8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
      >
        {icon}
      </motion.div>
      <div className="stat-body">
        <div className="stat-title">{title}</div>
        <motion.div 
          className="stat-value"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {value}
        </motion.div>
      </div>
    </motion.div>
  )
}

const StudentsList = () => {
  const [search, setSearch] = useState('')
  const [year, setYear] = useState('')
  const [section, setSection] = useState('')

  const students = [
    { id: 1, name: 'John Doe', year: '2024', section: 'A', rollNo: '001', email: 'john@email.com', status: 'Active', gpa: '3.8' },
    { id: 2, name: 'Jane Smith', year: '2024', section: 'B', rollNo: '002', email: 'jane@email.com', status: 'Active', gpa: '3.9' },
    { id: 3, name: 'Mike Johnson', year: '2023', section: 'A', rollNo: '003', email: 'mike@email.com', status: 'Active', gpa: '3.6' },
    { id: 4, name: 'Sarah Wilson', year: '2023', section: 'C', rollNo: '004', email: 'sarah@email.com', status: 'Active', gpa: '3.7' },
    { id: 5, name: 'David Brown', year: '2022', section: 'B', rollNo: '005', email: 'david@email.com', status: 'Inactive', gpa: '3.5' },
    { id: 6, name: 'Emily Davis', year: '2024', section: 'A', rollNo: '006', email: 'emily@email.com', status: 'Active', gpa: '4.0' },
    { id: 7, name: 'James Miller', year: '2023', section: 'B', rollNo: '007', email: 'james@email.com', status: 'Active', gpa: '3.4' },
    { id: 8, name: 'Sophia Garcia', year: '2022', section: 'C', rollNo: '008', email: 'sophia@email.com', status: 'Active', gpa: '3.9' }
  ]

  const filtered = students.filter(s => {
    const query = search.toLowerCase()
    return (!query || s.name.toLowerCase().includes(query) || s.rollNo.includes(query) || s.email.toLowerCase().includes(query)) &&
        (!year || s.year === year) &&
        (!section || s.section === section)
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    }
  }

  return (
    <motion.div 
      className="dashboard-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.section 
        className="stats-row"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <StatCard title="Total Students" value={students.length.toString()} color="purple" icon="👥" />
        <StatCard title="Active Students" value={students.filter(s => s.status === 'Active').length.toString()} color="pink" icon="✓" />
        <StatCard title="Class of 2024" value={students.filter(s => s.year === '2024').length.toString()} color="blue" icon="📚" />
        <StatCard title="Avg GPA" value={(students.reduce((sum, s) => sum + parseFloat(s.gpa), 0) / students.length).toFixed(1)} color="orange" icon="⭐" />
      </motion.section>

      <motion.section 
        className="content-row"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="left-cards">
          <motion.div className="card" layoutId="studentCard">
            <motion.div className="card-title">Student Management</motion.div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <motion.input
                  type="text"
                  placeholder="Search students..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ flex: 1, minWidth: '200px', padding: '10px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }}
                  whileFocus={{ borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }}
                  transition={{ duration: 0.2 }}
                />
                <motion.select 
                  value={year} 
                  onChange={(e) => setYear(e.target.value)} 
                  style={{ padding: '10px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }}
                  whileFocus={{ borderColor: '#3b82f6' }}
                >
                  <option value="">All Years</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </motion.select>
                <motion.select 
                  value={section} 
                  onChange={(e) => setSection(e.target.value)} 
                  style={{ padding: '10px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }}
                  whileFocus={{ borderColor: '#3b82f6' }}
                >
                  <option value="">All Sections</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </motion.select>
                <motion.button 
                  className="btn-primary" 
                  style={{ padding: '10px 20px' }}
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  + Add Student
                </motion.button>
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
                Showing <strong>{filtered.length}</strong> of <strong>{students.length}</strong> students
              </div>
            </div>
            <motion.div 
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', maxHeight: '500px', overflowY: 'auto' }}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filtered.map(student => (
                <motion.div 
                  key={student.id} 
                  variants={itemVariants}
                  style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                    backgroundColor: '#fafbfc'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <motion.div 
                      style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700' }}
                      whileHover={{ scale: 1.15 }}
                    >
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </motion.div>
                    <motion.span 
                      style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', background: student.status === 'Active' ? '#d1fae5' : '#fee2e2', color: student.status === 'Active' ? '#059669' : '#dc2626' }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {student.status}
                    </motion.span>
                  </div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '700' }}>{student.name}</h3>
                  <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#6b7280' }}>Roll No: #{student.rollNo}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
                    <div><span style={{ color: '#9ca3af' }}>Year:</span> <strong>{student.year}</strong></div>
                    <div><span style={{ color: '#9ca3af' }}>Section:</span> <strong>{student.section}</strong></div>
                    <div><span style={{ color: '#9ca3af' }}>GPA:</span> <strong>{student.gpa}</strong></div>
                    <div style={{ gridColumn: '1 / -1' }}><span style={{ color: '#9ca3af' }}>Email:</span> <strong style={{ fontSize: '11px' }}>{student.email}</strong></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        <RightColumn />
      </motion.section>
    </motion.div>
  )
}

const TeachersList = () => {
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('')

  const teachers = [
    { id: 1, name: 'Dr. Sarah Johnson', subject: 'Mathematics', designation: 'Senior Lecturer', phone: '+1-555-0101', department: 'Science', experience: '10 years', students: 45, rating: '4.8', email: 'sarah.johnson@email.com' },
    { id: 2, name: 'Prof. Michael Chen', subject: 'Physics', designation: 'Professor', phone: '+1-555-0102', department: 'Science', experience: '15 years', students: 38, rating: '4.9', email: 'michael.chen@email.com' },
    { id: 3, name: 'Dr. Emily Rodriguez', subject: 'Chemistry', designation: 'Associate Professor', phone: '+1-555-0103', department: 'Science', experience: '8 years', students: 42, rating: '4.7', email: 'emily.rodriguez@email.com' },
    { id: 4, name: 'Prof. David Kim', subject: 'Computer Science', designation: 'Head of Department', phone: '+1-555-0104', department: 'Technology', experience: '12 years', students: 50, rating: '4.9', email: 'david.kim@email.com' },
    { id: 5, name: 'Dr. Lisa Anderson', subject: 'English Literature', designation: 'Lecturer', phone: '+1-555-0105', department: 'Humanities', experience: '7 years', students: 35, rating: '4.6', email: 'lisa.anderson@email.com' },
    { id: 6, name: 'Prof. James Wilson', subject: 'History', designation: 'Senior Lecturer', phone: '+1-555-0106', department: 'Humanities', experience: '11 years', students: 40, rating: '4.8', email: 'james.wilson@email.com' }
  ]

  const filtered = teachers.filter(t => {
    const query = search.toLowerCase()
    return (!query || t.name.toLowerCase().includes(query) || t.subject.toLowerCase().includes(query) || t.phone.includes(query)) &&
        (!department || t.department === department)
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    }
  }

  return (
    <motion.div 
      className="dashboard-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.section 
        className="stats-row"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <StatCard title="Total Teachers" value={teachers.length.toString()} color="purple" icon="👨‍🏫" />
        <StatCard title="Active Teachers" value={teachers.length.toString()} color="pink" icon="✓" />
        <StatCard title="Total Students" value={teachers.reduce((sum, t) => sum + t.students, 0).toString()} color="blue" icon="👥" />
        <StatCard title="Avg Rating" value={(teachers.reduce((sum, t) => sum + parseFloat(t.rating), 0) / teachers.length).toFixed(1)} color="orange" icon="⭐" />
      </motion.section>

      <motion.section 
        className="content-row"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="left-cards">
          <motion.div className="card">
            <motion.div className="card-title">Staff Directory</motion.div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <motion.input
                  type="text"
                  placeholder="Search staff..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ flex: 1, minWidth: '200px', padding: '10px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }}
                  whileFocus={{ borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }}
                  transition={{ duration: 0.2 }}
                />
                <motion.select 
                  value={department} 
                  onChange={(e) => setDepartment(e.target.value)} 
                  style={{ padding: '10px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }}
                  whileFocus={{ borderColor: '#3b82f6' }}
                >
                  <option value="">All Departments</option>
                  <option value="Science">Science</option>
                  <option value="Technology">Technology</option>
                  <option value="Humanities">Humanities</option>
                </motion.select>
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
                Showing <strong>{filtered.length}</strong> of <strong>{teachers.length}</strong> staff members
              </div>
            </div>
            <motion.div 
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', maxHeight: '600px', overflowY: 'auto' }}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filtered.map(teacher => (
                <motion.div 
                  key={teacher.id} 
                  variants={itemVariants}
                  style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', cursor: 'pointer' }}
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                    backgroundColor: '#fafbfc'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <motion.div 
                      style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '16px' }}
                      whileHover={{ scale: 1.15 }}
                    >
                      {teacher.name.split(' ').map(n => n[0]).join('')}
                    </motion.div>
                    <motion.span 
                      style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', background: '#dbeafe', color: '#0284c7' }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {teacher.department}
                    </motion.span>
                  </div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '700' }}>{teacher.name}</h3>
                  <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#6b7280' }}>{teacher.subject}</p>
                  <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px' }}>
                    <div>
                      <div style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '4px' }}>DESIGNATION</div>
                      <div style={{ fontWeight: '600', color: '#1f2937' }}>{teacher.designation}</div>
                    </div>
                    <div>
                      <div style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '4px' }}>EXPERIENCE</div>
                      <div style={{ fontWeight: '600', color: '#1f2937' }}>{teacher.experience}</div>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <div style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '4px' }}>PHONE</div>
                      <div style={{ fontWeight: '600', color: '#1f2937' }}>{teacher.phone}</div>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <div style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '4px' }}>EMAIL</div>
                      <div style={{ fontWeight: '600', color: '#1f2937', fontSize: '11px' }}>{teacher.email}</div>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <div style={{ color: '#9ca3af', fontSize: '11px', marginBottom: '4px' }}>RATING</div>
                      <div style={{ fontWeight: '600', color: '#f59e0b' }}>⭐ {teacher.rating}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        <RightColumn />
      </motion.section>
    </motion.div>
  )
}

const CoursesList = () => {
  const courses = [
    { id: 1, name: 'Mathematics 101', code: 'MATH101', students: 45, credits: 3, status: 'Active' },
    { id: 2, name: 'Physics Fundamentals', code: 'PHYS101', students: 38, credits: 4, status: 'Active' },
    { id: 3, name: 'Chemistry Basics', code: 'CHEM101', students: 42, credits: 3, status: 'Active' },
    { id: 4, name: 'Computer Science Intro', code: 'CS101', students: 50, credits: 3, status: 'Active' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  return (
    <motion.div 
      className="dashboard-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.section 
        className="stats-row"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <StatCard title="Total Courses" value={courses.length.toString()} color="purple" icon="📚" />
        <StatCard title="Active Courses" value={courses.filter(c => c.status === 'Active').length.toString()} color="pink" icon="✓" />
        <StatCard title="Total Students" value={courses.reduce((sum, c) => sum + c.students, 0).toString()} color="blue" icon="👥" />
        <StatCard title="Total Credits" value={courses.reduce((sum, c) => sum + c.credits, 0).toString()} color="orange" icon="⭐" />
      </motion.section>

      <motion.section 
        className="content-row"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="left-cards">
          <motion.div className="card">
            <motion.div className="card-title">Courses Management</motion.div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <motion.input 
                type="text" 
                placeholder="Search courses..." 
                style={{ flex: 1, padding: '10px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }}
                whileFocus={{ borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }}
              />
              <motion.button 
                className="btn-primary" 
                style={{ padding: '10px 20px' }}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                + Add Course
              </motion.button>
            </div>
            <DatabaseTable />
          </motion.div>
        </div>
        <RightColumn />
      </motion.section>
    </motion.div>
  )
}

const ResultList = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  return (
    <motion.div 
      className="dashboard-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.section 
        className="stats-row"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <StatCard title="Total Results" value="1,220" color="purple" icon="📊" />
        <StatCard title="Passed" value="1,100" color="pink" icon="✓" />
        <StatCard title="Failed" value="120" color="blue" icon="✗" />
        <StatCard title="Avg Score" value="78%" color="orange" icon="⭐" />
      </motion.section>

      <motion.section 
        className="content-row"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="left-cards">
          <motion.div className="card">
            <motion.div className="card-title">Results Management</motion.div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <motion.input 
                type="text" 
                placeholder="Search results..." 
                style={{ flex: 1, padding: '10px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }}
                whileFocus={{ borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }}
              />
              <motion.button 
                className="btn-primary" 
                style={{ padding: '10px 20px' }}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                + Add Result
              </motion.button>
            </div>
            <DatabaseTable />
          </motion.div>
        </div>
        <RightColumn />
      </motion.section>
    </motion.div>
  )
}

const OverviewPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  return (
    <motion.div 
      className="dashboard-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.section 
        className="stats-row"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <StatCard title="Total Students" value="1,220" color="purple" icon="👥" />
        <StatCard title="Total Teachers" value="120" color="pink" icon="👨‍🏫" />
        <StatCard title="Total Courses" value="15" color="blue" icon="📚" />
        <StatCard title="Active Exams" value="8" color="orange" icon="📝" />
      </motion.section>

      <motion.section 
        className="content-row"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="left-cards">
          <motion.div className="card stats-chart">
            <motion.div className="card-title">Overview Statistics</motion.div>
            <div className="bars">
              {[1, 2, 3, 4, 5].map(i => (
                <motion.div 
                  key={i} 
                  className={`bar ${i === 1 ? 'small' : i === 4 ? 'large purple' : 'medium'}`}
                  initial={{ height: 0 }}
                  whileInView={{ height: 'auto' }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div className="card activity">
            <motion.div className="card-title">System Overview</motion.div>
            <motion.div 
              className="donut"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <motion.div 
                className="donut-center"
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                style={{ backgroundImage: 'conic-gradient(from 0deg, #3b82f6 0%, #8b5cf6 50%, #3b82f6 100%)' }}
              >
                85%
              </motion.div>
            </motion.div>
            <p className="completion-text">System Health</p>
          </motion.div>

          <DatabaseTable />
        </div>
        <RightColumn />
      </motion.section>
    </motion.div>
  )
}

const DatabaseTable = () => (
  <motion.div 
    className="db-card"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: 0.2 }}
  >
    <motion.div className="db-header">Database</motion.div>
    <motion.table className="db-table">
      <thead>
        <tr>
          <th>Student name</th>
          <th>Score</th>
          <th>Submitted</th>
          <th>Grade</th>
          <th>Pass/Fail</th>
        </tr>
      </thead>
      <tbody>
        {[
          { name: 'Glenn Maxwell', score: '80/100', date: '12/10/22-10 PM', grade: 'Excellent', status: 'Pass' },
          { name: 'Cathe Heoavn', score: '70/100', date: '12/10/22-10 PM', grade: 'Average', status: 'Pass' },
          { name: 'Yeodar Gil', score: '35/100', date: '12/10/22-10 PM', grade: 'Poor', status: 'Fail' },
          { name: 'Preeth Shing', score: '80/100', date: '12/10/22-10 PM', grade: 'Excellent', status: 'Pass' }
        ].map((student, i) => (
          <motion.tr 
            key={i} 
            onClick={() => alert(`Viewing ${student.name} details`)}
            whileHover={{ backgroundColor: '#f3f4f6', scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <td>{student.name}</td>
            <td>{student.score}</td>
            <td>{student.date}</td>
            <td>{student.grade}</td>
            <td className={student.status.toLowerCase()}>{student.status}</td>
          </motion.tr>
        ))}
      </tbody>
    </motion.table>
  </motion.div>
)

const RightColumn = () => {
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  const currentDate = today.getDate()
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  
  const calendarDays = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }
  
  const getDayOfWeek = (dayNumber) => {
    if (dayNumber === null) return -1
    const date = new Date(currentYear, currentMonth, dayNumber)
    return date.getDay()
  }

  return (
    <motion.aside 
      className="rightcol"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <motion.div 
        className="calendar card"
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
      >
        <motion.div className="calendar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{monthNames[currentMonth]} {currentYear}</span>
          <motion.span 
            style={{ fontSize: '12px', color: '#6b7280' }}
            animate={{ opacity: [0.5, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} - {today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </motion.span>
        </motion.div>
        <motion.div className="calendar-grid">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={day} style={{ textAlign: 'center', fontWeight: '600', color: index === 0 ? '#dc2626' : '#6b7280', padding: '4px', fontSize: '12px' }}>{day}</div>
          ))}
          {calendarDays.map((day, i) => {
            const dayOfWeek = getDayOfWeek(day)
            const isToday = day === currentDate
            const isPassed = day && day < currentDate
            const isSunday = dayOfWeek === 0
            
            return (
              <motion.div 
                key={i} 
                style={{
                  padding: '8px',
                  textAlign: 'center',
                  fontWeight: day ? '600' : 'normal',
                  color: day ? (isPassed ? '#9ca3af' : (isSunday ? '#dc2626' : '#1f2937')) : 'transparent',
                  background: isToday ? '#dbeafe' : 'transparent',
                  borderRadius: isToday ? '4px' : '0',
                  cursor: day ? 'pointer' : 'default',
                }}
                onClick={() => day && alert(`Selected date: ${day} ${monthNames[currentMonth]} ${currentYear}`)}
                whileHover={day ? { scale: 1.1, backgroundColor: '#f0f9ff' } : {}}
                whileTap={day ? { scale: 0.95 } : {}}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              >
                {day}
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
      <motion.div 
        className="notice card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <motion.div className="notice-header">Notice Board</motion.div>
        <motion.ul className="notice-list">
          {[
            'Notice of Special Examinations',
            'Time Extension Notice of Semester Admission',
            'COVID-19 Vaccination Survey October 2021',
            'Scholarship Viva Notice Spring 2021'
          ].map((notice, i) => (
            <motion.li 
              key={i} 
              onClick={() => alert(`Opening: ${notice}`)}
              whileHover={{ x: 8, backgroundColor: '#f3f4f6' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {notice}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.aside>
  )
}

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState('Dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  
  const handleStatClick = (title) => {
    if (title === 'Total Students') {
      setActiveMenu('Students')
    } else {
      alert(`Viewing ${title} details`)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  return (
    <motion.div className="dashboard-root">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <motion.main className="maincol">
        <motion.header 
          className="topbar"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div className="top-left">
            <motion.h2 
              className="page-title"
              key={activeMenu}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeMenu}
            </motion.h2>
            <div className="subtext">Welcome back, Jara Khan</div>
          </motion.div>
          <div className="top-right">
            <motion.div className="search">
              <motion.input 
                placeholder="Search" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                whileFocus={{ borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
            <motion.div 
              className="profile" 
              onClick={() => alert('Profile menu')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div className="avatar">JK</motion.div>
              <div className="profile-name">Jara Khan</div>
            </motion.div>
          </div>
        </motion.header>

        <motion.div
          key={activeMenu}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeMenu === 'Students' && <StudentsList />}
          {activeMenu === 'Teachers' && <TeachersList />}
          {activeMenu === 'Courses' && <CoursesList />}
          {activeMenu === 'Result' && <ResultList />}
          {activeMenu === 'Overview' && <OverviewPage />}
          {activeMenu === 'Dashboard' && (
            <motion.div 
              className="dashboard-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <motion.section 
                className="stats-row"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <StatCard title="Total Students" value="1,220" color="purple" icon="👥" onClick={() => handleStatClick('Total Students')} />
                <StatCard title="Total Teachers" value="120" color="pink" icon="👨‍🏫" />
                <StatCard title="Total Courses" value="15" color="blue" icon="📚" />
                <StatCard title="Faculty Rooms" value="100" color="orange" icon="🏢" />
              </motion.section>

              <motion.section 
                className="content-row"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="left-cards">
                  <motion.div className="card stats-chart">
                    <motion.div className="card-title">Statistics</motion.div>
                    <div className="bars">
                      {[1, 2, 3, 4, 5].map(i => (
                        <motion.div 
                          key={i} 
                          className={`bar ${i === 1 ? 'small' : i === 4 ? 'large purple' : 'medium'}`}
                          initial={{ height: 0 }}
                          whileInView={{ height: 'auto' }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 0.4 }}
                        />
                      ))}
                    </div>
                  </motion.div>

                  <motion.div className="card activity">
                    <motion.div className="card-title">Course Progress</motion.div>
                    <motion.div 
                      className="donut"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    >
                      <motion.div 
                        className="donut-center"
                        animate={{ rotate: [0, 360] }}
                        transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                        style={{ backgroundImage: 'conic-gradient(from 0deg, #3b82f6 0%, #8b5cf6 50%, #3b82f6 100%)' }}
                      >
                        75%
                      </motion.div>
                    </motion.div>
                    <p className="completion-text">Completion Rate</p>
                  </motion.div>

                <DatabaseTable />
              </div>

              <RightColumn />
            </motion.section>
            </motion.div>
          )}
        </motion.div>
      </motion.main>
    </motion.div>
  )
}
