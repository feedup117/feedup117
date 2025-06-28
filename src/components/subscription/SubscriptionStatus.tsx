import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle, AlertCircle, Crown, ArrowRight } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';

interface SubscriptionStatusProps {
  onUpgradeClick: () => void;
}

const SubscriptionStatus: React.FC<SubscriptionStatusProps> = ({ onUpgradeClick }) => {
  const { 
    currentPlan, 
    subscription, 
    isLoading, 
    isActive, 
    daysUntilExpiry, 
    isTrialExpired 
  } = useSubscription();

  if (isLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If no subscription or plan, show trial/upgrade message
  if (!subscription || !currentPlan) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-900">Free Trial</h3>
              <p className="text-blue-700">Explore FeedUP features for 7 days</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onUpgradeClick}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg flex items-center space-x-2"
          >
            <span>Upgrade Now</span>
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    );
  }

  // If subscription is expired or trial expired
  if (!isActive || isTrialExpired) {
    return (
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-900">Subscription Expired</h3>
              <p className="text-red-700">Your access to premium features has ended</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onUpgradeClick}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 transition-all shadow-lg flex items-center space-x-2"
          >
            <span>Renew Now</span>
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    );
  }

  // Active subscription
  return (
    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border border-primary-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className={`p-3 bg-gradient-to-br ${
            currentPlan.id === 'starter' ? 'from-blue-500 to-cyan-500' :
            currentPlan.id === 'business' ? 'from-primary-500 to-primary-600' :
            currentPlan.id === 'premium' ? 'from-purple-500 to-violet-500' :
            'from-gray-700 to-gray-900'
          } rounded-xl shadow-lg`}>
            <Crown className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Current Plan: {currentPlan.name}</h3>
            <p className="text-gray-600">{currentPlan.description}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary-600">
            ₹{subscription.billingCycle === 'monthly' ? currentPlan.monthlyPrice : Math.round(currentPlan.yearlyPrice / 12)}
            <span className="text-sm text-gray-500">/month</span>
          </p>
          <p className="text-sm text-gray-500">
            Billed {subscription.billingCycle === 'monthly' ? 'monthly' : 'annually'}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-white/60 rounded-xl">
          <Calendar className="h-5 w-5 text-primary-500 mx-auto mb-1" />
          <p className="text-sm text-gray-600">Next Billing</p>
          <p className="font-bold text-gray-900">{subscription.nextPaymentDate}</p>
        </div>
        <div className="text-center p-3 bg-white/60 rounded-xl">
          <Clock className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
          <p className="text-sm text-gray-600">Days Remaining</p>
          <p className="font-bold text-gray-900">{daysUntilExpiry} days</p>
        </div>
        <div className="text-center p-3 bg-white/60 rounded-xl">
          <CheckCircle className="h-5 w-5 text-green-500 mx-auto mb-1" />
          <p className="text-sm text-gray-600">Status</p>
          <p className="font-bold text-green-600">Active</p>
        </div>
      </div>
      
      {/* Upgrade button if not on highest plan */}
      {currentPlan.id !== 'enterprise' && (
        <div className="mt-4 text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onUpgradeClick}
            className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg text-sm"
          >
            Upgrade Plan
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionStatus;