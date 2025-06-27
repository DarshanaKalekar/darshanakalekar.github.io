import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Plus, Moon, Sun } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleTheme } from '../../store/slices/themeSlice';
import { setSearchTerm } from '../../store/slices/recipesSlice';
import { themeClasses } from '../../lib/utils';

const Header = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isDarkMode } = useAppSelector((state) => state.theme);
  const { searchTerm } = useAppSelector((state) => state.recipes);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <header className={`sticky top-0 z-50 border-b ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className={`text-xl font-semibold ${themeClasses.text(isDarkMode)}`}>
              Recipe Manager
            </span>
          </Link>

          {location.pathname === '/' && (
            <div className="flex-1 max-w-md mx-8 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${themeClasses.textMuted(isDarkMode)}`} />
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={handleSearchChange}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${themeClasses.input(isDarkMode)} focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400 focus:ring-opacity-20 transition-colors`}
              />
            </div>
          )}

          <div className="flex items-center space-x-4">
            <button
              onClick={() => dispatch(toggleTheme())}
              className={`p-2 rounded-lg ${themeClasses.button(isDarkMode)} transition-colors`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <Link
              to="/add"
              className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-2 rounded-lg hover:from-orange-500 hover:to-red-600 transition-all duration-200 flex items-center space-x-2 font-medium"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Recipe</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
