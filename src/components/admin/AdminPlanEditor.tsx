import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Edit, 
  Save, 
  X, 
  Plus, 
  Trash2, 
  AlertTriangle,
  Percent,
  Check
} from 'lucide-react';
import { Plan } from '../../services/razorpayService';
import IndianRupee from '../icons/IndianRupee';

interface AdminPlanEditorProps {
  plans: Plan[];
  onSavePlan: (plan: Plan) => void;
  onDeletePlan: (planId: string) => void;
}

const AdminPlanEditor: React.FC<AdminPlanEditorProps> = ({ 
  plans, 
  onSavePlan, 
  onDeletePlan 
}) => {
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<string | null>(null);
  const [editedPlan, setEditedPlan] = useState<Plan | null>(null);
  const [newPlan, setNewPlan] = useState<Partial<Plan>>({
    name: '',
    description: '',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [],
    limitations: []
  });
  const [newFeature, setNewFeature] = useState('');
  const [newLimitation, setNewLimitation] = useState('');

  // Start editing a plan
  const handleEditPlan = (plan: Plan) => {
    setEditingPlanId(plan.id);
    setEditedPlan({ ...plan });
  };

  // Save edited plan
  const handleSaveEdit = () => {
    if (editedPlan) {
      onSavePlan(editedPlan);
      setEditingPlanId(null);
      setEditedPlan(null);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingPlanId(null);
    setEditedPlan(null);
  };

  // Confirm plan deletion
  const handleConfirmDelete = () => {
    if (planToDelete) {
      onDeletePlan(planToDelete);
      setShowDeleteModal(false);
      setPlanToDelete(null);
    }
  };

  // Prepare to delete a plan
  const handleDeletePlan = (planId: string) => {
    setPlanToDelete(planId);
    setShowDeleteModal(true);
  };

  // Add a feature to new plan
  const handleAddFeature = () => {
    if (newFeature.trim() && newPlan) {
      setNewPlan({
        ...newPlan,
        features: [...(newPlan.features || []), newFeature.trim()]
      });
      setNewFeature('');
    }
  };

  // Add a limitation to new plan
  const handleAddLimitation = () => {
    if (newLimitation.trim() && newPlan) {
      setNewPlan({
        ...newPlan,
        limitations: [...(newPlan.limitations || []), newLimitation.trim()]
      });
      setNewLimitation('');
    }
  };

  // Remove a feature from new plan
  const handleRemoveFeature = (index: number) => {
    if (newPlan && newPlan.features) {
      const updatedFeatures = [...newPlan.features];
      updatedFeatures.splice(index, 1);
      setNewPlan({ ...newPlan, features: updatedFeatures });
    }
  };

  // Remove a limitation from new plan
  const handleRemoveLimitation = (index: number) => {
    if (newPlan && newPlan.limitations) {
      const updatedLimitations = [...newPlan.limitations];
      updatedLimitations.splice(index, 1);
      setNewPlan({ ...newPlan, limitations: updatedLimitations });
    }
  };

  // Create new plan
  const handleCreatePlan = () => {
    if (
      newPlan.name &&
      newPlan.description &&
      newPlan.monthlyPrice &&
      newPlan.yearlyPrice &&
      newPlan.features?.length
    ) {
      const planId = newPlan.name.toLowerCase().replace(/\s+/g, '-');
      const fullPlan: Plan = {
        id: planId,
        name: newPlan.name,
        description: newPlan.description,
        monthlyPrice: Number(newPlan.monthlyPrice),
        yearlyPrice: Number(newPlan.yearlyPrice),
        features: newPlan.features || [],
        limitations: newPlan.limitations || []
      };
      
      onSavePlan(fullPlan);
      setShowAddModal(false);
      setNewPlan({
        name: '',
        description: '',
        monthlyPrice: 0,
        yearlyPrice: 0,
        features: [],
        limitations: []
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Subscription Plans</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
        >
          <Plus className="h-4 w-4" />
          <span>Add Plan</span>
        </motion.button>
      </div>

      {/* Plans Table */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yearly Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Features</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {plans.map((plan) => (
                <tr key={plan.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingPlanId === plan.id ? (
                      <input
                        type="text"
                        value={editedPlan?.name || ''}
                        onChange={(e) => setEditedPlan({ ...editedPlan!, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : (
                      <div>
                        <div className="font-medium text-gray-900">{plan.name}</div>
                        <div className="text-sm text-gray-500">{plan.description}</div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingPlanId === plan.id ? (
                      <div className="flex items-center">
                        <IndianRupee className="h-4 w-4 text-gray-500 mr-1" />
                        <input
                          type="number"
                          value={editedPlan?.monthlyPrice || 0}
                          onChange={(e) => setEditedPlan({ ...editedPlan!, monthlyPrice: Number(e.target.value) })}
                          className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    ) : (
                      <div className="font-medium text-gray-900">₹{plan.monthlyPrice}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingPlanId === plan.id ? (
                      <div className="flex items-center">
                        <IndianRupee className="h-4 w-4 text-gray-500 mr-1" />
                        <input
                          type="number"
                          value={editedPlan?.yearlyPrice || 0}
                          onChange={(e) => setEditedPlan({ ...editedPlan!, yearlyPrice: Number(e.target.value) })}
                          className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    ) : (
                      <div className="font-medium text-gray-900">₹{plan.yearlyPrice}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{plan.features.length} features</div>
                    <div className="text-sm text-gray-500">{plan.limitations.length} limitations</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {editingPlanId === plan.id ? (
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleSaveEdit}
                          className="p-2 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <Save className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleCancelEdit}
                          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </motion.button>
                      </div>
                    ) : (
                      <div className="flex space-x-2 justify-end">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEditPlan(plan)}
                          className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeletePlan(plan.id)}
                          className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Plan Modal */}
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
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
                    <Plus className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Add New Plan</h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAddModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Premium Plus"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    placeholder="Describe what this plan provides"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 resize-none"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                    <input
                      type="number"
                      placeholder="e.g., 499"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Billing Cycle</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 appearance-none">
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                      <option value="one-time">One-time</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 appearance-none">
                    <option value="branding">Branding</option>
                    <option value="integration">Integration</option>
                    <option value="support">Support</option>
                    <option value="feature">Feature</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="activeStatus"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                    defaultChecked
                  />
                  <label htmlFor="activeStatus" className="ml-2 text-sm text-gray-700">
                    Add-on active and available for purchase
                  </label>
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
                  className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
                >
                  <Save className="h-4 w-4 mr-2 inline-block" />
                  Create Plan
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Plan Modal */}
      <AnimatePresence>
        {showDeleteModal && (
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
                  Delete Plan
                </h2>
                <p className="text-gray-600">Are you sure you want to delete this plan? This action cannot be undone.</p>
              </div>

              <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-200">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Warning: This may affect users</p>
                    <p className="text-sm text-red-700">Partners currently on this plan will need to be migrated to another plan.</p>
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
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg hover:from-red-600 hover:to-rose-600 transition-all shadow-lg"
                >
                  <Trash2 className="h-4 w-4 mr-2 inline-block" />
                  Delete Plan
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPlanEditor;