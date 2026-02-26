import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Volume2, Users, Calendar, GraduationCap, MessageCircle } from 'lucide-react';
import video1 from '../../assets/video1.mp4';
import About from './About';

const ServiceSection = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 1.5]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5, 1], ["50px", "20px", "0px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 0.8, 1, 0.8]);

  const handlePlayClick = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <>
    <section ref={containerRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 z-20"
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.0, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          scale,
          borderRadius,
          overflow: 'hidden'
        }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => {
            if (videoRef.current) {
              videoRef.current.play();
              setIsPlaying(true);
            }
          }}
        >
          <source src={video1} type="video/mp4" />
        </video>
      </motion.div>
      {/* Animated Overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-black/20  to-black/50 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ borderRadius }}
      />
      {/* Floating Elements */}
      <motion.div className="absolute inset-0 z-25 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/60 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}
      </motion.div>
     
      <motion.button
        onClick={handlePlayClick}
        className="absolute top-4 right-4 z-40 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-all"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 1.5 }}
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <Play className={`w-6 h-6 text-white ${isPlaying ? 'opacity-50' : 'opacity-100'}`} />
      </motion.button>
      {/* Content */}
      <div className="relative z-30 text-center text-white max-w-4xl px-4">
        <motion.h1 
          className="text-6xl font-bold mb-12 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent "
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Our Services
        </motion.h1>
        
     
        
        {/* Service Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { icon: Users, title: "Student Management", desc: "Manage profiles and records" },
            { icon: Calendar, title: "Attendance Tracking", desc: "Monitor attendance in real-time" },
            { icon: GraduationCap, title: "Grade Management", desc: "Track grades and progress" },
            { icon: MessageCircle, title: "Communication", desc: "Connect all stakeholders" }
          ].map((service, i) => (
            <motion.div
              key={i}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <service.icon className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-sm opacity-80">{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="flex gap-8 justify-center items-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.button 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 flex items-center gap-2 shadow-lg"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <Play className="w-5 h-5" />
            Learn More
          </motion.button>
          
          <motion.button 
            className="border-2 border-white/80 text-white hover:bg-white hover:text-black py-3 px-8 rounded-lg transition duration-300 flex items-center gap-2 backdrop-blur-sm"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <Volume2 className="w-5 h-5" />
            Contact Us
          </motion.button>
        </motion.div>
      </div>
       
    </section>
    <About />
    </>
  );
};

export default ServiceSection;