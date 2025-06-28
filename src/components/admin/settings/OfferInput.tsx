import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface OfferInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
}

const OfferInput: React.FC<OfferInputProps> = ({
  label,
  value,
  onChange,
  prefix = '',
  suffix = '',
  min = 0,
  max = 1000,
  step = 1
}) => {
  const increment = () => {
    if (value < max) {
      onChange(value + step);
    }
  };

  const decrement = () => {
    if (value > min) {
      onChange(value - step);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex items-center">
        <button
          onClick={decrement}
          disabled={value <= min}
          className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-l-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus className="h-4 w-4" />
        </button>
        <div className="relative flex-1">
          {prefix && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500">{prefix}</span>
            </div>
          )}
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
            min={min}
            max={max}
            step={step}
            className={`w-full py-3 border-y border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-center ${
              prefix ? 'pl-8' : ''
            } ${suffix ? 'pr-8' : ''}`}
          />
          {suffix && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500">{suffix}</span>
            </div>
          )}
        </div>
        <button
          onClick={increment}
          disabled={value >= max}
          className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-r-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default OfferInput;