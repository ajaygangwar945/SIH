import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Check, Copy, Code2, Link as LinkIcon, RefreshCw } from 'lucide-react';
import { useMutation } from 'react-query';
import { apiEndpoints } from '../services/api.ts';
import toast from 'react-hot-toast';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { useActivity } from '../context/ActivityContext.tsx';

const ExportPage: React.FC = () => {
    const [copiedResource, setCopiedResource] = useState<string>('');
    const { addActivity } = useActivity();

    const codeSystemMutation = useMutation(
        () => apiEndpoints.getCodeSystem(),
        {
            onSuccess: () => {
                toast.success('CodeSystem generated successfully!');
            },
            onError: () => {
                toast.error('Failed to generate CodeSystem');
            }
        }
    );

    const conceptMapMutation = useMutation(
        () => apiEndpoints.getConceptMap(),
        {
            onSuccess: () => {
                toast.success('ConceptMap generated successfully!');
            },
            onError: () => {
                toast.error('Failed to generate ConceptMap');
            }
        }
    );

    const handleCopy = (resource: string, type: 'codesystem' | 'conceptmap') => {
        navigator.clipboard.writeText(resource);
        setCopiedResource(type);
        toast.success(`${type === 'codesystem' ? 'CodeSystem' : 'ConceptMap'} copied to clipboard!`);
        setTimeout(() => setCopiedResource(''), 2000);
    };

    const handleDownload = (resource: any, type: 'codesystem' | 'conceptmap') => {
        const blob = new Blob([JSON.stringify(resource, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `namaste-${type}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success(`${type === 'codesystem' ? 'CodeSystem' : 'ConceptMap'} downloaded!`);
        addActivity('download', `Downloaded ${type === 'codesystem' ? 'CodeSystem' : 'ConceptMap'}`);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                        <Download className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Export Resources</h1>
                        <p className="text-gray-600 dark:text-gray-400">Download FHIR resources and mappings</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CodeSystem Export */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <Code2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">CodeSystem</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Complete NAMASTE terminology with definitions and synonyms.
                    </p>
                    <div className="flex space-x-3">
                        <button
                            onClick={() => codeSystemMutation.mutate()}
                            disabled={codeSystemMutation.isLoading}
                            className="btn-primary flex items-center space-x-2"
                        >
                            {codeSystemMutation.isLoading ? (
                                <>
                                    <div className="spinner"></div>
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <RefreshCw className="h-4 w-4" />
                                    <span>Generate & View</span>
                                </>
                            )}
                        </button>
                        {codeSystemMutation.data && (
                            <button
                                onClick={() => handleDownload(codeSystemMutation.data.data, 'codesystem')}
                                className="btn-secondary flex items-center space-x-2"
                            >
                                <Download className="h-4 w-4" />
                                <span>Download JSON</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* ConceptMap Export */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                            <LinkIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">ConceptMap</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        NAMASTE to ICD-11 TM2 mappings for interoperability.
                    </p>
                    <div className="flex space-x-3">
                        <button
                            onClick={() => conceptMapMutation.mutate()}
                            disabled={conceptMapMutation.isLoading}
                            className="btn-primary flex items-center space-x-2"
                        >
                            {conceptMapMutation.isLoading ? (
                                <>
                                    <div className="spinner"></div>
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <RefreshCw className="h-4 w-4" />
                                    <span>Generate & View</span>
                                </>
                            )}
                        </button>
                        {conceptMapMutation.data && (
                            <button
                                onClick={() => handleDownload(conceptMapMutation.data.data, 'conceptmap')}
                                className="btn-secondary flex items-center space-x-2"
                            >
                                <Download className="h-4 w-4" />
                                <span>Download JSON</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* CodeSystem Preview */}
            <AnimatePresence>
                {codeSystemMutation.data && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-gray-900 rounded-xl overflow-hidden shadow-inner mt-6"
                    >
                        <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                            <span className="text-sm text-gray-400 font-mono">CodeSystem Preview</span>
                            <button
                                onClick={() => handleCopy(JSON.stringify(codeSystemMutation.data.data, null, 2), 'codesystem')}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                {copiedResource === 'codesystem' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </button>
                        </div>
                        <SyntaxHighlighter
                            language="json"
                            customStyle={{
                                margin: 0,
                                padding: '1.25rem',
                                fontSize: window.innerWidth < 640 ? '11px' : '13px',
                                maxHeight: '300px',
                                backgroundColor: 'transparent'
                            }}
                        >
                            {JSON.stringify(codeSystemMutation.data.data, null, 2)}
                        </SyntaxHighlighter>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ConceptMap Preview */}
            <AnimatePresence>
                {conceptMapMutation.data && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-gray-900 rounded-xl overflow-hidden shadow-inner mt-6"
                    >
                        <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                            <span className="text-sm text-gray-400 font-mono">ConceptMap Preview</span>
                            <button
                                onClick={() => handleCopy(JSON.stringify(conceptMapMutation.data.data, null, 2), 'conceptmap')}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                {copiedResource === 'conceptmap' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </button>
                        </div>
                        <SyntaxHighlighter
                            language="json"
                            customStyle={{
                                margin: 0,
                                padding: '1.25rem',
                                fontSize: window.innerWidth < 640 ? '11px' : '13px',
                                maxHeight: '300px',
                                backgroundColor: 'transparent'
                            }}
                        >
                            {JSON.stringify(conceptMapMutation.data.data, null, 2)}
                        </SyntaxHighlighter>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ExportPage;
