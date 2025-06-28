import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface WebhookTesterProps {
  onTest: () => Promise<void>;
}

const WebhookTester: React.FC<WebhookTesterProps> = ({ onTest }) => {
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  const handleTest = async () => {
    try {
      setStatus('testing');
      await onTest();
      setStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch (error) {
      setStatus('error');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleTest}
        disabled={status === 'testing'}
        className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
      >
        {status === 'testing' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Testing...</span>
          </>
        ) : (
          <>
            <RefreshCw className="h-4 w-4" />
            <span>Test Webhook Connection</span>
          </>
        )}
      </motion.button>
      
      {status === 'success' && (
        <div className="flex items-center space-x-2 text-green-600">
          <CheckCircle className="h-5 w-5" />
          <span>Connection successful!</span>
        </div>
      )}
      
      {status === 'error' && (
        <div className="flex items-center space-x-2 text-red-600">
          <XCircle className="h-5 w-5" />
          <span>Connection failed</span>
        </div>
      )}
    </div>
  );
};

export default WebhookTester;