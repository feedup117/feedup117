import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, UtensilsCrossed, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 }
    },
    visible: { 
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-lg shadow-lg border-b border-white/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2 rounded-xl shadow-lg">
                <UtensilsCrossed className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Feed<span className="text-primary-500">UP</span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.a 
              href="#features" 
              className="text-gray-700 hover:text-primary-500 font-medium transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full"></span>
            </motion.a>
            <motion.a 
              href="#how-it-works" 
              className="text-gray-700 hover:text-primary-500 font-medium transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full"></span>
            </motion.a>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/try-demo"
                className="text-gray-700 hover:text-primary-500 font-medium transition-colors"
              >
                Try Demo
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/login"
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
              >
                Login
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/partner/register"
                className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-6 py-2 rounded-xl hover:from-secondary-600 hover:to-secondary-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
              >
                Register
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/admin/login"
                className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-6 py-2 rounded-xl hover:from-gray-800 hover:to-gray-950 transition-all duration-300 font-medium shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <Shield className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-500 transition-colors p-2"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileMenuVariants}
              className="md:hidden bg-white/95 backdrop-blur-lg rounded-2xl mt-2 shadow-xl border border-white/20 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <motion.a
                  href="#features"
                  className="block px-4 py-3 text-gray-700 hover:text-primary-500 hover:bg-primary-50 rounded-xl transition-all"
                  onClick={() => setIsOpen(false)}
                  whileHover={{ x: 4 }}
                >
                  Features
                </motion.a>
                <motion.a
                  href="#how-it-works"
                  className="block px-4 py-3 text-gray-700 hover:text-primary-500 hover:bg-primary-50 rounded-xl transition-all"
                  onClick={() => setIsOpen(false)}
                  whileHover={{ x: 4 }}
                >
                  How It Works
                </motion.a>
                <motion.div whileHover={{ x: 4 }}>
                  <Link
                    to="/try-demo"
                    className="block px-4 py-3 text-gray-700 hover:text-primary-500 hover:bg-primary-50 rounded-xl transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Try Demo
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Link
                    to="/login"
                    className="block px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all font-medium text-center shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Link
                    to="/partner/register"
                    className="block px-4 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl hover:from-secondary-600 hover:to-secondary-700 transition-all font-medium text-center shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Link
                    to="/admin/login"
                    className="block px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl hover:from-gray-800 hover:to-gray-950 transition-all font-medium text-center shadow-lg flex items-center justify-center space-x-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <Shield className="h-4 w-4" />
                    <span>Admin Login</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;