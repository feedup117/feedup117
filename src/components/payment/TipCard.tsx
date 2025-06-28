import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, CheckCircle, Loader2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { generateUpiQrData } from '../../services/paymentService';

interface TipCardProps {
  servantName: string;
  servantUpiId: string;
  suggestedAmount?: number;
  onTipComplete: () => void;
}

const TipCard: React.FC<TipCardProps> = ({
  servantName,
  servantUpiId,
  suggestedAmount = 0,
  onTipComplete
}) => {
  const [tipAmount, setTipAmount] = useState(suggestedAmount);
  const [customTip, setCustomTip] = useState('');
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Generate UPI QR code data
  const upiQrData = generateUpiQrData(
    servantUpiId, 
    customTip ? parseFloat(customTip) : tipAmount, 
    `tip_${Date.now()}`, 
    `Tip for ${servantName}`
  );

  // Copy UPI ID to clipboard
  const copyUpiId = () => {
    navigator.clipboard.writeText(servantUpiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle tip amount selection
  const handleTipSelection = (amount: number) => {
    setTipAmount(amount);
    setCustomTip('');
  };

  // Handle custom tip input
  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTip(e.target.value);
    setTipAmount(0);
  };

  // Handle tip completion
  const handleTipComplete = () => {
    setIsProcessing(true);
    
    // In a real app, this would record the tip in the system
    // For demo purposes, we'll simulate a delay
    setTimeout(() => {
      setIsProcessing(false);
      onTipComplete();
    }, 1500);
  };

  // Calculate actual tip amount
  const actualTipAmount = customTip ? parseFloat(customTip) : tipAmount;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="text-center mb-6">
        <div className="inline-flex p-4 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl shadow-lg mb-4">
          <Gift className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Tip Your Server</h3>
        <p className="text-gray-600">
          Show your appreciation to {servantName} with a tip
        </p>
      </div>
      
      <div className="mb-6">
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[50, 100, 150, 200].map((amount) => (
            <motion.button
              key={amount}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTipSelection(amount)}
              className={`p-3 text-sm rounded-xl border transition-all ${
                tipAmount === amount && !customTip
                  ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              ₹{amount}
            </motion.button>
          ))}
        </div>
        
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500">₹</span>
          </div>
          <input
            type="number"
            placeholder="Custom amount"
            value={customTip}
            onChange={handleCustomTipChange}
            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>
      </div>
      
      {(tipAmount > 0 || customTip) && (
        <div className="mb-6">
          <div className="bg-white p-4 rounded-xl border border-gray-200 inline-block">
            <QRCodeSVG 
              value={upiQrData}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Scan to tip ₹{actualTipAmount}
          </p>
        </div>
      )}
      
      <div className="mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <p className="text-gray-700 font-medium">UPI ID:</p>
          <p className="font-mono bg-gray-100 px-2 py-1 rounded">{servantUpiId}</p>
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
        onClick={handleTipComplete}
        disabled={isProcessing || (tipAmount === 0 && !customTip)}
        className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white py-4 rounded-xl hover:from-yellow-600 hover:to-amber-600 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Gift className="h-5 w-5" />
            <span>I've Sent the Tip</span>
          </>
        )}
      </motion.button>
      
      <p className="text-xs text-gray-500 text-center mt-4">
        Tips are sent directly to the server's UPI account. FeedUP does not process or take a cut from tips.
      </p>
    </div>
  );
};

export default TipCard;