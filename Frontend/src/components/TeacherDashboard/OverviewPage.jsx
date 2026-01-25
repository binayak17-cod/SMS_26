import React from 'react'
import { motion } from 'framer-motion'

const OverviewPage = () => {
  return (
    <motion.div 
      className="page-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h3>Overview</h3>
      <p>Overview of your teaching activities</p>
    </motion.div>
  )
}

export default OverviewPage
