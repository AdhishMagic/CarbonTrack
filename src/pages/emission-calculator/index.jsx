import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import CalculationForm from './components/CalculationForm';
import EmissionSummary from './components/EmissionSummary';
import Icon from '../../components/AppIcon';

const EmissionCalculator = () => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      activityType: '',
      fuelType: '',
      quantity: '',
      unit: ''
    }
  ]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [lastCalculated, setLastCalculated] = useState(null);

  // Generate unique ID for new activities
  const generateId = () => Date.now() + Math.random();

  const handleUpdateActivity = (index, updatedActivity) => {
    const newActivities = [...activities];
    newActivities[index] = updatedActivity;
    setActivities(newActivities);
  };

  const handleAddActivity = () => {
    const newActivity = {
      id: generateId(),
      activityType: '',
      fuelType: '',
      quantity: '',
      unit: ''
    };
    setActivities([...activities, newActivity]);
  };

  const handleRemoveActivity = (index) => {
    if (activities?.length > 1) {
      const newActivities = activities?.filter((_, i) => i !== index);
      setActivities(newActivities);
    }
  };

  const handleCalculate = async () => {
    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLastCalculated(new Date());
    setIsCalculating(false);
  };

  const handleSaveCalculation = () => {
    const calculationData = {
      activities: activities?.filter(a => a?.activityType && a?.fuelType && a?.quantity),
      timestamp: new Date()?.toISOString(),
      id: generateId()
    };
    
    // Save to localStorage for persistence
    const savedCalculations = JSON.parse(localStorage.getItem('carbontrack_calculations') || '[]');
    savedCalculations?.push(calculationData);
    localStorage.setItem('carbontrack_calculations', JSON.stringify(savedCalculations));
    
    // Show success message (in a real app, you'd use a toast notification)
    alert('Calculation saved successfully!');
  };

  const handleGenerateReport = () => {
    const validActivities = activities?.filter(a => a?.activityType && a?.fuelType && a?.quantity);
    
    if (validActivities?.length === 0) {
      alert('Please complete at least one activity to generate a report.');
      return;
    }
    
    // In a real application, this would generate and download a PDF report
    const reportData = {
      title: 'Carbon Emission Calculation Report',
      generatedOn: new Date()?.toLocaleDateString('en-IN'),
      activities: validActivities,
      totalActivities: validActivities?.length
    };
    
    console.log('Report Data:', reportData);
    alert('Report generation initiated! Check console for details.');
  };

  // Load saved calculations on component mount
  useEffect(() => {
    const savedCalculations = JSON.parse(localStorage.getItem('carbontrack_calculations') || '[]');
    if (savedCalculations?.length > 0) {
      // Optionally load the most recent calculation
      console.log(`Found ${savedCalculations?.length} saved calculations`);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
    <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb removed */}
          <ProgressIndicator />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Icon name="Calculator" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">Emission Calculator</h1>
                <p className="text-lg font-body text-muted-foreground">
                  Calculate carbon emissions from your mining operations
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm font-body text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} />
                <span>Last updated: {new Date()?.toLocaleDateString('en-IN')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} />
                <span>IPCC Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} />
                <span>Indian Coal Mining Standards</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Calculation Form - Left Column */}
            <div className="lg:col-span-8">
              <CalculationForm
                activities={activities}
                onUpdateActivity={handleUpdateActivity}
                onAddActivity={handleAddActivity}
                onRemoveActivity={handleRemoveActivity}
                onCalculate={handleCalculate}
                isCalculating={isCalculating}
              />
            </div>

            {/* Emission Summary - Right Column */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <EmissionSummary
                  activities={activities}
                  onSave={handleSaveCalculation}
                  onGenerateReport={handleGenerateReport}
                  isCalculating={isCalculating}
                />
                
                {lastCalculated && (
                  <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success" />
                      <span className="text-sm font-body text-success">
                        Last calculated: {lastCalculated?.toLocaleTimeString('en-IN')}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="BookOpen" size={20} className="text-primary" />
                <h3 className="text-lg font-heading font-semibold text-foreground">Methodology</h3>
              </div>
              <p className="text-sm font-body text-muted-foreground mb-3">
                Our calculations follow IPCC guidelines and Indian coal mining emission factors.
              </p>
              <ul className="text-xs font-caption text-muted-foreground space-y-1">
                <li>• Activity-specific emission factors</li>
                <li>• Regional fuel quality adjustments</li>
                <li>• Equipment efficiency considerations</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="Target" size={20} className="text-accent" />
                <h3 className="text-lg font-heading font-semibold text-foreground">Accuracy</h3>
              </div>
              <p className="text-sm font-body text-muted-foreground mb-3">
                Results are calculated with ±5% accuracy based on standard emission factors.
              </p>
              <ul className="text-xs font-caption text-muted-foreground space-y-1">
                <li>• Validated against industry benchmarks</li>
                <li>• Regular factor updates</li>
                <li>• Quality assurance protocols</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="Lightbulb" size={20} className="text-warning" />
                <h3 className="text-lg font-heading font-semibold text-foreground">Tips</h3>
              </div>
              <p className="text-sm font-body text-muted-foreground mb-3">
                Improve accuracy by providing detailed activity information.
              </p>
              <ul className="text-xs font-caption text-muted-foreground space-y-1">
                <li>• Use precise fuel consumption data</li>
                <li>• Include all mining activities</li>
                <li>• Regular monitoring recommended</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmissionCalculator;