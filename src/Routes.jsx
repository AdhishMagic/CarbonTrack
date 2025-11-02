import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import HomeDashboard from './pages/home-dashboard';
import ReportsCompliance from './pages/reports-compliance';
import AfforestationPlanner from './pages/afforestation-planner';
import EmissionCalculator from './pages/emission-calculator';
import CarbonGapAnalysisDashboard from './pages/carbon-gap-analysis-dashboard';
import DataWorkbench from './pages/data-workbench';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import LoginPromptModal from './components/ui/LoginPromptModal';

const Routes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
          <ScrollToTop />
          <LoginPromptModal />
          <RouterRoutes>
            {/* Define your route here - All routes are accessible without login */}
            <Route path="/" element={<HomeDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home-dashboard" element={<HomeDashboard />} />
            <Route path="/reports-compliance" element={<ReportsCompliance />} />
            <Route path="/afforestation-planner" element={<AfforestationPlanner />} />
            <Route path="/emission-calculator" element={<EmissionCalculator />} />
            <Route path="/carbon-gap-analysis-dashboard" element={<CarbonGapAnalysisDashboard />} />
            <Route path="/data-workbench" element={<DataWorkbench />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routes;
