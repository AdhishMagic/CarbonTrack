import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryCard = ({ title, value, unit, trend, trendValue, status, icon, description }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'surplus':
        return 'text-success bg-success/10 border-success/20';
      case 'deficit':
        return 'text-error bg-error/10 border-error/20';
      case 'neutral':
        return 'text-warning bg-warning/10 border-warning/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return status === 'deficit' ? 'text-error' : 'text-success';
      case 'down':
        return status === 'deficit' ? 'text-success' : 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className={`bg-card border rounded-lg p-6 ${getStatusColor(status)}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-body font-medium text-muted-foreground">{title}</h3>
            <p className="text-xs font-caption text-muted-foreground/80">{description}</p>
          </div>
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 ${getTrendColor(trend)}`}>
            <Icon name={getTrendIcon(trend)} size={16} />
            <span className="text-sm font-body font-medium">{trendValue}</span>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-heading font-semibold text-foreground">
            {typeof value === 'number' ? value?.toLocaleString('en-IN') : value}
          </span>
          <span className="text-sm font-caption text-muted-foreground">{unit}</span>
        </div>
        
        {status && (
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              status === 'surplus' ? 'bg-success' : 
              status === 'deficit' ? 'bg-error' : 'bg-warning'
            }`} />
            <span className="text-xs font-caption capitalize text-muted-foreground">
              {status === 'surplus' ? 'Carbon Positive' : 
               status === 'deficit' ? 'Carbon Deficit' : 'Carbon Neutral'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;