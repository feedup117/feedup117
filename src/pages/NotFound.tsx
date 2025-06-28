import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, UtensilsCrossed } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

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
      rotate: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-200/20 to-secondary-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-secondary-200/20 to-accent-200/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-2xl relative z-10"
      >
        {/* Floating Icon */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl shadow-2xl">
            <UtensilsCrossed className="h-12 w-12 text-white" />
          </div>
        </motion.div>

        {/* 404 Text */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Looks like this page went on a food break! The page you're looking for doesn't exist or has been moved to a different location.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl group"
            >
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-8 py-4 bg-white text-gray-700 rounded-2xl hover:bg-gray-50 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl border border-gray-200 group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
          </motion.div>
        </motion.div>

        {/* Additional Help */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            If you're looking for something specific, try these popular pages:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link to="/scan/demo-table-1" className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors text-sm font-medium">
              Try Demo Order
            </Link>
            <Link to="/try-demo" className="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors text-sm font-medium">
              View Dashboards
            </Link>
            <Link to="/login" className="px-4 py-2 bg-accent-100 text-accent-700 rounded-lg hover:bg-accent-200 transition-colors text-sm font-medium">
              Partner Login
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;