import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import {
  Search,
  Languages,
  FileCode,
  BarChart3,
  Activity,
  Stethoscope,
  Database,
  Globe
} from 'lucide-react';
import { apiEndpoints } from '../services/api.ts';
import LoadingSpinner from '../components/Common/LoadingSpinner.tsx';
import QuickStats from '../components/Dashboard/QuickStats.tsx';
import RecentActivity from '../components/Dashboard/RecentActivity.tsx';
import QuickActions from '../components/Dashboard/QuickActions.tsx';

const Dashboard: React.FC = () => {
  const { data: healthData, isLoading: healthLoading } = useQuery(
    'health',
    () => apiEndpoints.health().then(res => res.data),
    { refetchInterval: 30000 }
  );

  const { data: statsData, isLoading: statsLoading } = useQuery(
    'statistics',
    () => apiEndpoints.getStatistics().then(res => res.data),
    { refetchInterval: 60000 }
  );

  const isSystemHealthy = healthData?.status === 'healthy';
  const systemStatusLabel = isSystemHealthy ? 'Healthy' : 'Needs Attention';
  const environmentLabel = healthData?.services?.environment
    ? healthData.services.environment.replace(/^\w/, (c: string) => c.toUpperCase())
    : 'Development';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  if (healthLoading || statsLoading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-accent-600 to-secondary-600 opacity-90"></div>
        <div className="relative bg-white bg-opacity-10 backdrop-blur-sm p-5 sm:p-8 text-white">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-6 text-center sm:text-left">
            <div className="p-3 bg-white bg-opacity-20 rounded-xl shrink-0">
              <Stethoscope className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Ayush FHIR Microservice</h1>
              <p className="text-sm sm:text-base text-white text-opacity-90">Traditional Indian Medicine meets Modern Healthcare Standards</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Database className="h-6 w-6 shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm text-white text-opacity-80 leading-none mb-1">Total Terms</p>
                  <p className="text-xl sm:text-2xl font-bold">{statsData?.statistics?.totalTerms || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Activity className="h-6 w-6 shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm text-white text-opacity-80 leading-none mb-1">System Status</p>
                  <p
                    className={`text-xl sm:text-2xl font-bold ${isSystemHealthy ? 'text-green-300' : 'text-red-300'
                      }`}
                  >
                    {systemStatusLabel}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Globe className="h-6 w-6 shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm text-white text-opacity-80 leading-none mb-1">Environment</p>
                  <p className="text-xl sm:text-2xl font-bold text-green-300">{environmentLabel}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div>
        <QuickStats data={statsData?.statistics} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="lg:col-span-2 h-full">
          <QuickActions />
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={itemVariants} className="h-full">
          <RecentActivity />
        </motion.div>
      </div>

      {/* Feature Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <Search className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Advanced Search</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Fuzzy search with scoring</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-accent-100 dark:bg-accent-900/30 rounded-lg">
              <Languages className="h-6 w-6 text-accent-600 dark:text-accent-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Translation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">NAMASTE ↔ ICD-11</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg">
              <FileCode className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">FHIR Resources</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">CodeSystem & ConceptMap</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Analytics</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Data insights & metrics</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
