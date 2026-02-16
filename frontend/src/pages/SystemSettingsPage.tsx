import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Settings,
    Save,
    Server,
    Shield,
    Database
} from 'lucide-react';
import toast from 'react-hot-toast';

const SystemSettingsPage: React.FC = () => {
    const [settings, setSettings] = useState({
        apiEndpoint: 'http://localhost:5000/api',
        enableCaching: true,
        cacheDuration: 3600,
        logLevel: 'info',
        enableAuditLogging: true,
        maxUploadSize: 10,
        maintenanceMode: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSave = () => {
        // Mock save
        toast.success('System settings saved successfully!');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <Settings className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">System Settings</h1>
                        <p className="text-gray-600 dark:text-gray-400">Configure application parameters and behaviors</p>
                    </div>
                </div>
            </div>

            {/* Top Row: API & Security */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* API Configuration */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors"
                >
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <Server className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">API Configuration</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="apiEndpoint" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Backend API Endpoint
                            </label>
                            <input
                                id="apiEndpoint"
                                type="text"
                                name="apiEndpoint"
                                value={settings.apiEndpoint}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="logLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Log Level
                                </label>
                                <select
                                    id="logLevel"
                                    name="logLevel"
                                    value={settings.logLevel}
                                    onChange={handleChange}
                                    title="Log Level"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                >
                                    <option value="debug">Debug</option>
                                    <option value="info">Info</option>
                                    <option value="warn">Warn</option>
                                    <option value="error">Error</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="maxUploadSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Max Upload Size (MB)
                                </label>
                                <input
                                    id="maxUploadSize"
                                    type="number"
                                    name="maxUploadSize"
                                    value={settings.maxUploadSize}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Security */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors"
                >
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                            <Shield className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Security</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Audit Logging</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Track all sensitive actions</p>
                            </div>
                            <div>
                                <label htmlFor="enableAuditLogging" className="sr-only">Enable Audit Logging</label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        id="enableAuditLogging"
                                        type="checkbox"
                                        name="enableAuditLogging"
                                        checked={settings.enableAuditLogging}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                </label>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Maintenance Mode</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Suspend user access</p>
                            </div>
                            <div>
                                <label htmlFor="maintenanceMode" className="sr-only">Enable Maintenance Mode</label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        id="maintenanceMode"
                                        type="checkbox"
                                        name="maintenanceMode"
                                        checked={settings.maintenanceMode}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Middle Section: Caching & Storage (Full Width) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors"
            >
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <Database className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Caching & Storage</h2>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Enable Response Caching</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Cache API responses to improve performance</p>
                        </div>
                        <div>
                            <label htmlFor="enableCaching" className="sr-only">Enable Caching</label>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    id="enableCaching"
                                    type="checkbox"
                                    name="enableCaching"
                                    checked={settings.enableCaching}
                                    onChange={handleChange}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                            </label>
                        </div>
                    </div>

                    {settings.enableCaching && (
                        <div className="pt-2">
                            <label htmlFor="cacheDuration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Cache Duration (seconds)
                            </label>
                            <input
                                id="cacheDuration"
                                type="number"
                                name="cacheDuration"
                                value={settings.cacheDuration}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Bottom Section: Save Button (Full Width) */}
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className="w-full lg:w-auto min-w-[200px] btn-primary flex items-center justify-center space-x-2 py-3 px-8"
                >
                    <Save className="h-5 w-5" />
                    <span>Save Settings</span>
                </button>
            </div>
        </div>
    );
};

export default SystemSettingsPage;
