export interface Recipe {
  id: string;
  name: string;
  category: 'babà' | 'savarè' | 'bignè';
  ingredients: {
    flour: { amount: number; type: string; };
    eggs: number;
    sugar: number;
    salt: number;
    yeast: number;
    margarine: number;
    e202: number;
    oil: number;
  };
  instructions: string[];
  notes?: string;
  boxesPerBatch: number;
}