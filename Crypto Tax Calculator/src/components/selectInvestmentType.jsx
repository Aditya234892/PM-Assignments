import React, { useState } from "react";
import { Check } from 'lucide-react';

const InvestmentTypeSelector = ({ onSelect }) => {
  const [selectedType, setSelectedType] = useState("Long Term"); // Default value is Long Term

  const handleSelection = (type) => {
    setSelectedType(type);
    if (onSelect) onSelect(type);
  };

  return (
    <div className="flex flex-col items-start">
      <label className=" text-gray-600 mb-1 text-sm ">Investment Type</label>
      <div className="flex gap-1">
        <button
          onClick={() => handleSelection("Short Term")}
          className={`px-9 py-3 border rounded-md text-sm font-semibold flex gap-2 justify-center items-center ${
            selectedType === "Short Term"
              ? "bg-blue-100 text-blue-600 border-blue-500"
              : "bg-white text-gray-600 border-gray-300"
          }`}
        >
          Short Term
          {selectedType === "Short Term" && <Check size={24} color="blue" />}
        </button>
        <button
          onClick={() => handleSelection("Long Term")}
          className={`px-9 py-3 border rounded-md text-sm font-semibold flex gap-2 justify-center items-center ${
            selectedType === "Long Term"
              ? "bg-blue-100 text-blue-600 border-blue-500"
              : "bg-white text-gray-600 border-gray-300"
          }`}
        >
          Long Term
          {selectedType === "Long Term" && <Check size={24} color="blue" />}
        </button>
      </div>
      <div className="flex justify-between w-full text-xs text-gray-500 mt-1">
        <span>&lt; 12 months</span>
        <span>&gt; 12 months</span>
      </div>
    </div>
  );
};

export default InvestmentTypeSelector;
