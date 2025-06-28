import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  ToggleLeft, 
  ToggleRight, 
  Save, 
  AlertTriangle, 
  Percent, 
  Key, 
  Globe, 
  Palette, 
  Calendar, 
  Bell, 
  Shield, 
  RefreshCw, 
  Check, 
  X, 
  CreditCard, 
  Smartphone, 
  Clock, 
  Zap, 
  Coffee, 
  MessageCircle, 
  Gift, 
  Wifi, 
  Users, 
  Paintbrush, 
  QrCode, 
  Loader2
} from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import ColorPicker from '../../components/admin/settings/ColorPicker';
import ToggleRow from '../../components/admin/settings/ToggleRow';
import OfferInput from '../../components/admin/settings/OfferInput';
import WebhookTester from '../../components/admin/settings/WebhookTester';
import SaveButton from '../../components/admin/settings/SaveButton';
import AnnouncementBanner from '../../components/admin/settings/AnnouncementBanner';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('features');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState<() => void>(() => {});
  const [confirmationMessage, setConfirmationMessage] = useState('');

  // Feature Toggles State
  const [featureToggles, setFeatureToggles] = useState({
    tipCollection: true,
    customerFeedback: true,
    tokenSystem: false,
    servantUpiPayments: true,
    internalCrmTracking: true,
    menuScheduling: false,
    posSystem: true,
    staffShiftScheduling: true,
    customBranding: true
  });

  // Plan Offers State
  const [planOffers, setPlanOffers] = useState({
    annualPlanOffer: true,
    firstTimeOffer: true,
    referralBonus: true,
    referralAmount: 100
  });

  // Razorpay Settings State
  const [razorpaySettings, setRazorpaySettings] = useState({
    keyId: 'rzp_test_1234567890',
    keySecret: '••••••••••••••••',
    autoRenew: true,
    allowUpi: true,
    supportContact: 'billing@feedup.com'
  });

  // Platform Branding State
  const [platformBranding, setPlatformBranding] = useState({
    primaryColor: '#f97316',
    defaultPartnerColor: '#f59e0b',
    footerLinks: {
      privacy: 'https://feedup.com/privacy',
      terms: 'https://feedup.com/terms',
      contact: 'https://feedup.com/contact'
    },
    instagramHandle: '@feedup_official'
  });

  // Subscription Defaults State
  const [subscriptionDefaults, setSubscriptionDefaults] = useState({
    trialPeriod: 7,
    defaultPlan: 'starter',
    autoLockDays: 7
  });

  // Maintenance Settings State
  const [maintenanceSettings, setMaintenanceSettings] = useState({
    enableDemoLogin: true,
    maintenanceMode: false,
    hideCrmFromManagers: false,
    announcementBanner: ''
  });

  // Handle feature toggle change
  const handleFeatureToggle = (feature: keyof typeof featureToggles) => {
    // If turning off a critical feature, show confirmation
    if (featureToggles[feature] && ['customerFeedback', 'tipCollection', 'posSystem'].includes(feature)) {
      setConfirmationMessage(`Are you sure you want to disable ${formatFeatureName(feature)}? This will affect all users immediately.`);
      setConfirmationAction(() => () => {
        setFeatureToggles(prev => ({ ...prev, [feature]: !prev[feature] }));
      });
      setShowConfirmation(true);
    } else {
      setFeatureToggles(prev => ({ ...prev, [feature]: !prev[feature] }));
    }
  };

  // Format feature name for display
  const formatFeatureName = (feature: string): string => {
    return feature
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
      .replace(/([a-z])([A-Z])/g, '$1 $2'); // Add space between camelCase
  };

  // Handle save settings
  const handleSaveSettings = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    
    setIsSaving(false);
  };

  // Handle maintenance mode toggle
  const handleMaintenanceModeToggle = () => {
    setConfirmationMessage("Enabling maintenance mode will prevent all partners from accessing their dashboards. Are you sure?");
    setConfirmationAction(() => () => {
      setMaintenanceSettings(prev => ({ ...prev, maintenanceMode: !prev.maintenanceMode }));
    });
    setShowConfirmation(true);
  };

  // Handle webhook test
  const handleWebhookTest = async () => {
    // Simulate webhook test
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Webhook test successful! Razorpay connection is working properly.');
  };

  const tabs = [
    { id: 'features', name: 'Feature Toggles', icon: ToggleLeft },
    { id: 'offers', name: 'Plan Offers & Discounts', icon: Percent },
    { id: 'razorpay', name: 'Razorpay Settings', icon: CreditCard },
    { id: 'branding', name: 'Platform Branding', icon: Palette },
    { id: 'subscription', name: 'Subscription Defaults', icon: Calendar },
    { id: 'maintenance', name: 'Maintenance & Visibility', icon: Shield },
  ];

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

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'features':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-4 mb-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900">Feature Toggles Take Effect Immediately</p>
                  <p className="text-blue-700 text-sm">Toggling a feature will instantly affect all users across the platform. Please ensure you understand the impact before making changes.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <ToggleRow
                title="Tip Collection"
                description="Allow customers to add tips during payment"
                icon={Gift}
                isEnabled={featureToggles.tipCollection}
                onChange={() => handleFeatureToggle('tipCollection')}
              />
              
              <ToggleRow
                title="Customer Feedback"
                description="Show feedback form after order completion"
                icon={MessageCircle}
                isEnabled={featureToggles.customerFeedback}
                onChange={() => handleFeatureToggle('customerFeedback')}
              />
              
              <ToggleRow
                title="Token System"
                description="Enable token-based queuing system for walk-in customers"
                icon={Clock}
                isEnabled={featureToggles.tokenSystem}
                onChange={() => handleFeatureToggle('tokenSystem')}
                beta={true}
              />
              
              <ToggleRow
                title="Servant UPI Payments"
                description="Allow waiters to receive tips directly via UPI"
                icon={Smartphone}
                isEnabled={featureToggles.servantUpiPayments}
                onChange={() => handleFeatureToggle('servantUpiPayments')}
              />
              
              <ToggleRow
                title="Internal CRM Tracking"
                description="Track customer data for CRM purposes"
                icon={Users}
                isEnabled={featureToggles.internalCrmTracking}
                onChange={() => handleFeatureToggle('internalCrmTracking')}
              />
              
              <ToggleRow
                title="Menu Scheduling"
                description="Allow partners to schedule menu availability by time/day"
                icon={Calendar}
                isEnabled={featureToggles.menuScheduling}
                onChange={() => handleFeatureToggle('menuScheduling')}
                beta={true}
              />
              
              <ToggleRow
                title="POS System"
                description="Enable point-of-sale system for partners"
                icon={CreditCard}
                isEnabled={featureToggles.posSystem}
                onChange={() => handleFeatureToggle('posSystem')}
              />
              
              <ToggleRow
                title="Staff Shift Scheduling"
                description="Enable staff shift management and scheduling"
                icon={Users}
                isEnabled={featureToggles.staffShiftScheduling}
                onChange={() => handleFeatureToggle('staffShiftScheduling')}
              />
              
              <ToggleRow
                title="Custom Branding by Partner"
                description="Allow partners to customize their branding colors and logo"
                icon={Paintbrush}
                isEnabled={featureToggles.customBranding}
                onChange={() => handleFeatureToggle('customBranding')}
              />
            </div>
          </div>
        );
      
      case 'offers':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Annual Plan Offer</h3>
              
              <ToggleRow
                title="Enable 2 Months Free for Annual Plans"
                description="Customers save 2 months when paying annually"
                icon={Calendar}
                isEnabled={planOffers.annualPlanOffer}
                onChange={() => setPlanOffers(prev => ({ ...prev, annualPlanOffer: !prev.annualPlanOffer }))}
              />
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">First-Time Offer</h3>
              
              <ToggleRow
                title="Trial Users Get ₹100 Off First Month"
                description="Discount applied automatically after trial period"
                icon={Zap}
                isEnabled={planOffers.firstTimeOffer}
                onChange={() => setPlanOffers(prev => ({ ...prev, firstTimeOffer: !prev.firstTimeOffer }))}
              />
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Referral Bonus Logic</h3>
              
              <div className="space-y-4">
                <ToggleRow
                  title="Enable Referral Discount"
                  description="Partners get discount for referring new customers"
                  icon={Users}
                  isEnabled={planOffers.referralBonus}
                  onChange={() => setPlanOffers(prev => ({ ...prev, referralBonus: !prev.referralBonus }))}
                />
                
                {planOffers.referralBonus && (
                  <OfferInput
                    label="Referral Discount Amount"
                    value={planOffers.referralAmount}
                    onChange={(value) => setPlanOffers(prev => ({ ...prev, referralAmount: value }))}
                    prefix="₹"
                    min={0}
                    max={1000}
                  />
                )}
              </div>
            </div>
          </div>
        );
      
      case 'razorpay':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">API Credentials</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Razorpay Key ID
                  </label>
                  <input
                    type="text"
                    value={razorpaySettings.keyId}
                    onChange={(e) => setRazorpaySettings(prev => ({ ...prev, keyId: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Razorpay Key Secret
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={razorpaySettings.keySecret}
                      onChange={(e) => setRazorpaySettings(prev => ({ ...prev, keySecret: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <button 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => alert('For security reasons, key secret is masked. To change it, enter a new value.')}
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">This key is stored securely and never exposed to clients</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Behavior</h3>
              
              <div className="space-y-4">
                <ToggleRow
                  title="Auto-renew Subscriptions"
                  description="Automatically renew subscriptions when they expire"
                  icon={RefreshCw}
                  isEnabled={razorpaySettings.autoRenew}
                  onChange={() => setRazorpaySettings(prev => ({ ...prev, autoRenew: !prev.autoRenew }))}
                />
                
                <ToggleRow
                  title="Allow UPI/Wallet Options"
                  description="Enable UPI and wallet payment methods"
                  icon={Smartphone}
                  isEnabled={razorpaySettings.allowUpi}
                  onChange={() => setRazorpaySettings(prev => ({ ...prev, allowUpi: !prev.allowUpi }))}
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Billing Support Contact
                  </label>
                  <input
                    type="email"
                    value={razorpaySettings.supportContact}
                    onChange={(e) => setRazorpaySettings(prev => ({ ...prev, supportContact: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., billing@feedup.com"
                  />
                  <p className="text-xs text-gray-500 mt-1">This email will be displayed on Razorpay checkout pages</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Webhook Configuration</h3>
              
              <WebhookTester onTest={handleWebhookTest} />
              
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Webhook URL: <code className="bg-gray-100 px-2 py-1 rounded">https://api.feedup.com/webhooks/razorpay</code></p>
                <p className="text-xs text-gray-500 mt-1">Configure this URL in your Razorpay dashboard to receive payment events</p>
              </div>
            </div>
          </div>
        );
      
      case 'branding':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Global Colors</h3>
              
              <div className="space-y-4">
                <ColorPicker
                  label="Primary Color"
                  value={platformBranding.primaryColor}
                  onChange={(color) => setPlatformBranding(prev => ({ ...prev, primaryColor: color }))}
                />
                
                <ColorPicker
                  label="Default Partner Branding Color"
                  value={platformBranding.defaultPartnerColor}
                  onChange={(color) => setPlatformBranding(prev => ({ ...prev, defaultPartnerColor: color }))}
                />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Logo & Branding</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    FeedUP Logo Upload
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                      <UtensilsCrossed className="h-8 w-8 text-white" />
                    </div>
                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                      Upload New Logo
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Recommended size: 512x512px, PNG format with transparency</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Footer & Social</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Privacy Policy URL
                  </label>
                  <input
                    type="url"
                    value={platformBranding.footerLinks.privacy}
                    onChange={(e) => setPlatformBranding(prev => ({ 
                      ...prev, 
                      footerLinks: { ...prev.footerLinks, privacy: e.target.value } 
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Terms of Service URL
                  </label>
                  <input
                    type="url"
                    value={platformBranding.footerLinks.terms}
                    onChange={(e) => setPlatformBranding(prev => ({ 
                      ...prev, 
                      footerLinks: { ...prev.footerLinks, terms: e.target.value } 
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Page URL
                  </label>
                  <input
                    type="url"
                    value={platformBranding.footerLinks.contact}
                    onChange={(e) => setPlatformBranding(prev => ({ 
                      ...prev, 
                      footerLinks: { ...prev.footerLinks, contact: e.target.value } 
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    value={platformBranding.instagramHandle}
                    onChange={(e) => setPlatformBranding(prev => ({ ...prev, instagramHandle: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="@feedup_official"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
              
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: platformBranding.primaryColor }}>
                    <UtensilsCrossed className="h-6 w-6 text-white m-2" />
                  </div>
                  <span className="text-xl font-bold" style={{ color: platformBranding.primaryColor }}>
                    Feed<span>UP</span>
                  </span>
                </div>
                
                <div className="flex space-x-2 mb-4">
                  <div className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: platformBranding.primaryColor }}>
                    Primary Button
                  </div>
                  <div className="px-4 py-2 rounded-lg border" style={{ borderColor: platformBranding.primaryColor, color: platformBranding.primaryColor }}>
                    Secondary Button
                  </div>
                </div>
                
                <div className="h-2 w-full rounded-full mb-4" style={{ backgroundColor: `${platformBranding.primaryColor}20` }}>
                  <div className="h-2 w-1/2 rounded-full" style={{ backgroundColor: platformBranding.primaryColor }}></div>
                </div>
                
                <div className="text-xs text-gray-500 flex items-center justify-between">
                  <div>© 2025 FeedUP</div>
                  <div className="flex space-x-2">
                    <a href="#" className="hover:underline">Privacy</a>
                    <a href="#" className="hover:underline">Terms</a>
                    <a href="#" className="hover:underline">Contact</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'subscription':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trial Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Trial Period (days)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={subscriptionDefaults.trialPeriod}
                    onChange={(e) => setSubscriptionDefaults(prev => ({ 
                      ...prev, 
                      trialPeriod: parseInt(e.target.value) 
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Set to 0 to disable trial period</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Default Plan Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Plan After Trial
                  </label>
                  <select
                    value={subscriptionDefaults.defaultPlan}
                    onChange={(e) => setSubscriptionDefaults(prev => ({ 
                      ...prev, 
                      defaultPlan: e.target.value 
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="starter">Starter</option>
                    <option value="business">Business</option>
                    <option value="premium">Premium</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Plan users will be prompted to purchase after trial ends</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Restrictions</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Auto-lock unpaid accounts after X days
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={subscriptionDefaults.autoLockDays}
                    onChange={(e) => setSubscriptionDefaults(prev => ({ 
                      ...prev, 
                      autoLockDays: parseInt(e.target.value) 
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Number of days after payment failure before account is locked</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'maintenance':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Visibility</h3>
              
              <div className="space-y-4">
                <ToggleRow
                  title="Enable Demo Login Feature"
                  description="Allow users to try demo accounts without registration"
                  icon={Users}
                  isEnabled={maintenanceSettings.enableDemoLogin}
                  onChange={() => setMaintenanceSettings(prev => ({ 
                    ...prev, 
                    enableDemoLogin: !prev.enableDemoLogin 
                  }))}
                />
                
                <ToggleRow
                  title="Maintenance Mode"
                  description="Hide partner dashboards during maintenance"
                  icon={Shield}
                  isEnabled={maintenanceSettings.maintenanceMode}
                  onChange={handleMaintenanceModeToggle}
                  critical={true}
                />
                
                <ToggleRow
                  title="Hide CRM Analytics from Managers"
                  description="Restrict manager access to customer data"
                  icon={Users}
                  isEnabled={maintenanceSettings.hideCrmFromManagers}
                  onChange={() => setMaintenanceSettings(prev => ({ 
                    ...prev, 
                    hideCrmFromManagers: !prev.hideCrmFromManagers 
                  }))}
                />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Global Announcement</h3>
              
              <AnnouncementBanner
                value={maintenanceSettings.announcementBanner}
                onChange={(value) => setMaintenanceSettings(prev => ({ 
                  ...prev, 
                  announcementBanner: value 
                }))}
              />
            </div>
          </div>
        );
      
      default:
        return null;
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Platform Settings</h1>
            <p className="text-gray-600">Configure global settings for the FeedUP platform</p>
          </div>
          <SaveButton 
            onClick={handleSaveSettings} 
            isSaving={isSaving} 
            isSuccess={saveSuccess} 
          />
        </motion.div>

        {/* Settings Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <tab.icon className={`h-5 w-5 ${
                      activeTab === tab.id ? 'text-white' : 'text-gray-400'
                    }`} />
                    <span className="font-medium">{tab.name}</span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
              {renderTabContent()}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowConfirmation(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl border border-white/20 p-8 max-w-md w-full"
            >
              <div className="text-center mb-6">
                <div className="inline-flex p-4 bg-gradient-to-br from-amber-500 to-red-500 rounded-2xl shadow-lg mb-4">
                  <AlertTriangle className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Confirm Action
                </h2>
                <p className="text-gray-600">{confirmationMessage}</p>
              </div>

              <div className="flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowConfirmation(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    confirmationAction();
                    setShowConfirmation(false);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-red-500 text-white rounded-lg hover:from-amber-600 hover:to-red-600 transition-all shadow-lg"
                >
                  Yes, Continue
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default AdminSettings;

function Eye(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UtensilsCrossed(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
      <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
      <path d="m2.1 21.8 6.4-6.3" />
      <path d="m19 5-7 7" />
    </svg>
  );
}