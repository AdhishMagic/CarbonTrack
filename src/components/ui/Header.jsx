import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Home', path: '/home-dashboard', icon: 'Home', tooltip: 'Dashboard overview and metrics' },
    { label: 'Calculate', path: '/emission-calculator', icon: 'Calculator', tooltip: 'Emission calculation tools' },
    { label: 'Plan', path: '/afforestation-planner', icon: 'TreePine', tooltip: 'Afforestation strategy planning' },
    { label: 'Analyze', path: '/carbon-gap-analysis-dashboard', icon: 'BarChart3', tooltip: 'Carbon gap analysis dashboard' },
    { label: 'Report', path: '/reports-compliance', icon: 'FileText', tooltip: 'Compliance reports and documentation' }
  ];

  const isActiveRoute = (path) => location.pathname === path;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <Link to="/home-dashboard" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-primary-foreground"
                fill="currentColor"
              >
                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                <path d="M12 16L13.09 22.26L22 23L13.09 23.74L12 30L10.91 23.74L2 23L10.91 22.26L12 16Z" opacity="0.6" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-heading font-semibold text-foreground">CarbonTrack</h1>
              <p className="text-xs font-caption text-muted-foreground">Ministry of Coal</p>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`group relative flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-body font-medium transition-all duration-150 ease-out-custom ${
                isActiveRoute(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={item?.tooltip}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
              {isActiveRoute(item?.path) && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-foreground rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* User Context Panel & Mobile Menu Button */}
        <div className="flex items-center space-x-2">
          {/* User Context Panel - Desktop */}
          <div className="hidden lg:block relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleUserMenu}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary-foreground" />
              </div>
              <div className="text-left">
                <p className="text-sm font-body font-medium text-foreground">Admin User</p>
                <p className="text-xs font-caption text-muted-foreground">Environmental Officer</p>
              </div>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </Button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-modal z-[1050]">
                <div className="p-4 border-b border-border">
                  <p className="font-body font-medium text-foreground">Admin User</p>
                  <p className="text-sm font-caption text-muted-foreground">admin@coalministry.gov.in</p>
                </div>
                <div className="p-2">
                  <div className="space-y-1">
                    <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-body text-foreground hover:bg-muted rounded-md transition-colors duration-150">
                      <Icon name="Calculator" size={16} />
                      <span>Recent Calculations</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-body text-foreground hover:bg-muted rounded-md transition-colors duration-150">
                      <Icon name="FileText" size={16} />
                      <span>Saved Reports</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-body text-foreground hover:bg-muted rounded-md transition-colors duration-150">
                      <Icon name="Settings" size={16} />
                      <span>Account Settings</span>
                    </button>
                  </div>
                  <div className="border-t border-border mt-2 pt-2">
                    <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-body text-foreground hover:bg-muted rounded-md transition-colors duration-150">
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            className="lg:hidden"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-[1100] lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={toggleMobileMenu} />
          <div className="relative bg-card border-r border-border h-full w-80 max-w-[80vw] shadow-modal">
            <div className="p-6">
              {/* User Info - Mobile */}
              <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg mb-6">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="font-body font-medium text-foreground">Admin User</p>
                  <p className="text-sm font-caption text-muted-foreground">Environmental Officer</p>
                </div>
              </div>

              {/* Navigation Items - Mobile */}
              <nav className="space-y-2">
                {navigationItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={toggleMobileMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-body font-medium transition-all duration-150 ease-out-custom ${
                      isActiveRoute(item?.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <div>
                      <span>{item?.label}</span>
                      <p className="text-sm font-caption opacity-75">{item?.tooltip}</p>
                    </div>
                  </Link>
                ))}
              </nav>

              {/* User Actions - Mobile */}
              <div className="mt-8 pt-6 border-t border-border space-y-2">
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-base font-body text-foreground hover:bg-muted rounded-lg transition-colors duration-150">
                  <Icon name="Calculator" size={20} />
                  <span>Recent Calculations</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-base font-body text-foreground hover:bg-muted rounded-lg transition-colors duration-150">
                  <Icon name="FileText" size={20} />
                  <span>Saved Reports</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-base font-body text-foreground hover:bg-muted rounded-lg transition-colors duration-150">
                  <Icon name="Settings" size={20} />
                  <span>Settings</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-base font-body text-foreground hover:bg-muted rounded-lg transition-colors duration-150">
                  <Icon name="LogOut" size={20} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;