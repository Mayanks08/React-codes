import React from 'react';

const FailureView = ({ errorMsg, retryFn }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <img 
        src="https://assets.ccbp.in/frontend/content/react-js/list-creation-failure-lg-output.png" 
        alt="failure view" 
        className="w-64 h-64 object-contain mb-6"
      />
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Oops! Something went wrong</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        {errorMsg || "We couldn't fetch your lists. Please try again."}
      </p>
      <button 
        onClick={retryFn}
        className="btn btn-primary"
      >
        Try Again
      </button>
    </div>
  );
};

export default FailureView;