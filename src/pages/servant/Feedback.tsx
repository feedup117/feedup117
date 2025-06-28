import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  MessageCircle, 
  User,
  Calendar,
  Clock,
  Filter,
  Search,
  ArrowUpDown,
  ThumbsUp,
  ThumbsDown,
  Heart,
  Coffee,
  UtensilsCrossed,
  RefreshCw
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

interface CustomerFeedback {
  id: string;
  tableNumber: number;
  customerName?: string;
  rating: number;
  comment?: string;
  date: string;
  time: string;
  orderTotal: number;
  tipAmount?: number;
  categories?: string[];
  isPositive: boolean;
}

const ServantFeedback = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');

  const feedbacks: CustomerFeedback[] = [
    {
      id: 'FB001',
      tableNumber: 5,
      customerName: 'Rajesh Kumar',
      rating: 5,
      comment: 'Excellent service! The waiter was very attentive and friendly. Food was served quickly and was delicious.',
      date: '2025-01-10',
      time: '14:30',
      orderTotal: 720,
      tipAmount: 100,
      categories: ['Service', 'Food Quality'],
      isPositive: true,
    },
    {
      id: 'FB002',
      tableNumber: 12,
      rating: 4,
      comment: 'Good experience overall. The food was great but took a bit longer than expected.',
      date: '2025-01-10',
      time: '13:15',
      orderTotal: 510,
      tipAmount: 50,
      categories: ['Food Quality', 'Speed'],
      isPositive: true,
    },
    {
      id: 'FB003',
      tableNumber: 8,
      customerName: 'Anita Gupta',
      rating: 3,
      comment: 'Average experience. The food was good but service was a bit slow.',
      date: '2025-01-09',
      time: '19:45',
      orderTotal: 560,
      categories: ['Service', 'Speed'],
      isPositive: false,
    },
    {
      id: 'FB004',
      tableNumber: 3,
      rating: 5,
      comment: 'Amazing service and delicious food! Will definitely come back.',
      date: '2025-01-09',
      time: '12:30',
      orderTotal: 350,
      tipAmount: 70,
      categories: ['Service', 'Food Quality'],
      isPositive: true,
    },
    {
      id: 'FB005',
      tableNumber: 7,
      customerName: 'Priya Sharma',
      rating: 2,
      comment: 'Disappointing experience. The food was cold and service was slow.',
      date: '2025-01-08',
      time: '20:15',
      orderTotal: 480,
      categories: ['Food Quality', 'Service', 'Temperature'],
      isPositive: false,
    },
  ];

  const getSortedFeedbacks = () => {
    let sorted = [...feedbacks];
    
    switch (sortOrder) {
      case 'newest':
        sorted = sorted.sort((a, b) => new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime());
        break;
      case 'oldest':
        sorted = sorted.sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime());
        break;
      case 'highest':
        sorted = sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        sorted = sorted.sort((a, b) => a.rating - b.rating);
        break;
    }
    
    return sorted;
  };

  const filteredFeedbacks = getSortedFeedbacks().filter(feedback => {
    const matchesSearch = 
      feedback.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.tableNumber.toString().includes(searchTerm);
    
    const matchesRating = ratingFilter === null || feedback.rating === ratingFilter;
    
    return matchesSearch && matchesRating;
  });

  const averageRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length;
  const positivePercentage = Math.round((feedbacks.filter(f => f.rating >= 4).length / feedbacks.length) * 100);

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
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Customer Feedback</h1>
              <p className="text-gray-600 text-sm lg:text-base">View feedback from your served tables</p>
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
        </motion.div>

        {/* Stats Cards - Mobile Optimized */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border border-white/50 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-lg shadow-lg">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
                  <div className="ml-2 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-white/50 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg shadow-lg">
                <ThumbsUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Positive Feedback</p>
                <p className="text-2xl font-bold text-gray-900">{positivePercentage}%</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-white/50 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-lg">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                <p className="text-2xl font-bold text-gray-900">{feedbacks.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 border border-white/50 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg shadow-lg">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Most Praised</p>
                <p className="text-lg font-bold text-gray-900">Service Quality</p>
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
                  placeholder="Search feedback..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                />
              </div>
              
              {/* Sort Dropdown */}
              <div className="flex-shrink-0">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as any)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm appearance-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                </select>
              </div>
            </div>
            
            {/* Rating Filter */}
            <div className="flex gap-2 overflow-x-auto mt-4 pb-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setRatingFilter(null)}
                className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all text-sm ${
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
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all text-sm ${
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
          </div>
        </motion.div>

        {/* Feedback List - Mobile Optimized */}
        <motion.div variants={itemVariants}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${ratingFilter}-${sortOrder}-${searchTerm}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {filteredFeedbacks.map((feedback, index) => (
                <motion.div
                  key={feedback.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2, scale: 1.01 }}
                  className={`bg-gradient-to-br ${
                    feedback.isPositive 
                      ? 'from-green-50 to-emerald-50 border-green-100' 
                      : 'from-orange-50 to-red-50 border-orange-100'
                  } rounded-xl p-4 lg:p-6 border shadow-lg hover:shadow-xl transition-all`}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 lg:p-3 rounded-xl shadow-lg ${
                          feedback.isPositive 
                            ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
                            : 'bg-gradient-to-br from-orange-500 to-red-500'
                        }`}>
                          {feedback.isPositive 
                            ? <ThumbsUp className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                            : <ThumbsDown className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                          }
                        </div>
                        <div>
                          <h3 className="text-lg lg:text-xl font-bold text-gray-900">Table {feedback.tableNumber}</h3>
                          {feedback.customerName && (
                            <p className="text-sm text-gray-600 flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {feedback.customerName}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
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
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(`${feedback.date}T${feedback.time}`).toLocaleDateString()} • {feedback.time}
                        </p>
                      </div>
                    </div>

                    {/* Feedback Comment */}
                    {feedback.comment && (
                      <div className="bg-white/70 p-3 rounded-lg">
                        <p className="text-sm text-gray-700 italic">
                          "{feedback.comment}"
                        </p>
                      </div>
                    )}

                    {/* Categories */}
                    {feedback.categories && feedback.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {feedback.categories.map((category, i) => (
                          <span key={i} className={`px-2 py-1 text-xs rounded-lg ${
                            feedback.isPositive 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-orange-100 text-orange-700'
                          }`}>
                            {category}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Order Details */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <UtensilsCrossed className="h-3 w-3" />
                          <span>Order: ₹{feedback.orderTotal}</span>
                        </div>
                        {feedback.tipAmount && (
                          <div className="flex items-center space-x-1 text-green-600">
                            <Heart className="h-3 w-3" />
                            <span>Tip: ₹{feedback.tipAmount}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredFeedbacks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-xl border border-white/20 p-8">
                <div className="text-gray-400 mb-4">
                  <MessageCircle className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No feedback found</h3>
                <p className="text-gray-600 text-sm">
                  {searchTerm 
                    ? 'Try adjusting your search criteria' 
                    : ratingFilter 
                      ? `No ${ratingFilter}-star feedback available` 
                      : 'No feedback has been received yet'}
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
              <span>Refresh Feedback</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Add bottom padding for mobile sticky button */}
        <div className="lg:hidden h-20"></div>
      </motion.div>
    </DashboardLayout>
  );
};

export default ServantFeedback;