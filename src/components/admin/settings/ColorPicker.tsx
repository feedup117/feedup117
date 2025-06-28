import React, { useState } from 'react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempValue(e.target.value);
  };

  const handleBlur = () => {
    onChange(tempValue);
    setIsEditing(false);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setTempValue(newColor);
    onChange(newColor);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex items-center space-x-3">
        <input
          type="color"
          value={value}
          onChange={handleColorChange}
          className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
        />
        {isEditing ? (
          <input
            type="text"
            value={tempValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            autoFocus
          />
        ) : (
          <div 
            onClick={() => setIsEditing(true)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
          >
            {value}
          </div>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-1">Click the text to edit the hex value directly</p>
    </div>
  );
};

export default ColorPicker;