import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users } from 'lucide-react';
import { useAppSelector } from '../hooks/redux';
import Timer from '../components/Timer/Timer';
import { themeClasses } from '../lib/utils';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { recipes, isDarkMode } = useAppSelector((state) => ({
    recipes: state.recipes.recipes,
    isDarkMode: state.theme.isDarkMode,
  }));

  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return (
      <div className={`text-center py-12 ${themeClasses.textMuted(isDarkMode)}`}>
        <p className="text-xl">Recipe not found</p>
        <Link to="/" className="text-orange-500 hover:text-orange-600 mt-4 inline-block">
          Return to recipes
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/"
          className={`inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 mb-4 transition-colors`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to recipes</span>
        </Link>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-64 lg:h-80 object-cover rounded-xl shadow-lg"
            />
          </div>
          
          <div>
            <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
              {recipe.category}
            </span>
            
            <h1 className={`text-3xl lg:text-4xl font-bold mb-4 ${themeClasses.text(isDarkMode)}`}>
              {recipe.title}
            </h1>
            
            <p className={`text-lg mb-6 ${themeClasses.textSecondary(isDarkMode)}`}>
              {recipe.description}
            </p>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Clock className={`w-5 h-5 ${themeClasses.textMuted(isDarkMode)}`} />
                <span className={themeClasses.textSecondary(isDarkMode)}>
                  {recipe.cookTime} minutes
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Users className={`w-5 h-5 ${themeClasses.textMuted(isDarkMode)}`} />
                <span className={themeClasses.textSecondary(isDarkMode)}>
                  4 servings
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Ingredients */}
        <div className="lg:col-span-1">
          <div className={`rounded-xl p-6 ${themeClasses.bg(isDarkMode)} shadow-lg`}>
            <h2 className={`text-xl font-semibold mb-4 ${themeClasses.text(isDarkMode)}`}>
              Ingredients
            </h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className={themeClasses.textSecondary(isDarkMode)}>
                    {ingredient}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions */}
        <div className="lg:col-span-2">
          <div className={`rounded-xl p-6 ${themeClasses.bg(isDarkMode)} shadow-lg`}>
            <h2 className={`text-xl font-semibold mb-6 ${themeClasses.text(isDarkMode)}`}>
              Instructions
            </h2>
            
            <div className="space-y-6">
              {recipe.steps.map((step, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <p className={`mb-3 ${themeClasses.textSecondary(isDarkMode)}`}>
                      {step}
                    </p>
                    <Timer stepNumber={index + 1} stepText={step} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
