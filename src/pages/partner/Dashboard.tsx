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
  Bell
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const Dashboard = () => {
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
      title: 'Avg Rating',
      value: '4.8',
      change: '+0.2 this week',
      changeType: 'increase' as const,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-gradient-to-br from-yellow-100 to-amber-100',
      iconBg: 'bg-gradient-to-br from-yellow-500 to-amber-500',
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
    },
    {
      id: 'ORD002',
      table: 'Table 12',
      items: 'Tandoori Chicken, Naan',
      amount: 450,
      status: 'ready',
      time: '5 min ago',
      avatar: 'TC',
    },
    {
      id: 'ORD003',
      table: 'Table 8',
      items: 'Veg Manchurian, Fried Rice',
      amount: 320,
      status: 'served',
      time: '12 min ago',
      avatar: 'VM',
    },
  ];

  const quickActions = [
    {
      title: 'View Analytics',
      description: 'Detailed reports',
      icon: BarChart3,
      color: 'from-primary-500 to-primary-600',
      bgColor: 'from-primary-50 to-orange-50',
    },
    {
      title: 'Manage Staff',
      description: 'Add or edit staff',
      icon: Users,
      color: 'from-secondary-500 to-secondary-600',
      bgColor: 'from-secondary-50 to-yellow-50',
    },
    {
      title: 'Update Menu',
      description: 'Add new items',
      icon: ChefHat,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50',
    },
    {
      title: 'Sales Report',
      description: 'Today\'s summary',
      icon: TrendingUp,
      color: 'from-purple-500 to-violet-600',
      bgColor: 'from-purple-50 to-violet-50',
    },
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
              Good morning, Rajesh! 👋
            </h1>
            <p className="text-gray-600">Here's what's happening at your restaurant today.</p>
          </div>
          <div className="mt-4 lg:mt-0 flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 bg-gradient-to-r from-success-100 to-green-100 text-success-700 px-4 py-2 rounded-xl border border-success-200"
            >
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">All Systems Online</span>
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
                    <p className="text-sm text-gray-500">Real-time order updates</p>
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
                        <p className="text-xs text-gray-500 mt-1">{order.time}</p>
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

          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
                  <p className="text-sm text-gray-500">Manage your restaurant</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 bg-gradient-to-r ${action.bgColor} rounded-xl border border-white/50 text-left hover:shadow-lg transition-all group`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 bg-gradient-to-br ${action.color} rounded-lg shadow-lg group-hover:scale-110 transition-transform`}>
                        <action.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{action.title}</p>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Performance Chart Placeholder */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Revenue Analytics</h2>
                  <p className="text-sm text-gray-500">Track your performance over time</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 px-4 py-2 rounded-xl border border-purple-200"
                >
                  <Award className="h-4 w-4" />
                  <span className="text-sm font-medium">Top Performer</span>
                </motion.div>
              </div>
            </div>
            
            <div className="h-64 bg-gradient-to-br from-purple-50 via-white to-violet-50 rounded-xl flex items-center justify-center border border-purple-100">
              <div className="text-center">
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <BarChart3 className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                </motion.div>
                <p className="text-lg font-semibold text-gray-700 mb-2">Interactive Charts Coming Soon</p>
                <p className="text-sm text-gray-500">Revenue trends, order patterns, and performance metrics</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Announcements */}
        <motion.div variants={itemVariants}>
          <div className="bg-gradient-to-r from-accent-50 to-red-50 rounded-2xl border border-accent-200 p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gradient-to-br from-accent-500 to-red-500 rounded-lg">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-accent-900 mb-2">System Announcement</h3>
                <p className="text-accent-800 text-sm mb-3">
                  New feature: Advanced analytics dashboard is now available! Get deeper insights into your restaurant performance.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-accent-600 hover:text-accent-700 text-sm font-medium"
                >
                  Learn more →
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;