import React from 'react'
import { motion } from 'framer-motion'

const AttendancePage = () => {
  return (
    <motion.div 
      className="page-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h3>Attendance</h3>
      <p>Manage student attendance</p>
    </motion.div>
  )
}

export default AttendancePage
