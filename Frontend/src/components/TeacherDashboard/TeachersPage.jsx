import React from 'react'
import { motion } from 'framer-motion'

import { useState, useEffect } from 'react'

const TeachersPage = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Placeholder data - Connect to Database API here
  // const [staffData, setStaffData] = useState([])
  // useEffect(() => { fetch('/api/staff').then(...) }, [])

  const staffData = [
    { id: 1, name: 'John Doe', designation: 'Senior Professor', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', designation: 'Assistant Professor', phone: '987-654-3210' },
    { id: 3, name: 'Robert Wilson', designation: 'Lab Technician', phone: '555-555-5555' },
    { id: 4, name: 'Sarah Brown', designation: 'Lecturer', phone: '111-222-3333' }
  ]

  const filteredStaff = staffData.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.designation.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <motion.div
      className="page-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0, color: '#2b3674' }}>Staff Directory</h3>
          <p style={{ margin: 0, color: '#a3aed0', fontSize: '14px' }}>Manage and view all staff members</p>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search by name or designation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '300px' }}
          />
        </div>
      </div>

      <div className="card-section">
        <table className="excel-table">
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((staff, index) => (
              <tr key={staff.id}>
                <td>#{index + 1}</td>
                <td>
                  <div style={{ fontWeight: '700' }}>{staff.name}</div>
                </td>
                <td>
                  <span className="status-badge" style={{ background: '#F4F7FE', color: '#4318ff' }}>
                    {staff.designation}
                  </span>
                </td>
                <td>{staff.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredStaff.length === 0 && (
          <div style={{ padding: '20px', textAlign: 'center', color: '#a3aed0' }}>
            No staff members found matching "{searchTerm}"
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default TeachersPage
