import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChefHat, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Flame,
  Leaf,
  Timer,
  Bell,
  RefreshCw,
  Filter,
  Zap,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Search,
  Users,
  MapPin
} from 'lucide-react';

interface KitchenOrder {
  id: string;
  tableNumber: number;
  items: Array<{
    name: string;
    quantity: number;
    notes?: string;
    isVeg: boolean;
    spicy?: boolean;
    priority?: 'normal' | 'high' | 'urgent';
    status: 'pending' | 'preparing' | 'ready';
  }>;
  status: 'new' | 'preparing' | 'ready';
  orderTime: string;
  estimatedTime: number;
  waiter: string;
  priority: 'normal' | 'high' | 'urgent';
  customerNotes?: string;
}

const KitchenOrders = () => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const orders: KitchenOrder[] = [
    {
      id: 'KOT001',
      tableNumber: 5,
      items: [
        { name: 'Chicken Biryani', quantity: 1, notes: 'Extra spicy', isVeg: false, spicy: true, priority: 'high', status: 'pending' },
        { name: 'Paneer Masala', quantity: 1, isVeg: true, status: 'pending' },
        { name: 'Naan', quantity: 2, isVeg: true, status: 'pending' },
      ],
      status: 'new',
      orderTime: '2 min ago',
      estimatedTime: 25,
      waiter: 'Amit Kumar',
      priority: 'high',
      customerNotes: 'Birthday celebration, please prepare with care',
    },
    {
      id: 'KOT002',
      tableNumber: 12,
      items: [
        { name: 'Tandoori Chicken', quantity: 1, isVeg: false, spicy: true, status: 'preparing' },
        { name: 'Butter Naan', quantity: 2, isVeg: true, status: 'preparing' },
      ],
      status: 'preparing',
      orderTime: '8 min ago',
      estimatedTime: 12,
      waiter: 'Priya Sharma',
      priority: 'urgent',
    },
    {
      id: 'KOT003',
      tableNumber: 8,
      items: [
        { name: 'Veg Manchurian', quantity: 1, isVeg: true, status: 'ready' },
        { name: 'Fried Rice', quantity: 1, isVeg: true, status: 'ready' },
        { name: 'Fresh Lime Soda', quantity: 2, isVeg: true, status: 'ready' },
      ],
      status: 'ready',
      orderTime: '15 min ago',
      estimatedTime: 0,
      waiter: 'Rahul Singh',
      priority: 'normal',
    },
    {
      id: 'KOT004',
      tableNumber: 3,
      items: [
        { name: 'Dal Tadka', quantity: 1, isVeg: true, status: 'preparing' },
        { name: 'Jeera Rice', quantity: 1, isVeg: true, status: 'preparing' },
        { name: 'Papad', quantity: 2, isVeg: true, status: 'pending' },
      ],
      status: 'preparing',
      orderTime: '12 min ago',
      estimatedTime: 8,
      waiter: 'Anita Gupta',
      priority: 'normal',
    },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Orders', count: orders.length, color: 'from-gray-500 to-gray-600' },
    { value: 'new', label: 'New Orders', count: orders.filter(o => o.status === 'new').length, color: 'from-blue-500 to-cyan-500' },
    { value: 'preparing', label: 'Preparing', count: orders.filter(o => o.status === 'preparing').length, color: 'from-yellow-500 to-amber-500' },
    { value: 'ready', label: 'Ready', count: orders.filter(o => o.status === 'ready').length, color: 'from-green-500 to-emerald-500' },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'new':
        return {
          color: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200',
          icon: Clock,
          iconColor: 'text-blue-500',
          bgGradient: 'from-blue-50 to-cyan-50',
          actionText: 'Start Cooking',
          actionColor: 'from-blue-500 to-cyan-500',
        };
      case 'preparing':
        return {
          color: 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border-yellow-200',
          icon: ChefHat,
          iconColor: 'text-yellow-500',
          bgGradient: 'from-yellow-50 to-amber-50',
          actionText: 'Mark as Ready',
          actionColor: 'from-yellow-500 to-amber-500',
        };
      case 'ready':
        return {
          color: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200',
          icon: CheckCircle,
          iconColor: 'text-green-500',
          bgGradient: 'from-green-50 to-emerald-50',
          actionText: 'Ready for Pickup',
          actionColor: 'from-green-500 to-emerald-500',
        };
      default:
        return {
          color: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200',
          icon: Clock,
          iconColor: 'text-gray-500',
          bgGradient: 'from-gray-50 to-slate-50',
          actionText: 'Process',
          actionColor: 'from-gray-500 to-gray-600',
        };
    }
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return { color: 'text-red-600', bg: 'bg-red-100', icon: AlertTriangle, pulse: true };
      case 'high':
        return { color: 'text-orange-600', bg: 'bg-orange-100', icon: Zap, pulse: false };
      default:
        return { color: 'text-gray-600', bg: 'bg-gray-100', icon: Timer, pulse: false };
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    console.log(`Updating order ${orderId} to ${newStatus}`);
    if (soundEnabled) {
      // Play notification sound
      console.log('🔔 Order status updated sound');
    }
  };

  const updateItemStatus = (orderId: string, itemIndex: number, newStatus: string) => {
    console.log(`Updating item ${itemIndex} in order ${orderId} to ${newStatus}`);
    if (soundEnabled) {
      console.log('🔔 Item ready sound');
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.tableNumber.toString().includes(searchTerm) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const newOrderVariants = {
    initial: { scale: 0.9, opacity: 0, y: 20 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 to-primary-50/30'
    }`}>
      {/* Kitchen Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-50 backdrop-blur-xl shadow-lg border-b transition-colors ${
          darkMode 
            ? 'bg-gray-800/90 border-gray-700' 
            : 'bg-white/90 border-white/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg"
              >
                <ChefHat className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Kitchen Orders (KOT)
                </h1>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 bg-green-500 rounded-full"
                    />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Kitchen Live • {filteredOrders.length} orders
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                      Spice Garden Kitchen
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Controls */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-3 rounded-xl transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
                title={soundEnabled ? 'Disable Sound' : 'Enable Sound'}
              >
                {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDarkMode(!darkMode)}
                className={`p-3 rounded-xl transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
                title={darkMode ? 'Light Mode' : 'Dark Mode'}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-colors ${
                  autoRefresh 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                    : darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
                onClick={() => setAutoRefresh(!autoRefresh)}
              >
                <RefreshCw className={`h-4 w-4 ${autoRefresh ? 'animate-spin' : ''}`} />
                <span className="text-sm font-medium">
                  {autoRefresh ? 'Auto Refresh ON' : 'Auto Refresh OFF'}
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Filters */}
          <motion.div variants={itemVariants}>
            <div className={`backdrop-blur-xl rounded-2xl shadow-xl border p-6 transition-colors ${
              darkMode 
                ? 'bg-gray-800/80 border-gray-700' 
                : 'bg-white/80 border-white/20'
            }`}>
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search orders, tables, or dishes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>
              </div>
              
              {/* Status Filter */}
              <div className="flex gap-3 overflow-x-auto mt-6 pb-2">
                {statusOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStatusFilter(option.value)}
                    className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                      statusFilter === option.value
                        ? `bg-gradient-to-r ${option.color} text-white shadow-lg`
                        : darkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>{option.label}</span>
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                      statusFilter === option.value
                        ? 'bg-white/20 text-white'
                        : darkMode
                          ? 'bg-gray-600 text-gray-300'
                          : 'bg-gray-200 text-gray-600'
                    }`}>
                      {option.count}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Orders Grid */}
          <motion.div variants={itemVariants}>
            <AnimatePresence mode="wait">
              <motion.div
                key={statusFilter + searchTerm}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredOrders.map((order, index) => {
                  const statusConfig = getStatusConfig(order.status);
                  const priorityConfig = getPriorityConfig(order.priority);
                  
                  return (
                    <motion.div
                      key={order.id}
                      variants={order.status === 'new' ? newOrderVariants : itemVariants}
                      initial={order.status === 'new' ? "initial" : "hidden"}
                      animate={order.status === 'new' ? "animate" : "visible"}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className={`backdrop-blur-xl rounded-2xl p-6 border shadow-lg hover:shadow-xl transition-all group relative overflow-hidden ${
                        darkMode 
                          ? 'bg-gray-800/80 border-gray-700' 
                          : `bg-gradient-to-br ${statusConfig.bgGradient} border-white/50`
                      }`}
                    >
                      {/* Priority Indicator */}
                      {order.priority !== 'normal' && (
                        <motion.div
                          animate={priorityConfig.pulse ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 1, repeat: Infinity }}
                          className={`absolute top-4 right-4 ${priorityConfig.bg} ${priorityConfig.color} px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 z-10`}
                        >
                          <priorityConfig.icon className="h-3 w-3" />
                          <span>{order.priority.toUpperCase()}</span>
                        </motion.div>
                      )}

                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`p-3 rounded-xl shadow-lg ${
                            darkMode 
                              ? 'bg-orange-600' 
                              : `bg-gradient-to-br ${statusConfig.actionColor}`
                          }`}>
                            <statusConfig.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              Table {order.tableNumber}
                            </h3>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {order.id} • {order.orderTime}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="mb-4">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full border ${
                          darkMode 
                            ? 'bg-gray-700 text-gray-300 border-gray-600' 
                            : statusConfig.color
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-3 mb-6">
                        {order.items.map((item, index) => (
                          <div key={index} className={`p-3 rounded-lg border transition-colors ${
                            darkMode 
                              ? 'bg-gray-700/50 border-gray-600' 
                              : 'bg-white/70 border-white/50'
                          }`}>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {item.name}
                                </span>
                                <div className="flex items-center space-x-1">
                                  {item.isVeg ? (
                                    <Leaf className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                                  )}
                                  {item.spicy && <Flame className="h-4 w-4 text-red-500" />}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                                  darkMode 
                                    ? 'bg-orange-900 text-orange-300' 
                                    : 'bg-orange-100 text-orange-700'
                                }`}>
                                  x{item.quantity}
                                </span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => updateItemStatus(order.id, index, 'ready')}
                                  className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                                    item.status === 'ready'
                                      ? 'bg-green-500 text-white'
                                      : item.status === 'preparing'
                                        ? 'bg-yellow-500 text-white'
                                        : darkMode
                                          ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                  }`}
                                >
                                  {item.status === 'ready' ? '✓ Ready' : 
                                   item.status === 'preparing' ? '🔥 Cooking' : 'Start'}
                                </motion.button>
                              </div>
                            </div>
                            {item.notes && (
                              <p className={`text-sm font-medium px-2 py-1 rounded ${
                                darkMode 
                                  ? 'text-yellow-300 bg-yellow-900/30' 
                                  : 'text-orange-600 bg-orange-50'
                              }`}>
                                Note: {item.notes}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Customer Notes */}
                      {order.customerNotes && (
                        <div className={`p-3 rounded-lg mb-4 border ${
                          darkMode 
                            ? 'bg-blue-900/30 border-blue-700 text-blue-300' 
                            : 'bg-blue-50 border-blue-200 text-blue-800'
                        }`}>
                          <p className="text-sm">
                            <strong>Customer Note:</strong> {order.customerNotes}
                          </p>
                        </div>
                      )}

                      {/* Order Details */}
                      <div className={`flex items-center justify-between text-sm mb-4 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{order.waiter}</span>
                          </div>
                          {order.estimatedTime > 0 && (
                            <div className="flex items-center space-x-1">
                              <Timer className="h-4 w-4" />
                              <span>{order.estimatedTime} min</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2">
                        {order.status === 'new' && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => updateOrderStatus(order.id, 'preparing')}
                            className={`w-full px-4 py-3 rounded-xl font-medium transition-all shadow-lg ${
                              darkMode 
                                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
                            }`}
                          >
                            🔥 Start Cooking
                          </motion.button>
                        )}
                        {order.status === 'preparing' && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => updateOrderStatus(order.id, 'ready')}
                            className={`w-full px-4 py-3 rounded-xl font-medium transition-all shadow-lg ${
                              darkMode 
                                ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                                : 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white hover:from-yellow-600 hover:to-amber-600'
                            }`}
                          >
                            ✅ Mark as Ready
                          </motion.button>
                        )}
                        {order.status === 'ready' && (
                          <div className={`w-full px-4 py-3 rounded-xl text-center font-medium shadow-lg ${
                            darkMode 
                              ? 'bg-green-700 text-green-200' 
                              : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                          }`}>
                            <div className="flex items-center justify-center space-x-2">
                              <Bell className="h-5 w-5" />
                              <span>🍽️ Ready for Pickup</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Decorative Element */}
                      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-12 translate-x-12" />
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {filteredOrders.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className={`backdrop-blur-xl rounded-2xl shadow-xl border p-12 ${
                  darkMode 
                    ? 'bg-gray-800/80 border-gray-700' 
                    : 'bg-white/80 border-white/20'
                }`}>
                  <div className={`mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    <ChefHat className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    No orders found
                  </h3>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    {statusFilter === 'all' 
                      ? 'No orders in the kitchen at the moment.'
                      : `No ${statusFilter} orders currently.`
                    }
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default KitchenOrders;