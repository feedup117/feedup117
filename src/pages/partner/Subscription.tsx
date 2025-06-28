import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  Calendar,
  Download,
  Star,
  Zap,
  Shield,
  Users,
  BarChart3,
  Settings,
  ArrowRight,
  Gift,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SubscriptionStatus from '../../components/subscription/SubscriptionStatus';
import SubscriptionManager from '../../components/subscription/SubscriptionManager';
import { useSubscription } from '../../hooks/useSubscription';

const Subscription = () => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const { subscription } = useSubscription();

  const paymentHistory = [
    {
      id: 'PAY001',
      date: '2024-12-01',
      amount: 1299,
      plan: 'Business',
      status: 'paid',
      invoice: 'INV-2024-001',
    },
    {
      id: 'PAY002',
      date: '2024-11-01',
      amount: 1299,
      plan: 'Business',
      status: 'paid',
      invoice: 'INV-2024-002',
    },
    {
      id: 'PAY003',
      date: '2024-10-01',
      amount: 1299,
      plan: 'Business',
      status: 'paid',
      invoice: 'INV-2024-003',
    },
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription & Billing</h1>
            <p className="text-gray-600">Manage your FeedUP subscription and billing preferences</p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl hover:from-secondary-600 hover:to-secondary-700 transition-all shadow-lg"
            >
              <Download className="h-4 w-4" />
              <span>Download Invoice</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Current Plan Status */}
        <motion.div variants={itemVariants}>
          <SubscriptionStatus onUpgradeClick={() => setShowUpgradeModal(true)} />
        </motion.div>

        {/* Subscription Plans */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Available Plans</h2>
                <p className="text-sm text-gray-500">Choose the plan that fits your needs</p>
              </div>
            </div>
            
            <SubscriptionManager />
          </div>
        </motion.div>

        {/* Payment History */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Payment History</h2>
                <p className="text-sm text-gray-500">Your recent billing transactions</p>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Plan</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment, index) => (
                    <motion.tr
                      key={payment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4 text-gray-900">
                        {new Date(payment.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-gray-900">{payment.plan}</td>
                      <td className="py-4 px-4 font-semibold text-gray-900">₹{payment.amount}</td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          Paid
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                        >
                          {payment.invoice}
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Subscription FAQ */}
        <motion.div variants={itemVariants}>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Subscription Information</h3>
                <p className="text-blue-800 text-sm mb-3">
                  Your subscription automatically renews at the end of each billing cycle. You can cancel or change your plan at any time.
                </p>
                <div className="flex items-center space-x-4 text-sm text-blue-700">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Auto-renewal enabled</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>Secure payments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Upgrade Modal */}
        <SubscriptionManager 
          showUpgradeModal={showUpgradeModal} 
          onCloseModal={() => setShowUpgradeModal(false)} 
        />
      </motion.div>
    </DashboardLayout>
  );
};

export default Subscription;