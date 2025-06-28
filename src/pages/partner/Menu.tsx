import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  Star, 
  Eye,
  EyeOff,
  Clock,
  ChefHat,
  Leaf,
  Flame,
  Award,
  MoreVertical,
  Image as ImageIcon,
  Tag
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isVeg: boolean;
  isAvailable: boolean;
  bestseller?: boolean;
  spicy?: boolean;
  prepTime: number;
  rating: number;
  orders: number;
}

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { id: 'all', name: 'All Items', count: 24, color: 'from-gray-500 to-gray-600' },
    { id: 'starters', name: 'Starters', count: 8, color: 'from-orange-500 to-red-500' },
    { id: 'mains', name: 'Main Course', count: 10, color: 'from-green-500 to-emerald-500' },
    { id: 'biryani', name: 'Biryani', count: 4, color: 'from-yellow-500 to-amber-500' },
    { id: 'desserts', name: 'Desserts', count: 6, color: 'from-pink-500 to-rose-500' },
    { id: 'beverages', name: 'Beverages', count: 8, color: 'from-blue-500 to-cyan-500' },
  ];

  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Chicken Biryani',
      description: 'Aromatic basmati rice cooked with tender chicken and exotic spices',
      price: 320,
      category: 'biryani',
      image: 'https://images.pexels.com/photos/11638960/pexels-photo-11638960.jpeg',
      isVeg: false,
      isAvailable: true,
      bestseller: true,
      spicy: true,
      prepTime: 25,
      rating: 4.8,
      orders: 156,
    },
    {
      id: '2',
      name: 'Paneer Butter Masala',
      description: 'Creamy tomato-based curry with soft paneer cubes',
      price: 280,
      category: 'mains',
      image: 'https://images.pexels.com/photos/6419721/pexels-photo-6419721.jpeg',
      isVeg: true,
      isAvailable: true,
      spicy: false,
      prepTime: 15,
      rating: 4.6,
      orders: 89,
    },
    {
      id: '3',
      name: 'Tandoori Chicken',
      description: 'Juicy chicken marinated in yogurt and spices, grilled to perfection',
      price: 350,
      category: 'starters',
      image: 'https://images.pexels.com/photos/14737816/pexels-photo-14737816.jpeg',
      isVeg: false,
      isAvailable: false,
      bestseller: true,
      spicy: true,
      prepTime: 20,
      rating: 4.7,
      orders: 134,
    },
    {
      id: '4',
      name: 'Gulab Jamun',
      description: 'Soft milk solids dumplings in sweet rose-flavored syrup',
      price: 120,
      category: 'desserts',
      image: 'https://images.pexels.com/photos/6419616/pexels-photo-6419616.jpeg',
      isVeg: true,
      isAvailable: true,
      spicy: false,
      prepTime: 5,
      rating: 4.5,
      orders: 67,
    },
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Menu Management</h1>
            <p className="text-gray-600">Create and manage your restaurant menu items</p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl hover:from-secondary-600 hover:to-secondary-700 transition-all shadow-lg"
            >
              <ImageIcon className="h-4 w-4" />
              <span>Bulk Upload</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
            >
              <Plus className="h-5 w-5" />
              <span>Add New Item</span>
            </motion.button>
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
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                />
              </div>
              
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
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    viewMode === 'list' 
                      ? 'bg-white shadow-sm text-primary-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  List
                </button>
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="flex gap-3 overflow-x-auto mt-6 pb-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{category.name}</span>
                  <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                    selectedCategory === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Menu Items */}
        <motion.div variants={itemVariants}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + searchTerm + viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
              }
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden group"
                >
                  {viewMode === 'grid' ? (
                    <>
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

                        {/* Availability Overlay */}
                        {!item.isAvailable && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                              Out of Stock
                            </span>
                          </div>
                        )}
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
                            <div className="flex items-center space-x-1">
                              <ChefHat className="h-4 w-4" />
                              <span>{item.orders} orders</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                              item.isAvailable 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {item.isAvailable ? 'Available' : 'Out of Stock'}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              {item.isAvailable ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* List View */
                    <div className="flex items-center p-6 space-x-6">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        {!item.isAvailable && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <EyeOff className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                              <div className="flex items-center space-x-2">
                                {item.bestseller && (
                                  <span className="bg-gradient-to-r from-accent-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                    Bestseller
                                  </span>
                                )}
                                {item.isVeg ? (
                                  <Leaf className="h-4 w-4 text-green-500" />
                                ) : (
                                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                                )}
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span>{item.rating}</span>
                              </span>
                              <span>{item.prepTime} min</span>
                              <span>{item.orders} orders</span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-xl font-bold text-primary-500 mb-2">₹{item.price}</p>
                            <div className="flex items-center space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                className="p-2 text-gray-400 hover:text-primary-500 rounded-lg transition-colors"
                              >
                                <Edit className="h-4 w-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                className="p-2 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
                >
                  Add Your First Item
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Menu;