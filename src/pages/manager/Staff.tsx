import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Shield,
  Mail,
  Phone,
  Calendar,
  Clock,
  Star,
  AlertTriangle,
  Eye,
  Coffee,
  ChefHat,
  Crown
} from 'lucide-react';
import ManagerLayout from '../../components/layout/ManagerLayout';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'manager' | 'kitchen' | 'servant';
  status: 'active' | 'inactive';
  joinDate: string;
  avatar: string;
  permissions: string[];
  shift: string;
  rating: number;
  totalTips?: number;
}

const ManagerStaff = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const roles = [
    { id: 'all', name: 'All Staff', count: 12, icon: Users, color: 'from-gray-500 to-gray-600' },
    { id: 'manager', name: 'Managers', count: 2, icon: Crown, color: 'from-purple-500 to-violet-500' },
    { id: 'kitchen', name: 'Kitchen Staff', count: 4, icon: ChefHat, color: 'from-orange-500 to-red-500' },
    { id: 'servant', name: 'Service Staff', count: 6, icon: Coffee, color: 'from-blue-500 to-cyan-500' },
  ];

  const staffMembers: StaffMember[] = [
    {
      id: '1',
      name: 'Amit Kumar',
      email: 'amit.kumar@spicegarden.com',
      phone: '+91 98765 43210',
      role: 'manager',
      status: 'active',
      joinDate: '2023-01-15',
      avatar: 'AK',
      permissions: ['menu_management', 'staff_management', 'analytics'],
      shift: 'Morning (9 AM - 6 PM)',
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya.sharma@spicegarden.com',
      phone: '+91 98765 43211',
      role: 'servant',
      status: 'active',
      joinDate: '2023-03-20',
      avatar: 'PS',
      permissions: ['order_management', 'customer_service'],
      shift: 'Evening (2 PM - 11 PM)',
      rating: 4.9,
      totalTips: 15420,
    },
    {
      id: '3',
      name: 'Rahul Singh',
      email: 'rahul.singh@spicegarden.com',
      phone: '+91 98765 43212',
      role: 'kitchen',
      status: 'active',
      joinDate: '2023-02-10',
      avatar: 'RS',
      permissions: ['kitchen_orders', 'inventory'],
      shift: 'Full Day (10 AM - 10 PM)',
      rating: 4.7,
    },
    {
      id: '4',
      name: 'Anita Gupta',
      email: 'anita.gupta@spicegarden.com',
      phone: '+91 98765 43213',
      role: 'servant',
      status: 'inactive',
      joinDate: '2023-04-05',
      avatar: 'AG',
      permissions: ['order_management'],
      shift: 'Morning (9 AM - 6 PM)',
      rating: 4.5,
      totalTips: 8750,
    },
  ];

  const getRoleConfig = (role: string) => {
    switch (role) {
      case 'manager':
        return {
          icon: Crown,
          color: 'text-purple-600',
          bg: 'bg-purple-100',
          gradient: 'from-purple-500 to-violet-500',
        };
      case 'kitchen':
        return {
          icon: ChefHat,
          color: 'text-orange-600',
          bg: 'bg-orange-100',
          gradient: 'from-orange-500 to-red-500',
        };
      case 'servant':
        return {
          icon: Coffee,
          color: 'text-blue-600',
          bg: 'bg-blue-100',
          gradient: 'from-blue-500 to-cyan-500',
        };
      default:
        return {
          icon: Users,
          color: 'text-gray-600',
          bg: 'bg-gray-100',
          gradient: 'from-gray-500 to-gray-600',
        };
    }
  };

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || staff.role === selectedRole;
    return matchesSearch && matchesRole;
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
    <ManagerLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Staff Overview</h1>
            <p className="text-gray-600">View staff information and performance (read-only access)</p>
          </div>
        </motion.div>

        {/* Manager Restrictions Notice */}
        <motion.div variants={itemVariants}>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6">
            <div className="flex items-start space-x-4">
              <Shield className="h-6 w-6 text-amber-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 mb-2">Manager Access Restrictions</h3>
                <p className="text-amber-800 text-sm mb-3">
                  As a manager, you can view staff information and performance metrics but cannot add, edit, or remove staff members. 
                  These actions require owner permissions.
                </p>
                <div className="flex items-center space-x-4 text-sm text-amber-700">
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>View Only</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <AlertTriangle className="h-4 w-4" />
                    <span>No Edit Access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => setSelectedRole(role.id)}
              className={`cursor-pointer relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all ${
                selectedRole === role.id ? 'ring-2 ring-primary-500 ring-offset-2' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${role.color} shadow-lg`}>
                  <role.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{role.name}</p>
                <p className="text-3xl font-bold text-gray-900">{role.count}</p>
              </div>
              
              {selectedRole === role.id && (
                <motion.div
                  layoutId="selectedRole"
                  className="absolute inset-0 bg-primary-500/5 rounded-2xl"
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Search */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search staff members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
              />
            </div>
          </div>
        </motion.div>

        {/* Staff Grid */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStaff.map((staff, index) => {
              const roleConfig = getRoleConfig(staff.role);
              return (
                <motion.div
                  key={staff.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden group"
                >
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${roleConfig.gradient} p-6 text-white relative overflow-hidden`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                        {staff.avatar}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          staff.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {staff.status}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-1">{staff.name}</h3>
                      <div className="flex items-center space-x-2">
                        <roleConfig.icon className="h-4 w-4" />
                        <span className="text-sm opacity-90 capitalize">{staff.role}</span>
                      </div>
                    </div>

                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Contact Info */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{staff.email}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{staff.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{staff.shift}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {new Date(staff.joinDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-semibold text-gray-900">{staff.rating}</span>
                        <span className="text-sm text-gray-500">rating</span>
                      </div>
                      {staff.totalTips && (
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Total Tips</p>
                          <p className="font-bold text-green-600">₹{staff.totalTips.toLocaleString()}</p>
                        </div>
                      )}
                    </div>

                    {/* Permissions */}
                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-700 mb-2">Permissions</p>
                      <div className="flex flex-wrap gap-2">
                        {staff.permissions.slice(0, 2).map((permission, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                            {permission.replace('_', ' ')}
                          </span>
                        ))}
                        {staff.permissions.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                            +{staff.permissions.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* View Only Notice */}
                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">View Only Access</p>
                          <p className="text-xs text-gray-500">Contact owner to modify staff details</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredStaff.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-12">
                <div className="text-gray-400 mb-4">
                  <Users className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No staff members found</h3>
                <p className="text-gray-600">Try adjusting your search criteria</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </ManagerLayout>
  );
};

export default ManagerStaff;