import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from './components/Layout/Layout.tsx';
import LoadingSpinner from './components/Common/LoadingSpinner.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';

// Lazy load components for better performance
const Dashboard = React.lazy(() => import('./pages/Dashboard.tsx'));
const SearchPage = React.lazy(() => import('./pages/SearchPage.tsx'));
const TranslationPage = React.lazy(() => import('./pages/TranslationPage.tsx'));
const FHIRPage = React.lazy(() => import('./pages/FHIRPage.tsx'));
const AdminPage = React.lazy(() => import('./pages/AdminPage.tsx'));
const AuthPage = React.lazy(() => import('./pages/AuthPage.tsx'));

const AnalyticsPage = React.lazy(() => import('./pages/AnalyticsPage.tsx'));

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200"
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/translation" element={<TranslationPage />} />
              <Route path="/fhir" element={<FHIRPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/auth" element={<AuthPage />} />

              <Route path="/analytics" element={<AnalyticsPage />} />
            </Routes>
          </motion.div>
        </Suspense>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
