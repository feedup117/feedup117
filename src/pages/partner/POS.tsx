import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Search,
  Calculator,
  CreditCard,
  Printer,
  User,
  Phone,
  Percent,
  Save,
  Receipt,
  Clock,
  Tag
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import IndianRupee from '../../components/icons/IndianRupee';

interface POSItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  quantity?: number;
}

interface CartItem extends POSItem {
  quantity: number;
}

const POS = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '' });
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'upi'>('cash');

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'starters', name: 'Starters' },
    { id: 'mains', name: 'Main Course' },
    { id: 'biryani', name: 'Biryani' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'beverages', name: 'Beverages' },
  ];

  const menuItems: POSItem[] = [
    {
      id: '1',
      name: 'Chicken Biryani',
      price: 320,
      category: 'biryani',
      image: 'https://images.pexels.com/photos/11638960/pexels-photo-11638960.jpeg',
    },
    {
      id: '2',
      name: 'Paneer Butter Masala',
      price: 280,
      category: 'mains',
      image: 'https://images.pexels.com/photos/6419721/pexels-photo-6419721.jpeg',
    },
    {
      id: '3',
      name: 'Tandoori Chicken',
      price: 350,
      category: 'starters',
      image: 'https://images.pexels.com/photos/14737816/pexels-photo-14737816.jpeg',
    },
    {
      id: '4',
      name: 'Gulab Jamun',
      price: 120,
      category: 'desserts',
      image: 'https://images.pexels.com/photos/6419616/pexels-photo-6419616.jpeg',
    },
    {
      id: '5',
      name: 'Fresh Lime Soda',
      price: 80,
      category: 'beverages',
      image: 'https://images.pexels.com/photos/4946515/pexels-photo-4946515.jpeg',
    },
    {
      id: '6',
      name: 'Veg Manchurian',
      price: 220,
      category: 'starters',
      image: 'https://images.pexels.com/photos/11070340/pexels-photo-11070340.jpeg',
    },
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (item: POSItem) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(cartItem =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      return prev.filter(cartItem => cartItem.id !== itemId);
    });
  };

  const clearCart = () => {
    setCart([]);
    setCustomerInfo({ name: '', phone: '' });
    setDiscount(0);
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const taxAmount = ((subtotal - discountAmount) * 18) / 100; // 18% GST
  const total = subtotal - discountAmount + taxAmount;

  const handlePrintBill = () => {
    alert('Bill printed successfully!');
    clearCart();
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
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Point of Sale</h1>
            <p className="text-gray-600">Process orders and manage billing</p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center space-x-2 bg-gradient-to-r from-success-100 to-green-100 text-success-700 px-4 py-2 rounded-xl border border-success-200"
            >
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Live POS</span>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Menu Items */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            {/* Search and Categories */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex flex-col gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search menu items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                  />
                </div>
                
                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence mode="wait">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    onClick={() => addToCart(item)}
                    className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 overflow-hidden cursor-pointer group hover:shadow-xl transition-all"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary-500">₹{item.price}</span>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white shadow-lg"
                        >
                          <Plus className="h-4 w-4" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Cart and Billing */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Customer Info */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                  <User className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Customer Info</h3>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Customer Name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Cart */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
                    <ShoppingCart className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
                </div>
                {cart.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </motion.button>
                )}
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">₹{item.price} each</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item.id)}
                          className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </motion.button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => addToCart(item)}
                          className="w-6 h-6 bg-primary-500 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Plus className="h-3 w-3 text-white" />
                        </motion.button>
                      </div>
                      <div className="w-16 text-right">
                        <span className="font-semibold">₹{item.price * item.quantity}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {cart.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No items in cart</p>
                  </div>
                )}
              </div>
            </div>

            {/* Billing */}
            {cart.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                    <Calculator className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Bill Summary</h3>
                </div>

                {/* Discount */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Percent className="h-4 w-4 inline mr-1" />
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Bill Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount ({discount}%):</span>
                      <span>-₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>GST (18%):</span>
                    <span>₹{taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-primary-600">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'cash', name: 'Cash', icon: IndianRupee },
                      { id: 'card', name: 'Card', icon: CreditCard },
                      { id: 'upi', name: 'UPI', icon: Phone },
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`p-3 rounded-lg border transition-all ${
                          paymentMethod === method.id
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <method.icon className="h-4 w-4 mx-auto mb-1" />
                        <span className="text-xs">{method.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePrintBill}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
                  >
                    <Printer className="h-5 w-5" />
                    <span>Print Bill & Complete</span>
                  </motion.button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center space-x-2 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center space-x-2 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                    >
                      <Receipt className="h-4 w-4" />
                      <span>Preview</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default POS;

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