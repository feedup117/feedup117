import React from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, CheckCircle } from 'lucide-react';

interface SaveButtonProps {
  onClick: () => void;
  isSaving: boolean;
  isSuccess: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onClick, isSaving, isSuccess }) => {
  return (
    <motion.button
      whileHover={{ scale: isSaving ? 1 : 1.05 }}
      whileTap={{ scale: isSaving ? 1 : 0.95 }}
      onClick={onClick}
      disabled={isSaving}
      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isSaving ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Saving Changes...</span>
        </>
      ) : isSuccess ? (
        <>
          <CheckCircle className="h-5 w-5" />
          <span>Changes Saved!</span>
        </>
      ) : (
        <>
          <Save className="h-5 w-5" />
          <span>Save Changes</span>
        </>
      )}
    </motion.button>
  );
};

export default SaveButton;