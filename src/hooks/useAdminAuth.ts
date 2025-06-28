import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setIsAdmin(false);
          setLoading(false);
          navigate('/admin/login');
          return;
        }
        
        // Check if user has admin role
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();
        
        if (error || !data) {
          console.error('Error fetching user role:', error);
          setIsAdmin(false);
          setLoading(false);
          navigate('/admin/login');
          return;
        }
        
        const isUserAdmin = data.role === 'admin';
        setIsAdmin(isUserAdmin);
        
        if (!isUserAdmin) {
          navigate('/admin/login');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        navigate('/admin/login');
      } finally {
        setLoading(false);
      }
    };
    
    checkAdminStatus();
  }, [navigate]);

  return { isAdmin, loading };
}