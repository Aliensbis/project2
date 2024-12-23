import React from 'react';
import { Recipe } from '../../types/Recipe';
import { ChefHat } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

export default function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{recipe.name}</h3>
        <ChefHat className="h-6 w-6 text-blue-500" />
      </div>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          Cartoni per pesata: {recipe.boxesPerBatch}
        </p>
        <p className="text-sm text-gray-600">
          Farina: {recipe.ingredients.flour.amount}kg ({recipe.ingredients.flour.type})
        </p>
        <p className="text-sm text-gray-600">
          Uova: {recipe.ingredients.eggs}kg
        </p>
      </div>
    </div>
  );
}