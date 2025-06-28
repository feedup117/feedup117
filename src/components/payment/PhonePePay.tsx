import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Loader2, AlertTriangle } from 'lucide-react';

interface PhonePePayProps {
  amount: number;
  orderId: string;
  merchantId: string;
  onSuccess: (transactionId: string) => void;
  onFailure: (error: string) => void;
}

const PhonePePay: React.FC<PhonePePayProps> = ({
  amount,
  orderId,
  merchantId,
  onSuccess,
  onFailure
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);

  // Initialize PhonePe
  useEffect(() => {
    const initPhonePe = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // In a real app, this would be an API call to generate a PhonePe payment link or QR code
        // For demo purposes, we'll simulate this
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate a fake QR code URL
        setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=phonepe://pay?merchantId=${merchantId}&transactionId=${orderId}&amount=${amount*100}`);
        
      } catch (error) {
        console.error('Error initializing PhonePe:', error);
        setError('Failed to initialize PhonePe. Please try another payment method.');
      } finally {
        setIsLoading(false);
      }
    };

    initPhonePe();
  }, [amount, orderId, merchantId]);

  // Simulate payment process
  const initiatePhonePePayment = () => {
    setIsProcessing(true);
    
    // In a real app, this would redirect to PhonePe or open the PhonePe app
    // For demo purposes, we'll simulate a successful payment after a delay
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess(`phonepe_${Date.now()}`);
    }, 3000);
  };

  // Handle manual verification
  const handleManualVerification = () => {
    setIsProcessing(true);
    
    // In a real app, this would verify the payment status with the backend
    // For demo purposes, we'll simulate a successful verification after a delay
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess(`phonepe_${Date.now()}`);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <Loader2 className="h-8 w-8 text-primary-500 animate-spin mb-4" />
        <p className="text-gray-600">Loading PhonePe...</p>
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
        <div className="inline-flex p-4 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl shadow-lg mb-4">
          <Smartphone className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">PhonePe Payment</h3>
        <p className="text-gray-600">
          Scan the QR code with PhonePe app or click the button below to pay.
        </p>
      </div>
      
      {qrCode && (
        <div className="mb-6">
          <img 
            src={qrCode} 
            alt="PhonePe QR Code" 
            className="mx-auto w-48 h-48 border border-gray-200 rounded-lg"
          />
          <p className="text-sm text-gray-500 mt-2">Scan with PhonePe app</p>
        </div>
      )}
      
      <div className="space-y-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={initiatePhonePePayment}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-4 rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Smartphone className="h-5 w-5" />
              <span>Pay ₹{amount} with PhonePe</span>
            </>
          )}
        </motion.button>
        
        <p className="text-sm text-gray-500">- OR -</p>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleManualVerification}
          disabled={isProcessing}
          className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          I've already paid
        </motion.button>
      </div>
    </div>
  );
};

export default PhonePePay;