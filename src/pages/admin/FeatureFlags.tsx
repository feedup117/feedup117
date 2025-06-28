import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ToggleLeft, 
  ToggleRight, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  AlertTriangle, 
  Info, 
  Save, 
  X, 
  Search,
  Tag,
  Clock,
  CheckCircle,
  Shield,
  Zap,
  RefreshCw
} from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import IndianRupee from '../../components/icons/IndianRupee';

interface FeatureFlag {
  id: string;
  name: string;
  key: string;
  description: string;
  enabled: boolean;
  category: 'payment' | 'ui' | 'core' | 'experimental' | 'partner';
  createdAt: string;
  updatedAt: string;
  lastUpdatedBy: string;
  environment: 'all' | 'production' | 'staging' | 'development';
  impactLevel: 'low' | 'medium' | 'high' | 'critical';
}

const FeatureFlags = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<FeatureFlag | null>(null);

  const featureFlags: FeatureFlag[] = [
    {
      id: 'FF001',
      name: 'Tip Payments',
      key: 'enable_tip_payments',
      description: 'Allow customers to add tips during payment',
      enabled: true,
      category: 'payment',
      createdAt: '2024-12-01',
      updatedAt: '2025-01-05',
      lastUpdatedBy: 'Admin',
      environment: 'all',
      impactLevel: 'medium',
    },
    {
      id: 'FF002',
      name: 'Feedback Form',
      key: 'enable_feedback_form',
      description: 'Show feedback form after order completion',
      enabled: true,
      category: 'ui',
      createdAt: '2024-12-01',
      updatedAt: '2024-12-15',
      lastUpdatedBy: 'Admin',
      environment: 'all',
      impactLevel: 'low',
    },
    {
      id: 'FF003',
      name: 'CRM Collection',
      key: 'enable_crm_collection',
      description: 'Collect customer data for CRM purposes',
      enabled: true,
      category: 'core',
      createdAt: '2024-12-01',
      updatedAt: '2024-12-10',
      lastUpdatedBy: 'Admin',
      environment: 'all',
      impactLevel: 'medium',
    },
    {
      id: 'FF004',
      name: 'Token System',
      key: 'enable_token_system',
      description: 'Enable token-based queuing system for walk-in customers',
      enabled: false,
      category: 'experimental',
      createdAt: '2024-12-15',
      updatedAt: '2025-01-10',
      lastUpdatedBy: 'Admin',
      environment: 'staging',
      impactLevel: 'high',
    },
    {
      id: 'FF005',
      name: 'Partner Branding',
      key: 'allow_partner_branding',
      description: 'Allow partners to customize colors and logos',
      enabled: true,
      category: 'partner',
      createdAt: '2024-12-20',
      updatedAt: '2025-01-05',
      lastUpdatedBy: 'Admin',
      environment: 'all',
      impactLevel: 'low',
    },
    {
      id: 'FF006',
      name: 'Advanced Analytics',
      key: 'enable_advanced_analytics',
      description: 'Enable advanced analytics features for partners',
      enabled: false,
      category: 'experimental',
      createdAt: '2025-01-01',
      updatedAt: '2025-01-01',
      lastUpdatedBy: 'Admin',
      environment: 'development',
      impactLevel: 'medium',
    },
    {
      id: 'FF007',
      name: 'UPI Direct',
      key: 'enable_upi_direct',
      description: 'Enable direct UPI payments without gateway',
      enabled: false,
      category: 'payment',
      createdAt: '2025-01-05',
      updatedAt: '2025-01-05',
      lastUpdatedBy: 'Admin',
      environment: 'development',
      impactLevel: 'critical',
    },
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'payment', label: 'Payment' },
    { value: 'ui', label: 'User Interface' },
    { value: 'core', label: 'Core Features' },
    { value: 'experimental', label: 'Experimental' },
    { value: 'partner', label: 'Partner Features' },
  ];

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case 'payment':
        return {
          color: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200',
          icon: IndianRupee,
        };
      case 'ui':
        return {
          color: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200',
          icon: Layout,
        };
      case 'core':
        return {
          color: 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border-purple-200',
          icon: Zap,
        };
      case 'experimental':
        return {
          color: 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-orange-200',
          icon: Beaker,
        };
      case 'partner':
        return {
          color: 'bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-800 border-primary-200',
          icon: Users,
        };
      default:
        return {
          color: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200',
          icon: Tag,
        };
    }
  };

  const getImpactLevelConfig = (level: string) => {
    switch (level) {
      case 'low':
        return {
          color: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200',
        };
      case 'medium':
        return {
          color: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200',
        };
      case 'high':
        return {
          color: 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-orange-200',
        };
      case 'critical':
        return {
          color: 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-200',
        };
      default:
        return {
          color: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200',
        };
    }
  };

  const getEnvironmentConfig = (env: string) => {
    switch (env) {
      case 'production':
        return {
          color: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200',
        };
      case 'staging':
        return {
          color: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200',
        };
      case 'development':
        return {
          color: 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border-purple-200',
        };
      case 'all':
        return {
          color: 'bg-gradient-to-r from-gray-700 to-gray-900 text-white border-gray-600',
        };
      default:
        return {
          color: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200',
        };
    }
  };

  const toggleFeatureFlag = (id: string) => {
    // In a real app, this would update the feature flag in the database
    console.log(`Toggling feature flag ${id}`);
  };

  const handleEditFeature = (feature: FeatureFlag) => {
    setSelectedFeature(feature);
    setShowEditModal(true);
  };

  const handleDeleteFeature = (feature: FeatureFlag) => {
    setSelectedFeature(feature);
    setShowDeleteModal(true);
  };

  const filteredFeatures = featureFlags.filter(feature => {
    const matchesSearch = 
      feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || feature.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Feature Flags</h1>
            <p className="text-gray-600">Control system-wide features and functionality</p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl hover:from-secondary-600 hover:to-secondary-700 transition-all shadow-lg"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh Cache</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
            >
              <Plus className="h-5 w-5" />
              <span>Add Feature Flag</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Warning Notice */}
        <motion.div variants={itemVariants}>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="h-6 w-6 text-amber-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 mb-2">Feature Flag Changes Take Effect Immediately</h3>
                <p className="text-amber-800 text-sm mb-3">
                  Toggling a feature flag will immediately affect all users across the platform. Please ensure you understand the impact before making changes.
                </p>
                <div className="flex items-center space-x-4 text-sm text-amber-700">
                  <div className="flex items-center space-x-1">
                    <Shield className="h-4 w-4" />
                    <span>Critical flags are protected</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Changes are logged</span>
                  </div>
                </div>
              </div>
            </div>
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
                  placeholder="Search feature flags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                />
              </div>
              
              {/* Category Filter */}
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
            </div>
          </div>
        </motion.div>

        {/* Feature Flags List */}
        <motion.div variants={itemVariants}>
          <div className="space-y-4">
            {filteredFeatures.map((feature, index) => {
              const categoryConfig = getCategoryConfig(feature.category);
              const impactLevelConfig = getImpactLevelConfig(feature.impactLevel);
              const environmentConfig = getEnvironmentConfig(feature.environment);
              const CategoryIcon = categoryConfig.icon;
              
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Feature Info */}
                    <div className="flex-1">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-xl ${categoryConfig.color}`}>
                          <CategoryIcon className="h-6 w-6" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-bold text-gray-900">{feature.name}</h3>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${categoryConfig.color}`}>
                              {feature.category}
                            </span>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${impactLevelConfig.color}`}>
                              {feature.impactLevel} impact
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <code className="bg-gray-100 px-2 py-1 rounded font-mono">{feature.key}</code>
                            <span>•</span>
                            <span className={`px-2 py-0.5 rounded-full ${environmentConfig.color}`}>
                              {feature.environment}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Toggle & Actions */}
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-700">
                          {feature.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleFeatureFlag(feature.id)}
                          className="text-gray-400 hover:text-primary-500 transition-colors"
                        >
                          {feature.enabled ? (
                            <ToggleRight className="h-8 w-8 text-primary-500" />
                          ) : (
                            <ToggleLeft className="h-8 w-8" />
                          )}
                        </motion.button>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEditFeature(feature)}
                          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteFeature(feature)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Last Updated Info */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>Last updated: {new Date(feature.updatedAt).toLocaleDateString()} by {feature.lastUpdatedBy}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>Created: {new Date(feature.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredFeatures.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-12">
                <div className="text-gray-400 mb-4">
                  <Settings className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No feature flags found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
                >
                  Add Your First Feature Flag
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Add Feature Flag Modal */}
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
                    <h2 className="text-xl font-bold text-gray-900">Add Feature Flag</h2>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Feature Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Advanced Analytics"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Feature Key</label>
                    <input
                      type="text"
                      placeholder="e.g., enable_advanced_analytics"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 font-mono text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">Use snake_case for feature keys</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      placeholder="Describe what this feature does and its impact"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 resize-none"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 appearance-none">
                        <option value="payment">Payment</option>
                        <option value="ui">User Interface</option>
                        <option value="core">Core Features</option>
                        <option value="experimental">Experimental</option>
                        <option value="partner">Partner Features</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Impact Level</label>
                      <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 appearance-none">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Environment</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 appearance-none">
                      <option value="all">All Environments</option>
                      <option value="production">Production Only</option>
                      <option value="staging">Staging Only</option>
                      <option value="development">Development Only</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableFeature"
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                    />
                    <label htmlFor="enableFeature" className="ml-2 text-sm text-gray-700">
                      Enable feature flag immediately
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
                    Create Feature Flag
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Feature Flag Modal */}
        <AnimatePresence>
          {showEditModal && selectedFeature && (
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
                    <h2 className="text-xl font-bold text-gray-900">Edit Feature Flag</h2>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Feature Name</label>
                    <input
                      type="text"
                      defaultValue={selectedFeature.name}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Feature Key</label>
                    <input
                      type="text"
                      defaultValue={selectedFeature.key}
                      disabled
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 font-mono text-sm cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 mt-1">Feature keys cannot be changed after creation</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      defaultValue={selectedFeature.description}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 resize-none"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select 
                        defaultValue={selectedFeature.category}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 appearance-none"
                      >
                        <option value="payment">Payment</option>
                        <option value="ui">User Interface</option>
                        <option value="core">Core Features</option>
                        <option value="experimental">Experimental</option>
                        <option value="partner">Partner Features</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Impact Level</label>
                      <select 
                        defaultValue={selectedFeature.impactLevel}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 appearance-none"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Environment</label>
                    <select 
                      defaultValue={selectedFeature.environment}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 appearance-none"
                    >
                      <option value="all">All Environments</option>
                      <option value="production">Production Only</option>
                      <option value="staging">Staging Only</option>
                      <option value="development">Development Only</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="editEnableFeature"
                      defaultChecked={selectedFeature.enabled}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                    />
                    <label htmlFor="editEnableFeature" className="ml-2 text-sm text-gray-700">
                      Enable feature flag
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
                    Update Feature Flag
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Feature Flag Modal */}
        <AnimatePresence>
          {showDeleteModal && selectedFeature && (
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
                    Delete Feature Flag
                  </h2>
                  <p className="text-gray-600">Are you sure you want to delete the "{selectedFeature.name}" feature flag? This action cannot be undone.</p>
                </div>

                <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-200">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-800">Warning: Potential Service Impact</p>
                      <p className="text-sm text-red-700">Deleting this feature flag may affect functionality for users who depend on it. Make sure you have communicated this change.</p>
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
                    Delete Feature Flag
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

export default FeatureFlags;

function Layout(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <line x1="3" x2="21" y1="9" y2="9" />
      <line x1="9" x2="9" y1="21" y2="9" />
    </svg>
  );
}

function Beaker(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M4.5 3h15" />
      <path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" />
      <path d="M6 14h12" />
    </svg>
  );
}

function Users(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function Calendar(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}