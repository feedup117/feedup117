import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gift, 
  Calendar, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Loader2 
} from 'lucide-react';
import IndianRupee from '../icons/IndianRupee';

interface Tip {
  id: string;
  tableNumber: number;
  customerName?: string;
  amount: number;
  date: string;
  time: string;
  orderId: string;
}

interface TipHistoryProps {
  servantId: string;
  timeRange?: 'today' | 'week' | 'month' | 'year' | 'all';
}

const TipHistory: React.FC<TipHistoryProps> = ({
  servantId,
  timeRange = 'all'
}) => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [filteredTips, setFilteredTips] = useState<Tip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  const [expandedTip, setExpandedTip] = useState<string | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);

  // Mock data for demo purposes
  const mockTips: Tip[] = [
    {
      id: 'tip1',
      tableNumber: 5,
      customerName: 'Rajesh Kumar',
      amount: 100,
      date: '2025-01-10',
      time: '14:30',
      orderId: 'order_123456'
    },
    {
      id: 'tip2',
      tableNumber: 12,
      amount: 50,
      date: '2025-01-10',
      time: '13:15',
      orderId: 'order_234567'
    },
    {
      id: 'tip3',
      tableNumber: 8,
      customerName: 'Anita Gupta',
      amount: 75,
      date: '2025-01-09',
      time: '19:45',
      orderId: 'order_345678'
    },
    {
      id: 'tip4',
      tableNumber: 3,
      amount: 70,
      date: '2025-01-09',
      time: '12:30',
      orderId: 'order_456789'
    },
    {
      id: 'tip5',
      tableNumber: 7,
      customerName: 'Priya Sharma',
      amount: 40,
      date: '2025-01-08',
      time: '20:15',
      orderId: 'order_567890'
    }
  ];

  // Fetch tips on component mount and when timeRange changes
  useEffect(() => {
    const fetchTips = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, this would be an API call
        // const response = await axios.get(`/api/tips?servantId=${servantId}&timeRange=${selectedTimeRange}`);
        // setTips(response.data);
        
        // For demo purposes, use mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTips(mockTips);
        
      } catch (error) {
        console.error('Error fetching tips:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTips();
  }, [servantId, selectedTimeRange]);

  // Filter and sort tips
  useEffect(() => {
    let filtered = [...tips];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(tip => 
        (tip.customerName && tip.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        tip.tableNumber.toString().includes(searchTerm) ||
        tip.orderId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort by date/time or amount
    filtered = filtered.sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime();
      } else if (sortOrder === 'oldest') {
        return new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime();
      } else if (sortOrder === 'highest') {
        return b.amount - a.amount;
      } else {
        return a.amount - b.amount;
      }
    });
    
    setFilteredTips(filtered);
  }, [tips, searchTerm, sortOrder]);

  // Toggle expanded tip
  const toggleExpandTip = (id: string) => {
    setExpandedTip(expandedTip === id ? null : id);
  };

  // Export tips as CSV
  const exportTips = () => {
    if (tips.length === 0) return;
    
    const headers = ['Date', 'Time', 'Table', 'Customer', 'Amount', 'Order ID'];
    const rows = tips.map(tip => [
      tip.date,
      tip.time,
      tip.tableNumber.toString(),
      tip.customerName || 'Anonymous',
      tip.amount.toString(),
      tip.orderId
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `tips-${selectedTimeRange}-${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  // Calculate total tips
  const totalTips = filteredTips.reduce((sum, tip) => sum + tip.amount, 0);

  // Get time range label
  const getTimeRangeLabel = () => {
    switch (selectedTimeRange) {
      case 'today':
        return 'Today';
      case 'week':
        return 'This Week';
      case 'month':
        return 'This Month';
      case 'year':
        return 'This Year';
      default:
        return 'All Time';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl border border-yellow-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl shadow-lg">
              <Gift className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Tip Summary</h3>
              <p className="text-gray-600">{getTimeRangeLabel()}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm text-gray-600">Total Tips</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalTips}</p>
            </div>
            
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by table or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
          />
        </div>
        
        {/* Sort Order */}
        <button
          onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
          className="flex items-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
        >
          <ArrowUpDown className="h-4 w-4" />
          <span>{sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}</span>
        </button>
        
        {/* Export */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={exportTips}
          disabled={tips.length === 0}
          className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl hover:from-secondary-600 hover:to-secondary-700 transition-all shadow-lg disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          <span>Export</span>
        </motion.button>
      </div>
      
      {/* Tip List */}
      {filteredTips.length > 0 ? (
        <div className="space-y-4">
          {filteredTips.map((tip) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              {/* Tip Summary */}
              <div 
                className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleExpandTip(tip.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Gift className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">Table {tip.tableNumber}</span>
                      {tip.customerName && (
                        <span className="text-sm text-gray-500">• {tip.customerName}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(tip.date).toLocaleDateString()}</span>
                      <Clock className="h-3 w-3" />
                      <span>{tip.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">₹{tip.amount}</p>
                  </div>
                  {expandedTip === tip.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
              
              {/* Expanded Details */}
              <AnimatePresence>
                {expandedTip === tip.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200 bg-gray-50 overflow-hidden"
                  >
                    <div className="p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Order ID:</span>
                        <span className="text-sm font-medium text-gray-900">{tip.orderId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Date & Time:</span>
                        <span className="text-sm font-medium text-gray-900">
                          {new Date(`${tip.date}T${tip.time}`).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Table:</span>
                        <span className="text-sm font-medium text-gray-900">Table {tip.tableNumber}</span>
                      </div>
                      {tip.customerName && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Customer:</span>
                          <span className="text-sm font-medium text-gray-900">{tip.customerName}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Tip Amount:</span>
                        <span className="text-sm font-medium text-green-600">₹{tip.amount}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
          <Gift className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No tips found</h3>
          <p className="text-gray-600">
            {searchTerm 
              ? 'Try adjusting your search criteria' 
              : `No tips received ${selectedTimeRange === 'all' ? '' : 'in ' + getTimeRangeLabel().toLowerCase()}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default TipHistory;