import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  ChefHat, 
  CheckCircle, 
  Filter,
  Search,
  Bell,
  Eye,
  MoreVertical,
  User,
  MapPin,
  Timer,
  DollarSign,
  AlertTriangle,
  Zap,
  RefreshCw
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

interface Order {
  id: string;
  tableNumber: number;
  customerName?: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    notes?: string;
  }>;
  status: 'placed' | 'preparing' | 'ready' | 'served';
  totalAmount: number;
  orderTime: string;
  estimatedTime?: number;
  customerNotes?: string;
  waiter?: string;
  priority: 'normal' | 'high' | 'urgent';
}

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const orders: Order[] = [
    {
      id: 'ORD001',
      tableNumber: 5,
      customerName: 'Rajesh Kumar',
      items: [
        { name: 'Chicken Biryani', quantity: 1, price: 320, notes: 'Extra spicy' },
        { name: 'Paneer Masala', quantity: 1, price: 280 },
        { name: 'Naan', quantity: 2, price: 60 },
      ],
      status: 'preparing',
      totalAmount: 720,
      orderTime: '2 minutes ago',
      estimatedTime: 15,
      customerNotes: 'Less spicy please, birthday celebration',
      waiter: 'Amit Kumar',
      priority: 'high',
    },
    {
      id: 'ORD002',
      tableNumber: 12,
      customerName: 'Priya Sharma',
      items: [
        { name: 'Tandoori Chicken', quantity: 1, price: 350 },
        { name: 'Butter Naan', quantity: 2, price: 80 },
      ],
      status: 'ready',
      totalAmount: 510,
      orderTime: '8 minutes ago',
      waiter: 'Priya Singh',
      priority: 'urgent',
    },
    {
      id: 'ORD003',
      tableNumber: 8,
      items: [
        { name: 'Veg Manchurian', quantity: 1, price: 220 },
        { name: 'Fried Rice', quantity: 1, price: 180 },
        { name: 'Fresh Lime Soda', quantity: 2, price: 160 },
      ],
      status: 'placed',
      totalAmount: 560,
      orderTime: '1 minute ago',
      estimatedTime: 20,
      waiter: 'Rahul Singh',
      priority: 'normal',
    },
    {
      id: 'ORD004',
      tableNumber: 3,
      customerName: 'Anita Gupta',
      items: [
        { name: 'Dal Tadka', quantity: 1, price: 200 },
        { name: 'Jeera Rice', quantity: 1, price: 150 },
      ],
      status: 'served',
      totalAmount: 350,
      orderTime: '25 minutes ago',
      waiter: 'Amit Kumar',
      priority: 'normal',
    },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Orders', count: orders.length, color: 'from-gray-500 to-gray-600' },
    { value: 'placed', label: 'New Orders', count: orders.filter(o => o.status === 'placed').length, color: 'from-blue-500 to-cyan-500' },
    { value: 'preparing', label: 'Preparing', count: orders.filter(o => o.status === 'preparing').length, color: 'from-yellow-500 to-amber-500' },
    { value: 'ready', label: 'Ready', count: orders.filter(o => o.status === 'ready').length, color: 'from-green-500 to-emerald-500' },
    { value: 'served', label: 'Served', count: orders.filter(o => o.status === 'served').length, color: 'from-purple-500 to-violet-500' },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'placed':
        return {
          color: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200',
          icon: Clock,
          iconColor: 'text-blue-500',
          bgGradient: 'from-blue-50 to-cyan-50',
        };
      case 'preparing':
        return {
          color: 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border-yellow-200',
          icon: ChefHat,
          iconColor: 'text-yellow-500',
          bgGradient: 'from-yellow-50 to-amber-50',
        };
      case 'ready':
        return {
          color: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200',
          icon: Bell,
          iconColor: 'text-green-500',
          bgGradient: 'from-green-50 to-emerald-50',
        };
      case 'served':
        return {
          color: 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border-purple-200',
          icon: CheckCircle,
          iconColor: 'text-purple-500',
          bgGradient: 'from-purple-50 to-violet-50',
        };
      default:
        return {
          color: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200',
          icon: Clock,
          iconColor: 'text-gray-500',
          bgGradient: 'from-gray-50 to-slate-50',
        };
    }
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return { color: 'text-red-600', bg: 'bg-red-100', icon: AlertTriangle };
      case 'high':
        return { color: 'text-orange-600', bg: 'bg-orange-100', icon: Zap };
      default:
        return { color: 'text-gray-600', bg: 'bg-gray-100', icon: Timer };
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    console.log(`Updating order ${orderId} to ${newStatus}`);
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.tableNumber.toString().includes(searchTerm) ||
                         order.customerName?.toLowerCase().includes(searchTerm.toLowerCase());
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

  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Orders</h1>
            <p className="text-gray-600">Monitor and manage all restaurant orders in real-time</p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center space-x-2 bg-gradient-to-r from-success-100 to-green-100 text-success-700 px-4 py-2 rounded-xl border border-success-200"
            >
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Live Updates</span>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by order ID, table, or customer name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
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
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{option.label}</span>
                  <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
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

        {/* Orders Grid */}
        <motion.div variants={itemVariants}>
          <AnimatePresence mode="wait">
            <motion.div
              key={statusFilter + searchTerm}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {filteredOrders.map((order, index) => {
                const statusConfig = getStatusConfig(order.status);
                const priorityConfig = getPriorityConfig(order.priority);
                
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={`bg-gradient-to-br ${statusConfig.bgGradient} rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all group`}
                  >
                    {/* Order Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 bg-gradient-to-br ${statusConfig.color.includes('blue') ? 'from-blue-500 to-cyan-500' : statusConfig.color.includes('yellow') ? 'from-yellow-500 to-amber-500' : statusConfig.color.includes('green') ? 'from-green-500 to-emerald-500' : 'from-purple-500 to-violet-500'} rounded-lg shadow-lg`}>
                          <statusConfig.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-bold text-gray-900">Table {order.tableNumber}</h3>
                            {order.priority !== 'normal' && (
                              <div className={`flex items-center space-x-1 ${priorityConfig.bg} ${priorityConfig.color} px-2 py-1 rounded-full text-xs font-medium`}>
                                <priorityConfig.icon className="h-3 w-3" />
                                <span>{order.priority}</span>
                              </div>
                            )}
                          </div>
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
                        <p className="text-xs text-gray-400">{order.orderTime}</p>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="mt-1 p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="mb-4">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full border ${statusConfig.color} flex items-center space-x-1 w-fit`}>
                        <statusConfig.icon className="h-4 w-4" />
                        <span className="capitalize">{order.status}</span>
                      </span>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-2 mb-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 px-3 bg-white/50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span>Qty: {item.quantity}</span>
                              {item.notes && (
                                <span className="text-orange-600 font-medium">• {item.notes}</span>
                              )}
                            </div>
                          </div>
                          <p className="font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                        </div>
                      ))}
                    </div>

                    {/* Customer Notes */}
                    {order.customerNotes && (
                      <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg mb-4">
                        <p className="text-sm text-yellow-800">
                          <strong>Customer Note:</strong> {order.customerNotes}
                        </p>
                      </div>
                    )}

                    {/* Order Details */}
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-4">
                        {order.waiter && (
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{order.waiter}</span>
                          </div>
                        )}
                        {order.estimatedTime && (
                          <div className="flex items-center space-x-1">
                            <Timer className="h-4 w-4" />
                            <span>{order.estimatedTime} min</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Order Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/50">
                      <div>
                        <p className="text-2xl font-bold text-gray-900 flex items-center">
                          <DollarSign className="h-5 w-5 mr-1" />
                          ₹{order.totalAmount}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {order.status === 'placed' && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateOrderStatus(order.id, 'preparing')}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg text-sm font-medium"
                          >
                            Start Preparing
                          </motion.button>
                        )}
                        {order.status === 'preparing' && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateOrderStatus(order.id, 'ready')}
                            className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-lg hover:from-yellow-600 hover:to-amber-600 transition-all shadow-lg text-sm font-medium"
                          >
                            Mark Ready
                          </motion.button>
                        )}
                        {order.status === 'ready' && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateOrderStatus(order.id, 'served')}
                            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg text-sm font-medium"
                          >
                            Mark Served
                          </motion.button>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </motion.button>
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
              className="text-center py-16"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-12">
                <div className="text-gray-400 mb-4">
                  <ChefHat className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-600">
                  {statusFilter === 'all' 
                    ? 'No orders yet. Orders will appear here when customers place them.'
                    : `No ${statusFilter} orders at the moment.`
                  }
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Orders;