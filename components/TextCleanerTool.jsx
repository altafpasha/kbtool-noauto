'use client';
import { useState, useRef } from 'react';

const SpecialCharacterRemover = () => {
  const [input, setInput] = useState("");
  const [showCopied, setShowCopied] = useState(false);
  const [isCleanMode, setIsCleanMode] = useState(false);
  const inputRef = useRef(null);

  const cleanText = (text) => {
    return text
      .replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const displayText = isCleanMode ? cleanText(input) : input;

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setInput(newText);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    
    navigator.clipboard.readText().then((pastedText) => {
      setInput(pastedText);
    });
  };

  const handleCopy = () => {
    const textToCopy = isCleanMode ? cleanText(input) : input;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    });
  };

  const handleClear = () => {
    setInput("");
  };

  const toggleCleanMode = () => {
    setIsCleanMode(!isCleanMode);
  };

  return (
    <div className="max-w-md w-full backdrop-blur-lg bg-white/20 rounded-2xl shadow-2xl p-8 relative overflow-visible border border-white/30">
      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-white">
          Special Character Remover
        </h2>

        <div className="space-y-4">
          <textarea
            ref={inputRef}
            value={displayText}
            onChange={handleInputChange}
            onPaste={handlePaste}
            className="w-full p-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
            rows={4}
            placeholder="Type or paste text here..."
          />

          <div className="flex justify-between mb-4">
            <button
              onClick={toggleCleanMode}
              className={`w-1/2 py-3 px-4 rounded-xl transition-colors border backdrop-blur-sm group relative mr-2 ${
                isCleanMode 
                  ? 'bg-green-500/30 text-white border-green-500/30 hover:bg-green-500/40' 
                  : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
              }`}
            >
              <span className="inline-block transition-transform duration-200 group-hover:scale-105">
                {isCleanMode ? "Show Original" : "Remove Special Chars"}
              </span>
            </button>
            <button
              onClick={handleCopy}
              className="w-1/2 bg-blue-500/20 text-white py-3 px-4 rounded-xl hover:bg-blue-500/30 transition-colors border border-blue-500/30 backdrop-blur-sm group relative"
            >
              <span className="inline-block transition-transform duration-200 group-hover:scale-105">
                {showCopied ? "Copied!" : "Copy Text"}
              </span>
            </button>
          </div>

          <button
            onClick={handleClear}
            className="w-full bg-red-500/20 text-white py-3 px-4 rounded-xl hover:bg-red-500/30 transition-colors border border-red-500/30 backdrop-blur-sm group relative"
          >
            <span className="inline-block transition-transform duration-200 group-hover:scale-105">
              Clear
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialCharacterRemover;