export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          email: string
          name: string
          role: 'admin' | 'partner' | 'manager' | 'kitchen' | 'servant'
          restaurant_id?: string
          restaurant_name?: string
          is_active: boolean
          tip_upi_id?: string
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          name: string
          role: 'admin' | 'partner' | 'manager' | 'kitchen' | 'servant'
          restaurant_id?: string
          restaurant_name?: string
          is_active?: boolean
          tip_upi_id?: string
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          name?: string
          role?: 'admin' | 'partner' | 'manager' | 'kitchen' | 'servant'
          restaurant_id?: string
          restaurant_name?: string
          is_active?: boolean
          tip_upi_id?: string
        }
      }
      restaurants: {
        Row: {
          id: string
          created_at: string
          name: string
          owner_id: string
          gstin: string
          pan: string
          fssai?: string
          address: string
          city: string
          state: string
          pincode: string
          status: 'pending' | 'approved' | 'rejected'
          primary_color?: string
          secondary_color?: string
          logo_url?: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          owner_id: string
          gstin: string
          pan: string
          fssai?: string
          address: string
          city: string
          state: string
          pincode: string
          status?: 'pending' | 'approved' | 'rejected'
          primary_color?: string
          secondary_color?: string
          logo_url?: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          owner_id?: string
          gstin?: string
          pan?: string
          fssai?: string
          address?: string
          city?: string
          state?: string
          pincode?: string
          status?: 'pending' | 'approved' | 'rejected'
          primary_color?: string
          secondary_color?: string
          logo_url?: string
        }
      }
      subscription_plans: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string
          monthly_price: number
          yearly_price: number
          features: string[]
          limitations: string[]
          is_active: boolean
          is_popular?: boolean
        }
        Insert: {
          id: string
          created_at?: string
          name: string
          description: string
          monthly_price: number
          yearly_price: number
          features: string[]
          limitations: string[]
          is_active?: boolean
          is_popular?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string
          monthly_price?: number
          yearly_price?: number
          features?: string[]
          limitations?: string[]
          is_active?: boolean
          is_popular?: boolean
        }
      }
      subscriptions: {
        Row: {
          id: string
          created_at: string
          restaurant_id: string
          plan_id: string
          status: 'active' | 'cancelled' | 'expired' | 'trial'
          billing_cycle: 'monthly' | 'yearly'
          start_date: string
          end_date: string
          auto_renew: boolean
          payment_method?: 'card' | 'upi' | 'netbanking'
          last_payment_date?: string
          next_payment_date?: string
        }
        Insert: {
          id?: string
          created_at?: string
          restaurant_id: string
          plan_id: string
          status?: 'active' | 'cancelled' | 'expired' | 'trial'
          billing_cycle?: 'monthly' | 'yearly'
          start_date: string
          end_date: string
          auto_renew?: boolean
          payment_method?: 'card' | 'upi' | 'netbanking'
          last_payment_date?: string
          next_payment_date?: string
        }
        Update: {
          id?: string
          created_at?: string
          restaurant_id?: string
          plan_id?: string
          status?: 'active' | 'cancelled' | 'expired' | 'trial'
          billing_cycle?: 'monthly' | 'yearly'
          start_date?: string
          end_date?: string
          auto_renew?: boolean
          payment_method?: 'card' | 'upi' | 'netbanking'
          last_payment_date?: string
          next_payment_date?: string
        }
      }
      payment_settings: {
        Row: {
          id: string
          restaurant_id: string
          preferred_provider: 'razorpay' | 'phonepe' | 'upi'
          razorpay_enabled: boolean
          razorpay_key_id?: string
          razorpay_key_secret?: string
          phonepe_enabled: boolean
          phonepe_merchant_id?: string
          phonepe_salt_key?: string
          phonepe_salt_index?: string
          upi_enabled: boolean
          upi_id?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          preferred_provider?: 'razorpay' | 'phonepe' | 'upi'
          razorpay_enabled?: boolean
          razorpay_key_id?: string
          razorpay_key_secret?: string
          phonepe_enabled?: boolean
          phonepe_merchant_id?: string
          phonepe_salt_key?: string
          phonepe_salt_index?: string
          upi_enabled?: boolean
          upi_id?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          preferred_provider?: 'razorpay' | 'phonepe' | 'upi'
          razorpay_enabled?: boolean
          razorpay_key_id?: string
          razorpay_key_secret?: string
          phonepe_enabled?: boolean
          phonepe_merchant_id?: string
          phonepe_salt_key?: string
          phonepe_salt_index?: string
          upi_enabled?: boolean
          upi_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      platform_settings: {
        Row: {
          id: string
          key: string
          value: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          created_at?: string
          updated_at?: string
        }
      }
      payment_logs: {
        Row: {
          id: string
          transaction_id: string
          order_id: string
          restaurant_id: string
          amount: number
          provider: 'razorpay' | 'phonepe' | 'upi'
          status: 'success' | 'failed' | 'pending' | 'refunded'
          timestamp: string
          error_message?: string
          metadata?: Json
        }
        Insert: {
          id?: string
          transaction_id: string
          order_id: string
          restaurant_id: string
          amount: number
          provider: 'razorpay' | 'phonepe' | 'upi'
          status: 'success' | 'failed' | 'pending' | 'refunded'
          timestamp?: string
          error_message?: string
          metadata?: Json
        }
        Update: {
          id?: string
          transaction_id?: string
          order_id?: string
          restaurant_id?: string
          amount?: number
          provider?: 'razorpay' | 'phonepe' | 'upi'
          status?: 'success' | 'failed' | 'pending' | 'refunded'
          timestamp?: string
          error_message?: string
          metadata?: Json
        }
      }
      feedback: {
        Row: {
          id: string
          restaurant_id: string
          customer_name?: string
          rating: number
          comment?: string
          categories?: string[]
          timestamp: string
          table_number: number
          order_total: number
          tip_amount?: number
        }
        Insert: {
          id?: string
          restaurant_id: string
          customer_name?: string
          rating: number
          comment?: string
          categories?: string[]
          timestamp?: string
          table_number: number
          order_total: number
          tip_amount?: number
        }
        Update: {
          id?: string
          restaurant_id?: string
          customer_name?: string
          rating?: number
          comment?: string
          categories?: string[]
          timestamp?: string
          table_number?: number
          order_total?: number
          tip_amount?: number
        }
      }
      audit_logs: {
        Row: {
          id: string
          action: string
          category: 'auth' | 'partner' | 'subscription' | 'system' | 'payment' | 'feature'
          severity: 'info' | 'warning' | 'error' | 'critical'
          timestamp: string
          user_id: string
          user_role: string
          ip_address: string
          details: string
          metadata?: Json
        }
        Insert: {
          id?: string
          action: string
          category: 'auth' | 'partner' | 'subscription' | 'system' | 'payment' | 'feature'
          severity: 'info' | 'warning' | 'error' | 'critical'
          timestamp?: string
          user_id: string
          user_role: string
          ip_address: string
          details: string
          metadata?: Json
        }
        Update: {
          id?: string
          action?: string
          category?: 'auth' | 'partner' | 'subscription' | 'system' | 'payment' | 'feature'
          severity?: 'info' | 'warning' | 'error' | 'critical'
          timestamp?: string
          user_id?: string
          user_role?: string
          ip_address?: string
          details?: string
          metadata?: Json
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}