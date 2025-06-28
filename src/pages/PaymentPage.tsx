import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft,
  Shield,
  Loader2,
  Gift,
  User,
  Phone,
  Wifi,
  Clock,
  AlertCircle,
  Zap
} from 'lucide-react';
import IndianRupee from '../components/icons/IndianRupee';
import BillPaymentHandler from '../components/payment/BillPaymentHandler';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, tableId } = location.state || {};
  const [tipPercentage, setTipPercentage] = useState(10);
  const [customTip, setCustomTip] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  if (!amount || !tableId) {
    navigate('/');
    return null;
  }

  const subtotal = amount;
  const gstAmount = Math.round((subtotal * 18) / 100); // 18% GST
  const tipAmount = customTip ? parseInt(customTip) : Math.round((subtotal * tipPercentage) / 100);
  const totalAmount = subtotal + gstAmount + tipAmount;

  // Handle successful payment
  const handlePaymentSuccess = (txnId: string, method: string) => {
    setTransactionId(txnId);
    setPaymentMethod(method);
    setPaymentSuccess(true);
    
    // Navigate to thank you page after a delay
    setTimeout(() => {
      navigate('/thank-you', { 
        state: { 
          amount: totalAmount, 
          tableId,
          tipAmount,
          transactionId: txnId,
          paymentMethod: method
        } 
      });
    }, 2000);
  };

  // Handle payment failure
  const handlePaymentFailure = (error: string) => {
    console.error('Payment failed:', error);
    alert(`Payment failed: ${error}. Please try again.`);
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

  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-200/20 to-secondary-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-secondary-200/20 to-accent-200/20 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-40 bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-primary-50 rounded-xl transition-colors text-gray-600 hover:text-primary-600"
              >
                <ArrowLeft className="h-5 w-5" />
              </motion.button>
              <div>
                <div className="flex items-center space-x-3">
                  <h1 className="text-xl font-bold text-gray-900">Secure Payment</h1>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center space-x-2 bg-gradient-to-r from-success-100 to-green-100 text-success-700 px-3 py-1 rounded-full border border-success-200"
                  >
                    <Shield className="h-3 w-3" />
                    <span className="text-xs font-medium">SSL Secured</span>
                  </motion.div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>Table {tableId?.replace('demo-table-', '')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-3 gap-8"
        >
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Success Message */}
            <AnimatePresence>
              {paymentSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Zap className="h-8 w-8 text-green-600" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-green-900 mb-2">Payment Successful!</h2>
                  <p className="text-green-700 mb-2">
                    Your payment of ₹{totalAmount} has been processed successfully.
                  </p>
                  <p className="text-green-600 text-sm">
                    Transaction ID: {transactionId}
                  </p>
                  <p className="text-green-600 text-sm">
                    Redirecting to thank you page...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Payment Handler */}
            {!paymentSuccess && (
              <motion.div variants={itemVariants}>
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6">
                  <BillPaymentHandler
                    amount={totalAmount}
                    tableId={tableId}
                    orderId={`order_${Date.now()}`}
                    onSuccess={handlePaymentSuccess}
                    onFailure={handlePaymentFailure}
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Bill Summary */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Payment Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Food Total</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%)</span>
                  <span>₹{gstAmount}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tip</span>
                  <span>₹{tipAmount}</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-xl font-bold">
                  <span>Total Amount</span>
                  <span className="text-primary-600">₹{totalAmount}</span>
                </div>
              </div>

              {/* Tip Selection */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Gift className="h-5 w-5 mr-2 text-yellow-500" />
                  Add Tip for Service
                </h3>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[0, 10, 15, 20].map((tip) => (
                    <motion.button
                      key={tip}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setTipPercentage(tip);
                        setCustomTip('');
                      }}
                      className={`p-3 text-sm rounded-xl border transition-all ${
                        tipPercentage === tip && !customTip
                          ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300 bg-white/50'
                      }`}
                    >
                      {tip}%
                    </motion.button>
                  ))}
                </div>
                
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="number"
                    placeholder="Custom tip amount"
                    value={customTip}
                    onChange={(e) => {
                      setCustomTip(e.target.value);
                      setTipPercentage(0);
                    }}
                    className="w-full pl-10 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Security Info */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-green-500 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-green-900">Secure Payment</p>
                    <p className="text-green-700">Your payment is secured with 256-bit SSL encryption</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Restaurant Details */}
            <motion.div variants={itemVariants}>
              <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Order Details</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Restaurant:</span>
                    <span className="font-medium">Spice Garden</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Table:</span>
                    <span className="font-medium">{tableId?.replace('demo-table-', '')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">{new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Processing Overlay */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-center max-w-sm mx-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-4"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                  <Zap className="h-8 w-8 text-white" />
                </div>
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Payment</h3>
              <p className="text-gray-600 mb-4">Please wait while we securely process your payment...</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                  className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentPage;