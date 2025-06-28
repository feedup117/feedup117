/*
  # Add subscription tables and policies

  1. New Tables
    - `subscription_plans` - Stores available subscription plans
    - `subscriptions` - Stores restaurant subscriptions
  2. Modifications
    - Add status column to restaurants table if it doesn't exist
  3. Security
    - Enable RLS on new tables
    - Add policies for admin and restaurant owner access
*/

-- Create subscription_plans table
CREATE TABLE IF NOT EXISTS subscription_plans (
  id text PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  description text NOT NULL,
  monthly_price numeric(10,2) NOT NULL,
  yearly_price numeric(10,2) NOT NULL,
  features text[] DEFAULT '{}',
  limitations text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  is_popular boolean DEFAULT false
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  restaurant_id uuid NOT NULL,
  plan_id text NOT NULL,
  status text DEFAULT 'active',
  billing_cycle text DEFAULT 'monthly',
  start_date timestamptz DEFAULT now(),
  end_date timestamptz NOT NULL,
  auto_renew boolean DEFAULT true,
  payment_method text,
  last_payment_date timestamptz,
  next_payment_date timestamptz
);

-- Ensure restaurants table has status column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'restaurants' AND column_name = 'status'
  ) THEN
    ALTER TABLE restaurants ADD COLUMN status text DEFAULT 'approved';
  END IF;
END $$;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_restaurant_id ON subscriptions(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_plan_id ON subscriptions(plan_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_restaurants_status ON restaurants(status);

-- Add foreign key constraints
DO $$
BEGIN
  -- Add foreign key for subscriptions -> restaurants
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'subscriptions_restaurant_id_fkey'
  ) THEN
    ALTER TABLE subscriptions 
    ADD CONSTRAINT subscriptions_restaurant_id_fkey 
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE;
  END IF;

  -- Add foreign key for subscriptions -> subscription_plans
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'subscriptions_plan_id_fkey'
  ) THEN
    ALTER TABLE subscriptions 
    ADD CONSTRAINT subscriptions_plan_id_fkey 
    FOREIGN KEY (plan_id) REFERENCES subscription_plans(id) ON DELETE RESTRICT;
  END IF;
END $$;

-- Add check constraints
ALTER TABLE subscriptions 
DROP CONSTRAINT IF EXISTS subscriptions_status_check;

ALTER TABLE subscriptions 
ADD CONSTRAINT subscriptions_status_check 
CHECK (status IN ('active', 'cancelled', 'expired', 'trial'));

ALTER TABLE subscriptions 
DROP CONSTRAINT IF EXISTS subscriptions_billing_cycle_check;

ALTER TABLE subscriptions 
ADD CONSTRAINT subscriptions_billing_cycle_check 
CHECK (billing_cycle IN ('monthly', 'yearly'));

ALTER TABLE subscriptions 
DROP CONSTRAINT IF EXISTS subscriptions_payment_method_check;

ALTER TABLE subscriptions 
ADD CONSTRAINT subscriptions_payment_method_check 
CHECK (payment_method IN ('card', 'upi', 'netbanking'));

ALTER TABLE restaurants 
DROP CONSTRAINT IF EXISTS restaurants_status_check;

ALTER TABLE restaurants 
ADD CONSTRAINT restaurants_status_check 
CHECK (status IN ('pending', 'approved', 'rejected'));

-- Enable RLS
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscription_plans
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'subscription_plans' AND policyname = 'Admins can manage subscription plans'
  ) THEN
    CREATE POLICY "Admins can manage subscription plans"
      ON subscription_plans
      FOR ALL
      TO public
      USING (
        EXISTS (
          SELECT 1 FROM get_user_info(auth.uid()) ui
          WHERE ui.role = 'admin'::user_role
        )
      );
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'subscription_plans' AND policyname = 'Public can view active subscription plans'
  ) THEN
    CREATE POLICY "Public can view active subscription plans"
      ON subscription_plans
      FOR SELECT
      TO public
      USING (is_active = true);
  END IF;
END $$;

-- RLS Policies for subscriptions
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'subscriptions' AND policyname = 'Admins can manage all subscriptions'
  ) THEN
    CREATE POLICY "Admins can manage all subscriptions"
      ON subscriptions
      FOR ALL
      TO public
      USING (
        EXISTS (
          SELECT 1 FROM get_user_info(auth.uid()) ui
          WHERE ui.role = 'admin'::user_role
        )
      );
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'subscriptions' AND policyname = 'Restaurant owners can view their subscription'
  ) THEN
    CREATE POLICY "Restaurant owners can view their subscription"
      ON subscriptions
      FOR SELECT
      TO public
      USING (
        restaurant_id IN (
          SELECT ui.restaurant_id FROM get_user_info(auth.uid()) ui
          WHERE ui.restaurant_id IS NOT NULL
        )
      );
  END IF;
END $$;

-- Insert default subscription plans
INSERT INTO subscription_plans (id, name, description, monthly_price, yearly_price, features, limitations, is_popular) 
VALUES 
  (
    'starter',
    'Starter',
    'Perfect for small restaurants getting started',
    599.00,
    5990.00,
    ARRAY['Up to 10 tables', 'Basic menu management', 'QR code generation', 'Order tracking', 'Basic analytics', 'Email support'],
    ARRAY['Limited to 100 orders/month', 'Basic reporting only', 'No staff management'],
    false
  ),
  (
    'business',
    'Business',
    'Ideal for growing restaurants',
    999.00,
    9990.00,
    ARRAY['Up to 50 tables', 'Advanced menu management', 'Staff management (up to 10)', 'Advanced analytics', 'Customer CRM', 'POS integration', 'Priority support', 'Custom branding'],
    ARRAY['Limited to 1000 orders/month', 'Basic integrations only'],
    true
  ),
  (
    'premium',
    'Premium',
    'For established restaurants',
    1799.00,
    17990.00,
    ARRAY['Unlimited tables', 'Multi-location support', 'Unlimited staff', 'Advanced CRM', 'Inventory management', 'Advanced integrations', 'White-label solution', '24/7 phone support', 'Custom features'],
    ARRAY[]::text[],
    false
  ),
  (
    'enterprise',
    'Enterprise',
    'For large restaurant chains',
    2999.00,
    29990.00,
    ARRAY['Everything in Premium', 'Unlimited locations', 'Advanced reporting', 'API access', 'Dedicated account manager', 'Custom development', 'SLA guarantee', 'Training & onboarding'],
    ARRAY[]::text[],
    false
  )
ON CONFLICT (id) DO NOTHING;