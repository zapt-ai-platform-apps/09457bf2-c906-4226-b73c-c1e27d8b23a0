import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './modules/auth/AuthProvider';
import ProtectedRoute from './modules/auth/ProtectedRoute';

// Pages
import LandingPage from './modules/core/pages/LandingPage';
import Dashboard from './modules/dashboard/pages/Dashboard';
import BusinessPlanner from './modules/planning/pages/BusinessPlanner';
import InvestmentPlanner from './modules/investment/pages/InvestmentPlanner';
import ResourceLibrary from './modules/resources/pages/ResourceLibrary';
import NotFound from './modules/core/pages/NotFound';
import AuthPage from './modules/auth/pages/AuthPage';

// Components
import Layout from './modules/core/components/Layout';
import ZaptBadge from './modules/core/components/ZaptBadge';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            
            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/business-planner" element={<BusinessPlanner />} />
              <Route path="/investment-planner" element={<InvestmentPlanner />} />
              <Route path="/resources" element={<ResourceLibrary />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ZaptBadge />
        </div>
      </AuthProvider>
    </Router>
  );
}