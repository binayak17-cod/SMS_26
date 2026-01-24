import React, { useEffect, useRef, useState } from 'react'
import './Landingpage.css'
import { Link } from 'react-router-dom'

const Landingpage = () => {
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

  return (
    <>
      <div style={{ height: '200vh' }} ref={scrollContainerRef}>
        <div className="landing-container">
          <div className="hero-section">
            <h1>Welcome to <span>EDUNEXUS</span></h1>
            <h2>Student Management System</h2>
            <p>Streamline your educational institution with our comprehensive management solution</p>
            <div className="bttn-cont">
              <Link to="/login"><button>Go To Portal</button></Link>
            </div>
          </div>
        </div>
        
        <section className="about-section" ref={aboutRef}>
          <h2>What We Do</h2>
          <div className="cards-container">
            <div className="card">
              <h3>Student Management</h3>
              <p>Comprehensive student information and enrollment management system</p>
            </div>
            <div className="card">
              <h3>Attendance Tracking</h3>
              <p>Real-time attendance monitoring and automated reporting</p>
            </div>
            <div className="card">
              <h3>Grade Management</h3>
              <p>Efficient grading system with detailed performance analytics</p>
            </div>
            <div className="card">
              <h3>Communication</h3>
              <p>Seamless communication between teachers, students, and parents</p>
            </div>
          </div>
          
          <div className="contact-section">
            <h2>Contact Us</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <input type="text" name='name' placeholder="Your Name" value={formData.name} onChange={handleChange} required />
              <input type="email" name='email' placeholder="Your Email" value={formData.email} onChange={handleChange} required />
              <textarea name='message' placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
              <button type="submit">Send Message</button>
              {status && <p className="status-message">{status}</p>}
            </form>
          </div>
          
          <footer className="footer">
            <div className="footer-content">
              <div className="footer-section">
                <h3>EDUNEXUS</h3>
                <p>Transforming education management with innovative solutions for modern institutions.</p>
              </div>
              <div className="footer-section">
                <h3>Quick Links</h3>
                <ul>
                  <li>About Us</li>
                  <li>Features</li>
                  <li>Pricing</li>
                  <li>Contact</li>
                </ul>
              </div>
              <div className="footer-section">
                <h3>Contact</h3>
                <ul>
                  <li>Email: info@edunexus.com</li>
                  <li>Phone: +1 234 567 890</li>
                  <li>Address: 123 Education St</li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2026 EDUNEXUS. All rights reserved. Made with 💖 by Team EDUNEXUS</p>
            </div>
          </footer>
        </section>
      </div>
    </>
  )
}

export default Landingpage
