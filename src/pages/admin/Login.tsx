import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UtensilsCrossed, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Shield,
  Loader2,
  Database,
  Server,
  Lock,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(formData.email, formData.password, 'admin');
      
      if (success) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
      rotate: [-2, 2, -2],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-secondary-500/10 to-accent-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-full blur-2xl"
        />
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-gray-400 hover:text-primary-400 transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
        </motion.div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Panel - Animated Illustration */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="hidden lg:block"
            >
              <motion.div variants={itemVariants} className="text-center mb-8">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Admin
                  <br />
                  <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                    Control Center
                  </span>
                </h2>
                <p className="text-xl text-gray-400">
                  Manage your entire FeedUP platform from a single dashboard.
                </p>
              </motion.div>

              {/* Animated Admin Illustration */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="relative mx-auto w-80 h-80"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl shadow-2xl border border-gray-700">
                  <div className="flex items-center justify-center h-full">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="w-48 h-48 bg-gray-900 rounded-2xl shadow-xl flex items-center justify-center"
                    >
                      <Shield className="h-24 w-24 text-primary-500" />
                    </motion.div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ 
                    y: [-5, 5, -5],
                    rotate: [-3, 3, -3]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute -top-6 -left-6 bg-gray-800 p-4 rounded-2xl shadow-xl border border-gray-700"
                >
                  <Database className="h-8 w-8 text-secondary-500" />
                </motion.div>

                <motion.div
                  animate={{ 
                    y: [5, -5, 5],
                    rotate: [3, -3, 3]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 2
                  }}
                  className="absolute -bottom-6 -right-6 bg-gray-800 p-4 rounded-2xl shadow-xl border border-gray-700"
                >
                  <Server className="h-8 w-8 text-accent-500" />
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants} className="text-center mt-8">
                <div className="inline-flex items-center space-x-6 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                    <span>System Monitoring</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                    <span>Partner Management</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse"></div>
                    <span>Global Controls</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Panel - Login Form */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="w-full"
            >
              {/* Logo for Mobile */}
              <motion.div variants={itemVariants} className="lg:hidden text-center mb-8">
                <div className="inline-flex items-center space-x-3 mb-4">
                  <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-3 rounded-xl shadow-lg">
                    <UtensilsCrossed className="h-8 w-8 text-white" />
                  </div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    Feed<span className="text-primary-500">UP</span>
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white">Admin Portal</h2>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-8 lg:p-10"
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="hidden lg:inline-flex items-center space-x-3 mb-6">
                    <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-3 rounded-xl shadow-lg">
                      <UtensilsCrossed className="h-8 w-8 text-white" />
                    </div>
                    <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                      Feed<span className="text-primary-500">UP</span>
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
                  <p className="text-gray-400">Secure login to FeedUP platform management</p>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded-xl mb-6"
                    >
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-5 w-5" />
                        <p>{error}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder-gray-500 text-white"
                      placeholder="admin@feedup.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-3 pr-12 bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder-gray-500 text-white"
                        placeholder="Enter your password"
                        required
                      />
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors" />
                        )}
                      </motion.button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.remember}
                        onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                        className="rounded border-gray-600 text-primary-600 focus:ring-primary-500 bg-gray-700/50 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-400">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
                      Forgot password?
                    </a>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Authenticating...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="h-5 w-5" />
                        <span>Access Admin Portal</span>
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Security Notice */}
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <div className="text-center">
                    <p className="text-sm text-gray-400 mb-4">
                      This is a secure admin portal. Unauthorized access is prohibited.
                    </p>
                    <div className="inline-flex items-center space-x-2 bg-gray-700/50 text-gray-300 px-4 py-2 rounded-xl border border-gray-600">
                      <Shield className="h-4 w-4 text-primary-400" />
                      <span className="text-xs">Protected by FeedUP Security</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;