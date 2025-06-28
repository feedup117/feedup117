import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  Eye, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  XCircle, 
  Shield,
  RefreshCw,
  ArrowUpDown,
  Layers,
  Server,
  Database,
  CreditCard,
  UserPlus,
  UserMinus,
  Settings,
  Building2
} from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import IndianRupee from '../../components/icons/IndianRupee';

interface AuditLog {
  id: string;
  action: string;
  category: 'auth' | 'partner' | 'subscription' | 'system' | 'payment' | 'feature';
  severity: 'info' | 'warning' | 'error' | 'critical';
  timestamp: string;
  user: string;
  userRole: string;
  ipAddress: string;
  details: string;
  metadata?: Record<string, any>;
  isExpanded?: boolean;
}

const AuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  const auditLogs: AuditLog[] = [
    {
      id: 'LOG001',
      action: 'Partner Created',
      category: 'partner',
      severity: 'info',
      timestamp: '2025-01-10T14:30:00',
      user: 'admin@feedup.com',
      userRole: 'Admin',
      ipAddress: '192.168.1.1',
      details: 'New partner "Spice Garden" was created successfully',
      metadata: {
        partnerId: 'P001',
        partnerName: 'Spice Garden',
        plan: 'Business',
      },
    },
    {
      id: 'LOG002',
      action: 'Subscription Changed',
      category: 'subscription',
      severity: 'info',
      timestamp: '2025-01-10T12:15:00',
      user: 'admin@feedup.com',
      userRole: 'Admin',
      ipAddress: '192.168.1.1',
      details: 'Subscription plan changed from "Starter" to "Business" for partner "Pizza Paradise"',
      metadata: {
        partnerId: 'P002',
        partnerName: 'Pizza Paradise',
        oldPlan: 'Starter',
        newPlan: 'Business',
      },
    },
    {
      id: 'LOG003',
      action: 'Failed Login Attempt',
      category: 'auth',
      severity: 'warning',
      timestamp: '2025-01-10T10:45:00',
      user: 'unknown',
      userRole: 'Unknown',
      ipAddress: '203.0.113.1',
      details: 'Multiple failed login attempts detected for admin account',
      metadata: {
        attempts: 5,
        username: 'admin@feedup.com',
      },
    },
    {
      id: 'LOG004',
      action: 'Feature Flag Updated',
      category: 'feature',
      severity: 'info',
      timestamp: '2025-01-09T16:20:00',
      user: 'admin@feedup.com',
      userRole: 'Admin',
      ipAddress: '192.168.1.1',
      details: 'Feature flag "enable_advanced_analytics" was enabled',
      metadata: {
        flagId: 'FF006',
        flagKey: 'enable_advanced_analytics',
        oldValue: false,
        newValue: true,
      },
    },
    {
      id: 'LOG005',
      action: 'Payment Failed',
      category: 'payment',
      severity: 'error',
      timestamp: '2025-01-09T14:10:00',
      user: 'system',
      userRole: 'System',
      ipAddress: '127.0.0.1',
      details: 'Subscription payment failed for partner "Dosa Delight"',
      metadata: {
        partnerId: 'P005',
        partnerName: 'Dosa Delight',
        amount: 599,
        errorCode: 'PAYMENT_FAILED',
        errorMessage: 'Card declined',
      },
    },
    {
      id: 'LOG006',
      action: 'System Maintenance',
      category: 'system',
      severity: 'info',
      timestamp: '2025-01-09T02:00:00',
      user: 'system',
      userRole: 'System',
      ipAddress: '127.0.0.1',
      details: 'Scheduled database maintenance completed successfully',
      metadata: {
        duration: '15 minutes',
        tables: ['partners', 'subscriptions', 'orders'],
      },
    },
    {
      id: 'LOG007',
      action: 'Partner Deleted',
      category: 'partner',
      severity: 'critical',
      timestamp: '2025-01-08T18:30:00',
      user: 'admin@feedup.com',
      userRole: 'Admin',
      ipAddress: '192.168.1.1',
      details: 'Partner "Sushi Spot" was permanently deleted',
      metadata: {
        partnerId: 'P008',
        partnerName: 'Sushi Spot',
        reason: 'Partner request',
      },
    },
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'auth', label: 'Authentication' },
    { value: 'partner', label: 'Partner Management' },
    { value: 'subscription', label: 'Subscriptions' },
    { value: 'system', label: 'System' },
    { value: 'payment', label: 'Payments' },
    { value: 'feature', label: 'Feature Flags' },
  ];

  const severities = [
    { value: 'all', label: 'All Severities' },
    { value: 'info', label: 'Info' },
    { value: 'warning', label: 'Warning' },
    { value: 'error', label: 'Error' },
    { value: 'critical', label: 'Critical' },
  ];

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case 'auth':
        return {
          color: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200',
          icon: User,
        };
      case 'partner':
        return {
          color: 'bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-800 border-primary-200',
          icon: Building2,
        };
      case 'subscription':
        return {
          color: 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border-purple-200',
          icon: CreditCard,
        };
      case 'system':
        return {
          color: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200',
          icon: Server,
        };
      case 'payment':
        return {
          color: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200',
          icon: IndianRupee,
        };
      case 'feature':
        return {
          color: 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border-yellow-200',
          icon: Settings,
        };
      default:
        return {
          color: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200',
          icon: FileText,
        };
    }
  };

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'info':
        return {
          color: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200',
          icon: Info,
          iconColor: 'text-blue-500',
        };
      case 'warning':
        return {
          color: 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border-yellow-200',
          icon: AlertTriangle,
          iconColor: 'text-yellow-500',
        };
      case 'error':
        return {
          color: 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border-orange-200',
          icon: XCircle,
          iconColor: 'text-orange-500',
        };
      case 'critical':
        return {
          color: 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-200',
          icon: AlertTriangle,
          iconColor: 'text-red-500',
        };
      default:
        return {
          color: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200',
          icon: Info,
          iconColor: 'text-gray-500',
        };
    }
  };

  const getActionIcon = (action: string, category: string) => {
    if (action.includes('Login')) return User;
    if (action.includes('Created') || action.includes('Added')) return Plus;
    if (action.includes('Deleted') || action.includes('Removed')) return Trash2;
    if (action.includes('Updated') || action.includes('Changed') || action.includes('Modified')) return Edit;
    if (action.includes('Payment')) return CreditCard;
    if (action.includes('Feature')) return Settings;
    if (action.includes('Subscription')) return CreditCard;
    if (action.includes('System')) return Server;
    if (action.includes('Database')) return Database;
    if (action.includes('Partner')) return Building2;
    
    // Default icons based on category
    switch (category) {
      case 'auth': return User;
      case 'partner': return Building2;
      case 'subscription': return CreditCard;
      case 'system': return Server;
      case 'payment': return IndianRupee;
      case 'feature': return Settings;
      default: return FileText;
    }
  };

  const toggleExpandLog = (id: string) => {
    if (expandedLog === id) {
      setExpandedLog(null);
    } else {
      setExpandedLog(id);
    }
  };

  const exportLogs = () => {
    // In a real app, this would generate and download a CSV file
    alert('Exporting audit logs to CSV...');
  };

  const getSortedLogs = () => {
    let sorted = [...auditLogs];
    
    if (sortOrder === 'newest') {
      sorted = sorted.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } else {
      sorted = sorted.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    }
    
    return sorted;
  };

  const getFilteredLogs = () => {
    const sorted = getSortedLogs();
    
    return sorted.filter(log => {
      const matchesSearch = 
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
      const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
      
      let matchesDateRange = true;
      if (dateRange.start && dateRange.end) {
        const logDate = new Date(log.timestamp);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        endDate.setHours(23, 59, 59, 999); // Include the entire end day
        matchesDateRange = logDate >= startDate && logDate <= endDate;
      }
      
      return matchesSearch && matchesCategory && matchesSeverity && matchesDateRange;
    });
  };

  const filteredLogs = getFilteredLogs();

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Audit Logs</h1>
            <p className="text-gray-600">Track and monitor all system activities</p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportLogs}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl hover:from-secondary-600 hover:to-secondary-700 transition-all shadow-lg"
            >
              <Download className="h-4 w-4" />
              <span>Export Logs</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div variants={itemVariants}>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-6">
            <div className="flex items-start space-x-4">
              <Shield className="h-6 w-6 text-blue-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Audit Log Security</h3>
                <p className="text-blue-800 text-sm mb-3">
                  All system activities are logged for security and compliance purposes. Logs are retained for 90 days and cannot be modified or deleted.
                </p>
                <div className="flex items-center space-x-4 text-sm text-blue-700">
                  <div className="flex items-center space-x-1">
                    <Layers className="h-4 w-4" />
                    <span>Immutable logs</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>90-day retention</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                  placeholder="Search logs by action, details, or user..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                />
              </div>
              
              {/* Category Filter */}
              <div className="w-full lg:w-48">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm appearance-none"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>{category.label}</option>
                  ))}
                </select>
              </div>
              
              {/* Severity Filter */}
              <div className="w-full lg:w-48">
                <select
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm appearance-none"
                >
                  {severities.map(severity => (
                    <option key={severity.value} value={severity.value}>{severity.label}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                />
              </div>
            </div>
            
            {/* Sort Order */}
            <div className="flex items-center mt-6">
              <button
                onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
              >
                <ArrowUpDown className="h-4 w-4" />
                <span>{sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Audit Logs List */}
        <motion.div variants={itemVariants}>
          <div className="space-y-4">
            {filteredLogs.map((log, index) => {
              const categoryConfig = getCategoryConfig(log.category);
              const severityConfig = getSeverityConfig(log.severity);
              const ActionIcon = getActionIcon(log.action, log.category);
              const SeverityIcon = severityConfig.icon;
              const isExpanded = expandedLog === log.id;
              
              return (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all ${
                    log.severity === 'critical' ? 'border-l-4 border-l-red-500' : 
                    log.severity === 'error' ? 'border-l-4 border-l-orange-500' : 
                    log.severity === 'warning' ? 'border-l-4 border-l-yellow-500' : ''
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Log Info */}
                    <div className="flex-1">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-xl ${categoryConfig.color}`}>
                          <ActionIcon className="h-6 w-6" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-bold text-gray-900">{log.action}</h3>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${categoryConfig.color}`}>
                              {log.category}
                            </span>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${severityConfig.color} flex items-center space-x-1`}>
                              <SeverityIcon className={`h-3 w-3 ${severityConfig.iconColor}`} />
                              <span className="capitalize">{log.severity}</span>
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{log.details}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <User className="h-3 w-3" />
                              <span>{log.user} ({log.userRole})</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{new Date(log.timestamp).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleExpandLog(log.id)}
                        className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                      >
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Expanded Details */}
                  <AnimatePresence>
                    {isExpanded && log.metadata && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-gray-100 overflow-hidden"
                      >
                        <h4 className="font-medium text-gray-900 mb-2">Metadata</h4>
                        <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                          <pre className="text-xs font-mono text-gray-700 whitespace-pre-wrap">
                            {JSON.stringify(log.metadata, null, 2)}
                          </pre>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                          <div>Log ID: {log.id}</div>
                          <div>IP: {log.ipAddress}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {filteredLogs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-12">
                <div className="text-gray-400 mb-4">
                  <FileText className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No audit logs found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AdminLayout>
  );
};

export default AuditLogs;

function Plus(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function Trash2(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}

function Edit(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}