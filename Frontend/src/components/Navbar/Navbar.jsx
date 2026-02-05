import React from 'react'
import { ArrowRight } from 'lucide-react'
import './Navbar.css'

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1 className="logo">Edunexus</h1>
      </div>
      
      <div className="nav-center">
        <a href="#about" className="nav-link">About</a>
        <a href="#contact" className="nav-link">Contact Us</a>
        <a href="#services" className="nav-link">Services</a>
      </div>
      
      <div className="nav-right">
        <button className="get-started-btn">
          Get Started
          <ArrowRight size={16} />
        </button>
      </div>
    </nav>
  )
}
