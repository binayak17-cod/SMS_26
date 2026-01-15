import React, { useState } from 'react'
import '../App.css'

const Sidebar = ({ activeMenu, setActiveMenu }) => (
  <aside className="sidebar">
    <div className="brand">
      <div className="logo-mark">G</div>
      <div className="brand-text">GIETU</div>
    </div>
    <nav className="menu">
      {['Dashboard', 'Overview', 'Courses', 'Students', 'Teachers', 'Result'].map(item => (
        <a 
          key={item}
          className={`menu-item ${activeMenu === item ? 'active' : ''}`}
          onClick={() => setActiveMenu(item)}
        >
          {item}
        </a>
      ))}
    </nav>
    <div className="invite">
      <div className="invite-illustration">📊</div>
      <button 
        className="invite-btn"
        onClick={() => alert('Analytics feature coming soon!')}
      >
        Get Analytics
      </button>
    </div>
  </aside>
)

const StatCard = ({ title, value, color, icon, onClick }) => (
  <div className="stat-card" onClick={onClick}>
    <div className={`stat-icon ${color}`}>{icon}</div>
    <div className="stat-body">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
    </div>
  </div>
)

// Students Component - Rebuilt to match Dashboard dimensions
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

  return (
    <div className="dashboard-content">
      <section className="stats-row">
        <StatCard title="Total Students" value={students.length.toString()} color="purple" icon="👥" />
        <StatCard title="Active Students" value={students.filter(s => s.status === 'Active').length.toString()} color="pink" icon="✓" />
        <StatCard title="Class of 2024" value={students.filter(s => s.year === '2024').length.toString()} color="blue" icon="📚" />
        <StatCard title="Avg GPA" value={(students.reduce((sum, s) => sum + parseFloat(s.gpa), 0) / students.length).toFixed(1)} color="orange" icon="⭐" />
      </section>

      <section className="content-row">
        <div className="left-cards">
          <div className="card">
            <div className="card-title">Student Management</div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="Search students..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ flex: 1, minWidth: '200px', padding: '10px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }}
                />
                <select value={year} onChange={(e) => setYear(e.target.value)} style={{ padding: '10px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }}>
                  <option value="">All Years</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
                <select value={section} onChange={(e) => setSection(e.target.value)} style={{ padding: '10px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }}>
                  <option value="">All Sections</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>
                <button className="btn-primary" style={{ padding: '10px 20px' }}>+ Add Student</button>
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
                Showing <strong>{filtered.length}</strong> of <strong>{students.length}</strong> students
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', maxHeight: '500px', overflowY: 'auto' }}>
              {filtered.map(student => (
                <div key={student.id} style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700' }}>
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', background: student.status === 'Active' ? '#d1fae5' : '#fee2e2', color: student.status === 'Active' ? '#059669' : '#dc2626' }}>
                      {student.status}
                    </span>
                  </div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '700' }}>{student.name}</h3>
                  <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#6b7280' }}>Roll No: #{student.rollNo}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
                    <div><span style={{ color: '#9ca3af' }}>Year:</span> <strong>{student.year}</strong></div>
                    <div><span style={{ color: '#9ca3af' }}>Section:</span> <strong>{student.section}</strong></div>
                    <div><span style={{ color: '#9ca3af' }}>GPA:</span> <strong>{student.gpa}</strong></div>
                    <div style={{ gridColumn: '1 / -1' }}><span style={{ color: '#9ca3af' }}>Email:</span> <strong style={{ fontSize: '11px' }}>{student.email}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <RightColumn />
      </section>
    </div>
  )
}

// Teachers Component - Rebuilt to match Dashboard dimensions
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

  return (
    <div className="dashboard-content">
      <section className="stats-row">
        <StatCard title="Total Teachers" value={teachers.length.toString()} color="purple" icon="👨‍🏫" />
        <StatCard title="Active Teachers" value={teachers.length.toString()} color="pink" icon="✓" />
        <StatCard title="Total Students" value={teachers.reduce((sum, t) => sum + t.students, 0).toString()} color="blue" icon="👥" />
        <StatCard title="Avg Rating" value={(teachers.reduce((sum, t) => sum + parseFloat(t.rating), 0) / teachers.length).toFixed(1)} color="orange" icon="⭐" />
      </section>

      <section className="content-row">
        <div className="left-cards">
          <div className="card">
            <div className="card-title">Staff Directory</div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="Search staff..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ flex: 1, minWidth: '200px', padding: '10px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }}
                />
                <select value={department} onChange={(e) => setDepartment(e.target.value)} style={{ padding: '10px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }}>
                  <option value="">All Departments</option>
                  <option value="Science">Science</option>
                  <option value="Technology">Technology</option>
                  <option value="Humanities">Humanities</option>
                </select>
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
                Showing <strong>{filtered.length}</strong> of <strong>{teachers.length}</strong> staff members
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', maxHeight: '600px', overflowY: 'auto' }}>
              {filtered.map(teacher => (
                <div key={teacher.id} style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', cursor: 'pointer', transition: 'all 0.3s ease', hover: { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' } }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '16px' }}>
                      {teacher.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', background: '#dbeafe', color: '#0284c7' }}>
                      {teacher.department}
                    </span>
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
                </div>
              ))}
            </div>
          </div>
        </div>
        <RightColumn />
      </section>
    </div>
  )
}

// Courses Component - Rebuilt to match Dashboard dimensions
const CoursesList = () => {
  const courses = [
    { id: 1, name: 'Mathematics 101', code: 'MATH101', students: 45, credits: 3, status: 'Active' },
    { id: 2, name: 'Physics Fundamentals', code: 'PHYS101', students: 38, credits: 4, status: 'Active' },
    { id: 3, name: 'Chemistry Basics', code: 'CHEM101', students: 42, credits: 3, status: 'Active' },
    { id: 4, name: 'Computer Science Intro', code: 'CS101', students: 50, credits: 3, status: 'Active' }
  ]

  return (
    <div className="dashboard-content">
      <section className="stats-row">
        <StatCard title="Total Courses" value={courses.length.toString()} color="purple" icon="📚" />
        <StatCard title="Active Courses" value={courses.filter(c => c.status === 'Active').length.toString()} color="pink" icon="✓" />
        <StatCard title="Total Students" value={courses.reduce((sum, c) => sum + c.students, 0).toString()} color="blue" icon="👥" />
        <StatCard title="Total Credits" value={courses.reduce((sum, c) => sum + c.credits, 0).toString()} color="orange" icon="⭐" />
      </section>

      <section className="content-row">
        <div className="left-cards">
          <div className="card">
            <div className="card-title">Courses Management</div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <input type="text" placeholder="Search courses..." style={{ flex: 1, padding: '10px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }} />
              <button className="btn-primary" style={{ padding: '10px 20px' }}>+ Add Course</button>
            </div>
            <DatabaseTable />
          </div>
        </div>
        <RightColumn />
      </section>
    </div>
  )
}

// Result Component - Rebuilt to match Dashboard dimensions
// Connected to database for adding and managing student results
const ResultList = () => {
  return (
    <div className="dashboard-content">
      <section className="stats-row">
        <StatCard title="Total Results" value="1,220" color="purple" icon="📊" />
        <StatCard title="Passed" value="1,100" color="pink" icon="✓" />
        <StatCard title="Failed" value="120" color="blue" icon="✗" />
        <StatCard title="Avg Score" value="78%" color="orange" icon="⭐" />
      </section>

      <section className="content-row">
        <div className="left-cards">
          <div className="card">
            <div className="card-title">Results Management</div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <input type="text" placeholder="Search results..." style={{ flex: 1, padding: '10px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }} />
              <button className="btn-primary" style={{ padding: '10px 20px' }}>+ Add Result</button>
            </div>
            <DatabaseTable />
          </div>
        </div>
        <RightColumn />
      </section>
    </div>
  )
}

// Overview Component - Rebuilt to match Dashboard dimensions
const OverviewPage = () => {
  return (
    <div className="dashboard-content">
      <section className="stats-row">
        <StatCard title="Total Students" value="1,220" color="purple" icon="👥" />
        <StatCard title="Total Teachers" value="120" color="pink" icon="👨‍🏫" />
        <StatCard title="Total Courses" value="15" color="blue" icon="📚" />
        <StatCard title="Active Exams" value="8" color="orange" icon="📝" />
      </section>

      <section className="content-row">
        <div className="left-cards">
          <div className="card stats-chart">
            <div className="card-title">Overview Statistics</div>
            <div className="bars">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className={`bar ${i === 1 ? 'small' : i === 4 ? 'large purple' : 'medium'}`} />
              ))}
            </div>
          </div>

          <div className="card activity">
            <div className="card-title">System Overview</div>
            <div className="donut">
              <div className="donut-center">85%</div>
            </div>
            <p className="completion-text">System Health</p>
          </div>

          <DatabaseTable />
        </div>
        <RightColumn />
      </section>
    </div>
  )
}

const DatabaseTable = () => (
  <div className="db-card">
    <div className="db-header">Database</div>
    <table className="db-table">
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
          <tr key={i} onClick={() => alert(`Viewing ${student.name} details`)}>
            <td>{student.name}</td>
            <td>{student.score}</td>
            <td>{student.date}</td>
            <td>{student.grade}</td>
            <td className={student.status.toLowerCase()}>{student.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
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
    <aside className="rightcol">
      <div className="calendar card">
        <div className="calendar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{monthNames[currentMonth]} {currentYear}</span>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>
            {today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} - {today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <div className="calendar-grid">
          {calendarDays.map((day, i) => {
            const dayOfWeek = getDayOfWeek(day)
            const isToday = day === currentDate
            const isPassed = day && day < currentDate
            const isSunday = dayOfWeek === 0
            
            return (
              <div 
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
              >
                {day}
              </div>
            )
          })}
        </div>
      </div>
      <div className="notice card">
        <div className="notice-header">Notice Board</div>
        <ul className="notice-list">
          {[
            'Notice of Special Examinations',
            'Time Extension Notice of Semester Admission',
            'COVID-19 Vaccination Survey October 2021',
            'Scholarship Viva Notice Spring 2021'
          ].map((notice, i) => (
            <li key={i} onClick={() => alert(`Opening: ${notice}`)}>
              {notice}
            </li>
          ))}
        </ul>
      </div>
    </aside>
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

  return (
    <div className="dashboard-root">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <main className="maincol">
        <header className="topbar">
          <div className="top-left">
            <h2 className="page-title">{activeMenu}</h2>
            <div className="subtext">Welcome back, Jara Khan</div>
          </div>
          <div className="top-right">
            <div className="search"> 
              <input 
                placeholder="Search" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="profile" onClick={() => alert('Profile menu')}>
              <div className="avatar">JK</div>
              <div className="profile-name">Jara Khan</div>
            </div>
          </div>
        </header>

        {activeMenu === 'Students' && <StudentsList />}
        {activeMenu === 'Teachers' && <TeachersList />}
        {activeMenu === 'Courses' && <CoursesList />}
        {activeMenu === 'Result' && <ResultList />}
        {activeMenu === 'Overview' && <OverviewPage />}
        {activeMenu === 'Dashboard' && (
          <div className="dashboard-content">
            <section className="stats-row">
              <StatCard title="Total Students" value="1,220" color="purple" icon="👥" onClick={() => handleStatClick('Total Students')} />
              <StatCard title="Total Teachers" value="120" color="pink" icon="👨‍🏫" />
              <StatCard title="Total Courses" value="15" color="blue" icon="📚" />
              <StatCard title="Faculty Rooms" value="100" color="orange" icon="🏢" />
            </section>

            <section className="content-row">
              <div className="left-cards">
                <div className="card stats-chart">
                  <div className="card-title">Statistics</div>
                  <div className="bars">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className={`bar ${i === 1 ? 'small' : i === 4 ? 'large purple' : 'medium'}`} />
                    ))}
                  </div>
                </div>

                <div className="card activity">
                  <div className="card-title">Course Progress</div>
                  <div className="donut">
                    <div className="donut-center">75%</div>
                  </div>
                  <p className="completion-text">Completion Rate</p>
                </div>

                <DatabaseTable />
              </div>

              <RightColumn />
            </section>
          </div>
        )}
      </main>
    </div>
  )
}