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

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AfforestationPlanner />} />
        <Route path="/home-dashboard" element={<HomeDashboard />} />
        <Route path="/reports-compliance" element={<ReportsCompliance />} />
        <Route path="/afforestation-planner" element={<AfforestationPlanner />} />
        <Route path="/emission-calculator" element={<EmissionCalculator />} />
        <Route path="/carbon-gap-analysis-dashboard" element={<CarbonGapAnalysisDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
