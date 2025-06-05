import React from 'react';

const LoadingView = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
      <h2 className="text-xl font-medium text-gray-700">Loading lists...</h2>
      <p className="text-gray-500 mt-2">Please wait while we fetch your data</p>
    </div>
  );
};

export default LoadingView;