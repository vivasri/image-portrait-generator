
import React from 'react';

interface ImageCardProps {
  title: string;
  imageUrl: string;
  isGenerated?: boolean;
}

const ImageCard: React.FC<ImageCardProps> = ({ title, imageUrl, isGenerated = false }) => {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <h2 className={`text-2xl font-semibold mb-4 text-gray-300 ${isGenerated ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500' : ''}`}>
        {title}
      </h2>
      <div className={`w-full aspect-portrait rounded-2xl overflow-hidden shadow-2xl shadow-black/50 transition-all duration-500 ${isGenerated ? 'ring-2 ring-purple-500' : 'ring-1 ring-gray-700'}`}>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ImageCard;
