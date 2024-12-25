import React, { useState } from 'react';

const ChildComponent = ({ onSetterReceived }) => {
  const [count, setCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  const handlePassSetter = () => {
    onSetterReceived(setCount);
    setIsConnected(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Child Component</h2>
        <span className={`px-2 py-1 rounded-full text-sm ${
          isConnected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
      <div className="flex flex-col items-center gap-4">
        <span className="text-4xl font-bold">{count}</span>
        <button 
          onClick={handlePassSetter} 
          disabled={isConnected}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Connect to Parent
        </button>
      </div>
    </div>
  );
};

export default ChildComponent;