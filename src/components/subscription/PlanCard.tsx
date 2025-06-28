import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Crown, Zap, Shield, Building2 } from 'lucide-react';
import { Plan } from '../../services/razorpayService';

interface PlanCardProps {
  plan: Plan;
  currentPlanId?: string | null;
  billingCycle: 'monthly' | 'yearly';
  onSelectPlan: (planId: string) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ 
  plan, 
  currentPlanId, 
  billingCycle, 
  onSelectPlan 
}) => {
  const isCurrent = currentPlanId === plan.id;
  
  // Get plan icon based on plan id
  const getPlanIcon = () => {
    switch (plan.id) {
      case 'starter':
        return Zap;
      case 'business':
        return Building2;
      case 'premium':
        return Crown;
      case 'enterprise':
        return Shield;
      default:
        return Building2;
    }
  };
  
  // Get plan color based on plan id
  const getPlanColor = () => {
    switch (plan.id) {
      case 'starter':
        return 'from-blue-500 to-cyan-500';
      case 'business':
        return 'from-primary-500 to-primary-600';
      case 'premium':
        return 'from-purple-500 to-violet-500';
      case 'enterprise':
        return 'from-gray-700 to-gray-900';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };
  
  const PlanIcon = getPlanIcon();
  const planColor = getPlanColor();
  
  // Calculate price based on billing cycle
  const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  const monthlyEquivalent = billingCycle === 'yearly' ? Math.round(plan.yearlyPrice / 12) : plan.monthlyPrice;
  
  // Calculate savings for yearly billing
  const yearlySavings = billingCycle === 'yearly' 
    ? (plan.monthlyPrice * 12) - plan.yearlyPrice 
    : 0;
  
  const savingsPercentage = Math.round((yearlySavings / (plan.monthlyPrice * 12)) * 100);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className={`relative bg-white rounded-3xl shadow-xl border-2 overflow-hidden ${
        isCurrent ? 'border-primary-500' : plan.popular ? 'border-secondary-500' : 'border-gray-200'
      } hover:shadow-2xl transition-all`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-secondary-500 to-amber-500 text-white text-center py-2 text-sm font-medium">
          Most Popular
        </div>
      )}

      {/* Current Plan Badge */}
      {isCurrent && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-center py-2 text-sm font-medium">
          Current Plan
        </div>
      )}

      <div className={`p-6 ${plan.popular || isCurrent ? 'pt-12' : ''}`}>
        {/* Plan Header */}
        <div className="text-center mb-6">
          <div className={`inline-flex p-3 bg-gradient-to-br ${planColor} rounded-2xl shadow-lg mb-4`}>
            <PlanIcon className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
          <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
          
          <div className="mb-4">
            <span className="text-4xl font-bold text-gray-900">
              ₹{billingCycle === 'yearly' ? Math.round(plan.yearlyPrice / 12) : plan.monthlyPrice}
            </span>
            <span className="text-gray-500 text-sm">/month</span>
            {billingCycle === 'yearly' && (
              <p className="text-sm text-green-600 font-medium">
                ₹{plan.yearlyPrice}/year (Save ₹{yearlySavings})
              </p>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-6">
          {plan.features.map((feature, i) => (
            <div key={i} className="flex items-center space-x-3">
              <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
          {plan.limitations.map((limitation, i) => (
            <div key={i} className="flex items-center space-x-3">
              <X className="h-4 w-4 text-red-500 flex-shrink-0" />
              <span className="text-sm text-gray-500">{limitation}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => !isCurrent && onSelectPlan(plan.id)}
          disabled={isCurrent}
          className={`w-full py-3 rounded-xl font-semibold transition-all ${
            isCurrent
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : `bg-gradient-to-r ${planColor} text-white hover:shadow-lg`
          }`}
        >
          {isCurrent ? 'Current Plan' : 'Upgrade Now'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PlanCard;