import React from 'react';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import HeroSection from './components/HeroSection';
import MetricsSummary from './components/MetricsSummary';
import QuickAccessTiles from './components/QuickAccessTiles';
import ActivityFeed from './components/ActivityFeed';

const HomeDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
  {/* Header removed */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Breadcrumb removed */}
          <ProgressIndicator />
        </div>

        {/* Hero Section */}
        <HeroSection />

        {/* Metrics Summary */}
        <MetricsSummary />

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Quick Access Tiles - Takes 3 columns */}
            <div className="lg:col-span-3">
              <QuickAccessTiles />
            </div>

            {/* Activity Feed Sidebar - Takes 1 column */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ActivityFeed />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <section className="bg-muted/30 py-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-4">
                Comprehensive Carbon Management
              </h2>
              <p className="text-base font-body text-muted-foreground max-w-3xl mx-auto">
                CarbonTrack provides end-to-end solutions for coal mining operations to achieve carbon neutrality 
                through scientific emission calculations, strategic afforestation planning, and data-driven insights.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-primary" fill="currentColor">
                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  Accurate Calculations
                </h3>
                <p className="text-sm font-body text-muted-foreground">
                  Precise emission calculations based on Indian coal mining standards and international protocols
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-success/10 rounded-xl flex items-center justify-center mx-auto">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-success" fill="currentColor">
                    <path d="M12 2L14 8L20 8L15 12L17 18L12 15L7 18L9 12L4 8L10 8L12 2Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  Strategic Planning
                </h3>
                <p className="text-sm font-body text-muted-foreground">
                  Comprehensive afforestation strategies tailored to local ecosystems and carbon offset goals
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-accent" fill="currentColor">
                    <path d="M3 3V21H21V3H3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  Real-time Analytics
                </h3>
                <p className="text-sm font-body text-muted-foreground">
                  Interactive dashboards with live data visualization and trend analysis capabilities
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-warning/10 rounded-xl flex items-center justify-center mx-auto">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-warning" fill="currentColor">
                    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  Compliance Reports
                </h3>
                <p className="text-sm font-body text-muted-foreground">
                  Automated compliance reporting aligned with Ministry of Coal guidelines and environmental standards
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-12">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary-foreground" fill="currentColor">
                      <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-foreground">CarbonTrack</h3>
                    <p className="text-sm font-caption text-muted-foreground">Ministry of Coal</p>
                  </div>
                </div>
                <p className="text-sm font-body text-muted-foreground">
                  Empowering sustainable coal mining through comprehensive carbon management solutions.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-base font-heading font-semibold text-foreground">Quick Links</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-150">
                    Calculate Emissions
                  </a>
                  <a href="#" className="block text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-150">
                    Plan Afforestation
                  </a>
                  <a href="#" className="block text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-150">
                    View Analytics
                  </a>
                  <a href="#" className="block text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-150">
                    Generate Reports
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-base font-heading font-semibold text-foreground">Resources</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-150">
                    Documentation
                  </a>
                  <a href="#" className="block text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-150">
                    API Reference
                  </a>
                  <a href="#" className="block text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-150">
                    Support Center
                  </a>
                  <a href="#" className="block text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-150">
                    Training Materials
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-base font-heading font-semibold text-foreground">Contact</h4>
                <div className="space-y-2">
                  <p className="text-sm font-body text-muted-foreground">
                    Ministry of Coal, Government of India
                  </p>
                  <p className="text-sm font-body text-muted-foreground">
                    Shastri Bhawan, New Delhi - 110001
                  </p>
                  <p className="text-sm font-body text-muted-foreground">
                    support@carbontrack.gov.in
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between">
              <p className="text-sm font-caption text-muted-foreground">
                © {new Date()?.getFullYear()} Ministry of Coal, Government of India. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-150">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-150">
                  Terms of Service
                </a>
                <a href="#" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-150">
                  Accessibility
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default HomeDashboard;