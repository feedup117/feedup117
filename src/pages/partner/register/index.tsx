import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  UtensilsCrossed, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  CheckCircle, 
  Loader2, 
  AlertCircle,
  Info
} from 'lucide-react';
import { registerPartner } from '../../../services/partnerService';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  restaurantName: string;
  gstin: string;
  pan: string;
  fssai: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  agreeToTerms: boolean;
}

const PartnerRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    restaurantName: '',
    gstin: '',
    pan: '',
    fssai: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    // Clear error when field is edited
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    // Required fields
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.restaurantName.trim()) newErrors.restaurantName = 'Restaurant name is required';
    if (!formData.gstin.trim()) newErrors.gstin = 'GSTIN is required';
    if (!formData.pan.trim()) newErrors.pan = 'PAN is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'PIN code is required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    
    // Email format
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone format (10 digits)
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    // GSTIN format (15 characters)
    if (formData.gstin && !/^[0-9A-Z]{15}$/.test(formData.gstin)) {
      newErrors.gstin = 'GSTIN must be 15 characters';
    }
    
    // PAN format (10 characters)
    if (formData.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
      newErrors.pan = 'PAN must be 10 characters (e.g., ABCDE1234F)';
    }
    
    // PIN code format (6 digits)
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'PIN code must be 6 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      await registerPartner(formData);
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        restaurantName: '',
        gstin: '',
        pan: '',
        fssai: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        agreeToTerms: false
      });
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (error) {
      console.error('Registration error:', error);
      setSubmitError('An error occurred during registration. Please try again.');
    } finally {
      setIsSubmitting(false);
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

  // If registration was successful, show success message
  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="h-10 w-10 text-green-600" />
            </motion.div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for registering with FeedUP. Your application has been submitted and is pending approval.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 text-left">
              <div className="flex items-start space-x-3">
                <Info className="h-6 w-6 text-blue-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
                  <p className="text-blue-800 mb-3">
                    Our team will review your application within 1-2 business days. You'll receive an email notification once your account is approved.
                  </p>
                  <p className="text-blue-800">
                    If you have any questions, please contact us at <a href="mailto:support@feedup.com" className="underline hover:text-blue-600">support@feedup.com</a>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
              >
                Return to Home
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSubmitSuccess(false)}
                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all shadow-lg"
              >
                Register Another Restaurant
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <div className="relative z-10 p-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-primary-500 transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8"
        >
          {/* Form Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="inline-flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-3 rounded-xl shadow-lg">
                <UtensilsCrossed className="h-8 w-8 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Feed<span className="text-primary-500">UP</span>
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Partner Registration</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join the FeedUP platform and revolutionize your restaurant's dining experience with our QR code ordering system.
            </p>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-100 border border-red-200 text-red-800 px-4 py-3 rounded-xl mb-6"
              >
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5" />
                  <p>{submitError}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Registration Form */}
          <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-8">
            {/* Owner Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-primary-500" />
                Owner Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    } focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    } focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    } focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
                    placeholder="9876543210"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Restaurant Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-primary-500" />
                Restaurant Information
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700 mb-1">
                    Restaurant Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="restaurantName"
                    name="restaurantName"
                    value={formData.restaurantName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.restaurantName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    } focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
                    placeholder="Spice Garden"
                  />
                  {errors.restaurantName && (
                    <p className="mt-1 text-sm text-red-600">{errors.restaurantName}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="gstin" className="block text-sm font-medium text-gray-700 mb-1">
                      GSTIN <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="gstin"
                      name="gstin"
                      value={formData.gstin}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.gstin ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      } focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
                      placeholder="22AAAAA0000A1Z5"
                    />
                    {errors.gstin && (
                      <p className="mt-1 text-sm text-red-600">{errors.gstin}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">15-character Goods and Services Tax Identification Number</p>
                  </div>
                  <div>
                    <label htmlFor="pan" className="block text-sm font-medium text-gray-700 mb-1">
                      PAN <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="pan"
                      name="pan"
                      value={formData.pan}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.pan ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      } focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
                      placeholder="ABCDE1234F"
                    />
                    {errors.pan && (
                      <p className="mt-1 text-sm text-red-600">{errors.pan}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">10-character Permanent Account Number</p>
                  </div>
                </div>
                <div>
                  <label htmlFor="fssai" className="block text-sm font-medium text-gray-700 mb-1">
                    FSSAI License Number <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="fssai"
                    name="fssai"
                    value={formData.fssai}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="12345678901234"
                  />
                  <p className="mt-1 text-xs text-gray-500">Food Safety and Standards Authority of India license number</p>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary-500" />
                Restaurant Address
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.address ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    } focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none`}
                    placeholder="123 Food Street, Gourmet District"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.city ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      } focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
                      placeholder="Mumbai"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.state ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      } focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
                    >
                      <option value="">Select State</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="West Bengal">West Bengal</option>
                      {/* Add other states as needed */}
                    </select>
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                      PIN Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.pincode ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      } focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
                      placeholder="400001"
                    />
                    {errors.pincode && (
                      <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className={`h-4 w-4 rounded border ${
                      errors.agreeToTerms ? 'border-red-300' : 'border-gray-300'
                    } text-primary-600 focus:ring-primary-500`}
                  />
                </div>
                <div>
                  <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                    I agree to the Terms of Service and Privacy Policy <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    By checking this box, you agree to FeedUP's <a href="#" className="text-primary-600 hover:text-primary-500">Terms of Service</a> and <a href="#" className="text-primary-600 hover:text-primary-500">Privacy Policy</a>.
                  </p>
                  {errors.agreeToTerms && (
                    <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <FileText className="h-5 w-5" />
                    <span>Submit Registration</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default PartnerRegister;