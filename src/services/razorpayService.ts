import axios from 'axios';

// Base URL for API calls
const API_URL = import.meta.env.VITE_API_URL || 'https://api.feedup.com';

// Razorpay API endpoints
const ENDPOINTS = {
  PLANS: '/api/subscription/plans',
  SUBSCRIPTIONS: '/api/subscription/subscriptions',
  CHECKOUT: '/api/subscription/checkout',
};

// Plan interface
export interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  limitations: string[];
  popular?: boolean;
}

// Subscription interface
export interface Subscription {
  id: string;
  planId: string;
  partnerId: string;
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  billingCycle: 'monthly' | 'yearly';
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  paymentMethod?: 'card' | 'upi' | 'netbanking';
  lastPaymentDate?: string;
  nextPaymentDate?: string;
}

// Checkout response interface
export interface CheckoutResponse {
  orderId: string;
  subscriptionId: string;
  razorpayKeyId: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  prefillEmail: string;
  prefillContact: string;
}

// Get all subscription plans
export const getPlans = async (): Promise<Plan[]> => {
  try {
    // In a real app, this would be an API call
    // const response = await axios.get(`${API_URL}${ENDPOINTS.PLANS}`);
    // return response.data;
    
    // For demo purposes, return mock data
    return [
      {
        id: 'starter',
        name: 'Starter',
        description: 'Perfect for small restaurants getting started',
        monthlyPrice: 599,
        yearlyPrice: 5990,
        features: [
          'Up to 10 tables',
          'Basic menu management',
          'QR code generation',
          'Order tracking',
          'Basic analytics',
          'Email support'
        ],
        limitations: [
          'Limited to 100 orders/month',
          'Basic reporting only',
          'No staff management'
        ]
      },
      {
        id: 'business',
        name: 'Business',
        description: 'Ideal for growing restaurants',
        monthlyPrice: 999,
        yearlyPrice: 9990,
        features: [
          'Up to 50 tables',
          'Advanced menu management',
          'Staff management (up to 10)',
          'Advanced analytics',
          'Customer CRM',
          'POS integration',
          'Priority support',
          'Custom branding'
        ],
        limitations: [
          'Limited to 1000 orders/month',
          'Basic integrations only'
        ],
        popular: true
      },
      {
        id: 'premium',
        name: 'Premium',
        description: 'For established restaurants',
        monthlyPrice: 1799,
        yearlyPrice: 17990,
        features: [
          'Unlimited tables',
          'Multi-location support',
          'Unlimited staff',
          'Advanced CRM',
          'Inventory management',
          'Advanced integrations',
          'White-label solution',
          '24/7 phone support',
          'Custom features'
        ],
        limitations: []
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        description: 'For large restaurant chains',
        monthlyPrice: 2999,
        yearlyPrice: 29990,
        features: [
          'Everything in Premium',
          'Unlimited locations',
          'Advanced reporting',
          'API access',
          'Dedicated account manager',
          'Custom development',
          'SLA guarantee',
          'Training & onboarding'
        ],
        limitations: []
      }
    ];
  } catch (error) {
    console.error('Error fetching plans:', error);
    throw error;
  }
};

// Get current subscription for a partner
export const getSubscription = async (partnerId: string): Promise<Subscription | null> => {
  try {
    // In a real app, this would be an API call
    // const response = await axios.get(`${API_URL}${ENDPOINTS.SUBSCRIPTIONS}/${partnerId}`);
    // return response.data;
    
    // For demo purposes, return mock data
    return {
      id: 'sub_123456',
      planId: 'business',
      partnerId: partnerId,
      status: 'active',
      billingCycle: 'monthly',
      startDate: '2024-12-01',
      endDate: '2025-12-01',
      autoRenew: true,
      paymentMethod: 'card',
      lastPaymentDate: '2025-01-01',
      nextPaymentDate: '2025-02-01'
    };
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return null;
  }
};

// Create Razorpay checkout session
export const createCheckoutSession = async (
  planId: string,
  billingCycle: 'monthly' | 'yearly',
  partnerId: string
): Promise<CheckoutResponse> => {
  try {
    // In a real app, this would be an API call
    // const response = await axios.post(`${API_URL}${ENDPOINTS.CHECKOUT}`, {
    //   planId,
    //   billingCycle,
    //   partnerId
    // });
    // return response.data;
    
    // For demo purposes, return mock data
    const plans = await getPlans();
    const selectedPlan = plans.find(plan => plan.id === planId);
    
    if (!selectedPlan) {
      throw new Error('Plan not found');
    }
    
    const amount = billingCycle === 'monthly' ? selectedPlan.monthlyPrice : selectedPlan.yearlyPrice;
    
    return {
      orderId: 'order_' + Math.random().toString(36).substring(2, 15),
      subscriptionId: 'sub_' + Math.random().toString(36).substring(2, 15),
      razorpayKeyId: 'rzp_test_1234567890',
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      name: 'FeedUP',
      description: `${selectedPlan.name} Plan (${billingCycle})`,
      prefillEmail: 'partner@example.com',
      prefillContact: '9876543210'
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

// Cancel subscription
export const cancelSubscription = async (subscriptionId: string): Promise<boolean> => {
  try {
    // In a real app, this would be an API call
    // await axios.post(`${API_URL}${ENDPOINTS.SUBSCRIPTIONS}/${subscriptionId}/cancel`);
    
    // For demo purposes, just return success
    return true;
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    throw error;
  }
};

// Update subscription (change plan)
export const updateSubscription = async (
  subscriptionId: string,
  newPlanId: string,
  newBillingCycle?: 'monthly' | 'yearly'
): Promise<Subscription> => {
  try {
    // In a real app, this would be an API call
    // const response = await axios.put(`${API_URL}${ENDPOINTS.SUBSCRIPTIONS}/${subscriptionId}`, {
    //   planId: newPlanId,
    //   billingCycle: newBillingCycle
    // });
    // return response.data;
    
    // For demo purposes, return mock data
    return {
      id: subscriptionId,
      planId: newPlanId,
      partnerId: 'partner_123',
      status: 'active',
      billingCycle: newBillingCycle || 'monthly',
      startDate: '2024-12-01',
      endDate: '2025-12-01',
      autoRenew: true,
      paymentMethod: 'card',
      lastPaymentDate: new Date().toISOString().split('T')[0],
      nextPaymentDate: '2025-02-01'
    };
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
};

// Load Razorpay script
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Initialize Razorpay checkout
export const initializeRazorpayCheckout = (
  checkoutData: CheckoutResponse,
  onSuccess: (paymentId: string, orderId: string, signature: string) => void,
  onFailure: (error: any) => void
) => {
  const options = {
    key: checkoutData.razorpayKeyId,
    amount: checkoutData.amount,
    currency: checkoutData.currency,
    name: checkoutData.name,
    description: checkoutData.description,
    order_id: checkoutData.orderId,
    prefill: {
      email: checkoutData.prefillEmail,
      contact: checkoutData.prefillContact,
    },
    handler: function (response: any) {
      onSuccess(
        response.razorpay_payment_id,
        response.razorpay_order_id,
        response.razorpay_signature
      );
    },
    modal: {
      ondismiss: function () {
        onFailure('Checkout form closed');
      },
    },
    theme: {
      color: '#f97316',
    },
  };

  // @ts-ignore - Razorpay is loaded via script
  const razorpayInstance = new window.Razorpay(options);
  razorpayInstance.open();
};