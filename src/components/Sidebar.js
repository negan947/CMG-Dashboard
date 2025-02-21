import React, { useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useProfile } from '../context/ProfileContext';
import { useNavigationGuard } from './NavigationGuard';
import { Disclosure, Transition } from '@headlessui/react';
import { 
  ChartBarIcon, 
  UsersIcon,
  CreditCardIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ShareIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const { profileImage } = useProfile();
  const location = useLocation();
  const { shouldBlock } = useNavigationGuard();

  const handleNavigation = useCallback((e) => {
    if (shouldBlock) {
      if (!window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        e.preventDefault();
        return;
      }
    }
    onClose();
  }, [shouldBlock, onClose]);

  const styleClasses = useMemo(() => ({
    sidebarBg: isDarkMode
      ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900'
      : 'bg-gradient-to-b from-white via-gray-50 to-white',
    itemBg: isDarkMode
      ? 'hover:bg-gray-800/50'
      : 'hover:bg-gray-50',
    activeItemBg: isDarkMode
      ? 'bg-blue-600/20 text-blue-400'
      : 'bg-blue-50 text-blue-600',
    text: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    activeText: isDarkMode ? 'text-blue-400' : 'text-blue-600',
    border: isDarkMode ? 'border-gray-700/50' : 'border-gray-200',
    icon: isDarkMode ? 'text-gray-400' : 'text-gray-500',
    activeIcon: isDarkMode ? 'text-blue-400' : 'text-blue-600',
  }), [isDarkMode]);

  const isLinkActive = (path) => location.pathname.startsWith(path);

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: '-100%', opacity: 0 },
  };

  const menuItems = [
    {
      name: 'Analytics',
      icon: ChartBarIcon,
      items: [
        { name: 'Overview', path: '/analytics/overview' },
        { name: 'Traffic', path: '/analytics/traffic' },
      ],
    },
    {
      name: 'Clients',
      icon: UsersIcon,
      items: [
        { name: 'All Clients', path: '/clients' },
        { name: 'Add New Client', path: '/clients/new' },
      ],
    },
    {
      name: 'Platforms',
      icon: ShareIcon,
      path: '/platforms',
    },
    {
      name: 'Billing',
      icon: CreditCardIcon,
      items: [
        { name: 'Invoices', path: '/billing/invoices' },
        { name: 'Payments', path: '/billing/payments' },
      ],
    },
    {
      name: 'Support',
      icon: QuestionMarkCircleIcon,
      path: '/support',
    },
    {
      name: 'Settings',
      icon: Cog6ToothIcon,
      path: '/settings',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <div
        className={`fixed lg:sticky top-0 left-0 h-[100dvh] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out
        ${styleClasses.sidebarBg} border-r ${styleClasses.border} 
        flex flex-col w-[280px] z-50
        ${location.pathname.includes('/login') || location.pathname.includes('/signup') ? 'hidden' : ''}`}
      >
        {/* Logo Section */}
        <div className="p-4 flex items-center justify-between flex-shrink-0">
          <Link to="/" className="flex items-center group relative" onClick={handleNavigation}>
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-blue-600 to-teal-500 
                text-transparent bg-clip-text gradient-animate relative
                after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 
                after:bg-gradient-to-r after:from-blue-500 after:to-teal-500
                after:transition-all after:duration-300
                group-hover:after:w-full">
                CMG
              </span>
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-400/20 to-transparent
                transform transition-transform duration-300 group-hover:scale-y-125" />
              <div className="hidden sm:flex flex-col">
                <span className={`text-lg font-semibold transition-colors duration-300
                  ${isDarkMode ? 'text-gray-200 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>
                  Dashboard
                </span>
                <span className={`text-xs transition-colors duration-300
                  ${isDarkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500 group-hover:text-gray-600'}`}>
                  Management Panel
                </span>
              </div>
            </div>
          </Link>
          
          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent px-3 py-4">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              item.items ? (
                <Disclosure key={item.name} defaultOpen={item.items.some(subItem => isLinkActive(subItem.path))}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200
                          ${styleClasses.text} ${styleClasses.itemBg} group`}
                      >
                        <div className="flex items-center">
                          <item.icon className={`w-5 h-5 mr-3 ${styleClasses.icon} group-hover:text-blue-500 transition-colors`} />
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        {open ? (
                          <ChevronUpIcon className="w-4 h-4" />
                        ) : (
                          <ChevronDownIcon className="w-4 h-4" />
                        )}
                      </Disclosure.Button>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel className="pl-11 pr-2 pb-2 pt-1 space-y-1">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              onClick={handleNavigation}
                              className={`flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200
                                ${isLinkActive(subItem.path) ? styleClasses.activeItemBg : styleClasses.itemBg}
                                ${isLinkActive(subItem.path) ? styleClasses.activeText : styleClasses.text}`}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                </Disclosure>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavigation}
                  className={`flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group text-sm
                    ${isLinkActive(item.path) ? styleClasses.activeItemBg : styleClasses.itemBg}
                    ${isLinkActive(item.path) ? styleClasses.activeText : styleClasses.text}`}
                >
                  <item.icon 
                    className={`w-5 h-5 mr-3 transition-colors
                      ${isLinkActive(item.path) ? styleClasses.activeIcon : styleClasses.icon}
                      group-hover:text-blue-500`}
                  />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            ))}
          </nav>
        </div>

        {/* Profile Section */}
        <div className={`p-3 border-t ${styleClasses.border} mt-auto flex-shrink-0`}>
          <Link
            to="/account"
            onClick={handleNavigation}
            className={`flex items-center p-2 rounded-lg ${styleClasses.itemBg} transition-all duration-200 group`}
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden mr-3 ring-2 ring-blue-500/20 group-hover:ring-blue-500/50 transition-all duration-200">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">A</span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={`font-medium truncate ${styleClasses.text} group-hover:text-blue-500 transition-colors text-sm`}>
                Account
              </h3>
              <p className="text-xs text-gray-500 truncate">View Profile</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
