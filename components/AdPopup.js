import React, { useState, useEffect } from 'react';

const QRGuardAdPopup = () => {
  const [isVisible, setIsVisible] = useState(false); // Initially hidden

  useEffect(() => {
    const lastShown = localStorage.getItem('qrguard_ad_last_shown');
    const fourHours = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

    if (!lastShown || (Date.now() - parseInt(lastShown) > fourHours)) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('qrguard_ad_last_shown', Date.now().toString());
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 max-w-xl w-full">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-white">QRGuard Ai</h2>
            <button 
              className="text-white/50 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
              onClick={handleClose}
              aria-label="Close popup"
            >
              ✕
            </button>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-white/20 backdrop-blur-md flex items-center justify-center p-1">
              <img
                src="/img/QRGuard-logo1-removebg.png"
                alt="QRGuard Ai Logo"
                className="w-20 h-20 rounded-lg"
              />
            </div>
            
            <div className="flex-1">
              <p className="text-white/90 text-base mb-4">
                Protect your privacy with QRGuard Ai. Download now from the Play Store!
              </p>
              <div className="flex space-x-2">
                <a
                  href="https://play.google.com/store/apps/details?id=app.qrquard.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-6 py-2 rounded-lg
                    bg-white/20 backdrop-blur-md border border-white/30
                    hover:bg-white/30 transition-all text-white font-medium
                    shadow-lg shadow-blue-500/20"
                >
                  Download on Play Store
                </a>
              </div>
            </div>
          </div>
          
          <div className="w-full flex justify-center">
            <p className="text-white/60 text-xs">
              Developed by QRGuard. • Available on Play Store
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRGuardAdPopup;
