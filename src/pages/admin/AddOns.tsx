import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Puzzle as PuzzlePiece, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Download, 
  Calendar, 
  Clock, 
  Building2, 
  IndianRupee, 
  CheckCircle, 
  XCircle, 
  ChevronDown, 
  ChevronUp, 
  Save, 
  X, 
  AlertTriangle, 
  Smartphone, 
  Globe, 
  Headphones, 
  Paintbrush, 
  QrCode, 
  RefreshCw, 
  Zap, 
  CreditCard 
} from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  billingCycle: 'monthly' | 'yearly' | 'one-time';
  category: 'branding' | 'integration' | 'support' | 'feature';
  status: 'active' | 'disabled';
  partnersUsing: number;
  createdAt: string;
  updatedAt: string;
  isExpanded?: boolean;
}

interface AddOnPurchase {
  id: string;
  addOnId: string;
  addOnName: string;
  partnerId: string;
  partnerName: string;
  purchaseDate: string;
  expiryDate: string | null;
  status: 'active' | 'expired' | 'cancelled';
  price: number;
  autoRenew: boolean;
}

const AddOns = () => {
  const [activeTab, setActiveTab] = useState<'addons' | 'purchases'>('addons');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAddOn, setSelectedAddOn] = useState<AddOn | null>(null);
  const [expandedAddOn, setExpandedAddOn] = useState<string | null>(null);

  const addOns: AddOn[] = [
    {
      id: 'AO001',
      name: 'Branded QR Boards',
      description: 'Custom-designed QR code boards with restaurant branding',
      price: 499,
      billingCycle: 'monthly',
      category: 'branding',
      status: 'active',
      partnersUsing: 45,
      createdAt: '2024-12-01',
      updatedAt: '2025-01-05',
    },
    {
      id: 'AO002',
      name: 'WhatsApp Menu Sharing',
      description: 'Enable customers to share menu via WhatsApp',
      price: 299,
      billingCycle: 'monthly',
      category: 'integration',
      status: 'active',
      partnersUsing: 32,
      createdAt: '2024-12-01',
      updatedAt: '2024-12-15',
    },
    {
      id: 'AO003',
      name: 'Dedicated Support',
      description: 'Priority support with dedicated account manager',
      price: 999,
      billingCycle: 'monthly',
      category: 'support',
      status: 'active',
      partnersUsing: 18,
      createdAt: '2024-12-01',
      updatedAt: '2024-12-10',
    },
    {
      id: 'AO004',
      name: 'Custom Domain',
      description: 'Use your own domain for customer-facing pages',
      price: 799,
      billingCycle: 'monthly',
      category: 'branding',
      status: 'active',
      partnersUsing: 27,
      createdAt: '2024-12-15',
      updatedAt: '2025-01-10',
    },
    {
      id: 'AO005',
      name: 'Advanced Analytics',
      description: 'Detailed customer behavior and sales analytics',
      price: 599,
      billingCycle: 'monthly',
      category: 'feature',
      status: 'disabled',
      partnersUsing: 0,
      createdAt: '2025-01-01',
      updatedAt: '2025-01-01',
    },
  ];

  const addOnPurchases: AddOnPurchase[] = [
    {
      id: 'PUR001',
      addOnId: 'AO001',
      addOnName: 'Branded QR Boards',
      partnerId: 'P001',
      partnerName: 'Spice Garden',
      purchaseDate: '2025-01-05',
      expiryDate: '2026-01-05',
      status: 'active',
      price: 499,
      autoRenew: true,
    },
    {
      id: 'PUR002',
      addOnId: 'AO002',
      addOnName: 'WhatsApp Menu Sharing',
      partnerId: 'P001',
      partnerName: 'Spice Garden',
      purchaseDate: '2025-01-05',
      expiryDate: '2026-01-05',
      status: 'active',
      price: 299,
      autoRenew: true,
    },
    {
      id: 'PUR003',
      addOnId: 'AO003',
      addOnName: 'Dedicated Support',
      partnerId: 'P002',
      partnerName: 'Pizza Paradise',
      purchaseDate: '2024-12-15',
      expiryDate: '2025-12-15',
      status: 'active',
      price: 999,
      autoRenew: true,
    },
    {
      id: 'PUR004',
      addOnId: 'AO004',
      addOnName: 'Custom Domain',
      partnerId: 'P002',
      partnerName: 'Pizza Paradise',
      purchaseDate: '2024-12-15',
      expiryDate: '2025-12-15',
      status: 'active',
      price: 799,
      autoRenew: true,
    },
    {
      id: 'PUR005',
      addOnId: 'AO001',
      addOnName: 'Branded QR Boards',
      partnerId: 'P003',
      partnerName: 'Burger Barn',
      purchaseDate: '2025-01-10',
      expiryDate: '2025-02-10',
      status: 'active',
      price: 499,
      autoRenew: false,
    },
    {
      id: 'PUR006',
      addOnId: 'AO002',
      addOnName: 'WhatsApp Menu Sharing',
      partnerId: 'P004',
      partnerName: 'Cafe Connect',
      purchaseDate: '2024-11-15',
      expiryDate: '2024-12-15',
      status: 'expired',
      price: 299,
      autoRenew: false,
    },
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'branding', label: 'Branding' },
    { value: 'integration', label: 'Integrations' },
    { value: 'support', label: 'Support' },
    { value: 'feature', label: 'Features' },
  ];

  const statuses = [
    { value: 'all', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'disabled', label: 'Disabled' },
  ];

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case 'branding':
        return {
          color: 'bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-800 border-primary-200',
          icon: Paintbrush,
        };
      case 'integration':
        return {
          color: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200',
          icon: Smartphone,
        };
      case 'support':
        return {
          color: 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border-purple-200',
          icon: Headphones,
        };
      case 'feature':
        return {
          color: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200',
          icon: Zap,
        };
      default:
        return {
          color: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200',
          icon: PuzzlePiece,
        };
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return {
          color: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200',
          icon: CheckCircle,
          iconColor: 'text-green-500',
        };
      case 'disabled':
      case 'expired':
      case 'cancelled':
        return {
          color: 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-200',
          icon: XCircle,
          iconColor: 'text-red-500',
        };
      default:
        return {
          color: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200',
          icon: AlertTriangle,
          iconColor: 'text-gray-500',
        };
    }
  };

  const getBillingCycleConfig = (cycle: string) => {
    switch (cycle) {
      case 'monthly':
        return {
          label: 'Monthly',
          color: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200',
        };
      case 'yearly':
        return {
          label: 'Yearly',
          color: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200',
        };
      case 'one-time':
        return {
          label: 'One-time',
          color: 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border-purple-200',
        };
      default:
        return {
          label: 'Unknown',
          color: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200',
        };
    }
  };

  const toggleExpandAddOn = (id: string) => {
    if (expandedAddOn === id) {
      setExpandedAddOn(null);
    } else {
      setExpandedAddOn(id);
    }
  };

  const handleEditAddOn = (addOn: AddOn) => {
    setSelectedAddOn(addOn);
    setShowEditModal(true);
  };

  const handleDeleteAddOn = (addOn: AddOn) => {
    setSelectedAddOn(addOn);
    setShowDeleteModal(true);
  };

  const exportData = () => {
    // In a real app, this would generate and download a CSV file
    alert(`Exporting ${activeTab} data to CSV...`);
  };

  const getFilteredAddOns = () => {
    return addOns.filter(addOn => {
      const matchesSearch = 
        addOn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        addOn.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        addOn.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || addOn.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || addOn.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  };

  const getFilteredPurchases = () => {
    return addOnPurchases.filter(purchase => {
      const matchesSearch = 
        purchase.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        purchase.addOnName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        purchase.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || purchase.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  };

  const filteredAddOns = getFilteredAddOns();
  const filteredPurchases = getFilteredPurchases();

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add-ons & Services</h1>
            <p className="text-gray-600">Manage additional services and features for partners</p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportData}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl hover:from-secondary-600 hover:to-secondary-700 transition-all shadow-lg"
            >
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </motion.button>
            {activeTab === 'addons' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddModal(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
              >
                <Plus className="h-5 w-5" />
                <span>Add New Add-on</span>
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants}>
          <div className="flex space-x-2 bg-white rounded-xl p-1 shadow-lg border border-gray-200 w-fit">
            <button
              onClick={() => setActiveTab('addons')}
              className={`px-6 py-3 rounded-lg transition-all text-sm font-medium ${
                activeTab === 'addons' 
                  ? 'bg-primary-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Add-ons
            </button>
            <button
              onClick={() => setActiveTab('purchases')}
              className={`px-6 py-3 rounded-lg transition-all text-sm font-medium ${
                activeTab === 'purchases' 
                  ? 'bg-primary-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Purchases
            </button>
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
                  placeholder={activeTab === 'addons' ? "Search add-ons..." : "Search purchases..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                />
              </div>
              
              {/* Category Filter - Only for Add-ons tab */}
              {activeTab === 'addons' && (
                <div className="w-full lg:w-64">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm appearance-none"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>{category.label}</option>
                    ))}
                  </select>
                </div>
              )}
              
              {/* Status Filter */}
              <div className="w-full lg:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm appearance-none"
                >
                  {statuses.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Add-ons List */}
        {activeTab === 'addons' && (
          <motion.div variants={itemVariants}>
            <div className="space-y-4">
              {filteredAddOns.map((addOn, index) => {
                const categoryConfig = getCategoryConfig(addOn.category);
                const statusConfig = getStatusConfig(addOn.status);
                const billingCycleConfig = getBillingCycleConfig(addOn.billingCycle);
                const CategoryIcon = categoryConfig.icon;
                const isExpanded = expandedAddOn === addOn.id;
                
                return (
                  <motion.div
                    key={addOn.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* Add-on Info */}
                      <div className="flex-1">
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-xl ${categoryConfig.color}`}>
                            <CategoryIcon className="h-6 w-6" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-3">
                              <h3 className="text-lg font-bold text-gray-900">{addOn.name}</h3>
                              <span className={`px-3 py-1 text-xs font-medium rounded-full ${categoryConfig.color}`}>
                                {addOn.category}
                              </span>
                              <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusConfig.color} flex items-center space-x-1`}>
                                <statusConfig.icon className={`h-3 w-3 ${statusConfig.iconColor}`} />
                                <span className="capitalize">{addOn.status}</span>
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{addOn.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <div className="flex items-center space-x-1">
                                <IndianRupee className="h-3 w-3" />
                                <span>₹{addOn.price}/{addOn.billingCycle === 'one-time' ? 'one-time' : addOn.billingCycle}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Building2 className="h-3 w-3" />
                                <span>{addOn.partnersUsing} partners using</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Price & Actions */}
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-primary-600">₹{addOn.price}</p>
                          <span className={`text-xs font-medium ${billingCycleConfig.color} px-2 py-1 rounded-full`}>
                            {billingCycleConfig.label}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleExpandAddOn(addOn.id)}
                            className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                          >
                            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEditAddOn(addOn)}
                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="h-5 w-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteAddOn(addOn)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </motion.button>
                        </div>
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
                          className="mt-4 pt-4 border-t border-gray-100 overflow-hidden"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Add-on Details</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">ID:</span>
                                  <span className="font-medium">{addOn.id}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Created:</span>
                                  <span className="font-medium">{new Date(addOn.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Last Updated:</span>
                                  <span className="font-medium">{new Date(addOn.updatedAt).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Pricing</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Price:</span>
                                  <span className="font-medium">₹{addOn.price}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Billing Cycle:</span>
                                  <span className="font-medium capitalize">{addOn.billingCycle}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Annual Revenue:</span>
                                  <span className="font-medium">
                                    ₹{addOn.billingCycle === 'monthly' 
                                      ? addOn.price * 12 * addOn.partnersUsing 
                                      : addOn.billingCycle === 'yearly' 
                                        ? addOn.price * addOn.partnersUsing 
                                        : 'N/A'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Usage</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Partners Using:</span>
                                  <span className="font-medium">{addOn.partnersUsing}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Status:</span>
                                  <span className={`font-medium ${addOn.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                                    {addOn.status === 'active' ? 'Active' : 'Disabled'}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Category:</span>
                                  <span className="font-medium capitalize">{addOn.category}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex justify-end space-x-3 mt-6">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleEditAddOn(addOn)}
                              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg text-sm font-medium"
                            >
                              Edit Add-on
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg text-sm font-medium"
                            >
                              View Partners Using
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {filteredAddOns.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-12">
                  <div className="text-gray-400 mb-4">
                    <PuzzlePiece className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No add-ons found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddModal(true)}
                    className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
                  >
                    Add Your First Add-on
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Purchases List */}
        {activeTab === 'purchases' && (
          <motion.div variants={itemVariants}>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-6 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-600">
                <div className="col-span-3">Partner</div>
                <div className="col-span-3">Add-on</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Purchase Date</div>
                <div className="col-span-2 text-right">Price</div>
              </div>
              
              {/* Table Body */}
              <div className="divide-y divide-gray-100">
                <AnimatePresence>
                  {filteredPurchases.map((purchase) => {
                    const statusConfig = getStatusConfig(purchase.status);
                    
                    return (
                      <motion.div
                        key={purchase.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        {/* Main Row */}
                        <div className="grid grid-cols-12 gap-4 p-6 items-center">
                          <div className="col-span-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg">
                                <span className="text-white text-sm font-bold">{purchase.partnerName.charAt(0)}{purchase.partnerName.split(' ')[1]?.charAt(0) || ''}</span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{purchase.partnerName}</p>
                                <p className="text-xs text-gray-500">{purchase.partnerId}</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-3">
                            <p className="font-medium text-gray-900">{purchase.addOnName}</p>
                            <p className="text-xs text-gray-500">{purchase.addOnId}</p>
                          </div>
                          <div className="col-span-2">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusConfig.color} flex items-center space-x-1 w-fit`}>
                              <statusConfig.icon className={`h-3 w-3 ${statusConfig.iconColor}`} />
                              <span className="capitalize">{purchase.status}</span>
                            </span>
                          </div>
                          <div className="col-span-2">
                            <p className="font-medium text-gray-900">{new Date(purchase.purchaseDate).toLocaleDateString()}</p>
                            {purchase.expiryDate && (
                              <p className="text-xs text-gray-500">
                                Expires: {new Date(purchase.expiryDate).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          <div className="col-span-2 text-right">
                            <p className="font-bold text-gray-900">₹{purchase.price}</p>
                            <p className="text-xs text-gray-500">
                              {purchase.autoRenew ? 'Auto-renews' : 'No auto-renewal'}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {filteredPurchases.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-12">
                  <div className="text-gray-400 mb-4">
                    <CreditCard className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No purchases found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Add Add-on Modal */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowAddModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl border border-white/20 p-8 max-w-md w-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
                      <Plus className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Add New Add-on</h2>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowAddModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Add-on Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Custom QR Codes"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      placeholder="Describe what this add-on provides"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 resize-none"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                      <input
                        type="number"
                        placeholder="e.g., 499"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Billing Cycle</label>
                      <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 appearance-none">
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                        <option value="one-time">One-time</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 appearance-none">
                      <option value="branding">Branding</option>
                      <option value="integration">Integration</option>
                      <option value="support">Support</option>
                      <option value="feature">Feature</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="activeStatus"
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                      defaultChecked
                    />
                    <label htmlFor="activeStatus" className="ml-2 text-sm text-gray-700">
                      Add-on active and available for purchase
                    </label>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
                  >
                    <Save className="h-4 w-4 mr-2 inline-block" />
                    Create Add-on
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Add-on Modal */}
        <AnimatePresence>
          {showEditModal && selectedAddOn && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowEditModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl border border-white/20 p-8 max-w-md w-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                      <Edit className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Edit Add-on</h2>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowEditModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Add-on Name</label>
                    <input
                      type="text"
                      defaultValue={selectedAddOn.name}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      defaultValue={selectedAddOn.description}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 resize-none"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                      <input
                        type="number"
                        defaultValue={selectedAddOn.price}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Billing Cycle</label>
                      <select 
                        defaultValue={selectedAddOn.billingCycle}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 appearance-none"
                      >
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                        <option value="one-time">One-time</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select 
                      defaultValue={selectedAddOn.category}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 appearance-none"
                    >
                      <option value="branding">Branding</option>
                      <option value="integration">Integration</option>
                      <option value="support">Support</option>
                      <option value="feature">Feature</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="editActiveStatus"
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                      defaultChecked={selectedAddOn.status === 'active'}
                    />
                    <label htmlFor="editActiveStatus" className="ml-2 text-sm text-gray-700">
                      Add-on active and available for purchase
                    </label>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
                  >
                    <Save className="h-4 w-4 mr-2 inline-block" />
                    Update Add-on
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Add-on Modal */}
        <AnimatePresence>
          {showDeleteModal && selectedAddOn && (
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
                    Delete Add-on
                  </h2>
                  <p className="text-gray-600">Are you sure you want to delete the "{selectedAddOn.name}" add-on? This action cannot be undone.</p>
                </div>

                <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-200">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-800">Warning: Active Subscriptions</p>
                      <p className="text-sm text-red-700">This add-on is currently being used by {selectedAddOn.partnersUsing} partners. Deleting it will remove access for all these partners.</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg hover:from-red-600 hover:to-rose-600 transition-all shadow-lg"
                  >
                    <Trash2 className="h-4 w-4 mr-2 inline-block" />
                    Delete Add-on
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

export default AddOns;