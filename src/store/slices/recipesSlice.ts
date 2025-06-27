import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  category: string;
  cookTime: number;
  image: string;
  createdAt: string;
}

interface RecipesState {
  recipes: Recipe[];
  searchTerm: string;
  selectedCategory: string;
  isLoading: boolean;
}

const initialState: RecipesState = {
  recipes: [
    {
      id: '1',
      title: 'Classic Spaghetti Carbonara',
      description: 'A creamy Italian pasta dish made with eggs, cheese, and pancetta.',
      ingredients: ['400g spaghetti', '200g pancetta', '4 large eggs', '100g Pecorino Romano', 'Black pepper', 'Salt'],
      steps: [
        'Bring a large pot of salted water to boil and cook spaghetti according to package instructions.',
        'In a large pan, cook pancetta until crispy.',
        'In a bowl, whisk together eggs, grated cheese, and black pepper.',
        'Drain pasta, reserving 1 cup of pasta water.',
        'Add hot pasta to the pan with pancetta.',
        'Remove from heat and quickly mix in the egg mixture, adding pasta water as needed.',
        'Serve immediately with extra cheese and black pepper.'
      ],
      category: 'Italian',
      cookTime: 25,
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&h=300&fit=crop',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Chocolate Chip Cookies',
      description: 'Soft and chewy chocolate chip cookies that are perfect for any occasion.',
      ingredients: ['2¼ cups flour', '1 tsp baking soda', '1 tsp salt', '1 cup butter', '¾ cup brown sugar', '¾ cup white sugar', '2 eggs', '2 tsp vanilla', '2 cups chocolate chips'],
      steps: [
        'Preheat oven to 375°F (190°C).',
        'Mix flour, baking soda, and salt in a bowl.',
        'In another bowl, cream butter and both sugars until fluffy.',
        'Beat in eggs and vanilla.',
        'Gradually mix in flour mixture.',
        'Stir in chocolate chips.',
        'Drop rounded tablespoons onto ungreased baking sheets.',
        'Bake 9-11 minutes until golden brown.',
        'Cool on baking sheet for 2 minutes, then transfer to wire rack.'
      ],
      category: 'Dessert',
      cookTime: 35,
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&h=300&fit=crop',
      createdAt: '2024-01-20'
    },
    {
      id: '3',
      title: 'Mediterranean Quinoa Bowl',
      description: 'A healthy and colorful bowl packed with Mediterranean flavors.',
      ingredients: ['1 cup quinoa', 'Cherry tomatoes', 'Cucumber', 'Red onion', 'Kalamata olives', 'Feta cheese', 'Olive oil', 'Lemon juice', 'Fresh herbs'],
      steps: [
        'Cook quinoa according to package instructions and let cool.',
        'Dice tomatoes, cucumber, and red onion.',
        'In a large bowl, combine quinoa with vegetables.',
        'Add olives and crumbled feta cheese.',
        'Whisk together olive oil, lemon juice, salt, and pepper.',
        'Drizzle dressing over the bowl and toss.',
        'Garnish with fresh herbs and serve.'
      ],
      category: 'Healthy',
      cookTime: 20,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=300&fit=crop',
      createdAt: '2024-01-25'
    }
  ],
  searchTerm: '',
  selectedCategory: '',
  isLoading: false,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe: (state, action: PayloadAction<Omit<Recipe, 'id' | 'createdAt'>>) => {
      const newRecipe: Recipe = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0],
      };
      state.recipes.unshift(newRecipe);
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { addRecipe, setSearchTerm, setSelectedCategory, setLoading } = recipesSlice.actions;
export default recipesSlice.reducer;
