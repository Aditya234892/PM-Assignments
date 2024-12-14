import { useState } from "react";

const InputField = ({ 
    label,           
    type = "text",   
    placeholder = "",
    value,           
    onChange,       
    required = false,
    className = "",
    access = ""   
}) => {
    const handleInputChange = (e) => {
        const newValue = e.target.value;
        onChange(newValue);
    };

    return (
        <div className={`input-field ${className} relative`}>
            {label && <label htmlFor={label} className="block mb-1 text-sm">{label}</label>}
            <div className="flex items-center w-80 bg-gray-200 border rounded-md">
                {/* Dollar symbol */}
                <span className="absolute left-3 font-semibold">$</span>
                <input
                    id={label}
                    type={type}
                    placeholder={placeholder}   
                    value={value}
                    onChange={handleInputChange}
                    required={required}
                    className="px-3 py-3 pl-8 w-full bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                    {...(access === "readonly" && { readOnly: true })}
                />
            </div>
        </div>
    );
};

export default InputField;
