import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmissionSummary = ({ activities, onSave, onGenerateReport, isCalculating }) => {
  const calculateTotalEmissions = () => {
    return activities?.reduce((total, activity) => {
      if (!activity?.quantity || !activity?.fuelType || !activity?.activityType) return total;
      
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
      
      return total + (parseFloat(activity?.quantity) * baseFactor * multiplier) / 1000;
    }, 0);
  };

  const getEmissionsByFuelType = () => {
    const fuelEmissions = {};
    
    activities?.forEach(activity => {
      if (!activity?.quantity || !activity?.fuelType || !activity?.activityType) return;
      
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
      const emission = (parseFloat(activity?.quantity) * baseFactor * multiplier) / 1000;
      
      if (!fuelEmissions?.[activity?.fuelType]) {
        fuelEmissions[activity.fuelType] = 0;
      }
      fuelEmissions[activity.fuelType] += emission;
    });
    
    return Object.entries(fuelEmissions)?.map(([fuel, emission]) => ({
      name: fuel?.charAt(0)?.toUpperCase() + fuel?.slice(1)?.replace('-', ' '),
      value: emission,
      fuel: fuel
    }));
  };

  const getEmissionsByActivity = () => {
    const activityEmissions = {};
    
    activities?.forEach(activity => {
      if (!activity?.quantity || !activity?.fuelType || !activity?.activityType) return;
      
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
      const emission = (parseFloat(activity?.quantity) * baseFactor * multiplier) / 1000;
      
      if (!activityEmissions?.[activity?.activityType]) {
        activityEmissions[activity.activityType] = 0;
      }
      activityEmissions[activity.activityType] += emission;
    });
    
    return Object.entries(activityEmissions)?.map(([activity, emission]) => ({
      name: activity?.charAt(0)?.toUpperCase() + activity?.slice(1),
      emission: emission
    }));
  };

  const totalEmissions = calculateTotalEmissions();
  const fuelData = getEmissionsByFuelType();
  const activityData = getEmissionsByActivity();

  const COLORS = ['#2D5016', '#8B4513', '#4A90E2', '#059669', '#D97706'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-body font-medium text-foreground">{label}</p>
          <p className="text-sm font-body text-muted-foreground">
            {`${payload?.[0]?.value?.toFixed(3)} tonnes CO₂`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Total Emissions Card */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={20} className="text-warning" />
            <h3 className="text-lg font-heading font-semibold text-foreground">Total Emissions</h3>
          </div>
          {isCalculating && (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="Loader2" size={16} className="animate-spin" />
              <span className="text-sm font-caption">Calculating...</span>
            </div>
          )}
        </div>
        
        <div className="text-center py-4">
          <div className="text-3xl font-heading font-bold text-foreground mb-2">
            {totalEmissions?.toFixed(3)}
          </div>
          <div className="text-sm font-body text-muted-foreground">tonnes CO₂ equivalent</div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-lg font-body font-semibold text-foreground">
              {activities?.filter(a => a?.activityType && a?.fuelType && a?.quantity)?.length}
            </div>
            <div className="text-xs font-caption text-muted-foreground">Active Entries</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-body font-semibold text-foreground">
              {totalEmissions > 0 ? (totalEmissions * 1000)?.toFixed(0) : '0'}
            </div>
            <div className="text-xs font-caption text-muted-foreground">kg CO₂</div>
          </div>
        </div>
      </div>
      {/* Fuel Type Breakdown */}
      {fuelData?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="PieChart" size={20} className="text-primary" />
            <h3 className="text-lg font-heading font-semibold text-foreground">Fuel Type Breakdown</h3>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fuelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {fuelData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      {/* Activity Type Breakdown */}
      {activityData?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="BarChart3" size={20} className="text-accent" />
            <h3 className="text-lg font-heading font-semibold text-foreground">Activity Breakdown</h3>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                  axisLine={{ stroke: 'var(--color-border)' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                  axisLine={{ stroke: 'var(--color-border)' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="emission" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          fullWidth
          onClick={onSave}
          disabled={totalEmissions === 0}
          iconName="Save"
          iconPosition="left"
        >
          Save Calculation
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          onClick={onGenerateReport}
          disabled={totalEmissions === 0}
          iconName="FileText"
          iconPosition="left"
        >
          Generate Report
        </Button>
      </div>
      {/* Environmental Impact */}
      {totalEmissions > 0 && (
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Leaf" size={16} className="text-success" />
            <span className="text-sm font-body font-medium text-foreground">Environmental Impact</span>
          </div>
          <div className="text-xs font-caption text-muted-foreground space-y-1">
            <p>• Equivalent to {Math.round(totalEmissions * 2.2)} trees needed for offset</p>
            <p>• Carbon footprint of {Math.round(totalEmissions * 0.45)} cars for 1 year</p>
            <p>• Energy to power {Math.round(totalEmissions * 1.2)} homes for 1 month</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmissionSummary;