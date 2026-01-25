import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import './LandingPage.css'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import { School, People, Assessment, Chat } from '@mui/icons-material'

const LandingPage = () => {
  const aboutRef = useRef(null)
  const scrollContainerRef = useRef(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const [status, setStatus] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Sending...')

    try {
      const response = await fetch('http://127.0.0.1:5000/api/contact', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        setStatus('Message sent successfully!')
        setFormData({ name: "", email: "", message: "" })
      } else {
        setStatus('Failed to send message. Please try again later.')
      }
    } catch (error) {
      console.log(error)
      setStatus("An error occurred. Please try again later.")
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        aboutRef.current?.classList.add('visible')
      } else {
        aboutRef.current?.classList.remove('visible')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  }

  return (
    <>
     <Navbar />
      <div style={{ height: '200vh' }} ref={scrollContainerRef}>
        <div className="landing-container">
          <div className="hero-section">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Welcome to <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >EDUNEXUS</motion.span>
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Student Management System
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Streamline your educational institution with our comprehensive management solution
            </motion.p>
            
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <motion.div 
                className="bttn-cont"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.button
                  whileHover={{ 
                    boxShadow: "0 10px 25px rgba(138, 193, 193, 0.4)",
                    y: -2
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Go To Portal
                </motion.button>
              </motion.div>
            </Link>
          </div>
        </div>
        
        <section className="about-section" ref={aboutRef}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            What We Do
          </motion.h2>
          
          <div className="cards-container">
            {[
              {
                title: "Student Management",
                description: "Comprehensive student information and enrollment management system",
                icon: School
              },
              {
                title: "Attendance Tracking",
                description: "Real-time attendance monitoring and automated reporting",
                icon: People
              },
              {
                title: "Grade Management",
                description: "Efficient grading system with detailed performance analytics",
                icon: Assessment
              },
              {
                title: "Communication",
                description: "Seamless communication between teachers, students, and parents",
                icon: Chat
              }
            ].map((card, index) => {
              const IconComponent = card.icon
              return (
                <motion.div
                  key={index}
                  className="card"
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  variants={cardVariants}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                    viewport={{ once: true }}
                    style={{ marginBottom: '1rem' }}
                  >
                    <IconComponent sx={{ fontSize: 48, color: '#6c757d' }} />
                  </motion.div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </motion.div>
              )
            })}
          </div>
          
          <motion.div 
            className="contact-section"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2>Contact Us</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <motion.input 
                type="text" 
                name='name' 
                placeholder="Your Name" 
                value={formData.name} 
                onChange={handleChange} 
                required
                whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(138, 193, 193, 0.3)" }}
                transition={{ duration: 0.2 }}
              />
              <motion.input 
                type="email" 
                name='email' 
                placeholder="Your Email" 
                value={formData.email} 
                onChange={handleChange} 
                required
                whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(138, 193, 193, 0.3)" }}
                transition={{ duration: 0.2 }}
              />
              <motion.textarea 
                name='message' 
                placeholder="Your Message" 
                rows="5" 
                value={formData.message} 
                onChange={handleChange} 
                required
                whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(138, 193, 193, 0.3)" }}
                transition={{ duration: 0.2 }}
              />
              <motion.button 
                type="submit"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(138, 193, 193, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Send Message
              </motion.button>
              {status && (
                <motion.p 
                  className="status-message"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {status}
                </motion.p>
              )}
            </form>
          </motion.div>
          
          <motion.footer 
            className="footer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="footer-content">
              <motion.div 
                className="footer-section"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3>EDUNEXUS</h3>
                <p>Transforming education management with innovative solutions for modern institutions.</p>
              </motion.div>
              <motion.div 
                className="footer-section"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3>Quick Links</h3>
                <ul>
                  <motion.li whileHover={{ x: 5, color: "rgb(151, 239, 239)" }}>About Us</motion.li>
                  <motion.li whileHover={{ x: 5, color: "rgb(151, 239, 239)" }}>Features</motion.li>
                  <motion.li whileHover={{ x: 5, color: "rgb(151, 239, 239)" }}>Pricing</motion.li>
                  <motion.li whileHover={{ x: 5, color: "rgb(151, 239, 239)" }}>Contact</motion.li>
                </ul>
              </motion.div>
              <motion.div 
                className="footer-section"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3>Contact</h3>
                <ul>
                  <li>Email: info@edunexus.com</li>
                  <li>Phone: +1 234 567 890</li>
                  <li>Address: 123 Education St</li>
                </ul>
              </motion.div>
            </div>
            <motion.div 
              className="footer-bottom"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p>© 2026 EDUNEXUS. All rights reserved. Made with 💖 by Team EDUNEXUS</p>
            </motion.div>
          </motion.footer>
        </section>
      </div>
    </>
  )
}

export default LandingPage