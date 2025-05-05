
import React, { useState } from 'react';
import { useCurrency } from '../contexts/CurrencyContext';
import { useTheme } from '../contexts/ThemeContext';
import { ChevronDown } from 'lucide-react';

const CurrencySelector: React.FC = () => {
  const { currency, setCurrency, exchangeRates } = useCurrency();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const currencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CAD', name: 'Canadian Dollar' },
  ];

  const handleSelect = (code: any) => {
    setCurrency(code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`currency-dropdown ${theme} flex justify-between items-center w-40`}
      >
        <span>{currency}</span>
        <ChevronDown className="h-4 w-4" />
      </button>
      
      {isOpen && (
        <div className={`absolute z-10 mt-1 w-40 rounded-md shadow-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
          <ul className="py-1">
            {currencies.map((curr) => (
              <li 
                key={curr.code}
                className={`px-4 py-2 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                onClick={() => handleSelect(curr.code)}
              >
                {curr.code}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
