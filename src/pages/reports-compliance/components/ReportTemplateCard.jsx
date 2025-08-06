import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportTemplateCard = ({ template, onSelect, isSelected }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10';
      case 'draft':
        return 'text-warning bg-warning/10';
      case 'archived':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getFrequencyIcon = (frequency) => {
    switch (frequency) {
      case 'monthly':
        return 'Calendar';
      case 'quarterly':
        return 'CalendarDays';
      case 'annually':
        return 'CalendarRange';
      default:
        return 'FileText';
    }
  };

  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm ${
        isSelected
          ? 'border-primary bg-primary/5 shadow-sm'
          : 'border-border bg-card hover:border-primary/50'
      }`}
      onClick={() => onSelect(template)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="FileText" size={16} className="text-primary" />
          <h3 className="font-body font-medium text-foreground text-sm">
            {template?.name}
          </h3>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-caption ${getStatusColor(template?.status)}`}>
          {template?.status}
        </div>
      </div>
      <p className="text-xs font-caption text-muted-foreground mb-3 line-clamp-2">
        {template?.description}
      </p>
      <div className="flex items-center justify-between text-xs font-caption text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Icon name={getFrequencyIcon(template?.frequency)} size={12} />
          <span>{template?.frequency}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={12} />
          <span>{template?.lastUsed}</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <div className="flex items-center space-x-1 text-xs font-caption text-muted-foreground">
          <Icon name="Building" size={12} />
          <span>{template?.authority}</span>
        </div>
        <Button
          variant="ghost"
          size="xs"
          iconName="ExternalLink"
          iconSize={12}
          onClick={(e) => {
            e?.stopPropagation();
            onSelect(template);
          }}
        >
          Select
        </Button>
      </div>
    </div>
  );
};

export default ReportTemplateCard;