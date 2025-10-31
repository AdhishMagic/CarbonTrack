import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const GrassPlantationForm = ({ onDataChange, data }) => {
  const [formData, setFormData] = useState({
    grassType: data?.grassType || '',
    landArea: data?.landArea || '',
    areaUnit: data?.areaUnit || 'hectares',
    region: data?.region || '',
    soilType: data?.soilType || '',
    establishmentRate: data?.establishmentRate || 90,
    ...data
  });

  const grassSpeciesOptions = [
    { value: 'vetiver', label: 'Vetiver Grass (Chrysopogon zizanioides)', description: 'Excellent erosion control, deep roots' },
    { value: 'bermuda', label: 'Bermuda Grass (Cynodon dactylon)', description: 'Hardy, fast establishment' },
    { value: 'napier', label: 'Napier Grass (Pennisetum purpureum)', description: 'High biomass, fodder value' },
    { value: 'guinea', label: 'Guinea Grass (Panicum maximum)', description: 'Drought tolerant, good coverage' },
    { value: 'stylo', label: 'Stylo Legume (Stylosanthes guianensis)', description: 'Nitrogen fixing, soil improvement' },
    { value: 'signal', label: 'Signal Grass (Brachiaria decumbens)', description: 'Rapid spread, low maintenance' },
    { value: 'rhodes', label: 'Rhodes Grass (Chloris gayana)', description: 'Salt tolerant, mining rehabilitation' },
    { value: 'mixed-native', label: 'Mixed Native Grasses', description: 'Local species blend for biodiversity' }
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

  const areaUnitOptions = [
    { value: 'hectares', label: 'Hectares (ha)', description: 'Standard forestry unit' },
    { value: 'acres', label: 'Acres', description: 'Traditional land measurement' },
    { value: 'sqmeters', label: 'Square Meters (m²)', description: 'Metric area unit' }
  ];

  const soilTypeOptions = [
    { value: 'overburden', label: 'Overburden Dumps', description: 'Mining waste material' },
    { value: 'topsoil', label: 'Replaced Topsoil', description: 'Restored mining areas' },
    { value: 'clay', label: 'Clay Soil', description: 'Heavy, water-retaining soil' },
    { value: 'sandy', label: 'Sandy Soil', description: 'Well-draining, loose soil' },
    { value: 'rocky', label: 'Rocky/Stony Soil', description: 'Poor soil with rock fragments' },
    { value: 'saline', label: 'Saline Soil', description: 'Salt-affected mining areas' }
  ];

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onDataChange(updatedData);
  };

  const convertAreaToHectares = () => {
    const area = parseFloat(formData?.landArea) || 0;
    switch (formData?.areaUnit) {
      case 'acres':
        return area * 0.4047;
      case 'sqmeters':
        return area / 10000;
      default:
        return area;
    }
  };

  const calculateCoverageArea = () => {
    const hectares = convertAreaToHectares();
    const establishmentRate = parseFloat(formData?.establishmentRate) || 90;
    return (hectares * (establishmentRate / 100))?.toFixed(2);
  };

  const calculateCarbonSequestration = () => {
    const effectiveArea = parseFloat(calculateCoverageArea()) || 0;
    // Grass carbon sequestration: approximately 2-4 tonnes CO₂/hectare/year
    return (effectiveArea * 3)?.toFixed(1);
  };

  const calculateSeedRequirement = () => {
    const hectares = convertAreaToHectares();
    // Average seed requirement: 15-25 kg/hectare for grass
    return (hectares * 20)?.toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 pb-4 border-b border-border">
        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
          <Icon name="Wheat" size={20} className="text-success" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">Grass Plantation Planning</h3>
          <p className="text-sm font-caption text-muted-foreground">Design grass coverage strategy for rapid soil stabilization</p>
        </div>
      </div>
      {/* Species and Region Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Select
          label="Grass Species"
          description="Select grass type suitable for mining rehabilitation"
          options={grassSpeciesOptions}
          value={formData?.grassType}
          onChange={(value) => handleInputChange('grassType', value)}
          searchable
          required
          className="col-span-1"
        />

        <Select
          label="Mining Region"
          description="Choose the coal mining region for grass plantation"
          options={regionOptions}
          value={formData?.region}
          onChange={(value) => handleInputChange('region', value)}
          searchable
          required
          className="col-span-1"
        />
      </div>
      {/* Land Area Input */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Input
            label="Land Area"
            type="number"
            placeholder="Enter area size"
            description="Total area available for grass plantation"
            value={formData?.landArea}
            onChange={(e) => handleInputChange('landArea', e?.target?.value)}
            min="0.1"
            step="0.1"
            required
          />
        </div>
        
        <Select
          label="Area Unit"
          options={areaUnitOptions}
          value={formData?.areaUnit}
          onChange={(value) => handleInputChange('areaUnit', value)}
          required
        />
      </div>
      {/* Soil Type */}
      <Select
        label="Soil Condition"
        description="Current soil type affects grass species selection and establishment"
        options={soilTypeOptions}
        value={formData?.soilType}
        onChange={(value) => handleInputChange('soilType', value)}
        required
      />
      {/* Establishment Rate Slider */}
      <div className="space-y-3">
        <label className="block text-sm font-body font-medium text-foreground">
          Expected Establishment Rate
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="70"
            max="98"
            value={formData?.establishmentRate}
            onChange={(e) => handleInputChange('establishmentRate', e?.target?.value)}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            aria-label="Expected establishment rate"
            aria-valuemin={70}
            aria-valuemax={98}
            aria-valuenow={Number(formData?.establishmentRate) || 0}
          />
          <div className="flex justify-between text-xs font-caption text-muted-foreground">
            <span>70%</span>
            <span className="font-medium text-foreground">{formData?.establishmentRate}%</span>
            <span>98%</span>
          </div>
        </div>
        <p className="text-sm font-caption text-muted-foreground">
          Grass establishment success rate based on soil conditions and maintenance
        </p>
      </div>
      {/* Calculations Summary */}
      {formData?.landArea && formData?.grassType && (
        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
          <h4 className="text-sm font-body font-medium text-foreground flex items-center space-x-2">
            <Icon name="Calculator" size={16} className="text-primary" />
            <span>Grass Plantation Calculations</span>
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-lg font-heading font-semibold text-success">
                {calculateCoverageArea()} ha
              </p>
              <p className="text-xs font-caption text-muted-foreground">Effective Coverage</p>
            </div>
            
            <div className="text-center">
              <p className="text-lg font-heading font-semibold text-primary">
                {calculateSeedRequirement()} kg
              </p>
              <p className="text-xs font-caption text-muted-foreground">Seed Required</p>
            </div>
            
            <div className="text-center">
              <p className="text-lg font-heading font-semibold text-accent">
                {calculateCarbonSequestration()} t
              </p>
              <p className="text-xs font-caption text-muted-foreground">CO₂/year (est.)</p>
            </div>
            
            <div className="text-center">
              <p className="text-lg font-heading font-semibold text-warning">
                3-6 months
              </p>
              <p className="text-xs font-caption text-muted-foreground">Establishment Time</p>
            </div>
          </div>
        </div>
      )}
      {/* Maintenance Schedule */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="text-sm font-body font-medium text-foreground flex items-center space-x-2 mb-3">
          <Icon name="Calendar" size={16} className="text-primary" />
          <span>Maintenance Schedule</span>
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-caption">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Initial Seeding:</span>
              <span className="text-foreground font-medium">Pre-monsoon</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">First Fertilization:</span>
              <span className="text-foreground font-medium">30 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Weed Control:</span>
              <span className="text-foreground font-medium">45-60 days</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reseeding (if needed):</span>
              <span className="text-foreground font-medium">90 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Full Establishment:</span>
              <span className="text-foreground font-medium">6 months</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Annual Maintenance:</span>
              <span className="text-foreground font-medium">Ongoing</span>
            </div>
          </div>
        </div>
      </div>
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
          iconName="Sprout"
          iconPosition="left"
          className="flex-1"
        >
          Seed Calculator
        </Button>
        
        <Button
          variant="default"
          iconName="Download"
          iconPosition="left"
          className="flex-1"
          disabled={!formData?.grassType || !formData?.landArea}
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

export default GrassPlantationForm;