import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { Bars3Icon, BellIcon, SunIcon, MoonIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import styles from '../styles/GlassMorphism.module.css';

const TopNav = ({ onToggleSidebar }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const notifications = [
    { id: 1, status: 'new' },
    { id: 2, status: 'new' },
    { id: 3, status: 'read' }
  ];

  const unreadCount = notifications.filter(n => n.status === 'new').length;

  // Don't show TopNav on auth pages
  if (location.pathname.includes('/login') || 
      location.pathname.includes('/signup') || 
      location.pathname.includes('/verify-email')) {
    return null;
  }

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-xl bg-white/[0.02] border-b border-white/[0.1] ${scrolled ? styles.navScrolled : ''}`}>
      <div className="flex items-center justify-between h-16 px-4 max-w-[2000px] mx-auto">
        {/* Mobile Menu Button */}
        <div className="flex-shrink-0 lg:hidden">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleSidebar}
            className={`p-2 rounded-xl ${
              isDarkMode 
                ? 'hover:bg-gray-800 text-gray-400' 
                : 'hover:bg-gray-100 text-gray-600'
            } transition-colors duration-200`}
          >
            <Bars3Icon className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Search Bar - Hide on mobile */}
        <div className="hidden md:flex flex-1 max-w-xl">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search here..."
              className={`${styles.glassInput} pl-12 w-full`}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="w-5 h-5 text-white/40" />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center ml-auto space-x-2 md:space-x-4">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className={`p-2 rounded-xl ${
              isDarkMode 
                ? 'hover:bg-gray-800 text-yellow-500' 
                : 'hover:bg-gray-100 text-gray-600'
            } transition-colors duration-200`}
          >
            {isDarkMode ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </motion.button>

          {/* Notifications - Hide on smallest screens */}
          <div className="relative hidden sm:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-xl ${
                isDarkMode 
                  ? 'hover:bg-gray-800 text-gray-400' 
                  : 'hover:bg-gray-100 text-gray-600'
              } transition-colors duration-200`}
            >
              <BellIcon className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </motion.button>
          </div>

          {/* Profile - Responsive Design */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${styles.glassCard} hidden sm:block`}
          >
            <div className="flex items-center space-x-3 p-2 px-4">
              <div className="hidden md:block">
                <p className="text-sm font-medium text-white/80 truncate">
                  Anna Katrina Marchesi
                </p>
                <p className="text-xs text-white/60 truncate">
                  Head of Administrator
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500/80 to-purple-500/80 flex items-center justify-center text-white font-medium">
                AM
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Search - Show on small screens */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search here..."
            className={`${styles.glassInput} pl-12 w-full`}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-white/40" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
