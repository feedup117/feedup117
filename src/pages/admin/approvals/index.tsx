import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Loader2, 
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  RefreshCw
} from 'lucide-react';
import AdminLayout from '../../../components/layout/AdminLayout';
import { getPendingPartners, approvePartner, rejectPartner } from '../../../services/partnerService';
import { Partner } from '../../../types/partner';

const AdminApprovals = () => {
  const [pendingPartners, setPendingPartners] = useState<Partner[]>([]);
  const [filteredPartners, setFilteredPartners] = useState<Partner[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [expandedPartnerId, setExpandedPartnerId] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [partnerToReject, setPartnerToReject] = useState<Partner | null>(null);

  // Fetch pending partners on component mount
  useEffect(() => {
    const fetchPendingPartners = async () => {
      try {
        const partners = await getPendingPartners();
        setPendingPartners(partners);
        setFilteredPartners(partners);
      } catch (error) {
        console.error('Error fetching pending partners:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingPartners();
  }, []);

  // Filter partners based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPartners(pendingPartners);
      return;
    }

    const filtered = pendingPartners.filter(partner => 
      partner.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.phone.includes(searchTerm)
    );

    setFilteredPartners(filtered);
  }, [searchTerm, pendingPartners]);

  // Refresh partners list
  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const partners = await getPendingPartners();
      setPendingPartners(partners);
      setFilteredPartners(partners);
    } catch (error) {
      console.error('Error refreshing pending partners:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle expanded partner details
  const toggleExpandPartner = (id: string) => {
    setExpandedPartnerId(expandedPartnerId === id ? null : id);
  };

  // Handle partner approval
  const handleApprovePartner = async (partner: Partner) => {
    setProcessingId(partner.id);
    try {
      await approvePartner(partner.id);
      
      // Remove from list
      setPendingPartners(prev => prev.filter(p => p.id !== partner.id));
      setFilteredPartners(prev => prev.filter(p => p.id !== partner.id));
      
    } catch (error) {
      console.error('Error approving partner:', error);
      alert('Failed to approve partner. Please try again.');
    } finally {
      setProcessingId(null);
    }
  };

  // Open rejection modal
  const openRejectionModal = (partner: Partner) => {
    setPartnerToReject(partner);
    setRejectionReason('');
    setShowRejectionModal(true);
  };

  // Handle partner rejection
  const handleRejectPartner = async () => {
    if (!partnerToReject) return;
    
    setProcessingId(partnerToReject.id);
    try {
      await rejectPartner(partnerToReject.id, rejectionReason);
      
      // Remove from list
      setPendingPartners(prev => prev.filter(p => p.id !== partnerToReject.id));
      setFilteredPartners(prev => prev.filter(p => p.id !== partnerToReject.id));
      
      // Close modal
      setShowRejectionModal(false);
      setPartnerToReject(null);
      
    } catch (error) {
      console.error('Error rejecting partner:', error);
      alert('Failed to reject partner. Please try again.');
    } finally {
      setProcessingId(null);
    }
  };

  // Export partners list as CSV
  const exportPartnersList = () => {
    if (pendingPartners.length === 0) return;
    
    const headers = ['ID', 'Restaurant Name', 'Owner Name', 'Email', 'Phone', 'Registration Date'];
    const rows = pendingPartners.map(partner => [
      partner.id,
      partner.restaurantName,
      partner.fullName,
      partner.email,
      partner.phone,
      new Date(partner.createdAt).toLocaleDateString()
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `pending-partners-${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Partner Approvals</h1>
            <p className="text-gray-600">Review and approve new restaurant partner applications</p>
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
              onClick={exportPartnersList}
              disabled={pendingPartners.length === 0}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              <span>Export List</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by restaurant name, owner, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
              />
            </div>
          </div>
        </motion.div>

        {/* Pending Partners List */}
        <motion.div variants={itemVariants}>
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
            </div>
          ) : filteredPartners.length > 0 ? (
            <div className="space-y-6">
              {filteredPartners.map((partner) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden"
                >
                  {/* Partner Summary */}
                  <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Building2 className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{partner.restaurantName}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3" />
                            <span>{partner.fullName}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{new Date(partner.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleExpandPartner(partner.id)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center space-x-2"
                      >
                        <Eye className="h-4 w-4" />
                        <span>{expandedPartnerId === partner.id ? 'Hide Details' : 'View Details'}</span>
                        {expandedPartnerId === partner.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleApprovePartner(partner)}
                        disabled={processingId === partner.id}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg disabled:opacity-50 flex items-center space-x-2"
                      >
                        {processingId === partner.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                        <span>Approve</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openRejectionModal(partner)}
                        disabled={processingId === partner.id}
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg hover:from-red-600 hover:to-rose-600 transition-all shadow-lg disabled:opacity-50 flex items-center space-x-2"
                      >
                        <XCircle className="h-4 w-4" />
                        <span>Reject</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedPartnerId === partner.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-200 bg-gray-50 overflow-hidden"
                      >
                        <div className="p-6 space-y-6">
                          {/* Contact Information */}
                          <div>
                            <h4 className="text-md font-semibold text-gray-900 mb-3">Contact Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-gray-400" />
                                <div>
                                  <p className="text-sm text-gray-500">Email</p>
                                  <p className="font-medium text-gray-900">{partner.email}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-gray-400" />
                                <div>
                                  <p className="text-sm text-gray-500">Phone</p>
                                  <p className="font-medium text-gray-900">{partner.phone}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Business Information */}
                          <div>
                            <h4 className="text-md font-semibold text-gray-900 mb-3">Business Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="flex items-center space-x-3">
                                <FileText className="h-5 w-5 text-gray-400" />
                                <div>
                                  <p className="text-sm text-gray-500">GSTIN</p>
                                  <p className="font-medium text-gray-900">{partner.gstin}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <FileText className="h-5 w-5 text-gray-400" />
                                <div>
                                  <p className="text-sm text-gray-500">PAN</p>
                                  <p className="font-medium text-gray-900">{partner.pan}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <FileText className="h-5 w-5 text-gray-400" />
                                <div>
                                  <p className="text-sm text-gray-500">FSSAI</p>
                                  <p className="font-medium text-gray-900">{partner.fssai || 'Not provided'}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Address */}
                          <div>
                            <h4 className="text-md font-semibold text-gray-900 mb-3">Restaurant Address</h4>
                            <div className="flex items-start space-x-3">
                              <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                              <div>
                                <p className="font-medium text-gray-900">{partner.address}</p>
                                <p className="text-gray-700">{partner.city}, {partner.state} - {partner.pincode}</p>
                              </div>
                            </div>
                          </div>

                          {/* Admin Notes */}
                          <div>
                            <h4 className="text-md font-semibold text-gray-900 mb-3">Admin Notes</h4>
                            <textarea
                              placeholder="Add notes about this application (for internal use only)..."
                              rows={3}
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-12 text-center">
              <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No pending applications</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm ? 'No partners match your search criteria.' : 'All partner applications have been processed.'}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Rejection Modal */}
      <AnimatePresence>
        {showRejectionModal && partnerToReject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowRejectionModal(false)}
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
                  <XCircle className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Reject Partner Application
                </h2>
                <p className="text-gray-600">
                  Are you sure you want to reject the application from <span className="font-semibold">{partnerToReject.restaurantName}</span>?
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Rejection (Optional)
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                  placeholder="Provide a reason for rejection..."
                />
                <p className="mt-1 text-xs text-gray-500">
                  This message will be included in the rejection email sent to the applicant.
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowRejectionModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRejectPartner}
                  disabled={processingId === partnerToReject.id}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg hover:from-red-600 hover:to-rose-600 transition-all shadow-lg disabled:opacity-50 flex items-center space-x-2"
                >
                  {processingId === partnerToReject.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  <span>Reject Application</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default AdminApprovals;