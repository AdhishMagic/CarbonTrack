import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComplianceCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const upcomingDeadlines = [
    {
      id: 1,
      title: "Monthly Emission Report",
      authority: "Ministry of Coal",
      dueDate: "2025-01-15",
      status: "pending",
      priority: "high",
      daysLeft: 9
    },
    {
      id: 2,
      title: "Quarterly Sustainability Statement",
      authority: "State Pollution Control Board",
      dueDate: "2025-01-31",
      status: "draft",
      priority: "medium",
      daysLeft: 25
    },
    {
      id: 3,
      title: "Annual Carbon Neutrality Report",
      authority: "Central Electricity Authority",
      dueDate: "2025-03-31",
      status: "not_started",
      priority: "low",
      daysLeft: 84
    },
    {
      id: 4,
      title: "Environmental Impact Assessment",
      authority: "Ministry of Environment",
      dueDate: "2025-02-28",
      status: "in_progress",
      priority: "high",
      daysLeft: 53
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'draft':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'in_progress':
        return 'text-accent bg-accent/10 border-accent/20';
      case 'not_started':
        return 'text-muted-foreground bg-muted border-border';
      case 'submitted':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'Clock';
      case 'low':
        return 'CheckCircle';
      default:
        return 'Circle';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-body font-semibold text-foreground">Compliance Calendar</h2>
          <Button variant="ghost" size="sm" iconName="Calendar">
            View All
          </Button>
        </div>
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <p className="text-sm font-caption text-muted-foreground">Current Period</p>
          <p className="font-body font-medium text-foreground">
            {currentDate?.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>
      {/* Upcoming Deadlines */}
      <div className="flex-1 p-4 overflow-auto">
        <h3 className="font-body font-medium text-foreground mb-4">Upcoming Deadlines</h3>
        <div className="space-y-3">
          {upcomingDeadlines?.map((deadline) => (
            <div
              key={deadline?.id}
              className={`p-4 border rounded-lg transition-all duration-200 hover:shadow-sm ${getStatusColor(deadline?.status)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-body font-medium text-foreground text-sm mb-1">
                    {deadline?.title}
                  </h4>
                  <p className="text-xs font-caption text-muted-foreground">
                    {deadline?.authority}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={getPriorityIcon(deadline?.priority)} 
                    size={12} 
                    className={getPriorityColor(deadline?.priority)} 
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-caption">
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Icon name="Calendar" size={12} />
                  <span>Due: {formatDate(deadline?.dueDate)}</span>
                </div>
                <div className={`flex items-center space-x-1 ${
                  deadline?.daysLeft <= 7 ? 'text-error' : 
                  deadline?.daysLeft <= 30 ? 'text-warning' : 'text-muted-foreground'
                }`}>
                  <Icon name="Clock" size={12} />
                  <span>{deadline?.daysLeft} days left</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-caption capitalize text-muted-foreground">
                    {deadline?.status?.replace('_', ' ')}
                  </span>
                  <Button variant="ghost" size="xs" iconName="ExternalLink" iconSize={10}>
                    Open
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-4 border-t border-border">
          <h3 className="font-body font-medium text-foreground mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Button variant="outline" size="sm" fullWidth iconName="Plus" iconPosition="left">
              Schedule Report
            </Button>
            <Button variant="outline" size="sm" fullWidth iconName="Bell" iconPosition="left">
              Set Reminder
            </Button>
            <Button variant="outline" size="sm" fullWidth iconName="Download" iconPosition="left">
              Export Calendar
            </Button>
          </div>
        </div>

        {/* Compliance Stats */}
        <div className="mt-6 pt-4 border-t border-border">
          <h3 className="font-body font-medium text-foreground mb-3">This Month</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-success/10 rounded-lg">
              <p className="text-lg font-heading font-bold text-success">3</p>
              <p className="text-xs font-caption text-muted-foreground">Submitted</p>
            </div>
            <div className="text-center p-3 bg-warning/10 rounded-lg">
              <p className="text-lg font-heading font-bold text-warning">2</p>
              <p className="text-xs font-caption text-muted-foreground">Pending</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceCalendar;