import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Crown, 
  Settings, 
  ChefHat, 
  Users,
  BarChart3,
  ShoppingBag,
  UtensilsCrossed,
  Play
} from 'lucide-react';

const TryDemoPage = () => {
  const navigate = useNavigate();

  const demoRoles = [
    {
      id: 'partner',
      title: 'Partner Dashboard',
      subtitle: 'Restaurant Owner',
      description: 'Full control of restaurant operations, staff management, analytics, and settings.',
      icon: Crown,
      color: 'from-primary-500 to-primary-600',
      bgColor: 'bg-primary-100',
      route: '/partner/dashboard',
      features: ['Menu Management', 'Staff Control', 'Analytics', 'Settings']
    },
    {
      id: 'manager',
      title: 'Manager Dashboard',
      subtitle: 'Restaurant Manager',
      description: 'Manage daily operations, orders, and staff with limited administrative access.',
      icon: Settings,
      color: 'from-secondary-500 to-secondary-600',
      bgColor: 'bg-secondary-100',
      route: '/partner/dashboard',
      features: ['Order Management', 'Staff Coordination', 'Reports', 'Operations']
    },
    {
      id: 'kitchen',
      title: 'Kitchen Dashboard',
      subtitle: 'Kitchen Staff',
      description: 'KOT-style interface for managing orders, updating status, and kitchen operations.',
      icon: ChefHat,
      color: 'from-accent-500 to-accent-600',
      bgColor: 'bg-accent-100',
      route: '/partner/orders',
      features: ['Live Orders', 'KOT System', 'Status Updates', 'Kitchen View']
    },
    {
      id: 'servant',
      title: 'Servant Dashboard',
      subtitle: 'Service Staff',
      description: 'Manage table service, track tips, handle customer requests, and order delivery.',
      icon: Users,
      color: 'from-success-500 to-success-600',
      bgColor: 'bg-success-100',
      route: '/partner/orders',
      features: ['Table Service', 'Tip Tracking', 'Order Delivery', 'Customer Care']
    }
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
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

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
            <Play className="h-4 w-4 mr-2" />
            Interactive Demo Experience
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Try FeedUP{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Dashboards
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience different user roles and see how FeedUP works for restaurant owners, managers, kitchen staff, and service teams.
          </p>
        </motion.div>

        {/* Demo Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {demoRoles.map((role, index) => (
            <motion.div
              key={role.id}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 h-full">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`${role.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow`}
                >
                  <role.icon className={`h-8 w-8 bg-gradient-to-br ${role.color} bg-clip-text text-transparent`} />
                </motion.div>

                {/* Content */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-primary-600 font-medium mb-3">{role.subtitle}</p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {role.description}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <div className="grid grid-cols-2 gap-2">
                    {role.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={role.route}
                    className={`inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r ${role.color} text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold group`}
                  >
                    Try {role.title}
                    <Play className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Customer Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-8 text-center"
        >
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl mb-4">
              <UtensilsCrossed className="h-8 w-8 text-primary-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Customer Experience</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the customer journey from QR scan to order completion. See how easy it is for diners to order without any app.
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/scan/demo-table-1"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl group"
            >
              <UtensilsCrossed className="h-5 w-5 mr-2" />
              Try Customer Demo
              <Play className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm">
            All demo data is simulated. No real orders or payments will be processed.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TryDemoPage;