import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  CheckCircle, 
  ChefHat, 
  ShoppingCart,
  Receipt,
  CreditCard,
  ArrowLeft,
  Plus,
  Bell,
  Star,
  UtensilsCrossed,
  Zap,
  Timer,
  Wifi,
  MapPin,
  User,
  Phone,
  MessageCircle,
  Gift,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import IndianRupee from '../components/icons/IndianRupee';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const WaitingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, tableId } = location.state || {};
  const [orderStatus, setOrderStatus] = useState<'placed' | 'preparing' | 'ready' | 'served'>('placed');
  const [estimatedTime, setEstimatedTime] = useState(15);
  const [tipPercentage, setTipPercentage] = useState(10);
  const [customTip, setCustomTip] = useState('');
  const [billRequested, setBillRequested] = useState(false);
  const [showTipSelector, setShowTipSelector] = useState(false);

  useEffect(() => {
    if (!cart || !tableId) {
      navigate('/');
      return;
    }

    // Simulate order progression
    const timer1 = setTimeout(() => {
      setOrderStatus('preparing');
      setEstimatedTime(10);
    }, 3000);

    const timer2 = setTimeout(() => {
      setOrderStatus('ready');
      setEstimatedTime(5);
    }, 8000);

    const timer3 = setTimeout(() => {
      setOrderStatus('served');
      setEstimatedTime(0);
    }, 12000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [cart, tableId, navigate]);

  if (!cart || !tableId) {
    return null;
  }

  const subtotal = cart.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0);
  const gstAmount = Math.round((subtotal * 18) / 100); // 18% GST
  const tipAmount = customTip ? parseInt(customTip) : Math.round((subtotal * tipPercentage) / 100);
  const totalAmount = subtotal + gstAmount + tipAmount;

  const handleOrderMore = () => {
    navigate(`/scan/${tableId}`);
  };

  const handleAskForBill = () => {
    setBillRequested(true);
    // Simulate notification to server
    setTimeout(() => {
      alert('Bill request sent to server. They will be with you shortly!');
    }, 500);
  };

  const handlePayNow = () => {
    navigate('/payment', { state: { amount: totalAmount, tableId } });
  };

  const getStatusConfig = () => {
    switch (orderStatus) {
      case 'placed':
        return {
          icon: Clock,
          title: 'Order Placed!',
          message: 'Your order has been sent to the kitchen. Our chef is preparing your delicious meal.',
          color: 'from-blue-500 to-cyan-500',
          bgColor: 'from-blue-50 to-cyan-50',
          progress: 25,
        };
      case 'preparing':
        return {
          icon: ChefHat,
          title: 'Being Prepared',
          message: 'Our chef is carefully preparing your order with fresh ingredients.',
          color: 'from-orange-500 to-amber-500',
          bgColor: 'from-orange-50 to-amber-50',
          progress: 60,
        };
      case 'ready':
        return {
          icon: Bell,
          title: 'Order Ready!',
          message: 'Your food is ready! Our server will bring it to your table shortly.',
          color: 'from-green-500 to-emerald-500',
          bgColor: 'from-green-50 to-emerald-50',
          progress: 90,
        };
      case 'served':
        return {
          icon: CheckCircle,
          title: 'Enjoy Your Meal!',
          message: 'Your order has been served. Enjoy your delicious meal!',
          color: 'from-purple-500 to-violet-500',
          bgColor: 'from-purple-50 to-violet-50',
          progress: 100,
        };
    }
  };

  const statusConfig = getStatusConfig();

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
                onClick={() => navigate('/')}
                className="p-2 hover:bg-primary-50 rounded-xl transition-colors text-gray-600 hover:text-primary-600"
              >
                <ArrowLeft className="h-5 w-5" />
              </motion.button>
              <div>
                <div className="flex items-center space-x-3">
                  <h1 className="text-xl font-bold text-gray-900">
                    Table {tableId?.replace('demo-table-', '')}
                  </h1>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center space-x-2 bg-gradient-to-r from-success-100 to-green-100 text-success-700 px-3 py-1 rounded-full border border-success-200"
                  >
                    <Wifi className="h-3 w-3" />
                    <span className="text-xs font-medium">Connected</span>
                  </motion.div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                  <div className="flex items-center space-x-1">
                    <UtensilsCrossed className="h-3 w-3" />
                    <span>Spice Garden Restaurant</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>Order #{tableId?.replace('demo-table-', 'SG2025')}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Order Status Card */}
          <motion.div variants={itemVariants}>
            <div className={`bg-gradient-to-br ${statusConfig.bgColor} rounded-3xl shadow-xl border border-white/20 p-8 text-center relative overflow-hidden`}>
              {/* Animated Chef Illustration */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="mb-6"
              >
                <div className={`inline-flex p-6 rounded-full bg-gradient-to-br ${statusConfig.color} shadow-2xl`}>
                  <statusConfig.icon className="h-12 w-12 text-white" />
                </div>
              </motion.div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">{statusConfig.title}</h2>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">{statusConfig.message}</p>
              
              {estimatedTime > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-2xl shadow-lg border border-white/30"
                >
                  <Timer className="h-5 w-5" />
                  <span className="font-semibold">Estimated time: {estimatedTime} minutes</span>
                </motion.div>
              )}

              {/* Progress Bar */}
              <div className="mt-8">
                <div className="w-full bg-white/30 rounded-full h-3 mb-6 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${statusConfig.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${statusConfig.color} rounded-full shadow-lg`}
                  />
                </div>

                {/* Status Steps */}
                <div className="grid grid-cols-4 gap-4 text-sm">
                  {[
                    { label: 'Placed', icon: CheckCircle, status: 'placed' },
                    { label: 'Preparing', icon: ChefHat, status: 'preparing' },
                    { label: 'Ready', icon: Bell, status: 'ready' },
                    { label: 'Served', icon: CheckCircle, status: 'served' },
                  ].map((step, index) => {
                    const isActive = ['placed', 'preparing', 'ready', 'served'].indexOf(orderStatus) >= index;
                    const isCurrent = ['placed', 'preparing', 'ready', 'served'].indexOf(orderStatus) === index;
                    
                    return (
                      <div key={step.status} className={`flex flex-col items-center ${isActive ? 'text-gray-700' : 'text-gray-400'}`}>
                        <motion.div
                          animate={isCurrent ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 1, repeat: Infinity }}
                          className={`p-3 rounded-full mb-2 ${isActive ? `bg-gradient-to-br ${statusConfig.color}` : 'bg-gray-200'}`}
                        >
                          <step.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                        </motion.div>
                        <span className="font-medium">{step.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl">
                    <Receipt className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>
                    <p className="text-sm text-gray-500">Your delicious selections</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  {cart.map((item: CartItem) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white text-sm font-bold">{item.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity} × ₹{item.price}</p>
                        </div>
                      </div>
                      <p className="text-lg font-bold text-gray-900">₹{item.price * item.quantity}</p>
                    </motion.div>
                  ))}
                </div>
                
                {/* Bill Breakdown */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>GST (18%)</span>
                      <span>₹{gstAmount}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tip ({tipPercentage}%)</span>
                      <span>₹{tipAmount}</span>
                    </div>
                  </div>
                  <div className="border-t pt-4 flex justify-between items-center text-xl font-bold">
                    <span>Total Amount</span>
                    <span className="text-primary-600">₹{totalAmount}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Actions & Payment */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Tip Selector */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl">
                    <Gift className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Add Tip</h3>
                    <p className="text-sm text-gray-500">Show appreciation for service</p>
                  </div>
                </div>
                
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
                          : 'border-gray-200 hover:border-gray-300 bg-white'
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
                
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">Tip Amount: <span className="font-bold text-primary-600">₹{tipAmount}</span></p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleOrderMore}
                  className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-2xl hover:from-secondary-600 hover:to-secondary-700 transition-all shadow-lg hover:shadow-xl"
                >
                  <Plus className="h-5 w-5" />
                  <span className="font-semibold">Order More Food</span>
                </motion.button>

                {!billRequested ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAskForBill}
                    className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="font-semibold">Ask for Bill</span>
                  </motion.button>
                ) : (
                  <div className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-2xl border border-green-200">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-semibold">Bill Requested</span>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePayNow}
                  className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl"
                >
                  <CreditCard className="h-5 w-5" />
                  <span className="font-semibold">Pay Now (₹{totalAmount})</span>
                </motion.button>
              </div>

              {/* Help Section */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-900 mb-2">Need Assistance?</h4>
                    <p className="text-blue-800 text-sm mb-3">
                      Our staff is here to help. Wave to get attention or use the call button on your table.
                    </p>
                    <div className="text-sm text-blue-600">
                      <p>📞 Call: +91 98765 43210</p>
                      <p>🏪 Spice Garden Restaurant</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Restaurant Info */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-8 text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg">
                  <UtensilsCrossed className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    Spice Garden Restaurant
                  </h3>
                  <p className="text-gray-600">Authentic flavors, modern experience</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-semibold">4.8 Rating</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="font-semibold">10 AM - 11 PM</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="font-semibold">Mumbai, India</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-2">
                  Powered by <span className="font-semibold text-primary-500">FeedUP</span>
                </p>
                <p className="text-xs text-gray-400">
                  Experience seamless dining with QR code ordering
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default WaitingPage;