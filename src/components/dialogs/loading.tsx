import React from 'react';

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="border-4 border-gray-200 border-t-4 rounded-full w-12 h-12 animate-spin"></div>
    </div>
  );
};

export default LoadingOverlay;
