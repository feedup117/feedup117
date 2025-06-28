import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Gift, 
  TrendingUp, 
  Calendar,
  Download,
  Star,
  Users,
  Clock,
  BarChart3,
  Target,
  Award,
  Zap
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import TipHistory from '../../components/payment/TipHistory';
import { useAuth } from '../../contexts/AuthContext';
import IndianRupee from '../../components/icons/IndianRupee';

const Tips = () => {
  const [timeRange, setTimeRange] = useState('today');
  const { user } = useAuth();

  const timeRanges = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' },
  ];

  const tipStats = {
    today: { amount: 450, orders: 12, average: 37.5, rating: 4.8 },
    week: { amount: 2850, orders: 78, average: 36.5, rating: 4.7 },
    month: { amount: 12400, orders: 340, average: 36.5, rating: 4.8 },
    year: { amount: 145600, orders: 3890, average: 37.4, rating: 4.8 },
  };

  const currentStats = tipStats[timeRange as keyof typeof tipStats];

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tips & Earnings</h1>
            <p className="text-gray-600">Track your tip earnings and customer appreciation</p>
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
              <span>Export</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Tips',
              value: `₹${currentStats.amount.toLocaleString()}`,
              icon: Gift,
              color: 'from-green-500 to-emerald-500',
              bg: 'from-green-50 to-emerald-50',
              change: '+12.5%',
            },
            {
              title: 'Orders Served',
              value: currentStats.orders.toString(),
              icon: Users,
              color: 'from-blue-500 to-cyan-500',
              bg: 'from-blue-50 to-cyan-50',
              change: '+8.2%',
            },
            {
              title: 'Average Tip',
              value: `₹${currentStats.average}`,
              icon: Target,
              color: 'from-purple-500 to-violet-500',
              bg: 'from-purple-50 to-violet-50',
              change: '+5.1%',
            },
            {
              title: 'Service Rating',
              value: currentStats.rating.toString(),
              icon: Star,
              color: 'from-yellow-500 to-amber-500',
              bg: 'from-yellow-50 to-amber-50',
              change: '+0.2',
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`bg-gradient-to-br ${stat.bg} rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center space-x-1 text-sm font-medium text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tip History */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-lg">
                <Gift className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Tip History</h2>
            </div>
            
            <TipHistory servantId={user?.id || ''} timeRange={timeRange as any} />
          </div>
        </motion.div>

        {/* UPI Setup Reminder */}
        {!user?.tipUpiId && (
          <motion.div variants={itemVariants}>
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Set Up Your UPI ID for Tips</h3>
                  <p className="text-blue-800 mb-4">
                    You haven't set up your UPI ID yet. Ask your restaurant manager to set up your UPI ID so customers can tip you directly.
                  </p>
                  <p className="text-blue-700 text-sm">
                    Tips are sent directly to your UPI account. FeedUP does not process or take a cut from tips.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default Tips;