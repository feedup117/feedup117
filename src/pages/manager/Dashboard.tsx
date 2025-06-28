import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  TrendingUp,
  Clock,
  Star,
  IndianRupee,
  ChefHat,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Target,
  Award,
  Bell,
  Shield
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const ManagerDashboard = () => {
  const stats = [
    {
      title: 'Today\'s Revenue',
      value: '₹12,450',
      change: '+12.5%',
      changeType: 'increase' as const,
      icon: IndianRupee,
      color: 'text-green-600',
      bgColor: 'bg-gradient-to-br from-green-100 to-emerald-100',
      iconBg: 'bg-gradient-to-br from-green-500 to-emerald-500',
    },
    {
      title: 'Orders Today',
      value: '47',
      change: '+8.2%',
      changeType: 'increase' as const,
      icon: ShoppingBag,
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-100 to-cyan-100',
      iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    },
    {
      title: 'Active Tables',
      value: '12/20',
      change: '60% occupied',
      changeType: 'neutral' as const,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-100 to-violet-100',
      iconBg: 'bg-gradient-to-br from-purple-500 to-violet-500',
    },
    {
      title: 'Staff on Duty',
      value: '8/12',
      change: '2 on break',
      changeType: 'neutral' as const,
      icon: Shield,
      color: 'text-orange-600',
      bgColor: 'bg-gradient-to-br from-orange-100 to-amber-100',
      iconBg: 'bg-gradient-to-br from-orange-500 to-amber-500',
    },
  ];

  const recentOrders = [
    {
      id: 'ORD001',
      table: 'Table 5',
      items: 'Chicken Biryani, Paneer Masala',
      amount: 650,
      status: 'preparing',
      time: '2 min ago',
      avatar: 'CB',
      waiter: 'Amit Kumar',
    },
    {
      id: 'ORD002',
      table: 'Table 12',
      items: 'Tandoori Chicken, Naan',
      amount: 450,
      status: 'ready',
      time: '5 min ago',
      avatar: 'TC',
      waiter: 'Priya Sharma',
    },
    {
      id: 'ORD003',
      table: 'Table 8',
      items: 'Veg Manchurian, Fried Rice',
      amount: 320,
      status: 'served',
      time: '12 min ago',
      avatar: 'VM',
      waiter: 'Rahul Singh',
    },
  ];

  const staffStatus = [
    { name: 'Amit Kumar', role: 'Senior Waiter', status: 'active', tables: 4, tips: 450 },
    { name: 'Priya Sharma', role: 'Waiter', status: 'active', tables: 3, tips: 320 },
    { name: 'Rahul Singh', role: 'Kitchen Staff', status: 'break', tables: 0, tips: 0 },
    { name: 'Anita Gupta', role: 'Waiter', status: 'active', tables: 2, tips: 180 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing':
        return 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border-yellow-200';
      case 'ready':
        return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200';
      case 'served':
        return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200';
    }
  };

  const getStaffStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'break':
        return 'bg-yellow-100 text-yellow-800';
      case 'offline':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
        {/* Welcome Section */}
        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Good morning, Manager! 👋
            </h1>
            <p className="text-gray-600">Here's your restaurant operations overview for today.</p>
          </div>
          <div className="mt-4 lg:mt-0 flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 bg-gradient-to-r from-success-100 to-green-100 text-success-700 px-4 py-2 rounded-xl border border-success-200"
            >
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">Operations Running</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className={`relative overflow-hidden rounded-2xl ${stat.bgColor} p-6 border border-white/50 shadow-lg hover:shadow-xl transition-shadow`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.iconBg} shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 
                  stat.changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.changeType === 'increase' && <ArrowUpRight className="h-4 w-4" />}
                  {stat.changeType === 'decrease' && <ArrowDownRight className="h-4 w-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-16 translate-x-16" />
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Live Orders</h2>
                    <p className="text-sm text-gray-500">Real-time order monitoring</p>
                  </div>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center space-x-2 text-sm text-success-600"
                >
                  <div className="w-2 h-2 bg-success-500 rounded-full" />
                  <span className="font-medium">Live</span>
                </motion.div>
              </div>
              
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm font-bold">{order.avatar}</span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-1">
                          <span className="font-semibold text-gray-900">{order.table}</span>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{order.items}</p>
                        <p className="text-xs text-gray-500 mt-1">Waiter: {order.waiter} • {order.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">₹{order.amount}</p>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-primary-500 hover:text-primary-600 mt-1"
                      >
                        <Eye className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Staff Status */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Staff Status</h2>
                  <p className="text-sm text-gray-500">Current team overview</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {staffStatus.map((staff, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-semibold text-gray-900">{staff.name}</p>
                        <p className="text-sm text-gray-500">{staff.role}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStaffStatusColor(staff.status)}`}>
                        {staff.status}
                      </span>
                    </div>
                    
                    {staff.status === 'active' && (
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Tables</p>
                          <p className="font-semibold">{staff.tables}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Tips Today</p>
                          <p className="font-semibold text-green-600">₹{staff.tips}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Manager Notes */}
        <motion.div variants={itemVariants}>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 mb-2">Manager Notes</h3>
                <p className="text-blue-800 text-sm mb-3">
                  Peak hours approaching (7-9 PM). Ensure all staff are ready and kitchen is well-stocked. 
                  Table 15 has requested special dietary accommodations.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View all notes →
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default ManagerDashboard;