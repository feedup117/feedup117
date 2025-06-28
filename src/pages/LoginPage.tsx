import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UtensilsCrossed, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Crown,
  Settings,
  ChefHat,
  Coffee,
  QrCode,
  Loader2,
  CheckCircle,
  X,
  Shield
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const demoRoles = [
    {
      id: 'partner',
      title: 'Partner Dashboard',
      subtitle: 'Restaurant Owner',
      description: 'Full control of restaurant operations, staff management, analytics, and settings.',
      icon: Crown,
      color: 'from-primary-500 to-primary-600',
      bgColor: 'from-primary-50 to-orange-50',
      route: '/partner/dashboard',
    },
    {
      id: 'manager',
      title: 'Manager Dashboard',
      subtitle: 'Restaurant Manager',
      description: 'Manage daily operations, orders, and staff with limited administrative access.',
      icon: Settings,
      color: 'from-secondary-500 to-secondary-600',
      bgColor: 'from-secondary-50 to-yellow-50',
      route: '/manager/dashboard',
    },
    {
      id: 'kitchen',
      title: 'Kitchen Dashboard',
      subtitle: 'Kitchen Staff',
      description: 'KOT-style interface for managing orders, updating status, and kitchen operations.',
      icon: ChefHat,
      color: 'from-accent-500 to-accent-600',
      bgColor: 'from-red-50 to-rose-50',
      route: '/kitchen/orders',
    },
    {
      id: 'servant',
      title: 'Servant Dashboard',
      subtitle: 'Service Staff',
      description: 'Manage table service, track tips, handle customer requests, and order delivery.',
      icon: Coffee,
      color: 'from-success-500 to-success-600',
      bgColor: 'from-green-50 to-emerald-50',
      route: '/servant/orders',
    },
    {
      id: 'customer',
      title: 'Customer Experience',
      subtitle: 'Diner Simulation',
      description: 'Experience the customer journey from QR scan to order completion.',
      icon: QrCode,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      route: '/scan/demo-table-1',
    },
    {
      id: 'admin',
      title: 'Admin Dashboard',
      subtitle: 'Platform Owner',
      description: 'Manage the entire FeedUP platform, partners, subscriptions, and system settings.',
      icon: Shield,
      color: 'from-gray-700 to-gray-900',
      bgColor: 'from-gray-50 to-slate-50',
      route: '/admin/login',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        // Navigate based on user role (handled by the auth context)
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: string) => {
    setShowDemoModal(false);
    setIsLoading(true);
    
    try {
      // For demo roles that have a direct login
      if (['partner', 'manager', 'kitchen', 'servant'].includes(role)) {
        const email = `${role}@feedup.com`;
        const success = await login(email, `${role}123`, role as any);
        
        if (!success) {
          setError(`Demo login failed for ${role} role.`);
        }
      } else if (role === 'admin') {
        // For admin, redirect to admin login page
        navigate('/admin/login');
        return;
      } else {
        // For customer experience, just navigate to the scan page
        navigate('/scan/demo-table-1');
      }
    } catch (err) {
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
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
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-primary-300/20 to-secondary-300/20 rounded-full blur-2xl"
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
            className="inline-flex items-center text-gray-600 hover:text-primary-500 transition-colors group"
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
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Smart Dining
                  <br />
                  <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                    Starts Here
                  </span>
                </h2>
                <p className="text-xl text-gray-600">
                  Revolutionizing restaurant operations with QR-based ordering and real-time management.
                </p>
              </motion.div>

              {/* Animated QR Code Illustration */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="relative mx-auto w-80 h-80"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl shadow-2xl">
                  <div className="flex items-center justify-center h-full">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="w-48 h-48 bg-white rounded-2xl shadow-xl flex items-center justify-center"
                    >
                      <QrCode className="h-24 w-24 text-primary-500" />
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
                  className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100"
                >
                  <UtensilsCrossed className="h-8 w-8 text-primary-500" />
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
                  className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100"
                >
                  <CheckCircle className="h-8 w-8 text-success-500" />
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants} className="text-center mt-8">
                <div className="inline-flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                    <span>Real-time Orders</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                    <span>Live Analytics</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse"></div>
                    <span>Smart Management</span>
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
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 lg:p-10"
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
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Login to Your Dashboard</h1>
                  <p className="text-gray-600">Welcome back to FeedUP – Smart Dining Starts Here.</p>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-100 border border-red-200 text-red-800 px-4 py-3 rounded-xl mb-6"
                    >
                      <p>{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder-gray-400"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-3 pr-12 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder-gray-400"
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
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
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
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 bg-white/50"
                      />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-primary-600 hover:text-primary-500 transition-colors">
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
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <span>Sign In</span>
                    )}
                  </motion.button>
                </form>

                {/* Demo Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">
                      Want to explore without logging in?
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowDemoModal(true)}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-secondary-100 to-amber-100 text-secondary-700 rounded-xl hover:from-secondary-200 hover:to-amber-200 transition-all duration-300 font-medium shadow-lg hover:shadow-xl border border-secondary-200"
                    >
                      <QrCode className="h-5 w-5 mr-2" />
                      Try Demo Dashboards
                    </motion.button>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-400">
                      💡 Tip: You can try a demo without logging in.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      <AnimatePresence>
        {showDemoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowDemoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Demo Role</h2>
                  <p className="text-gray-600">Experience different user interfaces and functionalities</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowDemoModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {demoRoles.map((role, index) => (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    onClick={() => handleDemoLogin(role.id)}
                    className={`cursor-pointer bg-gradient-to-br ${role.bgColor} rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all group`}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`p-3 bg-gradient-to-br ${role.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform`}>
                        <role.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                          {role.title}
                        </h3>
                        <p className="text-sm text-gray-600">{role.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {role.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                  All demo data is simulated. No real orders or payments will be processed.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginPage;