import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ActivityRow from './ActivityRow';

const CalculationForm = ({ 
  activities, 
  onUpdateActivity, 
  onAddActivity, 
  onRemoveActivity,
  onCalculate,
  isCalculating 
}) => {
  const activityTypes = [
    { value: 'excavation', label: 'Excavation' },
    { value: 'transport', label: 'Transport' },
    { value: 'equipment', label: 'Equipment Operation' },
    { value: 'drilling', label: 'Drilling' },
    { value: 'blasting', label: 'Blasting' }
  ];

  const fuelTypes = [
    { value: 'diesel', label: 'Diesel' },
    { value: 'electricity', label: 'Electricity' },
    { value: 'coal', label: 'Coal' },
    { value: 'petrol', label: 'Petrol' },
    { value: 'natural-gas', label: 'Natural Gas' }
  ];

  const unitOptions = [
    { value: 'liters', label: 'Liters' },
    { value: 'kwh', label: 'kWh' },
    { value: 'tonnes', label: 'Tonnes' },
    { value: 'cubic-meters', label: 'Cubic Meters' },
    { value: 'hours', label: 'Hours' }
  ];

  const hasValidActivities = activities?.some(activity => 
    activity?.activityType && activity?.fuelType && activity?.quantity
  );

  return (
    <div className="space-y-6">
      {/* Form Header */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Calculator" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">Emission Calculator</h2>
            <p className="text-sm font-body text-muted-foreground">
              Calculate carbon emissions from your mining activities
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
          <div className="text-center">
            <div className="text-lg font-body font-semibold text-foreground">{activities?.length}</div>
            <div className="text-xs font-caption text-muted-foreground">Total Activities</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-body font-semibold text-foreground">
              {activities?.filter(a => a?.activityType && a?.fuelType && a?.quantity)?.length}
            </div>
            <div className="text-xs font-caption text-muted-foreground">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-body font-semibold text-foreground">
              {activities?.length - activities?.filter(a => a?.activityType && a?.fuelType && a?.quantity)?.length}
            </div>
            <div className="text-xs font-caption text-muted-foreground">Pending</div>
          </div>
        </div>
      </div>
      {/* Activity Rows */}
      <div className="space-y-4">
        {activities?.map((activity, index) => (
          <ActivityRow
            key={activity?.id}
            activity={activity}
            index={index}
            onUpdate={onUpdateActivity}
            onRemove={onRemoveActivity}
            canRemove={activities?.length > 1}
            activityTypes={activityTypes}
            fuelTypes={fuelTypes}
            unitOptions={unitOptions}
          />
        ))}
      </div>
      {/* Add Activity Button */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={onAddActivity}
          iconName="Plus"
          iconPosition="left"
          className="min-w-48"
        >
          Add Another Activity
        </Button>
      </div>
      {/* Calculate Button */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-heading font-semibold text-foreground">Ready to Calculate?</h3>
            <p className="text-sm font-body text-muted-foreground">
              Complete all activity details to calculate total emissions
            </p>
          </div>
          
          <Button
            variant="default"
            size="lg"
            onClick={onCalculate}
            disabled={!hasValidActivities || isCalculating}
            loading={isCalculating}
            iconName="Zap"
            iconPosition="left"
            className="min-w-48"
          >
            Calculate Total Emissions
          </Button>
        </div>

        {!hasValidActivities && (
          <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-sm font-body text-warning">
                Please complete at least one activity with all required fields
              </span>
            </div>
          </div>
        )}
      </div>
      {/* Help Section */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="HelpCircle" size={16} className="text-accent" />
          <span className="text-sm font-body font-medium text-foreground">Calculation Guidelines</span>
        </div>
        <div className="text-xs font-caption text-muted-foreground space-y-1">
          <p>• Emission factors are based on Indian coal mining standards</p>
          <p>• Different activity types have varying emission multipliers</p>
          <p>• Results are calculated in tonnes of CO₂ equivalent</p>
          <p>• All calculations follow IPCC guidelines for accuracy</p>
        </div>
      </div>
    </div>
  );
};

export default CalculationForm;