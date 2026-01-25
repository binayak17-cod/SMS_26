import React from 'react'
import { motion } from 'framer-motion'

const TeachersPage = () => {
  return (
    <motion.div 
      className="page-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h3>Teachers</h3>
      <p>Teacher management</p>
    </motion.div>
  )
}

export default TeachersPage
