
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-4">
      <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-gray-200">AI is generating...</p>
      <p className="text-gray-400 mt-1">This may take a moment.</p>
    </div>
  );
};

export default Loader;
