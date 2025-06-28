import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Star, 
  Search, 
  Filter, 
  Download, 
  Building2, 
  Calendar, 
  User, 
  ThumbsUp, 
  ThumbsDown, 
  Heart, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  BarChart3, 
  PieChart, 
  ArrowUpRight, 
  ArrowDownRight,
  Coffee,
  UtensilsCrossed,
  Utensils,
  RefreshCw
} from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';

interface Feedback {
  id: string;
  partnerId: string;
  partnerName: string;
  customerName?: string;
  rating: number;
  comment?: string;
  categories?: string[];
  timestamp: string;
  tableNumber: number;
  orderTotal: number;
  tipAmount?: number;
  isPositive: boolean;
}

const FeedbackOverview = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [partnerFilter, setPartnerFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [expandedFeedback, setExpandedFeedback] = useState<string | null>(null);

  const feedback: Feedback[] = [
    {
      id: 'FB001',
      partnerId: 'P001',
      partnerName: 'Spice Garden',
      customerName: 'Rajesh Kumar',
      rating: 5,
      comment: 'Excellent service! The food was delicious and served quickly. The QR ordering system was very convenient.',
      categories: ['Food Quality', 'Service', 'Technology'],
      timestamp: '2025-01-10T14:30:00',
      tableNumber: 5,
      orderTotal: 720,
      tipAmount: 100,
      isPositive: true,
    },
    {
      id: 'FB002',
      partnerId: 'P002',
      partnerName: 'Pizza Paradise',
      rating: 4,
      comment: 'Good pizza, but took a bit longer than expected. The QR ordering was easy to use though.',
      categories: ['Food Quality', 'Speed', 'Technology'],
      timestamp: '2025-01-10T13:15:00',
      tableNumber: 3,
      orderTotal: 450,
      tipAmount: 50,
      isPositive: true,
    },
    {
      id: 'FB003',
      partnerId: 'P001',
      partnerName: 'Spice Garden',
      customerName: 'Anita Gupta',
      rating: 2,
      comment: 'Food was cold when it arrived. Service was slow and unresponsive.',
      categories: ['Food Quality', 'Service', 'Temperature'],
      timestamp: '2025-01-09T19:45:00',
      tableNumber: 8,
      orderTotal: 560,
      isPositive: false,
    },
    {
      id: 'FB004',
      partnerId: 'P003',
      partnerName: 'Burger Barn',
      rating: 5,
      comment: 'Amazing burgers! The QR ordering system made it so easy to customize my order.',
      categories: ['Food Quality', 'Technology', 'Customization'],
      timestamp: '2025-01-09T12:30:00',
      tableNumber: 4,
      orderTotal: 350,
      tipAmount: 70,
      isPositive: true,
    },
    {
      id: 'FB005',
      partnerId: 'P002',
      partnerName: 'Pizza Paradise',
      customerName: 'Priya Sharma',
      rating: 3,
      comment: 'Average experience. Pizza was good but the ambience could be better.',
      categories: ['Food Quality', 'Ambience'],
      timestamp: '2025-01-08T20:15:00',
      tableNumber: 7,
      orderTotal: 480,
      isPositive: false,
    },
    {
      id: 'FB006',
      partnerId: 'P004',
      partnerName: 'Cafe Connect',
      customerName: 'Vikram Patel',
      rating: 5,
      comment: 'Best coffee in town! The staff was very friendly and the QR ordering system was a breeze to use.',
      categories: ['Beverage Quality', 'Service', 'Technology'],
      timestamp: '2025-01-08T09:30:00',
      tableNumber: 2,
      orderTotal: 250,
      tipAmount: 50,
      isPositive: true,
    },
    {
      id: 'FB007',
      partnerId: 'P001',
      partnerName: 'Spice Garden',
      rating: 1,
      comment: 'Terrible experience. Food was bland and service was rude.',
      categories: ['Food Quality', 'Service'],
      timestamp: '2025-01-07T19:00:00',
      tableNumber: 10,
      orderTotal: 680,
      isPositive: false,
    },
  ];

  const partners = [
    { value: 'all', label: 'All Partners' },
    { value: 'P001', label: 'Spice Garden' },
    { value: 'P002', label: 'Pizza Paradise' },
    { value: 'P003', label: 'Burger Barn' },
    { value: 'P004', label: 'Cafe Connect' },
  ];

  const toggleExpandFeedback = (id: string) => {
    if (expandedFeedback === id) {
      setExpandedFeedback(null);
    } else {
      setExpandedFeedback(id);
    }
  };

  const exportFeedback = () => {
    // In a real app, this would generate and download a CSV file
    alert('Exporting feedback to CSV...');
  };

  const getFilteredFeedback = () => {
    return feedback.filter(item => {
      const matchesSearch = 
        (item.comment?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        item.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
      
      const matchesPartner = partnerFilter === 'all' || item.partnerId === partnerFilter;
      const matchesRating = ratingFilter === null || item.rating === ratingFilter;
      
      let matchesDateRange = true;
      if (dateRange.start && dateRange.end) {
        const feedbackDate = new Date(item.timestamp);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        endDate.setHours(23, 59, 59, 999); // Include the entire end day
        matchesDateRange = feedbackDate >= startDate && feedbackDate <= endDate;
      }
      
      return matchesSearch && matchesPartner && matchesRating && matchesDateRange;
    });
  };

  const filteredFeedback = getFilteredFeedback();
  
  const averageRating = feedback.reduce((sum, item) => sum + item.rating, 0) / feedback.length;
  const positivePercentage = Math.round((feedback.filter(f => f.rating >= 4).length / feedback.length) * 100);
  const negativePercentage = Math.round((feedback.filter(f => f.rating <= 2).length / feedback.length) * 100);

  // Get most common categories
  const categoryCount: Record<string, number> = {};
  feedback.forEach(item => {
    item.categories?.forEach(category => {
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });
  });
  
  const topCategories = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([category, count]) => ({ category, count }));

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
    <AdminLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Feedback Overview</h1>
            <p className="text-gray-600">Analyze customer feedback across all restaurants</p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportFeedback}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl hover:from-secondary-600 hover:to-secondary-700 transition-all shadow-lg"
            >
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </motion.button>
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

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl shadow-lg">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center space-x-1 text-sm font-medium text-yellow-600">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Average Rating</p>
              <p className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}/5</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
                <ThumbsUp className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center space-x-1 text-sm font-medium text-green-600">
                <ArrowUpRight className="h-4 w-4" />
                <span>+5.2%</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Positive Feedback</p>
              <p className="text-3xl font-bold text-gray-900">{positivePercentage}%</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-red-500 to-rose-500 rounded-xl shadow-lg">
                <ThumbsDown className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center space-x-1 text-sm font-medium text-red-600">
                <ArrowDownRight className="h-4 w-4" />
                <span>-2.1%</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Negative Feedback</p>
              <p className="text-3xl font-bold text-gray-900">{negativePercentage}%</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center space-x-1 text-sm font-medium text-blue-600">
                <span>Last 30 days</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Feedback</p>
              <p className="text-3xl font-bold text-gray-900">{feedback.length}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Top Categories & Charts */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Top Categories */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Most Loved Categories</h2>
                  <p className="text-sm text-gray-500">Top feedback categories</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {topCategories.map((category, index) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      {category.category === 'Food Quality' && <Utensils className="h-5 w-5 text-primary-500" />}
                      {category.category === 'Service' && <Coffee className="h-5 w-5 text-blue-500" />}
                      {category.category === 'Technology' && <QrCode className="h-5 w-5 text-purple-500" />}
                      {category.category === 'Speed' && <Clock className="h-5 w-5 text-green-500" />}
                      {category.category === 'Ambience' && <Building2 className="h-5 w-5 text-yellow-500" />}
                      {category.category === 'Beverage Quality' && <Coffee className="h-5 w-5 text-orange-500" />}
                      {category.category === 'Temperature' && <Thermometer className="h-5 w-5 text-red-500" />}
                      {category.category === 'Customization' && <Settings className="h-5 w-5 text-indigo-500" />}
                      <span className="font-medium text-gray-900">{category.category}</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{category.count}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Rating Distribution */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Rating Distribution</h2>
                    <p className="text-sm text-gray-500">Breakdown by star rating</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <select className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 appearance-none text-sm">
                    <option>Last 30 Days</option>
                    <option>Last 90 Days</option>
                    <option>Last 12 Months</option>
                    <option>All Time</option>
                  </select>
                </div>
              </div>
              
              <div className="h-64 bg-gradient-to-br from-primary-50 via-white to-secondary-50 rounded-xl flex items-center justify-center border border-primary-100">
                <div className="text-center">
                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <BarChart3 className="h-16 w-16 text-primary-400 mx-auto mb-4" />
                  </motion.div>
                  <p className="text-lg font-semibold text-gray-700 mb-2">Interactive Rating Chart</p>
                  <p className="text-sm text-gray-500">Rating distribution visualization</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search feedback by comment, partner, or customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                />
              </div>
              
              {/* Partner Filter */}
              <div className="w-full lg:w-64">
                <select
                  value={partnerFilter}
                  onChange={(e) => setPartnerFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm appearance-none"
                >
                  {partners.map(partner => (
                    <option key={partner.value} value={partner.value}>{partner.label}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Rating Filter */}
            <div className="flex gap-3 overflow-x-auto mt-6 pb-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setRatingFilter(null)}
                className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                  ratingFilter === null
                    ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Ratings
              </motion.button>
              
              {[5, 4, 3, 2, 1].map((rating) => (
                <motion.button
                  key={rating}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setRatingFilter(rating)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                    ratingFilter === rating
                      ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{rating}</span>
                  <Star className={`h-4 w-4 ${ratingFilter === rating ? 'text-white' : 'text-yellow-400 fill-current'}`} />
                </motion.button>
              ))}
            </div>
            
            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feedback List */}
        <motion.div variants={itemVariants}>
          <div className="space-y-4">
            {filteredFeedback.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-gradient-to-br ${
                  item.isPositive 
                    ? 'from-green-50 to-emerald-50 border-green-100' 
                    : 'from-orange-50 to-red-50 border-orange-100'
                } rounded-2xl p-6 border shadow-lg hover:shadow-xl transition-all`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Feedback Info */}
                  <div className="flex-1">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl ${
                        item.isPositive 
                          ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
                          : 'bg-gradient-to-br from-orange-500 to-red-500'
                      } shadow-lg`}>
                        {item.isPositive 
                          ? <ThumbsUp className="h-6 w-6 text-white" />
                          : <ThumbsDown className="h-6 w-6 text-white" />
                        }
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-bold text-gray-900">{item.partnerName}</h3>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        {item.comment && (
                          <p className="text-sm text-gray-600 italic">"{item.comment}"</p>
                        )}
                        {item.categories && item.categories.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {item.categories.map((category, i) => (
                              <span key={i} className={`px-2 py-1 text-xs rounded-lg ${
                                item.isPositive 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-orange-100 text-orange-700'
                              }`}>
                                {category}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                          <div className="flex items-center space-x-1">
                            <Building2 className="h-3 w-3" />
                            <span>Table {item.tableNumber}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{new Date(item.timestamp).toLocaleString()}</span>
                          </div>
                          {item.customerName && (
                            <div className="flex items-center space-x-1">
                              <User className="h-3 w-3" />
                              <span>{item.customerName}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Order Info & Actions */}
                  <div className="flex flex-col space-y-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Order Total</p>
                      <p className="text-lg font-bold text-gray-900">₹{item.orderTotal}</p>
                      {item.tipAmount && (
                        <div className="flex items-center justify-end space-x-1 text-sm text-green-600">
                          <Heart className="h-3 w-3" />
                          <span>Tip: ₹{item.tipAmount}</span>
                        </div>
                      )}
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleExpandFeedback(item.id)}
                      className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors self-end"
                    >
                      {expandedFeedback === item.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </motion.button>
                  </div>
                </div>
                
                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedFeedback === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-white/50 overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Feedback Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Feedback ID:</span>
                              <span className="font-medium">{item.id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Partner ID:</span>
                              <span className="font-medium">{item.partnerId}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Table Number:</span>
                              <span className="font-medium">{item.tableNumber}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Date & Time:</span>
                              <span className="font-medium">{new Date(item.timestamp).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Order Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Order Total:</span>
                              <span className="font-medium">₹{item.orderTotal}</span>
                            </div>
                            {item.tipAmount && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Tip Amount:</span>
                                <span className="font-medium text-green-600">₹{item.tipAmount}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-gray-600">Tip Percentage:</span>
                              <span className="font-medium">
                                {item.tipAmount ? `${Math.round((item.tipAmount / item.orderTotal) * 100)}%` : 'N/A'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Rating:</span>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {filteredFeedback.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-12">
                <div className="text-gray-400 mb-4">
                  <MessageCircle className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No feedback found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AdminLayout>
  );
};

export default FeedbackOverview;

function QrCode(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h1" />
      <path d="M21 12v.01" />
      <path d="M12 21v-1" />
    </svg>
  );
}

function Settings(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function Thermometer(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
    </svg>
  );
}