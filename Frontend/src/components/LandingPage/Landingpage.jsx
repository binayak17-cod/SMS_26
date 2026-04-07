import React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight, BookOpen, Users, BarChart3,
  Shield, Zap, CheckCircle2, Star,
  ChevronRight, PlayCircle, MessageCircle
} from 'lucide-react'
import { Navbar } from '../Navbar/Navbar'
import { Link } from 'react-router-dom'

import ServiceSection from './ServiceSection'
import About from './About'
import Footer from './Footer'

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: custom * 0.1
    }
  })
}

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    variants={fadeUpVariant}
    custom={delay}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    className="group relative p-8 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(59,130,246,0.12)] transition-all duration-500 overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mb-6 text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </motion.div>
)

const Statistic = ({ number, label, delay }) => (
  <motion.div
    variants={fadeUpVariant}
    custom={delay}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="text-center relative"
  >
    <div className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
      {number}
    </div>
    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">{label}</div>
  </motion.div>
)

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-40 lg:pb-32 overflow-visible">
        {/* Abstract Background Meshes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 0.95, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-[100%] bg-blue-300/30 blur-[120px]"
          />
          <motion.div
            animate={{
              rotate: [0, -5, 5, 0],
              scale: [1, 0.95, 1.05, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[10%] right-[-10%] w-[45%] h-[45%] rounded-[100%] bg-indigo-300/30 blur-[120px]"
          />
          <motion.div
            animate={{
              y: [0, -30, 30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] rounded-[100%] bg-purple-300/20 blur-[120px]"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Pill badge */}
            <motion.div
              variants={fadeUpVariant}
              custom={0}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-gray-200 shadow-sm mb-8 backdrop-blur-md hover:bg-white/80 transition-colors cursor-pointer"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
              </span>
              <span className="text-sm font-semibold text-gray-800">EduNexus is now live</span>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeUpVariant}
              custom={1}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-6xl lg:text-[5rem] font-extrabold text-gray-900 tracking-tight mb-8 leading-[1.05]"
            >
              <span style={{ fontFamily: "'Dancing Script', cursive" }}>Welcome to Edunexus</span><br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-900 to-aqua-500 relative inline-block">
                Education portal
                <svg className="absolute w-full h-3 -bottom-2 left-0 text-blue-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="transparent" />
                </svg>
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={fadeUpVariant}
              custom={2}
              initial="hidden"
              animate="visible"
              className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed outline-none"
            >
              Streamline operations, boost student engagement, and drive academic excellence with our all-in-one cloud platform designed for modern institutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUpVariant}
              custom={3}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/login" className="w-full sm:w-auto">
                <button className="relative w-full sm:w-auto px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_40px_rgba(0,0,0,0.1)] hover:shadow-[0_0_60px_rgba(0,0,0,0.2)] hover:-translate-y-1 overflow-hidden group">
                  <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                  <span className="relative flex items-center gap-2">
                    Go to Portal
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>


            </motion.div>

            {/* Social Proof */}
        
          </div>
        </div>

        {/* Dashboard Preview Mockup Container */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 hidden md:block perspective-1000"
        >
          <div className="rounded-[2.5rem] border border-white/40 bg-white/40 backdrop-blur-2xl p-4 shadow-[0_20px_80px_-20px_rgba(37,99,235,0.2)] transform-gpu">
            <div className="rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-inner aspect-[16/9] relative flex flex-col">
              {/* Fake Browser Top Bar*/}
              <div className="h-12 border-b border-gray-100 bg-gray-50/50 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="mx-auto w-1/2 h-6 bg-white rounded-md border border-gray-100 flex items-center justify-center text-[10px] text-gray-400 font-medium">
                  app.edunexus.com/dashboard
                </div>
              </div>
              {/* Fake Dashboard Body */}
              <div className="flex-1 bg-gray-50/50 p-8 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                <div className="text-center relative z-10">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/30"
                  >
                    <BarChart3 className="w-12 h-12 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Interactive Dashboard</h3>
                  <p className="text-gray-500 font-medium max-w-sm mx-auto">Visualize real-time analytics, manage student records, and track academic progress all in one place.</p>
                </div>

                {/* Decorative floating UI elements */}
                <motion.div
                  className="absolute top-10 left-10 p-4 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center gap-4"
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-green-600" /></div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Task Completed</div>
                    <div className="text-xs text-gray-500">Grading finished</div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-10 right-10 p-4 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center gap-4"
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"><MessageCircle className="w-5 h-5 text-blue-600" /></div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">New Message</div>
                    <div className="text-xs text-gray-500">From Sarah (Grade 10)</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>



      {/* Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase border border-blue-100">
                Core Features
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUpVariant}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight"
            >
              Everything you need to <br className="hidden md:block" />
              run your institution
            </motion.h2>
            <motion.p
              variants={fadeUpVariant}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-xl text-gray-600"
            >
              Replace fragmented tools with a single, deeply integrated platform that students and faculty will actually love using.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Users}
              title="Student Portal"
              description="A centralized hub where students can track their grades, submit assignments, and communicate seamlessly with faculty."
              delay={1}
            />
            <FeatureCard
              icon={BookOpen}
              title="Course Management"
              description="Create rich curriculums, organize materials intelligently, and track progress with advanced analytics and reporting."
              delay={2}
            />
            <FeatureCard
              icon={BarChart3}
              title="Performance Analytics"
              description="Get deep insights into student performance, identify at-risk students early, and optimize learning outcomes."
              delay={3}
            />
            <FeatureCard
              icon={Shield}
              title="Security"
              description="Your institution's sensitive data is protected by enterprise-level encryption, role-based access, and daily backups."
              delay={4}
            />
            <FeatureCard
              icon={Zap}
              title="Attendance Management"
              description="Track attendance of student, Manage Upadate the attendance on daily basis"
              delay={5}
            />
            <FeatureCard
              icon={CheckCircle2}
              title="Seamless Integrations"
              description="Connect smoothly with your favorite tools from Zoom and Microsoft Teams to Google Workspace with zero technical hassle."
              delay={6}
            />
          </div>
        </div>
      </section>
      <ServiceSection />
      <Footer />
    </div>
  )
}
