import React, { useState } from 'react';
import { Book } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/Auth/LoginForm';
import RecipeCard from '../components/Recipes/RecipeCard';
import RecipeDetail from '../components/Recipes/RecipeDetail';
import { recipes } from '../data/recipes';
import { Recipe } from '../types/Recipe';

export default function RecipesPage() {
  const { isAuthenticated, login } = useAuth();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Recipe['category'] | 'all'>('all');

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />;
  }

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center mb-8">
          <Book className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">Ricette</h1>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Cerca ricetta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as Recipe['category'] | 'all')}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tutte le categorie</option>
            <option value="babà">Babà</option>
            <option value="savarè">Savarè</option>
            <option value="bignè">Bignè</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
            />
          ))}
        </div>

        {selectedRecipe && (
          <RecipeDetail
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
          />
        )}
      </div>
    </div>
  );
}