
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { Switch } from "@/components/ui/switch";

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
        <div className="flex items-center space-x-2 ml-2">
          <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {theme === 'dark' ? 'Dark' : 'Light'}
          </span>
          <Switch 
            checked={theme === 'dark'} 
            onCheckedChange={toggleTheme} 
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
