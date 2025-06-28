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
  Trash2, 
  Plus
} from 'lucide-react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  getPaymentSettings, 
  updatePaymentSettings, 
  testPaymentGateway 
} from '../../../services/paymentService';
import { getStaffMembers, updateStaffMember } from '../../../services/staffService';
import { StaffMember } from '../../../types/staff';
import { PaymentSettings } from '../../../types/payment';

const PaymentSettings = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [testingGateway, setTestingGateway] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({
    razorpaySecret: false,
    phonepeSecret: false,
    upiId: false
  });
  const [settings, setSettings] = useState<PaymentSettings>({
    preferredProvider: 'razorpay',
    razorpay: {
      enabled: true,
      keyId: '',
      keySecret: ''
    },
    phonepe: {
      enabled: false,
      merchantId: '',
      saltKey: '',
      saltIndex: '1'
    },
    upi: {
      enabled: true,
      upiId: ''
    }
  });

  const [servants, setServants] = useState<StaffMember[]>([]);
  const [selectedServant, setSelectedServant] = useState<StaffMember | null>(null);
  const [servantUpiId, setServantUpiId] = useState('');
  const [showServantUpi, setShowServantUpi] = useState(false);
  const [savingServantUpi, setSavingServantUpi] = useState(false);

  // Fetch payment settings and staff members on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch payment settings
        const paymentSettings = await getPaymentSettings();
        setSettings(paymentSettings);
        
        // Fetch staff members (servants only)
        const staffMembers = await getStaffMembers();
        const servantStaff = staffMembers.filter(staff => staff.role === 'servant');
        setServants(servantStaff);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle input change for payment settings
  const handleInputChange = (
    provider: 'razorpay' | 'phonepe' | 'upi',
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

  // Handle preferred provider change
  const handlePreferredProviderChange = (provider: 'razorpay' | 'phonepe' | 'upi') => {
    setSettings(prev => ({
      ...prev,
      preferredProvider: provider
    }));
  };

  // Toggle provider enabled state
  const toggleProviderEnabled = (provider: 'razorpay' | 'phonepe' | 'upi') => {
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

  // Test payment gateway connection
  const testGateway = async (provider: 'razorpay' | 'phonepe') => {
    try {
      setTestingGateway(provider);
      setTestResult(null);
      
      const result = await testPaymentGateway(provider, settings[provider]);
      setTestResult(result);
      
      // Auto-hide success message after 3 seconds
      if (result.success) {
        setTimeout(() => {
          setTestResult(null);
        }, 3000);
      }
    } catch (error) {
      console.error(`Error testing ${provider} gateway:`, error);
      setTestResult({
        success: false,
        message: `Failed to test ${provider} gateway. Please check your credentials.`
      });
    } finally {
      setTestingGateway(null);
    }
  };

  // Save payment settings
  const saveSettings = async () => {
    try {
      setIsSaving(true);
      
      await updatePaymentSettings(settings);
      
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

  // Handle servant selection
  const handleServantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const servantId = e.target.value;
    if (!servantId) {
      setSelectedServant(null);
      setServantUpiId('');
      return;
    }
    
    const servant = servants.find(s => s.id === servantId);
    if (servant) {
      setSelectedServant(servant);
      setServantUpiId(servant.tipUpiId || '');
    }
  };

  // Save servant UPI ID
  const saveServantUpi = async () => {
    if (!selectedServant) return;
    
    try {
      setSavingServantUpi(true);
      
      // Update staff member with UPI ID
      await updateStaffMember(selectedServant.id, {
        ...selectedServant,
        tipUpiId: servantUpiId
      });
      
      // Update local state
      setServants(prev => prev.map(servant => 
        servant.id === selectedServant.id 
          ? { ...servant, tipUpiId: servantUpiId } 
          : servant
      ));
      
      // Show success message
      alert(`UPI ID saved successfully for ${selectedServant.name}`);
      
      // Reset form
      setSelectedServant(null);
      setServantUpiId('');
      
    } catch (error) {
      console.error('Error saving servant UPI ID:', error);
      alert('Failed to save UPI ID. Please try again.');
    } finally {
      setSavingServantUpi(false);
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
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Settings</h1>
            <p className="text-gray-600">Configure payment gateways and UPI settings for your restaurant</p>
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

        {/* Preferred Payment Provider */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Preferred Payment Provider</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePreferredProviderChange('razorpay')}
                className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                  settings.preferredProvider === 'razorpay'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 ${
                    settings.preferredProvider === 'razorpay'
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300'
                  }`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Razorpay</h3>
                <p className="text-sm text-gray-600">Full-featured payment gateway with cards, UPI, and more</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePreferredProviderChange('phonepe')}
                className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                  settings.preferredProvider === 'phonepe'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-lg">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 ${
                    settings.preferredProvider === 'phonepe'
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300'
                  }`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">PhonePe</h3>
                <p className="text-sm text-gray-600">Popular in India with strong UPI integration</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePreferredProviderChange('upi')}
                className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                  settings.preferredProvider === 'upi'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
                    <QrCode className="h-6 w-6 text-white" />
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 ${
                    settings.preferredProvider === 'upi'
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300'
                  }`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Static UPI</h3>
                <p className="text-sm text-gray-600">Simple QR code for direct UPI payments</p>
              </motion.div>
            </div>
            
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Payment Provider Selection</p>
                  <p className="text-sm text-blue-700">
                    The preferred provider will be used for all customer payments. If the preferred provider is not configured or fails, the system will automatically fall back to the next available method.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Razorpay Configuration */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Razorpay Configuration</h2>
              </div>
              <div className="flex items-center space-x-3">
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
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => testGateway('razorpay')}
                  disabled={!settings.razorpay.enabled || !settings.razorpay.keyId || !settings.razorpay.keySecret || testingGateway === 'razorpay'}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {testingGateway === 'razorpay' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  <span>Test Connection</span>
                </motion.button>
              </div>
            </div>
            
            {testResult && testingGateway === 'razorpay' && (
              <div className={`mb-6 p-4 rounded-xl border ${
                testResult.success 
                  ? 'bg-green-50 border-green-200 text-green-800' 
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                <div className="flex items-center space-x-2">
                  {testResult.success ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  )}
                  <p>{testResult.message}</p>
                </div>
              </div>
            )}
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Razorpay Key ID
                </label>
                <input
                  type="text"
                  value={settings.razorpay.keyId}
                  onChange={(e) => handleInputChange('razorpay', 'keyId', e.target.value)}
                  placeholder="rzp_test_1234567890"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  disabled={!settings.razorpay.enabled}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Find this in your Razorpay Dashboard under Settings &gt; API Keys
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Razorpay Key Secret
                </label>
                <div className="relative">
                  <input
                    type={showSecrets.razorpaySecret ? "text" : "password"}
                    value={settings.razorpay.keySecret}
                    onChange={(e) => handleInputChange('razorpay', 'keySecret', e.target.value)}
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
                <p className="mt-1 text-xs text-gray-500">
                  This key is stored securely and never exposed to customers
                </p>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <Key className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Razorpay Integration</p>
                    <p className="text-sm text-yellow-700">
                      For live payments, use production keys from your Razorpay dashboard. For testing, use test mode keys.
                    </p>
                    <a 
                      href="https://dashboard.razorpay.com/app/keys" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 hover:text-primary-700 mt-1 inline-flex items-center"
                    >
                      <span>Go to Razorpay Dashboard</span>
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* PhonePe Configuration */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg">
                  <Smartphone className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">PhonePe Configuration</h2>
              </div>
              <div className="flex items-center space-x-3">
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
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => testGateway('phonepe')}
                  disabled={!settings.phonepe.enabled || !settings.phonepe.merchantId || !settings.phonepe.saltKey || testingGateway === 'phonepe'}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {testingGateway === 'phonepe' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  <span>Test Connection</span>
                </motion.button>
              </div>
            </div>
            
            {testResult && testingGateway === 'phonepe' && (
              <div className={`mb-6 p-4 rounded-xl border ${
                testResult.success 
                  ? 'bg-green-50 border-green-200 text-green-800' 
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                <div className="flex items-center space-x-2">
                  {testResult.success ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  )}
                  <p>{testResult.message}</p>
                </div>
              </div>
            )}
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Merchant ID
                </label>
                <input
                  type="text"
                  value={settings.phonepe.merchantId}
                  onChange={(e) => handleInputChange('phonepe', 'merchantId', e.target.value)}
                  placeholder="MERCHANTUAT"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  disabled={!settings.phonepe.enabled}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Your PhonePe merchant ID provided during onboarding
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salt Key
                </label>
                <div className="relative">
                  <input
                    type={showSecrets.phonepeSecret ? "text" : "password"}
                    value={settings.phonepe.saltKey}
                    onChange={(e) => handleInputChange('phonepe', 'saltKey', e.target.value)}
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
                <p className="mt-1 text-xs text-gray-500">
                  This key is stored securely and never exposed to customers
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salt Index
                </label>
                <input
                  type="text"
                  value={settings.phonepe.saltIndex}
                  onChange={(e) => handleInputChange('phonepe', 'saltIndex', e.target.value)}
                  placeholder="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  disabled={!settings.phonepe.enabled}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Usually "1" unless specified otherwise by PhonePe
                </p>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <Key className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">PhonePe Integration</p>
                    <p className="text-sm text-yellow-700">
                      For live payments, use production credentials from your PhonePe dashboard. For testing, use test mode credentials.
                    </p>
                    <a 
                      href="https://developer.phonepe.com/console/dashboard" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 hover:text-primary-700 mt-1 inline-flex items-center"
                    >
                      <span>Go to PhonePe Dashboard</span>
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* UPI Configuration */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                  <QrCode className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Static UPI Configuration</h2>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-sm text-gray-700">Enabled</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.upi.enabled} 
                    onChange={() => toggleProviderEnabled('upi')}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Restaurant UPI ID
                </label>
                <div className="relative">
                  <input
                    type={showSecrets.upiId ? "text" : "password"}
                    value={settings.upi.upiId}
                    onChange={(e) => handleInputChange('upi', 'upiId', e.target.value)}
                    placeholder="yourname@upi"
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    disabled={!settings.upi.enabled}
                  />
                  <button 
                    type="button"
                    onClick={() => toggleShowSecret('upiId')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={!settings.upi.enabled}
                  >
                    {showSecrets.upiId ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  This UPI ID will be used as a fallback when payment gateways are not configured
                </p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <QrCode className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Static UPI Payments</p>
                    <p className="text-sm text-blue-700">
                      When payment gateways are not configured, customers will see a QR code with this UPI ID for direct payments. Customers will need to manually confirm payment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Servant Tip Configuration */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Servant Tip Configuration</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Staff Member
                  </label>
                  <select
                    value={selectedServant?.id || ''}
                    onChange={handleServantChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select a service staff member</option>
                    {servants.map(servant => (
                      <option key={servant.id} value={servant.id}>
                        {servant.name} ({servant.email})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    UPI ID for Tips
                  </label>
                  <div className="relative">
                    <input
                      type={showServantUpi ? "text" : "password"}
                      value={servantUpiId}
                      onChange={(e) => setServantUpiId(e.target.value)}
                      placeholder="staffname@upi"
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      disabled={!selectedServant}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowServantUpi(!showServantUpi)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      disabled={!selectedServant}
                    >
                      {showServantUpi ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={saveServantUpi}
                  disabled={!selectedServant || !servantUpiId || savingServantUpi}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {savingServantUpi ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  <span>Save UPI ID</span>
                </motion.button>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <QrCode className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Direct Tip Payments</p>
                    <p className="text-sm text-green-700">
                      Tips are sent directly to the staff member's UPI ID. The platform does not process or take a cut from tips. Staff members can track their tips in their dashboard.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Staff UPI List */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Configured Staff UPI IDs</h3>
                
                {servants.filter(s => s.tipUpiId).length > 0 ? (
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Staff Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            UPI ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {servants.filter(s => s.tipUpiId).map((servant) => (
                          <tr key={servant.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                  <span className="text-white font-bold">
                                    {servant.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{servant.name}</div>
                                  <div className="text-sm text-gray-500">{servant.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 font-mono">
                                {servant.tipUpiId}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button 
                                onClick={() => {
                                  setSelectedServant(servant);
                                  setServantUpiId(servant.tipUpiId || '');
                                }}
                                className="text-primary-600 hover:text-primary-900 mr-4"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={async () => {
                                  if (confirm(`Remove UPI ID for ${servant.name}?`)) {
                                    try {
                                      await updateStaffMember(servant.id, {
                                        ...servant,
                                        tipUpiId: ''
                                      });
                                      
                                      // Update local state
                                      setServants(prev => prev.map(s => 
                                        s.id === servant.id 
                                          ? { ...s, tipUpiId: '' } 
                                          : s
                                      ));
                                    } catch (error) {
                                      console.error('Error removing UPI ID:', error);
                                      alert('Failed to remove UPI ID. Please try again.');
                                    }
                                  }
                                }}
                                className="text-red-600 hover:text-red-900"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-200">
                    <QrCode className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">No UPI IDs configured yet</p>
                    <p className="text-sm text-gray-400">Add UPI IDs for your service staff to enable direct tips</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Flow Information */}
        <motion.div variants={itemVariants}>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">How Payments Work</h3>
                <div className="space-y-3 text-blue-800">
                  <p className="text-sm">
                    <strong>Bill Payments:</strong> When a customer pays their bill, the system will use your preferred payment gateway. If that's not available, it will fall back to static UPI.
                  </p>
                  <p className="text-sm">
                    <strong>Tips:</strong> Tips are handled separately and sent directly to the staff member's UPI ID. The platform does not process or take a cut from tips.
                  </p>
                  <p className="text-sm">
                    <strong>Fallback Handling:</strong> If all payment gateways fail, customers will see a static UPI QR code for direct payment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default PaymentSettings;