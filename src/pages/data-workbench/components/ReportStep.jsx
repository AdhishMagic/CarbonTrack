import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useDataWorkbench } from '../context';

function downloadJSON(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

const ReportStep = ({ onRestart }) => {
  const { dataset, mappings, results } = useDataWorkbench();

  const onDownload = () => {
    downloadJSON('data-workbench-report.json', { mappings, totalEmissionTonnes: results.totalEmissionTonnes, rows: dataset.rows.length });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="FileText" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">Report</h3>
          <p className="text-sm font-body text-muted-foreground">Summary report ready to export or print</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-muted rounded-lg">
          <div className="text-sm font-caption text-muted-foreground">Total Emissions</div>
          <div className="text-2xl font-heading font-semibold text-foreground">{(results.totalEmissionTonnes||0).toFixed(3)} t CO₂</div>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <div className="text-sm font-caption text-muted-foreground">Rows Processed</div>
          <div className="text-2xl font-heading font-semibold text-foreground">{dataset.rows.length}</div>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <div className="text-sm font-caption text-muted-foreground">Columns</div>
          <div className="text-2xl font-heading font-semibold text-foreground">{dataset.columns.length}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="outline" iconName="Download" onClick={onDownload}>Download JSON</Button>
        <Button variant="ghost" iconName="Printer" onClick={() => window.print()}>Print</Button>
        {/* CTA to upload again */}
        <Button variant="default" iconName="Upload" onClick={onRestart}>Upload another dataset</Button>
      </div>
    </div>
  );
};

export default ReportStep;
