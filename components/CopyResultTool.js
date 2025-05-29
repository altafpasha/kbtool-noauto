// components/CopyResultTool.js
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CopyResultTool = () => {
  const [loanId, setLoanId] = useState('');
  const [ids, setIds] = useState('');
  const [output, setOutput] = useState('Result will be displayed here');
  const [resetCounter, setResetCounter] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyResult = () => {
    const idsArray = ids.trim().split(' ');
    const idsCount = idsArray.length;
    const idsOutput = idsArray.join(',');

    let result = '';

    if (idsCount > 0) {
      if (loanId) {
        result = `${loanId}:${idsCount}:${idsOutput}`;
      } else {
        result = `${idsCount}:${idsOutput}`;
      }
    }

    setOutput(result);

    // Copy to clipboard
    navigator.clipboard.writeText(result);
    handleCopy();

    // Increment reset counter
    setResetCounter(resetCounter + 1);

    // Reset fields after 5 seconds
    setTimeout(() => {
      resetFields();
    }, 5000);
  };

  const resetFields = () => {
    setLoanId('');
    setIds('');
    setOutput('Result will be displayed here');
  };

  const checkEnter = (event) => {
    if (event.keyCode === 13) {
      copyResult();
    }
  };

  return (
    <div className="p-4 bg-white border rounded shadow">
      <h2 className="text-lg font-bold">Container 2</h2>
      <div className="mb-4">
        <input
          type="text"
          value={loanId}
          onChange={(e) => setLoanId(e.target.value)}
          placeholder="QID 106 and 117"
          onKeyUp={checkEnter}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={ids}
          onChange={(e) => setIds(e.target.value)}
          placeholder="Enter transactions_id"
          onKeyUp={checkEnter}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <CopyToClipboard text={output} onCopy={handleCopy}>
          <button className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">
            <i className="fa fa-copy"></i> Copy
          </button>
        </CopyToClipboard>
        <button
          onClick={resetFields}
          className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700 ml-2"
        >
          <i className="fa fa-redo"></i> Reset <span id="resetCount">{resetCounter}</span>
        </button>
      </div>
      <div id="output" className="text-lg font-bold">{output}</div>
    </div>
  );
};

export default CopyResultTool;
