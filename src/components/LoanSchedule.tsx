
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { AmortizationEntry } from './LoanCalculator';

interface LoanScheduleProps {
  schedule: AmortizationEntry[];
  currency: string;
  exchangeRate: number;
}

const LoanSchedule: React.FC<LoanScheduleProps> = ({ schedule, currency, exchangeRate }) => {
  const { theme } = useTheme();

  // Format currency values
  const formatCurrency = (value: number): string => {
    const convertedValue = value * exchangeRate;
    return `${convertedValue.toFixed(2)} ${currency}`;
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Amortization Schedule ({currency})</h3>
      
      <div className={`table-container ${theme}`}>
        <table className="w-full">
          <thead>
            <tr className={`table-header ${theme}`}>
              <th className="text-left w-1/4">Month</th>
              <th className="text-left w-1/4">Principal</th>
              <th className="text-left w-1/4">Interest</th>
              <th className="text-left w-1/4">Remaining Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {schedule.map((entry) => (
              <tr 
                key={entry.month}
                className={`table-row ${theme} ${entry.month % 2 === 0 ? theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50' : ''}`}
              >
                <td className="py-2">{entry.month}</td>
                <td className="py-2">{formatCurrency(entry.principal)}</td>
                <td className="py-2">{formatCurrency(entry.interest)}</td>
                <td className="py-2">{formatCurrency(entry.remainingBalance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanSchedule;
