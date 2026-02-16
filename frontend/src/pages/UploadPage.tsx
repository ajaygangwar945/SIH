import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, CheckCircle, AlertTriangle } from 'lucide-react';
import { useMutation, useQueryClient } from 'react-query';
import { apiEndpoints } from '../services/api.ts';
import toast from 'react-hot-toast';
import { useActivity } from '../context/ActivityContext.tsx';

const UploadPage: React.FC = () => {
    const [csvContent, setCsvContent] = useState('');
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();
    const { addActivity } = useActivity();

    const uploadMutation = useMutation(
        (csvData: string) => apiEndpoints.ingestCSV(csvData),
        {
            onSuccess: () => {
                toast.success('CSV uploaded and processed successfully!');
                setUploadStatus('success');
                addActivity('upload', 'Uploaded CSV file');
                queryClient.invalidateQueries('statistics');
                queryClient.invalidateQueries('search');
            },
            onError: () => {
                toast.error('Failed to upload CSV');
                setUploadStatus('error');
            }
        }
    );

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.type !== 'text/csv') {
            toast.error('Please select a CSV file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            setCsvContent(content);
            setUploadStatus('idle');
        };
        reader.readAsText(file);
    };

    const handleUpload = () => {
        if (!csvContent.trim()) {
            toast.error('Please select a CSV file or enter CSV content');
            return;
        }

        setUploadStatus('uploading');
        uploadMutation.mutate(csvContent);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <Upload className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Upload Data</h1>
                        <p className="text-gray-600 dark:text-gray-400">Ingest NAMASTE terminology from CSV files</p>
                    </div>
                </div>
            </div>

            {/* Upload Area */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors">
                <div className="space-y-6">
                    {/* File Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Select CSV File
                        </label>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".csv"
                            onChange={handleFileUpload}
                            title="Choose CSV file"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-primary-900/30 dark:file:text-primary-400"
                        />
                    </div>

                    {/* CSV Content Preview */}
                    {csvContent && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                CSV Content Preview
                            </label>
                            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto max-h-40">
                                <pre>{csvContent.split('\n').slice(0, 5).join('\n')}</pre>
                                {csvContent.split('\n').length > 5 && (
                                    <div className="text-gray-500">... and {csvContent.split('\n').length - 5} more lines</div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Upload Status */}
                    <AnimatePresence>
                        {uploadStatus !== 'idle' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className={`p-4 rounded-lg ${uploadStatus === 'success' ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' :
                                    uploadStatus === 'error' ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' :
                                        'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                                    }`}
                            >
                                <div className="flex items-center space-x-2">
                                    {uploadStatus === 'success' ? (
                                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                                    ) : uploadStatus === 'error' ? (
                                        <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                                    ) : (
                                        <div className="spinner"></div>
                                    )}
                                    <span className={`font-medium ${uploadStatus === 'success' ? 'text-green-800 dark:text-green-300' :
                                        uploadStatus === 'error' ? 'text-red-800 dark:text-red-300' :
                                            'text-blue-800 dark:text-blue-300'
                                        }`}>
                                        {uploadStatus === 'success' ? 'Upload successful!' :
                                            uploadStatus === 'error' ? 'Upload failed!' :
                                                'Uploading...'}
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Upload Button */}
                    <button
                        onClick={handleUpload}
                        disabled={uploadMutation.isLoading || !csvContent}
                        className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {uploadMutation.isLoading ? (
                            <>
                                <div className="spinner"></div>
                                <span>Uploading...</span>
                            </>
                        ) : (
                            <>
                                <Upload className="h-4 w-4" />
                                <span>Upload CSV</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadPage;
