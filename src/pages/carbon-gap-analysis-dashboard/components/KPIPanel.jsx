import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const KPIPanel = ({ kpiData, recommendations, complianceStatus }) => {
  const getComplianceColor = (status) => {
    switch (status) {
      case 'compliant':
        return 'text-success bg-success/10 border-success/20';
      case 'at-risk':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'non-compliant':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getComplianceIcon = (status) => {
    switch (status) {
      case 'compliant':
        return 'CheckCircle';
      case 'at-risk':
        return 'AlertTriangle';
      case 'non-compliant':
        return 'XCircle';
      default:
        return 'Info';
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-foreground">Key Performance Indicators</h3>
        </div>
        
        <div className="space-y-4">
          {kpiData?.map((kpi, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={kpi?.icon} size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-body font-medium text-foreground">{kpi?.label}</p>
                  <p className="text-xs font-caption text-muted-foreground">{kpi?.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-heading font-semibold text-foreground">{kpi?.value}</p>
                <p className="text-xs font-caption text-muted-foreground">{kpi?.unit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Compliance Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Shield" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-foreground">Compliance Status</h3>
        </div>
        
        <div className={`p-4 rounded-lg border ${getComplianceColor(complianceStatus?.status)}`}>
          <div className="flex items-center space-x-3 mb-3">
            <Icon name={getComplianceIcon(complianceStatus?.status)} size={20} />
            <div>
              <p className="font-body font-medium capitalize">{complianceStatus?.status?.replace('-', ' ')}</p>
              <p className="text-sm font-caption opacity-80">{complianceStatus?.message}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-caption">
              <span>Progress to Target:</span>
              <span className="font-medium">{complianceStatus?.progress}%</span>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  complianceStatus?.status === 'compliant' ? 'bg-success' :
                  complianceStatus?.status === 'at-risk' ? 'bg-warning' : 'bg-error'
                }`}
                style={{ width: `${complianceStatus?.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Recommended Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Lightbulb" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-foreground">Recommended Actions</h3>
        </div>
        
        <div className="space-y-3">
          {recommendations?.map((recommendation, index) => (
            <div key={index} className="p-4 bg-muted/30 rounded-lg border border-border/50">
              <div className="flex items-start space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                  recommendation?.priority === 'high' ? 'bg-error text-error-foreground' :
                  recommendation?.priority === 'medium' ? 'bg-warning text-warning-foreground' :
                  'bg-success text-success-foreground'
                }`}>
                  <Icon name={
                    recommendation?.priority === 'high' ? 'AlertCircle' :
                    recommendation?.priority === 'medium' ? 'Clock' : 'CheckCircle'
                  } size={12} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-body font-medium text-foreground mb-1">
                    {recommendation?.title}
                  </p>
                  <p className="text-xs font-caption text-muted-foreground mb-2">
                    {recommendation?.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-caption px-2 py-1 rounded-full ${
                      recommendation?.priority === 'high' ? 'bg-error/10 text-error' :
                      recommendation?.priority === 'medium'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                    }`}>
                      {recommendation?.priority} priority
                    </span>
                    <span className="text-xs font-caption text-muted-foreground">
                      Impact: {recommendation?.impact}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-4"
          iconName="ExternalLink"
          iconPosition="right"
        >
          View All Recommendations
        </Button>
      </div>
      {/* What-if Calculator */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Calculator" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-foreground">What-if Calculator</h3>
        </div>
        
        <p className="text-sm font-caption text-muted-foreground mb-4">
          Model different scenarios to see their impact on your carbon footprint
        </p>
        
        <div className="space-y-3">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            iconName="TreePine"
            iconPosition="left"
          >
            Increase Afforestation by 25%
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            iconName="Zap"
            iconPosition="left"
          >
            Switch to Renewable Energy
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            iconName="Truck"
            iconPosition="left"
          >
            Optimize Transportation Routes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KPIPanel;