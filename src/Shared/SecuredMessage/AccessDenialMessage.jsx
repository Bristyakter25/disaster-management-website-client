import React from 'react';
import { Link } from 'react-router-dom';

const AccessDenialMessage = () => {
    return (
        <div>
             <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-purple-300 dark:from-gray-800 dark:to-gray-900 px-4 text-center">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-12 max-w-lg transform transition duration-500 hover:scale-105">
        <div className="text-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-16 w-16 text-red-500 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12c0 4.9706-4.0294 9-9 9s-9-4.0294-9-9 4.0294-9 9-9 9 4.0294 9 9z"
            />
          </svg>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-4">
            Access Denied
          </h2>
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">
          You must be logged in to access the dashboard. Click below to log in and continue.
        </p>
        <Link

          to="/login"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition transform hover:-translate-y-1 hover:scale-105"
        >
          Go to Login
        </Link>
      </div>
    </div>
        </div>
    );
};

export default AccessDenialMessage;