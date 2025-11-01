import React, { createContext, useContext, useMemo, useState } from 'react';

const DataContext = createContext(null);

export function useDataWorkbench() {
  return useContext(DataContext);
}

export function DataWorkbenchProvider({ children }) {
  const [dataset, setDataset] = useState({ rows: [], columns: [], sample: [] });
  const [mappings, setMappings] = useState({
    activityType: '',
    fuelType: '',
    quantity: '',
    unit: '',
    date: '',
    groupBy: '',
  });
  const [results, setResults] = useState({ totalEmissionTonnes: 0, summaries: {} });
  // Default emission factors (kg CO2 per unit)
  const [emissionFactors, setEmissionFactors] = useState({
    diesel: 2.68,
    electricity: 0.82,
    coal: 2.42,
    petrol: 2.31,
    'natural-gas': 1.96,
  });

  const value = useMemo(
    () => ({
      dataset,
      setDataset,
      mappings,
      setMappings,
      results,
      setResults,
      emissionFactors,
      setEmissionFactors,
    }),
    [dataset, mappings, results, emissionFactors]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
