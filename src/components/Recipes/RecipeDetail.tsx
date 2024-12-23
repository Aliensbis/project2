import React from 'react';
import { Recipe } from '../../types/Recipe';
import { X } from 'lucide-react';

interface RecipeDetailProps {
  recipe: Recipe;
  onClose: () => void;
}

export default function RecipeDetail({ recipe, onClose }: RecipeDetailProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{recipe.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Ingredienti</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p>Farina: {recipe.ingredients.flour.amount}kg ({recipe.ingredients.flour.type})</p>
                  <p>Uova: {recipe.ingredients.eggs}kg</p>
                  <p>Zucchero: {recipe.ingredients.sugar}kg</p>
                  <p>Sale: {recipe.ingredients.salt}kg</p>
                </div>
                <div className="space-y-2">
                  <p>Lievito: {recipe.ingredients.yeast}kg</p>
                  <p>Margarina: {recipe.ingredients.margarine}kg</p>
                  <p>E202: {recipe.ingredients.e202}kg</p>
                  <p>Olio: {recipe.ingredients.oil}kg</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Procedimento</h3>
              <ol className="list-decimal list-inside space-y-2">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="text-gray-700">{step}</li>
                ))}
              </ol>
            </div>

            {recipe.notes && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Note</h3>
                <p className="text-gray-700">{recipe.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}