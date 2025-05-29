'use client';
import React, { useState, useEffect, useRef } from 'react';

const CombinedCalculator = () => {
  // Salary Calculator States
  const [salariesInput, setSalariesInput] = useState('');
  const [averageResult, setAverageResult] = useState('');
  const [autoCopied, setAutoCopied] = useState('');
  const [totalSalary, setTotalSalary] = useState(0);
  const [salaryCount, setSalaryCount] = useState(0);
  const [salaryCopied, setSalaryCopied] = useState(false);

  // Special Character Remover States
  const [input, setInput] = useState('');
  const [showCopied, setShowCopied] = useState(false);
  const [isCleanMode, setIsCleanMode] = useState(false);
  const inputRef = useRef(null);

  // Salary Calculator Functions
  const calculateAverage = (input) => {
    const salaries = input.split(/[,\s]+/).map(parseFloat).filter(value => !isNaN(value));
    if (salaries.length === 0) {
      setAverageResult('Please enter valid salaries.');
      setTotalSalary(0);
      setSalaryCount(0);
      return;
    }
    const total = salaries.reduce((acc, current) => acc + current, 0);
    const average = total / salaries.length;
    setAverageResult(`Average Salary: ${average.toFixed(0)}`);
    setTotalSalary(total);
    setSalaryCount(salaries.length);
  };

  const handleSalaryChange = (e) => {
    const newValue = e.target.value.replace(/[^0-9,\s]/g, '');
    setSalariesInput(newValue);
  };

  const handleSalaryPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9,\s]/g, '');
    const newValue = salariesInput + pastedData;
    setSalariesInput(newValue);
  };

  // Special Character Remover Functions
  const cleanText = (text) => {
    return text.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
  };

  const displayText = isCleanMode ? cleanText(input) : input;

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setInput(newText);
  };

  const handleCharacterPaste = (e) => {
    e.preventDefault();
    navigator.clipboard.readText().then(pastedText => {
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
    setInput('');
  };

  const toggleCleanMode = () => {
    setIsCleanMode(!isCleanMode);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      {/* Salary Calculator Section */}
      <div className="backdrop-blur-lg bg-slate-800/30 border border-slate-700/50 rounded-2xl shadow-2xl p-8 relative ">
        <h2 className="text-2xl font-bold mb-6 text-white">Salary Calculator</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={salariesInput}
            onChange={handleSalaryChange}
            onPaste={handleSalaryPaste}
            className="w-full bg-slate-700/30 border-slate-600/50  p-4 border border-white/30 rounded-xl text-white  focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter salaries (numbers only)"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSalariesInput('');
                setAverageResult('');
                setTotalSalary(0);
                setSalaryCount(0);
              }}
              className="w-1/2 bg-red-500/20 text-white py-3 px-4 rounded-xl hover:bg-red-500/30 transition-colors border border-red-500/30 backdrop-blur-sm group relative text-xs"
            >
              <span className="inline-block transition-transform duration-200 group-hover:scale-105">
                Reset
              </span>
            </button>
            <button
              onClick={() => {
                calculateAverage(salariesInput);
                navigator.clipboard.writeText(averageResult.replace('Average Salary: ', ''));
                setSalaryCopied(true);
                setTimeout(() => setSalaryCopied(false), 2000);
              }}
              className="w-1/2 bg-white/20 text-white py-3 px-4 rounded-xl hover:bg-white/30 transition-colors border border-white/30 backdrop-blur-sm group relative"
            >
              <span className="inline-block transition-transform duration-200 group-hover:scale-105">
                {salaryCopied ? 'Copied!' : 'Copy Salary'}
              </span>
            </button>
          </div>
          <div className="text-purple-500">{autoCopied}</div>
          {salariesInput && !averageResult && (
            <div className="text-xs text-yellow-300">
              Click Copy Salary to calculate!
            </div>
          )}
          <div className="text-lg font-bold text-white">{averageResult}</div>
          <div className="text-sm text-gray-200">
            Total Salary: {totalSalary ? totalSalary.toFixed(0) : 0}
            <br />
            Number of Salaries: {salaryCount}
          </div>
        </div>
      </div>

      {/* Special Character Remover Section */}
      <div className="backdrop-blur-lg bg-slate-800/30 border border-slate-700/50 rounded-2xl shadow-2xl p-8 relative ">
        <div className="absolute -top-3 -right-3 z-20">
          <span className="bg-gradient-to-r from-green-400 to-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            New
          </span>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-white">Special Character Remover</h2>

        <div className="space-y-4">
          <textarea
            ref={inputRef}
            value={displayText}
            onChange={handleInputChange}
            onPaste={handleCharacterPaste}
            className="w-full p-4  bg-slate-700/30 border-slate-600/50  border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

export default CombinedCalculator;