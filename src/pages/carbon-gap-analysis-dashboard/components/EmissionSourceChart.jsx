import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const EmissionSourceChart = ({ data }) => {
  const COLORS = [
    'var(--color-error)',
    'var(--color-warning)', 
    'var(--color-primary)',
    'var(--color-accent)',
    'var(--color-secondary)',
    'var(--color-success)'
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <div className="flex items-center space-x-2 mb-2">
            <div 
              className="w-3 h-3 rounded-sm" 
              style={{ backgroundColor: data?.payload?.fill }}
            />
            <span className="text-sm font-body font-medium text-foreground">{data?.payload?.source}</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm font-caption text-muted-foreground">Emissions:</span>
              <span className="text-sm font-body font-medium text-foreground">
                {data?.value?.toLocaleString('en-IN')} tonnes CO₂
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-caption text-muted-foreground">Percentage:</span>
              <span className="text-sm font-body font-medium text-foreground">
                {((data?.value / data?.payload?.total) * 100)?.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null; // Don't show labels for slices less than 5%
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontFamily="Source Sans Pro"
        fontWeight={500}
      >
        {`${(percent * 100)?.toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">Emission Sources Breakdown</h3>
          <p className="text-sm font-caption text-muted-foreground">Distribution of carbon emissions by activity type</p>
        </div>
      </div>
      <div className="w-full h-80" aria-label="Emission Sources Pie Chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              wrapperStyle={{ 
                fontSize: '12px', 
                fontFamily: 'Source Sans Pro',
                color: 'var(--color-muted-foreground)',
                paddingTop: '20px'
              }}
              formatter={(value, entry) => (
                <span style={{ color: entry?.color }}>
                  {value} ({((entry?.payload?.value / entry?.payload?.total) * 100)?.toFixed(1)}%)
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmissionSourceChart;