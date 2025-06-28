import { supabase, logAuditEvent } from '../lib/supabase';

// Get all subscription plans
export const getSubscriptionPlans = async () => {
  const { data, error } = await supabase
    .from('subscription_plans')
    .select('*')
    .order('monthly_price', { ascending: true });
  
  if (error) {
    console.error('Error fetching subscription plans:', error);
    return [];
  }
  
  return data.map(plan => ({
    id: plan.id,
    name: plan.name,
    description: plan.description,
    monthlyPrice: plan.monthly_price,
    yearlyPrice: plan.yearly_price,
    features: plan.features,
    limitations: plan.limitations,
    popular: plan.is_popular
  }));
};

// Save a subscription plan
export const saveSubscriptionPlan = async (plan: any) => {
  const { data, error } = await supabase
    .from('subscription_plans')
    .upsert({
      id: plan.id,
      name: plan.name,
      description: plan.description,
      monthly_price: plan.monthlyPrice,
      yearly_price: plan.yearlyPrice,
      features: plan.features,
      limitations: plan.limitations,
      is_active: true,
      is_popular: plan.popular || false
    })
    .select();
  
  if (error) {
    console.error('Error saving subscription plan:', error);
    throw error;
  }
  
  // Log the audit event
  await logAuditEvent(
    plan.id ? 'Plan Updated' : 'Plan Created',
    'subscription',
    'info',
    `Subscription plan ${plan.name} was ${plan.id ? 'updated' : 'created'}`,
    { planId: plan.id, planName: plan.name }
  );
  
  return data[0];
};

// Delete a subscription plan
export const deleteSubscriptionPlan = async (planId: string) => {
  // First get the plan details for the audit log
  const { data: planData } = await supabase
    .from('subscription_plans')
    .select('name')
    .eq('id', planId)
    .single();
  
  const { error } = await supabase
    .from('subscription_plans')
    .delete()
    .eq('id', planId);
  
  if (error) {
    console.error('Error deleting subscription plan:', error);
    throw error;
  }
  
  // Log the audit event
  await logAuditEvent(
    'Plan Deleted',
    'subscription',
    'warning',
    `Subscription plan ${planData?.name || planId} was deleted`,
    { planId, planName: planData?.name }
  );
  
  return true;
};

// Get all feature flags
export const getFeatureFlags = async () => {
  const { data, error } = await supabase
    .from('platform_settings')
    .select('*')
    .eq('key', 'feature_flags')
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      // Setting doesn't exist yet, return default flags
      return {
        tipCollection: true,
        customerFeedback: true,
        tokenSystem: false,
        servantUpiPayments: true,
        internalCrmTracking: true,
        menuScheduling: false,
        posSystem: true,
        staffShiftScheduling: true,
        customBranding: true
      };
    }
    console.error('Error fetching feature flags:', error);
    throw error;
  }
  
  return data.value;
};

// Update feature flags
export const updateFeatureFlags = async (flags: any) => {
  const { data, error } = await supabase
    .from('platform_settings')
    .upsert({
      key: 'feature_flags',
      value: flags,
      updated_at: new Date().toISOString()
    })
    .select();
  
  if (error) {
    console.error('Error updating feature flags:', error);
    throw error;
  }
  
  // Log the audit event
  await logAuditEvent(
    'Feature Flags Updated',
    'feature',
    'info',
    'Platform feature flags were updated',
    { flags }
  );
  
  return data[0];
};

// Get global payment settings
export const getGlobalPaymentSettings = async () => {
  const { data, error } = await supabase
    .from('platform_settings')
    .select('*')
    .eq('key', 'payment_settings')
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      // Setting doesn't exist yet, return default settings
      return {
        razorpay: {
          enabled: true,
          defaultKeyId: '',
          defaultKeySecret: ''
        },
        phonepe: {
          enabled: false,
          defaultMerchantId: '',
          defaultSaltKey: '',
          defaultSaltIndex: '1'
        },
        paymentOptions: {
          allowUpi: true,
          allowCards: true,
          allowNetBanking: true,
          allowWallets: true
        }
      };
    }
    console.error('Error fetching global payment settings:', error);
    throw error;
  }
  
  return data.value;
};

// Update global payment settings
export const updateGlobalPaymentSettings = async (settings: any) => {
  const { data, error } = await supabase
    .from('platform_settings')
    .upsert({
      key: 'payment_settings',
      value: settings,
      updated_at: new Date().toISOString()
    })
    .select();
  
  if (error) {
    console.error('Error updating global payment settings:', error);
    throw error;
  }
  
  // Log the audit event
  await logAuditEvent(
    'Payment Settings Updated',
    'payment',
    'info',
    'Global payment settings were updated',
    { providers: Object.keys(settings).filter(k => settings[k].enabled) }
  );
  
  return data[0];
};

// Get all payment logs
export const getPaymentLogs = async () => {
  const { data, error } = await supabase
    .from('payment_logs')
    .select(`
      *,
      restaurants:restaurant_id (
        name
      )
    `)
    .order('timestamp', { ascending: false });
  
  if (error) {
    console.error('Error fetching payment logs:', error);
    return [];
  }
  
  return data.map(log => ({
    id: log.id,
    transactionId: log.transaction_id,
    orderId: log.order_id,
    partnerId: log.restaurant_id,
    partnerName: log.restaurants?.name || 'Unknown',
    amount: log.amount,
    provider: log.provider,
    status: log.status,
    timestamp: log.timestamp,
    errorMessage: log.error_message,
    metadata: log.metadata
  }));
};

// Get all feedback
export const getAllFeedback = async () => {
  const { data, error } = await supabase
    .from('feedback')
    .select(`
      *,
      restaurants:restaurant_id (
        name
      )
    `)
    .order('timestamp', { ascending: false });
  
  if (error) {
    console.error('Error fetching feedback:', error);
    return [];
  }
  
  return data.map(feedback => ({
    id: feedback.id,
    partnerId: feedback.restaurant_id,
    partnerName: feedback.restaurants?.name || 'Unknown',
    customerName: feedback.customer_name,
    rating: feedback.rating,
    comment: feedback.comment,
    categories: feedback.categories,
    timestamp: feedback.timestamp,
    tableNumber: feedback.table_number,
    orderTotal: feedback.order_total,
    tipAmount: feedback.tip_amount,
    isPositive: feedback.rating >= 4
  }));
};

// Get all audit logs
export const getAuditLogs = async () => {
  const { data, error } = await supabase
    .from('audit_logs')
    .select('*')
    .order('timestamp', { ascending: false });
  
  if (error) {
    console.error('Error fetching audit logs:', error);
    return [];
  }
  
  return data;
};

// Get all demo accounts
export const getDemoAccounts = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('is_demo', true);
  
  if (error) {
    console.error('Error fetching demo accounts:', error);
    return [];
  }
  
  return data.map(account => ({
    id: account.id,
    username: account.email,
    password: '••••••••', // Never return actual passwords
    role: account.role,
    status: account.is_active ? 'active' : 'inactive',
    lastLogin: account.last_login_at,
    loginCount: account.login_count || 0,
    createdAt: account.created_at,
    expiresAt: account.expires_at,
    usageLimit: account.usage_limit,
    usageCount: account.usage_count || 0,
    isPasswordVisible: false
  }));
};

// Create a demo account
export const createDemoAccount = async (accountData: any) => {
  // In a real app, you would use Supabase Auth to create the user
  // and then add the profile data
  
  // For demo purposes, we'll just create a profile record
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      email: accountData.email,
      name: accountData.name || 'Demo User',
      role: accountData.role,
      is_active: true,
      is_demo: true,
      created_at: new Date().toISOString(),
      expires_at: accountData.expiresAt,
      usage_limit: accountData.usageLimit,
      usage_count: 0
    })
    .select();
  
  if (error) {
    console.error('Error creating demo account:', error);
    throw error;
  }
  
  // Log the audit event
  await logAuditEvent(
    'Demo Account Created',
    'auth',
    'info',
    `Demo account ${accountData.email} was created`,
    { role: accountData.role }
  );
  
  return data[0];
};