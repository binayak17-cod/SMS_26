import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-300 text-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-black text-2xl font-bold mb-4" style={{ fontFamily: 'cursive' }}>EduNexus</h3>
            <p className="text-sm mb-4">Transforming education through innovative student management solutions.</p>
            <div className="flex gap-4">
              <motion.a href="#" whileHover={{ scale: 1.1 }} className="hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </motion.a>
              <motion.a href="#" whileHover={{ scale: 1.1 }} className="hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </motion.a>
              <motion.a href="#" whileHover={{ scale: 1.1 }} className="hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </motion.a>
              <motion.a href="#" whileHover={{ scale: 1.1 }} className="hover:text-blue-400 transition-colors">
                <Instagram size={20} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-black font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-black font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Student Management</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Attendance Tracking</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Grade Management</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Communication</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-black font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-blue-400" />
                <span>info@edunexus.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-blue-400" />
                <span>+91 9876543210</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-blue-400" />
                <span>Info city Bhubaneswar</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 mt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} EduNexus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
