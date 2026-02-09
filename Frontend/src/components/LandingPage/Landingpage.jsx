import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Users, Award } from 'lucide-react'
import { Navbar } from '../Navbar/Navbar'
import heroImage from '../../assets/img4.png'
import { Link } from 'react-router-dom'

import ServiceSection from './ServiceSection'
import About from './About'
import Footer from './Footer'

export const LandingPage = () => {
  return (
    <>
      <Navbar/>
      <section className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-200 to-slate-400 relative overflow-hidden flex items-center px-4 lg:px-8">
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');`}
        </style>
        {/* Enhanced Wireframe Grid Background */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{ 
            backgroundPosition: ['0px 0px', '20px 20px', '0px 0px'],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>
        </motion.div>
        
        <motion.div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`dot-${i}`}
              className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 4,
                delay: Math.random() * 3,
                repeat: Infinity,
                repeatDelay: Math.random() * 2
              }}
            />
          ))}
        </motion.div>
        
        {/* Floating Geometric Shapes */}
        <motion.div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`shape-${i}`}
              className={`absolute ${
                i % 3 === 0 ? 'w-4 h-4 bg-indigo-400/10 rounded-full' :
                i % 3 === 1 ? 'w-3 h-3 bg-blue-400/10 rotate-45' :
                'w-2 h-6 bg-slate-400/10'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -100, -20],
                x: [0, Math.random() * 50 - 25, 0],
                rotate: [0, 360, 0],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                delay: Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
        
        {/* Enhanced Animated Lines */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute bg-black/10 h-px"
              style={{
                top: `${Math.random() * 100}%`,
                left: 0,
                right: 0,
              }}
              animate={{
                scaleX: [0, 1, 0],
                opacity: [0, 0.6, 0],
                x: ['-100%', '0%', '100%']
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                delay: Math.random() * 3,
                repeat: Infinity,
                repeatDelay: Math.random() * 6,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Vertical Lines */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`vline-${i}`}
              className="absolute bg-black/10 w-px"
              style={{
                left: `${Math.random() * 100}%`,
                top: 0,
                bottom: 0,
              }}
              animate={{
                scaleY: [0, 1, 0],
                opacity: [0, 0.4, 0]
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                delay: Math.random() * 4,
                repeat: Infinity,
                repeatDelay: Math.random() * 8,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left Side - Content */}
          <div className="text-center lg:text-left relative mt-16">
            {/* Graduation Cap above Welcome */}
            <motion.div
              className="absolute -top-12 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 text-6xl"
              style={{ rotate: '-15deg' }}
              animate={{
                y: [-5, 5, -5],
                rotate: [-15, -10, -15]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🎓
            </motion.div>
            
            <motion.h1 
              className="text-6xl lg:text-7xl font-bold text-gray-900 mb-12 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
             
              <span className="bg-gradient-to-r from-black via-indigo-900 to-slate-700 bg-clip-text text-transparent" style={{ fontFamily: 'cursive' }}>
                EduNexus
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-2xl text-slate-400 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light tracking-wide text-justify"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Empowering institutions with a complete Student Management System for better learning and administration. Upgrade your institution with our all-in-one Student Management System. Simple setup, powerful features.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to ="/login">
              <motion.button 
                className="bg-gradient-to-r from-blue-300 to-indigo-500 hover:from-blue-800 hover:to-indigo-800 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Go to Portal
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              </Link>
              
              <motion.button 
                className="border-2 border-gray-400 hover:border-blue-700 text-gray-800 hover:text-blue-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>

          <motion.div 
            className="flex justify-center lg:justify-end -mt-16"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Animated Elements Around Image */}
              <motion.div className="absolute -inset-20 pointer-events-none z-20">
                {/* Floating Hearts */}
                <motion.div
                  className="absolute text-pink-500 text-4xl"
                  style={{ left: '10%', top: '20%' }}
                  animate={{
                    y: [-10, -30, -10],
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.7, 1, 0.7],
                    rotate: [0, 15, -15, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ♥
                </motion.div>
                
                <motion.div
                  className="absolute text-pink-500 text-3xl"
                  style={{ right: '15%', top: '10%' }}
                  animate={{
                    y: [-5, -25, -5],
                    scale: [0.9, 1.1, 0.9],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 2.5,
                    delay: 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ♥
                </motion.div>
                
                {/* Floating Stars */}
                <motion.div
                  className="absolute text-yellow-500 text-3xl"
                  style={{ left: '80%', top: '30%' }}
                  animate={{
                    rotate: [0, 360],
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  ✦
                </motion.div>
                
                <motion.div
                  className="absolute text-yellow-500 text-2xl"
                  style={{ left: '5%', top: '70%' }}
                  animate={{
                    rotate: [0, -360],
                    scale: [0.7, 1.3, 0.7],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 3.5,
                    delay: 1,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  ✦
                </motion.div>
                
                {/* Floating Exclamation Marks */}
                <motion.div
                  className="absolute text-orange-500 text-4xl font-bold"
                  style={{ right: '10%', bottom: '20%' }}
                  animate={{
                    y: [0, -20, 0],
                    scale: [0.8, 1.3, 0.8],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2.5,
                    delay: 0.3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  !
                </motion.div>
                
                {/* Floating Sparkles */}
                <motion.div
                  className="absolute text-blue-500 text-2xl"
                  style={{ left: '70%', bottom: '10%' }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 2,
                    delay: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ✨
                </motion.div>
                
                <motion.div
                  className="absolute text-blue-500 text-3xl"
                  style={{ left: '20%', bottom: '30%' }}
                  animate={{
                    scale: [0, 1.2, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, -180, -360]
                  }}
                  transition={{
                    duration: 2.5,
                    delay: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ✨
                </motion.div>
              </motion.div>
              
              <motion.img
                src={heroImage}
                alt="Education Hero"
                className="relative w-96 h-96 lg:w-[580px] lg:h-[580px] "
                
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              

              <motion.div
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-xl border border-white/20"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <BookOpen className="w-6 h-6 text-blue-700" />
              </motion.div>
              
              <motion.div
                className="absolute bottom-8 left-4 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-xl border border-white/20"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                whileHover={{ scale: 1.1, rotate: -10 }}
              >
                <Users className="w-6 h-6 text-indigo-700" />
              </motion.div>
              
              <motion.div
                className="absolute top-1/2 left-0 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-xl border border-white/20"
                animate={{ x: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                whileHover={{ scale: 1.1, rotate: 15 }}
              >
                <Award className="w-6 h-6 text-slate-700" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
           <ServiceSection/>
           <Footer />
       
    </>
    
  )
}
