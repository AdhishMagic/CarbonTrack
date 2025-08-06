import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const ActivityRow = ({ 
  activity, 
  index, 
  onUpdate, 
  onRemove, 
  canRemove,
  activityTypes,
  fuelTypes,
  unitOptions 
}) => {
  const handleFieldChange = (field, value) => {
    onUpdate(index, { ...activity, [field]: value });
  };

  const calculateEmission = () => {
    if (!activity?.quantity || !activity?.fuelType || !activity?.activityType) return 0;
    
    // Emission factors for Indian coal mining (kg CO2 per unit)
    const emissionFactors = {
      'diesel': 2.68,
      'electricity': 0.82,
      'coal': 2.42,
      'petrol': 2.31,
      'natural-gas': 1.96
    };
    
    const activityMultipliers = {
      'excavation': 1.2,
      'transport': 1.0,
      'equipment': 1.1,
      'drilling': 1.3,
      'blasting': 1.5
    };
    
    const baseFactor = emissionFactors?.[activity?.fuelType] || 0;
    const multiplier = activityMultipliers?.[activity?.activityType] || 1;
    
    return (parseFloat(activity?.quantity) * baseFactor * multiplier) / 1000; // Convert to tonnes
  };

  const emission = calculateEmission();

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-sm font-body font-medium text-primary">{index + 1}</span>
          </div>
          <h3 className="text-sm font-body font-medium text-foreground">Activity {index + 1}</h3>
        </div>
        {canRemove && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(index)}
            className="text-error hover:text-error hover:bg-error/10"
          >
            <Icon name="X" size={16} />
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Activity Type"
          placeholder="Select activity"
          options={activityTypes}
          value={activity?.activityType}
          onChange={(value) => handleFieldChange('activityType', value)}
          required
        />

        <Select
          label="Fuel Type"
          placeholder="Select fuel"
          options={fuelTypes}
          value={activity?.fuelType}
          onChange={(value) => handleFieldChange('fuelType', value)}
          required
        />

        <Input
          label="Quantity"
          type="number"
          placeholder="Enter quantity"
          value={activity?.quantity}
          onChange={(e) => handleFieldChange('quantity', e?.target?.value)}
          min="0"
          step="0.01"
          required
        />

        <Select
          label="Unit"
          placeholder="Select unit"
          options={unitOptions}
          value={activity?.unit}
          onChange={(value) => handleFieldChange('unit', value)}
          required
        />
      </div>
      {emission > 0 && (
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={16} className="text-warning" />
            <span className="text-sm font-body text-foreground">Calculated Emission:</span>
          </div>
          <span className="text-sm font-body font-medium text-foreground">
            {emission?.toFixed(3)} tonnes CO₂
          </span>
        </div>
      )}
    </div>
  );
};

export default ActivityRow;