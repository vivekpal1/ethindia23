import React from 'react';
import { motion } from 'framer-motion';

const ContextMenu = ({ items, position }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="absolute bg-gray-800 text-white shadow-lg rounded-md overflow-hidden"
      style={{ top: position.y, left: position.x }}
    >
      <ul className="text-sm">
        {items.map((item, index) => (
          <li
            key={index}
            className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition-colors duration-150 ease-in-out"
            onClick={item.action}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ContextMenu;
