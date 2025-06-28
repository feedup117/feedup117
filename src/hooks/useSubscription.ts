import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  limitations: string[];
  isActive?: boolean;
  isPopular?: boolean;
}

export interface Subscription {
  id: string;
  planId: string;
  restaurantId: string;
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  billingCycle: 'monthly' | 'yearly';
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  paymentMethod?: 'card' | 'upi' | 'netbanking';
  lastPaymentDate?: string;
  nextPaymentDate?: string;
}

interface UseSubscriptionReturn {
  currentPlan: Plan | null;
  subscription: Subscription | null;
  allPlans: Plan[];
  isLoading: boolean;
  error: string | null;
  isActive: boolean;
  daysUntilExpiry: number | null;
  isTrialExpired: boolean;
}

export const useSubscription = (): UseSubscriptionReturn => {
  const { user } = useAuth();
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [allPlans, setAllPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Fetch all plans
        const { data: plansData, error: plansError } = await supabase
          .from('subscription_plans')
          .select('*')
          .eq('is_active', true);

        if (plansError) {
          console.error('Error fetching plans:', plansError);
          // Use fallback plans if database query fails
          setAllPlans([
            {
              id: 'starter',
              name: 'Starter',
              description: 'Perfect for small restaurants getting started',
              monthlyPrice: 599,
              yearlyPrice: 5990,
              features: ['Up to 10 tables', 'Basic menu management', 'QR code generation'],
              limitations: ['Limited to 100 orders/month'],
              isActive: true,
              isPopular: false
            },
            {
              id: 'business',
              name: 'Business',
              description: 'Ideal for growing restaurants',
              monthlyPrice: 999,
              yearlyPrice: 9990,
              features: ['Up to 50 tables', 'Advanced menu management', 'Staff management'],
              limitations: ['Limited to 1000 orders/month'],
              isActive: true,
              isPopular: true
            }
          ]);
        } else {
          const plans = plansData.map(plan => ({
            id: plan.id,
            name: plan.name,
            description: plan.description,
            monthlyPrice: plan.monthly_price,
            yearlyPrice: plan.yearly_price,
            features: plan.features || [],
            limitations: plan.limitations || [],
            isActive: plan.is_active,
            isPopular: plan.is_popular
          }));
          setAllPlans(plans);
        }

        // Fetch current subscription
        if (user.restaurantId) {
          const { data: subData, error: subError } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('restaurant_id', user.restaurantId)
            .eq('status', 'active')
            .single();

          if (subError) {
            console.error('Error fetching subscription:', subError);
            // Set default subscription for demo
            const defaultSub: Subscription = {
              id: 'demo_sub',
              planId: 'business',
              restaurantId: user.restaurantId,
              status: 'active',
              billingCycle: 'monthly',
              startDate: '2024-12-01',
              endDate: '2025-12-01',
              autoRenew: true,
              paymentMethod: 'card',
              lastPaymentDate: '2025-01-01',
              nextPaymentDate: '2025-02-01'
            };
            setSubscription(defaultSub);

            // Set current plan based on default subscription
            const plan = allPlans.find(p => p.id === defaultSub.planId);
            if (plan) {
              setCurrentPlan(plan);
            }
          } else {
            const sub: Subscription = {
              id: subData.id,
              planId: subData.plan_id,
              restaurantId: subData.restaurant_id,
              status: subData.status,
              billingCycle: subData.billing_cycle,
              startDate: subData.start_date,
              endDate: subData.end_date,
              autoRenew: subData.auto_renew,
              paymentMethod: subData.payment_method,
              lastPaymentDate: subData.last_payment_date,
              nextPaymentDate: subData.next_payment_date
            };
            setSubscription(sub);

            // Set current plan based on subscription
            const plan = allPlans.find(p => p.id === sub.planId);
            if (plan) {
              setCurrentPlan(plan);
            }
          }
        }
      } catch (err) {
        setError('Failed to load subscription data');
        console.error(err);
        
        // Set fallback data
        setAllPlans([
          {
            id: 'business',
            name: 'Business',
            description: 'Ideal for growing restaurants',
            monthlyPrice: 999,
            yearlyPrice: 9990,
            features: ['Up to 50 tables', 'Advanced menu management'],
            limitations: [],
            isActive: true,
            isPopular: true
          }
        ]);
        
        if (user?.restaurantId) {
          const fallbackSub: Subscription = {
            id: 'fallback_sub',
            planId: 'business',
            restaurantId: user.restaurantId,
            status: 'active',
            billingCycle: 'monthly',
            startDate: '2024-12-01',
            endDate: '2025-12-01',
            autoRenew: true
          };
          setSubscription(fallbackSub);
          setCurrentPlan(allPlans[0]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptionData();
  }, [user]);

  // Calculate if subscription is active
  const isActive = subscription?.status === 'active' || subscription?.status === 'trial';

  // Calculate days until expiry
  const daysUntilExpiry = subscription?.endDate 
    ? Math.ceil((new Date(subscription.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;

  // Check if trial is expired
  const isTrialExpired = subscription?.status === 'trial' && daysUntilExpiry !== null && daysUntilExpiry <= 0;

  return {
    currentPlan,
    subscription,
    allPlans,
    isLoading,
    error,
    isActive,
    daysUntilExpiry,
    isTrialExpired
  };
};

// Helper functions for fetching plans and subscriptions
export const getPlans = async (): Promise<Plan[]> => {
  try {
    const { data, error } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('is_active', true);

    if (error) throw error;

    return data.map(plan => ({
      id: plan.id,
      name: plan.name,
      description: plan.description,
      monthlyPrice: plan.monthly_price,
      yearlyPrice: plan.yearly_price,
      features: plan.features || [],
      limitations: plan.limitations || [],
      isActive: plan.is_active,
      isPopular: plan.is_popular
    }));
  } catch (error) {
    console.error('Error fetching plans:', error);
    // Return fallback plans
    return [
      {
        id: 'starter',
        name: 'Starter',
        description: 'Perfect for small restaurants getting started',
        monthlyPrice: 599,
        yearlyPrice: 5990,
        features: ['Up to 10 tables', 'Basic menu management', 'QR code generation'],
        limitations: ['Limited to 100 orders/month'],
        isActive: true,
        isPopular: false
      },
      {
        id: 'business',
        name: 'Business',
        description: 'Ideal for growing restaurants',
        monthlyPrice: 999,
        yearlyPrice: 9990,
        features: ['Up to 50 tables', 'Advanced menu management', 'Staff management'],
        limitations: ['Limited to 1000 orders/month'],
        isActive: true,
        isPopular: true
      }
    ];
  }
};

export const getSubscription = async (restaurantId: string): Promise<Subscription | null> => {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .eq('status', 'active')
      .single();

    if (error) throw error;

    return {
      id: data.id,
      planId: data.plan_id,
      restaurantId: data.restaurant_id,
      status: data.status,
      billingCycle: data.billing_cycle,
      startDate: data.start_date,
      endDate: data.end_date,
      autoRenew: data.auto_renew,
      paymentMethod: data.payment_method,
      lastPaymentDate: data.last_payment_date,
      nextPaymentDate: data.next_payment_date
    };
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return null;
  }
};