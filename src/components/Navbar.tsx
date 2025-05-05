
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={`loan-header ${theme}`}>
      <div className="text-2xl font-semibold">Loan Calculator</div>
      <nav className="flex items-center space-x-4">
        <Link 
          to="/" 
          className={`px-4 py-2 rounded-md ${isActive('/') ? 'bg-white/20' : 'hover:bg-white/10'}`}
        >
          HOME
        </Link>
        <Link 
          to="/exchange-rates" 
          className={`px-4 py-2 rounded-md ${isActive('/exchange-rates') ? 'bg-white/20' : 'hover:bg-white/10'}`}
        >
          EXCHANGE RATES (LIVE)
        </Link>
        <Link 
          to="/about" 
          className={`px-4 py-2 rounded-md ${isActive('/about') ? 'bg-white/20' : 'hover:bg-white/10'}`}
        >
          ABOUT
        </Link>
        <Link 
          to="/error-page" 
          className={`px-4 py-2 rounded-md ${isActive('/error-page') ? 'bg-white/20' : 'hover:bg-white/10'}`}
        >
          ERROR PAGE
        </Link>
        <button 
          onClick={toggleTheme} 
          className="theme-toggle ml-2"
          style={{ backgroundColor: theme === 'dark' ? '#555' : '#4285f4' }}
        >
          <span 
            className="theme-toggle-thumb" 
            style={{ transform: theme === 'dark' ? 'translateX(1.5rem)' : 'translateX(0)' }}
          >
            {theme === 'dark' ? 
              <Moon className="h-4 w-4 text-gray-800" /> : 
              <Sun className="h-4 w-4 text-yellow-500" />
            }
          </span>
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
