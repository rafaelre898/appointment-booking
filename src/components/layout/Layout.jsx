import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav 
        className="bg-white shadow-sm"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link 
              to="/" 
              className="text-xl font-semibold text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              aria-label="HealthConnect Home"
            >
              HealthConnect
            </Link>
            <div className="flex space-x-4">
              <Link
                to="/"
                className="px-3 py-2 text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                aria-label="Find Doctors"
              >
                Find Doctors
              </Link>
              <Link
                to="/appointments"
                className="px-3 py-2 text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                aria-label="My Appointments"
              >
                My Appointments
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main 
        className="container mx-auto px-4 py-8"
        role="main"
      >
        {children}
      </main>
    </div>
  );
};

export default Layout; 