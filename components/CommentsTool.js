// components/CommentsTool.js
import { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CommentsTool = () => {
  const [customButtons, setCustomButtons] = useState([]);
  const [buttonName, setButtonName] = useState('');
  const [buttonContent, setButtonContent] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedButtons = localStorage.getItem('customButtons');
    if (savedButtons) {
      setCustomButtons(JSON.parse(savedButtons));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('customButtons', JSON.stringify(customButtons));
  }, [customButtons]);

  const addCustomButton = () => {
    if (buttonName && buttonContent) {
      setCustomButtons([...customButtons, { name: buttonName, content: buttonContent }]);
      setButtonName('');
      setButtonContent('');
    }
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 bg-gray-800 text-white">
      <div className="mb-4">
        <button
          className="header-button"
          onClick={() => {
            document.getElementById('approved').style.display = 'block';
            document.getElementById('reject').style.display = 'none';
            document.getElementById('pending').style.display = 'none';
          }}
        >
          Approved
        </button>
        <button
          className="header-button"
          onClick={() => {
            document.getElementById('approved').style.display = 'none';
            document.getElementById('reject').style.display = 'block';
            document.getElementById('pending').style.display = 'none';
          }}
        >
          Reject
        </button>
        <button
          className="header-button"
          onClick={() => {
            document.getElementById('approved').style.display = 'none';
            document.getElementById('reject').style.display = 'none';
            document.getElementById('pending').style.display = 'block';
          }}
        >
          Comments
        </button>
      </div>
      <div id="approved" className="content">
        {/* Add your approved content here */}
      </div>
      <div id="reject" className="content" style={{ display: 'none' }}>
        {/* Add your reject content here */}
      </div>
      <div id="pending" className="p-2 space-y-2" style={{ display: 'none' }}>
        <h5 className="font-bold">Pending review</h5>
        <div className="mt-4">
          <input
            type="text"
            value={buttonName}
            onChange={(e) => setButtonName(e.target.value)}
            placeholder="Button Name"
            className="p-2 border rounded w-full mb-2"
          />
          <input
            type="text"
            value={buttonContent}
            onChange={(e) => setButtonContent(e.target.value)}
            placeholder="Button Content"
            className="p-2 border rounded w-full mb-2"
          />
          <button
            onClick={addCustomButton}
            className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700"
          >
            Add Button
          </button>
        </div>
        <div className="mt-4 space-y-2">
          {customButtons.map((btn, index) => (
            <CopyToClipboard key={index} text={btn.content} onCopy={handleCopy}>
              <button className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">
                {btn.name}
              </button>
            </CopyToClipboard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentsTool;
