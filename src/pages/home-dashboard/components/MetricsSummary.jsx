import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsSummary = () => {
  const metrics = [
    {
      id: 1,
      title: "Total Emissions",
      value: "12,450",
      unit: "tonnes CO₂",
      change: "+8.2%",
      changeType: "increase",
      icon: "Factory",
      color: "error",
      description: "Current month emissions from all mining activities"
    },
    {
      id: 2,
      title: "Carbon Offset",
      value: "8,750",
      unit: "tonnes CO₂/year",
      change: "+15.4%",
      changeType: "increase",
      icon: "TreePine",
      color: "success",
      description: "Projected annual offset from planned afforestation"
    },
    {
      id: 3,
      title: "Carbon Gap",
      value: "3,700",
      unit: "tonnes CO₂",
      change: "-12.1%",
      changeType: "decrease",
      icon: "TrendingDown",
      color: "warning",
      description: "Remaining emissions after offset implementation"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      error: {
        bg: "bg-error/10",
        text: "text-error",
        icon: "text-error"
      },
      success: {
        bg: "bg-success/10",
        text: "text-success",
        icon: "text-success"
      },
      warning: {
        bg: "bg-warning/10",
        text: "text-warning",
        icon: "text-warning"
      }
    };
    return colorMap?.[color] || colorMap?.success;
  };

  const getChangeIcon = (changeType) => {
    return changeType === "increase" ? "TrendingUp" : "TrendingDown";
  };

  const getChangeColor = (changeType, metricColor) => {
    if (metricColor === "error") {
      return changeType === "increase" ? "text-error" : "text-success";
    }
    if (metricColor === "warning") {
      return changeType === "decrease" ? "text-success" : "text-warning";
    }
    return changeType === "increase" ? "text-success" : "text-error";
  };

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-2">
          Carbon Tracking Overview
        </h2>
        <p className="text-base font-body text-muted-foreground max-w-2xl mx-auto">
          Real-time insights into your mining operations' carbon footprint and neutrality progress
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {metrics?.map((metric) => {
          const colors = getColorClasses(metric?.color);
          const changeIcon = getChangeIcon(metric?.changeType);
          const changeColor = getChangeColor(metric?.changeType, metric?.color);

          return (
            <div
              key={metric?.id}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${colors?.bg} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={metric?.icon} size={24} className={colors?.icon} />
                </div>
                
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full bg-muted text-xs font-caption ${changeColor}`}>
                  <Icon name={changeIcon} size={12} />
                  <span>{metric?.change}</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-body font-medium text-muted-foreground">
                  {metric?.title}
                </h3>
                
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl lg:text-3xl font-heading font-semibold text-foreground">
                    {metric?.value}
                  </span>
                  <span className="text-sm font-caption text-muted-foreground">
                    {metric?.unit}
                  </span>
                </div>
                
                <p className="text-xs font-caption text-muted-foreground leading-relaxed">
                  {metric?.description}
                </p>
              </div>
              {/* Progress Indicator */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-xs font-caption text-muted-foreground">
                  <span>Last updated</span>
                  <span>2 hours ago</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MetricsSummary;