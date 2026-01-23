import React from 'react'
import { motion } from 'framer-motion'

const StudentsPage = () => {
  return (
    <motion.div 
      className="page-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h3>Students</h3>
      <p>View and manage students</p>
    </motion.div>
  )
}

export default StudentsPage
