import React from 'react';
import toast from 'react-hot-toast';

interface PlatformIntegrationProps {
  platform: {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    buttonColor: string;
  };
  status: {
    connected: boolean;
    account?: string;
  };
  onConnect: () => void;
}

const PlatformIntegration: React.FC<PlatformIntegrationProps> = ({
  platform,
  status,
  onConnect,
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-3">
        <platform.icon className={`h-6 w-6 ${platform.color}`} />
        <div>
          <p className="font-medium text-gray-900">{platform.name}</p>
          {status.connected && (
            <p className="text-sm text-gray-500">{status.account}</p>
          )}
        </div>
      </div>
      <button
        onClick={onConnect}
        className={`px-4 py-2 rounded-md text-sm font-medium ${
          status.connected
            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            : `${platform.buttonColor}`
        }`}
      >
        {status.connected ? 'Reconnect' : 'Connect'}
      </button>
    </div>
  );
};

export default PlatformIntegration;