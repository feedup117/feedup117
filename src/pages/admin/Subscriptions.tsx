import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Calendar, 
  Download, 
  Filter, 
  Search, 
  ArrowUpDown, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock, 
  Edit, 
  Plus, 
  Trash2, 
  Crown, 
  Building2, 
  Zap,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3
} from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { getPlans, Plan } from '../../services/razorpayService';
import AdminPlanEditor from '../../components/admin/AdminPlanEditor';
import IndianRupee from '../../components/icons/IndianRupee';

interface Subscription {
  id: string;
  partnerId: string;
  partnerName: string;
  plan: 'Starter' | 'Business' | 'Premium' | 'Enterprise';
  status: 'active' | 'trial' | 'expired' | 'cancelled';
  billingCycle: 'monthly' | 'yearly';
  amount: number;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  paymentMethod: 'card' | 'upi' | 'bank_transfer';
  lastPaymentDate: string;
  nextPaymentDate: string;
}

const Subscriptions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [planFilter, setPlanFilter] = useState<string>('all');
  const [billingCycleFilter, setBillingCycleFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  const [showAddPlanModal, setShowAddPlanModal] = useState(false);
  const [showEditPlanModal, setShowEditPlanModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch plans on component mount
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const fetchedPlans = await getPlans();
        setPlans(fetchedPlans);
      } catch (error) {
        console.error('Error fetching plans:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const subscriptions: Subscription[] = [
    {
      id: 'SUB001',
      partnerId: 'P001',
      partnerName: 'Spice Garden',
      plan: 'Business',
      status: 'active',
      billingCycle: 'monthly',
      amount: 1299,
      startDate: '2024-12-01',
      endDate: '2025-12-01',
      autoRenew: true,
      paymentMethod: 'card',
      lastPaymentDate: '2025-01-01',
      nextPaymentDate: '2025-02-01',
    },
    {
      id: 'SUB002',
      partnerId: 'P002',
      partnerName: 'Pizza Paradise',
      plan: 'Premium',
      status: 'active',
      billingCycle: 'yearly',
      amount: 24990,
      startDate: '2024-11-15',
      endDate: '2025-11-15',
      autoRenew: true,
      paymentMethod: 'bank_transfer',
      lastPaymentDate: '2024-11-15',
      nextPaymentDate: '2025-11-15',
    },
    {
      id: 'SUB003',
      partnerId: 'P003',
      partnerName: 'Burger Barn',
      plan: 'Starter',
      status: 'trial',
      billingCycle: 'monthly',
      amount: 0,
      startDate: '2025-01-01',
      endDate: '2025-01-15',
      autoRenew: false,
      paymentMethod: 'card',
      lastPaymentDate: '2025-01-01',
      nextPaymentDate: '2025-01-15',
    },
    {
      id: 'SUB004',
      partnerId: 'P004',
      partnerName: 'Cafe Connect',
      plan: 'Business',
      status: 'active',
      billingCycle: 'monthly',
      amount: 1299,
      startDate: '2024-10-15',
      endDate: '2025-10-15',
      autoRenew: true,
      paymentMethod: 'upi',
      lastPaymentDate: '2025-01-15',
      nextPaymentDate: '2025-02-15',
    },
    {
      id: 'SUB005',
      partnerId: 'P005',
      partnerName: 'Dosa Delight',
      plan: 'Starter',
      status: 'expired',
      billingCycle: 'monthly',
      amount: 599,
      startDate: '2024-09-01',
      endDate: '2025-01-01',
      autoRenew: false,
      paymentMethod: 'card',
      lastPaymentDate: '2024-12-01',
      nextPaymentDate: '2025-01-01',
    },
    {
      id: 'SUB006',
      partnerId: 'P006',
      partnerName: 'Noodle Nation',
      plan: 'Enterprise',
      status: 'active',
      billingCycle: 'yearly',
      amount: 49990,
      startDate: '2024-08-15',
      endDate: '2025-08-15',
      autoRenew: true,
      paymentMethod: 'bank_transfer',
      lastPaymentDate: '2024-08-15',
      nextPaymentDate: '2025-08-15',
    },
    {
      id: 'SUB007',
      partnerId: 'P007',
      partnerName: 'Taco Town',
      plan: 'Business',
      status: 'cancelled',
      billingCycle: 'monthly',
      amount: 1299,
      startDate: '2024-07-01',
      endDate: '2025-01-01',
      autoRenew: false,
      paymentMethod: 'card',
      lastPaymentDate: '2024-12-01',
      nextPaymentDate: '2025-01-01',
    },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Subscriptions', count: subscriptions.length },
    { value: 'active', label: 'Active', count: subscriptions.filter(s => s.status === 'active').length },
    { value: 'trial', label: 'Trial', count: subscriptions.filter(s => s.status === 'trial').length },
    { value: 'expired', label: 'Expired', count: subscriptions.filter(s => s.status === 'expired').length },
    { value: 'cancelled', label: 'Cancelled', count: subscriptions.filter(s => s.status === 'cancelled').length },
  ];

  const planOptions = [
    { value: 'all', label: 'All Plans' },
    { value: 'Starter', label: 'Starter' },
    { value: 'Business', label: 'Business' },
    { value: 'Premium', label: 'Premium' },
    { value: 'Enterprise', label: 'Enterprise' },
  ];

  const billingCycleOptions = [
    { value: 'all', label: 'All Cycles' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return {
          color: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200',
          icon: CheckCircle,
          iconColor: 'text-green-500',
        };
      case 'trial':
        return {
          color: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200',
          icon: Clock,
          iconColor: 'text-blue-500',
        };
      case 'expired':
        return {
          color: 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-orange-200',
          icon: XCircle,
          iconColor: 'text-orange-500',
        };
      case 'cancelled':
        return {
          color: 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-200',
          icon: XCircle,
          iconColor: 'text-red-500',
        };
      default:
        return {
          color: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200',
          icon: AlertCircle,
          iconColor: 'text-gray-500',
        };
    }
  };

  const getPlanConfig = (plan: string) => {
    switch (plan) {
      case 'Starter':
        return {
          color: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200',
          icon: Building2,
        };
      case 'Business':
        return {
          color: 'bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-800 border-primary-200',
          icon: Building2,
        };
      case 'Premium':
        return {
          color: 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border-purple-200',
          icon: Crown,
        };
      case 'Enterprise':
        return {
          color: 'bg-gradient-to-r from-gray-700 to-gray-900 text-white border-gray-600',
          icon: Crown,
        };
      default:
        return {
          color: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200',
          icon: Building2,
        };
    }
  };

  const getBillingCycleConfig = (cycle: string) => {
    switch (cycle) {
      case 'monthly':
        return {
          label: 'Monthly',
          color: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200',
        };
      case 'yearly':
        return {
          label: 'Yearly',
          color: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200',
        };
      default:
        return {
          label: 'Unknown',
          color: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200',
        };
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'card':
        return CreditCard;
      case 'upi':
        return Smartphone;
      case 'bank_transfer':
        return Building2;
      default:
        return CreditCard;
    }
  };

  const handleEditSubscription = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setShowEditPlanModal(true);
  };

  const handleSavePlan = (plan: Plan) => {
    // In a real app, this would call an API to save the plan
    setPlans(prevPlans => {
      const existingPlanIndex = prevPlans.findIndex(p => p.id === plan.id);
      if (existingPlanIndex >= 0) {
        // Update existing plan
        const updatedPlans = [...prevPlans];
        updatedPlans[existingPlanIndex] = plan;
        return updatedPlans;
      } else {
        // Add new plan
        return [...prevPlans, plan];
      }
    });
  };

  const handleDeletePlan = (planId: string) => {
    // In a real app, this would call an API to delete the plan
    setPlans(prevPlans => prevPlans.filter(p => p.id !== planId));
  };

  const getSortedSubscriptions = () => {
    let sorted = [...subscriptions];
    
    switch (sortOrder) {
      case 'newest':
        sorted = sorted.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
        break;
      case 'oldest':
        sorted = sorted.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        break;
      case 'highest':
        sorted = sorted.sort((a, b) => b.amount - a.amount);
        break;
      case 'lowest':
        sorted = sorted.sort((a, b) => a.amount - b.amount);
        break;
    }
    
    return sorted;
  };

  const getFilteredSubscriptions = () => {
    const sorted = getSortedSubscriptions();
    
    return sorted.filter(subscription => {
      const matchesSearch = 
        subscription.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscription.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscription.partnerId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || subscription.status === statusFilter;
      const matchesPlan = planFilter === 'all' || subscription.plan === planFilter;
      const matchesBillingCycle = billingCycleFilter === 'all' || subscription.billingCycle === billingCycleFilter;
      
      return matchesSearch && matchesStatus && matchesPlan && matchesBillingCycle;
    });
  };

  const filteredSubscriptions = getFilteredSubscriptions();
  
  const totalRevenue = subscriptions
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + s.amount, 0);
  
  const monthlyRecurringRevenue = subscriptions
    .filter(s => s.status === 'active' && s.billingCycle === 'monthly')
    .reduce((sum, s) => sum + s.amount, 0);
  
  const yearlyRecurringRevenue = subscriptions
    .filter(s => s.status === 'active' && s.billingCycle === 'yearly')
    .reduce((sum, s) => sum + (s.amount / 12), 0); // Averaging yearly to monthly
  
  const mrr = monthlyRecurringRevenue + yearlyRecurringRevenue;

  const exportSubscriptions = () => {
    // In a real app, this would generate and download a CSV file
    alert('Exporting subscriptions to CSV...');
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
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscriptions & Billing</h1>
            <p className="text-gray-600">Manage partner subscriptions and revenue</p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportSubscriptions}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl hover:from-secondary-600 hover:to-secondary-700 transition-all shadow-lg"
            >
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddPlanModal(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
            >
              <Plus className="h-5 w-5" />
              <span>Add Subscription</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
                <IndianRupee className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center space-x-1 text-sm font-medium text-green-600">
                <ArrowUpRight className="h-4 w-4" />
                <span>+15.2%</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Monthly Recurring Revenue</p>
              <p className="text-3xl font-bold text-gray-900">₹{mrr.toLocaleString()}</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center space-x-1 text-sm font-medium text-blue-600">
                <ArrowUpRight className="h-4 w-4" />
                <span>+8.7%</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Active Subscriptions</p>
              <p className="text-3xl font-bold text-gray-900">{subscriptions.filter(s => s.status === 'active').length}</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl shadow-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center space-x-1 text-sm font-medium text-purple-600">
                <Clock className="h-4 w-4" />
                <span>Next 7 days</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Upcoming Renewals</p>
              <p className="text-3xl font-bold text-gray-900">5</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Plan Management */}
        <motion.div variants={itemVariants}>
          <AdminPlanEditor 
            plans={plans} 
            onSavePlan={handleSavePlan} 
            onDeletePlan={handleDeletePlan} 
          />
        </motion.div>

        {/* Filters */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by partner name or subscription ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                />
              </div>
              
              {/* Plan Filter */}
              <div className="w-full lg:w-48">
                <select
                  value={planFilter}
                  onChange={(e) => setPlanFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm appearance-none"
                >
                  {planOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              {/* Billing Cycle Filter */}
              <div className="w-full lg:w-48">
                <select
                  value={billingCycleFilter}
                  onChange={(e) => setBillingCycleFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm appearance-none"
                >
                  {billingCycleOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Status Filter */}
            <div className="flex gap-3 overflow-x-auto mt-6 pb-2">
              {statusOptions.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStatusFilter(option.value)}
                  className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                    statusFilter === option.value
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{option.label}</span>
                  <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                    statusFilter === option.value
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {option.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Subscriptions Table */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-6 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-600">
              <div className="col-span-3">Partner</div>
              <div className="col-span-2">Plan</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Amount</div>
              <div className="col-span-2">Next Payment</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>
            
            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              <AnimatePresence>
                {filteredSubscriptions.map((subscription) => {
                  const statusConfig = getStatusConfig(subscription.status);
                  const planConfig = getPlanConfig(subscription.plan);
                  const billingCycleConfig = getBillingCycleConfig(subscription.billingCycle);
                  const PaymentMethodIcon = getPaymentMethodIcon(subscription.paymentMethod);
                  
                  return (
                    <motion.div
                      key={subscription.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* Main Row */}
                      <div className="grid grid-cols-12 gap-4 p-6 items-center">
                        <div className="col-span-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg">
                              <span className="text-white text-sm font-bold">{subscription.partnerName.charAt(0)}{subscription.partnerName.split(' ')[1]?.charAt(0) || ''}</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{subscription.partnerName}</p>
                              <p className="text-xs text-gray-500">{subscription.id}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="space-y-1">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${planConfig.color}`}>
                              {subscription.plan}
                            </span>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span className="capitalize">{billingCycleConfig.label}</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusConfig.color} flex items-center space-x-1 w-fit`}>
                            <statusConfig.icon className={`h-3 w-3 ${statusConfig.iconColor}`} />
                            <span className="capitalize">{subscription.status}</span>
                          </span>
                        </div>
                        <div className="col-span-2">
                          <div className="space-y-1">
                            <p className="font-medium text-gray-900">₹{subscription.amount.toLocaleString()}</p>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <PaymentMethodIcon className="h-3 w-3" />
                              <span className="capitalize">{subscription.paymentMethod.replace('_', ' ')}</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="space-y-1">
                            <p className="font-medium text-gray-900">{new Date(subscription.nextPaymentDate).toLocaleDateString()}</p>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <RefreshCw className="h-3 w-3" />
                              <span>{subscription.autoRenew ? 'Auto-renew on' : 'No auto-renew'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-1 flex items-center justify-end space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEditSubscription(subscription)}
                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AdminLayout>
  );
};

export default Subscriptions;

function Smartphone(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}