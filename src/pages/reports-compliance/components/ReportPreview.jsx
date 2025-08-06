import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ReportPreview = ({ selectedTemplate, reportConfig, onConfigChange, onGenerate }) => {
  const formatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'word', label: 'Word Document' }
  ];

  const dateRangeOptions = [
    { value: 'current_month', label: 'Current Month' },
    { value: 'last_month', label: 'Last Month' },
    { value: 'current_quarter', label: 'Current Quarter' },
    { value: 'last_quarter', label: 'Last Quarter' },
    { value: 'current_year', label: 'Current Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  if (!selectedTemplate) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/30 rounded-lg border-2 border-dashed border-border">
        <div className="text-center">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="font-body font-medium text-foreground mb-2">No Template Selected</h3>
          <p className="text-sm font-caption text-muted-foreground">
            Choose a report template from the sidebar to preview and customize
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="FileText" size={20} className="text-primary" />
          <div>
            <h2 className="font-body font-semibold text-foreground">{selectedTemplate?.name}</h2>
            <p className="text-sm font-caption text-muted-foreground">{selectedTemplate?.authority}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Eye">
            Preview
          </Button>
          <Button variant="default" size="sm" iconName="Download" onClick={onGenerate}>
            Generate
          </Button>
        </div>
      </div>
      {/* Configuration Panel */}
      <div className="p-4 border-b border-border bg-muted/30">
        <h3 className="font-body font-medium text-foreground mb-4">Report Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={reportConfig?.dateRange}
            onChange={(value) => onConfigChange('dateRange', value)}
            className="mb-0"
          />
          <Select
            label="Output Format"
            options={formatOptions}
            value={reportConfig?.format}
            onChange={(value) => onConfigChange('format', value)}
            className="mb-0"
          />
          {reportConfig?.dateRange === 'custom' && (
            <>
              <Input
                label="Start Date"
                type="date"
                value={reportConfig?.startDate}
                onChange={(e) => onConfigChange('startDate', e?.target?.value)}
              />
              <Input
                label="End Date"
                type="date"
                value={reportConfig?.endDate}
                onChange={(e) => onConfigChange('endDate', e?.target?.value)}
              />
            </>
          )}
        </div>
      </div>
      {/* Report Preview */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="bg-card border border-border rounded-lg p-6 min-h-[600px]">
          {/* Report Header */}
          <div className="text-center mb-8 pb-6 border-b border-border">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Leaf" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-heading font-bold text-foreground">Ministry of Coal</h1>
                <p className="text-sm font-caption text-muted-foreground">Environmental Compliance Division</p>
              </div>
            </div>
            <h2 className="text-lg font-body font-semibold text-foreground mb-2">
              {selectedTemplate?.name}
            </h2>
            <p className="text-sm font-caption text-muted-foreground">
              Reporting Period: {reportConfig?.dateRange === 'custom' 
                ? `${reportConfig?.startDate} to ${reportConfig?.endDate}`
                : dateRangeOptions?.find(opt => opt?.value === reportConfig?.dateRange)?.label
              }
            </p>
          </div>

          {/* Report Content Preview */}
          <div className="space-y-6">
            <div>
              <h3 className="font-body font-semibold text-foreground mb-3">Executive Summary</h3>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm font-caption text-muted-foreground leading-relaxed">
                  This report provides a comprehensive overview of carbon emission activities and environmental compliance status for the specified reporting period. The data includes emission calculations from mining operations, afforestation progress, and carbon offset achievements.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-body font-semibold text-foreground mb-3">Emission Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <Icon name="Zap" size={24} className="text-warning mx-auto mb-2" />
                  <p className="text-2xl font-heading font-bold text-foreground">2,450</p>
                  <p className="text-sm font-caption text-muted-foreground">Total CO₂ (tonnes)</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <Icon name="TreePine" size={24} className="text-success mx-auto mb-2" />
                  <p className="text-2xl font-heading font-bold text-foreground">1,200</p>
                  <p className="text-sm font-caption text-muted-foreground">Trees Planted</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <Icon name="Leaf" size={24} className="text-primary mx-auto mb-2" />
                  <p className="text-2xl font-heading font-bold text-foreground">850</p>
                  <p className="text-sm font-caption text-muted-foreground">CO₂ Offset (tonnes)</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-body font-semibold text-foreground mb-3">Compliance Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span className="text-sm font-body text-foreground">Monthly Emission Reporting</span>
                  </div>
                  <span className="text-xs font-caption text-success">Compliant</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertTriangle" size={16} className="text-warning" />
                    <span className="text-sm font-body text-foreground">Afforestation Target</span>
                  </div>
                  <span className="text-xs font-caption text-warning">Pending</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span className="text-sm font-body text-foreground">Environmental Clearance</span>
                  </div>
                  <span className="text-xs font-caption text-success">Valid</span>
                </div>
              </div>
            </div>
          </div>

          {/* Report Footer */}
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-xs font-caption text-muted-foreground">
              Generated on {new Date()?.toLocaleDateString('en-IN')} | CarbonTrack v2.1 | Ministry of Coal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPreview;