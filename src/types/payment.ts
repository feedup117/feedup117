// Payment settings for a partner
export interface PaymentSettings {
  preferredProvider: 'razorpay' | 'phonepe' | 'upi';
  razorpay: {
    enabled: boolean;
    keyId: string;
    keySecret: string;
  };
  phonepe: {
    enabled: boolean;
    merchantId: string;
    saltKey: string;
    saltIndex: string;
  };
  upi: {
    enabled: boolean;
    upiId: string;
  };
}

// Global payment settings (admin only)
export interface GlobalPaymentSettings {
  razorpay: {
    enabled: boolean;
    defaultKeyId: string;
    defaultKeySecret: string;
  };
  phonepe: {
    enabled: boolean;
    defaultMerchantId: string;
    defaultSaltKey: string;
    defaultSaltIndex: string;
  };
  paymentOptions: {
    allowUpi: boolean;
    allowCards: boolean;
    allowNetBanking: boolean;
    allowWallets: boolean;
  };
}

// Payment log entry
export interface PaymentLog {
  id: string;
  transactionId: string;
  orderId: string;
  partnerId: string;
  partnerName: string;
  amount: number;
  provider: 'razorpay' | 'phonepe' | 'upi';
  status: 'success' | 'failed' | 'pending' | 'refunded';
  timestamp: string;
  errorMessage?: string;
  metadata?: any;
}

// Payment statistics
export interface PaymentStats {
  totalAmount: number;
  totalCount: number;
  razorpayAmount: number;
  razorpayCount: number;
  phonepeAmount: number;
  phonepeCount: number;
  upiAmount: number;
  upiCount: number;
  successCount: number;
  failedCount: number;
  pendingCount: number;
  refundedCount: number;
}

// Payment method types
export type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'wallet' | 'cash';

// Payment request
export interface PaymentRequest {
  orderId: string;
  amount: number;
  currency: string;
  description: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  metadata?: any;
}

// Payment response
export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  status: 'success' | 'failed' | 'pending';
  message?: string;
  paymentMethod?: PaymentMethod;
  paymentDetails?: any;
}