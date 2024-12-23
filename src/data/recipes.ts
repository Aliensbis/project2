import { Recipe } from '../types/Recipe';

export const recipes: Recipe[] = [
  {
    id: '1',
    name: 'Babà mignon',
    category: 'babà',
    boxesPerBatch: 5,
    ingredients: {
      flour: { amount: 13, type: 'Tipo S' },
      eggs: 7.5,
      sugar: 0.4,
      salt: 0.3,
      yeast: 0.11,
      margarina: 2.9,
      e202: 0.002,
      oil: 0
    },
    instructions: [
      'Mescolare la farina con il lievito',
      'Aggiungere le uova una alla volta',
      'Incorporare lo zucchero e il sale',
      'Aggiungere la margarina ammorbidita',
      'Impastare fino ad ottenere un composto omogeneo',
      'Lasciar lievitare per 2 ore',
      'Formare i babà e disporli negli stampi',
      'Cuocere a 180°C per 20-25 minuti'
    ],
    notes: 'Mantenere la temperatura costante durante la lievitazione'
  },
  // ... Aggiungi qui tutte le altre ricette seguendo lo stesso formato
];