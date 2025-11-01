import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickAccessTiles = () => {
  const tiles = [
    {
      id: 1,
      title: "Emission Calculator",
      description: "Calculate carbon emissions from mining activities including excavation, transport, and equipment usage",
      icon: "Calculator",
      route: "/emission-calculator",
      color: "primary",
      features: ["Activity tracking", "Fuel consumption", "Real-time calculations"],
      status: "active"
    },
    {
      id: 2,
      title: "Tree Plantation Planner",
      description: "Plan tree plantation strategies with species selection and carbon offset estimation",
      icon: "TreePine",
      route: "/afforestation-planner",
      color: "success",
      features: ["Species selection", "Land planning", "Offset calculation"],
      status: "active"
    },
    {
      id: 3,
      title: "Grass Plantation Planner",
      description: "Design grass plantation programs for land rehabilitation and additional carbon sequestration",
      icon: "Sprout",
      route: "/afforestation-planner",
      color: "accent",
      features: ["Land area planning", "Grass type selection", "Growth tracking"],
      status: "active"
    },
    {
      id: 4,
      title: "Carbon Gap Analysis",
      description: "Comprehensive dashboard showing emission vs offset analysis with interactive visualizations",
      icon: "BarChart3",
      route: "/carbon-gap-analysis-dashboard",
      color: "warning",
      features: ["Gap analysis", "Trend visualization", "Compliance tracking"],
      status: "active"
    }
    ,
    {
      id: 5,
      title: "Data Workbench",
      description: "Upload CSV/Excel, map columns, and run Calculate → Plan → Analyze → Report on your data",
      icon: "Database",
      route: "/data-workbench",
      color: "accent",
      features: ["CSV/XLSX upload", "Column mapping", "Charts & report"],
      status: "active"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: "bg-primary/10",
        border: "border-primary/20",
        icon: "text-primary",
        button: "primary"
      },
      success: {
        bg: "bg-success/10",
        border: "border-success/20",
        icon: "text-success",
        button: "success"
      },
      accent: {
        bg: "bg-accent/10",
        border: "border-accent/20",
        icon: "text-accent",
        button: "default"
      },
      warning: {
        bg: "bg-warning/10",
        border: "border-warning/20",
        icon: "text-warning",
        button: "warning"
      }
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-2">
          Carbon Management Tools
        </h2>
        <p className="text-base font-body text-muted-foreground max-w-2xl mx-auto">
          Access comprehensive tools for emission tracking, afforestation planning, and carbon neutrality analysis
        </p>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {tiles?.map((tile) => {
          const colors = getColorClasses(tile?.color);

          return (
            <div
              key={tile?.id}
              className={`bg-card border-2 ${colors?.border} rounded-xl p-6 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 ${colors?.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={tile?.icon} size={28} className={colors?.icon} />
                </div>
                
                <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-success/10 text-xs font-caption text-success">
                  <div className="w-1.5 h-1.5 bg-success rounded-full" />
                  <span>Active</span>
                </div>
              </div>
              {/* Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    {tile?.title}
                  </h3>
                  <p className="text-sm font-body text-muted-foreground leading-relaxed">
                    {tile?.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {tile?.features?.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={14} className="text-success" />
                      <span className="text-xs font-caption text-muted-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  <Link to={tile?.route} className="block">
                    <Button
                      variant={colors?.button}
                      size="sm"
                      iconName="ArrowRight"
                      iconPosition="right"
                      className="w-full"
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Additional Actions */}
      <div className="mt-12 text-center">
        <div className="bg-muted/50 rounded-xl p-8">
          <div className="max-w-2xl mx-auto space-y-4">
            <Icon name="Lightbulb" size={32} className="text-accent mx-auto" />
            <h3 className="text-xl font-heading font-semibold text-foreground">
              Need Help Getting Started?
            </h3>
            <p className="text-sm font-body text-muted-foreground">
              Access our comprehensive guides and tutorials to maximize your carbon management efficiency
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" iconName="BookOpen" iconPosition="left">
                View Documentation
              </Button>
              <Button variant="ghost" iconName="Play" iconPosition="left">
                Watch Tutorial
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickAccessTiles;