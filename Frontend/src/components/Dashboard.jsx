import React, { useState } from 'react'
import '../App.css'

const Sidebar = ({ activeMenu, setActiveMenu }) => (
  <aside className="sidebar">
    <div className="brand">
      <div className="logo-mark">E</div>
      <div className="brand-text">Education</div>
    </div>
    <nav className="menu">
      {['Dashboard', 'Overview', 'Courses', 'Students', 'Teachers', 'Exam', 'Result', 'Videos'].map(item => (
        <a 
          key={item}
          className={`menu-item ${activeMenu === item ? 'active' : ''}`}
          onClick={() => setActiveMenu(item)}
          style={{ cursor: 'pointer', transform: activeMenu === item ? 'translateX(5px)' : 'none', transition: 'all 0.3s ease' }}
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
        style={{ 
          cursor: 'pointer',
          transform: 'scale(1)',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        Get Analytics
      </button>
    </div>
  </aside>
)

const StatCard = ({ title, value, color, icon, onClick }) => (
  <div 
    className="stat-card"
    onClick={onClick}
    style={{ 
      cursor: 'pointer',
      transform: 'translateY(0)',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}
    onMouseEnter={(e) => {
      e.target.style.transform = 'translateY(-5px)'
      e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'
    }}
    onMouseLeave={(e) => {
      e.target.style.transform = 'translateY(0)'
      e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
    }}
  >
    <div className={`stat-icon ${color}`}>{icon}</div>
    <div className="stat-body">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
    </div>
  </div>
)

// Completely Redesigned Students List Component
const StudentsList = () => {
  const [studentSearch, setStudentSearch] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedSection, setSelectedSection] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  // TODO: Connect to database - replace with API call
  const mockStudents = [
    { id: 1, name: 'John Doe', year: '2024', section: 'A', rollNo: '001', email: 'john@email.com', phone: '+1 234-567-8900', status: 'Active', gpa: '3.8' },
    { id: 2, name: 'Jane Smith', year: '2024', section: 'B', rollNo: '002', email: 'jane@email.com', phone: '+1 234-567-8901', status: 'Active', gpa: '3.9' },
    { id: 3, name: 'Mike Johnson', year: '2023', section: 'A', rollNo: '003', email: 'mike@email.com', phone: '+1 234-567-8902', status: 'Active', gpa: '3.6' },
    { id: 4, name: 'Sarah Wilson', year: '2023', section: 'C', rollNo: '004', email: 'sarah@email.com', phone: '+1 234-567-8903', status: 'Active', gpa: '3.7' },
    { id: 5, name: 'David Brown', year: '2022', section: 'B', rollNo: '005', email: 'david@email.com', phone: '+1 234-567-8904', status: 'Inactive', gpa: '3.5' },
    { id: 6, name: 'Emily Davis', year: '2024', section: 'A', rollNo: '006', email: 'emily@email.com', phone: '+1 234-567-8905', status: 'Active', gpa: '4.0' },
    { id: 7, name: 'James Miller', year: '2023', section: 'B', rollNo: '007', email: 'james@email.com', phone: '+1 234-567-8906', status: 'Active', gpa: '3.4' },
    { id: 8, name: 'Sophia Garcia', year: '2022', section: 'C', rollNo: '008', email: 'sophia@email.com', phone: '+1 234-567-8907', status: 'Active', gpa: '3.9' }
  ]

  // Filter students based on search and filters
  const filteredStudents = mockStudents.filter(student => {
    const s = studentSearch.trim().toLowerCase()
    const matchesSearch = !s || student.name.toLowerCase().includes(s) || student.rollNo.includes(s) || student.email.toLowerCase().includes(s)
    const matchesYear = !selectedYear || student.year === selectedYear
    const matchesSection = !selectedSection || student.section === selectedSection
    return matchesSearch && matchesYear && matchesSection
  })

  return (
    <div className="students-page">
      {/* Header Section with Stats */}
      <div className="students-header">
        <div className="students-stats-grid">
          <div className="students-stat-item">
            <div className="stat-item-icon" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
              <span>👥</span>
            </div>
            <div className="stat-item-content">
              <div className="stat-item-label">Total Students</div>
              <div className="stat-item-value">{mockStudents.length}</div>
            </div>
          </div>
          
          <div className="students-stat-item">
            <div className="stat-item-icon" style={{ background: 'linear-gradient(135deg, #f093fb, #f5576c)' }}>
              <span>✓</span>
            </div>
            <div className="stat-item-content">
              <div className="stat-item-label">Active</div>
              <div className="stat-item-value">{mockStudents.filter(s => s.status === 'Active').length}</div>
            </div>
          </div>
          
          <div className="students-stat-item">
            <div className="stat-item-icon" style={{ background: 'linear-gradient(135deg, #4facfe, #00f2fe)' }}>
              <span>📚</span>
            </div>
            <div className="stat-item-content">
              <div className="stat-item-label">Class of 2024</div>
              <div className="stat-item-value">{mockStudents.filter(s => s.year === '2024').length}</div>
            </div>
          </div>
          
          <div className="students-stat-item">
            <div className="stat-item-icon" style={{ background: 'linear-gradient(135deg, #fa709a, #fee140)' }}>
              <span>⭐</span>
            </div>
            <div className="stat-item-content">
              <div className="stat-item-label">Avg GPA</div>
              <div className="stat-item-value">3.7</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="students-controls">
        <div className="students-search-section">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="students-search-input"
              placeholder="Search by name, roll number, or email..."
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
            />
          </div>
          
          <select
            className="students-filter-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>

          <select
            className="students-filter-select"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="">All Sections</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
          </select>
        </div>

        <div className="students-action-buttons">
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              ⊞
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              ☰
            </button>
          </div>
          
          <button
            className="students-clear-btn"
            onClick={() => { setStudentSearch(''); setSelectedYear(''); setSelectedSection('') }}
          >
            Clear Filters
          </button>
          
          <button className="students-add-btn">
            + Add Student
          </button>
          
          <button className="students-export-btn">
            ↓ Export
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="students-results-info">
        <span className="results-count">
          Showing <strong>{filteredStudents.length}</strong> of <strong>{mockStudents.length}</strong> students
        </span>
      </div>

      {/* Students Grid/List */}
      <div className="students-content-area">
        {viewMode === 'grid' ? (
          <div className="students-grid">
            {filteredStudents.map(student => (
              <div key={student.id} className="student-card">
                <div className="student-card-header">
                  <div className="student-avatar">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className={`student-status-badge ${student.status.toLowerCase()}`}>
                    {student.status}
                  </div>
                </div>
                
                <div className="student-card-body">
                  <h3 className="student-name">{student.name}</h3>
                  <div className="student-roll">Roll No: #{student.rollNo}</div>
                  
                  <div className="student-info-grid">
                    <div className="student-info-item">
                      <span className="info-icon">📅</span>
                      <div className="info-text">
                        <div className="info-label">Year</div>
                        <div className="info-value">{student.year}</div>
                      </div>
                    </div>
                    
                    <div className="student-info-item">
                      <span className="info-icon">📋</span>
                      <div className="info-text">
                        <div className="info-label">Section</div>
                        <div className="info-value">{student.section}</div>
                      </div>
                    </div>
                    
                    <div className="student-info-item">
                      <span className="info-icon">⭐</span>
                      <div className="info-text">
                        <div className="info-label">GPA</div>
                        <div className="info-value">{student.gpa}</div>
                      </div>
                    </div>
                    
                    <div className="student-info-item">
                      <span className="info-icon">✉️</span>
                      <div className="info-text">
                        <div className="info-label">Email</div>
                        <div className="info-value-small">{student.email}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="student-card-footer">
                  <button className="student-action-btn view-btn-card">View Profile</button>
                  <button className="student-action-btn edit-btn">Edit</button>
                  <button className="student-action-btn more-btn">⋯</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="students-list">
            <div className="students-list-header">
              <div className="list-col-avatar"></div>
              <div className="list-col-name">Name</div>
              <div className="list-col-roll">Roll No</div>
              <div className="list-col-year">Year</div>
              <div className="list-col-section">Section</div>
              <div className="list-col-gpa">GPA</div>
              <div className="list-col-status">Status</div>
              <div className="list-col-email">Email</div>
              <div className="list-col-actions">Actions</div>
            </div>
            
            {filteredStudents.map(student => (
              <div key={student.id} className="students-list-row">
                <div className="list-col-avatar">
                  <div className="student-avatar-small">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="list-col-name">
                  <div className="list-name-main">{student.name}</div>
                </div>
                <div className="list-col-roll">#{student.rollNo}</div>
                <div className="list-col-year">{student.year}</div>
                <div className="list-col-section">{student.section}</div>
                <div className="list-col-gpa">
                  <span className="gpa-badge">{student.gpa}</span>
                </div>
                <div className="list-col-status">
                  <span className={`status-badge-list ${student.status.toLowerCase()}`}>
                    {student.status}
                  </span>
                </div>
                <div className="list-col-email">{student.email}</div>
                <div className="list-col-actions">
                  <button className="list-action-btn" title="View">👁️</button>
                  <button className="list-action-btn" title="Edit">✏️</button>
                  <button className="list-action-btn" title="More">⋯</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredStudents.length === 0 && (
          <div className="students-empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3 className="empty-state-title">No students found</h3>
            <p className="empty-state-text">Try adjusting your search or filter criteria</p>
            <button 
              className="empty-state-btn"
              onClick={() => { setStudentSearch(''); setSelectedYear(''); setSelectedSection('') }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
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
          <tr 
            key={i}
            style={{
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f3f4f6'
              e.target.style.transform = 'scale(1.01)'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent'
              e.target.style.transform = 'scale(1)'
            }}
            onClick={() => alert(`Viewing ${student.name} details`)}
          >
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

const RightColumn = () => (
  <aside className="rightcol">
    <div className="calendar card">
      <div className="calendar-header">January 2022</div>
      <div className="calendar-grid">
        {Array.from({ length: 31 }).map((_, i) => (
          <div 
            key={i} 
            className={`day ${i + 1 === 13 ? 'today' : ''}`}
            style={{
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)'
              e.target.style.backgroundColor = '#667eea'
              e.target.style.color = 'white'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)'
              e.target.style.backgroundColor = i + 1 === 13 ? '#667eea' : 'transparent'
              e.target.style.color = i + 1 === 13 ? 'white' : 'inherit'
            }}
            onClick={() => alert(`Selected date: ${i + 1} January 2022`)}
          >
            {i + 1}
          </div>
        ))}
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
          <li 
            key={i}
            style={{
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              padding: '5px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f3f4f6'
              e.target.style.transform = 'translateX(5px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent'
              e.target.style.transform = 'translateX(0)'
            }}
            onClick={() => alert(`Opening: ${notice}`)}
          >
            {notice}
          </li>
        ))}
      </ul>
    </div>
  </aside>
)

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
            <h2 style={{ 
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {activeMenu}
            </h2>
            <div className="subtext">Welcome back, Jara Khan</div>
          </div>
          <div className="top-right">
            <div className="search"> 
              <input 
                placeholder="Search" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  transition: 'all 0.3s ease',
                  transform: 'scale(1)'
                }}
                onFocus={(e) => e.target.style.transform = 'scale(1.02)'}
                onBlur={(e) => e.target.style.transform = 'scale(1)'}
              />
            </div>
            <div 
              className="profile"
              style={{
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onClick={() => alert('Profile menu')}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              <div className="avatar">JK</div>
              <div className="profile-name">Jara Khan</div>
            </div>
          </div>
        </header>

        {activeMenu === 'Students' ? (
          <StudentsList />
        ) : (
          <>
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
                  <div 
                    key={i}
                    className={`bar ${i === 1 ? 'small' : i === 4 ? 'large purple' : 'medium'}`}
                    style={{
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scaleY(1.1)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scaleY(1)'}
                    onClick={() => alert(`Bar ${i} clicked`)}
                  />
                ))}
              </div>
            </div>

            <div 
              className="card activity"
              style={{
                cursor: 'pointer',
                transition: 'transform 0.3s ease'
              }}
              onClick={() => alert('Course progress details')}
              onMouseEnter={(e) => e.target.style.transform = 'rotateY(5deg)'}
              onMouseLeave={(e) => e.target.style.transform = 'rotateY(0deg)'}
            >
              <div className="card-title">Course Progress</div>
              <div 
                className="donut"
                style={{
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'rotate(10deg)'}
                onMouseLeave={(e) => e.target.style.transform = 'rotate(0deg)'}
              >
                <div className="donut-center">75%</div>
              </div>
              <p style={{color: '#6b7280', fontSize: '14px', margin: 0}}>Completion Rate</p>
            </div>

            <DatabaseTable />
          </div>

          <RightColumn />
        </section>
          </>
        )}
      </main>
    </div>
  )
}