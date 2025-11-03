import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  
  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };
  
  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] border-b border-border bg-card shadow-sm transition-colors supports-[backdrop-filter]:backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">
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

        {/* Carbon Management Tools Navigation */}
        <nav className="hidden flex-1 items-center justify-center gap-2 lg:flex">
          {/* Data Workbench */}
          <NavLink
            to="/data-workbench"
            aria-label="Data Workbench"
            className={({ isActive }) => `nav-blink nav-blink-delay-0 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-body font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${isActive ? 'bg-accent text-accent-foreground shadow-md ring-2 ring-accent/40' : 'bg-muted text-foreground hover:bg-accent hover:text-accent-foreground'}`}
          >
            <Icon name="Database" size={16} className="transition-colors" aria-hidden="true" />
            <span>Data Workbench</span>
          </NavLink>
          {/* Calculate (Emission Calculator) */}
          <NavLink
            to="/emission-calculator"
            aria-label="Emission Calculator"
            className={({ isActive }) => `nav-blink nav-blink-delay-1 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-body font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${isActive ? 'bg-accent text-accent-foreground shadow-md ring-2 ring-accent/40' : 'bg-muted text-foreground hover:bg-accent hover:text-accent-foreground'}`}
          >
            <Icon name="Calculator" size={16} className="transition-colors" aria-hidden="true" />
            <span>Emission Calculator</span>
          </NavLink>
          {/* Plan (Afforestation) */}
          <NavLink
            to="/afforestation-planner"
            aria-label="Afforestation"
            className={({ isActive }) => `nav-blink nav-blink-delay-2 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-body font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${isActive ? 'bg-accent text-accent-foreground shadow-md ring-2 ring-accent/40' : 'bg-muted text-foreground hover:bg-accent hover:text-accent-foreground'}`}
          >
            <Icon name="Leaf" size={16} className="transition-colors" aria-hidden="true" />
            <span>Afforestation</span>
          </NavLink>
          {/* Analyze (Gap Analysis) */}
          <NavLink
            to="/carbon-gap-analysis-dashboard"
            aria-label="Gap Analysis"
            className={({ isActive }) => `nav-blink nav-blink-delay-3 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-body font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${isActive ? 'bg-accent text-accent-foreground shadow-md ring-2 ring-accent/40' : 'bg-muted text-foreground hover:bg-accent hover:text-accent-foreground'}`}
          >
            <Icon name="TrendingDown" size={16} className="transition-colors" aria-hidden="true" />
            <span>Gap Analysis</span>
          </NavLink>
          {/* Report (Reports) */}
          <NavLink
            to="/reports-compliance"
            aria-label="Reports"
            className={({ isActive }) => `nav-blink nav-blink-delay-4 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-body font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${isActive ? 'bg-accent text-accent-foreground shadow-md ring-2 ring-accent/40' : 'bg-muted text-foreground hover:bg-accent hover:text-accent-foreground'}`}
          >
            <Icon name="FileText" size={16} className="transition-colors" aria-hidden="true" />
            <span>Reports</span>
          </NavLink>
        </nav>

        {/* User Context Panel & Mobile Menu Button */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* User Context Panel - Desktop */}
          {isAuthenticated ? (
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
                  <p className="text-sm font-body font-medium text-foreground">{user?.name || 'User'}</p>
                  <p className="text-xs font-caption text-muted-foreground">{user?.role || 'Member'}</p>
                </div>
                <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
              </Button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-modal z-[1050]">
                  <div className="p-4 border-b border-border">
                    <p className="font-body font-medium text-foreground">{user?.name || 'User'}</p>
                    <p className="text-sm font-caption text-muted-foreground">{user?.email || 'user@example.com'}</p>
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
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-body text-foreground hover:bg-muted rounded-md transition-colors duration-150"
                      >
                        <Icon name="LogOut" size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden lg:flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogin}
              >
                Sign In
              </Button>
              <Button
                size="sm"
                onClick={() => navigate('/register')}
              >
                Sign Up
              </Button>
            </div>
          )}

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
              {isAuthenticated ? (
                <>
                  {/* User Info - Mobile */}
                  <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg mb-6">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} className="text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-body font-medium text-foreground">{user?.name || 'User'}</p>
                      <p className="text-sm font-caption text-muted-foreground">{user?.role || 'Member'}</p>
                    </div>
                  </div>

                  {/* Carbon Management Tools - Mobile */}
                  <div className="mb-6">
                    <h3 className="text-xs font-caption font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-4">
                      Carbon Management Tools
                    </h3>
                    <div className="space-y-2">
                      {/* Data Workbench */}
                      <NavLink
                        to="/data-workbench"
                        aria-label="Data Workbench"
                        onClick={toggleMobileMenu}
                        className={({ isActive }) => `nav-blink nav-blink-delay-0 flex items-center gap-3 rounded-xl px-4 py-3 text-base font-body font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${isActive ? 'bg-accent text-accent-foreground shadow-md ring-2 ring-accent/40' : 'bg-muted text-foreground hover:bg-accent hover:text-accent-foreground'}`}
                      >
                        <Icon name="Database" size={20} className="transition-colors" aria-hidden="true" />
                        <span>Data Workbench</span>
                      </NavLink>
                      {/* Calculate (Emission Calculator) */}
                      <NavLink
                        to="/emission-calculator"
                        aria-label="Emission Calculator"
                        onClick={toggleMobileMenu}
                        className={({ isActive }) => `nav-blink nav-blink-delay-1 flex items-center gap-3 rounded-xl px-4 py-3 text-base font-body font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${isActive ? 'bg-accent text-accent-foreground shadow-md ring-2 ring-accent/40' : 'bg-muted text-foreground hover:bg-accent hover:text-accent-foreground'}`}
                      >
                        <Icon name="Calculator" size={20} className="transition-colors" aria-hidden="true" />
                        <span>Emission Calculator</span>
                      </NavLink>
                      {/* Plan (Afforestation) */}
                      <NavLink
                        to="/afforestation-planner"
                        aria-label="Afforestation"
                        onClick={toggleMobileMenu}
                        className={({ isActive }) => `nav-blink nav-blink-delay-2 flex items-center gap-3 rounded-xl px-4 py-3 text-base font-body font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${isActive ? 'bg-accent text-accent-foreground shadow-md ring-2 ring-accent/40' : 'bg-muted text-foreground hover:bg-accent hover:text-accent-foreground'}`}
                      >
                        <Icon name="Leaf" size={20} className="transition-colors" aria-hidden="true" />
                        <span>Afforestation</span>
                      </NavLink>
                      {/* Analyze (Gap Analysis) */}
                      <NavLink
                        to="/carbon-gap-analysis-dashboard"
                        aria-label="Gap Analysis"
                        onClick={toggleMobileMenu}
                        className={({ isActive }) => `nav-blink nav-blink-delay-3 flex items-center gap-3 rounded-xl px-4 py-3 text-base font-body font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${isActive ? 'bg-accent text-accent-foreground shadow-md ring-2 ring-accent/40' : 'bg-muted text-foreground hover:bg-accent hover:text-accent-foreground'}`}
                      >
                        <Icon name="TrendingDown" size={20} className="transition-colors" aria-hidden="true" />
                        <span>Gap Analysis</span>
                      </NavLink>
                      {/* Report (Reports) */}
                      <NavLink
                        to="/reports-compliance"
                        aria-label="Reports"
                        onClick={toggleMobileMenu}
                        className={({ isActive }) => `nav-blink nav-blink-delay-4 flex items-center gap-3 rounded-xl px-4 py-3 text-base font-body font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${isActive ? 'bg-accent text-accent-foreground shadow-md ring-2 ring-accent/40' : 'bg-muted text-foreground hover:bg-accent hover:text-accent-foreground'}`}
                      >
                        <Icon name="FileText" size={20} className="transition-colors" aria-hidden="true" />
                        <span>Reports</span>
                      </NavLink>
                    </div>
                  </div>

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
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-base font-body text-foreground hover:bg-muted rounded-lg transition-colors duration-150"
                    >
                      <Icon name="LogOut" size={20} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Login/Register - Mobile */}
                  <div className="space-y-4">
                    <p className="text-sm font-body text-muted-foreground mb-4">
                      Please sign in to access your account
                    </p>
                    <Button
                      className="w-full"
                      onClick={() => {
                        toggleMobileMenu();
                        handleLogin();
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        toggleMobileMenu();
                        navigate('/register');
                      }}
                    >
                      Create Account
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
