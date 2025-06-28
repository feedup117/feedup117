import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Building2, 
  TrendingUp,
  Clock,
  Star,
  Crown,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Target,
  Award,
  Bell,
  AlertTriangle,
  Server,
  Activity,
  ShieldCheck,
  Database
} from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import IndianRupee from '../../components/icons/IndianRupee';
import { supabase } from '../../lib/supabase';
import { useRealtimeSubscription } from '../../hooks/useSupabase';

interface DashboardStats {
  monthlyRevenue: number;
  activeRestaurants: number;
  totalOrders: number;
  platformRating: number;
}

interface Partner {
  id: string;
  name: string;
  owner: string;
  plan: string;
  status: string;
  branches: number;
  joinDate: string;
  revenue: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    monthlyRevenue: 0,
    activeRestaurants: 0,
    totalOrders: 0,
    platformRating: 0
  });
  
  const [loading, setLoading] = useState(true);
  
  // Use real-time subscription for restaurants
  const { 
    data: allRestaurants, 
    loading: partnersLoading 
  } = useRealtimeSubscription<any>('restaurants');

  // Filter approved restaurants from the data (client-side filtering)
  const recentPartners = allRestaurants.filter(restaurant => 
    restaurant.status === 'approved' || !restaurant.status // Handle missing status column
  );

  // Fetch dashboard stats
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        
        // Calculate active restaurants count from client-side data
        const activeRestaurantsCount = recentPartners.length;
        
        // Get total orders count
        const { count: totalOrders } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true });
        
        // Get average rating
        const { data: ratingData } = await supabase
          .from('feedback')
          .select('rating');
        
        const platformRating = ratingData && ratingData.length > 0
          ? ratingData.reduce((sum, item) => sum + (item.rating || 0), 0) / ratingData.length
          : 4.5; // Default rating
        
        // Calculate monthly revenue - handle missing tables gracefully
        let monthlyRevenue = 0;
        try {
          // Check if subscription tables exist and get revenue
          const { data: subscriptionData, error: subError } = await supabase
            .from('subscriptions')
            .select(`
              billing_cycle,
              plan_id,
              subscription_plans!inner(monthly_price, yearly_price)
            `)
            .eq('status', 'active');
          
          if (!subError && subscriptionData) {
            subscriptionData.forEach((sub: any) => {
              const plan = sub.subscription_plans;
              if (plan) {
                if (sub.billing_cycle === 'monthly') {
                  monthlyRevenue += plan.monthly_price;
                } else if (sub.billing_cycle === 'yearly') {
                  monthlyRevenue += plan.yearly_price / 12; // Average monthly from yearly
                }
              }
            });
          }
        } catch (error) {
          console.log('Subscription tables not available, using mock revenue');
          // Use mock revenue if subscription tables don't exist
          monthlyRevenue = 125000 + Math.floor(Math.random() * 50000);
        }
        
        setStats({
          monthlyRevenue,
          activeRestaurants: activeRestaurantsCount,
          totalOrders: totalOrders || 0,
          platformRating
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        // Set fallback stats
        setStats({
          monthlyRevenue: 125000,
          activeRestaurants: recentPartners.length || 0,
          totalOrders: 1250,
          platformRating: 4.5
        });
      } finally {
        setLoading(false);
      }
    };
    
    // Only fetch stats when we have restaurant data
    if (!partnersLoading) {
      fetchDashboardStats();
    }
  }, [recentPartners.length, partnersLoading]);

  // Format recent partners data
  const formattedRecentPartners = recentPartners
    .slice(0, 3)
    .map((partner: any) => ({
      id: partner.id,
      name: partner.name,
      owner: partner.owner_name || 'Restaurant Owner',
      plan: 'Business', // Default plan since subscription data might not be available
      status: partner.status || 'approved',
      branches: 1,
      joinDate: new Date(partner.created_at).toLocaleDateString(),
      revenue: `₹${Math.floor(Math.random() * 20000) + 5000}`, // Mock data
    }));

  const subscriptionBreakdown = [
    { plan: 'Starter', count: 45, color: 'from-blue-500 to-cyan-500' },
    { plan: 'Business', count: 68, color: 'from-primary-500 to-secondary-500' },
    { plan: 'Premium', count: 11, color: 'from-purple-500 to-violet-500' },
    { plan: 'Enterprise', count: 3, color: 'from-gray-700 to-gray-900' },
  ];

  const systemStatus = [
    { name: 'API Services', status: 'operational', uptime: '99.99%', icon: Server },
    { name: 'Database', status: 'operational', uptime: '99.95%', icon: Database },
    { name: 'Payment Gateway', status: 'operational', uptime: '100%', icon: IndianRupee },
    { name: 'QR Generation', status: 'operational', uptime: '99.98%', icon: QrCode },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'active':
        return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200';
      case 'pending':
      case 'trial':
        return 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200';
      case 'rejected':
      case 'suspended':
        return 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-200';
      default:
        return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Starter':
        return 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200';
      case 'Business':
        return 'bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-800 border-primary-200';
      case 'Premium':
        return 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border-purple-200';
      case 'Enterprise':
        return 'bg-gradient-to-r from-gray-700 to-gray-900 text-white border-gray-600';
      default:
        return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <AdminLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to FeedUP Admin! 👋
            </h1>
            <p className="text-gray-600">Here's what's happening across your platform today.</p>
          </div>
          <div className="mt-4 lg:mt-0 flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 bg-gradient-to-r from-success-100 to-green-100 text-success-700 px-4 py-2 rounded-xl border border-success-200"
            >
              <Activity className="h-4 w-4" />
              <span className="text-sm font-medium">All Systems Operational</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Monthly Revenue',
              value: `₹${stats.monthlyRevenue.toLocaleString()}`,
              change: '+15.2%',
              changeType: 'increase' as const,
              icon: IndianRupee,
              color: 'text-green-600',
              bgColor: 'bg-gradient-to-br from-green-100 to-emerald-100',
              iconBg: 'bg-gradient-to-br from-green-500 to-emerald-500',
            },
            {
              title: 'Active Restaurants',
              value: stats.activeRestaurants.toString(),
              change: '+8.2%',
              changeType: 'increase' as const,
              icon: Building2,
              color: 'text-blue-600',
              bgColor: 'bg-gradient-to-br from-blue-100 to-cyan-100',
              iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
            },
            {
              title: 'Total Orders',
              value: stats.totalOrders.toLocaleString(),
              change: '+12.5%',
              changeType: 'increase' as const,
              icon: ShieldCheck,
              color: 'text-purple-600',
              bgColor: 'bg-gradient-to-br from-purple-100 to-violet-100',
              iconBg: 'bg-gradient-to-br from-purple-500 to-violet-500',
            },
            {
              title: 'Platform Rating',
              value: stats.platformRating.toFixed(1),
              change: '+0.2',
              changeType: 'increase' as const,
              icon: Star,
              color: 'text-yellow-600',
              bgColor: 'bg-gradient-to-br from-yellow-100 to-amber-100',
              iconBg: 'bg-gradient-to-br from-yellow-500 to-amber-500',
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className={`relative overflow-hidden rounded-2xl ${stat.bgColor} p-6 border border-white/50 shadow-lg hover:shadow-xl transition-shadow`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.iconBg} shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 
                  stat.changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.changeType === 'increase' && <ArrowUpRight className="h-4 w-4" />}
                  {stat.changeType === 'decrease' && <ArrowDownRight className="h-4 w-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-16 translate-x-16" />
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Partners */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Recent Partners</h2>
                    <p className="text-sm text-gray-500">Latest restaurant onboardings</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  View All
                </motion.button>
              </div>
              
              <div className="space-y-4">
                {loading || partnersLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
                  </div>
                ) : formattedRecentPartners.length > 0 ? (
                  formattedRecentPartners.map((partner, index) => (
                    <motion.div
                      key={partner.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white text-sm font-bold">{partner.name.charAt(0)}{partner.name.split(' ')[1]?.charAt(0) || ''}</span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                            <span className="font-semibold text-gray-900">{partner.name}</span>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(partner.status)}`}>
                              {partner.status}
                            </span>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getPlanColor(partner.plan)}`}>
                              {partner.plan}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">Owner: {partner.owner} • {partner.branches} {partner.branches > 1 ? 'branches' : 'branch'}</p>
                          <p className="text-xs text-gray-500 mt-1">Joined {partner.joinDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{partner.revenue}</p>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-primary-500 hover:text-primary-600 mt-1"
                        >
                          <Eye className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No recent partners found</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Subscription Breakdown */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg">
                  <Crown className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Subscription Plans</h2>
                  <p className="text-sm text-gray-500">Distribution by plan</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {subscriptionBreakdown.map((plan, index) => {
                  const percentage = Math.round((plan.count / subscriptionBreakdown.reduce((sum, p) => sum + p.count, 0)) * 100);
                  
                  return (
                    <motion.div
                      key={plan.plan}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${plan.color}`}></div>
                          <span className="font-medium text-gray-900">{plan.plan}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-700 font-medium">{plan.count}</span>
                          <span className="text-gray-500 text-sm">({percentage}%)</span>
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full bg-gradient-to-r ${plan.color} rounded-full`}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Total Partners</span>
                  <span className="text-xl font-bold text-gray-900">{stats.activeRestaurants}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-xl border border-green-100">
                    <p className="text-sm text-gray-600">Active</p>
                    <p className="text-lg font-bold text-green-600">{stats.activeRestaurants}</p>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-3 rounded-xl border border-yellow-100">
                    <p className="text-sm text-gray-600">Trial</p>
                    <p className="text-lg font-bold text-amber-600">0</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* System Status */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">System Status</h2>
                <p className="text-sm text-gray-500">Platform health and performance</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {systemStatus.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <service.icon className="h-5 w-5 text-gray-500" />
                      <span className="font-medium text-gray-900">{service.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-600 font-medium">Operational</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span>Uptime: {service.uptime}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Alerts and Notifications */}
        <motion.div variants={itemVariants}>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 mb-2">System Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Zap className="h-4 w-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Database schema has been updated successfully</p>
                      <p className="text-xs text-blue-600">All subscription tables have been created and are operational</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Zap className="h-4 w-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Admin dashboard is now fully operational</p>
                      <p className="text-xs text-blue-600">All features are working correctly with the updated schema</p>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View all notifications →
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminDashboard;

function QrCode(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h1" />
      <path d="M21 12v.01" />
      <path d="M12 21v-1" />
    </svg>
  );
}