import React, { useState, useEffect } from 'react'
import StudentLayout from './StudentLayout'

export default function ResultPage() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  const [rollNumber, setRollNumber] = useState('')
  const [selectedSemester, setSelectedSemester] = useState('')
  const [selectedExamType, setSelectedExamType] = useState('')
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    const studentId = localStorage.getItem('userId') || '23CSE346'
    setRollNumber(studentId)
    fetchResults(studentId)
  }, [])

  const fetchResults = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/results/${id}`)
      const data = await res.json()
      if (data.success) {
        setResults(data.results)
        setTableData(data.results)
        const sems = [...new Set(data.results.map(r => r.semester.replace('Sem ', '')))].sort()
        if (sems.length > 0) setSelectedSemester(sems[sems.length - 1])
      }
    } catch (err) {
      console.error('Error fetching results:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = () => {
    let filtered = results;
    if (selectedSemester) {
      // Semester comes from DB as 'Sem 6', local state is '6'
      filtered = filtered.filter(r => r.semester.includes(selectedSemester))
    }
    if (selectedExamType) {
      filtered = filtered.filter(r => r.examType === selectedExamType)
    }
    setTableData(filtered)
  }

  const semesters = [...new Set(results.map(r => r.semester.replace('Sem ', '')))].sort()
  const examTypes = [...new Set(results.map(r => r.examType))]

  return (
    <StudentLayout>
      <div style={{ padding: '30px', background: '#f5f7fa', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>

        <div style={{ background: '#ffffff', borderRadius: '4px', padding: '25px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>


          <h2 style={{ fontSize: '18px', color: '#2b3674', fontWeight: 'normal', margin: '0 0 15px 0' }}>Exam Details</h2>
          <div style={{ width: '100%', height: '1px', background: '#eef2f6', marginBottom: '20px' }}></div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', marginBottom: '25px', flexWrap: 'wrap' }}>


            <div style={{ flex: 1, minWidth: '180px', maxWidth: '280px' }}>
              <label style={{ fontSize: '14px', color: '#333', marginBottom: '8px', display: 'block' }}>
                Semester <span style={{ color: '#dc3545' }}>*</span>
              </label>
              <select
                value={selectedSemester}
                onChange={e => setSelectedSemester(e.target.value)}
                style={{
                  width: '100%', padding: '10px 12px', border: '1px solid #ced4da',
                  borderRadius: '4px', color: '#495057', fontSize: '14px', outline: 'none',
                  background: 'white'
                }}
              >
                <option value="">-Select-</option>
                {semesters.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div style={{ flex: 1, minWidth: '180px', maxWidth: '280px' }}>
              <label style={{ fontSize: '14px', color: '#333', marginBottom: '8px', display: 'block' }}>
                Exam Type <span style={{ color: '#dc3545' }}>*</span>
              </label>
              <select
                value={selectedExamType}
                onChange={e => setSelectedExamType(e.target.value)}
                style={{
                  width: '100%', padding: '10px 12px', border: '1px solid #ced4da',
                  borderRadius: '4px', color: '#495057', fontSize: '14px', outline: 'none',
                  background: 'white'
                }}
              >
                <option value="">-Select-</option>
                {examTypes.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>

            <div>
              <button
                onClick={handleViewDetails}
                style={{
                  background: '#8a8585ff', color: 'white', border: 'none',
                  padding: '11px 20px', borderRadius: '4px', cursor: 'pointer',
                  fontSize: '14px', fontWeight: 'bold', transition: 'filter 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.filter = 'brightness(95%)'}
                onMouseOut={e => e.currentTarget.style.filter = 'brightness(100%)'}
              >
                View Exam Details
              </button>
            </div>
          </div>



          <div style={{ overflowX: 'auto', border: '1px solid #eef2f6', marginBottom: '40px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#8c8c8cff', color: 'white' }}>
                  <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: 'bold', borderRight: '1px solid rgba(255,255,255,0.3)', width: '30%' }}>Exam</th>
                  <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: 'bold', borderRight: '1px solid rgba(255,255,255,0.3)' }}>Marks Secured</th>
                  <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: 'bold', borderRight: '1px solid rgba(255,255,255,0.3)' }}>Total Marks</th>
                  <th style={{ padding: '12px 10px', textAlign: 'left', fontWeight: 'bold', borderRight: '1px solid rgba(255,255,255,0.3)' }}>Percentage</th>

                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#666' }}>Loading...</td></tr>
                ) : tableData.length === 0 ? (
                  <tr><td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#666' }}>No records found.</td></tr>
                ) : (
                  tableData.map((row, idx) => (
                    <tr key={row.id} style={{ background: idx % 2 === 0 ? '#f8f9fa' : '#ffffff', borderBottom: '1px solid #eef2f6' }}>
                      <td style={{ padding: '12px 15px', color: '#333' }}>{row.subject} ({row.examType})</td>
                      <td style={{ padding: '12px 15px', color: '#333' }}>{row.obtainedMarks}</td>
                      <td style={{ padding: '12px 15px', color: '#333' }}>{row.totalMarks.toFixed(2)}</td>
                      <td style={{ padding: '12px 15px', color: '#333' }}>{row.score.toFixed(2)}</td>
                      <td style={{ padding: '12px 0px' }}>

                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div style={{ width: '100%', height: '1px', background: '#eef2f6', marginBottom: '20px' }}></div>

          {/* Go back bottom */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '10px' }}>
            <button
              onClick={() => window.history.back()}
              style={{
                background: '#5d5f5fff', color: 'white', border: 'none',
                padding: '10px 24px', borderRadius: '4px', cursor: 'pointer',
                fontSize: '14px', fontWeight: 'bold', transition: 'filter 0.2s'
              }}
              onMouseOver={e => e.currentTarget.style.filter = 'brightness(95%)'}
              onMouseOut={e => e.currentTarget.style.filter = 'brightness(100%)'}
            >
              Go back!
            </button>
          </div>

        </div>
      </div>
    </StudentLayout>
  )
}
