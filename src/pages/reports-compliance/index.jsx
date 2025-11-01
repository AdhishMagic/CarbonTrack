import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import ReportTemplatesSidebar from './components/ReportTemplatesSidebar';
import ReportPreview from './components/ReportPreview';
import ComplianceCalendar from './components/ComplianceCalendar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ReportsCompliance = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [reportConfig, setReportConfig] = useState({
    dateRange: 'current_month',
    format: 'pdf',
    startDate: '',
    endDate: ''
  });

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleConfigChange = (key, value) => {
    setReportConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleGenerateReport = () => {
    if (!selectedTemplate) return;
    
    // Mock report generation
    console.log('Generating report:', {
      template: selectedTemplate,
      config: reportConfig
    });
    
    // In a real application, this would trigger the report generation process
    alert(`Generating ${selectedTemplate?.name} in ${reportConfig?.format?.toUpperCase()} format...`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 lg:px-6 py-6">
          {/* Breadcrumb removed */}
          <ProgressIndicator />
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="FileText" size={20} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-foreground">Reports & Compliance</h1>
                <p className="text-sm font-caption text-muted-foreground">
                  Generate regulatory reports and track environmental compliance requirements
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" iconName="History">
                Report History
              </Button>
              <Button variant="outline" iconName="Settings">
                Settings
              </Button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-200px)]">
            {/* Left Sidebar - Report Templates */}
            <div className="lg:col-span-3 h-full">
              <ReportTemplatesSidebar
                onTemplateSelect={handleTemplateSelect}
                selectedTemplate={selectedTemplate}
              />
            </div>

            {/* Center Area - Report Preview */}
            <div className="lg:col-span-6 h-full">
              <div className="bg-card border border-border rounded-lg h-full">
                <ReportPreview
                  selectedTemplate={selectedTemplate}
                  reportConfig={reportConfig}
                  onConfigChange={handleConfigChange}
                  onGenerate={handleGenerateReport}
                />
              </div>
            </div>

            {/* Right Panel - Compliance Calendar */}
            <div className="lg:col-span-3 h-full">
              <div className="bg-card border border-border rounded-lg h-full">
                <ComplianceCalendar />
              </div>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden mt-6 flex flex-col space-y-3">
            <Button 
              variant="default" 
              fullWidth 
              iconName="Download" 
              iconPosition="left"
              onClick={handleGenerateReport}
              disabled={!selectedTemplate}
            >
              Generate Report
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" fullWidth iconName="Calendar">
                View Calendar
              </Button>
              <Button variant="outline" fullWidth iconName="History">
                Report History
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportsCompliance;