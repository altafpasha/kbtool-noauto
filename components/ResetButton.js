// components/Button.js
import React from 'react';

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`bg-slate-800 no-underline group cursor-pointer relative shadow-2xl via-red-400/90 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block ${className}`}
      {...props}
    >
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
        {children}
       
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 48 48">
          <path fill="#ff6f02" d="M31 7.002l13 1.686L33.296 19 31 7.002zM17 41L4 39.314 14.704 29 17 41z"></path><path fill="#ff6f00" d="M8 24c0-8.837 7.163-16 16-16 1.024 0 2.021.106 2.992.29l.693-3.865C26.525 4.112 25.262 4.005 24 4.005c-11.053 0-20 8.947-20 20 0 4.844 1.686 9.474 4.844 13.051l3.037-2.629C9.468 31.625 8 27.987 8 24zM39.473 11.267l-3.143 2.537C38.622 16.572 40 20.125 40 24c0 8.837-7.163 16-16 16-1.029 0-2.033-.106-3.008-.292l-.676 3.771c1.262.21 2.525.317 3.684.317 11.053 0 20-8.947 20-20C44 19.375 42.421 14.848 39.473 11.267z"></path>
        </svg>
      </div>
      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-red-400/0 via-red-400/90 to-red-400/0 transition-opacity duration-500 group-hover:opacity-40
" />
    </button>
  );
};

export default Button;

