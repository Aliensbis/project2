import { useState, useEffect } from 'react';
import { ProductionEntry } from '../types/Production';

export function useProduction() {
  const [productions, setProductions] = useState<ProductionEntry[]>(() => {
    const stored = localStorage.getItem('production_history');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('production_history', JSON.stringify(productions));
  }, [productions]);

  const addProduction = (production: ProductionEntry) => {
    setProductions(prev => [...prev, production]);
  };

  const clearHistory = () => {
    if (window.confirm('Sei sicuro di voler cancellare tutto lo storico delle produzioni?')) {
      setProductions([]);
    }
  };

  return { productions, addProduction, clearHistory };
}