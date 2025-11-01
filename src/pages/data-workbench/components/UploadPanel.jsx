import React, { useMemo, useRef, useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { parseFile } from '../utils/parseFile';
import { useDataWorkbench } from '../context';

function guessMappings(columns = []) {
  const cols = columns.map(c => ({ raw: c, key: String(c).toLowerCase() }));
  const find = (cands) => cols.find(c => cands.some(k => c.key.includes(k)))?.raw || '';
  return {
    activityType: find(['activity', 'operation', 'process', 'type']),
    fuelType: find(['fuel', 'energy', 'source']),
    quantity: find(['quantity', 'qty', 'amount', 'usage', 'consumption', 'value']),
    unit: find(['unit', 'units', 'uom', 'measure']),
    date: find(['date', 'timestamp', 'time']),
    groupBy: find(['group', 'category', 'type', 'activity', 'fuel']),
  };
}

const UploadPanel = ({ onContinue }) => {
  const { dataset, setDataset, setMappings } = useDataWorkbench();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    setError('');
    setLoading(true);
    try {
      const parsed = await parseFile(file);
      setDataset(parsed);
      // Auto-map columns (frontend heuristic)
  const inferred = guessMappings(parsed.columns);
  setMappings(prev => ({ ...prev, ...inferred }));
  setSelected(file);
  // Frontend-only pipeline: trigger processing flow (no step buttons)
  onContinue?.();
    } catch (e) {
      setError(e?.message || 'Failed to parse file');
    } finally {
      setLoading(false);
    }
  };

  const onFileChange = (e) => handleFile(e.target.files?.[0]);
  const pickFile = () => inputRef.current?.click();
  const fileMeta = useMemo(() => {
    if (!selected) return '';
    const kb = Math.round((selected.size || 0) / 102.4) / 10; // one decimal
    return `${selected.name} • ${kb} KB`;
  }, [selected]);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="FileUp" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">Upload Dataset</h3>
          <p className="text-sm font-body text-muted-foreground">CSV or Excel (.csv, .xlsx, .xls)</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <input
          ref={inputRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={onFileChange}
          className="sr-only"
        />
        <Button variant="outline" onClick={pickFile} iconName="Upload" iconPosition="left">
          Choose File
        </Button>
        {fileMeta && (
          <div className="text-sm font-caption text-muted-foreground truncate max-w-[50ch]" title={fileMeta}>{fileMeta}</div>
        )}
        {loading && <span className="text-sm text-muted-foreground">Parsing…</span>}
      </div>
      {error && <div className="mt-3 p-2 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive">{error}</div>}

      {dataset?.rows?.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-caption text-muted-foreground mb-2">Preview (first 5 rows)</h4>
          <div className="overflow-auto border border-border rounded-md">
            <table className="min-w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  {dataset?.columns?.map((col) => (
                    <th key={col} className="px-3 py-2 text-left font-medium text-foreground border-b border-border">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataset?.sample?.map((row, i) => (
                  <tr key={i} className="even:bg-muted/50">
                    {dataset?.columns?.map((col) => (
                      <td key={col} className="px-3 py-2 border-b border-border text-foreground/90">{String(row?.[col] ?? '')}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPanel;
