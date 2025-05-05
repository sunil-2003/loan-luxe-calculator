
import React, { useState, useEffect } from 'react';
import { useCurrency } from '../contexts/CurrencyContext';
import { useTheme } from '../contexts/ThemeContext';
import CurrencySelector from './CurrencySelector';
import LoanSchedule from './LoanSchedule';
import { toast } from "@/components/ui/sonner";
import { Input } from "@/components/ui/input";

interface LoanData {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
  amortizationSchedule: AmortizationEntry[];
}

export interface AmortizationEntry {
  month: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

const LoanCalculator: React.FC = () => {
  const { theme } = useTheme();
  const { currency, exchangeRates } = useCurrency();
  
  const [loanAmount, setLoanAmount] = useState<string>('100000');
  const [interestRate, setInterestRate] = useState<string>('8.5');
  const [loanTerm, setLoanTerm] = useState<string>('5');
  const [loanData, setLoanData] = useState<LoanData | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Validate input fields with regex
  const validateInputs = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Regex patterns
    const numberPattern = /^[0-9]+(\.[0-9]{1,2})?$/;
    
    if (!loanAmount || !numberPattern.test(loanAmount) || Number(loanAmount) <= 0) {
      newErrors.loanAmount = 'Please enter a valid amount';
    }
    
    if (!interestRate || !numberPattern.test(interestRate) || Number(interestRate) < 0 || Number(interestRate) > 100) {
      newErrors.interestRate = 'Rate must be between 0-100';
    }
    
    if (!loanTerm || !numberPattern.test(loanTerm) || Number(loanTerm) <= 0) {
      newErrors.loanTerm = 'Please enter a valid term in years';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate loan data
  const calculateLoan = () => {
    if (!validateInputs()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const term = parseFloat(loanTerm) * 12; // Term in months
    
    // Calculate monthly payment using loan formula
    const monthlyPayment = principal * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    
    // Generate amortization schedule
    const schedule: AmortizationEntry[] = [];
    let balance = principal;
    
    for (let month = 1; month <= term; month++) {
      const interestPayment = balance * rate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      
      schedule.push({
        month,
        principal: principalPayment,
        interest: interestPayment,
        remainingBalance: balance > 0 ? balance : 0,
      });
    }
    
    setLoanData({
      loanAmount: principal,
      interestRate: parseFloat(interestRate),
      loanTerm: parseFloat(loanTerm),
      monthlyPayment,
      amortizationSchedule: schedule,
    });
    
    setShowResults(true);
  };

  // Reset the calculator
  const resetCalculator = () => {
    setLoanData(null);
    setShowResults(false);
  };

  // Get converted amount based on selected currency
  const getConvertedAmount = (amount: number): number => {
    if (currency === 'USD' || !exchangeRates[currency]) return amount;
    return amount * exchangeRates[currency];
  };

  return (
    <div className="loan-container">
      <h1 className="text-3xl font-bold mb-4">Loan Calculator Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block mb-1">Loan Amount</label>
          <Input
            type="text"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className={`${errors.loanAmount ? 'border-red-500' : ''}`}
          />
          {errors.loanAmount && (
            <p className="text-red-500 text-sm mt-1">{errors.loanAmount}</p>
          )}
        </div>
        
        <div>
          <label className="block mb-1">Interest Rate (%)</label>
          <Input
            type="text"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className={`${errors.interestRate ? 'border-red-500' : ''}`}
          />
          {errors.interestRate && (
            <p className="text-red-500 text-sm mt-1">{errors.interestRate}</p>
          )}
        </div>
        
        <div>
          <label className="block mb-1">Term (Years)</label>
          <Input
            type="text"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className={`${errors.loanTerm ? 'border-red-500' : ''}`}
          />
          {errors.loanTerm && (
            <p className="text-red-500 text-sm mt-1">{errors.loanTerm}</p>
          )}
        </div>
      </div>
      
      <button
        onClick={calculateLoan}
        className={`calculate-btn ${theme}`}
      >
        CALCULATE
      </button>
      
      {showResults && loanData && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">
            Monthly EMI: ${loanData.monthlyPayment.toFixed(2)}
          </h2>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block mb-1">Currency</label>
                <div className="flex items-center space-x-4">
                  <CurrencySelector />
                  {currency !== 'USD' && (
                    <p className="text-sm">
                      Converted EMI: {currency} {getConvertedAmount(loanData.monthlyPayment).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <button
              onClick={resetCalculator}
              className={`reset-btn ${theme}`}
            >
              RESET TABLE
            </button>
          </div>
          
          <LoanSchedule 
            schedule={loanData.amortizationSchedule} 
            currency={currency}
            exchangeRate={exchangeRates[currency] || 1}
          />
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;
