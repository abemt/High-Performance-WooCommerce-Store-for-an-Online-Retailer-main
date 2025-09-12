import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="group block overflow-hidden">
      <div className="relative aspect-[4/5] bg-gray-200 rounded-lg overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/50 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
      </div>
      <div className="mt-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;