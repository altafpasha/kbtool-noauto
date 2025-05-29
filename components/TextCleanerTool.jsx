'use client';
import { useState, useRef } from 'react';

const SpecialCharacterRemover = () => {
  const [input, setInput] = useState("");
  const [showCopied, setShowCopied] = useState(false);
  const [autoCopy, setAutoCopy] = useState(true);
  const [showAutoDisabled, setShowAutoDisabled] = useState(true);
  const inputRef = useRef(null);

  const cleanText = (text) => {
    return text
      .replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

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

  const handleCleanAndCopy = () => {
    const cleaned = cleanText(input);
    navigator.clipboard.writeText(cleaned).then(() => {
      showCopyNotification();
      setTimeout(() => setInput(""), 500);
    });
  };

  const copyToClipboard = () => {
    if (input) {
      navigator.clipboard.writeText(input).then(() => {
        showCopyNotification();
        setTimeout(() => setInput(""), 500);
      });
    }
  };

  const showCopyNotification = () => {
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const toggleAutoCopy = () => {
    setAutoCopy(!autoCopy);
    setShowAutoDisabled(true);
    setTimeout(() => setShowAutoDisabled(false), 3000);
  };

  return (
    
      <div className="max-w-md w-full backdrop-blur-lg bg-white/20 rounded-2xl shadow-2xl p-8 relative overflow-visible border border-white/30">
        <div className="absolute -top-3 -right-3 z-20">
          <span className="bg-gradient-to-r from-green-400 to-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            New
          </span>
        </div>

        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Special Character Remover
          </h2>

          <div className="flex items-center justify-between mb-4">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={toggleAutoCopy}
            >
              <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 bg-white/30 hover:bg-white/40">
                <div
                  className={`absolute h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${
                    autoCopy ? "translate-x-[22px]" : "translate-x-0.5"
                  }`}
                />
              </div>
              <span className="text-sm font-medium text-white select-none">
                {autoCopy ? "Auto-copy ON" : "Auto-copy OFF"}
              </span>
            </div>
            {showAutoDisabled && (
              <div className="text-xs text-yellow-300">Auto mode is disabled.</div>
            )}
          </div>

          <div className="space-y-4">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onPaste={handlePaste}
              className="w-full p-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
              rows={4}
              placeholder="Type or paste text here..."
            />

           
              <button
                onClick={handleCleanAndCopy}
                className="w-full bg-white/20 text-white py-3 px-4 rounded-xl hover:bg-white/30 transition-colors border border-white/30 backdrop-blur-sm group relative"
              >
                <span className="inline-block transition-transform duration-200 group-hover:scale-105">
                  {showCopied ? "Copied!" : "Copy Clean Text"}
                </span>
              </button>
           
          </div>
        </div>
      </div>
    
  );
};

export default SpecialCharacterRemover;
