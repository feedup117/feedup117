import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

// Define user roles
export type UserRole = 'partner' | 'manager' | 'kitchen' | 'servant' | 'admin' | 'guest';

// Define permission types
export type Permission = 'read' | 'write' | 'none' | 'limited';

// Define feature access
export interface FeatureAccess {
  dashboard: Permission;
  menu: Permission;
  tables: Permission;
  orders: Permission;
  orderStatus: Permission;
  kitchen: Permission;
  requests: Permission;
  tipManagement: Permission;
  tipReports: Permission;
  analytics: Permission;
  feedback: Permission;
  crm: Permission;
  pos: Permission;
  tokenManagement: Permission;
  staff: Permission;
  subscription: Permission;
  branding: Permission;
  activityLogs: Permission;
  demoAccounts: Permission;
  featureFlags: Permission;
  addons: Permission;
  deleteData: Permission;
  clearTable: Permission;
}

// Define user interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  restaurantId?: string;
  restaurantName?: string;
  permissions: FeatureAccess;
}

// Define context interface
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  hasPermission: (feature: keyof FeatureAccess, requiredPermission: Permission) => boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define permission matrix based on roles
const rolePermissions: Record<UserRole, FeatureAccess> = {
  partner: {
    dashboard: 'write',
    menu: 'write',
    tables: 'write',
    orders: 'write',
    orderStatus: 'write',
    kitchen: 'write',
    requests: 'none',
    tipManagement: 'none',
    tipReports: 'write',
    analytics: 'write',
    feedback: 'write',
    crm: 'write',
    pos: 'write',
    tokenManagement: 'write',
    staff: 'write',
    subscription: 'limited',
    branding: 'write',
    activityLogs: 'read',
    demoAccounts: 'none',
    featureFlags: 'none',
    addons: 'limited',
    deleteData: 'limited',
    clearTable: 'write',
  },
  manager: {
    dashboard: 'limited',
    menu: 'limited',
    tables: 'limited',
    orders: 'write',
    orderStatus: 'write',
    kitchen: 'write',
    requests: 'none',
    tipManagement: 'none',
    tipReports: 'read',
    analytics: 'read',
    feedback: 'write',
    crm: 'read',
    pos: 'write',
    tokenManagement: 'write',
    staff: 'read',
    subscription: 'none',
    branding: 'read',
    activityLogs: 'read',
    demoAccounts: 'none',
    featureFlags: 'none',
    addons: 'none',
    deleteData: 'none',
    clearTable: 'write',
  },
  kitchen: {
    dashboard: 'none',
    menu: 'none',
    tables: 'none',
    orders: 'read',
    orderStatus: 'limited',
    kitchen: 'write',
    requests: 'none',
    tipManagement: 'none',
    tipReports: 'none',
    analytics: 'none',
    feedback: 'none',
    crm: 'none',
    pos: 'none',
    tokenManagement: 'read',
    staff: 'none',
    subscription: 'none',
    branding: 'none',
    activityLogs: 'none',
    demoAccounts: 'none',
    featureFlags: 'none',
    addons: 'none',
    deleteData: 'none',
    clearTable: 'none',
  },
  servant: {
    dashboard: 'none',
    menu: 'none',
    tables: 'none',
    orders: 'limited',
    orderStatus: 'limited',
    kitchen: 'none',
    requests: 'write',
    tipManagement: 'write',
    tipReports: 'limited',
    analytics: 'none',
    feedback: 'limited',
    crm: 'none',
    pos: 'none',
    tokenManagement: 'none',
    staff: 'none',
    subscription: 'none',
    branding: 'none',
    activityLogs: 'none',
    demoAccounts: 'none',
    featureFlags: 'none',
    addons: 'none',
    deleteData: 'none',
    clearTable: 'none',
  },
  admin: {
    dashboard: 'write',
    menu: 'read',
    tables: 'read',
    orders: 'read',
    orderStatus: 'none',
    kitchen: 'read',
    requests: 'none',
    tipManagement: 'none',
    tipReports: 'write',
    analytics: 'write',
    feedback: 'write',
    crm: 'write',
    pos: 'read',
    tokenManagement: 'read',
    staff: 'none',
    subscription: 'write',
    branding: 'write',
    activityLogs: 'write',
    demoAccounts: 'write',
    featureFlags: 'write',
    addons: 'write',
    deleteData: 'write',
    clearTable: 'write',
  },
  guest: {
    dashboard: 'none',
    menu: 'none',
    tables: 'none',
    orders: 'none',
    orderStatus: 'none',
    kitchen: 'none',
    requests: 'none',
    tipManagement: 'none',
    tipReports: 'none',
    analytics: 'none',
    feedback: 'none',
    crm: 'none',
    pos: 'none',
    tokenManagement: 'none',
    staff: 'none',
    subscription: 'none',
    branding: 'none',
    activityLogs: 'none',
    demoAccounts: 'none',
    featureFlags: 'none',
    addons: 'none',
    deleteData: 'none',
    clearTable: 'none',
  },
};

// Define mock users for demo purposes
const mockUsers: Record<string, User> = {
  'partner@feedup.com': {
    id: 'user1',
    name: 'Rajesh Singh',
    email: 'partner@feedup.com',
    role: 'partner',
    restaurantId: 'rest1',
    restaurantName: 'Spice Garden',
    permissions: rolePermissions.partner,
  },
  'manager@feedup.com': {
    id: 'user2',
    name: 'Amit Manager',
    email: 'manager@feedup.com',
    role: 'manager',
    restaurantId: 'rest1',
    restaurantName: 'Spice Garden',
    permissions: rolePermissions.manager,
  },
  'kitchen@feedup.com': {
    id: 'user3',
    name: 'Rahul Singh',
    email: 'kitchen@feedup.com',
    role: 'kitchen',
    restaurantId: 'rest1',
    restaurantName: 'Spice Garden',
    permissions: rolePermissions.kitchen,
  },
  'servant@feedup.com': {
    id: 'user4',
    name: 'Priya Sharma',
    email: 'servant@feedup.com',
    role: 'servant',
    restaurantId: 'rest1',
    restaurantName: 'Spice Garden',
    permissions: rolePermissions.servant,
  },
  'admin@feedup.com': {
    id: 'admin1',
    name: 'System Admin',
    email: 'admin@feedup.com',
    role: 'admin',
    permissions: rolePermissions.admin,
  },
};

// Define provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Create provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Check for Supabase session first
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Get user data from Supabase
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (error || !userData) {
            console.error('Error fetching user data:', error);
            // Fall back to local storage if Supabase fails
            const storedUser = localStorage.getItem('feedup_user');
            if (storedUser) {
              setUser(JSON.parse(storedUser));
            }
          } else {
            // Create user object from Supabase data
            const userObj: User = {
              id: userData.id,
              name: userData.name,
              email: userData.email,
              role: userData.role,
              restaurantId: userData.restaurant_id,
              restaurantName: userData.restaurant_name,
              permissions: rolePermissions[userData.role as UserRole]
            };
            
            setUser(userObj);
            // Update local storage for backup
            localStorage.setItem('feedup_user', JSON.stringify(userObj));
          }
        } else {
          // Fall back to local storage if no Supabase session
          const storedUser = localStorage.getItem('feedup_user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
        // Fall back to local storage if error
        const storedUser = localStorage.getItem('feedup_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();
  }, []);

  // Login function
  const login = async (email: string, password: string, role?: UserRole): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Try Supabase auth first
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Supabase auth error:', error);
        
        // Fall back to mock users for demo
        const mockUser = mockUsers[email.toLowerCase()];
        
        if (mockUser && (role ? mockUser.role === role : true)) {
          // Store user in local storage
          localStorage.setItem('feedup_user', JSON.stringify(mockUser));
          setUser(mockUser);
          return true;
        }
        
        return false;
      }
      
      // If Supabase auth succeeds, get user data
      if (data.user) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();
        
        if (userError || !userData) {
          console.error('Error fetching user data:', userError);
          return false;
        }
        
        // Check if role matches if specified
        if (role && userData.role !== role) {
          return false;
        }
        
        // Create user object
        const userObj: User = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          restaurantId: userData.restaurant_id,
          restaurantName: userData.restaurant_name,
          permissions: rolePermissions[userData.role as UserRole]
        };
        
        // Store user in local storage
        localStorage.setItem('feedup_user', JSON.stringify(userObj));
        setUser(userObj);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      
      // Fall back to mock users for demo
      const mockUser = mockUsers[email.toLowerCase()];
      
      if (mockUser && (role ? mockUser.role === role : true)) {
        // Store user in local storage
        localStorage.setItem('feedup_user', JSON.stringify(mockUser));
        setUser(mockUser);
        return true;
      }
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Sign out from Supabase
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out from Supabase:', error);
    }
    
    // Clear local storage and state
    localStorage.removeItem('feedup_user');
    setUser(null);
    navigate('/');
  };

  // Permission check function
  const hasPermission = (feature: keyof FeatureAccess, requiredPermission: Permission): boolean => {
    if (!user) return false;
    
    const userPermission = user.permissions[feature];
    
    // If user has write permission, they can also read
    if (requiredPermission === 'read' && userPermission === 'write') {
      return true;
    }
    
    // If user has limited permission and requires read or limited
    if (userPermission === 'limited' && (requiredPermission === 'read' || requiredPermission === 'limited')) {
      return true;
    }
    
    return userPermission === requiredPermission;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};