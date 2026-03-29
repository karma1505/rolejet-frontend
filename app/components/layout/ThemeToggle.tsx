'use client';

import { useTheme } from '../providers/ThemeProvider';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="p-2 rounded-xl transition-colors flex items-center justify-center relative overflow-hidden group"
      aria-label="Toggle Theme"
    >
      <div className="relative w-5 h-5">
        <motion.div
          animate={{
            scale: theme === 'dark' ? 0 : 1,
            opacity: theme === 'dark' ? 0 : 1,
            rotate: theme === 'dark' ? 90 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Sun className="w-5 h-5 text-warning" />
        </motion.div>
        
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -90 }}
          animate={{
            scale: theme === 'dark' ? 1 : 0,
            opacity: theme === 'dark' ? 1 : 0,
            rotate: theme === 'dark' ? 0 : -90,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Moon className="w-5 h-5 text-primary" />
        </motion.div>
      </div>
      
      {/* Subtle hover glow */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.button>
  );
}
