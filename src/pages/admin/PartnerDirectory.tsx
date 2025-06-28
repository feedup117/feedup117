import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Search, 
  Filter, 
  Eye,
  Edit,
  Trash2,
  Ban,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Crown,
  ChevronDown,
  ChevronUp,
  Download,
  Plus,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import IndianRupee from '../../components/icons/IndianRupee';

interface Partner {
  id: string;
  name: string;
  owner: string;
  email: string;
  phone: string;
  location: string;
  plan: 'Starter' | 'Business' | 'Premium' | 'Enterprise';
  status: 'active' | 'trial' | 'suspended' | 'expired';
  branches: number;
  joinDate: string;
  expiryDate: string;
  revenue: number;
  ordersProcessed: number;
  staffCount: number;
}

const PartnerDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [planFilter, setPlanFilter] = useState<string>('all');
  const [expandedPartner, setExpandedPartner] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);

  const partners: Partner[] = [
    {
      id: 'P001',
      name: 'Spice Garden',
      owner: 'Rajesh Singh',
      email: 'rajesh@spicegarden.com',
      phone: '+91 98765 43210',
      location: 'Mumbai, India',
      plan: 'Business',
      status: 'active',
      branches: 2,
      joinDate: '2024-12-01',
      expiryDate: '2025-12-01',
      revenue: 124500,
      ordersProcessed: 1245,
      staffCount: 15,
    },
    {
      id: 'P002',
      name: 'Pizza Paradise',
      owner: 'Anita Gupta',
      email: 'anita@pizzaparadise.com',
      phone: '+91 98765 43211',
      location: 'Delhi, India',
      plan: 'Premium',
      status: 'active',
      branches: 3,
      joinDate: '2024-11-15',
      expiryDate: '2025-11-15',
      revenue: 183200,
      ordersProcessed: 1832,
      staffCount: 24,
    },
    {
      id: 'P003',
      name: 'Burger Barn',
      owner: 'Vikram Patel',
      email: 'vikram@burgerbarn.com',
      phone: '+91 98765 43212',
      location: 'Bangalore, India',
      plan: 'Starter',
      status: 'trial',
      branches: 1,
      joinDate: '2025-01-01',
      expiryDate: '2025-01-15',
      revenue: 56400,
      ordersProcessed: 564,
      staffCount: 8,
    },
    {
      id: 'P004',
      name: 'Cafe Connect',
      owner: 'Priya Sharma',
      email: 'priya@cafeconnect.com',
      phone: '+91 98765 43213',
      location: 'Chennai, India',
      plan: 'Business',
      status: 'active',
      branches: 2,
      joinDate: '2024-10-15',
      expiryDate: '2025-10-15',
      revenue: 98700,
      ordersProcessed: 987,
      staffCount: 12,
    },
    {
      id: 'P005',
      name: 'Dosa Delight',
      owner: 'Karthik Raman',
      email: 'karthik@dosadelight.com',
      phone: '+91 98765 43214',
      location: 'Hyderabad, India',
      plan: 'Starter',
      status: 'expired',
      branches: 1,
      joinDate: '2024-09-01',
      expiryDate: '2025-01-01',
      revenue: 45600,
      ordersProcessed: 456,
      staffCount: 6,
    },
    {
      id: 'P006',
      name: 'Noodle Nation',
      owner: 'Li Wei',
      email: 'wei@noodlenation.com',
      phone: '+91 98765 43215',
      location: 'Pune, India',
      plan: 'Enterprise',
      status: 'active',
      branches: 5,
      joinDate: '2024-08-15',
      expiryDate: '2025-08-15',
      revenue: 256800,
      ordersProcessed: 2568,
      staffCount: 35,
    },
    {
      id: 'P007',
      name: 'Taco Town',
      owner: 'Miguel Rodriguez',
      email: 'miguel@tacotown.com',
      phone: '+91 98765 43216',
      location: 'Goa, India',
      plan: 'Business',
      status: 'suspended',
      branches: 1,
      joinDate: '2024-07-01',
      expiryDate: '2025-07-01',
      revenue: 78900,
      ordersProcessed: 789,
      staffCount: 10,
    },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Partners', count: partners.length },
    { value: 'active', label: 'Active', count: partners.filter(p => p.status === 'active').length },
    { value: 'trial', label: 'Trial', count: partners.filter(p => p.status === 'trial').length },
    { value: 'suspended', label: 'Suspended', count: partners.filter(p => p.status === 'suspended').length },
    { value: 'expired', label: 'Expired', count: partners.filter(p => p.status === 'expired').length },
  ];

  const planOptions = [
    { value: 'all', label: 'All Plans' },
    { value: 'Starter', label: 'Starter' },
    { value: 'Business', label: 'Business' },
    { value: 'Premium', label: 'Premium' },
    { value: 'Enterprise', label: 'Enterprise' },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return {
          color: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200',
          icon: CheckCircle,
          iconColor: 'text-green-500',
        };
      case 'trial':
        return {
          color: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200',
          icon: Clock,
          iconColor: 'text-blue-500',
        };
      case 'suspended':
        return {
          color: 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-200',
          icon: Ban,
          iconColor: 'text-red-500',
        };
      case 'expired':
        return {
          color: 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-orange-200',
          icon: XCircle,
          iconColor: 'text-orange-500',
        };
      default:
        return {
          color: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200',
          icon: AlertTriangle,
          iconColor: 'text-gray-500',
        };
    }
  };

  const getPlanConfig = (plan: string) => {
    switch (plan) {
      case 'Starter':
        return {
          color: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200',
          icon: Building2,
        };
      case 'Business':
        return {
          color: 'bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-800 border-primary-200',
          icon: Building2,
        };
      case 'Premium':
        return {
          color: 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border-purple-200',
          icon: Crown,
        };
      case 'Enterprise':
        return {
          color: 'bg-gradient-to-r from-gray-700 to-gray-900 text-white border-gray-600',
          icon: Crown,
        };
      default:
        return {
          color: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200',
          icon: Building2,
        };
    }
  };

  const toggleExpandPartner = (id: string) => {
    if (expandedPartner === id) {
      setExpandedPartner(null);
    } else {
      setExpandedPartner(id);
    }
  };

  const handleSuspendPartner = (id: string) => {
    setSelectedPartnerId(id);
    setShowSuspendModal(true);
  };

  const handleDeletePartner = (id: string) => {
    setSelectedPartnerId(id);
    setShowDeleteModal(true);
  };

  const confirmSuspend = () => {
    // In a real app, this would call an API to suspend the partner
    console.log(`Suspending partner ${selectedPartnerId}`);
    setShowSuspendModal(false);
    setSelectedPartnerId(null);
  };

  const confirmDelete = () => {
    // In a real app, this would call an API to delete the partner
    console.log(`Deleting partner ${selectedPartnerId}`);
    setShowDeleteModal(false);
    setSelectedPartnerId(null);
  };

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = 
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || partner.status === statusFilter;
    const matchesPlan = planFilter === 'all' || partner.plan === planFilter;
    
    return matchesSearch && matchesStatus && matchesPlan;
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Partner Directory</h1>
            <p className="text-gray-600">Manage all restaurant partners on the FeedUP platform</p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl hover:from-secondary-600 hover:to-secondary-700 transition-all shadow-lg"
            >
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
            >
              <Plus className="h-5 w-5" />
              <span>Add New Partner</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {statusOptions.slice(1).map((option, index) => (
            <motion.div
              key={option.value}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`relative overflow-hidden rounded-2xl ${
                option.value === 'active' ? 'bg-gradient-to-br from-green-50 to-emerald-50' :
                option.value === 'trial' ? 'bg-gradient-to-br from-blue-50 to-cyan-50' :
                option.value === 'suspended' ? 'bg-gradient-to-br from-red-50 to-rose-50' :
                'bg-gradient-to-br from-orange-50 to-amber-50'
              } p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all cursor-pointer`}
              onClick={() => setStatusFilter(option.value)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  option.value === 'active' ? 'bg-gradient-to-br from-green-500 to-emerald-500' :
                  option.value === 'trial' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' :
                  option.value === 'suspended' ? 'bg-gradient-to-br from-red-500 to-rose-500' :
                  'bg-gradient-to-br from-orange-500 to-amber-500'
                } shadow-lg`}>
                  {option.value === 'active' && <CheckCircle className="h-6 w-6 text-white" />}
                  {option.value === 'trial' && <Clock className="h-6 w-6 text-white" />}
                  {option.value === 'suspended' && <Ban className="h-6 w-6 text-white" />}
                  {option.value === 'expired' && <XCircle className="h-6 w-6 text-white" />}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{option.label} Partners</p>
                <p className="text-3xl font-bold text-gray-900">{option.count}</p>
              </div>
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
                  placeholder="Search by partner name, owner, email, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                />
              </div>
              
              {/* Plan Filter */}
              <div className="w-full lg:w-64">
                <select
                  value={planFilter}
                  onChange={(e) => setPlanFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm appearance-none"
                >
                  {planOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
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
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
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

        {/* Partners List */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-6 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-600">
              <div className="col-span-4">Partner</div>
              <div className="col-span-2">Plan</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Branches</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            
            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              <AnimatePresence>
                {filteredPartners.map((partner) => {
                  const statusConfig = getStatusConfig(partner.status);
                  const planConfig = getPlanConfig(partner.plan);
                  const isExpanded = expandedPartner === partner.id;
                  
                  return (
                    <motion.div
                      key={partner.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* Main Row */}
                      <div className="grid grid-cols-12 gap-4 p-6 items-center">
                        <div className="col-span-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg">
                              <span className="text-white text-sm font-bold">{partner.name.charAt(0)}{partner.name.split(' ')[1]?.charAt(0) || ''}</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{partner.name}</p>
                              <p className="text-sm text-gray-500">{partner.owner}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${planConfig.color}`}>
                            {partner.plan}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusConfig.color} flex items-center space-x-1 w-fit`}>
                            <statusConfig.icon className={`h-3 w-3 ${statusConfig.iconColor}`} />
                            <span className="capitalize">{partner.status}</span>
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span className="font-medium text-gray-900">{partner.branches}</span>
                        </div>
                        <div className="col-span-2 flex items-center justify-end space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleExpandPartner(partner.id)}
                            className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                          >
                            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleSuspendPartner(partner.id)}
                            className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                          >
                            <Ban className="h-4 w-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeletePartner(partner.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </div>
                      
                      {/* Expanded Details */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gray-50 px-6 pb-6 overflow-hidden"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {/* Contact Information */}
                              <div className="space-y-3">
                                <h4 className="font-medium text-gray-900">Contact Information</h4>
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2 text-sm">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    <span className="text-gray-700">{partner.email}</span>
                                  </div>
                                  <div className="flex items-center space-x-2 text-sm">
                                    <Phone className="h-4 w-4 text-gray-500" />
                                    <span className="text-gray-700">{partner.phone}</span>
                                  </div>
                                  <div className="flex items-center space-x-2 text-sm">
                                    <MapPin className="h-4 w-4 text-gray-500" />
                                    <span className="text-gray-700">{partner.location}</span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Subscription Details */}
                              <div className="space-y-3">
                                <h4 className="font-medium text-gray-900">Subscription Details</h4>
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2 text-sm">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <span className="text-gray-700">Joined: {new Date(partner.joinDate).toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center space-x-2 text-sm">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <span className="text-gray-700">Expires: {new Date(partner.expiryDate).toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex items-center space-x-2 text-sm">
                                    <Crown className="h-4 w-4 text-gray-500" />
                                    <span className="text-gray-700">Plan: {partner.plan}</span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Usage Statistics */}
                              <div className="space-y-3">
                                <h4 className="font-medium text-gray-900">Usage Statistics</h4>
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2 text-sm">
                                    <IndianRupee className="h-4 w-4 text-gray-500" />
                                    <span className="text-gray-700">Revenue: ₹{partner.revenue.toLocaleString()}</span>
                                  </div>
                                  <div className="flex items-center space-x-2 text-sm">
                                    <ShoppingBag className="h-4 w-4 text-gray-500" />
                                    <span className="text-gray-700">Orders: {partner.ordersProcessed.toLocaleString()}</span>
                                  </div>
                                  <div className="flex items-center space-x-2 text-sm">
                                    <User className="h-4 w-4 text-gray-500" />
                                    <span className="text-gray-700">Staff: {partner.staffCount}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-3 mt-6">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg text-sm font-medium"
                              >
                                View Dashboard
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg text-sm font-medium"
                              >
                                Edit Details
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg hover:from-secondary-600 hover:to-secondary-700 transition-all shadow-lg text-sm font-medium"
                              >
                                Change Plan
                              </motion.button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Suspend Modal */}
        <AnimatePresence>
          {showSuspendModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowSuspendModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl border border-white/20 p-8 max-w-md w-full"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg mb-4">
                    <Ban className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Suspend Partner
                  </h2>
                  <p className="text-gray-600">Are you sure you want to suspend this partner? They will lose access to the platform until reactivated.</p>
                </div>

                <div className="bg-orange-50 rounded-xl p-4 mb-6 border border-orange-200">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-orange-800">Important Notice</p>
                      <p className="text-sm text-orange-700">Suspending a partner will immediately halt their operations. All customer-facing QR codes will stop working.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={confirmSuspend}
                    className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Yes, Suspend Partner
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowSuspendModal(false)}
                    className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Modal */}
        <AnimatePresence>
          {showDeleteModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowDeleteModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl border border-white/20 p-8 max-w-md w-full"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex p-4 bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl shadow-lg mb-4">
                    <Trash2 className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Delete Partner
                  </h2>
                  <p className="text-gray-600">Are you sure you want to permanently delete this partner? This action cannot be undone.</p>
                </div>

                <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-200">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-800">Warning: Permanent Action</p>
                      <p className="text-sm text-red-700">All partner data, including orders, customers, and analytics will be permanently deleted.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={confirmDelete}
                    className="w-full py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Yes, Delete Permanently
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowDeleteModal(false)}
                    className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AdminLayout>
  );
};

export default PartnerDirectory;

function ShoppingBag(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}