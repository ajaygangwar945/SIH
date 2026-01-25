import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Languages,
  FileCode,
  Upload,
  Download,
  Settings,
  BarChart,
  Users
} from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    {
      title: 'Search Terminology',
      description: 'Find NAMASTE terms with advanced fuzzy search',
      icon: Search,
      href: '/search',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Translate Codes',
      description: 'Convert between NAMASTE and ICD-11 codes',
      icon: Languages,
      href: '/translation',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Generate FHIR',
      description: 'Create CodeSystem and ConceptMap resources',
      icon: FileCode,
      href: '/fhir',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Upload Data',
      description: 'Ingest CSV files with NAMASTE terminology',
      icon: Upload,
      href: '/admin',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Export Resources',
      description: 'Download FHIR resources and mappings',
      icon: Download,
      href: '/fhir',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'System Settings',
      description: 'Configure API settings and preferences',
      icon: Settings,
      href: '/admin',
      color: 'from-gray-500 to-gray-600',
      bgColor: 'bg-gray-50'
    },
    {
      title: 'Analytics Dashboard',
      description: 'View system insights and usage metrics',
      icon: BarChart,
      href: '/analytics',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      title: 'User Management',
      description: 'Manage users and access controls',
      icon: Users,
      href: '/admin',
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
          <p className="text-gray-600 dark:text-gray-400">Common tasks and operations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={action.href}
              className={`block ${action.bgColor} dark:bg-opacity-10 rounded-lg p-4 hover:shadow-md transition-all duration-200 group border border-transparent dark:border-gray-700 dark:hover:border-gray-600`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color}`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-gray-200 group-hover:text-gray-700 dark:group-hover:text-white">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
