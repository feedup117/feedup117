import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, Smartphone, Clock, Users, BarChart3, CreditCard } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: QrCode,
      title: 'QR Code Ordering',
      description: 'Customers scan table QR codes to instantly access your menu and place orders.',
      color: 'from-primary-500 to-primary-600',
      bgColor: 'bg-primary-100',
    },
    {
      icon: Smartphone,
      title: 'No App Required',
      description: 'Works directly in web browsers - no downloads or installations needed.',
      color: 'from-secondary-500 to-secondary-600',
      bgColor: 'bg-secondary-100',
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Live order tracking and status updates for both customers and staff.',
      color: 'from-accent-500 to-accent-600',
      bgColor: 'bg-accent-100',
    },
    {
      icon: Users,
      title: 'Multi-role Management',
      description: 'Separate dashboards for owners, managers, kitchen staff, and servers.',
      color: 'from-success-500 to-success-600',
      bgColor: 'bg-success-100',
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reports',
      description: 'Detailed insights on sales, popular items, and customer behavior.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: CreditCard,
      title: 'Flexible Payments',
      description: 'Support for UPI, online payments, or traditional bill settlement.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-100',
    },
  ];

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="features" className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From QR code ordering to advanced analytics, FeedUP provides all the tools you need to run a modern restaurant efficiently.
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`${feature.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow`}
                >
                  <feature.icon className={`h-8 w-8 bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`} />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;