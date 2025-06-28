import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Clock, 
  CheckCircle, 
  User,
  MapPin,
  IndianRupee,
  CreditCard,
  Smartphone,
  RefreshCw,
  Gift,
  MessageCircle,
  AlertCircle,
  Timer,
  UtensilsCrossed,
  Receipt
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

interface CustomerRequest {
  id: string;
  tableNumber: number;
  customerName?: string;
  requestType: 'bill' | 'assistance' | 'water' | 'custom';
  customMessage?: string;
  status: 'pending' | 'handling' | 'completed';
  requestTime: string;
  paymentMethod?: 'cash' | 'card' | 'upi';
  tipSuggestion?: number;
  orderTotal?: number;
  customerPhone?: string;
  priority: 'normal' | 'high' | 'urgent';
}

const ServantRequests = () => {
  const [statusFilter, setStatusFilter] = useState<string>('pending');

  const requests: CustomerRequest[] = [
    {
      id: 'REQ001',
      tableNumber: 5,
      customerName: 'Rajesh Kumar',
      requestType: 'bill',
      status: 'pending',
      requestTime: '2 min ago',
      paymentMethod: 'card',
      tipSuggestion: 10,
      orderTotal: 720,
      customerPhone: '+91 98765 43210',
      priority: 'high',
    },
    {
      id: 'REQ002',
      tableNumber: 12,
      requestType: 'assistance',
      customMessage: 'Need extra napkins please',
      status: 'handling',
      requestTime: '5 min ago',
      customerPhone: '+91 98765 43211',
      priority: 'normal',
    },
    {
      id: 'REQ003',
      tableNumber: 8,
      customerName: 'Anita Gupta',
      requestType: 'bill',
      status: 'pending',
      requestTime: '1 min ago',
      paymentMethod: 'upi',
      tipSuggestion: 15,
      orderTotal: 560,
      customerPhone: '+91 98765 43212',
      priority: 'urgent',
    },
    {
      id: 'REQ004',
      tableNumber: 3,
      requestType: 'water',
      status: 'completed',
      requestTime: '10 min ago',
      priority: 'normal',
    },
    {
      id: 'REQ005',
      tableNumber: 7,
      requestType: 'custom',
      customMessage: 'Can we get the check soon? We\'re in a hurry.',
      status: 'pending',
      requestTime: '3 min ago',
      priority: 'high',
    },
  ];

  const statusOptions = [
    { value: 'pending', label: 'Pending', count: requests.filter(r => r.status === 'pending').length, color: 'from-red-500 to-rose-500', icon: AlertCircle },
    { value: 'handling', label: 'Handling', count: requests.filter(r => r.status === 'handling').length, color: 'from-yellow-500 to-amber-500', icon: Clock },
    { value: 'completed', label: 'Completed', count: requests.filter(r => r.status === 'completed').length, color: 'from-green-500 to-emerald-500', icon: CheckCircle },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          color: 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-200',
          icon: AlertCircle,
          iconColor: 'text-red-500',
          bgGradient: 'from-red-50 to-rose-50',
          actionText: 'Handle Request',
          actionColor: 'from-red-500 to-rose-500',
          pulse: true,
        };
      case 'handling':
        return {
          color: 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border-yellow-200',
          icon: Clock,
          iconColor: 'text-yellow-500',
          bgGradient: 'from-yellow-50 to-amber-50',
          actionText: 'Mark Completed',
          actionColor: 'from-yellow-500 to-amber-500',
          pulse: false,
        };
      case 'completed':
        return {
          color: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200',
          icon: CheckCircle,
          iconColor: 'text-green-500',
          bgGradient: 'from-green-50 to-emerald-50',
          actionText: 'Completed',
          actionColor: 'from-green-500 to-emerald-500',
          pulse: false,
        };
      default:
        return {
          color: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200',
          icon: Clock,
          iconColor: 'text-gray-500',
          bgGradient: 'from-gray-50 to-slate-50',
          actionText: 'Process',
          actionColor: 'from-gray-500 to-gray-600',
          pulse: false,
        };
    }
  };

  const getRequestTypeConfig = (type: string) => {
    switch (type) {
      case 'bill':
        return {
          icon: Receipt,
          title: 'Bill Request',
          color: 'text-blue-600',
          bg: 'bg-blue-100',
        };
      case 'assistance':
        return {
          icon: Bell,
          title: 'Assistance Needed',
          color: 'text-purple-600',
          bg: 'bg-purple-100',
        };
      case 'water':
        return {
          icon: UtensilsCrossed,
          title: 'Water Request',
          color: 'text-cyan-600',
          bg: 'bg-cyan-100',
        };
      case 'custom':
        return {
          icon: MessageCircle,
          title: 'Custom Request',
          color: 'text-orange-600',
          bg: 'bg-orange-100',
        };
      default:
        return {
          icon: Bell,
          title: 'Request',
          color: 'text-gray-600',
          bg: 'bg-gray-100',
        };
    }
  };

  const getPaymentMethodIcon = (method?: string) => {
    switch (method) {
      case 'cash':
        return IndianRupee;
      case 'card':
        return CreditCard;
      case 'upi':
        return Smartphone;
      default:
        return IndianRupee;
    }
  };

  const updateRequestStatus = (requestId: string, newStatus: string) => {
    console.log(`Updating request ${requestId} to ${newStatus}`);
    // In a real app, this would update the backend
  };

  const filteredRequests = requests.filter(request => {
    return request.status === statusFilter;
  });

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
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Mobile-First Header */}
        <motion.div variants={itemVariants} className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Customer Requests</h1>
              <p className="text-gray-600 text-sm lg:text-base">Handle customer assistance and bill requests</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-3 py-2 lg:px-4 lg:py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </motion.button>
          </div>

          {/* Pending Requests Alert */}
          {requests.filter(r => r.status === 'pending').length > 0 && (
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center space-x-2 bg-gradient-to-r from-red-100 to-rose-100 text-red-700 px-4 py-2 rounded-xl border border-red-200 w-fit"
            >
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">
                {requests.filter(r => r.status === 'pending').length} pending requests
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Status Filter - Mobile Optimized */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-xl border border-white/20 p-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {statusOptions.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStatusFilter(option.value)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                    statusFilter === option.value
                      ? `bg-gradient-to-r ${option.color} text-white shadow-lg`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <option.icon className="h-4 w-4" />
                  <span className="text-sm">{option.label}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
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

        {/* Requests List - Mobile Optimized */}
        <motion.div variants={itemVariants}>
          <AnimatePresence mode="wait">
            <motion.div
              key={statusFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {filteredRequests.map((request, index) => {
                const statusConfig = getStatusConfig(request.status);
                const requestTypeConfig = getRequestTypeConfig(request.requestType);
                const PaymentIcon = getPaymentMethodIcon(request.paymentMethod);
                
                return (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className={`bg-gradient-to-br ${statusConfig.bgGradient} rounded-xl p-4 lg:p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all group relative overflow-hidden`}
                  >
                    {/* Priority Pulse for Pending Requests */}
                    {statusConfig.pulse && (
                      <motion.div
                        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-red-400/10 rounded-xl"
                      />
                    )}

                    {/* Mobile-First Layout */}
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <motion.div
                            animate={statusConfig.pulse ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className={`p-2 lg:p-3 ${requestTypeConfig.bg} rounded-xl shadow-lg`}
                          >
                            <requestTypeConfig.icon className={`h-5 w-5 lg:h-6 lg:w-6 ${requestTypeConfig.color}`} />
                          </motion.div>
                          <div>
                            <h3 className="text-lg lg:text-xl font-bold text-gray-900">Table {request.tableNumber}</h3>
                            {request.customerName && (
                              <p className="text-sm text-gray-600 flex items-center">
                                <User className="h-3 w-3 mr-1" />
                                {request.customerName}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{request.id}</p>
                          <p className="text-xs text-gray-400">{request.requestTime}</p>
                        </div>
                      </div>

                      {/* Request Type & Status Badge */}
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${requestTypeConfig.bg} ${requestTypeConfig.color}`}>
                          {requestTypeConfig.title}
                        </span>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full border ${statusConfig.color}`}>
                          {status === 'pending' ? 'Pending' : status === 'handling' ? 'In Progress' : 'Completed'}
                        </span>
                      </div>

                      {/* Request Details */}
                      {request.customMessage && (
                        <div className="bg-white/70 p-3 rounded-lg">
                          <p className="text-sm text-gray-700">
                            "{request.customMessage}"
                          </p>
                        </div>
                      )}

                      {/* Bill Request Details */}
                      {request.requestType === 'bill' && request.orderTotal && (
                        <div className="bg-white/70 p-3 rounded-lg space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Order Total:</span>
                            <span className="font-semibold text-gray-900">₹{request.orderTotal}</span>
                          </div>
                          
                          {request.paymentMethod && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Payment Method:</span>
                              <div className="flex items-center space-x-2">
                                <PaymentIcon className="h-4 w-4 text-gray-600" />
                                <span className="font-medium text-gray-900 capitalize">{request.paymentMethod}</span>
                              </div>
                            </div>
                          )}
                          
                          {request.tipSuggestion && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Tip Suggestion:</span>
                              <div className="flex items-center space-x-1 text-green-600">
                                <Gift className="h-4 w-4" />
                                <span className="font-medium">{request.tipSuggestion}%</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Request Time */}
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Requested {request.requestTime}</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-end space-x-3">
                        {request.status === 'pending' && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateRequestStatus(request.id, 'handling')}
                            className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium"
                          >
                            Handle Request
                          </motion.button>
                        )}
                        
                        {request.status === 'handling' && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateRequestStatus(request.id, 'completed')}
                            className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium"
                          >
                            Mark Completed
                          </motion.button>
                        )}
                        
                        {request.status === 'completed' && (
                          <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-sm font-medium">
                            Completed
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filteredRequests.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-xl border border-white/20 p-8">
                <div className="text-gray-400 mb-4">
                  <Bell className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No requests found</h3>
                <p className="text-gray-600 text-sm">
                  No {statusFilter === 'pending' ? 'pending requests' : 
                       statusFilter === 'handling' ? 'requests in progress' : 'completed requests'} at the moment.
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Quick Actions - Mobile Sticky Bottom */}
        <motion.div 
          variants={itemVariants}
          className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 p-4 z-50"
        >
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl shadow-lg"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh Requests</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Add bottom padding for mobile sticky button */}
        <div className="lg:hidden h-20"></div>
      </motion.div>
    </DashboardLayout>
  );
};

export default ServantRequests;