import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Search, 
  Filter,
  Wifi,
  MapPin,
  Clock,
  Star,
  Leaf,
  Flame,
  Award,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
  UtensilsCrossed,
  Zap
} from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  prepTime: number;
  isVeg: boolean;
  bestseller?: boolean;
  spicy?: boolean;
  tags?: string[];
}

interface CartItem extends MenuItem {
  quantity: number;
}

const ScanOrderPage = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCart, setShowCart] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(`cart_${tableId}`);
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [tableId]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`cart_${tableId}`, JSON.stringify(cart));
  }, [cart, tableId]);

  const categories = [
    { id: 'all', name: 'All Items', icon: '🍽️', count: 0 },
    { id: 'starters', name: 'Starters', icon: '🥗', count: 0 },
    { id: 'mains', name: 'Main Course', icon: '🍛', count: 0 },
    { id: 'biryani', name: 'Biryani', icon: '🍚', count: 0 },
    { id: 'desserts', name: 'Desserts', icon: '🍰', count: 0 },
    { id: 'beverages', name: 'Beverages', icon: '🥤', count: 0 },
  ];

  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Chicken Biryani',
      description: 'Aromatic basmati rice cooked with tender chicken and exotic spices, served with raita and pickle',
      price: 320,
      category: 'biryani',
      image: 'https://images.pexels.com/photos/11638960/pexels-photo-11638960.jpeg',
      rating: 4.8,
      prepTime: 25,
      isVeg: false,
      bestseller: true,
      spicy: true,
      tags: ['Popular', 'Spicy'],
    },
    {
      id: '2',
      name: 'Paneer Butter Masala',
      description: 'Creamy tomato-based curry with soft paneer cubes, rich in flavor and perfectly spiced',
      price: 280,
      category: 'mains',
      image: 'https://images.pexels.com/photos/6419721/pexels-photo-6419721.jpeg',
      rating: 4.6,
      prepTime: 15,
      isVeg: true,
      tags: ['Vegetarian', 'Creamy'],
    },
    {
      id: '3',
      name: 'Tandoori Chicken',
      description: 'Juicy chicken marinated in yogurt and spices, grilled to perfection in our tandoor oven',
      price: 350,
      category: 'starters',
      image: 'https://images.pexels.com/photos/14737816/pexels-photo-14737816.jpeg',
      rating: 4.7,
      prepTime: 20,
      isVeg: false,
      bestseller: true,
      spicy: true,
      tags: ['Grilled', 'Protein Rich'],
    },
    {
      id: '4',
      name: 'Gulab Jamun',
      description: 'Soft milk solids dumplings in sweet rose-flavored syrup, a perfect end to your meal',
      price: 120,
      category: 'desserts',
      image: 'https://images.pexels.com/photos/6419616/pexels-photo-6419616.jpeg',
      rating: 4.5,
      prepTime: 5,
      isVeg: true,
      tags: ['Sweet', 'Traditional'],
    },
    {
      id: '5',
      name: 'Fresh Lime Soda',
      description: 'Refreshing lime soda with mint and ice, perfect to beat the heat',
      price: 80,
      category: 'beverages',
      image: 'https://images.pexels.com/photos/4946515/pexels-photo-4946515.jpeg',
      rating: 4.3,
      prepTime: 3,
      isVeg: true,
      tags: ['Refreshing', 'Citrus'],
    },
    {
      id: '6',
      name: 'Veg Manchurian',
      description: 'Crispy vegetable balls in tangy Indo-Chinese sauce, a fusion delight',
      price: 220,
      category: 'starters',
      image: 'https://images.pexels.com/photos/11070340/pexels-photo-11070340.jpeg',
      rating: 4.4,
      prepTime: 12,
      isVeg: true,
      tags: ['Indo-Chinese', 'Crispy'],
    },
    {
      id: '7',
      name: 'Mutton Biryani',
      description: 'Slow-cooked mutton with fragrant basmati rice and aromatic spices',
      price: 420,
      category: 'biryani',
      image: 'https://images.pexels.com/photos/11638960/pexels-photo-11638960.jpeg',
      rating: 4.9,
      prepTime: 35,
      isVeg: false,
      bestseller: true,
      spicy: true,
      tags: ['Premium', 'Slow Cooked'],
    },
    {
      id: '8',
      name: 'Masala Chai',
      description: 'Traditional Indian tea brewed with aromatic spices and milk',
      price: 40,
      category: 'beverages',
      image: 'https://images.pexels.com/photos/4946515/pexels-photo-4946515.jpeg',
      rating: 4.2,
      prepTime: 5,
      isVeg: true,
      tags: ['Traditional', 'Hot'],
    },
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const addToCart = (item: MenuItem) => {
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

  const getCartItemQuantity = (itemId: string) => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    if (cart.length > 0) {
      navigate('/waiting', { state: { cart, tableId } });
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-200/20 to-secondary-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-secondary-200/20 to-accent-200/20 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-40 bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="p-2 hover:bg-primary-50 rounded-xl transition-colors text-gray-600 hover:text-primary-600"
              >
                <ArrowLeft className="h-5 w-5" />
              </motion.button>
              <div>
                <div className="flex items-center space-x-3">
                  <h1 className="text-xl font-bold text-gray-900">
                    Table {tableId?.replace('demo-table-', '')}
                  </h1>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center space-x-2 bg-gradient-to-r from-success-100 to-green-100 text-success-700 px-3 py-1 rounded-full border border-success-200"
                  >
                    <Zap className="h-3 w-3" />
                    <span className="text-xs font-medium">Dine-In Mode</span>
                  </motion.div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                  <div className="flex items-center space-x-1">
                    <UtensilsCrossed className="h-3 w-3" />
                    <span>Spice Garden Restaurant</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Wifi className="h-3 w-3" />
                    <span>Connected</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Cart Icon for Mobile */}
            <div className="md:hidden">
              {getTotalItems() > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCart(true)}
                  className="relative p-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl shadow-lg"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <motion.div
                    key={getTotalItems()}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
                  >
                    {getTotalItems()}
                  </motion.div>
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative z-30 bg-white/60 backdrop-blur-lg border-b border-white/20 py-4"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for dishes, ingredients, or cuisine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder-gray-500 shadow-lg"
            />
          </div>
        </div>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-30 bg-white/60 backdrop-blur-lg border-b border-white/20 py-4"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-medium whitespace-nowrap transition-all shadow-lg ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-primary-500/25'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white/90 border border-white/30'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Menu Items */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory + searchTerm}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden group"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        {item.bestseller && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-gradient-to-r from-accent-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center shadow-lg"
                          >
                            <Award className="h-3 w-3 mr-1" />
                            Bestseller
                          </motion.div>
                        )}
                        {item.spicy && (
                          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center shadow-lg">
                            <Flame className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                      
                      {/* Veg/Non-veg Indicator */}
                      <div className="absolute top-3 right-3">
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center shadow-lg bg-white ${
                          item.isVeg ? 'border-green-500' : 'border-red-500'
                        }`}>
                          {item.isVeg ? (
                            <Leaf className="h-3 w-3 text-green-500" />
                          ) : (
                            <div className="w-2 h-2 bg-red-500 rounded-full" />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                          {item.name}
                        </h3>
                        <div className="text-right">
                          <p className="text-xl font-bold text-primary-500">₹{item.price}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                      
                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-lg">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* Stats */}
                      <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{item.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{item.prepTime} min</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Add to Cart Controls */}
                      <div className="flex items-center justify-between">
                        {getCartItemQuantity(item.id) === 0 ? (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => addToCart(item)}
                            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                          >
                            Add to Cart
                          </motion.button>
                        ) : (
                          <div className="flex items-center justify-between w-full">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeFromCart(item.id)}
                              className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-2xl flex items-center justify-center transition-colors shadow-lg"
                            >
                              <Minus className="h-5 w-5 text-gray-600" />
                            </motion.button>
                            
                            <motion.span
                              key={getCartItemQuantity(item.id)}
                              initial={{ scale: 1.2 }}
                              animate={{ scale: 1 }}
                              className="text-xl font-bold text-gray-900 px-4"
                            >
                              {getCartItemQuantity(item.id)}
                            </motion.span>
                            
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => addToCart(item)}
                              className="w-12 h-12 bg-primary-500 hover:bg-primary-600 rounded-2xl flex items-center justify-center transition-colors shadow-lg"
                            >
                              <Plus className="h-5 w-5 text-white" />
                            </motion.button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredItems.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No dishes found</h3>
                  <p className="text-gray-600">Try adjusting your search or browse different categories</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Desktop Cart Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl">
                    <ShoppingCart className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Your Order</h2>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500">Your cart is empty</p>
                    <p className="text-sm text-gray-400 mt-1">Add items to get started</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                      <AnimatePresence>
                        {cart.map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
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
                    </div>

                    <div className="border-t border-gray-200 pt-4 mb-6">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary-600">₹{getTotalPrice()}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{getTotalItems()} item{getTotalItems() > 1 ? 's' : ''}</p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePlaceOrder}
                      className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                    >
                      <span>Place Order</span>
                      <ArrowRight className="h-5 w-5" />
                    </motion.button>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Cart Button */}
      <AnimatePresence>
        {getTotalItems() > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="lg:hidden fixed bottom-6 left-4 right-4 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePlaceOrder}
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 rounded-2xl shadow-2xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 backdrop-blur-lg border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <ShoppingCart className="h-6 w-6" />
                    <motion.div
                      key={getTotalItems()}
                      initial={{ scale: 1.5 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
                    >
                      {getTotalItems()}
                    </motion.div>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Place Order</p>
                    <p className="text-sm opacity-90">{getTotalItems()} item{getTotalItems() > 1 ? 's' : ''}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-xl font-bold">₹{getTotalPrice()}</p>
                  </div>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScanOrderPage;