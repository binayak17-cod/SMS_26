import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  ClipboardCheck,
  Users,
  FileText,
  Bell,
  Search,
  User,
  LogOut,
  Sparkles,
  Menu,
  ChevronRight
} from 'lucide-react'

const TeacherLayout = ({ children }) => {
  const location = useLocation()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const teacherName = localStorage.getItem('userName') || 'Teacher'

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/teacher/dashboard' },
    { name: 'Attendance', icon: ClipboardCheck, path: '/teacher/attendance' },
    { name: 'Students', icon: Users, path: '/teacher/students' },
    { name: 'Result', icon: FileText, path: '/teacher/result' },
    { name: 'performance', icon: Sparkles, path: '/teacher/Performancepred'}
  ]


  const activeItem = menuItems.find(item => location.pathname.includes(item.path.split('/').pop())) || menuItems[0]

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar - Modern Dark/Light mix */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-[280px] bg-white border-r border-slate-200 flex-col justify-between hidden md:flex z-20 shadow-sm relative"
      >
        <div className="flex flex-col h-full">
          {/* Brand Logo */}
          <div className="h-24 flex items-center px-8 text-indigo-700">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-400 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                <User size={20} />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-black">
                Teacher Panel
              </span>
            </motion.div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
            <div className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Main Menu
            </div>
            {menuItems.map((item) => {
              const isActive = activeItem.name === item.name
              return (
                <Link to={item.path} key={item.name} className="block group">
                  <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all relative overflow-hidden ${isActive
                      ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100/50'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                      }`}
                  >
                    {/* Active Background highlight effect */}
                    {isActive && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute inset-0 bg-indigo-50 rounded-xl -z-10"
                        transition={{ type: "spring", stiffness: 250, damping: 25 }}
                      />
                    )}

                    <div className="flex items-center gap-3 z-10">
                      <item.icon size={20} className={isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600 transition-colors'} />
                      <span className={`font-medium ${isActive ? 'font-semibold' : ''}`}>{item.name}</span>
                    </div>

                    {isActive && <ChevronRight size={16} className="text-indigo-400 z-10" />}

                    {/* Active left border indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-r-full"
                      />
                    )}
                  </motion.div>
                </Link>
              )
            })}
          </nav>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-slate-50/50">

        {/* Top Navbar */}
        <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-6 md:px-10 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-slate-500 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <Menu size={24} />
            </button>
            <div className="hidden sm:block">
              <motion.h1
                key={activeItem.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-slate-800 tracking-tight"
              >
                {activeItem.name}
              </motion.h1>
              <p className="text-sm text-slate-500 font-medium h-5">Welcome back, {teacherName}!</p>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
      
            

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative text-slate-400 hover:text-slate-600 transition-colors p-2 bg-slate-100/80 rounded-full hover:bg-slate-200/80"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </motion.button>

            {/* Profile Dropdown */}
            <div className="relative">
              <motion.button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 hover:opacity-90 transition-opacity p-1 pr-3 bg-white border border-slate-200/60 shadow-sm rounded-full"
              >
                <div className="w-9 h-9 text-sm rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white flex items-center justify-center font-bold shadow-md">
                  {teacherName.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-slate-700 leading-none">{teacherName}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Teacher Account</p>
                </div>
              </motion.button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40 md:hidden"
                      onClick={() => setIsProfileOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 py-2 z-50 transform origin-top-right overflow-hidden"
                    >
                      <div className="px-5 py-4 border-b border-slate-50 bg-slate-50/50 mb-1">
                        <p className="text-sm font-semibold text-slate-800">{teacherName}</p>
                        <p className="text-xs text-slate-500 mt-1">Teacher Account</p>
                      </div>
                      <div className="px-2">
                        <button
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors"
                          onClick={() => { setIsProfileOpen(false); alert('Update Profile Clicked'); }}
                        >
                          <User size={16} /> My Profile
                        </button>
                        <Link to='/login'>
                          <button

                            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-colors mt-1"
                          >
                            <LogOut size={16} /> Logout
                          </button>
                        </Link>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-auto p-6 md:p-8 w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full w-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default TeacherLayout
