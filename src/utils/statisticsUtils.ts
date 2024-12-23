import { ProductionEntry } from '../types/Production';
import { getWeekNumber } from './dateUtils';

export const calculatePeriodTotals = (productions: ProductionEntry[]) => {
  return productions.reduce((acc, production) => ({
    boxes: acc.boxes + production.totals.boxes,
    batches: acc.batches + production.totals.batches,
    ingredients: {
      flour: {
        total: acc.ingredients.flour.total + production.totals.ingredients.flour.total,
        byType: Object.entries(production.totals.ingredients.flour.byType).reduce((types, [type, amount]) => ({
          ...types,
          [type]: (types[type] || 0) + amount
        }), acc.ingredients.flour.byType)
      },
      eggs: acc.ingredients.eggs + production.totals.ingredients.eggs,
      sugar: acc.ingredients.sugar + production.totals.ingredients.sugar,
      salt: acc.ingredients.salt + production.totals.ingredients.salt,
      yeast: acc.ingredients.yeast + production.totals.ingredients.yeast,
      margarine: acc.ingredients.margarine + production.totals.ingredients.margarine,
      e202: acc.ingredients.e202 + production.totals.ingredients.e202,
      oil: acc.ingredients.oil + production.totals.ingredients.oil,
    }
  }), {
    boxes: 0,
    batches: 0,
    ingredients: {
      flour: { total: 0, byType: {} },
      eggs: 0,
      sugar: 0,
      salt: 0,
      yeast: 0,
      margarine: 0,
      e202: 0,
      oil: 0,
    }
  });
};

export const groupProductionsByWeek = (productions: ProductionEntry[]) => {
  const weeks: Record<string, ProductionEntry[]> = {};
  
  productions.forEach(production => {
    const date = new Date(production.date);
    const weekKey = `${date.getFullYear()}-W${getWeekNumber(date)}`;
    
    if (!weeks[weekKey]) {
      weeks[weekKey] = [];
    }
    weeks[weekKey].push(production);
  });
  
  return weeks;
};

export const groupProductionsByMonth = (productions: ProductionEntry[]) => {
  const months: Record<string, ProductionEntry[]> = {};
  
  productions.forEach(production => {
    const date = new Date(production.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
    
    if (!months[monthKey]) {
      months[monthKey] = [];
    }
    months[monthKey].push(production);
  });
  
  return months;
};