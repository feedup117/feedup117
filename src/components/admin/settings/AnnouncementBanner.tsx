import React, { useState } from 'react';
import { Bell, AlertCircle, Calendar } from 'lucide-react';

interface AnnouncementBannerProps {
  value: string;
  onChange: (value: string) => void;
}

const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ value, onChange }) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Global Announcement Banner
        </label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter announcement text to display at the top of all pages..."
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">
          This banner will be shown to all users across the platform. Leave empty to hide.
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>
        
        {value && (
          <div className="text-sm text-gray-600 flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Banner is active</span>
          </div>
        )}
      </div>

      {showPreview && (
        <div className={`p-4 rounded-lg ${value ? 'bg-amber-100 border border-amber-200' : 'bg-gray-100 border border-gray-200'}`}>
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <div>
              <p className="font-medium text-amber-800">
                {value || 'Your announcement will appear here'}
              </p>
              <div className="flex items-center space-x-2 text-xs text-amber-600 mt-1">
                <Calendar className="h-3 w-3" />
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementBanner;