import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const ProgressIndicator = () => {
  const location = useLocation();
  
  const workflowSteps = [
    { path: '/emission-calculator', label: 'Calculate', icon: 'Calculator', step: 1 },
    { path: '/afforestation-planner', label: 'Plan', icon: 'TreePine', step: 2 },
    { path: '/carbon-gap-analysis-dashboard', label: 'Analyze', icon: 'BarChart3', step: 3 },
    { path: '/reports-compliance', label: 'Report', icon: 'FileText', step: 4 }
  ];

  const currentStepIndex = workflowSteps?.findIndex(step => step?.path === location.pathname);
  
  // Don't show progress indicator on home dashboard
  if (location.pathname === '/home-dashboard' || currentStepIndex === -1) {
    return null;
  }

  const currentStep = workflowSteps?.[currentStepIndex];
  const completedSteps = currentStepIndex;
  const totalSteps = workflowSteps?.length;

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="Workflow" size={16} className="text-primary" />
          <span className="text-sm font-body font-medium text-foreground">Carbon Management Workflow</span>
        </div>
        <span className="text-xs font-caption text-muted-foreground">
          Step {currentStep?.step} of {totalSteps}
        </span>
      </div>
      {/* Progress Bar */}
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          {workflowSteps?.map((step, index) => (
            <div key={step?.path} className="flex flex-col items-center space-y-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  index < currentStepIndex
                    ? 'bg-success text-success-foreground'
                    : index === currentStepIndex
                    ? 'bg-primary text-primary-foreground ring-2 ring-primary/20'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {index < currentStepIndex ? (
                  <Icon name="Check" size={14} />
                ) : (
                  <Icon name={step?.icon} size={14} />
                )}
              </div>
              <span
                className={`text-xs font-caption hidden sm:block ${
                  index === currentStepIndex
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground'
                }`}
              >
                {step?.label}
              </span>
            </div>
          ))}
        </div>
        
        {/* Progress Line */}
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-muted -z-10">
          <div
            className="h-full bg-success transition-all duration-500 ease-out-custom"
            style={{ width: `${(completedSteps / (totalSteps - 1)) * 100}%` }}
          />
        </div>
      </div>
      {/* Current Step Info */}
      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name={currentStep?.icon} size={16} className="text-primary" />
            <span className="text-sm font-body font-medium text-foreground">
              {currentStep?.label}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-xs font-caption text-muted-foreground">
            <Icon name="Clock" size={12} />
            <span>In Progress</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;