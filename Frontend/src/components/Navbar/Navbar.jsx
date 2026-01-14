import React, { useEffect, useState } from 'react'
import './Navbar.css'

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(true)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${!isVisible ? 'hidden' : ''}`}>
      <div className="navbar-brand">
        <h1>EDUNEXUS</h1>
      </div>
      <div className="navbar-nav">
        <ul>
          <li>CONTACT US</li>
          <li>ABOUT US</li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
