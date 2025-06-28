import axios from 'axios';
import { 
  PaymentSettings, 
  GlobalPaymentSettings, 
  PaymentLog, 
  PaymentStats 
} from '../types/payment';

// Base URL for API calls
const API_URL = import.meta.env.VITE_API_URL || 'https://api.feedup.com';

// Mock payment logs for demo purposes
const mockPaymentLogs: PaymentLog[] = [
  {
    id: 'log1',
    transactionId: 'txn_123456789',
    orderId: 'order_123456',
    partnerId: 'partner1',
    partnerName: 'Spice Garden',
    amount: 720,
    provider: 'razorpay',
    status: 'success',
    timestamp: new Date(Date.now() - 30 * 60000).toISOString(), // 30 minutes ago
    metadata: {
      paymentId: 'pay_123456789',
      method: 'upi',
      vpa: 'customer@upi'
    }
  },
  {
    id: 'log2',
    transactionId: 'txn_987654321',
    orderId: 'order_987654',
    partnerId: 'partner2',
    partnerName: 'Pizza Paradise',
    amount: 450,
    provider: 'phonepe',
    status: 'success',
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(), // 2 hours ago
    metadata: {
      paymentId: 'pay_987654321',
      method: 'card',
      last4: '4242'
    }
  },
  {
    id: 'log3',
    transactionId: 'txn_456789123',
    orderId: 'order_456789',
    partnerId: 'partner1',
    partnerName: 'Spice Garden',
    amount: 350,
    provider: 'upi',
    status: 'success',
    timestamp: new Date(Date.now() - 5 * 3600000).toISOString(), // 5 hours ago
  },
  {
    id: 'log4',
    transactionId: 'txn_789123456',
    orderId: 'order_789123',
    partnerId: 'partner3',
    partnerName: 'Burger Barn',
    amount: 280,
    provider: 'razorpay',
    status: 'failed',
    timestamp: new Date(Date.now() - 8 * 3600000).toISOString(), // 8 hours ago
    errorMessage: 'Payment authentication failed',
    metadata: {
      error_code: 'BAD_REQUEST_ERROR',
      description: 'Authentication failed with the payment gateway'
    }
  },
  {
    id: 'log5',
    transactionId: 'txn_321654987',
    orderId: 'order_321654',
    partnerId: 'partner4',
    partnerName: 'Cafe Connect',
    amount: 180,
    provider: 'phonepe',
    status: 'pending',
    timestamp: new Date(Date.now() - 10 * 3600000).toISOString(), // 10 hours ago
  },
  {
    id: 'log6',
    transactionId: 'txn_654987321',
    orderId: 'order_654987',
    partnerId: 'partner2',
    partnerName: 'Pizza Paradise',
    amount: 520,
    provider: 'razorpay',
    status: 'refunded',
    timestamp: new Date(Date.now() - 24 * 3600000).toISOString(), // 24 hours ago
    metadata: {
      refund_id: 'ref_123456',
      refund_reason: 'Customer request'
    }
  }
];

// Get payment settings for a partner
export const getPaymentSettings = async (): Promise<PaymentSettings> => {
  try {
    // In a real app, this would be an API call
    // const response = await axios.get(`${API_URL}/payment-settings`);
    // return response.data;
    
    // For demo purposes, return mock data
    return {
      preferredProvider: 'razorpay',
      razorpay: {
        enabled: true,
        keyId: 'rzp_test_1234567890',
        keySecret: '••••••••••••••••'
      },
      phonepe: {
        enabled: false,
        merchantId: '',
        saltKey: '',
        saltIndex: '1'
      },
      upi: {
        enabled: true,
        upiId: 'restaurant@upi'
      }
    };
  } catch (error) {
    console.error('Error fetching payment settings:', error);
    throw error;
  }
};

// Update payment settings for a partner
export const updatePaymentSettings = async (settings: PaymentSettings): Promise<void> => {
  try {
    // In a real app, this would be an API call
    // await axios.put(`${API_URL}/payment-settings`, settings);
    
    // For demo purposes, simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Payment settings updated:', settings);
  } catch (error) {
    console.error('Error updating payment settings:', error);
    throw error;
  }
};

// Test payment gateway connection
export const testPaymentGateway = async (
  provider: 'razorpay' | 'phonepe',
  credentials: any
): Promise<{ success: boolean; message: string }> => {
  try {
    // In a real app, this would be an API call
    // const response = await axios.post(`${API_URL}/test-payment-gateway`, {
    //   provider,
    //   credentials
    // });
    // return response.data;
    
    // For demo purposes, simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate success/failure based on credentials
    if (provider === 'razorpay' && credentials.keyId && credentials.keySecret) {
      return {
        success: true,
        message: 'Razorpay connection successful! Your account is properly configured.'
      };
    } else if (provider === 'phonepe' && credentials.merchantId && credentials.saltKey) {
      return {
        success: true,
        message: 'PhonePe connection successful! Your account is properly configured.'
      };
    } else {
      return {
        success: false,
        message: `Failed to connect to ${provider}. Please check your credentials.`
      };
    }
  } catch (error) {
    console.error(`Error testing ${provider} gateway:`, error);
    return {
      success: false,
      message: `Connection error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

// Get global payment settings (admin only)
export const getGlobalPaymentSettings = async (): Promise<GlobalPaymentSettings> => {
  try {
    // In a real app, this would be an API call
    // const response = await axios.get(`${API_URL}/admin/payment-settings`);
    // return response.data;
    
    // For demo purposes, return mock data
    return {
      razorpay: {
        enabled: true,
        defaultKeyId: 'rzp_test_global12345',
        defaultKeySecret: '••••••••••••••••'
      },
      phonepe: {
        enabled: true,
        defaultMerchantId: 'MERCHANTUAT',
        defaultSaltKey: '••••••••••••••••',
        defaultSaltIndex: '1'
      },
      paymentOptions: {
        allowUpi: true,
        allowCards: true,
        allowNetBanking: true,
        allowWallets: true
      }
    };
  } catch (error) {
    console.error('Error fetching global payment settings:', error);
    throw error;
  }
};

// Update global payment settings (admin only)
export const updateGlobalPaymentSettings = async (settings: GlobalPaymentSettings): Promise<void> => {
  try {
    // In a real app, this would be an API call
    // await axios.put(`${API_URL}/admin/payment-settings`, settings);
    
    // For demo purposes, simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Global payment settings updated:', settings);
  } catch (error) {
    console.error('Error updating global payment settings:', error);
    throw error;
  }
};

// Get payment logs (admin only)
export const getPaymentLogs = async (): Promise<PaymentLog[]> => {
  try {
    // In a real app, this would be an API call
    // const response = await axios.get(`${API_URL}/admin/payment-logs`);
    // return response.data;
    
    // For demo purposes, return mock data
    return mockPaymentLogs;
  } catch (error) {
    console.error('Error fetching payment logs:', error);
    throw error;
  }
};

// Get payment statistics (admin only)
export const getPaymentStats = async (): Promise<PaymentStats> => {
  try {
    // In a real app, this would be an API call
    // const response = await axios.get(`${API_URL}/admin/payment-stats`);
    // return response.data;
    
    // For demo purposes, calculate stats from mock logs
    const totalAmount = mockPaymentLogs.reduce((sum, log) => sum + log.amount, 0);
    const totalCount = mockPaymentLogs.length;
    
    const razorpayLogs = mockPaymentLogs.filter(log => log.provider === 'razorpay');
    const razorpayAmount = razorpayLogs.reduce((sum, log) => sum + log.amount, 0);
    const razorpayCount = razorpayLogs.length;
    
    const phonepeLogs = mockPaymentLogs.filter(log => log.provider === 'phonepe');
    const phonepeAmount = phonepeLogs.reduce((sum, log) => sum + log.amount, 0);
    const phonepeCount = phonepeLogs.length;
    
    const upiLogs = mockPaymentLogs.filter(log => log.provider === 'upi');
    const upiAmount = upiLogs.reduce((sum, log) => sum + log.amount, 0);
    const upiCount = upiLogs.length;
    
    return {
      totalAmount,
      totalCount,
      razorpayAmount,
      razorpayCount,
      phonepeAmount,
      phonepeCount,
      upiAmount,
      upiCount,
      successCount: mockPaymentLogs.filter(log => log.status === 'success').length,
      failedCount: mockPaymentLogs.filter(log => log.status === 'failed').length,
      pendingCount: mockPaymentLogs.filter(log => log.status === 'pending').length,
      refundedCount: mockPaymentLogs.filter(log => log.status === 'refunded').length
    };
  } catch (error) {
    console.error('Error fetching payment stats:', error);
    throw error;
  }
};

// Process payment
export const processPayment = async (
  orderId: string,
  amount: number,
  provider: 'razorpay' | 'phonepe' | 'upi',
  metadata?: any
): Promise<{ success: boolean; transactionId: string; redirectUrl?: string }> => {
  try {
    // In a real app, this would be an API call
    // const response = await axios.post(`${API_URL}/process-payment`, {
    //   orderId,
    //   amount,
    //   provider,
    //   metadata
    // });
    // return response.data;
    
    // For demo purposes, simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate a random transaction ID
    const transactionId = `txn_${Math.random().toString(36).substring(2, 15)}`;
    
    // For demo, always return success
    return {
      success: true,
      transactionId,
      redirectUrl: provider === 'razorpay' || provider === 'phonepe' 
        ? `https://checkout.${provider}.com/pay/${transactionId}` 
        : undefined
    };
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};

// Verify payment
export const verifyPayment = async (
  transactionId: string,
  provider: 'razorpay' | 'phonepe' | 'upi',
  verificationData: any
): Promise<{ success: boolean; message: string }> => {
  try {
    // In a real app, this would be an API call
    // const response = await axios.post(`${API_URL}/verify-payment`, {
    //   transactionId,
    //   provider,
    //   verificationData
    // });
    // return response.data;
    
    // For demo purposes, simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, always return success
    return {
      success: true,
      message: 'Payment verified successfully'
    };
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

// Generate UPI QR code data
export const generateUpiQrData = (
  upiId: string,
  amount: number,
  orderId: string,
  name: string = 'FeedUP Payment'
): string => {
  // Format according to UPI QR code specification
  return `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&am=${amount}&tr=${encodeURIComponent(orderId)}&cu=INR`;
};