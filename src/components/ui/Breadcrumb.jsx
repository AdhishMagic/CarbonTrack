import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  
  const routeMap = {
    '/home-dashboard': { label: 'Home', icon: 'Home' },
    '/emission-calculator': { label: 'Calculate', icon: 'Calculator' },
    '/afforestation-planner': { label: 'Plan', icon: 'TreePine' },
    '/carbon-gap-analysis-dashboard': { label: 'Analyze', icon: 'BarChart3' },
    '/reports-compliance': { label: 'Report', icon: 'FileText' }
  };

  const currentRoute = routeMap?.[location.pathname];
  
  if (!currentRoute || location.pathname === '/home-dashboard') {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm font-body mb-6" aria-label="Breadcrumb">
      <Link
        to="/home-dashboard"
        className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors duration-150"
      >
        <Icon name="Home" size={14} />
        <span>Home</span>
      </Link>
      <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
      <div className="flex items-center space-x-1 text-foreground font-medium">
        <Icon name={currentRoute?.icon} size={14} />
        <span>{currentRoute?.label}</span>
      </div>
    </nav>
  );
};

export default Breadcrumb;