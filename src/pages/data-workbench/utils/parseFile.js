// Utility to parse CSV and Excel files into an array of objects
// Returns { rows: Array<object>, columns: Array<string>, sample: Array<object> }

export async function parseFile(file) {
  const name = file?.name?.toLowerCase() || '';
  const isCSV = name.endsWith('.csv');
  const isXLSX = name.endsWith('.xlsx') || name.endsWith('.xls');

  if (isCSV) {
    const Papa = (await import('papaparse')).default;
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          const rows = results?.data || [];
          const columns = rows.length ? Object.keys(rows[0]) : [];
          resolve({ rows, columns, sample: rows.slice(0, 5) });
        },
        error: (err) => reject(err),
      });
    });
  }

  if (isXLSX) {
    const XLSX = await import('xlsx');
    const data = await file.arrayBuffer();
    const wb = XLSX.read(data, { type: 'array' });
    const firstSheet = wb.SheetNames?.[0];
    const sheet = wb.Sheets?.[firstSheet];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
    const columns = rows.length ? Object.keys(rows[0]) : [];
    return { rows, columns, sample: rows.slice(0, 5) };
  }

  // Fallback: try parse as text CSV
  const text = await file.text();
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (!lines.length) return { rows: [], columns: [], sample: [] };
  const headers = lines[0].split(',');
  const rows = lines.slice(1).map(line => {
    const vals = line.split(',');
    const obj = {};
    headers.forEach((h, i) => obj[h] = vals[i]);
    return obj;
  });
  return { rows, columns: headers, sample: rows.slice(0, 5) };
}
