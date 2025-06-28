import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter,
  Download,
  Phone,
  Mail,
  Calendar,
  Star,
  ShoppingBag,
  TrendingUp,
  Heart,
  Gift,
  MessageCircle,
  Eye,
  Edit,
  UserPlus,
  MapPin,
  Clock,
  IndianRupee
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  totalVisits: number;
  totalSpent: number;
  lastVisit: string;
  averageOrderValue: number;
  favoriteItems: string[];
  rating: number;
  status: 'regular' | 'vip' | 'new';
  joinDate: string;
  birthday?: string;
  preferences: string[];
}

const CRM = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const statusOptions = [
    { value: 'all', label: 'All Customers', count: 156, color: 'from-gray-500 to-gray-600' },
    { value: 'vip', label: 'VIP Customers', count: 23, color: 'from-purple-500 to-violet-500' },
    { value: 'regular', label: 'Regular', count: 89, color: 'from-blue-500 to-cyan-500' },
    { value: 'new', label: 'New Customers', count: 44, color: 'from-green-500 to-emerald-500' },
  ];

  const customers: Customer[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh.kumar@email.com',
      totalVisits: 24,
      totalSpent: 15680,
      lastVisit: '2 days ago',
      averageOrderValue: 653,
      favoriteItems: ['Chicken Biryani', 'Tandoori Chicken'],
      rating: 4.8,
      status: 'vip',
      joinDate: '2023-06-15',
      birthday: '1985-03-20',
      preferences: ['Spicy Food', 'Non-Veg'],
    },
    {
      id: '2',
      name: 'Priya Sharma',
      phone: '+91 98765 43211',
      email: 'priya.sharma@email.com',
      totalVisits: 12,
      totalSpent: 7240,
      lastVisit: '1 week ago',
      averageOrderValue: 603,
      favoriteItems: ['Paneer Butter Masala', 'Garlic Naan'],
      rating: 4.6,
      status: 'regular',
      joinDate: '2023-08-22',
      preferences: ['Vegetarian', 'Medium Spice'],
    },
    {
      id: '3',
      name: 'Amit Singh',
      phone: '+91 98765 43212',
      totalVisits: 3,
      totalSpent: 1890,
      lastVisit: '3 days ago',
      averageOrderValue: 630,
      favoriteItems: ['Mutton Biryani'],
      rating: 4.5,
      status: 'new',
      joinDate: '2024-12-01',
      preferences: ['Non-Veg', 'Extra Spicy'],
    },
    {
      id: '4',
      name: 'Anita Gupta',
      phone: '+91 98765 43213',
      email: 'anita.gupta@email.com',
      totalVisits: 18,
      totalSpent: 9450,
      lastVisit: '5 days ago',
      averageOrderValue: 525,
      favoriteItems: ['Dal Tadka', 'Jeera Rice', 'Gulab Jamun'],
      rating: 4.7,
      status: 'regular',
      joinDate: '2023-09-10',
      birthday: '1990-07-15',
      preferences: ['Vegetarian', 'Sweet Tooth'],
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'vip':
        return {
          color: 'text-purple-600',
          bg: 'bg-purple-100',
          gradient: 'from-purple-500 to-violet-500',
          icon: '👑',
        };
      case 'regular':
        return {
          color: 'text-blue-600',
          bg: 'bg-blue-100',
          gradient: 'from-blue-500 to-cyan-500',
          icon: '⭐',
        };
      case 'new':
        return {
          color: 'text-green-600',
          bg: 'bg-green-100',
          gradient: 'from-green-500 to-emerald-500',
          icon: '🆕',
        };
      default:
        return {
          color: 'text-gray-600',
          bg: 'bg-gray-100',
          gradient: 'from-gray-500 to-gray-600',
          icon: '👤',
        };
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm) ||
                         customer.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus;
    return matchesSearch && matchesStatus;
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Relationship Management</h1>
            <p className="text-gray-600">Manage customer data and build lasting relationships</p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl hover:from-secondary-600 hover:to-secondary-700 transition-all shadow-lg"
            >
              <Download className="h-4 w-4" />
              <span>Export Data</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
            >
              <UserPlus className="h-5 w-5" />
              <span>Add Customer</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {statusOptions.map((option, index) => (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => setSelectedStatus(option.value)}
              className={`cursor-pointer relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all ${
                selectedStatus === option.value ? 'ring-2 ring-primary-500 ring-offset-2' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${option.color} shadow-lg`}>
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{option.label}</p>
                <p className="text-3xl font-bold text-gray-900">{option.count}</p>
              </div>
              
              {selectedStatus === option.value && (
                <motion.div
                  layoutId="selectedStatus"
                  className="absolute inset-0 bg-primary-500/5 rounded-2xl"
                />
              )}
            </motion.div>
          ))}
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
                  placeholder="Search customers by name, phone, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Customer Grid */}
        <motion.div variants={itemVariants}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStatus + searchTerm}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCustomers.map((customer, index) => {
                const statusConfig = getStatusConfig(customer.status);
                return (
                  <motion.div
                    key={customer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden group"
                  >
                    {/* Header */}
                    <div className={`bg-gradient-to-r ${statusConfig.gradient} p-6 text-white relative overflow-hidden`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                          {statusConfig.icon}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            customer.status === 'vip' ? 'bg-yellow-100 text-yellow-800' :
                            customer.status === 'regular' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {customer.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold mb-1">{customer.name}</h3>
                        <div className="flex items-center space-x-2 text-sm opacity-90">
                          <Phone className="h-4 w-4" />
                          <span>{customer.phone}</span>
                        </div>
                      </div>

                      {/* Decorative element */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Contact Info */}
                      <div className="space-y-3 mb-6">
                        {customer.email && (
                          <div className="flex items-center space-x-3 text-sm text-gray-600">
                            <Mail className="h-4 w-4" />
                            <span>{customer.email}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>Last visit: {customer.lastVisit}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>Customer since {new Date(customer.joinDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                          <p className="text-2xl font-bold text-gray-900">{customer.totalVisits}</p>
                          <p className="text-xs text-gray-500">Total Visits</p>
                        </div>
                        <div className="text-center p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                          <p className="text-2xl font-bold text-green-600">₹{customer.totalSpent.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Total Spent</p>
                        </div>
                      </div>

                      {/* Rating & AOV */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-semibold text-gray-900">{customer.rating}</span>
                          <span className="text-sm text-gray-500">rating</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Avg Order</p>
                          <p className="font-bold text-gray-900">₹{customer.averageOrderValue}</p>
                        </div>
                      </div>

                      {/* Favorite Items */}
                      <div className="mb-6">
                        <p className="text-sm font-medium text-gray-700 mb-2">Favorite Items</p>
                        <div className="flex flex-wrap gap-2">
                          {customer.favoriteItems.slice(0, 2).map((item, i) => (
                            <span key={i} className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-lg">
                              {item}
                            </span>
                          ))}
                          {customer.favoriteItems.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                              +{customer.favoriteItems.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Preferences */}
                      <div className="mb-6">
                        <p className="text-sm font-medium text-gray-700 mb-2">Preferences</p>
                        <div className="flex flex-wrap gap-2">
                          {customer.preferences.map((pref, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                              {pref}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedCustomer(customer)}
                          className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center justify-center px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-all"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center justify-center px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-all"
                        >
                          <Edit className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filteredCustomers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-12">
                <div className="text-gray-400 mb-4">
                  <Users className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No customers found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or add new customers</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
                >
                  Add First Customer
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default CRM;