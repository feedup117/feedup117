import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// These environment variables are set in the .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Function to check if the user has admin role
export const isAdmin = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  
  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();
  
  if (error || !data) return false;
  return data.role === 'admin';
};

// Function to get the current user's profile
export const getUserProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();
  
  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  
  return data;
};

// Function to log an audit event
export const logAuditEvent = async (
  action: string,
  category: 'auth' | 'partner' | 'subscription' | 'system' | 'payment' | 'feature',
  severity: 'info' | 'warning' | 'error' | 'critical',
  details: string,
  metadata?: any
) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  
  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();
  
  const { data, error } = await supabase
    .from('audit_logs')
    .insert({
      action,
      category,
      severity,
      user_id: user.id,
      user_role: profile?.role || 'unknown',
      ip_address: '127.0.0.1', // In a real app, you'd get this from the request
      details,
      metadata,
      timestamp: new Date().toISOString()
    })
    .select();
  
  if (error) {
    console.error('Error logging audit event:', error);
    return null;
  }
  
  return data[0];
};