import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Plus, 
  RefreshCw, 
  Clock, 
  Star, 
  Settings, 
  Key, 
  Save, 
  X, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Search,
  UserPlus,
  ShieldCheck
} from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';

interface DemoAccount {
  id: string;
  username: string;
  password: string;
  role: 'manager' | 'kitchen' | 'servant' | 'customer';
  status: 'active' | 'inactive';
  lastLogin: string | null;
  loginCount: number;
  createdAt: string;
  expiresAt: string | null;
  usageLimit: number | null;
  usageCount: number;
  isPasswordVisible: boolean;
}

const DemoManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<DemoAccount | null>(null);
  const [accounts, setAccounts] = useState<DemoAccount[]>([
    {
      id: 'DEMO001',
      username: 'partner@feedup.com',
      password: 'partner123',
      role: 'partner',
      status: 'active',
      lastLogin: '2025-01-10T14:30:00',
      loginCount: 156,
      createdAt: '2024-12-01',
      expiresAt: null,
      usageLimit: null,
      usageCount: 156,
      isPasswordVisible: false,
    },
    {
      id: 'DEMO002',
      username: 'manager@feedup.com',
      password: 'manager123',
      role: 'manager',
      status: 'active',
      lastLogin: '2025-01-09T16:45:00',
      loginCount: 89,
      createdAt: '2024-12-01',
      expiresAt: null,
      usageLimit: null,
      usageCount: 89,
      isPasswordVisible: false,
    },
    {
      id: 'DEMO003',
      username: 'kitchen@feedup.com',
      password: 'kitchen123',
      role: 'kitchen',
      status: 'active',
      lastLogin: '2025-01-10T10:15:00',
      loginCount: 67,
      createdAt: '2024-12-01',
      expiresAt: null,
      usageLimit: null,
      usageCount: 67,
      isPasswordVisible: false,
    },
    {
      id: 'DEMO004',
      username: 'servant@feedup.com',
      password: 'servant123',
      role: 'servant',
      status: 'active',
      lastLogin: '2025-01-10T12:20:00',
      loginCount: 78,
      createdAt: '2024-12-01',
      expiresAt: null,
      usageLimit: null,
      usageCount: 78,
      isPasswordVisible: false,
    },
    {
      id: 'DEMO005',
      username: 'customer@feedup.com',
      password: 'customer123',
      role: 'customer',
      status: 'disabled',
      lastLogin: '2025-01-05T18:30:00',
      loginCount: 45,
      createdAt: '2024-12-01',
      expiresAt: '2025-02-01',
      usageLimit: 100,
      usageCount: 45,
      isPasswordVisible: false,
    },
  ]);

  const roleOptions = [
    { value: 'all', label: 'All Roles', count: accounts.length },
    { value: 'partner', label: 'Partner', count: accounts.filter(a => a.role === 'partner').length },
    { value: 'manager', label: 'Manager', count: accounts.filter(a => a.role === 'manager').length },
    { value: 'kitchen', label: 'Kitchen', count: accounts.filter(a => a.role === 'kitchen').length },
    { value: 'servant', label: 'Servant', count: accounts.filter(a => a.role === 'servant').length },
    { value: 'customer', label: 'Customer', count: accounts.filter(a => a.role === 'customer').length },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status', count: accounts.length },
    { value: 'active', label: 'Active', count: accounts.filter(a => a.status === 'active').length },
    { value: 'disabled', label: 'Disabled', count: accounts.filter(a => a.status === 'disabled').length },
  ];

  const getRoleConfig = (role: string) => {
    switch (role) {
      case 'partner':
        return {
          icon: Crown,
          color: 'text-primary-600',
          bg: 'bg-primary-100',
          gradient: 'from-primary-500 to-primary-600',
        };
      case 'manager':
        return {
          icon: Settings,
          color: 'text-secondary-600',
          bg: 'bg-secondary-100',
          gradient: 'from-secondary-500 to-secondary-600',
        };
      case 'kitchen':
        return {
          icon: ChefHat,
          color: 'text-orange-600',
          bg: 'bg-orange-100',
          gradient: 'from-orange-500 to-red-500',
        };
      case 'servant':
        return {
          icon: Coffee,
          color: 'text-blue-600',
          bg: 'bg-blue-100',
          gradient: 'from-blue-500 to-cyan-500',
        };
      default:
        return {
          icon: Users,
          color: 'text-gray-600',
          bg: 'bg-gray-100',
          gradient: 'from-gray-500 to-gray-600',
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

  const togglePasswordVisibility = (id: string) => {
    setAccounts(accounts.map(account => 
      account.id === id 
        ? { ...account, isPasswordVisible: !account.isPasswordVisible } 
        : account
    ));
  };

  const toggleAccountStatus = (id: string) => {
    setAccounts(accounts.map(account => 
      account.id === id 
        ? { ...account, status: account.status === 'active' ? 'disabled' : 'active' } 
        : account
    ));
  };

  const handleEditAccount = (account: DemoAccount) => {
    setSelectedAccount(account);
    setShowEditModal(true);
  };

  const handleDeleteAccount = (account: DemoAccount) => {
    setSelectedAccount(account);
    setShowDeleteModal(true);
  };

  const resetAllSessions = () => {
    // In a real app, this would call an API to reset all demo sessions
    alert('All demo sessions have been reset.');
  };

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = 
      account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || account.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || account.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Demo Account Manager</h1>
            <p className="text-gray-600">Manage demo accounts for the "Try Demo" feature</p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetAllSessions}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl hover:from-secondary-600 hover:to-secondary-700 transition-all shadow-lg"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Reset All Sessions</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
            >
              <UserPlus className="h-5 w-5" />
              <span>Add Demo Account</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div variants={itemVariants}>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-6">
            <div className="flex items-start space-x-4">
              <ShieldCheck className="h-6 w-6 text-blue-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Demo Account Security</h3>
                <p className="text-blue-800 text-sm mb-3">
                  Demo accounts have limited access and cannot modify critical system settings. All actions performed by demo accounts are isolated from production data.
                </p>
                <div className="flex items-center space-x-4 text-sm text-blue-700">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Auto-expiry after inactivity</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>Activity is monitored</span>
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
                  placeholder="Search by username or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                />
              </div>
              
              {/* Status Filter */}
              <div className="w-full lg:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm appearance-none"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Role Filter */}
            <div className="flex gap-3 overflow-x-auto mt-6 pb-2">
              {roleOptions.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setRoleFilter(option.value)}
                  className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                    roleFilter === option.value
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{option.label}</span>
                  <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                    roleFilter === option.value
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

        {/* Demo Accounts List */}
        <motion.div variants={itemVariants}>
          <div className="space-y-4">
            {filteredAccounts.map((account, index) => {
              const roleConfig = getRoleConfig(account.role);
              const statusConfig = getStatusConfig(account.status);
              const RoleIcon = roleConfig.icon;
              
              return (
                <motion.div
                  key={account.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Account Info */}
                    <div className="flex-1">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${roleConfig.gradient} shadow-lg`}>
                          <RoleIcon className="h-6 w-6 text-white" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-bold text-gray-900">{account.username}</h3>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${roleConfig.bg} ${roleConfig.color}`}>
                              {account.role}
                            </span>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusConfig.color} flex items-center space-x-1`}>
                              <statusConfig.icon className={`h-3 w-3 ${statusConfig.iconColor}`} />
                              <span className="capitalize">{account.status}</span>
                            </span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <div className="flex items-center space-x-2">
                                <Key className="h-4 w-4 text-gray-500" />
                                <input
                                  type={account.isPasswordVisible ? "text" : "password"}
                                  value={account.password}
                                  readOnly
                                  className="bg-gray-100 px-2 py-1 rounded text-sm font-mono w-32"
                                />
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => togglePasswordVisibility(account.id)}
                                  className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
                                >
                                  {account.isPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </motion.button>
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">
                              ID: {account.id}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Usage Stats */}
                    <div className="flex flex-wrap gap-4">
                      <div className="text-center px-4 py-2 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500">Login Count</p>
                        <p className="text-lg font-bold text-gray-900">{account.loginCount}</p>
                      </div>
                      <div className="text-center px-4 py-2 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500">Last Login</p>
                        <p className="text-sm font-medium text-gray-900">
                          {account.lastLogin ? new Date(account.lastLogin).toLocaleDateString() : 'Never'}
                        </p>
                      </div>
                      {account.usageLimit && (
                        <div className="text-center px-4 py-2 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500">Usage</p>
                          <p className="text-sm font-medium text-gray-900">
                            {account.usageCount}/{account.usageLimit}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleAccountStatus(account.id)}
                        className={`p-2 ${
                          account.status === 'active' 
                            ? 'text-green-500 hover:text-red-500 hover:bg-red-50' 
                            : 'text-red-500 hover:text-green-500 hover:bg-green-50'
                        } rounded-lg transition-colors`}
                        title={account.status === 'active' ? 'Disable Account' : 'Enable Account'}
                      >
                        {account.status === 'active' ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditAccount(account)}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Account"
                      >
                        <Edit className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteAccount(account)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Account"
                      >
                        <Trash2 className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Created Date */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>Created: {new Date(account.createdAt).toLocaleDateString()}</span>
                    </div>
                    {account.expiresAt && (
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Expires: {new Date(account.expiresAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredAccounts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-12">
                <div className="text-gray-400 mb-4">
                  <Users className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No demo accounts found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
                >
                  Add Demo Account
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Add Demo Account Modal */}
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
                      <UserPlus className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Add Demo Account</h2>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username/Email</label>
                    <input
                      type="email"
                      placeholder="e.g., demo.partner@feedup.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter a secure password"
                        className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50"
                      />
                      <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <RefreshCw className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Password will be visible to demo users</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 appearance-none">
                      <option value="partner">Partner (Owner)</option>
                      <option value="manager">Manager</option>
                      <option value="kitchen">Kitchen Staff</option>
                      <option value="servant">Servant/Waiter</option>
                      <option value="customer">Customer</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Usage Limit</label>
                      <input
                        type="number"
                        placeholder="Leave blank for unlimited"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="date"
                        placeholder="Leave blank for no expiry"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="activeStatus"
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                      defaultChecked
                    />
                    <label htmlFor="activeStatus" className="ml-2 text-sm text-gray-700">
                      Account active
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
                    Create Demo Account
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Demo Account Modal */}
        <AnimatePresence>
          {showEditModal && selectedAccount && (
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
                    <h2 className="text-xl font-bold text-gray-900">Edit Demo Account</h2>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username/Email</label>
                    <input
                      type="email"
                      defaultValue={selectedAccount.username}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <input
                        type="text"
                        defaultValue={selectedAccount.password}
                        className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50"
                      />
                      <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <RefreshCw className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select 
                      defaultValue={selectedAccount.role}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 appearance-none"
                    >
                      <option value="partner">Partner (Owner)</option>
                      <option value="manager">Manager</option>
                      <option value="kitchen">Kitchen Staff</option>
                      <option value="servant">Servant/Waiter</option>
                      <option value="customer">Customer</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Usage Limit</label>
                      <input
                        type="number"
                        defaultValue={selectedAccount.usageLimit || ''}
                        placeholder="Leave blank for unlimited"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="date"
                        defaultValue={selectedAccount.expiresAt?.split('T')[0] || ''}
                        placeholder="Leave blank for no expiry"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="editActiveStatus"
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                      defaultChecked={selectedAccount.status === 'active'}
                    />
                    <label htmlFor="editActiveStatus" className="ml-2 text-sm text-gray-700">
                      Account active
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
                    Update Account
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Demo Account Modal */}
        <AnimatePresence>
          {showDeleteModal && selectedAccount && (
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
                    Delete Demo Account
                  </h2>
                  <p className="text-gray-600">Are you sure you want to delete the demo account for <span className="font-semibold">{selectedAccount.username}</span>?</p>
                </div>

                <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-200">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-800">This action cannot be undone</p>
                      <p className="text-sm text-red-700">All login sessions for this demo account will be terminated immediately.</p>
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
                    Delete Account
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

export default DemoManager;

function Crown(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
    </svg>
  );
}

function ChefHat(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
      <line x1="6" x2="18" y1="17" y2="17" />
    </svg>
  );
}

function Coffee(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" x2="6" y1="2" y2="4" />
      <line x1="10" x2="10" y1="2" y2="4" />
      <line x1="14" x2="14" y1="2" y2="4" />
    </svg>
  );
}