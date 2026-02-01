import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from 'react-query';
import {
  FileCode,
  Download,
  Copy,
  Check,
  Eye,
  EyeOff,
  RefreshCw,
  Code2,
  Link
} from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { apiEndpoints } from '../services/api.ts';
import toast from 'react-hot-toast';

const FHIRPage: React.FC = () => {
  const [showCodeSystem, setShowCodeSystem] = useState(false);
  const [showConceptMap, setShowConceptMap] = useState(false);
  const [copiedResource, setCopiedResource] = useState<string>('');

  // Generate CodeSystem mutation
  const codeSystemMutation = useMutation(
    () => apiEndpoints.getCodeSystem(),
    {
      onSuccess: () => {
        toast.success('CodeSystem generated successfully!');
        setShowCodeSystem(true);
      },
      onError: () => {
        toast.error('Failed to generate CodeSystem');
      }
    }
  );

  // Generate ConceptMap mutation
  const conceptMapMutation = useMutation(
    () => apiEndpoints.getConceptMap(),
    {
      onSuccess: () => {
        toast.success('ConceptMap generated successfully!');
        setShowConceptMap(true);
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
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg">
            <FileCode className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">FHIR Operations</h1>
            <p className="text-gray-600 dark:text-gray-400">Generate and manage FHIR resources</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CodeSystem Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800 transition-colors">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Code2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">NAMASTE CodeSystem</h3>
                <p className="text-blue-700 dark:text-blue-300">Complete terminology resource</p>
              </div>
            </div>

            <p className="text-blue-800 dark:text-blue-200 text-sm mb-4">
              Generate a FHIR CodeSystem resource containing all NAMASTE terms with their definitions,
              synonyms, and metadata.
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
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    <span>Generate CodeSystem</span>
                  </>
                )}
              </button>

              {codeSystemMutation.data && (
                <button
                  onClick={() => setShowCodeSystem(!showCodeSystem)}
                  className="btn-secondary flex items-center space-x-2 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  {showCodeSystem ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span>{showCodeSystem ? 'Hide' : 'View'}</span>
                </button>
              )}
            </div>
          </div>

          {/* ConceptMap Card */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800 transition-colors">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Link className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">ConceptMap</h3>
                <p className="text-purple-700 dark:text-purple-300">NAMASTE to ICD-11 mapping</p>
              </div>
            </div>

            <p className="text-purple-800 dark:text-purple-200 text-sm mb-4">
              Create a FHIR ConceptMap resource that maps NAMASTE terms to their corresponding
              ICD-11 TM2 codes.
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
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    <span>Generate ConceptMap</span>
                  </>
                )}
              </button>

              {conceptMapMutation.data && (
                <button
                  onClick={() => setShowConceptMap(!showConceptMap)}
                  className="btn-secondary flex items-center space-x-2 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  {showConceptMap ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span>{showConceptMap ? 'Hide' : 'View'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CodeSystem Results */}
      <AnimatePresence>
        {showCodeSystem && codeSystemMutation.data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Code2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">NAMASTE CodeSystem</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {codeSystemMutation.data.data.concept?.length || 0} concepts
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <button
                    onClick={() => handleCopy(JSON.stringify(codeSystemMutation.data.data, null, 2), 'codesystem')}
                    className="btn-outline flex items-center justify-center space-x-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    {copiedResource === 'codesystem' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span>Copy</span>
                  </button>

                  <button
                    onClick={() => handleDownload(codeSystemMutation.data.data, 'codesystem')}
                    className="btn-primary flex items-center justify-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="bg-gray-900 rounded-xl overflow-hidden shadow-inner">
                <SyntaxHighlighter
                  language="json"
                  customStyle={{
                    margin: 0,
                    padding: '1.25rem',
                    fontSize: '13px',
                    maxHeight: '500px',
                    backgroundColor: 'transparent'
                  }}
                >
                  {JSON.stringify(codeSystemMutation.data.data, null, 2)}
                </SyntaxHighlighter>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ConceptMap Results */}
      <AnimatePresence>
        {showConceptMap && conceptMapMutation.data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Link className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">NAMASTE to ICD-11 ConceptMap</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {conceptMapMutation.data.data.group?.[0]?.element?.length || 0} mappings
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <button
                    onClick={() => handleCopy(JSON.stringify(conceptMapMutation.data.data, null, 2), 'conceptmap')}
                    className="btn-outline flex items-center justify-center space-x-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    {copiedResource === 'conceptmap' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span>Copy</span>
                  </button>

                  <button
                    onClick={() => handleDownload(conceptMapMutation.data.data, 'conceptmap')}
                    className="btn-primary flex items-center justify-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="bg-gray-900 rounded-xl overflow-hidden shadow-inner">
                <SyntaxHighlighter
                  language="json"
                  customStyle={{
                    margin: 0,
                    padding: '1.25rem',
                    fontSize: '13px',
                    maxHeight: '500px',
                    backgroundColor: 'transparent'
                  }}
                >
                  {JSON.stringify(conceptMapMutation.data.data, null, 2)}
                </SyntaxHighlighter>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FHIR Information */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700/50 rounded-xl p-6 transition-colors">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">About FHIR Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-200 mb-2">CodeSystem Resource</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              A FHIR CodeSystem defines a set of codes drawn from one or more code systems.
              Our NAMASTE CodeSystem includes all traditional medicine terms with their
              definitions, synonyms, and metadata.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-200 mb-2">ConceptMap Resource</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              A FHIR ConceptMap defines the relationships between concepts in different
              code systems. Our ConceptMap maps NAMASTE terms to their corresponding
              ICD-11 TM2 codes for interoperability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FHIRPage;
