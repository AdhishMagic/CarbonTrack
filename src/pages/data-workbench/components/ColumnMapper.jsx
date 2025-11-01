import React from 'react';
import Select from '../../../components/ui/Select';
import { useDataWorkbench } from '../context';

const ColumnMapper = () => {
  const { dataset, mappings, setMappings } = useDataWorkbench();
  const options = dataset?.columns?.map(c => ({ value: c, label: c })) || [];

  const set = (field) => (value) => setMappings(prev => ({ ...prev, [field]: value }));

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-heading font-semibold text-foreground">Map Columns</h3>
      <p className="text-sm font-body text-muted-foreground">Select which columns correspond to each field.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Select label="Activity Type" options={options} value={mappings.activityType} onChange={set('activityType')} placeholder="Select column" />
        <Select label="Fuel Type" options={options} value={mappings.fuelType} onChange={set('fuelType')} placeholder="Select column" />
        <Select label="Quantity" options={options} value={mappings.quantity} onChange={set('quantity')} placeholder="Select column" />
        <Select label="Unit" options={options} value={mappings.unit} onChange={set('unit')} placeholder="Select column" />
        <Select label="Date (optional)" options={options} value={mappings.date} onChange={set('date')} placeholder="Select column" />
        <Select label="Group By (for charts)" options={options} value={mappings.groupBy} onChange={set('groupBy')} placeholder="Select column" />
      </div>
    </div>
  );
};

export default ColumnMapper;
