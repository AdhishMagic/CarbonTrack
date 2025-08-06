import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import ReportTemplateCard from './ReportTemplateCard';

const ReportTemplatesSidebar = ({ onTemplateSelect, selectedTemplate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const reportTemplates = [
    {
      id: 1,
      name: "Monthly Emission Report",
      description: "Comprehensive monthly carbon emission tracking and analysis for coal mining operations",
      authority: "Ministry of Coal",
      frequency: "monthly",
      status: "active",
      lastUsed: "5 days ago",
      category: "ministry_coal"
    },
    {
      id: 2,
      name: "Quarterly Sustainability Statement",
      description: "Quarterly environmental impact assessment and sustainability metrics reporting",
      authority: "State Pollution Control Board",
      frequency: "quarterly",
      status: "active",
      lastUsed: "2 weeks ago",
      category: "pollution_board"
    },
    {
      id: 3,
      name: "Annual Carbon Neutrality Report",
      description: "Comprehensive annual report on carbon neutrality progress and future planning",
      authority: "Central Electricity Authority",
      frequency: "annually",
      status: "draft",
      lastUsed: "1 month ago",
      category: "electricity_authority"
    },
    {
      id: 4,
      name: "Environmental Impact Assessment",
      description: "Detailed environmental impact analysis for new mining projects and expansions",
      authority: "Ministry of Environment",
      frequency: "annually",
      status: "active",
      lastUsed: "3 weeks ago",
      category: "ministry_environment"
    },
    {
      id: 5,
      name: "Afforestation Progress Report",
      description: "Monthly tracking of tree plantation activities and carbon offset achievements",
      authority: "Forest Department",
      frequency: "monthly",
      status: "active",
      lastUsed: "1 week ago",
      category: "forest_dept"
    },
    {
      id: 6,
      name: "Energy Consumption Analysis",
      description: "Detailed analysis of energy usage patterns and efficiency improvements",
      authority: "Central Electricity Authority",
      frequency: "quarterly",
      status: "archived",
      lastUsed: "6 months ago",
      category: "electricity_authority"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates', icon: 'FileText', count: reportTemplates?.length },
    { id: 'ministry_coal', name: 'Ministry of Coal', icon: 'Building', count: reportTemplates?.filter(t => t?.category === 'ministry_coal')?.length },
    { id: 'pollution_board', name: 'Pollution Control Board', icon: 'Shield', count: reportTemplates?.filter(t => t?.category === 'pollution_board')?.length },
    { id: 'electricity_authority', name: 'Electricity Authority', icon: 'Zap', count: reportTemplates?.filter(t => t?.category === 'electricity_authority')?.length },
    { id: 'ministry_environment', name: 'Ministry of Environment', icon: 'Leaf', count: reportTemplates?.filter(t => t?.category === 'ministry_environment')?.length },
    { id: 'forest_dept', name: 'Forest Department', icon: 'TreePine', count: reportTemplates?.filter(t => t?.category === 'forest_dept')?.length }
  ];

  const filteredTemplates = reportTemplates?.filter(template => {
    const matchesSearch = template?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         template?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         template?.authority?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-body font-semibold text-foreground">Report Templates</h2>
          <Button variant="ghost" size="sm" iconName="Plus">
            New
          </Button>
        </div>
        
        {/* Search */}
        <Input
          type="search"
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          className="mb-4"
        />
      </div>
      {/* Categories */}
      <div className="p-4 border-b border-border">
        <h3 className="font-body font-medium text-foreground mb-3 text-sm">Categories</h3>
        <div className="space-y-1">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`w-full flex items-center justify-between p-2 rounded-md text-sm font-body transition-colors duration-150 ${
                selectedCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Icon name={category?.icon} size={14} />
                <span className="truncate">{category?.name}</span>
              </div>
              <span className={`text-xs font-caption px-1.5 py-0.5 rounded-full ${
                selectedCategory === category?.id
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {category?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Templates List */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-body font-medium text-foreground text-sm">
            Templates ({filteredTemplates?.length})
          </h3>
          <Button variant="ghost" size="xs" iconName="Filter">
            Filter
          </Button>
        </div>

        {filteredTemplates?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Search" size={32} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-body text-muted-foreground mb-1">No templates found</p>
            <p className="text-xs font-caption text-muted-foreground">
              Try adjusting your search or category filter
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTemplates?.map((template) => (
              <ReportTemplateCard
                key={template?.id}
                template={template}
                onSelect={onTemplateSelect}
                isSelected={selectedTemplate?.id === template?.id}
              />
            ))}
          </div>
        )}
      </div>
      {/* Footer Actions */}
      <div className="p-4 border-t border-border">
        <div className="space-y-2">
          <Button variant="outline" size="sm" fullWidth iconName="Upload" iconPosition="left">
            Import Template
          </Button>
          <Button variant="ghost" size="sm" fullWidth iconName="Settings" iconPosition="left">
            Manage Templates
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportTemplatesSidebar;