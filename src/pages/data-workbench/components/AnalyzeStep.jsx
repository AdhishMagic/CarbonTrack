import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import Icon from '../../../components/AppIcon';
import { useDataWorkbench } from '../context';

const AnalyzeStep = () => {
  const { dataset, mappings } = useDataWorkbench();

  const chartData = useMemo(() => {
    const groupCol = mappings.groupBy || mappings.activityType || mappings.fuelType;
    const qtyCol = mappings.quantity;
    if (!groupCol || !qtyCol) return [];

    const map = new Map();
    for (const row of dataset.rows) {
      const g = String(row?.[groupCol] ?? 'Unknown');
      const q = parseFloat(row?.[qtyCol]);
      if (!isFinite(q)) continue;
      map.set(g, (map.get(g) || 0) + q);
    }
    return Array.from(map, ([name, value]) => ({ name, value }));
  }, [dataset.rows, mappings.groupBy, mappings.activityType, mappings.fuelType, mappings.quantity]);

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="BarChart3" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">Analyze</h3>
          <p className="text-sm font-body text-muted-foreground">Grouped totals based on your selection</p>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis dataKey="name" tick={{ fill: 'currentColor' }} />
            <YAxis tick={{ fill: 'currentColor' }} />
            <Tooltip contentStyle={{ background: 'var(--color-popover)', color: 'var(--color-popover-foreground)', border: '1px solid var(--color-border)' }} />
            <Bar dataKey="value" fill="var(--color-accent)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyzeStep;
