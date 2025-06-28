import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon,
  Building2,
  Palette,
  CreditCard,
  Bell,
  Shield,
  Globe,
  Upload,
  Save,
  Eye,
  EyeOff,
  MapPin,
  Phone,
  Mail,
  Clock,
  Percent,
  Smartphone,
  Key
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('restaurant');
  const [showUpiKey, setShowUpiKey] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  const tabs = [
    { id: 'restaurant', name: 'Restaurant Profile', icon: Building2 },
    { id: 'branding', name: 'Branding', icon: Palette },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'system', name: 'System', icon: SettingsIcon },
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'restaurant':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant Name</label>
                <input
                  type="text"
                  defaultValue="Spice Garden"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine Type</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
                  <option>Indian</option>
                  <option>Chinese</option>
                  <option>Continental</option>
                  <option>Multi-Cuisine</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows={4}
                defaultValue="Authentic Indian cuisine with a modern twist. Experience the rich flavors and aromatic spices in our carefully crafted dishes."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  Address
                </label>
                <textarea
                  rows={3}
                  defaultValue="123 Food Street, Gourmet District, Mumbai, Maharashtra 400001"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-1" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    defaultValue="+91 98765 43210"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="contact@spicegarden.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Opening Hours
                </label>
                <input
                  type="text"
                  defaultValue="10:00 AM - 11:00 PM"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
                <input
                  type="text"
                  defaultValue="27AABCU9603R1ZX"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant Logo</label>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all"
                >
                  <Upload className="h-4 w-4" />
                  <span>Upload Logo</span>
                </motion.button>
              </div>
            </div>
          </div>
        );

      case 'branding':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Brand Colors</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      defaultValue="#f97316"
                      className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      defaultValue="#f97316"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      defaultValue="#f59e0b"
                      className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      defaultValue="#f59e0b"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Menu Customization</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Menu Header Text</label>
                  <input
                    type="text"
                    defaultValue="Welcome to Spice Garden"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Menu Footer Text</label>
                  <input
                    type="text"
                    defaultValue="Thank you for dining with us!"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-6 rounded-xl border border-primary-200">
                <div className="bg-white rounded-lg p-4 shadow-lg max-w-sm">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg mx-auto mb-2"></div>
                    <h4 className="font-bold text-gray-900">Welcome to Spice Garden</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm">Chicken Biryani</span>
                      <span className="text-sm font-bold text-primary-600">₹320</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm">Paneer Masala</span>
                      <span className="text-sm font-bold text-primary-600">₹280</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-4">Thank you for dining with us!</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-5 w-5 text-primary-500" />
                    <div>
                      <p className="font-medium text-gray-900">UPI Payments</p>
                      <p className="text-sm text-gray-500">Accept payments via UPI</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-primary-500" />
                    <div>
                      <p className="font-medium text-gray-900">Card Payments</p>
                      <p className="text-sm text-gray-500">Accept credit/debit cards</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">UPI Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
                  <div className="relative">
                    <input
                      type={showUpiKey ? "text" : "password"}
                      defaultValue="spicegarden@paytm"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                    <button
                      onClick={() => setShowUpiKey(!showUpiKey)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showUpiKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Configuration</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Percent className="h-4 w-4 inline mr-1" />
                    GST Rate (%)
                  </label>
                  <input
                    type="number"
                    defaultValue="18"
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Charge (%)</label>
                  <input
                    type="number"
                    defaultValue="10"
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Gateway</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Key className="h-4 w-4 inline mr-1" />
                  Razorpay API Key
                </label>
                <div className="relative">
                  <input
                    type={showApiKey ? "text" : "password"}
                    defaultValue="rzp_test_1234567890"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showApiKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Notifications</h3>
              <div className="space-y-4">
                {[
                  { title: 'New Order Alerts', description: 'Get notified when new orders are placed' },
                  { title: 'Payment Confirmations', description: 'Receive alerts for successful payments' },
                  { title: 'Customer Feedback', description: 'Get notified about new customer reviews' },
                  { title: 'Low Stock Alerts', description: 'Alerts when menu items are running low' },
                ].map((notification, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                    <div>
                      <p className="font-medium text-gray-900">{notification.title}</p>
                      <p className="text-sm text-gray-500">{notification.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Channels</h3>
              <div className="space-y-4">
                {[
                  { title: 'Email Notifications', description: 'Receive notifications via email', icon: Mail },
                  { title: 'SMS Notifications', description: 'Get SMS alerts for important updates', icon: Smartphone },
                  { title: 'WhatsApp Notifications', description: 'Receive updates on WhatsApp', icon: Phone },
                ].map((channel, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                    <div className="flex items-center space-x-3">
                      <channel.icon className="h-5 w-5 text-primary-500" />
                      <div>
                        <p className="font-medium text-gray-900">{channel.title}</p>
                        <p className="text-sm text-gray-500">{channel.description}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Security</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
              <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-blue-900">Enable 2FA</p>
                    <p className="text-sm text-blue-700">Add an extra layer of security to your account</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all"
                  >
                    Enable 2FA
                  </motion.button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Management</h3>
              <div className="space-y-3">
                {[
                  { device: 'Chrome on Windows', location: 'Mumbai, India', time: 'Active now', current: true },
                  { device: 'Safari on iPhone', location: 'Mumbai, India', time: '2 hours ago', current: false },
                  { device: 'Chrome on Android', location: 'Delhi, India', time: '1 day ago', current: false },
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                    <div>
                      <p className="font-medium text-gray-900 flex items-center">
                        {session.device}
                        {session.current && (
                          <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Current</span>
                        )}
                      </p>
                      <p className="text-sm text-gray-500">{session.location} • {session.time}</p>
                    </div>
                    {!session.current && (
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'system':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Preferences</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="h-4 w-4 inline mr-1" />
                    Language
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Marathi</option>
                    <option>Tamil</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
                    <option>Asia/Kolkata (IST)</option>
                    <option>Asia/Dubai (GST)</option>
                    <option>UTC</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature Controls</h3>
              <div className="space-y-4">
                {[
                  { title: 'Customer Feedback', description: 'Allow customers to leave reviews and ratings' },
                  { title: 'Tip Collection', description: 'Enable tip collection for staff' },
                  { title: 'Reorder Feature', description: 'Allow customers to reorder from the same table' },
                  { title: 'Table Reservations', description: 'Enable table booking functionality' },
                  { title: 'Loyalty Program', description: 'Reward frequent customers with points' },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                    <div>
                      <p className="font-medium text-gray-900">{feature.title}</p>
                      <p className="text-sm text-gray-500">{feature.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-cyan-100 transition-all text-left"
                >
                  <p className="font-medium">Export Data</p>
                  <p className="text-sm text-blue-600">Download all your restaurant data</p>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 bg-gradient-to-r from-red-50 to-rose-50 text-red-700 rounded-xl border border-red-200 hover:from-red-100 hover:to-rose-100 transition-all text-left"
                >
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-red-600">Permanently delete your account</p>
                </motion.button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-600">Manage your restaurant settings and preferences</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
          >
            <Save className="h-5 w-5" />
            <span>Save Changes</span>
          </motion.button>
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
    </DashboardLayout>
  );
};

export default Settings;