import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, MessageSquare, Settings, CreditCard, ArrowUpRight, ToggleLeft as Toggle } from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar';

// Mock data
const businessData = {
  name: 'TechStart Solutions',
  status: 'Active',
  subscription: 'Free Trial',
  totalMessages: 1234,
  engagementRate: '78%',
  topInquiries: [
    'Product pricing',
    'Delivery status',
    'Return policy',
  ],
  recentChats: [
    {
      id: 1,
      customer: 'John Doe',
      message: 'When will my order arrive?',
      timestamp: '2 minutes ago',
    },
    {
      id: 2,
      customer: 'Sarah Smith',
      message: 'Do you ship internationally?',
      timestamp: '15 minutes ago',
    },
    {
      id: 3,
      customer: 'Mike Johnson',
      message: 'I need help with my account',
      timestamp: '1 hour ago',
    },
    {
      id: 4,
      customer: 'Emily Brown',
      message: 'What are your business hours?',
      timestamp: '2 hours ago',
    },
    {
      id: 5,
      customer: 'David Wilson',
      message: 'Is this item in stock?',
      timestamp: '3 hours ago',
    },
  ],
};

const quickActions = [
  {
    title: 'View Conversations',
    icon: MessageSquare,
    path: '/dashboard/conversations',
    color: 'bg-blue-500',
  },
  {
    title: 'Manage Integrations',
    icon: Settings,
    path: '/dashboard/settings',
    color: 'bg-green-500',
  },
  {
    title: 'Customize Chatbot',
    icon: MessageSquare,
    path: '/dashboard/customize',
    color: 'bg-purple-500',
  },
  {
    title: 'Upgrade Plan',
    icon: CreditCard,
    path: '/dashboard/billing',
    color: 'bg-orange-500',
  },
];

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatbotActive, setIsChatbotActive] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="lg:pl-64">
        <main className="p-6">
          {/* Welcome Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome, {businessData.name}
                </h1>
                <p className="mt-1 text-gray-500">
                  Here's what's happening with your chatbot today
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Chatbot Status:</span>
                  <button
                    onClick={() => setIsChatbotActive(!isChatbotActive)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      isChatbotActive ? 'bg-botmatata-green' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                        isChatbotActive ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {businessData.subscription}
                  </span>
                  <Link
                    to="/dashboard/billing"
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-botmatata-coral text-white hover:bg-opacity-90 transition-colors"
                  >
                    Upgrade Now
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.path}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`${action.color} text-white p-3 rounded-lg`}
                  >
                    <action.icon size={24} />
                  </div>
                  <ArrowUpRight
                    className="text-gray-400"
                    size={20}
                  />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  {action.title}
                </h3>
              </Link>
            ))}
          </div>

          {/* Stats and Recent Chats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stats */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Chatbot Insights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500">Total Messages</div>
                  <div className="mt-1 text-2xl font-semibold">
                    {businessData.totalMessages.toLocaleString()}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500">
                    Engagement Rate
                  </div>
                  <div className="mt-1 text-2xl font-semibold">
                    {businessData.engagementRate}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Top Customer Inquiries
                </h3>
                <ul className="space-y-2">
                  {businessData.topInquiries.map((inquiry, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-2 text-sm text-gray-600"
                    >
                      <span className="w-5 h-5 rounded-full bg-botmatata-green bg-opacity-10 text-botmatata-green flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span>{inquiry}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recent Chats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Recent Chats
                </h2>
                <Link
                  to="/dashboard/conversations"
                  className="text-sm text-botmatata-blue hover:text-botmatata-coral"
                >
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {businessData.recentChats.map((chat) => (
                  <div
                    key={chat.id}
                    className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-botmatata-green bg-opacity-10 flex items-center justify-center">
                        <span className="text-sm font-medium text-botmatata-green">
                          {chat.customer.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {chat.customer}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {chat.message}
                      </p>
                    </div>
                    <div className="text-xs text-gray-400">
                      {chat.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;