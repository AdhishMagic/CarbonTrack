import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EmissionVsOffsetChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-body font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm font-caption">
              <div 
                className="w-3 h-3 rounded-sm" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">{entry?.dataKey}:</span>
              <span className="font-medium text-foreground">
                {entry?.value?.toLocaleString('en-IN')} tonnes CO₂
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">Emissions vs Offsets by Category</h3>
          <p className="text-sm font-caption text-muted-foreground">Comparative analysis of carbon emissions and offset potential</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-sm" />
            <span className="text-sm font-caption text-muted-foreground">Emissions</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-sm" />
            <span className="text-sm font-caption text-muted-foreground">Offsets</span>
          </div>
        </div>
      </div>
      <div className="w-full h-80" aria-label="Emissions vs Offsets Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="category" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              fontFamily="Source Sans Pro"
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              fontFamily="Source Sans Pro"
              tickFormatter={(value) => `${value?.toLocaleString('en-IN')}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ 
                fontSize: '12px', 
                fontFamily: 'Source Sans Pro',
                color: 'var(--color-muted-foreground)'
              }}
            />
            <Bar 
              dataKey="emissions" 
              fill="var(--color-error)" 
              name="Emissions"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="offsets" 
              fill="var(--color-success)" 
              name="Offsets"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmissionVsOffsetChart;