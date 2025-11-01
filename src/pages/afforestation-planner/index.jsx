import React, { useState } from 'react';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import TreePlantationForm from './components/TreePlantationForm';
import GrassPlantationForm from './components/GrassPlantationForm';
import OffsetCalculationSidebar from './components/OffsetCalculationSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AfforestationPlanner = () => {
  const [activeTab, setActiveTab] = useState('trees');
  const [treeData, setTreeData] = useState({});
  const [grassData, setGrassData] = useState({});

  const tabs = [
    {
      id: 'trees',
      label: 'Tree Plantation',
      icon: 'TreePine',
      description: 'Plan native tree species plantation for long-term carbon sequestration'
    },
    {
      id: 'grass',
      label: 'Grass Plantation',
      icon: 'Wheat',
      description: 'Design grass coverage for rapid soil stabilization and immediate offset'
    }
  ];

  const handleTreeDataChange = (data) => {
    setTreeData(data);
  };

  const handleGrassDataChange = (data) => {
    setGrassData(data);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb removed */}
          <ProgressIndicator />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <Icon name="TreePine" size={24} className="text-success" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
                  Afforestation Planner
                </h1>
                <p className="text-base font-body text-muted-foreground mt-1">
                  Design comprehensive tree and grass plantation strategies for carbon neutrality
                </p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-card border border-border rounded-lg p-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <Icon name="Target" size={16} className="text-primary" />
                  <span className="text-sm font-caption text-muted-foreground">Planning Goal</span>
                </div>
                <p className="text-lg font-heading font-semibold text-foreground">Carbon Neutrality</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <Icon name="MapPin" size={16} className="text-accent" />
                  <span className="text-sm font-caption text-muted-foreground">Focus Areas</span>
                </div>
                <p className="text-lg font-heading font-semibold text-foreground">Mining Regions</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <Icon name="Clock" size={16} className="text-success" />
                  <span className="text-sm font-caption text-muted-foreground">Timeline</span>
                </div>
                <p className="text-lg font-heading font-semibold text-foreground">5-Year Plan</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Planning Area */}
            <div className="xl:col-span-2">
              {/* Tab Navigation */}
              <div className="bg-card border border-border rounded-lg mb-6">
                <div className="border-b border-border">
                  <nav className="flex space-x-0" aria-label="Plantation Types">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveTab(tab?.id)}
                        className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 text-sm font-body font-medium transition-all duration-200 ${
                          activeTab === tab?.id
                            ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                      >
                        <Icon name={tab?.icon} size={18} />
                        <span className="hidden sm:inline">{tab?.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
                
                {/* Tab Description */}
                <div className="p-4 bg-muted/30">
                  <p className="text-sm font-caption text-muted-foreground">
                    {tabs?.find(tab => tab?.id === activeTab)?.description}
                  </p>
                </div>
              </div>

              {/* Tab Content */}
              <div className="bg-card border border-border rounded-lg p-6">
                {activeTab === 'trees' ? (
                  <TreePlantationForm 
                    onDataChange={handleTreeDataChange}
                    data={treeData}
                  />
                ) : (
                  <GrassPlantationForm 
                    onDataChange={handleGrassDataChange}
                    data={grassData}
                  />
                )}
              </div>

              {/* Combined Action Panel */}
              <div className="mt-6 bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Zap" size={16} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground">
                    Integrated Planning Actions
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    iconName="Map"
                    iconPosition="left"
                    className="w-full"
                  >
                    Site Survey
                  </Button>
                  
                  <Button
                    variant="outline"
                    iconName="Users"
                    iconPosition="left"
                    className="w-full"
                  >
                    Team Planning
                  </Button>
                  
                  <Button
                    variant="secondary"
                    iconName="Calendar"
                    iconPosition="left"
                    className="w-full"
                  >
                    Schedule Work
                  </Button>
                  
                  <Button
                    variant="default"
                    iconName="FileText"
                    iconPosition="left"
                    className="w-full"
                    disabled={!treeData?.treeType && !grassData?.grassType}
                  >
                    Final Report
                  </Button>
                </div>
              </div>
            </div>

            {/* Offset Calculation Sidebar */}
            <div className="xl:col-span-1">
              <div className="sticky top-24">
                <OffsetCalculationSidebar 
                  treeData={treeData}
                  grassData={grassData}
                />
              </div>
            </div>
          </div>

          {/* Planning Guidelines */}
          <div className="mt-8 bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="BookOpen" size={16} className="text-accent" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Planning Guidelines & Best Practices
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Icon name="TreePine" size={16} className="text-success" />
                  <h4 className="text-sm font-body font-medium text-foreground">Tree Selection</h4>
                </div>
                <ul className="space-y-1 text-sm font-caption text-muted-foreground">
                  <li>• Choose native species for better survival rates</li>
                  <li>• Consider soil conditions and climate factors</li>
                  <li>• Plan for 15-20% mortality in first year</li>
                  <li>• Mix fast and slow-growing species</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Wheat" size={16} className="text-success" />
                  <h4 className="text-sm font-body font-medium text-foreground">Grass Coverage</h4>
                </div>
                <ul className="space-y-1 text-sm font-caption text-muted-foreground">
                  <li>• Establish grass before tree plantation</li>
                  <li>• Use erosion-control species on slopes</li>
                  <li>• Plan seeding during optimal seasons</li>
                  <li>• Consider maintenance accessibility</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} className="text-primary" />
                  <h4 className="text-sm font-body font-medium text-foreground">Timeline Planning</h4>
                </div>
                <ul className="space-y-1 text-sm font-caption text-muted-foreground">
                  <li>• Start grass seeding in pre-monsoon</li>
                  <li>• Plant trees during monsoon season</li>
                  <li>• Schedule maintenance every 3 months</li>
                  <li>• Monitor progress quarterly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AfforestationPlanner;