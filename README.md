# Recipe Manager

A modern React application for managing and organizing your favorite recipes. Built with TypeScript, React, and Tailwind CSS.

## Features

- **Recipe Collection**: Browse and search through your recipe collection
- **Add New Recipes**: Create and save new recipes with ingredients and instructions
- **Category Filtering**: Filter recipes by categories like Italian, Mexican, Asian, etc.
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Search Functionality**: Search recipes by title, description, or ingredients
- **Cooking Timer**: Built-in timer for recipe steps

## Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool and dev server

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd recipe-manager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Layout components (Header, Layout)
│   ├── RecipeCard/     # Recipe card component
│   ├── Timer/          # Cooking timer component
│   └── ui/             # UI components (buttons, inputs, etc.)
├── pages/              # Page components
│   ├── RecipeList.tsx  # Main recipe listing page
│   ├── RecipeDetail.tsx # Individual recipe view
│   ├── AddRecipe.tsx   # Add new recipe form
│   └── NotFound.tsx    # 404 page
├── store/              # Redux store and slices
│   ├── store.ts        # Store configuration
│   └── slices/         # Redux slices (recipes, theme)
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

## Features in Detail

### Recipe Management
- Add new recipes with title, description, category, and cook time
- Include ingredients list with auto-suggestions
- Add step-by-step cooking instructions
- Automatic recipe ID generation

### Search and Filter
- Real-time search across recipe titles, descriptions, and ingredients
- Filter recipes by category
- Responsive search interface

### User Experience
- Smooth dark/light theme switching
- Responsive design for all screen sizes
- Intuitive navigation with breadcrumbs
- Loading states and error handling

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
