import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Home,
  Settings,
  Upload,
  Plus,
  Trash2,
  MapIcon as WhatsappIcon,
  Instagram,
  Facebook,
  Bot,
  Clock,
  MessageSquare,
  Save,
  Eye,
  X,
  Send,
  ChevronDown,
} from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar';
import toast from 'react-hot-toast';

// Mock data for chat simulation
const sampleResponses = {
  hello: "Hi there! How can I assist you today?",
  deliver: "Yes! We offer deliveries within Nairobi. Standard delivery takes 24 hours. Would you like to place an order?",
  "delivery fee": "The delivery fee is KES 300 within Nairobi. Orders above KES 5,000 qualify for free delivery! 😊",
  order: "Great choice! Please share the additional details like size, color or type.",
  size: "Got it! The total cost including delivery is KES XXXX. Would you like to proceed with payment?",
  pay: "You can pay via M-Pesa! Send KES XXXX to Paybill XXXXX, Account: OrderXXX. Once done, reply with 'PAID' to confirm.",
  paid: "Thank you! Your payment has been received. Your order will be delivered within 24 hours. Expect a call from our delivery team soon!",
  thanks: "You're welcome! 😊 Have a great day!",
  default: "I'm not sure I understand. Could you please rephrase that or choose from our frequently asked questions?",
};

const platforms = [
  { id: 'whatsapp', name: 'WhatsApp', icon: WhatsappIcon, color: 'green' },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'pink' },
  { id: 'facebook', name: 'Messenger', icon: Facebook, color: 'blue' },
];

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Mock data
const initialSettings = {
  chatbotName: 'BotMatata Assistant',
  businessCategory: 'Retail',
  isActive: true,
  welcomeMessage: 'Hello! How can I help you today?',
  faqs: [
    { id: 1, question: 'What are your business hours?', answer: 'We are open Monday to Friday, 9 AM to 6 PM.' },
    { id: 2, question: 'How can I track my order?', answer: 'You can track your order using the tracking number sent to your email.' },
    { id: 3, question: 'Do you offer refunds?', answer: 'Yes, we offer refunds within 30 days of purchase.' },
  ],
  integrations: {
    whatsapp: { connected: true, number: '+254712345678' },
    instagram: { connected: false, account: '' },
    facebook: { connected: true, page: 'TechStart Solutions' },
  },
  aiSettings: {
    smartReplies: true,
    afterHours: {
      enabled: true,
      message: 'We are currently closed. We will respond to your message during business hours.',
      workingHours: {
        start: '09:00',
        end: '18:00',
      },
    },
  },
  branding: {
    logo: 'https://example.com/logo.png',
    themeColor: '#02d980',
  },
};

const businessCategories = [
  'Retail',
  'Restaurant',
  'Healthcare',
  'Education',
  'Technology',
  'Financial Services',
  'Other',
];

const ChatbotSettings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [settings, setSettings] = useState(initialSettings);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
  const [showPreview, setShowPreview] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isConfigured, setIsConfigured] = useState(true);

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  const handleAddFaq = () => {
    if (newFaq.question && newFaq.answer) {
      setSettings(prev => ({
        ...prev,
        faqs: [...prev.faqs, { id: Date.now(), ...newFaq }],
      }));
      setNewFaq({ question: '', answer: '' });
    }
  };

  const handleDeleteFaq = (id: number) => {
    setSettings(prev => ({
      ...prev,
      faqs: prev.faqs.filter(faq => faq.id !== id),
    }));
  };

  const handleIntegrationToggle = (platform: 'whatsapp' | 'instagram' | 'facebook') => {
    setSettings(prev => ({
      ...prev,
      integrations: {
        ...prev.integrations,
        [platform]: {
          ...prev.integrations[platform],
          connected: !prev.integrations[platform].connected,
        },
      },
    }));
    
    if (!settings.integrations[platform].connected) {
      toast.success(`Connected to ${platform} successfully!`);
    } else {
      toast.success(`Disconnected from ${platform}`);
    }
  };

  const getBotResponse = (message: string) => {
    const lowercaseMessage = message.toLowerCase();
    let response = sampleResponses.default;

    Object.entries(sampleResponses).forEach(([key, value]) => {
      if (lowercaseMessage.includes(key)) {
        response = value;
      }
    });

    return response;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="lg:pl-64">
        <main className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Link to="/dashboard" className="hover:text-gray-700">
                <Home size={16} />
              </Link>
              <ChevronRight size={16} className="mx-2" />
              <span>Chatbot Settings</span>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Chatbot Settings</h1>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowPreview(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </button>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-botmatata-coral hover:bg-opacity-90"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* General Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">General Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Chatbot Name</label>
                  <input
                    type="text"
                    value={settings.chatbotName}
                    onChange={(e) => setSettings({ ...settings, chatbotName: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Business Category</label>
                  <select
                    value={settings.businessCategory}
                    onChange={(e) => setSettings({ ...settings, businessCategory: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue sm:text-sm"
                  >
                    {businessCategories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Enable Chatbot</span>
                  <button
                    onClick={() => setSettings({ ...settings, isActive: !settings.isActive })}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      settings.isActive ? 'bg-botmatata-green' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                        settings.isActive ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Automated Responses & FAQs */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Automated Responses & FAQs</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Welcome Message</label>
                  <textarea
                    value={settings.welcomeMessage}
                    onChange={(e) => setSettings({ ...settings, welcomeMessage: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue sm:text-sm"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    {settings.faqs.map((faq) => (
                      <div key={faq.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{faq.question}</p>
                            <p className="mt-1 text-gray-600">{faq.answer}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteFaq(faq.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="border-t pt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Add New FAQ</h4>
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Question"
                          value={newFaq.question}
                          onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue sm:text-sm"
                        />
                        <textarea
                          placeholder="Answer"
                          value={newFaq.answer}
                          onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                          rows={2}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue sm:text-sm"
                        />
                        <button
                          onClick={handleAddFaq}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-botmatata-green hover:bg-opacity-90"
                        >
                          <Plus size={16} className="mr-2" />
                          Add FAQ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Integration Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Integration Settings</h2>
              <div className="space-y-4">
                {/* WhatsApp */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <WhatsappIcon className="h-6 w-6 text-green-500" />
                    <div>
                      <p className="font-medium text-gray-900">WhatsApp Business</p>
                      {settings.integrations.whatsapp.connected && (
                        <p className="text-sm text-gray-500">{settings.integrations.whatsapp.number}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleIntegrationToggle('whatsapp')}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      settings.integrations.whatsapp.connected
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {settings.integrations.whatsapp.connected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>

                {/* Instagram */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Instagram className="h-6 w-6 text-pink-500" />
                    <div>
                      <p className="font-medium text-gray-900">Instagram DM</p>
                      {settings.integrations.instagram.connected && (
                        <p className="text-sm text-gray-500">{settings.integrations.instagram.account}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleIntegrationToggle('instagram')}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      settings.integrations.instagram.connected
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-pink-500 text-white hover:bg-pink-600'
                    }`}
                  >
                    {settings.integrations.instagram.connected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>

                {/* Facebook */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Facebook className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900">Facebook Messenger</p>
                      {settings.integrations.facebook.connected && (
                        <p className="text-sm text-gray-500">{settings.integrations.facebook.page}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleIntegrationToggle('facebook')}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      settings.integrations.facebook.connected
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {settings.integrations.facebook.connected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              </div>
            </div>

            {/* Automation & AI Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Automation & AI Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">AI-Powered Smart Replies</p>
                    <p className="text-sm text-gray-500">Enable AI to handle common queries automatically</p>
                  </div>
                  <button
                    onClick={() => setSettings({
                      ...settings,
                      aiSettings: { ...settings.aiSettings, smartReplies: !settings.aiSettings.smartReplies }
                    })}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      settings.aiSettings.smartReplies ? 'bg-botmatata-green' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                        settings.aiSettings.smartReplies ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">After-Hours Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Enable After-Hours Response</span>
                      <button
                        onClick={() => setSettings({
                          ...settings,
                          aiSettings: {
                            ...settings.aiSettings,
                            afterHours: {
                              ...settings.aiSettings.afterHours,
                              enabled: !settings.aiSettings.afterHours.enabled
                            }
                          }
                        })}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          settings.aiSettings.afterHours.enabled ? 'bg-botmatata-green' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                            settings.aiSettings.afterHours.enabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Working Hours Start</label>
                        <input
                          type="time"
                          value={settings.aiSettings.afterHours.workingHours.start}
                          onChange={(e) => setSettings({
                            ...settings,
                            aiSettings: {
                              ...settings.aiSettings,
                              afterHours: {
                                ...settings.aiSettings.afterHours,
                                workingHours: {
                                  ...settings.aiSettings.afterHours.workingHours,
                                  start: e.target.value
                                }
                              }
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Working Hours End</label>
                        <input
                          type="time"
                          value={settings.aiSettings.afterHours.workingHours.end}
                          onChange={(e) => setSettings({
                            ...settings,
                            aiSettings: {
                              ...settings.aiSettings,
                              afterHours: {
                                ...settings.aiSettings.afterHours,
                                workingHours: {
                                  ...settings.aiSettings.afterHours.workingHours,
                                  end: e.target.value
                                }
                              }
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">After-Hours Message</label>
                      <textarea
                        value={settings.aiSettings.afterHours.message}
                        onChange={(e) => setSettings({
                          ...settings,
                          aiSettings: {
                            ...settings.aiSettings,
                            afterHours: {
                              ...settings.aiSettings.afterHours,
                              message: e.target.value
                            }
                          }
                        })}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Branding */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Custom Branding</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Business Logo</label>
                  <div className="mt-1 flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                      {settings.branding.logo ? (
                        <img
                          src={settings.branding.logo}
                          alt="Business logo"
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <Bot className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <button
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Logo
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Theme Color</label>
                  <div className="mt-1 flex items-center space-x-2">
                    <input
                      type="color"
                      value={settings.branding.themeColor}
                      onChange={(e) => setSettings({
                        ...settings,
                        branding: { ...settings.branding, themeColor: e.target.value }
                      })}
                      className="h-8 w-8 rounded-md border-0"
                    />
                    <input
                      type="text"
                      value={settings.branding.themeColor}
                      onChange={(e) => setSettings({
                        ...settings,
                        branding: { ...settings.branding, themeColor: e.target.value }
                      })}
                      className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Preview Side Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          showPreview ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Preview Header */}
          <div className="p-4 border-b flex items-center justify-between bg-white">
            <div>
              <h3 className="text-lg font-medium text-gray-900">BotMatata Preview</h3>
              <div className="mt-2">
                <div className="relative inline-block text-left">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-botmatata-blue"
                  >
                    <selectedPlatform.icon className={`h-4 w-4 text-${selectedPlatform.color}-500 mr-2`} />
                    {selectedPlatform.name}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowPreview(false)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Window */}
          {isConfigured ? (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-botmatata-green flex items-center justify-center mr-2">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-botmatata-blue text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs mt-1 opacity-75">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center">
              <div>
                <Bot className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Your chatbot is not fully set up. Please configure responses in Chatbot Settings
                  before previewing.
                </p>
              </div>
            </div>
          )}

          {/* Input Area */}
          {isConfigured && (
            <div className="p-4 border-t bg-white">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message to test the chatbot..."
                  className="flex-1 rounded-full border-gray-300 focus:border-botmatata-blue focus:ring-botmatata-blue"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 rounded-full bg-botmatata-green text-white hover:bg-opacity-90"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatbotSettings;