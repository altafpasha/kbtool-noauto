import React from 'react';

const Button = ({ children, onClick }) => {
  return (
    <button
      className={`
        relative isolate inline-grid place-content-center
        px-6 py-2 text-[17px] uppercase
        text-[#afffff] hover:text-white
        bg-[#080312] cursor-pointer
        transition-colors duration-250
        shadow-[10px_10px_20px_rgba(0,0,0,0.6)]
        before:content-[''] before:absolute before:inset-0
        before:bg-gradient-to-br before:from-[#ffae00] before:via-[#7e03aa] before:to-[#00fffb]
        before:bg-[length:300%_300%] before:animate-moveBg
        before:z-[-2]
        after:content-[''] after:absolute after:inset-0
        after:bg-[#080312] after:z-[-1]
        after:clip-path-button after:transition-[clip-path] after:duration-500
        hover:after:clip-path-button-hover focus:after:clip-path-button-hover
        clip-path-button
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;