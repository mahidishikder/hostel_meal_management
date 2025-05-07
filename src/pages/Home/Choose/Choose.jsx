import React from 'react';
import { ShieldCheck, DollarSign, BedDouble, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

function Choose() {
  const reasons = [
    {
      icon: <ShieldCheck className="text-orange-500 w-12 h-12" />,
      title: 'Hygienic Food',
      desc: 'We ensure clean and fresh meals made by expert chefs for your good health.',
    },
    {
      icon: <DollarSign className="text-orange-500 w-12 h-12" />,
      title: 'Affordable Pricing',
      desc: 'Enjoy quality meals without breaking your budget. Value in every package.',
    },
    {
      icon: <BedDouble className="text-orange-500 w-12 h-12" />,
      title: 'Room Services',
      desc: 'Convenient in-hostel delivery and personalized services just for members.',
    },
    {
      icon: <Clock className="text-orange-500 w-12 h-12" />,
      title: '24/7 Support',
      desc: 'Our support team is always available to help you anytime, day or night.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      },
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className='bg-orange-50'>
      <motion.div 
        className="py-20 px-4 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.h2 
          className="text-4xl font-bold text-center mb-16 text-orange-600"
          variants={itemVariants}
        >
          <span className='text-black'>Why</span> Choose Us?
          <div className="w-20 h-1 bg-orange-400 mx-auto mt-4 rounded-full" />
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:bg-orange-50 transition duration-300 text-center border border-gray-100"
              variants={itemVariants}
              whileHover="hover"
            >
              <div className="mb-6 flex justify-center">
                <div className="p-3 bg-orange-100 rounded-full">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-base text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Choose;