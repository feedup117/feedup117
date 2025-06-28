import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  ShoppingBag, 
  Star,
  IndianRupee,
  Calendar,
  Download,
  Filter,
  Eye,
  Clock,
  Target,
  Award,
  Zap,
  PieChart,
  Activity
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const timeRanges = [
    { value: '1d', label: 'Today' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' },
  ];

  const metrics = [
    {
      id: 'revenue',
      title: 'Revenue Analytics',
      value: '₹1,24,500',
      change: '+15.2%',
      changeType: 'increase',
      icon: IndianRupee,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
    },
    {
      id: 'orders',
      title: 'Total Orders',
      value: '1,247',
      change: '+8.7%',
      changeType: 'increase',
      icon: ShoppingBag,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
    },
    {
      id: 'customers',
      title: 'Unique Customers',
      value: '892',
      change: '+12.3%',
      changeType: 'increase',
      icon: Users,
      color: 'from-purple-500 to-violet-500',
      bgColor: 'from-purple-50 to-violet-50',
    },
    {
      id: 'rating',
      title: 'Average Rating',
      value: '4.8',
      change: '+0.3',
      changeType: 'increase',
      icon: Star,
      color: 'from-yellow-500 to-amber-500',
      bgColor: 'from-yellow-50 to-amber-50',
    },
  ];

  const topItems = [
    { name: 'Chicken Biryani', orders: 156, revenue: '₹49,920', trend: '+12%', image: 'https://images.pexels.com/photos/11638960/pexels-photo-11638960.jpeg' },
    { name: 'Paneer Butter Masala', orders: 134, revenue: '₹37,520', trend: '+8%', image: 'https://images.pexels.com/photos/6419721/pexels-photo-6419721.jpeg' },
    { name: 'Tandoori Chicken', orders: 98, revenue: '₹34,300', trend: '+15%', image: 'https://images.pexels.com/photos/14737816/pexels-photo-14737816.jpeg' },
    { name: 'Dal Tadka', orders: 87, revenue: '₹17,400', trend: '+5%', image: 'https://images.pexels.com/photos/6419616/pexels-photo-6419616.jpeg' },
  ];

  const recentFeedback = [
    { customer: 'Rajesh Kumar', rating: 5, comment: 'Excellent food and service!', time: '2 hours ago', table: 'Table 5' },
    { customer: 'Priya Sharma', rating: 4, comment: 'Good taste, quick delivery', time: '4 hours ago', table: 'Table 12' },
    { customer: 'Amit Singh', rating: 5, comment: 'Best biryani in town!', time: '6 hours ago', table: 'Table 8' },
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Track your restaurant's performance and insights</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Time Range Selector */}
            <div className="flex items-center space-x-2 bg-white rounded-xl p-1 shadow-lg border border-gray-200">
              {timeRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setTimeRange(range.value)}
                  className={`px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                    timeRange === range.value 
                      ? 'bg-primary-500 text-white shadow-lg' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl hover:from-secondary-600 hover:to-secondary-700 transition-all shadow-lg"
            >
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => setSelectedMetric(metric.id)}
              className={`cursor-pointer relative overflow-hidden rounded-2xl bg-gradient-to-br ${metric.bgColor} p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all ${
                selectedMetric === metric.id ? 'ring-2 ring-primary-500 ring-offset-2' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.color} shadow-lg`}>
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.changeType === 'increase' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span>{metric.change}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
              </div>
              
              {/* Selection indicator */}
              {selectedMetric === metric.id && (
                <motion.div
                  layoutId="selectedMetric"
                  className="absolute inset-0 bg-primary-500/5 rounded-2xl"
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Revenue Trends</h2>
                    <p className="text-sm text-gray-500">Daily revenue over time</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 bg-gradient-to-r from-success-100 to-green-100 text-success-700 px-3 py-1 rounded-lg border border-success-200"
                  >
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">+15.2%</span>
                  </motion.div>
                </div>
              </div>
              
              <div className="h-80 bg-gradient-to-br from-primary-50 via-white to-secondary-50 rounded-xl flex items-center justify-center border border-primary-100">
                <div className="text-center">
                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <BarChart3 className="h-16 w-16 text-primary-400 mx-auto mb-4" />
                  </motion.div>
                  <p className="text-lg font-semibold text-gray-700 mb-2">Interactive Revenue Chart</p>
                  <p className="text-sm text-gray-500">Detailed revenue analytics and trends visualization</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Performance Insights */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Performance</h2>
                  <p className="text-sm text-gray-500">Key insights</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { title: 'Peak Hours', value: '7-9 PM', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100' },
                  { title: 'Avg Order Value', value: '₹425', icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-100' },
                  { title: 'Table Turnover', value: '3.2x/day', icon: Activity, color: 'text-purple-600', bg: 'bg-purple-100' },
                  { title: 'Customer Satisfaction', value: '96%', icon: Award, color: 'text-yellow-600', bg: 'bg-yellow-100' },
                ].map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 ${insight.bg} rounded-lg`}>
                        <insight.icon className={`h-4 w-4 ${insight.color}`} />
                      </div>
                      <span className="font-medium text-gray-900">{insight.title}</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{insight.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Top Performing Items & Recent Feedback */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Items */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-accent-500 to-red-500 rounded-lg">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Top Performing Items</h2>
                  <p className="text-sm text-gray-500">Best sellers this period</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {topItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-lg transition-all"
                  >
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-accent-500 to-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{item.orders} orders</span>
                        <span className="text-green-600 font-medium">{item.trend}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{item.revenue}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Feedback */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-lg">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Recent Feedback</h2>
                  <p className="text-sm text-gray-500">Customer reviews</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {recentFeedback.map((feedback, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{feedback.customer}</h4>
                        <p className="text-sm text-gray-500">{feedback.table} • {feedback.time}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm italic">"{feedback.comment}"</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Analytics;