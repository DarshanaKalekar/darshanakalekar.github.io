import React, { useMemo } from 'react';
import { useAppSelector } from '../hooks/redux';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import { useAppDispatch } from '../hooks/redux';
import { setSelectedCategory } from '../store/slices/recipesSlice';
import { themeClasses } from '../lib/utils';

const RecipeList = () => {
  const dispatch = useAppDispatch();
  const { recipes, searchTerm, selectedCategory, isDarkMode } = useAppSelector((state) => ({
    ...state.recipes,
    isDarkMode: state.theme.isDarkMode,
  }));

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(recipes.map(recipe => recipe.category)));
    return ['All', ...uniqueCategories];
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    let filtered = recipes;

    if (searchTerm) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(recipe => recipe.category === selectedCategory);
    }

    return filtered;
  }, [recipes, searchTerm, selectedCategory]);

  return (
    <div>
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-4 ${themeClasses.text(isDarkMode)}`}>
          Recipe Collection
        </h1>
        <p className={`text-lg ${themeClasses.textSecondary(isDarkMode)}`}>
          Discover and create amazing dishes with our curated recipe collection
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => dispatch(setSelectedCategory(category === 'All' ? '' : category))}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                (category === 'All' && !selectedCategory) || category === selectedCategory
                  ? 'bg-orange-500 text-white'
                  : isDarkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Grid */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className={`text-center py-12 ${themeClasses.textMuted(isDarkMode)}`}>
          <p className="text-xl mb-2">No recipes found</p>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default RecipeList;
