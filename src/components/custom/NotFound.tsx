'use client';

// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">404 - Page Not Found</h2>
        
        <div className="text-center mb-8">
          <p className="text-gray-600 mb-4">
            The page you are looking for doesn't exist or has been moved.
          </p>
          
          <div className="w-full bg-gray-200 h-0.5 my-6"></div>
          
          <p className="text-gray-500 text-sm mb-4">
            Let's get you back on track
          </p>
        </div>
        
        <div className="flex flex-col space-y-4">
          <Link 
            href="/dashboard" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center transition-colors"
          >
            Go to Dashboard
          </Link>
          
          <Link 
            href="/sign-in" 
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded text-center transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}