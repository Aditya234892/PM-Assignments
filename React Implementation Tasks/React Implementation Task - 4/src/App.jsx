import React, { useState } from 'react';
import ChildComponent from './components/Child';

const App = () => {
  const [childSetter, setChildSetter] = useState(null);

  const handleSetterReceived = (setter) => {
    setChildSetter(() => setter);
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Parent Component</h2>
        <button 
          onClick={() => childSetter?.(prev => prev + 1)}
          disabled={!childSetter}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Increment Child Counter
        </button>
      </div>
      
      <ChildComponent onSetterReceived={handleSetterReceived} />
    </div>
  );
};

export default App;
