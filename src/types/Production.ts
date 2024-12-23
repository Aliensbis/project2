export interface ProductionEntry {
  id: string;
  date: string;
  note?: string;
  quantities: Record<string, {
    boxes: number;
    batches: number;
  }>;
  totals: {
    boxes: number;
    batches: number;
    ingredients: {
      flour: {
        total: number;
        byType: Record<string, number>;
      };
      eggs: number;
      sugar: number;
      salt: number;
      yeast: number;
      margarine: number;
      e202: number;
      oil: number;
    };
  };
}