import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterControls = ({ 
  dateRange, 
  setDateRange, 
  selectedActivities, 
  setSelectedActivities, 
  comparisonMode, 
  setComparisonMode,
  onExportPDF,
  onExportCSV 
}) => {
  const dateRangeOptions = [
    { value: 'last-3-months', label: 'Last 3 Months' },
    { value: 'last-6-months', label: 'Last 6 Months' },
    { value: 'last-year', label: 'Last Year' },
    { value: 'year-to-date', label: 'Year to Date' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const activityOptions = [
    { value: 'excavation', label: 'Excavation' },
    { value: 'transport', label: 'Transportation' },
    { value: 'equipment', label: 'Heavy Equipment' },
    { value: 'processing', label: 'Coal Processing' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'all', label: 'All Activities' }
  ];

  const comparisonOptions = [
    { value: 'monthly', label: 'Monthly Comparison' },
    { value: 'quarterly', label: 'Quarterly Comparison' },
    { value: 'yearly', label: 'Yearly Comparison' },
    { value: 'baseline', label: 'vs Baseline' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-foreground">Analysis Filters</h3>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Date Range Filter */}
          <div className="w-full sm:w-48">
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={dateRange}
              onChange={setDateRange}
              className="text-sm"
            />
          </div>

          {/* Activity Filter */}
          <div className="w-full sm:w-48">
            <Select
              label="Activities"
              options={activityOptions}
              value={selectedActivities}
              onChange={setSelectedActivities}
              multiple
              searchable
              className="text-sm"
            />
          </div>

          {/* Comparison Mode */}
          <div className="w-full sm:w-48">
            <Select
              label="Comparison"
              options={comparisonOptions}
              value={comparisonMode}
              onChange={setComparisonMode}
              className="text-sm"
            />
          </div>

          {/* Export Actions */}
          <div className="flex items-center space-x-2 pt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={onExportPDF}
              iconName="FileText"
              iconPosition="left"
              className="text-sm"
            >
              Export PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onExportCSV}
              iconName="Download"
              iconPosition="left"
              className="text-sm"
            >
              Export CSV
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border">
        <span className="text-sm font-caption text-muted-foreground">Quick Filters:</span>
        <button className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-body hover:bg-primary/20 transition-colors duration-150">
          <Icon name="Calendar" size={12} />
          <span>This Quarter</span>
        </button>
        <button className="inline-flex items-center space-x-1 px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-body hover:bg-muted/80 transition-colors duration-150">
          <Icon name="TrendingDown" size={12} />
          <span>High Emissions</span>
        </button>
        <button className="inline-flex items-center space-x-1 px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-body hover:bg-muted/80 transition-colors duration-150">
          <Icon name="Target" size={12} />
          <span>Below Target</span>
        </button>
      </div>
    </div>
  );
};

export default FilterControls;