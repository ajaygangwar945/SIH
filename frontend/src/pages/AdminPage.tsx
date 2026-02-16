import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  Settings,
  Database,
  Trash2,
  RefreshCw,
  FileText,
  Download,
  BarChart3
} from 'lucide-react';
import { apiEndpoints } from '../services/api.ts';
import toast from 'react-hot-toast';

const AdminPage: React.FC = () => {
  const queryClient = useQueryClient();

  // Fetch statistics
  const { data: statsData, isLoading: statsLoading } = useQuery(
    'statistics',
    () => apiEndpoints.getStatistics().then(res => res.data),
    { refetchInterval: 30000 }
  );

  // Load sample data mutation
  const loadSampleMutation = useMutation(
    () => apiEndpoints.loadSampleData(),
    {
      onSuccess: () => {
        toast.success('Sample data loaded successfully!');
        queryClient.invalidateQueries('statistics');
        queryClient.invalidateQueries('search');
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to load sample data';
        toast.error(`Error: ${errorMessage}`);
        console.error('Load sample error:', error);
      }
    }
  );

  // Clear data mutation
  const clearMutation = useMutation(
    () => apiEndpoints.clearData(),
    {
      onSuccess: () => {
        toast.success('All data cleared successfully!');
        queryClient.invalidateQueries('statistics');
        queryClient.invalidateQueries('search');
      },
      onError: () => {
        toast.error('Failed to clear data');
      }
    }
  );

  const handleDownloadSample = () => {
    const sampleCSV = `id,term,category,synonyms,icd11_tm2_code,references,description
AY001,"Amlapitta","Ayurvedic Disease","Dyspepsia,Sour indigestion","TM2-AY134","Charaka Samhita","Acid dyspepsia characterized by sour belching and heartburn"
AY002,"Vata Dosha Imbalance","Ayurvedic Constitutional Disorder","Wind disorder,Nervous system imbalance","","Sushruta Samhita","Imbalance of Vata dosha affecting movement and nervous functions"
UN001,"Mizaj-e-Har","Unani Temperament","Hot temperament,Warm constitution","TM2-UN045","Canon of Medicine","Hot temperament in Unani medicine system"`;

    const blob = new Blob([sampleCSV], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-namaste.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Sample CSV downloaded!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <Settings className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Admin Panel</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage data and system settings</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Statistics */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors flex-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">System Statistics</h2>
                <p className="text-gray-600 dark:text-gray-400">Current data store metrics</p>
              </div>
            </div>

            {statsLoading ? (
              <div className="text-center py-8">
                <div className="spinner mx-auto mb-4"></div>
                <p className="text-gray-600">Loading statistics...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Terms</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {statsData?.statistics?.totalTerms || 0}
                      </p>
                    </div>
                    <Database className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Categories</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {statsData?.statistics?.categoryCount || 0}
                      </p>
                    </div>
                    <FileText className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Index Size</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {statsData?.statistics?.indexSize || 0}
                      </p>
                    </div>
                    <RefreshCw className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Cache Keys</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {statsData?.statistics?.cacheStats?.keys || 0}
                      </p>
                    </div>
                    <Database className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col space-y-6">
          {/* Load Sample Data */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors flex-1 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Quick Actions</h3>

            <div className="flex-1 flex flex-col justify-center space-y-6">
              <button
                onClick={() => loadSampleMutation.mutate()}
                disabled={loadSampleMutation.isLoading}
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                {loadSampleMutation.isLoading ? (
                  <>
                    <div className="spinner"></div>
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    <span>Load Sample Data</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadSample}
                className="w-full btn-secondary flex items-center justify-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download Sample CSV</span>
              </button>

              <button
                onClick={() => clearMutation.mutate()}
                disabled={clearMutation.isLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {clearMutation.isLoading ? (
                  <>
                    <div className="spinner"></div>
                    <span>Clearing...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    <span>Clear All Data</span>
                  </>
                )}
              </button>
            </div>
          </div>


        </div>
      </div>


    </div>
  );
};

export default AdminPage;
