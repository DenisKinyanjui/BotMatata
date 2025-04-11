import React from 'react';
import { X } from 'lucide-react';

interface IntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    steps: string[];
  };
  onProceed: () => void;
}

const IntegrationModal: React.FC<IntegrationModalProps> = ({
  isOpen,
  onClose,
  platform,
  onProceed,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <platform.icon className={`h-6 w-6 ${platform.color} mr-2`} />
            <h2 className="text-xl font-semibold">
              Connect Your Chatbot to {platform.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          {platform.steps.map((step, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-500">
                {index + 1}
              </div>
              <p className="ml-3 text-gray-600">{step}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onProceed}
            className={`px-4 py-2 text-white rounded-lg ${platform.color} hover:opacity-90`}
          >
            Proceed & Authorize
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationModal;