import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gift, 
  Calendar,
  Download,
  Search,
  Filter,
  ArrowUpDown,
  CreditCard,
  Smartphone,
  User,
  Clock,
  Coffee,
  RefreshCw,
  FileText,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import IndianRupee from '../../components/icons/IndianRupee';

interface TipTransaction {
  id: string;
  tableNumber: number;
  customerName?: string;
  amount: number;
  orderValue: number;
  percentage: number;
  date: string;
  time: string;
  paymentMethod: 'cash' | 'card' | 'upi';
  rating?: number;
  comment?: string;
}

const ServantTipsHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month' | 'custom'>('all');
  const [customDateRange, setCustomDateRange] = useState({ start: '', end: '' });
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<'all' | 'cash' | 'card' | 'upi'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  const [expandedTransaction, setExpandedTransaction] = useState<string | null>(null);

  const tipTransactions: TipTransaction[] = [
    {
      id: 'TIP001',
      tableNumber: 5,
      customerName: 'Rajesh Kumar',
      amount: 100,
      orderValue: 720,
      percentage: 13.9,
      date: '2025-01-10',
      time: '14:30',
      paymentMethod: 'upi',
      rating: 5,
      comment: 'Excellent service!',
    },
    {
      id: 'TIP002',
      tableNumber: 12,
      customerName: 'Priya Sharma',
      amount: 50,
      orderValue: 510,
      percentage: 9.8,
      date: '2025-01-10',
      time: '13:15',
      paymentMethod: 'card',
      rating: 4,
    },
    {
      id: 'TIP003',
      tableNumber: 8,
      amount: 75,
      orderValue: 560,
      percentage: 13.4,
      date: '2025-01-09',
      time: '19:45',
      paymentMethod: 'cash',
      rating: 5,
      comment: 'Very attentive service',
    },
    {
      id: 'TIP004',
      tableNumber: 3,
      customerName: 'Anita Gupta',
      amount: 70,
      orderValue: 350,
      percentage: 20,
      date: '2025-01-09',
      time: '12:30',
      paymentMethod: 'upi',
      rating: 5,
      comment: 'Thank you for the great experience!',
    },
    {
      id: 'TIP005',
      tableNumber: 7,
      amount: 40,
      orderValue: 480,
      percentage: 8.3,
      date: '2025-01-08',
      time: '20:15',
      paymentMethod: 'cash',
      rating: 4,
    },
    {
      id: 'TIP006',
      tableNumber: 10,
      customerName: 'Vikram Singh',
      amount: 120,
      orderValue: 950,
      percentage: 12.6,
      date: '2025-01-08',
      time: '19:30',
      paymentMethod: 'card',
      rating: 5,
      comment: 'Fantastic service, very professional',
    },
    {
      id: 'TIP007',
      tableNumber: 4,
      amount: 60,
      orderValue: 420,
      percentage: 14.3,
      date: '2025-01-07',
      time: '13:45',
      paymentMethod: 'upi',
      rating: 4,
    },
    {
      id: 'TIP008',
      tableNumber: 9,
      customerName: 'Neha Patel',
      amount: 90,
      orderValue: 680,
      percentage: 13.2,
      date: '2025-01-07',
      time: '20:00',
      paymentMethod: 'card',
      rating: 5,
      comment: 'Wonderful service, very attentive',
    },
  ];

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'cash':
        return IndianRupee;
      case 'card':
        return CreditCard;
      case 'upi':
        return Smartphone;
      default:
        return IndianRupee;
    }
  };

  const getSortedTransactions = () => {
    let sorted = [...tipTransactions];
    
    switch (sortOrder) {
      case 'newest':
        sorted = sorted.sort((a, b) => new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime());
        break;
      case 'oldest':
        sorted = sorted.sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime());
        break;
      case 'highest':
        sorted = sorted.sort((a, b) => b.amount - a.amount);
        break;
      case 'lowest':
        sorted = sorted.sort((a, b) => a.amount - b.amount);
        break;
    }
    
    return sorted;
  };

  const getFilteredTransactions = () => {
    const sorted = getSortedTransactions();
    
    return sorted.filter(transaction => {
      // Search filter
      const matchesSearch = 
        transaction.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.tableNumber.toString().includes(searchTerm) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Payment method filter
      const matchesPaymentMethod = paymentMethodFilter === 'all' || transaction.paymentMethod === paymentMethodFilter;
      
      // Date filter
      let matchesDate = true;
      const transactionDate = new Date(transaction.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (dateFilter === 'today') {
        const todayStr = today.toISOString().split('T')[0];
        matchesDate = transaction.date === todayStr;
      } else if (dateFilter === 'week') {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        weekAgo.setHours(0, 0, 0, 0);
        matchesDate = transactionDate >= weekAgo;
      } else if (dateFilter === 'month') {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        monthAgo.setHours(0, 0, 0, 0);
        matchesDate = transactionDate >= monthAgo;
      } else if (dateFilter === 'custom' && customDateRange.start && customDateRange.end) {
        const startDate = new Date(customDateRange.start);
        const endDate = new Date(customDateRange.end);
        endDate.setHours(23, 59, 59, 999); // Include the entire end day
        matchesDate = transactionDate >= startDate && transactionDate <= endDate;
      }
      
      return matchesSearch && matchesPaymentMethod && matchesDate;
    });
  };

  const filteredTransactions = getFilteredTransactions();
  
  const totalTips = filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const averageTip = filteredTransactions.length > 0 ? totalTips / filteredTransactions.length : 0;
  const highestTip = filteredTransactions.length > 0 ? Math.max(...filteredTransactions.map(t => t.amount)) : 0;

  const toggleExpandTransaction = (id: string) => {
    if (expandedTransaction === id) {
      setExpandedTransaction(null);
    } else {
      setExpandedTransaction(id);
    }
  };

  const exportToCsv = () => {
    // In a real app, this would generate and download a CSV file
    alert('Exporting tip history to CSV...');
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
        className="space-y-6"
      >
        {/* Mobile-First Header */}
        <motion.div variants={itemVariants} className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Tips History</h1>
              <p className="text-gray-600 text-sm lg:text-base">Complete record of all tips received</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportToCsv}
              className="flex items-center space-x-2 px-3 py-2 lg:px-4 lg:py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl hover:from-secondary-600 hover:to-secondary-700 transition-all shadow-lg"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export CSV</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards - Mobile Optimized */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-white/50 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg shadow-lg">
                <Gift className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tips</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalTips}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-white/50 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-lg">
                <IndianRupee className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Average Tip</p>
                <p className="text-2xl font-bold text-gray-900">₹{averageTip.toFixed(0)}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 border border-white/50 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg shadow-lg">
                <Gift className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Highest Tip</p>
                <p className="text-2xl font-bold text-gray-900">₹{highestTip}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-xl border border-white/20 p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by table, customer name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                />
              </div>
              
              {/* Date Filter */}
              <div className="flex-shrink-0">
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value as any)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm appearance-none"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              
              {/* Payment Method Filter */}
              <div className="flex-shrink-0">
                <select
                  value={paymentMethodFilter}
                  onChange={(e) => setPaymentMethodFilter(e.target.value as any)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm appearance-none"
                >
                  <option value="all">All Payment Methods</option>
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="upi">UPI</option>
                </select>
              </div>
            </div>
            
            {/* Custom Date Range */}
            {dateFilter === 'custom' && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={customDateRange.start}
                    onChange={(e) => setCustomDateRange({ ...customDateRange, start: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={customDateRange.end}
                    onChange={(e) => setCustomDateRange({ ...customDateRange, end: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Transactions List - Mobile Optimized */}
        <motion.div variants={itemVariants}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${dateFilter}-${paymentMethodFilter}-${sortOrder}-${searchTerm}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {filteredTransactions.map((transaction, index) => {
                const PaymentIcon = getPaymentMethodIcon(transaction.paymentMethod);
                const isExpanded = expandedTransaction === transaction.id;
                
                return (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="bg-white/80 backdrop-blur-xl rounded-xl p-4 border border-white/20 shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="space-y-4">
                      {/* Header - Always Visible */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
                            <Gift className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">₹{transaction.amount}</h3>
                            <p className="text-sm text-gray-600">Table {transaction.tableNumber}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <PaymentIcon className="h-4 w-4 text-gray-500" />
                            <p className="text-sm text-gray-600 capitalize">{transaction.paymentMethod}</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            {new Date(`${transaction.date}T${transaction.time}`).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Summary Row - Always Visible */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <IndianRupee className="h-3 w-3" />
                            <span>Order: ₹{transaction.orderValue}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Gift className="h-3 w-3" />
                            <span>{transaction.percentage.toFixed(1)}%</span>
                          </div>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleExpandTransaction(transaction.id)}
                          className="p-1 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </motion.button>
                      </div>

                      {/* Expanded Details */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-2 border-t border-gray-100 space-y-3">
                              {/* Customer Info */}
                              {transaction.customerName && (
                                <div className="flex items-center space-x-2 text-sm">
                                  <User className="h-4 w-4 text-gray-500" />
                                  <span className="text-gray-700">{transaction.customerName}</span>
                                </div>
                              )}
                              
                              {/* Time */}
                              <div className="flex items-center space-x-2 text-sm">
                                <Clock className="h-4 w-4 text-gray-500" />
                                <span className="text-gray-700">{transaction.time}</span>
                              </div>
                              
                              {/* Rating & Comment */}
                              {transaction.rating && (
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2 text-sm">
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`h-3 w-3 ${
                                            i < transaction.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-gray-700">{transaction.rating}/5 rating</span>
                                  </div>
                                  
                                  {transaction.comment && (
                                    <div className="bg-gray-50 p-2 rounded-lg">
                                      <p className="text-sm text-gray-600 italic">"{transaction.comment}"</p>
                                    </div>
                                  )}
                                </div>
                              )}
                              
                              {/* Transaction ID */}
                              <div className="flex items-center space-x-2 text-xs">
                                <FileText className="h-3 w-3 text-gray-500" />
                                <span className="text-gray-500">ID: {transaction.id}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filteredTransactions.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-xl border border-white/20 p-8">
                <div className="text-gray-400 mb-4">
                  <Gift className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No tip transactions found</h3>
                <p className="text-gray-600 text-sm">
                  {searchTerm 
                    ? 'Try adjusting your search criteria' 
                    : dateFilter !== 'all'
                      ? 'No tips found in the selected date range' 
                      : 'No tip history available yet'}
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
              onClick={exportToCsv}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl shadow-lg"
            >
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Add bottom padding for mobile sticky button */}
        <div className="lg:hidden h-20"></div>
      </motion.div>
    </DashboardLayout>
  );
};

export default ServantTipsHistory;