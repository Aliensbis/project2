export interface DailyProduction {
  date: string;
  totalBoxes: number;
  totalBatches: number;
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
}

export interface ProductionStatistics {
  daily: DailyProduction[];
  weekly: {
    boxes: number[];
    batches: number[];
  };
  monthlyTotals: {
    boxes: number;
    batches: number;
    ingredients: DailyProduction['ingredients'];
  };
}