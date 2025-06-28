import React from 'react';
import { motion } from 'framer-motion';
import { ToggleLeft, ToggleRight, AlertTriangle } from 'lucide-react';

interface ToggleRowProps {
  title: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  isEnabled: boolean;
  onChange: () => void;
  beta?: boolean;
  critical?: boolean;
}

const ToggleRow: React.FC<ToggleRowProps> = ({
  title,
  description,
  icon: Icon,
  isEnabled,
  onChange,
  beta = false,
  critical = false
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-lg ${isEnabled ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-500'}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-medium text-gray-900">{title}</h3>
            {beta && (
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                Beta
              </span>
            )}
            {critical && (
              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full flex items-center">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Critical
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onChange}
        className="text-gray-400 hover:text-primary-500 transition-colors"
      >
        {isEnabled ? (
          <ToggleRight className="h-8 w-8 text-primary-500" />
        ) : (
          <ToggleLeft className="h-8 w-8" />
        )}
      </motion.button>
    </div>
  );
};

export default ToggleRow;