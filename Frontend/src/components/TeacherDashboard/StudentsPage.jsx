import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Search, Mail, BookOpen } from 'lucide-react'

const StudentsPage = () => {
  const [allStudents, setAllStudents] = useState([])
  const [filteredStudents, setFilteredStudents] = useState([])
  const [classes, setClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState('')
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchStudents()
  }, [])

  useEffect(() => {
    filterStudents()
  }, [selectedClass, searchQuery, allStudents])

  const fetchStudents = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/users?role=student')
      const data = await res.json()
      if (data.success && data.users) {
        setAllStudents(data.users)

        // Extract unique classes combinations
        const uniqueClasses = [...new Set(
          data.users.map(s => `${s.department}${s.sec ? s.sec : ''}`)
        )].sort()

        setClasses(uniqueClasses)
        if (uniqueClasses.length > 0) {
          setSelectedClass(uniqueClasses[0]) // Select first class by default
        }
      }
    } catch (err) {
      console.error('Error fetching students:', err)
    } finally {
      setLoading(false)
    }
  }

  const filterStudents = () => {
    let filtered = allStudents

    if (selectedClass) {
      filtered = filtered.filter(s => `${s.department}${s.sec ? s.sec : ''}` === selectedClass)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.id.toLowerCase().includes(query) ||
        s.email.toLowerCase().includes(query)
      )
    }

    setFilteredStudents(filtered)
  }

  return (
    <motion.div
      className="max-w-7xl mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Class Filter Dropdown */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BookOpen className="h-4 w-4 text-slate-400" />
            </div>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="block w-full pl-10 pr-10 py-2 text-sm border-slate-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm border appearance-none transition-shadow hover:shadow-md outline-none"
            >
              <option value="">All Classes</option>
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-4 py-2 text-sm border-slate-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm border transition-shadow hover:shadow-md outline-none"
            />
          </div>
        </div>
      </div>

      {/* Student List Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-slate-500 flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            Loading students...
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="p-10 text-center text-slate-500 flex flex-col items-center justify-center">
            <div className="bg-slate-100 p-4 rounded-full mb-4 text-slate-400">
              <Users size={32} />
            </div>
            <p className="font-medium text-slate-700">No students found</p>
            <p className="text-sm mt-1">Try changing the selected class or modifying your search</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50/50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Student Information
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Student ID / Roll
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Section
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-tr from-indigo-100 to-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100">
                          {student.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-slate-800">{student.name}</div>
                          <div className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                            <Mail size={12} /> {student.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-700">{student.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-slate-700">
                        {student.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left">
                      <span className="text-sm font-medium text-slate-700">
                        {student.sec || 'N/A'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer info */}
        {!loading && filteredStudents.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing <span className="font-semibold text-slate-700">{filteredStudents.length}</span> students found
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default StudentsPage
