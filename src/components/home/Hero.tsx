import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QrCode, Smartphone, ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-200/30 to-secondary-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-secondary-200/30 to-accent-200/30 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                <QrCode className="h-4 w-4 mr-2" />
                No App Required • Instant Ordering
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Skip the Wait.
              <br />
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Order from Your Table.
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl"
            >
              Scan QR code, browse menu, place order, and track it live. 
              No downloads, no waiting in lines. Just delicious food delivered to your table.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/scan/demo-table-1"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl group"
                >
                  <QrCode className="h-5 w-5 mr-2" />
                  Try Demo Order
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/try-demo"
                  className="inline-flex items-center px-8 py-4 bg-white text-gray-700 rounded-2xl hover:bg-gray-50 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl border border-gray-200 group"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Watch Demo
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                <span>No app download</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                <span>Instant ordering</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                <span>Live tracking</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Animated Phone Mockup */}
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Phone Frame */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative w-80 h-[600px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl"
              >
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="h-6 bg-gray-50 flex items-center justify-between px-6 text-xs">
                    <span>9:41</span>
                    <div className="flex space-x-1">
                      <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
                      <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
                      <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                    </div>
                  </div>
                  
                  {/* App Content */}
                  <div className="p-4 h-full bg-gradient-to-br from-primary-50 to-secondary-50">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-bold text-gray-900">Table 5</h3>
                      <p className="text-sm text-gray-600">Spice Garden Restaurant</p>
                    </div>
                    
                    <div className="space-y-4">
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="bg-white rounded-xl p-4 shadow-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary-100 rounded-lg"></div>
                          <div>
                            <h4 className="font-semibold text-sm">Chicken Biryani</h4>
                            <p className="text-xs text-gray-500">₹320</p>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                        className="bg-white rounded-xl p-4 shadow-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-secondary-100 rounded-lg"></div>
                          <div>
                            <h4 className="font-semibold text-sm">Paneer Masala</h4>
                            <p className="text-xs text-gray-500">₹280</p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.5, duration: 0.5 }}
                      className="absolute bottom-8 left-4 right-4"
                    >
                      <div className="bg-primary-500 text-white rounded-xl p-4 text-center">
                        <p className="font-semibold">View Cart (2 items)</p>
                        <p className="text-sm opacity-90">₹600</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [-5, 5, -5],
                  rotate: [-2, 2, -2]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute -top-8 -left-8 bg-white p-4 rounded-2xl shadow-xl border border-gray-100"
              >
                <QrCode className="h-8 w-8 text-primary-500" />
              </motion.div>

              <motion.div
                animate={{ 
                  y: [5, -5, 5],
                  rotate: [2, -2, 2]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-8 -right-8 bg-white p-4 rounded-2xl shadow-xl border border-gray-100"
              >
                <Smartphone className="h-8 w-8 text-secondary-500" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;