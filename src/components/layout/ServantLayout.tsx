import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag,
  Bell,
  Gift,
  MessageCircle,
  UtensilsCrossed,
  X,
  LogOut,
  ChevronDown,
  Menu as MenuIcon,
  User,
  Settings,
  History,
  Coffee
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ServantLayoutProps {
  children: React.ReactNode;
}

const ServantLayout: React.FC<ServantLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, hasPermission } = useAuth();

  // Close sidebar on mobile by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigation = [
    { 
      name: 'Orders', 
      href: '/servant/orders', 
      icon: ShoppingBag, 
      badge: '3',
      permission: { feature: 'orders', permission: 'limited' as const }
    },
    { 
      name: 'Requests', 
      href: '/servant/requests', 
      icon: Bell, 
      badge: '2',
      permission: { feature: 'requests', permission: 'write' as const }
    },
    { 
      name: 'Tips', 
      href: '/servant/tips', 
      icon: Gift, 
      badge: null,
      permission: { feature: 'tipManagement', permission: 'write' as const }
    },
    { 
      name: 'Tips History', 
      href: '/servant/tips-history', 
      icon: History, 
      badge: null,
      permission: { feature: 'tipReports', permission: 'limited' as const }
    },
    { 
      name: 'Feedback', 
      href: '/servant/feedback', 
      icon: MessageCircle, 
      badge: null,
      permission: { feature: 'feedback', permission: 'limited' as const }
    },
  ];

  const isActive = (href: string) => location.pathname === href;

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: -280, transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  const overlayVariants = {
    open: { opacity: 1, transition: { duration: 0.3 } },
    closed: { opacity: 0, transition: { duration: 0.3 } }
  };

  // Mobile bottom navigation
  const mobileNavigation = navigation.slice(0, 4); // Only show first 4 items in mobile nav

  const handleLogout = () => {
    logout();
  };

  // Check if user is servant
  if (!user || user.role !== 'servant') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">You need servant access to view this page</p>
          <button 
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50/30">
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <motion.div 
        variants={sidebarVariants}
        animate={sidebarOpen ? "open" : "closed"}
        className="fixed inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-xl shadow-2xl border-r border-white/20 flex flex-col lg:translate-x-0"
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
          <Link to="/" className="flex items-center space-x-3">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="bg-gradient-to-br from-primary-500 to-primary-600 p-3 rounded-xl shadow-lg"
            >
              <UtensilsCrossed className="h-6 w-6 text-white" />
            </motion.div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Feed<span className="text-primary-500">UP</span>
              </span>
              <p className="text-xs text-gray-500">Servant Dashboard</p>
            </div>
          </Link>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </motion.button>
        </div>

        {/* Navigation - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4">
            <div className="space-y-2">
              {navigation.map((item, index) => {
                // Check if user has permission to see this item
                if (!hasPermission(item.permission.feature, item.permission.permission)) {
                  return null;
                }
                
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      className={`group flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                        isActive(item.href)
                          ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon className={`mr-3 h-5 w-5 ${
                          isActive(item.href) ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                        }`} />
                        {item.name}
                      </div>
                      {item.badge && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
                        >
                          {item.badge}
                        </motion.span>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Servant Status */}
        <div className="p-4 flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200"
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-green-500 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-green-900">On Duty</p>
                <p className="text-xs text-green-600">Serving 5 tables</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 bg-white/50 backdrop-blur-sm flex-shrink-0">
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="w-full flex items-center space-x-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">Senior Waiter</p>
              </div>
              <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
              {profileDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
                >
                  <div className="p-2">
                    <button className="w-full flex items-center space-x-3 p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                      <Settings className="h-4 w-4" />
                      <span>Profile Settings</span>
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 p-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'lg:ml-72' : 'lg:ml-0'
      }`}>
        {/* Top Header - Visible on all devices */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-white/20 sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
              >
                <MenuIcon className="h-6 w-6" />
              </motion.button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {navigation.find(item => isActive(item.href))?.name || 'Dashboard'}
                </h1>
                <p className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('en-IN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
              >
                <Bell className="h-5 w-5" />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
                >
                  5
                </motion.span>
              </motion.button>

              {/* Restaurant Info */}
              {user.restaurantName && (
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-900">{user.restaurantName}</p>
                  <p className="text-xs text-gray-500">Waiter • 5 tables assigned</p>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 pb-20 lg:pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 z-40">
        <div className="flex justify-around">
          {mobileNavigation.map((item) => {
            // Check if user has permission to see this item
            if (!hasPermission(item.permission.feature, item.permission.permission)) {
              return null;
            }
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center py-3 px-2 ${
                  isActive(item.href)
                    ? 'text-primary-600'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <item.icon className={`h-6 w-6 ${
                  isActive(item.href) ? 'text-primary-600' : 'text-gray-400'
                }`} />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            );
          })}
          
          {/* More Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex flex-col items-center py-3 px-2 text-gray-500 hover:text-gray-900"
          >
            <MenuIcon className="h-6 w-6 text-gray-400" />
            <span className="text-xs mt-1">More</span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServantLayout;