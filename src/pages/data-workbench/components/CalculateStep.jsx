import React, { useEffect, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { useDataWorkbench } from '../context';

function toKey(v) {
  return String(v || '').toLowerCase().replace(/\s+/g, '-');
}

function round(value, digits = 3) {
  const p = Math.pow(10, digits);
  return Math.round((value + Number.EPSILON) * p) / p;
}

const CalculateStep = () => {
  const { dataset, mappings, results, setResults, emissionFactors, setEmissionFactors } = useDataWorkbench();

  // Compute emissions with editable factors (kg CO2 per mapped "unit")
  const computed = useMemo(() => {
    const qtyCol = mappings.quantity;
    const fuelCol = mappings.fuelType;
    if (!qtyCol || !fuelCol) return { totalEmissionTonnes: 0, byFuel: {}, rowsCounted: 0 };

    let total = 0;
    const byFuel = {};
    let rowsCounted = 0;

    for (const row of dataset.rows) {
      const qty = parseFloat(row?.[qtyCol]);
      if (!isFinite(qty)) continue;
      const fuelKey = toKey(row?.[fuelCol]);
      const ef = Number(emissionFactors[fuelKey] ?? 1); // kg CO2 per unit
      const tonnes = (qty * ef) / 1000; // to tonnes
      total += tonnes;
      rowsCounted++;
      byFuel[fuelKey] = (byFuel[fuelKey] || 0) + tonnes;
    }
    return { totalEmissionTonnes: total, byFuel, rowsCounted };
  }, [dataset.rows, mappings.quantity, mappings.fuelType, emissionFactors]);

  // Persist results into shared context
  useEffect(() => {
    setResults(prev => ({
      ...prev,
      totalEmissionTonnes: computed.totalEmissionTonnes,
      summaries: { ...prev.summaries, byFuel: computed.byFuel },
    }));
  }, [computed, setResults]);

  const total = computed.totalEmissionTonnes || 0;
  const byFuelEntries = Object.entries(computed.byFuel).sort((a, b) => b[1] - a[1]);

  const onFactorChange = (fuelKey) => (e) => {
    const v = Number(e?.target?.value);
    setEmissionFactors((prev) => ({ ...prev, [fuelKey]: isFinite(v) ? v : prev[fuelKey] }));
  };

  const resetFactors = () => {
    setEmissionFactors({
      diesel: 2.68,
      electricity: 0.82,
      coal: 2.42,
      petrol: 2.31,
      'natural-gas': 1.96,
    });
  };

  const downloadJSON = () => {
    const payload = {
      totalEmissionTonnes: round(total),
      byFuel: Object.fromEntries(byFuelEntries.map(([k, v]) => [k, round(v)])),
      rowsCounted: computed.rowsCounted,
      rowsTotal: dataset.rows.length,
      factors: emissionFactors,
      mappings,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'calculate-summary.json'; a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSV = () => {
    const header = 'fuel,tonnes\n';
    const rows = byFuelEntries.map(([k, v]) => `${k},${round(v)}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'calculate-by-fuel.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const hasMappings = mappings.quantity && mappings.fuelType;

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Calculator" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">Calculate</h3>
          <p className="text-sm font-body text-muted-foreground">Estimated emissions from your mapped columns</p>
        </div>
      </div>

      {!hasMappings && (
        <div className="p-3 bg-warning/10 border border-warning/20 rounded-md text-sm text-foreground">
          Please map at least Quantity and Fuel Type columns in the Map step to calculate emissions.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-muted rounded-lg">
          <div className="text-sm font-caption text-muted-foreground">Total Emissions</div>
          <div className="text-2xl font-heading font-semibold text-foreground">{round(total)} t CO₂</div>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <div className="text-sm font-caption text-muted-foreground">Rows Counted</div>
          <div className="text-2xl font-heading font-semibold text-foreground">{computed.rowsCounted}</div>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <div className="text-sm font-caption text-muted-foreground">Rows (Total)</div>
          <div className="text-2xl font-heading font-semibold text-foreground">{dataset.rows.length}</div>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <div className="text-sm font-caption text-muted-foreground">Columns</div>
          <div className="text-2xl font-heading font-semibold text-foreground">{dataset.columns.length}</div>
        </div>
      </div>

      {/* Breakdown by fuel */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-heading font-semibold text-foreground">Breakdown by Fuel</h4>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" iconName="FileDown" onClick={downloadCSV}>Export CSV</Button>
            <Button variant="ghost" size="sm" iconName="Download" onClick={downloadJSON}>Export JSON</Button>
          </div>
        </div>
        <div className="border border-border rounded-md overflow-hidden">
          <div className="grid grid-cols-12 bg-muted px-3 py-2 text-sm font-medium text-foreground">
            <div className="col-span-5">Fuel</div>
            <div className="col-span-4">Share</div>
            <div className="col-span-3 text-right">Tonnes</div>
          </div>
          {byFuelEntries.length === 0 ? (
            <div className="px-3 py-3 text-sm text-muted-foreground">No data to display</div>
          ) : (
            byFuelEntries.map(([fuel, tonnes]) => {
              const pct = total > 0 ? Math.min(100, (tonnes / total) * 100) : 0;
              return (
                <div key={fuel} className="grid grid-cols-12 items-center px-3 py-2 border-t border-border text-sm">
                  <div className="col-span-5 capitalize text-foreground">{fuel || 'unknown'}</div>
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="h-2 w-full bg-muted rounded">
                      <div className="h-2 bg-accent rounded" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-12 text-right text-muted-foreground">{round(pct, 1)}%</span>
                  </div>
                  <div className="col-span-3 text-right text-foreground">{round(tonnes)} t</div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Editable emission factors */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-heading font-semibold text-foreground">Emission Factors (kg CO₂ per unit)</h4>
          <Button variant="ghost" size="sm" iconName="RotateCcw" onClick={resetFactors}>Reset defaults</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.keys(emissionFactors).map((key) => (
            <Input
              key={key}
              type="number"
              step="0.01"
              min="0"
              label={key.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              value={String(emissionFactors[key])}
              onChange={onFactorChange(key)}
            />
          ))}
        </div>
        <p className="text-xs font-caption text-muted-foreground">Tip: Factors are applied as (Quantity × Factor) ÷ 1000 to get tonnes CO₂. Adjust per your methodology.</p>
      </div>
    </div>
  );
};

export default CalculateStep;
