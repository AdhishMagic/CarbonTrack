import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

// Minimal app header: shows app name on the left, optional right-side actions via children
// No navigation items (home/calculate/plan/analyze/report) as requested
function Header({ className, children }) {
  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 border-b border-border bg-card/90 backdrop-blur supports-[backdrop-filter]:bg-card/60',
        className
      )}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* App name / brand */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-9 h-9 rounded-md bg-primary text-primary-foreground shadow-card">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                <path d="M12 2l1.2 6h6l-4.8 3.5L16 18l-4-3-4 3 1.6-6.5L4 8h6L12 2z" />
              </svg>
            </div>
            <span className="text-base sm:text-lg font-heading font-semibold text-foreground group-hover:opacity-90">
              CarbonTrack
            </span>
          </Link>
        </div>

        {/* Right-side slot for future controls (e.g., profile, settings) */}
        <div className="flex items-center gap-2">
          {children}
        </div>
      </div>
    </header>
  );
}

export default Header;
