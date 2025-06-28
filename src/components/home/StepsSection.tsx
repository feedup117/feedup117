import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, ShoppingCart, UtensilsCrossed } from 'lucide-react';

const StepsSection = () => {
  const steps = [
    {
      icon: QrCode,
      title: 'Scan QR Code',
      description: 'Simply scan the QR code on your table to access the digital menu instantly.',
      color: 'from-primary-500 to-primary-600',
      bgColor: 'bg-primary-100',
      step: '01'
    },
    {
      icon: ShoppingCart,
      title: 'Browse & Order',
      description: 'Browse the menu, customize your order, and add items to your cart with ease.',
      color: 'from-secondary-500 to-secondary-600',
      bgColor: 'bg-secondary-100',
      step: '02'
    },
    {
      icon: UtensilsCrossed,
      title: 'Enjoy Your Meal',
      description: 'Track your order in real-time and enjoy freshly prepared food at your table.',
      color: 'from-accent-500 to-accent-600',
      bgColor: 'bg-accent-100',
      step: '03'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, delay: 0.5 }
    }
  };

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-primary-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-primary-200/20 to-secondary-200/20 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-secondary-200/20 to-accent-200/20 rounded-full blur-2xl"
        />
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
            How It{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started with FeedUP in just three simple steps. No app downloads, no complicated setup.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2">
            <motion.div
              variants={lineVariants}
              className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 origin-left"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                <div className="text-center">
                  {/* Step Number */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-xl mb-6 border-4 border-gray-100"
                  >
                    <span className={`text-2xl font-bold bg-gradient-to-br ${step.color} bg-clip-text text-transparent`}>
                      {step.step}
                    </span>
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-10 rounded-full`} />
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`${step.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  >
                    <step.icon className={`h-8 w-8 bg-gradient-to-br ${step.color} bg-clip-text text-transparent`} />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                    {step.description}
                  </p>
                </div>

                {/* Mobile Connection Line */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-8 mb-8">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: 40 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className={`w-0.5 bg-gradient-to-b ${step.color}`}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StepsSection;