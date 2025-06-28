import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Copy, CheckCircle, Loader2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { generateUpiQrData } from '../../services/paymentService';

interface StaticUPIPayProps {
  amount: number;
  orderId: string;
  upiId: string;
  onSuccess: (transactionId: string) => void;
  onFailure: (error: string) => void;
}

const StaticUPIPay: React.FC<StaticUPIPayProps> = ({
  amount,
  orderId,
  upiId,
  onSuccess,
  onFailure
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate UPI QR code data
  const upiQrData = generateUpiQrData(upiId, amount, orderId, 'FeedUP Payment');

  // Copy UPI ID to clipboard
  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle manual payment confirmation
  const handlePaymentConfirmation = () => {
    setIsProcessing(true);
    
    // In a real app, this would notify the server about the manual payment
    // For demo purposes, we'll simulate a successful payment after a delay
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess(`upi_${Date.now()}`);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
      <div className="mb-6">
        <div className="inline-flex p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-lg mb-4">
          <QrCode className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">UPI Payment</h3>
        <p className="text-gray-600">
          Scan the QR code with any UPI app to pay ₹{amount}
        </p>
      </div>
      
      <div className="mb-6">
        <div className="bg-white p-4 rounded-xl border border-gray-200 inline-block">
          <QRCodeSVG 
            value={upiQrData}
            size={200}
            level="H"
            includeMargin={true}
          />
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <p className="text-gray-700 font-medium">UPI ID:</p>
          <p className="font-mono bg-gray-100 px-2 py-1 rounded">{upiId}</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={copyUpiId}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
          >
            {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </motion.button>
        </div>
        <p className="text-sm text-gray-500">
          Open any UPI app, scan the QR code or pay to the UPI ID above
        </p>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handlePaymentConfirmation}
        disabled={isProcessing}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Verifying Payment...</span>
          </>
        ) : (
          <>
            <CheckCircle className="h-5 w-5" />
            <span>I've Completed the Payment</span>
          </>
        )}
      </motion.button>
    </div>
  );
};

export default StaticUPIPay;