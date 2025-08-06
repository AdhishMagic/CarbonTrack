import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OffsetCalculationSidebar = ({ treeData, grassData }) => {
  // Calculate tree offset
  const calculateTreeOffset = () => {
    if (!treeData?.quantity || !treeData?.survivalRate) return 0;
    const survivors = parseInt(treeData?.quantity) * (parseFloat(treeData?.survivalRate) / 100);
    return survivors * 0.025; // 25kg CO₂ per tree per year average
  };

  // Calculate grass offset
  const calculateGrassOffset = () => {
    if (!grassData?.landArea || !grassData?.establishmentRate) return 0;
    let hectares = parseFloat(grassData?.landArea);
    
    // Convert to hectares if needed
    if (grassData?.areaUnit === 'acres') {
      hectares = hectares * 0.4047;
    } else if (grassData?.areaUnit === 'sqmeters') {
      hectares = hectares / 10000;
    }
    
    const effectiveArea = hectares * (parseFloat(grassData?.establishmentRate) / 100);
    return effectiveArea * 3; // 3 tonnes CO₂ per hectare per year for grass
  };

  const treeOffset = calculateTreeOffset();
  const grassOffset = calculateGrassOffset();
  const totalOffset = treeOffset + grassOffset;

  // Mock data for charts
  const comparisonData = [
    { name: 'Trees', offset: treeOffset, color: '#059669' },
    { name: 'Grass', offset: grassOffset, color: '#16a34a' },
    { name: 'Total', offset: totalOffset, color: '#2D5016' }
  ];

  const timelineData = [
    { year: 'Year 1', trees: treeOffset * 0.3, grass: grassOffset * 0.8, total: (treeOffset * 0.3) + (grassOffset * 0.8) },
    { year: 'Year 2', trees: treeOffset * 0.5, grass: grassOffset * 0.9, total: (treeOffset * 0.5) + (grassOffset * 0.9) },
    { year: 'Year 3', trees: treeOffset * 0.7, grass: grassOffset * 1.0, total: (treeOffset * 0.7) + (grassOffset * 1.0) },
    { year: 'Year 4', trees: treeOffset * 0.85, grass: grassOffset * 1.0, total: (treeOffset * 0.85) + (grassOffset * 1.0) },
    { year: 'Year 5', trees: treeOffset * 1.0, grass: grassOffset * 1.0, total: totalOffset }
  ];

  const pieData = [
    { name: 'Tree Plantation', value: treeOffset, color: '#059669' },
    { name: 'Grass Coverage', value: grassOffset, color: '#16a34a' }
  ]?.filter(item => item?.value > 0);

  const costEstimation = {
    treeCost: treeData?.quantity ? parseInt(treeData?.quantity) * 25 : 0, // ₹25 per tree
    grassCost: grassData?.landArea ? parseFloat(grassData?.landArea) * 15000 : 0, // ₹15,000 per hectare
    maintenanceCost: (treeOffset + grassOffset) * 2000 // ₹2,000 per tonne CO₂ maintenance
  };

  const totalCost = costEstimation?.treeCost + costEstimation?.grassCost + costEstimation?.maintenanceCost;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 pb-4 border-b border-border">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="BarChart3" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">Offset Analysis</h3>
          <p className="text-sm font-caption text-muted-foreground">Combined plantation impact</p>
        </div>
      </div>
      {/* Total Offset Summary */}
      <div className="bg-gradient-to-r from-success/10 to-primary/10 rounded-lg p-4">
        <div className="text-center space-y-2">
          <p className="text-sm font-caption text-muted-foreground">Total Annual CO₂ Offset</p>
          <p className="text-3xl font-heading font-bold text-success">
            {totalOffset?.toFixed(1)}
          </p>
          <p className="text-sm font-caption text-muted-foreground">tonnes per year</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border/50">
          <div className="text-center">
            <p className="text-lg font-heading font-semibold text-success">
              {treeOffset?.toFixed(1)}t
            </p>
            <p className="text-xs font-caption text-muted-foreground">From Trees</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-heading font-semibold text-success">
              {grassOffset?.toFixed(1)}t
            </p>
            <p className="text-xs font-caption text-muted-foreground">From Grass</p>
          </div>
        </div>
      </div>
      {/* Comparison Chart */}
      {totalOffset > 0 && (
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="text-sm font-body font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="BarChart" size={16} className="text-primary" />
            <span>Offset Comparison</span>
          </h4>
          
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                  label={{ value: 'CO₂ (tonnes)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`${value?.toFixed(1)} tonnes`, 'CO₂ Offset']}
                />
                <Bar dataKey="offset" fill="var(--color-success)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      {/* Timeline Projection */}
      {totalOffset > 0 && (
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="text-sm font-body font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-primary" />
            <span>5-Year Projection</span>
          </h4>
          
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="year" 
                  tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                  label={{ value: 'CO₂ (tonnes)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`${value?.toFixed(1)} tonnes`, 'CO₂ Offset']}
                />
                <Line 
                  type="monotone" 
                  dataKey="trees" 
                  stroke="var(--color-success)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
                  name="Trees"
                />
                <Line 
                  type="monotone" 
                  dataKey="grass" 
                  stroke="var(--color-accent)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
                  name="Grass"
                />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="var(--color-primary)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 5 }}
                  name="Total"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      {/* Cost Estimation */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="text-sm font-body font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="IndianRupee" size={16} className="text-primary" />
          <span>Cost Estimation</span>
        </h4>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-caption text-muted-foreground">Tree Plantation:</span>
            <span className="text-sm font-body font-medium text-foreground">
              ₹{costEstimation?.treeCost?.toLocaleString('en-IN')}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-caption text-muted-foreground">Grass Seeding:</span>
            <span className="text-sm font-body font-medium text-foreground">
              ₹{costEstimation?.grassCost?.toLocaleString('en-IN')}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-caption text-muted-foreground">5-Year Maintenance:</span>
            <span className="text-sm font-body font-medium text-foreground">
              ₹{costEstimation?.maintenanceCost?.toLocaleString('en-IN')}
            </span>
          </div>
          
          <div className="pt-2 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-sm font-body font-medium text-foreground">Total Investment:</span>
              <span className="text-lg font-heading font-semibold text-primary">
                ₹{totalCost?.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
          
          {totalOffset > 0 && (
            <div className="bg-muted/50 rounded-lg p-3 mt-3">
              <div className="text-center">
                <p className="text-xs font-caption text-muted-foreground">Cost per tonne CO₂</p>
                <p className="text-lg font-heading font-semibold text-accent">
                  ₹{(totalCost / totalOffset)?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Land Requirement Summary */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="text-sm font-body font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Map" size={16} className="text-primary" />
          <span>Land Requirements</span>
        </h4>
        
        <div className="space-y-3">
          {treeData?.quantity && treeData?.plantingDensity && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-caption text-muted-foreground">Tree Plantation:</span>
              <span className="text-sm font-body font-medium text-foreground">
                {(parseInt(treeData?.quantity) / parseInt(treeData?.plantingDensity))?.toFixed(2)} ha
              </span>
            </div>
          )}
          
          {grassData?.landArea && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-caption text-muted-foreground">Grass Coverage:</span>
              <span className="text-sm font-body font-medium text-foreground">
                {grassData?.areaUnit === 'hectares' ? grassData?.landArea : 
                 grassData?.areaUnit === 'acres' ? (parseFloat(grassData?.landArea) * 0.4047)?.toFixed(2) :
                 (parseFloat(grassData?.landArea) / 10000)?.toFixed(2)} ha
              </span>
            </div>
          )}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          iconName="FileText"
          iconPosition="left"
          fullWidth
          disabled={totalOffset === 0}
        >
          Generate Detailed Report
        </Button>
        
        <Button
          variant="outline"
          iconName="Share2"
          iconPosition="left"
          fullWidth
        >
          Share Planning Summary
        </Button>
        
        <Button
          variant="secondary"
          iconName="Calculator"
          iconPosition="left"
          fullWidth
        >
          Adjust Target Goals
        </Button>
      </div>
    </div>
  );
};

export default OffsetCalculationSidebar;