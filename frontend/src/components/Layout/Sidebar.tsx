import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Search,
  Languages,
  FileCode,
  Shield,

  BarChart3,
  X,
  Activity,
  Upload,
  Download,
  Users,
  Database,
  Sliders
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Search & Browse', href: '/search', icon: Search },
  { name: 'Translation', href: '/translation', icon: Languages },
  { name: 'FHIR Operations', href: '/fhir', icon: FileCode },
  { name: 'Upload Data', href: '/upload', icon: Upload },
  { name: 'Export Resources', href: '/export', icon: Download },
  { name: 'Admin Panel', href: '/admin', icon: Database },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Settings', href: '/settings', icon: Sliders },
  { name: 'Authentication', href: '/auth', icon: Shield },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 lg:pb-0 lg:bg-white dark:lg:bg-gray-800 lg:border-r lg:border-gray-200 dark:lg:border-gray-700 transition-colors duration-200"
      >
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${isActive
                    ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-900 dark:text-primary-100 border-r-2 border-primary-600 dark:border-primary-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* System Status */}
          <div className="mt-8 px-2">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-colors">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">System Status</span>
              </div>
              <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Backend API</span>
                  <span className="text-green-600">Online</span>
                </div>
                <div className="flex justify-between">
                  <span>Database</span>
                  <span className="text-green-600">Connected</span>
                </div>
                <div className="flex justify-between">
                  <span>ICD-11 API</span>
                  <span className="text-green-600">Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Sidebar - Overlay and Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="lg:hidden fixed inset-0 z-40 bg-gray-900/60 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-2xl transition-colors duration-200"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="p-1.5 bg-primary-600 rounded-lg">
                      <Activity className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600">
                      Ayush FHIR
                    </span>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 -mr-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="Close Menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={onClose}
                        className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${isActive
                          ? 'bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 shadow-sm'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                          }`}
                      >
                        <item.icon
                          className={`mr-3 h-5 w-5 transition-colors ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 group-hover:text-primary-500'
                            }`}
                        />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>

                <div className="p-6 border-t border-gray-100 dark:border-gray-700/50">
                  <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">System Live</span>
                    </div>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-tight">
                      NAMASTE Terminology v2.4.1<br />
                      ICD-11 TM2 Interoperability Layer
                    </p>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
