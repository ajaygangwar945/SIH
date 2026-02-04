import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Upload,
  Download,
  Code,
  Clock,
  TrendingUp,
  Activity as ActivityIcon
} from 'lucide-react';
import { useActivity, ActivityType } from '../../context/ActivityContext.tsx';

const RecentActivity: React.FC = () => {
  const { activities } = useActivity();

  const getIcon = (type: ActivityType) => {
    switch (type) {
      case 'search': return Search;
      case 'upload': return Upload;
      case 'download': return Download;
      case 'translation': return Code;
      default: return ActivityIcon;
    }
  };

  const getColor = (type: ActivityType) => {
    switch (type) {
      case 'search': return { color: 'text-blue-600', bg: 'bg-blue-100' };
      case 'upload': return { color: 'text-green-600', bg: 'bg-green-100' };
      case 'download': return { color: 'text-purple-600', bg: 'bg-purple-100' };
      case 'translation': return { color: 'text-orange-600', bg: 'bg-orange-100' };
      default: return { color: 'text-gray-600', bg: 'bg-gray-100' };
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
          <p className="text-gray-600 dark:text-gray-400">Latest system interactions</p>
        </div>
        <TrendingUp className="h-5 w-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <ActivityIcon className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p>No recent activity</p>
          </div>
        ) : (
          activities.slice(0, 5).map((activity, index) => {
            const Icon = getIcon(activity.type);
            const style = getColor(activity.type);

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className={`p-2 rounded-lg ${style.bg} dark:bg-opacity-20`}>
                  <Icon className={`h-4 w-4 ${style.color} dark:text-opacity-90`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-200">{activity.action}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <p className="text-xs text-gray-500 dark:text-gray-400">{formatTimeAgo(activity.timestamp)}</p>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full text-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
          View all activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;
