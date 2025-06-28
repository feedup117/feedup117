import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  Star, 
  Download, 
  Home,
  MessageCircle,
  Heart,
  Gift,
  Share2,
  Instagram,
  MapPin,
  Clock,
  Phone,
  Mail,
  UtensilsCrossed,
  Sparkles,
  Award,
  Users,
  Camera
} from 'lucide-react';
import TipCard from '../components/payment/TipCard';

const ThankYouPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, tableId, tipAmount, transactionId, paymentMethod } = location.state || {};
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [showTipCard, setShowTipCard] = useState(false);

  if (!amount || !tableId) {
    navigate('/');
    return null;
  }

  const handleFeedbackSubmit = () => {
    if (rating === 0) return;
    
    setFeedbackSubmitted(true);
    // In a real app, this would submit to the backend
    setTimeout(() => {
      // Auto redirect after feedback submission
    }, 2000);
  };

  const downloadBill = () => {
    // In a real app, this would generate and download a PDF
    alert('Bill downloaded successfully!');
  };

  const shareExperience = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Great dining experience at Spice Garden!',
        text: 'Just had an amazing meal at Spice Garden restaurant. The QR ordering system made it so convenient!',
        url: window.location.origin
      });
    }
  };

  const handleShowTipCard = () => {
    setShowTipCard(true);
  };

  const handleTipComplete = () => {
    setShowTipCard(false);
    alert('Thank you for your tip! The server has been notified.');
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
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const sparkleVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-success-50 via-white to-primary-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-success-200/20 to-primary-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-primary-200/20 to-secondary-200/20 rounded-full blur-3xl"
        />
        
        {/* Floating Sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            variants={sparkleVariants}
            animate="animate"
            style={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            className="text-yellow-400"
          >
            <Sparkles className="h-4 w-4" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Success Message */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-center relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-success-500 via-primary-500 to-secondary-500" />
              
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="mb-6"
              >
                <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-success-500 to-emerald-500 shadow-2xl">
                  <CheckCircle className="h-16 w-16 text-white" />
                </div>
              </motion.div>

              <motion.h1 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="text-4xl font-bold text-gray-900 mb-4"
              >
                Payment Successful! 🎉
              </motion.h1>
              
              <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
                Thank you for dining with us! Your payment of <span className="font-bold text-success-600">₹{amount}</span> has been processed successfully.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-orange-100 text-primary-700 px-4 py-2 rounded-full border border-primary-200">
                  <Award className="h-4 w-4" />
                  <span className="font-medium">Transaction ID: {transactionId || 'TXN2025001234'}</span>
                </div>
                {tipAmount > 0 && (
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 px-4 py-2 rounded-full border border-yellow-200">
                    <Gift className="h-4 w-4" />
                    <span className="font-medium">Tip: ₹{tipAmount}</span>
                  </div>
                )}
                {paymentMethod && (
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-4 py-2 rounded-full border border-blue-200">
                    {paymentMethod === 'razorpay' && <CreditCard className="h-4 w-4" />}
                    {paymentMethod === 'phonepe' && <Smartphone className="h-4 w-4" />}
                    {paymentMethod === 'upi' && <QrCode className="h-4 w-4" />}
                    <span className="font-medium capitalize">{paymentMethod}</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadBill}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-lg hover:shadow-xl"
                >
                  <Download className="h-5 w-5" />
                  <span>Download Bill</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/')}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl"
                >
                  <Home className="h-5 w-5" />
                  <span>Back to Home</span>
                </motion.button>
              </div>

              {/* Decorative corner elements */}
              <div className="absolute top-4 right-4 text-yellow-400 opacity-20">
                <Sparkles className="h-8 w-8" />
              </div>
              <div className="absolute bottom-4 left-4 text-success-400 opacity-20">
                <Heart className="h-8 w-8" />
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Feedback Section */}
            <motion.div variants={itemVariants}>
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8">
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-block mb-4"
                  >
                    <div className="p-4 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl shadow-lg">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                  </motion.div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">How was your experience?</h2>
                  <p className="text-gray-600">Your feedback helps us serve you better</p>
                </div>

                <AnimatePresence mode="wait">
                  {!feedbackSubmitted ? (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      {/* Star Rating */}
                      <div className="text-center">
                        <div className="flex justify-center space-x-2 mb-4">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button
                              key={star}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoveredStar(star)}
                              onMouseLeave={() => setHoveredStar(0)}
                              className="transition-all duration-200"
                            >
                              <Star
                                className={`h-10 w-10 transition-colors ${
                                  star <= (hoveredStar || rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            </motion.button>
                          ))}
                        </div>
                        {rating > 0 && (
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-gray-600"
                          >
                            {rating === 1 && 'We\'re sorry to hear that'}
                            {rating === 2 && 'We can do better'}
                            {rating === 3 && 'Good experience'}
                            {rating === 4 && 'Great experience!'}
                            {rating === 5 && 'Excellent! Thank you!'}
                          </motion.p>
                        )}
                      </div>

                      {/* Feedback Text */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tell us about your experience (optional)
                        </label>
                        <textarea
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          placeholder="Share your thoughts about the food, service, or overall experience..."
                          rows={4}
                          className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleFeedbackSubmit}
                        disabled={rating === 0}
                        className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        <MessageCircle className="h-5 w-5" />
                        <span>Submit Feedback</span>
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: 2 }}
                        className="inline-block mb-4"
                      >
                        <div className="p-4 bg-gradient-to-br from-success-500 to-emerald-500 rounded-2xl shadow-lg">
                          <CheckCircle className="h-8 w-8 text-white" />
                        </div>
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Thank you for your feedback!</h3>
                      <p className="text-gray-600">Your review helps us improve our service.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Tip & Restaurant Info */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Tip Section */}
              <AnimatePresence mode="wait">
                {!showTipCard ? (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 text-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl shadow-lg mb-4"
                    >
                      <Gift className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Tip Your Server</h3>
                    <p className="text-gray-600 mb-6">
                      {tipAmount > 0 
                        ? `You've added a ₹${tipAmount} tip. Would you like to add more?` 
                        : "Would you like to tip your server for their excellent service?"}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleShowTipCard}
                      className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-xl hover:from-yellow-600 hover:to-amber-600 transition-all shadow-lg"
                    >
                      {tipAmount > 0 ? "Add More Tip" : "Add Tip"}
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <TipCard
                      servantName="Priya Sharma"
                      servantUpiId="priya.sharma@upi"
                      suggestedAmount={100}
                      onTipComplete={handleTipComplete}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Restaurant Info */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8">
                <div className="text-center mb-6">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg mb-4"
                  >
                    <UtensilsCrossed className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
                    Spice Garden Restaurant
                  </h3>
                  <p className="text-gray-600">Authentic flavors, modern experience</p>
                </div>
                
                <div className="space-y-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-primary-500" />
                    <span>123 Food Street, Gourmet District, Mumbai, Maharashtra 400001</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-primary-500" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-primary-500" />
                    <span>Open: 10:00 AM - 11:00 PM</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>4.8 Rating • 1,200+ Reviews</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={shareExperience}
                      className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                    >
                      <Share2 className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full transition-colors"
                    >
                      <Camera className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-8 text-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block mb-4"
              >
                <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg">
                  <UtensilsCrossed className="h-6 w-6 text-white" />
                </div>
              </motion.div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2">Thank you for choosing Spice Garden!</h3>
              <p className="text-gray-600 mb-4">We hope you enjoyed your dining experience with us.</p>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
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

// Add missing components for the demo
function CreditCard(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function Smartphone(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}

function QrCode(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h1" />
      <path d="M21 12v.01" />
      <path d="M12 21v-1" />
    </svg>
  );
}

export default ThankYouPage;