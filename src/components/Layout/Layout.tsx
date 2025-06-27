import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { useAppSelector } from '../../hooks/redux';

const Layout = () => {
  const { isDarkMode } = useAppSelector((state) => state.theme);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
