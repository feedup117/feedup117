import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard,
  Menu as MenuIcon,
  Users,
  ShoppingBag,
  Settings,
  BarChart3,
  TableProperties,
  UtensilsCrossed,
  X,
  LogOut,
  Bell,
  ChevronDown,
  Building2,
  CreditCard,
  UserCheck,
  Coins,
  QrCode,
  ChefHat,
  MessageCircle,
  Receipt,
  Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ManagerLayoutProps {
  children: React.ReactNode;
}

const ManagerLayout: React.FC<ManagerLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
      name: 'Dashboard', 
      href: '/manager/dashboard', 
      icon: LayoutDashboard, 
      badge: null,
      permission: { feature: 'dashboard', permission: 'limited' as const }
    },
    { 
      name: 'Orders', 
      href: '/manager/orders', 
      icon: ShoppingBag, 
      badge: '5',
      permission: { feature: 'orders', permission: 'write' as const }
    },
    { 
      name: 'Menu', 
      href: '/manager/menu', 
      icon: MenuIcon, 
      badge: null,
      permission: { feature: 'menu', permission: 'limited' as const }
    },
    { 
      name: 'Tables', 
      href: '/manager/tables', 
      icon: TableProperties, 
      badge: null,
      permission: { feature: 'tables', permission: 'limited' as const }
    },
    { 
      name: 'Kitchen', 
      href: '/manager/kitchen', 
      icon: ChefHat, 
      badge: '3',
      permission: { feature: 'kitchen', permission: 'write' as const }
    },
    { 
      name: 'Staff', 
      href: '/manager/staff', 
      icon: Users, 
      badge: null, 
      restricted: true,
      permission: { feature: 'staff', permission: 'read' as const }
    },
    { 
      name: 'CRM', 
      href: '/manager/crm', 
      icon: UserCheck, 
      badge: null,
      permission: { feature: 'crm', permission: 'read' as const }
    },
    { 
      name: 'Analytics', 
      href: '/manager/analytics', 
      icon: BarChart3, 
      badge: null,
      permission: { feature: 'analytics', permission: 'read' as const }
    },
    { 
      name: 'POS', 
      href: '/manager/pos', 
      icon: CreditCard, 
      badge: null,
      permission: { feature: 'pos', permission: 'write' as const }
    },
    { 
      name: 'Feedback', 
      href: '/manager/feedback', 
      icon: MessageCircle, 
      badge: '2',
      permission: { feature: 'feedback', permission: 'write' as const }
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

  const handleLogout = () => {
    logout();
  };

  // Check if user is manager
  if (!user || user.role !== 'manager') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">You need manager access to view this page</p>
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
      {/* Sidebar */}
      <motion.div 
        variants={sidebarVariants}
        animate={sidebarOpen ? "open" : "closed"}
        className="fixed inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-xl shadow-2xl border-r border-white/20 flex flex-col"
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
              <p className="text-xs text-gray-500">Manager Dashboard</p>
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

        {/* Branch Selector */}
        {user.restaurantId && (
          <div className="p-4 border-b border-gray-100 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-100 hover:border-primary-200 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Building2 className="h-5 w-5 text-primary-500" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">{user.restaurantName}</p>
                  <p className="text-xs text-gray-500">Main Branch</p>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </motion.button>
          </div>
        )}

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
                          : item.restricted
                          ? 'text-gray-400 cursor-not-allowed opacity-60'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon className={`mr-3 h-5 w-5 ${
                          isActive(item.href) ? 'text-white' : item.restricted ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-500'
                        }`} />
                        {item.name}
                        {item.restricted && (
                          <Shield className="ml-2 h-3 w-3 text-gray-300" />
                        )}
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

        {/* Manager Status */}
        <div className="p-4 flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200"
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-blue-500 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-blue-900">Manager Mode</p>
                <p className="text-xs text-blue-600">Limited access permissions</p>
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
              <div className="w-10 h-10 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">Restaurant Manager</p>
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
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-white/20 sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
              {/* Quick Actions */}
              {hasPermission('tables', 'read') && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                  title="Generate QR Codes"
                >
                  <QrCode className="h-5 w-5" />
                </motion.button>
              )}

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
                  <p className="text-xs text-gray-500">Manager Access • 15 tables active</p>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </main>
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

export default ManagerLayout;