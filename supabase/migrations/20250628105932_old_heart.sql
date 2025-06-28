-- Add status column to restaurants table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'restaurants' AND column_name = 'status'
  ) THEN
    ALTER TABLE restaurants ADD COLUMN status text DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected'));
    
    -- Update existing restaurants to have approved status
    UPDATE restaurants SET status = 'approved' WHERE status IS NULL;
  END IF;
END $$;

-- Create subscription_plans table if it doesn't exist
CREATE TABLE IF NOT EXISTS subscription_plans (
  id text PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  description text NOT NULL,
  monthly_price numeric(10,2) NOT NULL,
  yearly_price numeric(10,2) NOT NULL,
  features text[] DEFAULT '{}'::text[],
  limitations text[] DEFAULT '{}'::text[],
  is_active boolean DEFAULT true,
  is_popular boolean DEFAULT false
);

-- Enable RLS on subscription_plans
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;

-- Create subscriptions table if it doesn't exist
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  restaurant_id uuid NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  plan_id text NOT NULL REFERENCES subscription_plans(id) ON DELETE RESTRICT,
  status text DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'trial')),
  billing_cycle text DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'yearly')),
  start_date timestamptz DEFAULT now(),
  end_date timestamptz NOT NULL,
  auto_renew boolean DEFAULT true,
  payment_method text CHECK (payment_method IN ('card', 'upi', 'netbanking')),
  last_payment_date timestamptz,
  next_payment_date timestamptz
);

-- Enable RLS on subscriptions
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_restaurants_status ON restaurants(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_restaurant_id ON subscriptions(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_plan_id ON subscriptions(plan_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- Insert sample subscription plans
INSERT INTO subscription_plans (id, name, description, monthly_price, yearly_price, features, limitations, is_popular) VALUES
  ('starter', 'Starter', 'Perfect for small restaurants getting started', 999.00, 9990.00, 
   ARRAY['Up to 5 tables', 'Basic menu management', 'Order tracking', 'Customer feedback'], 
   ARRAY['Limited customization', 'Basic analytics'], false),
  ('business', 'Business', 'Ideal for growing restaurants', 1999.00, 19990.00, 
   ARRAY['Up to 20 tables', 'Advanced menu management', 'Staff management', 'Analytics dashboard', 'Custom branding'], 
   ARRAY['Limited integrations'], true),
  ('premium', 'Premium', 'For established restaurants', 3999.00, 39990.00, 
   ARRAY['Unlimited tables', 'Full customization', 'Advanced analytics', 'Priority support', 'API access'], 
   ARRAY[]::text[], false),
  ('enterprise', 'Enterprise', 'For restaurant chains', 7999.00, 79990.00, 
   ARRAY['Multi-location support', 'White-label solution', 'Dedicated support', 'Custom integrations'], 
   ARRAY[]::text[], false)
ON CONFLICT (id) DO NOTHING;

-- Create sample subscriptions for existing restaurants
INSERT INTO subscriptions (restaurant_id, plan_id, end_date)
SELECT 
  id as restaurant_id,
  CASE 
    WHEN random() < 0.4 THEN 'starter'
    WHEN random() < 0.7 THEN 'business'
    WHEN random() < 0.9 THEN 'premium'
    ELSE 'enterprise'
  END as plan_id,
  now() + interval '1 year' as end_date
FROM restaurants
WHERE NOT EXISTS (
  SELECT 1 FROM subscriptions WHERE subscriptions.restaurant_id = restaurants.id
);

-- Add RLS policies for admin access
CREATE POLICY "Admins can view all subscription plans"
  ON subscription_plans
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM get_user_info(auth.uid()) ui
      WHERE ui.role = 'admin'::user_role
    )
  );

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

CREATE POLICY "Admins can view all subscriptions"
  ON subscriptions
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM get_user_info(auth.uid()) ui
      WHERE ui.role = 'admin'::user_role
    )
  );

CREATE POLICY "Admins can manage subscriptions"
  ON subscriptions
  FOR ALL
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM get_user_info(auth.uid()) ui
      WHERE ui.role = 'admin'::user_role
    )
  );

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