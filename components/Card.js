// components/Card.js
import React from 'react';

const Card = ({ title, content, className, ...props }) => {
  return (
    <div
      className={`bg-slate-800 rounded-lg shadow-2xl relative overflow-hidden p-4 ${className}`}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <span className="absolute inset-0 rounded-lg bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(128,90,213,0.6)_0%,rgba(128,90,213,0)_75%)] opacity-50" />
      </div>
      <div className="relative z-10">
        <h2 className="text-lg font-semibold text-white mb-2">{title}</h2>
        <p className="text-sm text-gray-300">{content}</p>
      </div>
      <span className="absolute bottom-0 left-4 h-px w-[calc(100%-2rem)] bg-gradient-to-r from-purple-400/0 via-purple-400/90 to-purple-400/0 transition-opacity duration-500" />
    </div>
  );
};

export default Card;
