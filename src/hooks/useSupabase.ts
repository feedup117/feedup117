import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Hook for real-time subscription to a table
export function useRealtimeSubscription<T>(
  table: string,
  column?: string,
  value?: string,
  callback?: (payload: any) => void
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Initial fetch
    const fetchData = async () => {
      try {
        setLoading(true);
        let query = supabase.from(table).select('*');
        
        if (column && value) {
          query = query.eq(column, value);
        }
        
        const { data: initialData, error: initialError } = await query;
        
        if (initialError) {
          throw initialError;
        }
        
        setData(initialData as T[]);
      } catch (err) {
        setError(err as Error);
        console.error(`Error fetching data from ${table}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up real-time subscription
    const subscription = supabase
      .channel(`${table}-changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table,
          ...(column && value ? { filter: `${column}=eq.${value}` } : {})
        },
        (payload) => {
          if (callback) {
            callback(payload);
            return;
          }

          // Default handling if no callback provided
          const { eventType, new: newRecord, old: oldRecord } = payload;
          
          if (eventType === 'INSERT') {
            setData((prev) => [...prev, newRecord as T]);
          } else if (eventType === 'UPDATE') {
            setData((prev) => 
              prev.map((item) => 
                // @ts-ignore - We know id exists on the record
                item.id === newRecord.id ? newRecord as T : item
              )
            );
          } else if (eventType === 'DELETE') {
            setData((prev) => 
              prev.filter((item) => 
                // @ts-ignore - We know id exists on the record
                item.id !== oldRecord.id
              )
            );
          }
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [table, column, value]);

  return { data, loading, error };
}

// Hook for admin-specific data
export function useAdminData<T>(
  fetchFunction: () => Promise<T[]>,
  realtimeTable?: string
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin
    const checkAdmin = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setIsAdmin(false);
          return;
        }
        
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        
        if (error || !data) {
          setIsAdmin(false);
          return;
        }
        
        setIsAdmin(data.role === 'admin');
      } catch (err) {
        console.error('Error checking admin status:', err);
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, []);

  useEffect(() => {
    // Only fetch data if user is admin
    if (!isAdmin) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchFunction();
        setData(result);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching admin data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up real-time subscription if table is provided
    if (realtimeTable) {
      const subscription = supabase
        .channel(`${realtimeTable}-admin-changes`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: realtimeTable
          },
          () => {
            // Refetch data on any change
            fetchData();
          }
        )
        .subscribe();

      // Cleanup subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isAdmin, fetchFunction, realtimeTable]);

  return { data, loading, error, isAdmin };
}