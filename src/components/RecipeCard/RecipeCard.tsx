import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Recipe } from '../../store/slices/recipesSlice';
import { useAppSelector } from '../../hooks/redux';
import { themeClasses } from '../../lib/utils';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { isDarkMode } = useAppSelector((state) => state.theme);

  return (
    <Link to={`/recipe/${recipe.id}`} className="group block">
      <div className={`rounded-xl overflow-hidden shadow-lg ${themeClasses.bg(isDarkMode)} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <span className="bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
              {recipe.category}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className={`text-xl font-semibold mb-2 group-hover:text-orange-500 transition-colors ${themeClasses.text(isDarkMode)}`}>
            {recipe.title}
          </h3>
          
          <p className={`text-sm mb-4 line-clamp-2 ${themeClasses.textSecondary(isDarkMode)}`}>
            {recipe.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Clock className={`w-4 h-4 ${themeClasses.textMuted(isDarkMode)}`} />
              <span className={`text-sm ${themeClasses.textMuted(isDarkMode)}`}>
                {recipe.cookTime} min
              </span>
            </div>
            
            <span className={`text-sm ${themeClasses.textMuted(isDarkMode)}`}>
              {recipe.ingredients.length} ingredients
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
