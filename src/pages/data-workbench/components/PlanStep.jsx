import React, { useMemo, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import { useDataWorkbench } from '../context';

const PlanStep = () => {
  const { results } = useDataWorkbench();
  const [treesPerTonne, setTreesPerTonne] = useState(5);
  const [survivalRate, setSurvivalRate] = useState(80);

  const plan = useMemo(() => {
    const t = results.totalEmissionTonnes || 0;
    const rawTrees = t * treesPerTonne;
    const adjusted = survivalRate > 0 ? Math.ceil(rawTrees / (survivalRate / 100)) : Math.ceil(rawTrees);
    return { rawTrees: Math.ceil(rawTrees), treesNeeded: adjusted };
  }, [results.totalEmissionTonnes, treesPerTonne, survivalRate]);

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="TreePine" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">Plan</h3>
          <p className="text-sm font-body text-muted-foreground">Offset planning based on calculated emissions</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input label="Trees per tonne CO₂" type="number" value={treesPerTonne} onChange={(e)=>setTreesPerTonne(Number(e.target.value)||0)} min={0} />
        <Input label="Survival rate (%)" type="number" value={survivalRate} onChange={(e)=>setSurvivalRate(Number(e.target.value)||0)} min={0} max={100} />
        <div className="p-4 bg-muted rounded-lg">
          <div className="text-sm font-caption text-muted-foreground">Trees Needed</div>
          <div className="text-2xl font-heading font-semibold text-foreground">{plan.treesNeeded}</div>
        </div>
      </div>
    </div>
  );
};

export default PlanStep;
