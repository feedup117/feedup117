import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  X, 
  Loader2, 
  Crown,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useSubscription } from '../../hooks/useSubscription';
import { 
  createCheckoutSession, 
  loadRazorpayScript, 
  initializeRazorpayCheckout,
  CheckoutResponse
} from '../../services/razorpayService';
import PlanCard from './PlanCard';

interface SubscriptionManagerProps {
  showUpgradeModal?: boolean;
  onCloseModal?: () => void;
}

const SubscriptionManager: React.FC<SubscriptionManagerProps> = ({ 
  showUpgradeModal = false,
  onCloseModal = () => {}
}) => {
  const { user } = useAuth();
  const { 
    currentPlan, 
    subscription, 
    allPlans, 
    isLoading, 
    isActive, 
    daysUntilExpiry 
  } = useSubscription();
  
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Set selected plan to current plan on load
  useEffect(() => {
    if (currentPlan && !selectedPlanId) {
      setSelectedPlanId(currentPlan.id);
    }
  }, [currentPlan, selectedPlanId]);
  
  // Handle plan selection
  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
  };
  
  // Handle subscription checkout
  const handleCheckout = async () => {
    if (!selectedPlanId || !user?.restaurantId) return;
    
    try {
      setIsProcessing(true);
      setPaymentStatus('processing');
      setErrorMessage(null);
      
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay checkout script');
      }
      
      // Create checkout session
      const checkoutData = await createCheckoutSession(
        selectedPlanId,
        billingCycle,
        user.restaurantId
      );
      
      // Initialize Razorpay checkout
      initializeRazorpayCheckout(
        checkoutData,
        handlePaymentSuccess,
        handlePaymentFailure
      );
    } catch (error) {
      console.error('Checkout error:', error);
      setPaymentStatus('error');
      setErrorMessage('Failed to initialize checkout. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Handle successful payment
  const handlePaymentSuccess = (paymentId: string, orderId: string, signature: string) => {
    console.log('Payment successful:', { paymentId, orderId, signature });
    setPaymentStatus('success');
    
    // In a real app, you would verify the payment on your server
    // and update the subscription status
    
    // Close modal after delay
    setTimeout(() => {
      onCloseModal();
      // Refresh page to update subscription status
      window.location.reload();
    }, 2000);
  };
  
  // Handle payment failure
  const handlePaymentFailure = (error: any) => {
    console.error('Payment failed:', error);
    setPaymentStatus('error');
    setErrorMessage('Payment failed. Please try again.');
    setIsProcessing(false);
  };
  
  // Get selected plan details
  const selectedPlan = allPlans.find(plan => plan.id === selectedPlanId);
  
  // Calculate amount based on selected plan and billing cycle
  const amount = selectedPlan 
    ? billingCycle === 'monthly' 
      ? selectedPlan.monthlyPrice 
      : selectedPlan.yearlyPrice
    : 0;

  return (
    <div className="space-y-8">
      {/* Billing Cycle Toggle */}
      <div className="flex justify-center">
        <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
          <div className="flex items-center space-x-4">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <motion.button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                billingCycle === 'yearly' ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            >
              <motion.div
                animate={{ x: billingCycle === 'yearly' ? 28 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg"
              />
            </motion.button>
            <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
              >
                Save 20%
              </motion.span>
            )}
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              currentPlanId={currentPlan?.id}
              billingCycle={billingCycle}
              onSelectPlan={handleSelectPlan}
            />
          ))}
        </div>
      )}

      {/* Upgrade Modal */}
      <AnimatePresence>
        {showUpgradeModal && selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl border border-white/20 p-8 max-w-md w-full"
            >
              {paymentStatus === 'success' ? (
                <div className="text-center py-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
                  <p className="text-gray-600 mb-6">Your subscription has been updated successfully.</p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onCloseModal}
                    className="px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold"
                  >
                    Close
                  </motion.button>
                </div>
              ) : paymentStatus === 'error' ? (
                <div className="text-center py-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <X className="h-8 w-8 text-red-600" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
                  <p className="text-gray-600 mb-2">{errorMessage || 'An error occurred during payment processing.'}</p>
                  <p className="text-gray-500 text-sm mb-6">Please try again or contact support.</p>
                  <div className="flex space-x-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPaymentStatus('idle')}
                      className="px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold"
                    >
                      Try Again
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onCloseModal}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <div className={`inline-flex p-4 bg-gradient-to-br ${
                      selectedPlan.id === 'starter' ? 'from-blue-500 to-cyan-500' :
                      selectedPlan.id === 'business' ? 'from-primary-500 to-primary-600' :
                      selectedPlan.id === 'premium' ? 'from-purple-500 to-violet-500' :
                      'from-gray-700 to-gray-900'
                    } rounded-2xl shadow-lg mb-4`}>
                      <Crown className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Upgrade to {selectedPlan.name}
                    </h2>
                    <p className="text-gray-600">{selectedPlan.description}</p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-700">Plan Cost</span>
                      <span className="font-bold text-gray-900">
                        ₹{billingCycle === 'yearly' ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice}
                        /{billingCycle === 'yearly' ? 'year' : 'month'}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <div className="flex justify-between items-center mb-4 text-green-600">
                        <span>Yearly Discount</span>
                        <span className="font-bold">
                          -₹{(selectedPlan.monthlyPrice * 12) - selectedPlan.yearlyPrice}
                        </span>
                      </div>
                    )}
                    <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-primary-600">
                        ₹{billingCycle === 'yearly' ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCheckout}
                      disabled={isProcessing}
                      className={`w-full py-3 bg-gradient-to-r ${
                        selectedPlan.id === 'starter' ? 'from-blue-500 to-cyan-500' :
                        selectedPlan.id === 'business' ? 'from-primary-500 to-primary-600' :
                        selectedPlan.id === 'premium' ? 'from-purple-500 to-violet-500' :
                        'from-gray-700 to-gray-900'
                      } text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 ${
                        isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-5 w-5" />
                          <span>Upgrade Now</span>
                        </>
                      )}
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onCloseModal}
                      disabled={isProcessing}
                      className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubscriptionManager;