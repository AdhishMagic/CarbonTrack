import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  return (
    <section className="relative bg-green-gradient-soft overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-sm font-caption text-success font-medium">
                  Ministry of Coal Initiative
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-semibold text-foreground leading-tight">
                Track Carbon,
                <span className="text-primary block">Plan Neutrality</span>
              </h1>
              
              <p className="text-lg lg:text-xl font-body text-muted-foreground leading-relaxed max-w-xl">
                Comprehensive carbon emission tracking and afforestation planning for Indian coal mining operations. 
                Calculate emissions, plan tree plantations, and visualize your path to carbon neutrality.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/emission-calculator">
                <Button 
                  variant="default" 
                  size="lg" 
                  iconName="Calculator" 
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Calculate Emissions
                </Button>
              </Link>
              
              <Link to="/afforestation-planner">
                <Button 
                  variant="outline" 
                  size="lg" 
                  iconName="TreePine" 
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Plan Afforestation
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-heading font-semibold text-foreground">
                  500+
                </div>
                <div className="text-sm font-caption text-muted-foreground">
                  Coal Mines Tracked
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-heading font-semibold text-foreground">
                  2.5M
                </div>
                <div className="text-sm font-caption text-muted-foreground">
                  Tonnes CO₂ Calculated
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-heading font-semibold text-foreground">
                  15K
                </div>
                <div className="text-sm font-caption text-muted-foreground">
                  Trees Planned
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80"
                alt="Sunlight streaming through dense green forest canopy"
                className="w-full h-96 lg:h-[500px] object-cover filter saturate-[1.15] contrast-[1.05] brightness-[0.97] hue-rotate-[-8deg]"
              />
              {/* Theme-aligned overlays: subtle green tint + gradient for readability */}
              <div className="absolute inset-0 bg-accent/15 mix-blend-multiply dark:bg-accent/25" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/35 to-transparent dark:from-primary/50" />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingDown" size={20} className="text-success" />
                </div>
                <div>
                  <div className="text-sm font-body font-medium text-foreground">
                    15% Reduction
                  </div>
                  <div className="text-xs font-caption text-muted-foreground">
                    This Quarter
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-card border border-border rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="TreePine" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-sm font-body font-medium text-foreground">
                    3,250 Trees
                  </div>
                  <div className="text-xs font-caption text-muted-foreground">
                    Planned
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;