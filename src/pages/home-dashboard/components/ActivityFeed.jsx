import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: "calculation",
      title: "Emission calculation completed",
      description: "Jharia Coal Mine - December 2024",
      value: "2,450 tonnes CO₂",
      timestamp: "2 hours ago",
      icon: "Calculator",
      color: "primary"
    },
    {
      id: 2,
      type: "planning",
      title: "Tree plantation plan updated",
      description: "Raniganj Coalfield - Phase 2",
      value: "1,200 saplings",
      timestamp: "5 hours ago",
      icon: "TreePine",
      color: "success"
    },
    {
      id: 3,
      type: "report",
      title: "Compliance report generated",
      description: "Monthly environmental report",
      value: "95% compliance",
      timestamp: "1 day ago",
      icon: "FileText",
      color: "accent"
    },
    {
      id: 4,
      type: "alert",
      title: "Emission threshold exceeded",
      description: "Korba Coal Mine - Equipment usage",
      value: "Alert triggered",
      timestamp: "2 days ago",
      icon: "AlertTriangle",
      color: "warning"
    },
    {
      id: 5,
      type: "achievement",
      title: "Carbon offset milestone reached",
      description: "Singareni Collieries - Q4 target",
      value: "10,000 tonnes CO₂",
      timestamp: "3 days ago",
      icon: "Award",
      color: "success"
    }
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      title: "Environmental Impact Assessment",
      description: "Quarterly submission due",
      dueDate: "Dec 15, 2024",
      priority: "high",
      daysLeft: 9
    },
    {
      id: 2,
      title: "Carbon Offset Verification",
      description: "Annual verification process",
      dueDate: "Dec 31, 2024",
      priority: "medium",
      daysLeft: 25
    },
    {
      id: 3,
      title: "Afforestation Progress Report",
      description: "Semi-annual progress update",
      dueDate: "Jan 10, 2025",
      priority: "low",
      daysLeft: 35
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: { bg: "bg-primary/10", text: "text-primary" },
      success: { bg: "bg-success/10", text: "text-success" },
      accent: { bg: "bg-accent/10", text: "text-accent" },
      warning: { bg: "bg-warning/10", text: "text-warning" }
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  const getPriorityColor = (priority) => {
    const priorityMap = {
      high: "text-error",
      medium: "text-warning",
      low: "text-muted-foreground"
    };
    return priorityMap?.[priority] || priorityMap?.low;
  };

  return (
    <div className="space-y-6">
      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={20} className="text-primary" />
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Recent Activity
            </h3>
          </div>
          <button className="text-sm font-body text-accent hover:text-accent/80 transition-colors duration-150">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {activities?.map((activity) => {
            const colors = getColorClasses(activity?.color);
            
            return (
              <div
                key={activity?.id}
                className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-150 cursor-pointer"
              >
                <div className={`w-10 h-10 ${colors?.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon name={activity?.icon} size={16} className={colors?.text} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-body font-medium text-foreground">
                        {activity?.title}
                      </p>
                      <p className="text-xs font-caption text-muted-foreground">
                        {activity?.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs font-caption font-medium ${colors?.text}`}>
                          {activity?.value}
                        </span>
                        <span className="text-xs font-caption text-muted-foreground">
                          •
                        </span>
                        <span className="text-xs font-caption text-muted-foreground">
                          {activity?.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Upcoming Deadlines */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={20} className="text-warning" />
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Upcoming Deadlines
            </h3>
          </div>
          <button className="text-sm font-body text-accent hover:text-accent/80 transition-colors duration-150">
            View Calendar
          </button>
        </div>

        <div className="space-y-4">
          {upcomingDeadlines?.map((deadline) => (
            <div
              key={deadline?.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-150"
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-warning rounded-full" />
                <div>
                  <p className="text-sm font-body font-medium text-foreground">
                    {deadline?.title}
                  </p>
                  <p className="text-xs font-caption text-muted-foreground">
                    {deadline?.description}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-body font-medium text-foreground">
                  {deadline?.dueDate}
                </p>
                <p className={`text-xs font-caption ${getPriorityColor(deadline?.priority)}`}>
                  {deadline?.daysLeft} days left
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-center space-x-2 text-sm font-body text-muted-foreground">
            <Icon name="Bell" size={16} />
            <span>Set up notifications for important deadlines</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;