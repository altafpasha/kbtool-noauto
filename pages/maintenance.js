export default function ServerError() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-800 mb-2">500</h1>
          <div className="w-16 h-1 bg-red-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Server Error</h2>
          <p className="text-gray-600">
            Something went wrong on our end. We&apos;re working to fix it.
          </p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <p className="text-gray-500 text-sm mb-4">
            Please try again in a few minutes or contact support if the problem persists.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
