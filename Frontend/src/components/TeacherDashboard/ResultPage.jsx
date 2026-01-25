import React from 'react'
import { motion } from 'framer-motion'

const ResultPage = () => {
  return (
    <motion.div 
      className="page-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h3>Result</h3>
      <p>View and manage student results</p>
    </motion.div>
  )
}

export default ResultPage
