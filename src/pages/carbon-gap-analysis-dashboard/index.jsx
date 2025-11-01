import React, { useState, useEffect } from 'react';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import Header from '../../components/ui/Header';
import SummaryCard from './components/SummaryCard';
import EmissionVsOffsetChart from './components/EmissionVsOffsetChart';
import TrendChart from './components/TrendChart';
import EmissionSourceChart from './components/EmissionSourceChart';
import FilterControls from './components/FilterControls';
import KPIPanel from './components/KPIPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CarbonGapAnalysisDashboard = () => {
  const [dateRange, setDateRange] = useState('last-6-months');
  const [selectedActivities, setSelectedActivities] = useState(['all']);
  const [comparisonMode, setComparisonMode] = useState('monthly');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for summary cards
  const summaryData = [
    {
      title: "Total Emissions",
      value: 45680,
      unit: "tonnes CO₂",
      trend: "down",
      trendValue: "12.5%",
      status: "deficit",
      icon: "Factory",
      description: "Current period emissions"
    },
    {
      title: "Total Offsets",
      value: 32450,
      unit: "tonnes CO₂",
      trend: "up",
      trendValue: "18.3%",
      status: "surplus",
      icon: "TreePine",
      description: "Afforestation & grass offsets"
    },
    {
      title: "Net Carbon Gap",
      value: 13230,
      unit: "tonnes CO₂",
      trend: "down",
      trendValue: "8.7%",
      status: "deficit",
      icon: "Target",
      description: "Remaining deficit to neutrality"
    }
  ];

  // Mock data for emissions vs offsets chart
  const emissionVsOffsetData = [
    { category: "Excavation", emissions: 15420, offsets: 8950 },
    { category: "Transportation", emissions: 12680, offsets: 7200 },
    { category: "Heavy Equipment", emissions: 9850, offsets: 5800 },
    { category: "Coal Processing", emissions: 4920, offsets: 6200 },
    { category: "Utilities", emissions: 2810, offsets: 4300 }
  ];

  // Mock data for trend chart
  const trendData = [
    { month: "Jan 2024", actual: 48200, projected: 47800, target: 45000 },
    { month: "Feb 2024", actual: 46800, projected: 46200, target: 44000 },
    { month: "Mar 2024", actual: 47200, projected: 45800, target: 43000 },
    { month: "Apr 2024", actual: 45900, projected: 44900, target: 42000 },
    { month: "May 2024", actual: 44600, projected: 43800, target: 41000 },
    { month: "Jun 2024", actual: 45680, projected: 42500, target: 40000 },
    { month: "Jul 2024", actual: null, projected: 41200, target: 39000 },
    { month: "Aug 2024", actual: null, projected: 39800, target: 38000 }
  ];

  // Mock data for emission sources pie chart
  const emissionSourceData = [
    { source: "Excavation", value: 15420, total: 45680 },
    { source: "Transportation", value: 12680, total: 45680 },
    { source: "Heavy Equipment", value: 9850, total: 45680 },
    { source: "Coal Processing", value: 4920, total: 45680 },
    { source: "Utilities", value: 2810, total: 45680 }
  ];

  // Mock KPI data
  const kpiData = [
    {
      label: "Carbon Intensity",
      value: "2.34",
      unit: "tCO₂/tonne coal",
      icon: "BarChart3",
      description: "Emissions per tonne of coal"
    },
    {
      label: "Offset Efficiency",
      value: "71.2",
      unit: "% coverage",
      icon: "TreePine",
      description: "Current offset coverage"
    },
    {
      label: "Neutrality Timeline",
      value: "18",
      unit: "months",
      icon: "Calendar",
      description: "Projected time to neutrality"
    },
    {
      label: "Cost per tCO₂",
      value: "₹2,450",
      unit: "per tonne",
      icon: "IndianRupee",
      description: "Average offset cost"
    }
  ];

  // Mock compliance status
  const complianceStatus = {
    status: "at-risk",
    message: "Current trajectory may not meet 2025 carbon neutrality targets",
    progress: 71.2
  };

  // Mock recommendations
  const recommendations = [
    {
      title: "Increase Tree Plantation",
      description: "Plant additional 15,000 trees in identified suitable areas to boost carbon sequestration",
      priority: "high",
      impact: "5,200 tCO₂/year"
    },
    {
      title: "Optimize Equipment Usage",
      description: "Implement smart scheduling for heavy equipment to reduce idle time and fuel consumption",
      priority: "medium",
      impact: "2,800 tCO₂/year"
    },
    {
      title: "Renewable Energy Integration",
      description: "Install solar panels for utility power requirements in administrative areas",
      priority: "medium",
      impact: "1,900 tCO₂/year"
    },
    {
      title: "Transportation Route Optimization",
      description: "Use AI-powered route planning to minimize transportation emissions",
      priority: "low",
      impact: "1,200 tCO₂/year"
    }
  ];

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleExportPDF = () => {
    // Mock PDF export functionality
    alert("PDF report generation initiated. You will receive the report via email shortly.");
  };

  const handleExportCSV = () => {
    // Mock CSV export functionality
    alert("CSV data export completed. File downloaded to your device.");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center h-96">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-lg font-body text-muted-foreground">Loading carbon gap analysis...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb removed */}
          <ProgressIndicator />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="BarChart3" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground">
                  Carbon Gap Analysis Dashboard
                </h1>
                <p className="text-base font-body text-muted-foreground">
                  Comprehensive visualization of emission versus offset data for carbon neutrality tracking
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                iconName="RefreshCw"
                iconPosition="left"
                onClick={() => window.location?.reload()}
              >
                Refresh Data
              </Button>
              <Button
                variant="default"
                size="sm"
                iconName="Settings"
                iconPosition="left"
              >
                Configure
              </Button>
            </div>
          </div>

          {/* Filter Controls */}
          <FilterControls
            dateRange={dateRange}
            setDateRange={setDateRange}
            selectedActivities={selectedActivities}
            setSelectedActivities={setSelectedActivities}
            comparisonMode={comparisonMode}
            setComparisonMode={setComparisonMode}
            onExportPDF={handleExportPDF}
            onExportCSV={handleExportCSV}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {summaryData?.map((card, index) => (
                  <SummaryCard key={index} {...card} />
                ))}
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="xl:col-span-2">
                  <EmissionVsOffsetChart data={emissionVsOffsetData} />
                </div>
                <div className="xl:col-span-2">
                  <TrendChart data={trendData} />
                </div>
                <div className="xl:col-span-1">
                  <EmissionSourceChart data={emissionSourceData} />
                </div>
                <div className="xl:col-span-1 flex items-center justify-center">
                  <div className="bg-card border border-border rounded-lg p-6 w-full">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <Icon name="TrendingUp" size={32} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                          Advanced Analytics
                        </h3>
                        <p className="text-sm font-caption text-muted-foreground mb-4">
                          Access detailed predictive models and scenario planning tools
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="ExternalLink"
                          iconPosition="right"
                        >
                          Launch Analytics
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Panel */}
            <div className="lg:col-span-1">
              <KPIPanel
                kpiData={kpiData}
                recommendations={recommendations}
                complianceStatus={complianceStatus}
              />
            </div>
          </div>

          {/* Action Items Footer */}
          <div className="mt-8 bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Icon name="CheckSquare" size={20} className="text-primary" />
                <h3 className="text-lg font-heading font-semibold text-foreground">Next Steps</h3>
              </div>
              <span className="text-sm font-caption text-muted-foreground">
                Last updated: {new Date()?.toLocaleDateString('en-IN')}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                size="sm"
                className="justify-start"
                iconName="Calculator"
                iconPosition="left"
              >
                Update Calculations
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="justify-start"
                iconName="TreePine"
                iconPosition="left"
              >
                Plan Afforestation
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="justify-start"
                iconName="FileText"
                iconPosition="left"
              >
                Generate Report
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="justify-start"
                iconName="Share"
                iconPosition="left"
              >
                Share Dashboard
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarbonGapAnalysisDashboard;