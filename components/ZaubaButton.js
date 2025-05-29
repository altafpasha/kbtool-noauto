// components/Button.js
import React from 'react';

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`bg-slate-800 no-underline group cursor-pointer relative shadow-2xl via-red-400/90 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block transform transition-transform duration-300 ease-in-out ${className} hover:bg-purple-700 hover:shadow-lg hover:scale-105`}
      {...props}
    >
      <span className="absolute inset-0 overflow-hidden rounded-lg">
        <span className="absolute inset-0 rounded-lg bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(128,90,213,0.6)_0%,rgba(128,90,213,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      <div className="relative flex space-x-2 items-center z-10 rounded-lg bg-zinc-950 py-0.5 px-4 ring-1 ring-white/25">
        {children}
        <svg
          fill="none"
          height="16"
          viewBox="0 0 24 24"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.75 8.75L14.25 12L10.75 15.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </div>
      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-purple-400/0 via-purple-600/90 to-purple-400/0 transition-opacity duration-500 group-hover:opacity-40" />
    </button>
  );
};

export default Button;
