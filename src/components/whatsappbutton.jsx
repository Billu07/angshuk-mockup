import React from 'react';
import { motion } from 'framer-motion';

function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/01683088612?text=Hi%20I’m%20interested%20in%20custom%20apparel"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-36 right-4 bg-[#25D366] text-white w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <i className="fab fa-whatsapp text-xl"></i>
    </motion.a>
  );
}

export default WhatsAppButton;