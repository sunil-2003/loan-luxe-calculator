
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { ClipboardList } from 'lucide-react';

const About: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className="loan-container">
      <h1 className="text-3xl font-bold mb-6">About This App</h1>
      
      <p className="mb-6 text-lg">
        This Loan Calculator App is a modern, single-page web application built using 
        <strong> React JS</strong> and <strong>Material UI</strong>. It allows users to calculate loan EMIs (Equated Monthly 
        Installments), view a detailed amortization schedule, and see real-time currency conversions of their EMI using live exchange rates.
      </p>
      
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <ClipboardList className="mr-2 h-6 w-6 text-appBlue" />
          <h2 className="text-2xl font-semibold">Instructions for Candidates</h2>
        </div>
        
        <p className="mb-4">Please follow these instructions to complete and submit your project:</p>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>Push the entire project to a public <strong>GitHub repository</strong>.</li>
          <li>Make sure to <strong>commit regularly</strong> with clear messages after completing each feature.</li>
          <li>Use the provided EMI formula to perform calculations.</li>
          <li>Use <strong>Context API</strong> for global state management (e.g. theme, currency).</li>
          <li>Create <strong>custom React hooks</strong> for reusable logic (e.g. EMI calculation, fetching exchange rates).</li>
          <li>Integrate the <strong>ExchangeRate API</strong> for live currency conversion.</li>
          <li>Ensure the app is fully <strong>responsive</strong> on all screen sizes.</li>
          <li>Implement both <strong>light and dark modes</strong> using Material UI's theming system.</li>
          <li>Add a <strong>404 Not Found</strong> page for unmatched routes.</li>
          <li>Handle runtime errors gracefully by showing an <strong>Error Page</strong>.</li>
          <li>Once deployed, add the live deployment <strong>link in the About section</strong> of your GitHub repo.</li>
          <li>Deploy the project on any platform (e.g. Vercel, Netlify, GitHub Pages).</li>
        </ul>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="flex items-center text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Your final GitHub repository should include a live demo link, and your code should be readable, modular, and well-structured.</span>
        </div>
      </div>
      
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <span role="img" aria-label="sparkles" className="mr-2">✨</span>
          Features
        </h2>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>Interactive loan calculator with real-time results</li>
          <li>Detailed amortization schedule showing principal, interest, and balance for each month</li>
          <li>Currency conversion using live exchange rates</li>
          <li>Responsive design that works on all device sizes</li>
          <li>Light and dark mode for user preference</li>
          <li>Form validation to ensure accurate calculations</li>
          <li>Clean user interface with intuitive navigation</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
