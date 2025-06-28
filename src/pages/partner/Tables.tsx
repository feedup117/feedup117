import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  QrCode, 
  Download, 
  Edit, 
  Trash2, 
  Users, 
  Eye,
  Wifi,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreVertical
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

interface Table {
  id: string;
  number: number;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved' | 'cleaning';
  currentOrder?: string;
  qrCode: string;
  location?: string;
  lastCleaned?: string;
  waiter?: string;
}

const Tables = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'floor'>('grid');

  const tables: Table[] = [
    {
      id: '1',
      number: 1,
      capacity: 4,
      status: 'occupied',
      currentOrder: 'ORD001',
      qrCode: 'demo-table-1',
      location: 'Window Side',
      lastCleaned: '10 min ago',
      waiter: 'Amit Kumar',
    },
    {
      id: '2',
      number: 2,
      capacity: 2,
      status: 'available',
      qrCode: 'demo-table-2',
      location: 'Center',
      lastCleaned: '5 min ago',
    },
    {
      id: '3',
      number: 3,
      capacity: 6,
      status: 'reserved',
      qrCode: 'demo-table-3',
      location: 'Corner',
      lastCleaned: '15 min ago',
      waiter: 'Priya Sharma',
    },
    {
      id: '4',
      number: 4,
      capacity: 4,
      status: 'cleaning',
      qrCode: 'demo-table-4',
      location: 'Center',
      lastCleaned: 'Now',
    },
    {
      id: '5',
      number: 5,
      capacity: 8,
      status: 'occupied',
      currentOrder: 'ORD002',
      qrCode: 'demo-table-5',
      location: 'Private Room',
      lastCleaned: '20 min ago',
      waiter: 'Rahul Singh',
    },
    {
      id: '6',
      number: 6,
      capacity: 2,
      status: 'available',
      qrCode: 'demo-table-6',
      location: 'Window Side',
      lastCleaned: '8 min ago',
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'available':
        return {
          color: 'bg-gradient-to-br from-green-100 to-emerald-100 text-green-800 border-green-200',
          icon: CheckCircle,
          iconColor: 'text-green-500',
          bgGradient: 'from-green-50 to-emerald-50',
        };
      case 'occupied':
        return {
          color: 'bg-gradient-to-br from-red-100 to-rose-100 text-red-800 border-red-200',
          icon: Users,
          iconColor: 'text-red-500',
          bgGradient: 'from-red-50 to-rose-50',
        };
      case 'reserved':
        return {
          color: 'bg-gradient-to-br from-yellow-100 to-amber-100 text-yellow-800 border-yellow-200',
          icon: Clock,
          iconColor: 'text-yellow-500',
          bgGradient: 'from-yellow-50 to-amber-50',
        };
      case 'cleaning':
        return {
          color: 'bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-800 border-blue-200',
          icon: AlertCircle,
          iconColor: 'text-blue-500',
          bgGradient: 'from-blue-50 to-cyan-50',
        };
      default:
        return {
          color: 'bg-gradient-to-br from-gray-100 to-slate-100 text-gray-800 border-gray-200',
          icon: AlertCircle,
          iconColor: 'text-gray-500',
          bgGradient: 'from-gray-50 to-slate-50',
        };
    }
  };

  const handleDownloadQR = (table: Table) => {
    alert(`QR Code for Table ${table.number} downloaded!`);
  };

  const handleGenerateAllQR = () => {
    alert('All QR codes generated and downloaded!');
  };

  const availableTables = tables.filter(t => t.status === 'available').length;
  const occupiedTables = tables.filter(t => t.status === 'occupied').length;
  const reservedTables = tables.filter(t => t.status === 'reserved').length;
  const cleaningTables = tables.filter(t => t.status === 'cleaning').length;

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
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Table Management</h1>
            <p className="text-gray-600">Manage your restaurant tables and QR codes</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* View Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-white shadow-sm text-primary-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('floor')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'floor' 
                    ? 'bg-white shadow-sm text-primary-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Floor Plan
              </button>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGenerateAllQR}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl hover:from-secondary-600 hover:to-secondary-700 transition-all shadow-lg"
            >
              <Download className="h-4 w-4" />
              <span>Download All QR</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
            >
              <Plus className="h-5 w-5" />
              <span>Add Table</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: 'Total Tables', value: tables.length, icon: Users, color: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50' },
            { title: 'Available', value: availableTables, icon: CheckCircle, color: 'from-green-500 to-emerald-500', bg: 'from-green-50 to-emerald-50' },
            { title: 'Occupied', value: occupiedTables, icon: Users, color: 'from-red-500 to-rose-500', bg: 'from-red-50 to-rose-50' },
            { title: 'Reserved', value: reservedTables, icon: Clock, color: 'from-yellow-500 to-amber-500', bg: 'from-yellow-50 to-amber-50' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`bg-gradient-to-br ${stat.bg} rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tables Grid/Floor Plan */}
        <motion.div variants={itemVariants}>
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {tables.map((table, index) => {
                  const statusConfig = getStatusConfig(table.status);
                  return (
                    <motion.div
                      key={table.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className={`bg-gradient-to-br ${statusConfig.bgGradient} rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all group`}
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 bg-gradient-to-br ${statusConfig.color.includes('green') ? 'from-green-500 to-emerald-500' : statusConfig.color.includes('red') ? 'from-red-500 to-rose-500' : statusConfig.color.includes('yellow') ? 'from-yellow-500 to-amber-500' : 'from-blue-500 to-cyan-500'} rounded-lg shadow-lg`}>
                            <statusConfig.icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">Table {table.number}</h3>
                            <p className="text-sm text-gray-600">{table.location}</p>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-white/50 transition-colors"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </motion.button>
                      </div>

                      {/* Status Badge */}
                      <div className="mb-4">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full border ${statusConfig.color}`}>
                          {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Capacity:</span>
                          <span className="font-medium flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {table.capacity} people
                          </span>
                        </div>
                        
                        {table.currentOrder && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Current Order:</span>
                            <span className="font-medium text-primary-600">{table.currentOrder}</span>
                          </div>
                        )}

                        {table.waiter && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Waiter:</span>
                            <span className="font-medium">{table.waiter}</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Last Cleaned:</span>
                          <span className="font-medium">{table.lastCleaned}</span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">QR Code:</span>
                          <code className="bg-white/50 px-2 py-1 rounded text-xs font-mono">{table.qrCode}</code>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-3">
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleDownloadQR(table)}
                          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white/70 hover:bg-white/90 text-gray-700 rounded-xl transition-all shadow-sm hover:shadow-md"
                        >
                          <QrCode className="h-4 w-4" />
                          <span>Download QR</span>
                        </motion.button>
                        
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-white/50 hover:bg-white/70 text-gray-600 rounded-lg transition-all"
                          >
                            <Edit className="h-4 w-4" />
                            <span>Edit</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-white/50 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-lg transition-all"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </motion.button>
                        </div>
                      </div>

                      {/* QR Code Preview */}
                      <div className="mt-4 p-4 bg-white/50 rounded-xl text-center">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="inline-block"
                        >
                          <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                        </motion.div>
                        <p className="text-xs text-gray-500">QR Code Preview</p>
                        <p className="text-xs text-gray-400">Scan to order</p>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Add New Table Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: tables.length * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  onClick={() => setShowAddModal(true)}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12 border-2 border-dashed border-gray-300 hover:border-primary-300 transition-all cursor-pointer text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="inline-block mb-4"
                  >
                    <Plus className="h-12 w-12 text-gray-400 group-hover:text-primary-500 transition-colors" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    Add New Table
                  </h3>
                  <p className="text-gray-600">Click to add a new table to your restaurant</p>
                </motion.div>
              </motion.div>
            ) : (
              /* Floor Plan View */
              <motion.div
                key="floor"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8"
              >
                <div className="text-center mb-8">
                  <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Floor Plan View</h3>
                  <p className="text-gray-600">Interactive floor plan coming soon</p>
                </div>
                
                {/* Simple Floor Layout */}
                <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                  {tables.map((table) => {
                    const statusConfig = getStatusConfig(table.status);
                    return (
                      <motion.div
                        key={table.id}
                        whileHover={{ scale: 1.1 }}
                        className={`aspect-square rounded-xl border-2 ${statusConfig.color} flex items-center justify-center cursor-pointer transition-all`}
                        onClick={() => setSelectedTable(table)}
                      >
                        <div className="text-center">
                          <p className="font-bold">{table.number}</p>
                          <statusConfig.icon className={`h-4 w-4 mx-auto ${statusConfig.iconColor}`} />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Tables;