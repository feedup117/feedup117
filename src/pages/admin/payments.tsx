import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Smartphone, 
  QrCode, 
  Eye, 
  EyeOff, 
  Save, 
  CheckCircle, 
  AlertTriangle, 
  Loader2, 
  RefreshCw, 
  Key, 
  Globe, 
  ArrowRight, 
  Download, 
  BarChart3, 
  Clock, 
  Filter, 
  Search, 
  ArrowUpDown, 
  FileText, 
  Zap, 
  ShieldAlert
} from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { 
  getGlobalPaymentSettings, 
  updateGlobalPaymentSettings, 
  getPaymentLogs, 
  getPaymentStats 
} from '../../services/paymentService';
import { GlobalPaymentSettings, PaymentLog, PaymentStats } from '../../types/payment';
import IndianRupee from '../../components/icons/IndianRupee';

const AdminPayments = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({
    razorpaySecret: false,
    phonepeSecret: false
  });
  const [settings, setSettings] = useState<GlobalPaymentSettings>({
    razorpay: {
      enabled: true,
      defaultKeyId: '',
      defaultKeySecret: ''
    },
    phonepe: {
      enabled: true,
      defaultMerchantId: '',
      defaultSaltKey: '',
      defaultSaltIndex: '1'
    },
    paymentOptions: {
      allowUpi: true,
      allowCards: true,
      allowNetBanking: true,
      allowWallets: true
    }
  });

  const [paymentLogs, setPaymentLogs] = useState<PaymentLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<PaymentLog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [providerFilter, setProviderFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [paymentStats, setPaymentStats] = useState<PaymentStats | null>(null);

  // Fetch payment settings and logs on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch global payment settings
        const globalSettings = await getGlobalPaymentSettings();
        setSettings(globalSettings);
        
        // Fetch payment logs
        const logs = await getPaymentLogs();
        setPaymentLogs(logs);
        setFilteredLogs(logs);
        
        // Fetch payment stats
        const stats = await getPaymentStats();
        setPaymentStats(stats);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter logs based on search term, status, and provider
  useEffect(() => {
    let filtered = [...paymentLogs];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.partnerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(log => log.status === statusFilter);
    }
    
    // Filter by provider
    if (providerFilter !== 'all') {
      filtered = filtered.filter(log => log.provider === providerFilter);
    }
    
    // Sort by timestamp
    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    setFilteredLogs(filtered);
  }, [searchTerm, statusFilter, providerFilter, sortOrder, paymentLogs]);

  // Handle input change for payment settings
  const handleInputChange = (
    provider: 'razorpay' | 'phonepe',
    field: string,
    value: string | boolean
  ) => {
    setSettings(prev => ({
      ...prev,
      [provider]: {
        ...prev[provider],
        [field]: value
      }
    }));
  };

  // Handle payment options change
  const handlePaymentOptionChange = (option: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      paymentOptions: {
        ...prev.paymentOptions,
        [option]: value
      }
    }));
  };

  // Toggle provider enabled state
  const toggleProviderEnabled = (provider: 'razorpay' | 'phonepe') => {
    setSettings(prev => ({
      ...prev,
      [provider]: {
        ...prev[provider],
        enabled: !prev[provider].enabled
      }
    }));
  };

  // Toggle show/hide secrets
  const toggleShowSecret = (field: string) => {
    setShowSecrets(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Save payment settings
  const saveSettings = async () => {
    try {
      setIsSaving(true);
      
      await updateGlobalPaymentSettings(settings);
      
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving payment settings:', error);
      alert('Failed to save payment settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle expanded log
  const toggleExpandLog = (id: string) => {
    setExpandedLog(expandedLog === id ? null : id);
  };

  // Export logs as CSV
  const exportLogs = () => {
    if (paymentLogs.length === 0) return;
    
    const headers = ['Transaction ID', 'Partner', 'Amount', 'Provider', 'Status', 'Timestamp'];
    const rows = paymentLogs.map(log => [
      log.transactionId,
      log.partnerName,
      log.amount.toString(),
      log.provider,
      log.status,
      new Date(log.timestamp).toLocaleString()
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `payment-logs-${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500';
      case 'failed':
        return 'bg-red-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'refunded':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get provider icon
  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'razorpay':
        return CreditCard;
      case 'phonepe':
        return Smartphone;
      case 'upi':
        return QrCode;
      default:
        return CreditCard;
    }
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

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Management</h1>
            <p className="text-gray-600">Monitor and manage payment gateways across the platform</p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={saveSettings}
              disabled={isSaving}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : saveSuccess ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  <span>Save Settings</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Payment Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
                <IndianRupee className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Transactions</p>
              <p className="text-3xl font-bold text-gray-900">₹{paymentStats?.totalAmount.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">{paymentStats?.totalCount} payments</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Razorpay Payments</p>
              <p className="text-3xl font-bold text-gray-900">₹{paymentStats?.razorpayAmount.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">{paymentStats?.razorpayCount} payments</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl shadow-lg">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">PhonePe Payments</p>
              <p className="text-3xl font-bold text-gray-900">₹{paymentStats?.phonepeAmount.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">{paymentStats?.phonepeCount} payments</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl shadow-lg">
                <QrCode className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">UPI Payments</p>
              <p className="text-3xl font-bold text-gray-900">₹{paymentStats?.upiAmount.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">{paymentStats?.upiCount} payments</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Default Payment Gateway Settings */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Default Payment Gateway Settings</h2>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
              <div className="flex items-start space-x-3">
                <ShieldAlert className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Admin Default Credentials</p>
                  <p className="text-sm text-yellow-700">
                    These credentials are used as fallbacks for demo mode and for partners who haven't configured their own payment gateways. Partners can override these with their own credentials.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              {/* Razorpay Default Settings */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Razorpay Default Settings</h3>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm text-gray-700">Enabled</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.razorpay.enabled} 
                        onChange={() => toggleProviderEnabled('razorpay')}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Key ID
                    </label>
                    <input
                      type="text"
                      value={settings.razorpay.defaultKeyId}
                      onChange={(e) => handleInputChange('razorpay', 'defaultKeyId', e.target.value)}
                      placeholder="rzp_test_1234567890"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      disabled={!settings.razorpay.enabled}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Key Secret
                    </label>
                    <div className="relative">
                      <input
                        type={showSecrets.razorpaySecret ? "text" : "password"}
                        value={settings.razorpay.defaultKeySecret}
                        onChange={(e) => handleInputChange('razorpay', 'defaultKeySecret', e.target.value)}
                        placeholder="••••••••••••••••"
                        className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        disabled={!settings.razorpay.enabled}
                      />
                      <button 
                        type="button"
                        onClick={() => toggleShowSecret('razorpaySecret')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        disabled={!settings.razorpay.enabled}
                      >
                        {showSecrets.razorpaySecret ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* PhonePe Default Settings */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg">
                      <Smartphone className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">PhonePe Default Settings</h3>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm text-gray-700">Enabled</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.phonepe.enabled} 
                        onChange={() => toggleProviderEnabled('phonepe')}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Merchant ID
                    </label>
                    <input
                      type="text"
                      value={settings.phonepe.defaultMerchantId}
                      onChange={(e) => handleInputChange('phonepe', 'defaultMerchantId', e.target.value)}
                      placeholder="MERCHANTUAT"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      disabled={!settings.phonepe.enabled}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Salt Key
                    </label>
                    <div className="relative">
                      <input
                        type={showSecrets.phonepeSecret ? "text" : "password"}
                        value={settings.phonepe.defaultSaltKey}
                        onChange={(e) => handleInputChange('phonepe', 'defaultSaltKey', e.target.value)}
                        placeholder="••••••••••••••••"
                        className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        disabled={!settings.phonepe.enabled}
                      />
                      <button 
                        type="button"
                        onClick={() => toggleShowSecret('phonepeSecret')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        disabled={!settings.phonepe.enabled}
                      >
                        {showSecrets.phonepeSecret ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Salt Index
                    </label>
                    <input
                      type="text"
                      value={settings.phonepe.defaultSaltIndex}
                      onChange={(e) => handleInputChange('phonepe', 'defaultSaltIndex', e.target.value)}
                      placeholder="1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      disabled={!settings.phonepe.enabled}
                    />
                  </div>
                </div>
              </div>
              
              {/* Payment Options */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Global Payment Options</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900">Allow UPI Payments</p>
                      <p className="text-sm text-gray-500">Enable UPI payment option for customers</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.paymentOptions.allowUpi} 
                        onChange={() => handlePaymentOptionChange('allowUpi', !settings.paymentOptions.allowUpi)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900">Allow Card Payments</p>
                      <p className="text-sm text-gray-500">Enable credit/debit card payment option</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.paymentOptions.allowCards} 
                        onChange={() => handlePaymentOptionChange('allowCards', !settings.paymentOptions.allowCards)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900">Allow Net Banking</p>
                      <p className="text-sm text-gray-500">Enable net banking payment option</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.paymentOptions.allowNetBanking} 
                        onChange={() => handlePaymentOptionChange('allowNetBanking', !settings.paymentOptions.allowNetBanking)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900">Allow Wallets</p>
                      <p className="text-sm text-gray-500">Enable wallet payment options (Paytm, etc.)</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.paymentOptions.allowWallets} 
                        onChange={() => handlePaymentOptionChange('allowWallets', !settings.paymentOptions.allowWallets)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Logs */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Payment Logs</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={exportLogs}
                disabled={paymentLogs.length === 0}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl hover:from-secondary-600 hover:to-secondary-700 transition-all shadow-lg disabled:opacity-50"
              >
                <Download className="h-4 w-4" />
                <span>Export Logs</span>
              </motion.button>
            </div>
            
            {/* Filters */}
            <div className="mb-6 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by partner or transaction ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                  />
                </div>
                
                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                >
                  <option value="all">All Statuses</option>
                  <option value="success">Success</option>
                  <option value="failed">Failed</option>
                  <option value="pending">Pending</option>
                  <option value="refunded">Refunded</option>
                </select>
                
                {/* Provider Filter */}
                <select
                  value={providerFilter}
                  onChange={(e) => setProviderFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                >
                  <option value="all">All Providers</option>
                  <option value="razorpay">Razorpay</option>
                  <option value="phonepe">PhonePe</option>
                  <option value="upi">UPI</option>
                </select>
                
                {/* Sort Order */}
                <button
                  onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                  className="flex items-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  <span>{sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}</span>
                </button>
              </div>
            </div>
            
            {/* Logs List */}
            {filteredLogs.length > 0 ? (
              <div className="space-y-4">
                {filteredLogs.map((log) => {
                  const ProviderIcon = getProviderIcon(log.provider);
                  
                  return (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                    >
                      {/* Log Summary */}
                      <div 
                        className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => toggleExpandLog(log.id)}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(log.status)}`}></div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900">{log.partnerName}</span>
                              <span className={`px-2 py-0.5 text-xs rounded-full ${
                                log.status === 'success' ? 'bg-green-100 text-green-800' :
                                log.status === 'failed' ? 'bg-red-100 text-red-800' :
                                log.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {log.status}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span>{log.transactionId}</span>
                              <span>•</span>
                              <span>{new Date(log.timestamp).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-lg">
                            <ProviderIcon className="h-4 w-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700 capitalize">{log.provider}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">₹{log.amount}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Expanded Details */}
                      <AnimatePresence>
                        {expandedLog === log.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-gray-200 bg-gray-50 overflow-hidden"
                          >
                            <div className="p-4 space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2">Transaction Details</h4>
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-600">Transaction ID:</span>
                                      <span className="text-sm font-medium text-gray-900">{log.transactionId}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-600">Order ID:</span>
                                      <span className="text-sm font-medium text-gray-900">{log.orderId}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-600">Amount:</span>
                                      <span className="text-sm font-medium text-gray-900">₹{log.amount}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-600">Status:</span>
                                      <span className={`text-sm font-medium ${
                                        log.status === 'success' ? 'text-green-600' :
                                        log.status === 'failed' ? 'text-red-600' :
                                        log.status === 'pending' ? 'text-yellow-600' :
                                        'text-blue-600'
                                      }`}>
                                        {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2">Partner Information</h4>
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-600">Partner ID:</span>
                                      <span className="text-sm font-medium text-gray-900">{log.partnerId}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-600">Partner Name:</span>
                                      <span className="text-sm font-medium text-gray-900">{log.partnerName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-600">Payment Provider:</span>
                                      <span className="text-sm font-medium text-gray-900 capitalize">{log.provider}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-600">Timestamp:</span>
                                      <span className="text-sm font-medium text-gray-900">{new Date(log.timestamp).toLocaleString()}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {log.errorMessage && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                  <h4 className="font-medium text-red-800 mb-1">Error Details</h4>
                                  <p className="text-sm text-red-700">{log.errorMessage}</p>
                                </div>
                              )}
                              
                              {log.metadata && (
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2">Additional Information</h4>
                                  <pre className="bg-gray-100 p-3 rounded-lg text-xs font-mono overflow-x-auto">
                                    {JSON.stringify(log.metadata, null, 2)}
                                  </pre>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No payment logs found</h3>
                <p className="text-gray-600">
                  {searchTerm || statusFilter !== 'all' || providerFilter !== 'all'
                    ? 'Try adjusting your search or filter criteria'
                    : 'No payment transactions have been recorded yet'}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Webhook Information */}
        <motion.div variants={itemVariants}>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Payment Webhook Configuration</h3>
                <div className="space-y-3 text-blue-800">
                  <p className="text-sm">
                    <strong>Razorpay Webhook URL:</strong> <code className="bg-blue-100 px-2 py-1 rounded">https://api.feedup.com/webhooks/razorpay</code>
                  </p>
                  <p className="text-sm">
                    <strong>PhonePe Webhook URL:</strong> <code className="bg-blue-100 px-2 py-1 rounded">https://api.feedup.com/webhooks/phonepe</code>
                  </p>
                  <p className="text-sm">
                    Configure these webhook URLs in your payment gateway dashboards to receive real-time payment notifications.
                  </p>
                  <div className="flex space-x-4 mt-2">
                    <a 
                      href="https://dashboard.razorpay.com/app/webhooks" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 inline-flex items-center"
                    >
                      <span>Razorpay Webhooks</span>
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </a>
                    <a 
                      href="https://developer.phonepe.com/console/webhook" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 inline-flex items-center"
                    >
                      <span>PhonePe Webhooks</span>
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminPayments;