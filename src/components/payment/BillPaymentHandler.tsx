import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Smartphone, 
  QrCode, 
  CheckCircle, 
  Loader2, 
  AlertTriangle 
} from 'lucide-react';
import { getPaymentSettings } from '../../services/paymentService';
import RazorpayPay from './RazorpayPay';
import PhonePePay from './PhonePePay';
import StaticUPIPay from './StaticUPIPay';

interface BillPaymentHandlerProps {
  amount: number;
  tableId: string;
  orderId: string;
  onSuccess: (transactionId: string, method: string) => void;
  onFailure: (error: string) => void;
}

const BillPaymentHandler: React.FC<BillPaymentHandlerProps> = ({
  amount,
  tableId,
  orderId,
  onSuccess,
  onFailure
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'phonepe' | 'upi' | null>(null);
  const [paymentSettings, setPaymentSettings] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch payment settings on component mount
  useEffect(() => {
    const fetchPaymentSettings = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const settings = await getPaymentSettings();
        setPaymentSettings(settings);
        
        // Determine which payment method to use based on settings
        if (settings.preferredProvider === 'razorpay' && settings.razorpay.enabled) {
          setPaymentMethod('razorpay');
        } else if (settings.preferredProvider === 'phonepe' && settings.phonepe.enabled) {
          setPaymentMethod('phonepe');
        } else if (settings.upi.enabled) {
          setPaymentMethod('upi');
        } else {
          // Fallback to UPI if no other method is available
          setPaymentMethod('upi');
          setError('No payment gateway configured. Falling back to UPI payment.');
        }
      } catch (error) {
        console.error('Error fetching payment settings:', error);
        setError('Failed to load payment options. Falling back to UPI payment.');
        setPaymentMethod('upi');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentSettings();
  }, []);

  // Handle payment method change
  const handlePaymentMethodChange = (method: 'razorpay' | 'phonepe' | 'upi') => {
    setPaymentMethod(method);
  };

  // Render payment method options
  const renderPaymentMethodOptions = () => {
    return (
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Payment Method</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paymentSettings?.razorpay.enabled && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePaymentMethodChange('razorpay')}
              className={`p-4 rounded-xl border-2 transition-all ${
                paymentMethod === 'razorpay'
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Razorpay</p>
                  <p className="text-xs text-gray-500">Cards, UPI, Wallets & more</p>
                </div>
              </div>
            </motion.button>
          )}
          
          {paymentSettings?.phonepe.enabled && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePaymentMethodChange('phonepe')}
              className={`p-4 rounded-xl border-2 transition-all ${
                paymentMethod === 'phonepe'
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg">
                  <Smartphone className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">PhonePe</p>
                  <p className="text-xs text-gray-500">UPI, Wallet & more</p>
                </div>
              </div>
            </motion.button>
          )}
          
          {paymentSettings?.upi.enabled && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePaymentMethodChange('upi')}
              className={`p-4 rounded-xl border-2 transition-all ${
                paymentMethod === 'upi'
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                  <QrCode className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">UPI QR</p>
                  <p className="text-xs text-gray-500">Direct UPI payment</p>
                </div>
              </div>
            </motion.button>
          )}
        </div>
      </div>
    );
  };

  // Render payment component based on selected method
  const renderPaymentComponent = () => {
    if (!paymentMethod || !paymentSettings) return null;
    
    switch (paymentMethod) {
      case 'razorpay':
        return (
          <RazorpayPay
            amount={amount}
            orderId={orderId}
            keyId={paymentSettings.razorpay.keyId}
            onSuccess={(transactionId) => onSuccess(transactionId, 'razorpay')}
            onFailure={onFailure}
          />
        );
      case 'phonepe':
        return (
          <PhonePePay
            amount={amount}
            orderId={orderId}
            merchantId={paymentSettings.phonepe.merchantId}
            onSuccess={(transactionId) => onSuccess(transactionId, 'phonepe')}
            onFailure={onFailure}
          />
        );
      case 'upi':
        return (
          <StaticUPIPay
            amount={amount}
            orderId={orderId}
            upiId={paymentSettings.upi.upiId}
            onSuccess={(transactionId) => onSuccess(transactionId, 'upi')}
            onFailure={onFailure}
          />
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <Loader2 className="h-8 w-8 text-primary-500 animate-spin mb-4" />
        <p className="text-gray-600">Loading payment options...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
            <p className="text-yellow-700">{error}</p>
          </div>
        </div>
      )}
      
      {renderPaymentMethodOptions()}
      
      <AnimatePresence mode="wait">
        <motion.div
          key={paymentMethod}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderPaymentComponent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BillPaymentHandler;