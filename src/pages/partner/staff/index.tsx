import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  Eye, 
  EyeOff, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  MoreVertical, 
  ChefHat, 
  Coffee, 
  Settings, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Key, 
  Lock, 
  Loader2
} from 'lucide-react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { getStaffMembers, addStaffMember, updateStaffMember, deleteStaffMember, resetPassword } from '../../../services/staffService';
import { StaffMember } from '../../../types/staff';

const PartnerStaff = () => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [filteredStaff, setFilteredStaff] = useState<StaffMember[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  
  // Form state for add/edit
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'servant',
    password: '',
  });

  // Fetch staff members on component mount
  useEffect(() => {
    const fetchStaffMembers = async () => {
      try {
        const members = await getStaffMembers();
        setStaffMembers(members);
        setFilteredStaff(members);
      } catch (error) {
        console.error('Error fetching staff members:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStaffMembers();
  }, []);

  // Filter staff based on search term and role
  useEffect(() => {
    let filtered = [...staffMembers];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(staff => 
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.phone.includes(searchTerm)
      );
    }
    
    // Filter by role
    if (selectedRole !== 'all') {
      filtered = filtered.filter(staff => staff.role === selectedRole);
    }
    
    setFilteredStaff(filtered);
  }, [searchTerm, selectedRole, staffMembers]);

  // Refresh staff list
  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const members = await getStaffMembers();
      setStaffMembers(members);
      setFilteredStaff(members);
    } catch (error) {
      console.error('Error refreshing staff members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Open add modal
  const openAddModal = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'servant',
      password: generateRandomPassword(),
    });
    setShowAddModal(true);
  };

  // Open edit modal
  const openEditModal = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setFormData({
      name: staff.name,
      email: staff.email,
      phone: staff.phone,
      role: staff.role,
      password: '', // Don't show password in edit mode
    });
    setShowEditModal(true);
  };

  // Open delete modal
  const openDeleteModal = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setShowDeleteModal(true);
  };

  // Open reset password modal
  const openResetModal = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setNewPassword(generateRandomPassword());
    setShowResetModal(true);
  };

  // Generate random password
  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  // Handle add staff member
  const handleAddStaff = async () => {
    if (!formData.name || !formData.email || !formData.role || !formData.password) {
      alert('Please fill in all required fields');
      return;
    }
    
    setProcessingId('new');
    try {
      const newStaff = await addStaffMember(formData);
      setStaffMembers(prev => [...prev, newStaff]);
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding staff member:', error);
      alert('Failed to add staff member. Please try again.');
    } finally {
      setProcessingId(null);
    }
  };

  // Handle edit staff member
  const handleEditStaff = async () => {
    if (!selectedStaff || !formData.name || !formData.email || !formData.role) {
      alert('Please fill in all required fields');
      return;
    }
    
    setProcessingId(selectedStaff.id);
    try {
      const updatedStaff = await updateStaffMember(selectedStaff.id, formData);
      setStaffMembers(prev => prev.map(staff => 
        staff.id === selectedStaff.id ? updatedStaff : staff
      ));
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating staff member:', error);
      alert('Failed to update staff member. Please try again.');
    } finally {
      setProcessingId(null);
    }
  };

  // Handle delete staff member
  const handleDeleteStaff = async () => {
    if (!selectedStaff) return;
    
    setProcessingId(selectedStaff.id);
    try {
      await deleteStaffMember(selectedStaff.id);
      setStaffMembers(prev => prev.filter(staff => staff.id !== selectedStaff.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting staff member:', error);
      alert('Failed to delete staff member. Please try again.');
    } finally {
      setProcessingId(null);
    }
  };

  // Handle reset password
  const handleResetPassword = async () => {
    if (!selectedStaff) return;
    
    setProcessingId(selectedStaff.id);
    try {
      await resetPassword(selectedStaff.id, newPassword);
      setShowResetModal(false);
      alert(`Password has been reset successfully for ${selectedStaff.name}`);
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Failed to reset password. Please try again.');
    } finally {
      setProcessingId(null);
    }
  };

  // Get role configuration
  const getRoleConfig = (role: string) => {
    switch (role) {
      case 'manager':
        return {
          icon: Settings,
          color: 'text-purple-600',
          bg: 'bg-purple-100',
          gradient: 'from-purple-500 to-violet-500',
          label: 'Manager'
        };
      case 'kitchen':
        return {
          icon: ChefHat,
          color: 'text-orange-600',
          bg: 'bg-orange-100',
          gradient: 'from-orange-500 to-red-500',
          label: 'Kitchen Staff'
        };
      case 'servant':
        return {
          icon: Coffee,
          color: 'text-blue-600',
          bg: 'bg-blue-100',
          gradient: 'from-blue-500 to-cyan-500',
          label: 'Service Staff'
        };
      default:
        return {
          icon: Users,
          color: 'text-gray-600',
          bg: 'bg-gray-100',
          gradient: 'from-gray-500 to-gray-600',
          label: 'Staff'
        };
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Staff Management</h1>
            <p className="text-gray-600">Manage your restaurant staff accounts and permissions</p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl hover:from-secondary-600 hover:to-secondary-700 transition-all shadow-lg disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openAddModal}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
            >
              <Plus className="h-5 w-5" />
              <span>Add Staff Member</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Role Filter */}
        <motion.div variants={itemVariants}>
          <div className="flex gap-3 overflow-x-auto pb-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedRole('all')}
              className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                selectedRole === 'all'
                  ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>All Staff</span>
              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                selectedRole === 'all'
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {staffMembers.length}
              </span>
            </motion.button>
            
            {['manager', 'kitchen', 'servant'].map((role) => {
              const config = getRoleConfig(role);
              const count = staffMembers.filter(s => s.role === role).length;
              
              return (
                <motion.button
                  key={role}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedRole(role)}
                  className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                    selectedRole === role
                      ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{config.label}s</span>
                  <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                    selectedRole === role
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
              />
            </div>
          </div>
        </motion.div>

        {/* Staff List */}
        <motion.div variants={itemVariants}>
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
            </div>
          ) : filteredStaff.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStaff.map((staff) => {
                const roleConfig = getRoleConfig(staff.role);
                const RoleIcon = roleConfig.icon;
                
                return (
                  <motion.div
                    key={staff.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden group"
                  >
                    {/* Header */}
                    <div className={`bg-gradient-to-r ${roleConfig.gradient} p-6 text-white relative overflow-hidden`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
                          {staff.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            staff.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {staff.isActive ? 'Active' : 'Inactive'}
                          </span>
                          <div className="relative group">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </motion.button>
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all z-10">
                              <div className="p-2 space-y-1">
                                <button 
                                  onClick={() => openEditModal(staff)}
                                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-left"
                                >
                                  <Edit className="h-4 w-4" />
                                  <span>Edit Details</span>
                                </button>
                                <button 
                                  onClick={() => openResetModal(staff)}
                                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-blue-700 hover:bg-blue-50 rounded-lg transition-colors text-left"
                                >
                                  <Key className="h-4 w-4" />
                                  <span>Reset Password</span>
                                </button>
                                <button 
                                  onClick={() => openDeleteModal(staff)}
                                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-700 hover:bg-red-50 rounded-lg transition-colors text-left"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span>Delete Account</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold mb-1">{staff.name}</h3>
                        <div className="flex items-center space-x-2">
                          <RoleIcon className="h-4 w-4" />
                          <span className="text-sm opacity-90">{roleConfig.label}</span>
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
                        {staff.phone && (
                          <div className="flex items-center space-x-3 text-sm text-gray-600">
                            <Phone className="h-4 w-4" />
                            <span>{staff.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>Joined {new Date(staff.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openEditModal(staff)}
                          className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all"
                        >
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openResetModal(staff)}
                          className="flex items-center justify-center px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-all"
                        >
                          <Key className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openDeleteModal(staff)}
                          className="flex items-center justify-center px-3 py-2 bg-white border border-gray-200 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-12 text-center">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No staff members found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedRole !== 'all' 
                  ? 'Try adjusting your search or filter criteria' 
                  : 'Add your first staff member to get started'}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openAddModal}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
              >
                <Plus className="h-5 w-5 mr-2 inline-block" />
                Add Staff Member
              </motion.button>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Add Staff Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl border border-white/20 p-8 max-w-md w-full"
            >
              <div className="text-center mb-6">
                <div className="inline-flex p-4 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg mb-4">
                  <Plus className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Add Staff Member
                </h2>
                <p className="text-gray-600">Create a new staff account with login credentials</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="9876543210"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="manager">Manager</option>
                    <option value="kitchen">Kitchen Staff</option>
                    <option value="servant">Service Staff</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-gray-500">
                      Password will be securely stored
                    </p>
                    <button 
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, password: generateRandomPassword() }))}
                      className="text-xs text-primary-600 hover:text-primary-700"
                    >
                      Generate Random
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddStaff}
                  disabled={processingId === 'new'}
                  className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg disabled:opacity-50 flex items-center space-x-2"
                >
                  {processingId === 'new' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  <span>Add Staff Member</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Staff Modal */}
      <AnimatePresence>
        {showEditModal && selectedStaff && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl border border-white/20 p-8 max-w-md w-full"
            >
              <div className="text-center mb-6">
                <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg mb-4">
                  <Edit className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Edit Staff Member
                </h2>
                <p className="text-gray-600">Update information for {selectedStaff.name}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="9876543210"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="manager">Manager</option>
                    <option value="kitchen">Kitchen Staff</option>
                    <option value="servant">Service Staff</option>
                  </select>
                </div>
                
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">
                      Account Status
                    </label>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input 
                        type="checkbox" 
                        name="isActive" 
                        id="isActive" 
                        checked={selectedStaff.isActive}
                        onChange={() => setSelectedStaff({
                          ...selectedStaff,
                          isActive: !selectedStaff.isActive
                        })}
                        className="sr-only"
                      />
                      <label 
                        htmlFor="isActive"
                        className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                          selectedStaff.isActive ? 'bg-primary-500' : 'bg-gray-300'
                        }`}
                      >
                        <span 
                          className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                            selectedStaff.isActive ? 'translate-x-4' : 'translate-x-0'
                          }`} 
                        />
                      </label>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedStaff.isActive 
                      ? 'Account is active and can log in' 
                      : 'Account is inactive and cannot log in'}
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEditStaff}
                  disabled={processingId === selectedStaff.id}
                  className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg disabled:opacity-50 flex items-center space-x-2"
                >
                  {processingId === selectedStaff.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                  <span>Save Changes</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Staff Modal */}
      <AnimatePresence>
        {showDeleteModal && selectedStaff && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl border border-white/20 p-8 max-w-md w-full"
            >
              <div className="text-center mb-6">
                <div className="inline-flex p-4 bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl shadow-lg mb-4">
                  <Trash2 className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Delete Staff Account
                </h2>
                <p className="text-gray-600">
                  Are you sure you want to delete the account for <span className="font-semibold">{selectedStaff.name}</span>?
                </p>
              </div>

              <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-200">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">This action cannot be undone</p>
                    <p className="text-sm text-red-700">
                      Deleting this account will permanently remove all associated data and access permissions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDeleteStaff}
                  disabled={processingId === selectedStaff.id}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg hover:from-red-600 hover:to-rose-600 transition-all shadow-lg disabled:opacity-50 flex items-center space-x-2"
                >
                  {processingId === selectedStaff.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  <span>Delete Account</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset Password Modal */}
      <AnimatePresence>
        {showResetModal && selectedStaff && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowResetModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl border border-white/20 p-8 max-w-md w-full"
            >
              <div className="text-center mb-6">
                <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg mb-4">
                  <Key className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Reset Password
                </h2>
                <p className="text-gray-600">
                  Reset password for <span className="font-semibold">{selectedStaff.name}</span>
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-gray-500">
                      Password will be securely stored
                    </p>
                    <button 
                      type="button"
                      onClick={() => setNewPassword(generateRandomPassword())}
                      className="text-xs text-primary-600 hover:text-primary-700"
                    >
                      Generate Random
                    </button>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <div className="flex items-start space-x-3">
                    <Lock className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Important Security Notice</p>
                      <p className="text-sm text-yellow-700">
                        Make sure to securely communicate this new password to the staff member. They should change it after their first login.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowResetModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleResetPassword}
                  disabled={processingId === selectedStaff.id}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg disabled:opacity-50 flex items-center space-x-2"
                >
                  {processingId === selectedStaff.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Key className="h-4 w-4" />
                  )}
                  <span>Reset Password</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default PartnerStaff;