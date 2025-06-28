import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Coffee, 
  CheckCircle, 
  Clock, 
  Bell,
  User,
  MapPin,
  IndianRupee,
  Star,
  MessageCircle,
  Eye,
  RefreshCw,
  Zap,
  Gift,
  Phone,
  AlertCircle,
  Timer,
  UtensilsCrossed
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

interface ServantOrder {
  id: string;
  tableNumber: number;
  customerName?: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  status: 'ready' | 'served' | 'billed';
  totalAmount: number;
  orderTime: string;
  readyTime?: string;
  tipAmount?: number;
  customerNotes?: string;
  specialRequests?: string[];
  customerPhone?: string;
  paymentStatus?: 'pending' | 'paid';
}

const ServantOrders = () => {
  const [statusFilter, setStatusFilter] = useState<string>('ready');

  const orders: ServantOrder[] = [
    {
      id: 'SRV001',
      tableNumber: 5,
      customerName: 'Rajesh Kumar',
      items: [
        { name: 'Chicken Biryani', quantity: 1, price: 320 },
        { name: 'Paneer Masala', quantity: 1, price: 280 },
        { name: 'Naan', quantity: 2, price: 60 },
      ],
      status: 'ready',
      totalAmount: 720,
      orderTime: '15 min ago',
      readyTime: '2 min ago',
      customerNotes: 'Birthday celebration, please bring candles',
      specialRequests: ['Extra napkins', 'Separate plates'],
      customerPhone: '+91 98765 43210',
      paymentStatus: 'pending',
    },
    {
      id: 'SRV002',
      tableNumber: 12,
      customerName: 'Priya Sharma',
      items: [
        { name: 'Tandoori Chicken', quantity: 1, price: 350 },
        { name: 'Butter Naan', quantity: 2, price: 80 },
      ],
      status: 'served',
      totalAmount: 510,
      orderTime: '25 min ago',
      readyTime: '10 min ago',
      tipAmount: 50,
      customerPhone: '+91 98765 43211',
      paymentStatus: 'paid',
    },
    {
      id: 'SRV003',
      tableNumber: 8,
      items: [
        { name: 'Veg Manchurian', quantity: 1, price: 220 },
        { name: 'Fried Rice', quantity: 1, price: 180 },
        { name: 'Fresh Lime Soda', quantity: 2, price: 160 },
      ],
      status: 'billed',
      totalAmount: 560,
      orderTime: '35 min ago',
      readyTime: '20 min ago',
      tipAmount: 75,
      customerPhone: '+91 98765 43212',
      paymentStatus: 'paid',
    },
    {
      id: 'SRV004',
      tableNumber: 3,
      customerName: 'Anita Gupta',
      items: [
        { name: 'Dal Tadka', quantity: 1, price: 200 },
        { name: 'Jeera Rice', quantity: 1, price: 150 },
      ],
      status: 'ready',
      totalAmount: 350,
      orderTime: '8 min ago',
      readyTime: '1 min ago',
      customerNotes: 'Less spicy please',
      customerPhone: '+91 98765 43213',
      paymentStatus: 'pending',
    },
  ];

  const statusOptions = [
    { value: 'ready', label: 'Ready to Serve', count: orders.filter(o => o.status === 'ready').length, color: 'from-green-500 to-emerald-500', icon: Bell },
    { value: 'served', label: 'Served', count: orders.filter(o => o.status === 'served').length, color: 'from-blue-500 to-cyan-500', icon: Coffee },
    { value: 'billed', label: 'Completed', count: orders.filter(o => o.status === 'billed').length, color: 'from-purple-500 to-violet-500', icon: CheckCircle },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'ready':
        return {
          color: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200',
          icon: Bell,
          iconColor: 'text-green-500',
          bgGradient: 'from-green-50 to-emerald-50',
          actionText: 'Serve Order',
          actionColor: 'from-green-500 to-emerald-500',
          pulse: true,
        };
      case 'served':
        return {
          color: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200',
          icon: Coffee,
          iconColor: 'text-blue-500',
          bgGradient: 'from-blue-50 to-cyan-50',
          actionText: 'Mark as Billed',
          actionColor: 'from-blue-500 to-cyan-500',
          pulse: false,
        };
      case 'billed':
        return {
          color: 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border-purple-200',
          icon: CheckCircle,
          iconColor: 'text-purple-500',
          bgGradient: 'from-purple-50 to-violet-50',
          actionText: 'Completed',
          actionColor: 'from-purple-500 to-violet-500',
          pulse: false,
        };
      default:
        return {
          color: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200',
          icon: Clock,
          iconColor: 'text-gray-500',
          bgGradient: 'from-gray-50 to-slate-50',
          actionText: 'Process',
          actionColor: 'from-gray-500 to-gray-600',
          pulse: false,
        };
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    console.log(`Updating order ${orderId} to ${newStatus}`);
    // In a real app, this would update the backend
  };

  const callCustomer = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const filteredOrders = orders.filter(order => {
    return order.status === statusFilter;
  });

  const todaysTips = orders
    .filter(order => order.tipAmount)
    .reduce((total, order) => total + (order.tipAmount || 0), 0);

  const ordersServed = orders.filter(order => order.status === 'served' || order.status === 'billed').length;

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

  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Mobile-First Header */}
        <motion.div variants={itemVariants} className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Service Orders</h1>
              <p className="text-gray-600 text-sm lg:text-base">Manage table service and customer experience</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-3 py-2 lg:px-4 lg:py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </motion.button>
          </div>

          {/* Service Status */}
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center space-x-2 bg-gradient-to-r from-success-100 to-green-100 text-success-700 px-4 py-2 rounded-xl border border-success-200 w-fit"
          >
            <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">On Duty</span>
          </motion.div>
        </motion.div>

        {/* Stats Cards - Mobile Optimized */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-white/50 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg shadow-lg">
                <Coffee className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Orders Served</p>
                <p className="text-2xl font-bold text-gray-900">{ordersServed}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border border-white/50 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-lg shadow-lg">
                <Gift className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Tips Today</p>
                <p className="text-2xl font-bold text-gray-900">₹{todaysTips}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-white/50 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-lg">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.8</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Status Filter - Mobile Optimized */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-xl border border-white/20 p-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {statusOptions.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStatusFilter(option.value)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                    statusFilter === option.value
                      ? `bg-gradient-to-r ${option.color} text-white shadow-lg`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <option.icon className="h-4 w-4" />
                  <span className="text-sm">{option.label}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    statusFilter === option.value
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {option.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Orders List - Mobile Optimized */}
        <motion.div variants={itemVariants}>
          <AnimatePresence mode="wait">
            <motion.div
              key={statusFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {filteredOrders.map((order, index) => {
                const statusConfig = getStatusConfig(order.status);
                
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className={`bg-gradient-to-br ${statusConfig.bgGradient} rounded-xl p-4 lg:p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all group relative overflow-hidden`}
                  >
                    {/* Priority Pulse for Ready Orders */}
                    {statusConfig.pulse && (
                      <motion.div
                        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-green-400/10 rounded-xl"
                      />
                    )}

                    {/* Mobile-First Layout */}
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <motion.div
                            animate={statusConfig.pulse ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className={`p-2 lg:p-3 bg-gradient-to-br ${statusConfig.actionColor} rounded-xl shadow-lg`}
                          >
                            <statusConfig.icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                          </motion.div>
                          <div>
                            <h3 className="text-lg lg:text-xl font-bold text-gray-900">Table {order.tableNumber}</h3>
                            {order.customerName && (
                              <p className="text-sm text-gray-600 flex items-center">
                                <User className="h-3 w-3 mr-1" />
                                {order.customerName}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{order.id}</p>
                          {order.readyTime && (
                            <p className="text-xs text-green-600 font-medium">Ready: {order.readyTime}</p>
                          )}
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full border ${statusConfig.color} flex items-center space-x-1 w-fit`}>
                          <statusConfig.icon className="h-3 w-3" />
                          <span>
                            {order.status === 'ready' ? 'Ready to Serve' : 
                             order.status === 'served' ? 'Served' : 'Completed'}
                          </span>
                        </span>
                      </div>

                      {/* Order Items - Compact for Mobile */}
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-2 px-3 bg-white/50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900 text-sm lg:text-base">{item.name}</p>
                              <p className="text-xs lg:text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-semibold text-gray-900 text-sm lg:text-base">₹{item.price * item.quantity}</p>
                          </div>
                        ))}
                      </div>

                      {/* Customer Notes */}
                      {order.customerNotes && (
                        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            <strong>Customer Note:</strong> {order.customerNotes}
                          </p>
                        </div>
                      )}

                      {/* Special Requests */}
                      {order.specialRequests && order.specialRequests.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Special Requests:</p>
                          <div className="flex flex-wrap gap-2">
                            {order.specialRequests.map((request, i) => (
                              <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg">
                                {request}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Order Details */}
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{order.orderTime}</span>
                          </div>
                          {order.paymentStatus && (
                            <div className="flex items-center space-x-1">
                              <IndianRupee className="h-3 w-3" />
                              <span className={order.paymentStatus === 'paid' ? 'text-green-600' : 'text-orange-600'}>
                                {order.paymentStatus}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Order Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-white/50">
                        <div>
                          <p className="text-xl lg:text-2xl font-bold text-gray-900">₹{order.totalAmount}</p>
                          {order.tipAmount && (
                            <div className="flex items-center space-x-1 text-sm text-green-600">
                              <Gift className="h-3 w-3" />
                              <span>Tip: ₹{order.tipAmount}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {/* Customer Call Button */}
                          {order.customerPhone && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => callCustomer(order.customerPhone!)}
                              className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Call Customer"
                            >
                              <Phone className="h-4 w-4" />
                            </motion.button>
                          )}

                          {/* Main Action Button */}
                          {order.status === 'ready' && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => updateOrderStatus(order.id, 'served')}
                              className={`px-4 py-2 bg-gradient-to-r ${statusConfig.actionColor} text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium`}
                            >
                              Serve Order
                            </motion.button>
                          )}
                          {order.status === 'served' && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => updateOrderStatus(order.id, 'billed')}
                              className={`px-4 py-2 bg-gradient-to-r ${statusConfig.actionColor} text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium`}
                            >
                              Mark Billed
                            </motion.button>
                          )}
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filteredOrders.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-xl border border-white/20 p-8">
                <div className="text-gray-400 mb-4">
                  <Coffee className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-600 text-sm">
                  No {statusFilter === 'ready' ? 'orders ready to serve' : 
                       statusFilter === 'served' ? 'served orders' : 'completed orders'} at the moment.
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Quick Actions - Mobile Sticky Bottom */}
        <motion.div 
          variants={itemVariants}
          className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 p-4 z-50"
        >
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl shadow-lg"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh Orders</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Add bottom padding for mobile sticky button */}
        <div className="lg:hidden h-20"></div>
      </motion.div>
    </DashboardLayout>
  );
};

export default ServantOrders;