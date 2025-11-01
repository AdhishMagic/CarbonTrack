import React, { useEffect, useMemo, useState } from 'react';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import UploadPanel from './components/UploadPanel';
import ColumnMapper from './components/ColumnMapper';
import CalculateStep from './components/CalculateStep';
import PlanStep from './components/PlanStep';
import AnalyzeStep from './components/AnalyzeStep';
import ReportStep from './components/ReportStep';
import { DataWorkbenchProvider, useDataWorkbench } from './context';

// Processing view: shows loading for Calculate -> Plan -> Analyze, then jumps to Report
const ProcessingView = ({ stage, progress }) => {
  const items = [
    { label: 'Calculate', desc: 'Estimating emissions from your data' },
    { label: 'Plan', desc: 'Deriving offset plan based on results' },
    { label: 'Analyze', desc: 'Building charts and insights' },
  ];
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">Processing your dataset</h3>
        {/* Progress bar */}
        <div className="mt-3 h-2 w-full bg-muted rounded">
          <div
            className="h-2 bg-accent rounded transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      </div>
      <div className="space-y-3">
        {items.map((it, idx) => {
          const active = idx === stage;
          const done = idx < stage;
          return (
            <div key={it.label} className="flex items-start gap-3 p-3 rounded-md bg-muted">
              <div className="mt-0.5">
                {done ? (
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-success text-success-foreground">✓</span>
                ) : active ? (
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <svg className="h-3 w-3 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  </span>
                ) : (
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted text-muted-foreground">•</span>
                )}
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{it.label}</div>
                <div className="text-xs font-caption text-muted-foreground">{it.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const InnerPage = () => {
  const [step, setStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStage, setProcessStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const { dataset, mappings, emissionFactors, setResults, setDataset, setMappings } = useDataWorkbench();

  const canProceed = (target) => {
    // simple guardrail for navigation
    if (target <= 1) return true; // Upload/Map always accessible
    const hasData = dataset.rows.length > 0;
    const hasMapping = mappings.quantity && mappings.fuelType;
    if (target >= 2 && !hasData) return false;
    if (target >= 2 && !hasMapping) return false;
    return true;
  };

  // Kick off processing pipeline: Calculate -> Plan -> Analyze -> Report (frontend-only)
  const startPipeline = () => {
    setIsProcessing(true);
    setProcessStage(0);
    setProgress(5);
    const durations = [900, 1100, 900]; // ms for Calculate, Plan, Analyze
    // Stage 1: Calculate (compute summary)
    setTimeout(() => {
      try {
        const qtyCol = mappings.quantity;
        const fuelCol = mappings.fuelType;
        let total = 0; const byFuel = {}; let rowsCounted = 0;
        if (qtyCol && fuelCol) {
          for (const row of dataset.rows) {
            const qty = parseFloat(row?.[qtyCol]);
            if (!isFinite(qty)) continue;
            const key = String(row?.[fuelCol] || '').toLowerCase().replace(/\s+/g, '-');
            const ef = Number(emissionFactors[key] ?? 1);
            const tonnes = (qty * ef) / 1000; total += tonnes; rowsCounted++;
            byFuel[key] = (byFuel[key] || 0) + tonnes;
          }
        }
        setResults(prev => ({ ...prev, totalEmissionTonnes: total, summaries: { ...prev.summaries, byFuel } }));
      } catch {}
      setProcessStage(1);
      setProgress(40);
      // Stage 2: Plan (derived in UI later)
      setTimeout(() => {
        setProcessStage(2);
        setProgress(75);
        // Stage 3: Analyze (charts use dataset later)
        setTimeout(() => {
          setProgress(100);
          setIsProcessing(false);
          setStep(5); // jump to Report
        }, durations[2]);
      }, durations[1]);
    }, durations[0]);
  };

  const goToMap = () => setStep(1);
  const resetWorkbench = () => {
    setDataset({ rows: [], columns: [], sample: [] });
    setMappings({ activityType: '', fuelType: '', quantity: '', unit: '', date: '', groupBy: '' });
    setResults({ totalEmissionTonnes: 0, summaries: {} });
    setIsProcessing(false);
    setProcessStage(0);
    setProgress(0);
    setStep(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <ProgressIndicator />

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-heading font-semibold text-foreground">Data Workbench</h1>
              <p className="text-sm font-body text-muted-foreground">Upload, map, calculate, plan, analyze, and report—end to end.</p>
            </div>
            {/* Stepper hidden to meet requirement: no buttons for steps */}
          </div>

          <div className="space-y-6">
            {step === 0 && <UploadPanel onContinue={startPipeline} />}
            {isProcessing && (
              <>
                <div className="text-xs font-caption text-muted-foreground">
                  Mappings inferred automatically.
                  {' '}
                  <button onClick={goToMap} className="underline text-accent hover:opacity-80">
                    Review in Map
                  </button>
                  {' '}— processing continues in the background.
                </div>
                <ProcessingView stage={processStage} progress={progress} />
              </>
            )}
            {step === 1 && <ColumnMapper />}
            {/* Hide intermediate steps per requirement; final report shown after processing */}
            {step === 5 && <ReportStep onRestart={resetWorkbench} />}
          </div>
        </div>
      </main>
    </div>
  );
};

const DataWorkbenchPage = () => (
  <DataWorkbenchProvider>
    <InnerPage />
  </DataWorkbenchProvider>
);

export default DataWorkbenchPage;
