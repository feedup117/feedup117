import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Loader2, AlertTriangle } from 'lucide-react';

interface RazorpayPayProps {
  amount: number;
  orderId: string;
  keyId: string;
  onSuccess: (transactionId: string) => void;
  onFailure: (error: string) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RazorpayPay: React.FC<RazorpayPayProps> = ({
  amount,
  orderId,
  keyId,
  onSuccess,
  onFailure
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise<boolean>((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => {
          setError('Failed to load Razorpay. Please try another payment method.');
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    const initRazorpay = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          setError('Failed to load Razorpay. Please try another payment method.');
        }
      } catch (error) {
        console.error('Error initializing Razorpay:', error);
        setError('Failed to initialize Razorpay. Please try another payment method.');
      } finally {
        setIsLoading(false);
      }
    };

    initRazorpay();
  }, []);

  // Open Razorpay checkout
  const openRazorpayCheckout = () => {
    if (!window.Razorpay) {
      setError('Razorpay is not available. Please try another payment method.');
      return;
    }

    setIsProcessing(true);
    
    // Create a new Razorpay instance
    const options = {
      key: keyId,
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      name: 'FeedUP',
      description: `Payment for order ${orderId}`,
      order_id: `order_${Date.now()}`, // In a real app, this would come from the backend
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9876543210'
      },
      theme: {
        color: '#f97316'
      },
      handler: function(response: any) {
        // Handle successful payment
        setIsProcessing(false);
        onSuccess(response.razorpay_payment_id);
      },
      modal: {
        ondismiss: function() {
          // Handle modal dismiss
          setIsProcessing(false);
          onFailure('Payment cancelled by user');
        }
      }
    };

    try {
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setIsProcessing(false);
      console.error('Error opening Razorpay:', error);
      setError('Failed to open Razorpay checkout. Please try another payment method.');
      onFailure('Failed to open Razorpay checkout');
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <Loader2 className="h-8 w-8 text-primary-500 animate-spin mb-4" />
        <p className="text-gray-600">Loading Razorpay...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
          <div>
            <p className="font-medium text-red-800">Payment Error</p>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
      <div className="mb-6">
        <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg mb-4">
          <CreditCard className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Razorpay Checkout</h3>
        <p className="text-gray-600">
          You'll be redirected to Razorpay's secure payment page to complete your payment.
        </p>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-left">
        <div className="flex items-start space-x-3">
          <CreditCard className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <p className="font-medium text-blue-800">Secure Payment</p>
            <p className="text-blue-700">
              Razorpay supports credit/debit cards, UPI, net banking, and wallets. Your payment information is securely processed.
            </p>
          </div>
        </div>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={openRazorpayCheckout}
        disabled={isProcessing}
        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <CreditCard className="h-5 w-5" />
            <span>Pay ₹{amount} with Razorpay</span>
          </>
        )}
      </motion.button>
    </div>
  );
};

export default RazorpayPay;