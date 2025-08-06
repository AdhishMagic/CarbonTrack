import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TreePlantationForm = ({ onDataChange, data }) => {
  const [formData, setFormData] = useState({
    treeType: data?.treeType || '',
    quantity: data?.quantity || '',
    region: data?.region || '',
    plantingDensity: data?.plantingDensity || '',
    survivalRate: data?.survivalRate || 85,
    ...data
  });

  const treeSpeciesOptions = [
    { value: 'neem', label: 'Neem (Azadirachta indica)', description: 'Fast growing, drought resistant' },
    { value: 'banyan', label: 'Banyan (Ficus benghalensis)', description: 'Large canopy, high CO₂ absorption' },
    { value: 'teak', label: 'Teak (Tectona grandis)', description: 'Premium hardwood, long lifespan' },
    { value: 'peepal', label: 'Peepal (Ficus religiosa)', description: 'Sacred tree, excellent air purifier' },
    { value: 'mango', label: 'Mango (Mangifera indica)', description: 'Fruit bearing, community benefit' },
    { value: 'sal', label: 'Sal (Shorea robusta)', description: 'Native to coal regions, hardy' },
    { value: 'mahua', label: 'Mahua (Madhuca longifolia)', description: 'Tribal importance, oil seeds' },
    { value: 'bamboo', label: 'Bamboo (Bambusa species)', description: 'Rapid growth, soil stabilization' }
  ];

  const regionOptions = [
    { value: 'jharia', label: 'Jharia Coalfield (Jharkhand)', description: 'High rehabilitation priority' },
    { value: 'raniganj', label: 'Raniganj Coalfield (West Bengal)', description: 'Eastern coal belt' },
    { value: 'korba', label: 'Korba Coalfield (Chhattisgarh)', description: 'Central India mining region' },
    { value: 'singrauli', label: 'Singrauli Coalfield (MP/UP)', description: 'Major thermal power hub' },
    { value: 'talcher', label: 'Talcher Coalfield (Odisha)', description: 'Coastal mining region' },
    { value: 'wardha', label: 'Wardha Valley (Maharashtra)', description: 'Western coal belt' },
    { value: 'godavari', label: 'Godavari Valley (Telangana)', description: 'Southern coalfield' },
    { value: 'north-karanpura', label: 'North Karanpura (Jharkhand)', description: 'Coking coal region' }
  ];

  const densityOptions = [
    { value: '1100', label: '1,100 trees/hectare', description: 'Standard forestry density' },
    { value: '1600', label: '1,600 trees/hectare', description: 'Dense plantation' },
    { value: '800', label: '800 trees/hectare', description: 'Sparse for large species' },
    { value: '2500', label: '2,500 trees/hectare', description: 'Intensive bamboo plantation' }
  ];

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onDataChange(updatedData);
  };

  const calculateProjectedSurvival = () => {
    const quantity = parseInt(formData?.quantity) || 0;
    const survivalRate = parseFloat(formData?.survivalRate) || 85;
    return Math.round(quantity * (survivalRate / 100));
  };

  const calculateLandRequirement = () => {
    const quantity = parseInt(formData?.quantity) || 0;
    const density = parseInt(formData?.plantingDensity) || 1100;
    return (quantity / density)?.toFixed(2);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 pb-4 border-b border-border">
        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
          <Icon name="TreePine" size={20} className="text-success" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">Tree Plantation Planning</h3>
          <p className="text-sm font-caption text-muted-foreground">Design native tree plantation strategy for carbon offset</p>
        </div>
      </div>
      {/* Species Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Select
          label="Tree Species"
          description="Select native species suitable for mining rehabilitation"
          options={treeSpeciesOptions}
          value={formData?.treeType}
          onChange={(value) => handleInputChange('treeType', value)}
          searchable
          required
          className="col-span-1"
        />

        <Select
          label="Mining Region"
          description="Choose the coal mining region for plantation"
          options={regionOptions}
          value={formData?.region}
          onChange={(value) => handleInputChange('region', value)}
          searchable
          required
          className="col-span-1"
        />
      </div>
      {/* Quantity and Density */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Input
          label="Number of Trees"
          type="number"
          placeholder="Enter tree quantity"
          description="Total number of trees to be planted"
          value={formData?.quantity}
          onChange={(e) => handleInputChange('quantity', e?.target?.value)}
          min="1"
          required
          className="col-span-1"
        />

        <Select
          label="Planting Density"
          description="Trees per hectare based on species requirements"
          options={densityOptions}
          value={formData?.plantingDensity}
          onChange={(value) => handleInputChange('plantingDensity', value)}
          required
          className="col-span-1"
        />
      </div>
      {/* Survival Rate Slider */}
      <div className="space-y-3">
        <label className="block text-sm font-body font-medium text-foreground">
          Expected Survival Rate
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="60"
            max="95"
            value={formData?.survivalRate}
            onChange={(e) => handleInputChange('survivalRate', e?.target?.value)}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs font-caption text-muted-foreground">
            <span>60%</span>
            <span className="font-medium text-foreground">{formData?.survivalRate}%</span>
            <span>95%</span>
          </div>
        </div>
        <p className="text-sm font-caption text-muted-foreground">
          Adjust based on regional climate and maintenance capacity
        </p>
      </div>
      {/* Calculations Summary */}
      {formData?.quantity && formData?.plantingDensity && (
        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
          <h4 className="text-sm font-body font-medium text-foreground flex items-center space-x-2">
            <Icon name="Calculator" size={16} className="text-primary" />
            <span>Plantation Calculations</span>
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-lg font-heading font-semibold text-success">
                {calculateProjectedSurvival()?.toLocaleString('en-IN')}
              </p>
              <p className="text-xs font-caption text-muted-foreground">Projected Survivors</p>
            </div>
            
            <div className="text-center">
              <p className="text-lg font-heading font-semibold text-primary">
                {calculateLandRequirement()} ha
              </p>
              <p className="text-xs font-caption text-muted-foreground">Land Required</p>
            </div>
            
            <div className="text-center">
              <p className="text-lg font-heading font-semibold text-accent">
                {(calculateProjectedSurvival() * 0.025)?.toFixed(1)} t
              </p>
              <p className="text-xs font-caption text-muted-foreground">CO₂/year (est.)</p>
            </div>
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          variant="outline"
          iconName="MapPin"
          iconPosition="left"
          className="flex-1"
        >
          View Site Map
        </Button>
        
        <Button
          variant="secondary"
          iconName="Calendar"
          iconPosition="left"
          className="flex-1"
        >
          Schedule Planting
        </Button>
        
        <Button
          variant="default"
          iconName="Download"
          iconPosition="left"
          className="flex-1"
          disabled={!formData?.treeType || !formData?.quantity}
        >
          Generate Plan
        </Button>
      </div>
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default TreePlantationForm;