import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addRecipe } from '../store/slices/recipesSlice';
import { themeClasses } from '../lib/utils';

const AddRecipe = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isDarkMode } = useAppSelector((state) => state.theme);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [''],
    steps: [''],
    category: '',
    cookTime: 30,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop',
  });

  const [ingredientSuggestions] = useState([
    'Salt', 'Black pepper', 'Olive oil', 'Garlic', 'Onion', 'Butter', 'Flour', 'Sugar',
    'Eggs', 'Milk', 'Cheese', 'Tomatoes', 'Chicken breast', 'Ground beef', 'Rice',
    'Pasta', 'Lemon', 'Herbs', 'Spices', 'Vanilla extract'
  ]);

  const categories = ['Italian', 'Mexican', 'Asian', 'American', 'French', 'Indian', 'Mediterranean', 'Dessert', 'Healthy', 'Vegetarian'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, ''],
    });
  };

  const removeIngredient = (index: number) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData({ ...formData, ingredients: newIngredients });
    }
  };

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...formData.steps];
    newSteps[index] = value;
    setFormData({ ...formData, steps: newSteps });
  };

  const addStep = () => {
    setFormData({
      ...formData,
      steps: [...formData.steps, ''],
    });
  };

  const removeStep = (index: number) => {
    if (formData.steps.length > 1) {
      const newSteps = formData.steps.filter((_, i) => i !== index);
      setFormData({ ...formData, steps: newSteps });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const recipeToAdd = {
      ...formData,
      ingredients: formData.ingredients.filter(ingredient => ingredient.trim() !== ''),
      steps: formData.steps.filter(step => step.trim() !== ''),
    };

    dispatch(addRecipe(recipeToAdd));
    navigate('/');
  };

  return (
    <div>
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to recipes</span>
        </Link>
        
        <h1 className={`text-3xl font-bold ${themeClasses.text(isDarkMode)}`}>
          Add New Recipe
        </h1>
        <p className={`text-lg mt-2 ${themeClasses.textSecondary(isDarkMode)}`}>
          Share your culinary creation with the community
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className={`rounded-xl p-6 ${themeClasses.bg(isDarkMode)} shadow-lg`}>
          <h2 className={`text-xl font-semibold mb-6 ${themeClasses.text(isDarkMode)}`}>
            Basic Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${themeClasses.textSecondary(isDarkMode)}`}>
                Recipe Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className={`w-full px-3 py-2 rounded-lg border ${themeClasses.input(isDarkMode)} focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400 focus:ring-opacity-20`}
                placeholder="Enter recipe title"
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${themeClasses.textSecondary(isDarkMode)}`}>
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className={`w-full px-3 py-2 rounded-lg border ${themeClasses.input(isDarkMode)} focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400 focus:ring-opacity-20`}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-6">
            <label className={`block text-sm font-medium mb-2 ${themeClasses.textSecondary(isDarkMode)}`}>
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
              className={`w-full px-3 py-2 rounded-lg border ${themeClasses.input(isDarkMode)} focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400 focus:ring-opacity-20 resize-none`}
              placeholder="Describe your recipe"
            />
          </div>
          
          <div className="mt-6">
            <label className={`block text-sm font-medium mb-2 ${themeClasses.textSecondary(isDarkMode)}`}>
              Cook Time (minutes) *
            </label>
            <input
              type="number"
              name="cookTime"
              value={formData.cookTime}
              onChange={handleInputChange}
              required
              min="1"
              className={`w-full md:w-32 px-3 py-2 rounded-lg border ${themeClasses.input(isDarkMode)} focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400 focus:ring-opacity-20`}
            />
          </div>
        </div>

        {/* Ingredients */}
        <div className={`rounded-xl p-6 ${themeClasses.bg(isDarkMode)} shadow-lg`}>
          <h2 className={`text-xl font-semibold mb-6 ${themeClasses.text(isDarkMode)}`}>
            Ingredients
          </h2>
          
          <div className="space-y-4">
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex space-x-3">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  list={`ingredients-${index}`}
                  className={`flex-1 px-3 py-2 rounded-lg border ${themeClasses.input(isDarkMode)} focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400 focus:ring-opacity-20`}
                  placeholder="Enter ingredient"
                />
                <datalist id={`ingredients-${index}`}>
                  {ingredientSuggestions.map((suggestion) => (
                    <option key={suggestion} value={suggestion} />
                  ))}
                </datalist>
                
                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className={`p-2 rounded-lg ${isDarkMode ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' : 'text-gray-500 hover:text-red-500 hover:bg-gray-100'} transition-colors`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <button
            type="button"
            onClick={addIngredient}
            className="mt-4 inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add ingredient</span>
          </button>
        </div>

        {/* Steps */}
        <div className={`rounded-xl p-6 ${themeClasses.bg(isDarkMode)} shadow-lg`}>
          <h2 className={`text-xl font-semibold mb-6 ${themeClasses.text(isDarkMode)}`}>
            Instructions
          </h2>
          
          <div className="space-y-4">
            {formData.steps.map((step, index) => (
              <div key={index} className="flex space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold text-sm mt-1">
                  {index + 1}
                </div>
                
                <textarea
                  value={step}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  rows={2}
                  className={`flex-1 px-3 py-2 rounded-lg border ${themeClasses.input(isDarkMode)} focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400 focus:ring-opacity-20 resize-none`}
                  placeholder="Describe this step"
                />
                
                {formData.steps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    className={`p-2 rounded-lg ${isDarkMode ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' : 'text-gray-500 hover:text-red-500 hover:bg-gray-100'} transition-colors self-start mt-1`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <button
            type="button"
            onClick={addStep}
            className="mt-4 inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add step</span>
          </button>
        </div>

        {/* Submit */}
        <div className="flex justify-end space-x-4">
          <Link
            to="/"
            className={`px-6 py-3 rounded-lg font-medium ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors`}
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-500 hover:to-red-600 transition-all duration-200"
          >
            Create Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
