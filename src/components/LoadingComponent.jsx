import React, { useState, useEffect } from 'react';

const LoadingComponent = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
      
      <div className="relative text-center">
        {/* Loader container with shadow */}
        <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100">
          {/* Animated spinner with single ring */}
          <div className="relative w-20 h-20 mx-auto mb-8">
            {/* Background ring */}
            <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
            
            {/* Spinning ring */}
            <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 border-r-blue-600 rounded-full animate-spin"></div>
          </div>

          {/* Loading text */}
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading</h2>
          <p className="text-sm text-gray-500 mb-6">Please wait a moment</p>

          {/* Animated progress dots */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
      </div>
    </div>
  );
};

export default LoadingComponent;