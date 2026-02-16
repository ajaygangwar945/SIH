import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from 'react-query';
import {
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Tag,
  ExternalLink,
  Copy,
  Check,
  Activity
} from 'lucide-react';
import { apiEndpoints } from '../services/api.ts';
import LoadingSpinner from '../components/Common/LoadingSpinner.tsx';
import toast from 'react-hot-toast';

import { useActivity } from '../context/ActivityContext.tsx';

interface SearchResult {
  term: {
    id: string;
    term: string;
    category: string;
    synonyms: string[];
    icd11_tm2_code?: string;
    references: string;
    description: string;
  };
  score: number;
}

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'name'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string>('');
  const { addActivity } = useActivity();

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Log search activity
  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      addActivity('search', `Searched for "${debouncedQuery}"`);
    }
  }, [debouncedQuery, addActivity]);

  // Fetch search results
  const { data: searchResults, isLoading, error } = useQuery<SearchResult[]>(
    ['search', debouncedQuery, categoryFilter],
    async () => {
      const response = await apiEndpoints.searchTerms(debouncedQuery, { category: categoryFilter || undefined });
      return (response.data.results as SearchResult[]) || [];
    },
    {
      enabled: debouncedQuery.length >= 2,
    }
  );

  // Fetch categories for filter
  const { data: statsData } = useQuery<string[]>(
    'statistics',
    async () => {
      const response = await apiEndpoints.getStatistics();
      const categories = response.data.statistics?.categories;
      return Array.isArray(categories) ? categories : [];
    },
    { refetchOnWindowFocus: false }
  );

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    toast.success('ID copied to clipboard!');
    setTimeout(() => setCopiedId(''), 2000);
  };

  const sortedResults = React.useMemo(() => {
    if (!searchResults) return [];

    return [...searchResults].sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'score') {
        comparison = a.score - b.score;
      } else {
        comparison = a.term.term.localeCompare(b.term.term);
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [searchResults, sortBy, sortOrder]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors font-sans">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg shrink-0">
            <Search className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Search & Browse</h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Find NAMASTE terminology</p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search terminology..."
            className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base sm:text-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:items-center sm:gap-4 mt-4">
          <div className="flex items-center space-x-2 flex-grow sm:flex-grow-0">
            <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400 shrink-0" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              title="Category Filter"
              className="flex-1 sm:w-48 px-3 py-1.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            >
              <option value="">All Categories</option>
              {Array.isArray(statsData) && statsData.map((category: string) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'score' | 'name')}
              title="Sort By"
              className="flex-1 sm:w-auto px-3 py-1.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            >
              <option value="score">Sort by Score</option>
              <option value="name">Sort by Name</option>
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 transition-colors shrink-0"
              title={sortOrder === 'asc' ? 'Descending' : 'Ascending'}
            >
              {sortOrder === 'asc' ? (
                <SortAsc className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              ) : (
                <SortDesc className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
        {isLoading && debouncedQuery && (
          <div className="p-8">
            <LoadingSpinner message="Searching..." />
          </div>
        )}

        {!!error && (
          <div className="p-8 text-center">
            <div className="text-red-600 mb-2 font-medium">Search failed</div>
            <p className="text-sm text-gray-600">Please try again</p>
          </div>
        )}

        {!isLoading && !error && debouncedQuery && (
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Results ({sortedResults.length})
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 italic">
                {query && `Results for "${query}"`}
              </p>
            </div>

            <AnimatePresence>
              <div className="space-y-4">
                {sortedResults.map((result: SearchResult, index: number) => (
                  <motion.div
                    key={result.term.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: Math.min(index * 0.05, 0.5) }}
                    className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 rounded-xl p-4 sm:p-5 hover:shadow-lg transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                            {result.term.term}
                          </h3>
                          <span className="px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider">
                            {result.term.category}
                          </span>
                          <span className="flex items-center text-xs font-medium text-gray-500 dark:text-gray-400">
                            <Activity className="h-3 w-3 mr-1" />
                            {result.score.toFixed(1)}
                          </span>
                        </div>

                        {result.term.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-sans">{result.term.description}</p>
                        )}

                        {result.term.synonyms.length > 0 && (
                          <div className="flex flex-wrap items-center gap-2">
                            <Tag className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                            {result.term.synonyms.map((synonym: string, idx: number) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400 text-xs rounded border border-gray-200 dark:border-gray-600 font-sans"
                              >
                                {synonym}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex flex-wrap items-center gap-y-2 gap-x-3 pt-2 border-t border-gray-100 dark:border-gray-700/50">
                          <div className="flex items-center text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 px-2 py-0.5 rounded">
                            <span className="font-semibold mr-1">ID:</span> {result.term.id}
                          </div>
                          {result.term.icd11_tm2_code && (
                            <div className="flex items-center text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded">
                              <span className="font-semibold mr-1">ICD-11:</span> {result.term.icd11_tm2_code}
                            </div>
                          )}
                          {result.term.references && (
                            <div className="flex items-center text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 bg-purple-50 dark:bg-purple-900/20 px-2 py-0.5 rounded">
                              <span className="font-semibold mr-1">Ref:</span> {result.term.references}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center md:flex-col gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100 dark:border-gray-700/50">
                        <button
                          onClick={() => handleCopyId(result.term.id)}
                          className="flex-1 md:flex-none p-2.5 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg transition-colors flex items-center justify-center"
                          title="Copy ID"
                        >
                          {copiedId === result.term.id ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-500" />
                          )}
                          <span className="ml-2 md:hidden text-xs font-medium text-gray-600">Copy ID</span>
                        </button>

                        {result.term.icd11_tm2_code && (
                          <button
                            onClick={() => window.open(`https://icd.who.int/browse11/l-m/en#/http://id.who.int/icd/entity/${result.term.icd11_tm2_code}`, '_blank')}
                            className="flex-1 md:flex-none p-2.5 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg transition-colors flex items-center justify-center"
                            title="View in ICD-11"
                          >
                            <ExternalLink className="h-4 w-4 text-gray-500" />
                            <span className="ml-2 md:hidden text-xs font-medium text-gray-600">View Reference</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>

            {sortedResults.length === 0 && (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">Try adjusting your search terms or filters</p>
              </div>
            )}
          </div>
        )}

        {!debouncedQuery && (
          <div className="p-8 text-center">
            <Search className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Start searching</h3>
            <p className="text-gray-600 dark:text-gray-400">Enter a search term to find NAMASTE terminology</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
