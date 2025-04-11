import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Bell, MoreVertical, Paperclip, Send, Smile, Circle, MapIcon as WhatsappIcon, Instagram, Facebook, Bot, ChevronRight, Home, Tag, Clock, CheckCheck, Phone, Mail, User, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import DashboardSidebar from '../components/DashboardSidebar';

// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    customer: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      phone: '+254712345678',
      email: 'sarah.j@example.com',
      platform: 'whatsapp',
      status: 'online',
      lastSeen: new Date(),
    },
    messages: [
      {
        id: 1,
        text: 'Hi, I need help with my recent order',
        sender: 'customer',
        timestamp: new Date(Date.now() - 3600000),
        read: true,
      },
      {
        id: 2,
        text: 'Hello Sarah! Id be happy to help. Could you please provide your order number?',
        sender: 'business',
        timestamp: new Date(Date.now() - 3500000),
        read: true,
      },
      {
        id: 3,
        text: 'Sure, its #ORD123456',
        sender: 'customer',
        timestamp: new Date(Date.now() - 3400000),
        read: false,
      },
    ],
    unread: 1,
    tags: ['New', 'Priority'],
    notes: 'Premium customer, handle with priority',
    orders: [
      {
        id: 'ORD123456',
        date: '2024-03-15',
        status: 'Processing',
        amount: 'KES 5,000',
      },
    ],
  },
  {
    id: 2,
    customer: {
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      phone: '+254723456789',
      email: 'john.s@example.com',
      platform: 'instagram',
      status: 'offline',
      lastSeen: new Date(Date.now() - 7200000),
    },
    messages: [
      {
        id: 1,
        text: 'Do you ship internationally?',
        sender: 'customer',
        timestamp: new Date(Date.now() - 86400000),
        read: true,
      },
      {
        id: 2,
        text: 'Yes, we do! Shipping costs vary by location. Which country are you in?',
        sender: 'business',
        timestamp: new Date(Date.now() - 85400000),
        read: true,
      },
    ],
    unread: 0,
    tags: ['Inquiry'],
    notes: 'International shipping inquiry',
    orders: [],
  },
  {
    id: 3,
    customer: {
      name: 'Emily Brown',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      phone: '+254734567890',
      email: 'emily.b@example.com',
      platform: 'facebook',
      status: 'offline',
      lastSeen: new Date(Date.now() - 3600000),
    },
    messages: [
      {
        id: 1,
        text: 'What are your business hours?',
        sender: 'customer',
        timestamp: new Date(Date.now() - 172800000),
        read: true,
      },
      {
        id: 2,
        text: 'Were open Monday to Friday, 9 AM to 6 PM EAT',
        sender: 'business',
        timestamp: new Date(Date.now() - 171800000),
        read: true,
      },
    ],
    unread: 0,
    tags: ['Resolved'],
    notes: 'Regular customer',
    orders: [],
  },
];

const quickReplies = [
  {
    id: 1,
    title: 'Greeting',
    message: 'Hello! How can I assist you today?',
  },
  {
    id: 2,
    title: 'Thank You',
    message: 'Thank you for your patience. Is there anything else I can help you with?',
  },
  {
    id: 3,
    title: 'Closing',
    message: 'Thank you for contacting us. Have a great day!',
  },
];

const Conversations = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [selectedConversation?.messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: newMessage,
      sender: 'business',
      timestamp: new Date(),
      read: false,
    };

    setSelectedConversation(prev => ({
      ...prev,
      messages: [...prev.messages, newMsg],
    }));

    setNewMessage('');

    // Simulate customer typing
    setTimeout(() => setIsTyping(true), 1000);
    setTimeout(() => {
      setIsTyping(false);
      const response = {
        id: Date.now() + 1,
        text: 'Thank you for your response! Ill check that and get back to you.',
        sender: 'customer',
        timestamp: new Date(),
        read: false,
      };
      setSelectedConversation(prev => ({
        ...prev,
        messages: [...prev.messages, response],
      }));
    }, 3000);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'whatsapp':
        return <WhatsappIcon className="h-5 w-5 text-green-500" />;
      case 'instagram':
        return <Instagram className="h-5 w-5 text-pink-500" />;
      case 'facebook':
        return <Facebook className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getChatBubbleStyle = (platform: string, isBusinessMessage: boolean) => {
    if (isBusinessMessage) {
      switch (platform) {
        case 'instagram':
          return 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white';
        case 'facebook':
          return 'bg-blue-600 text-white';
        case 'whatsapp':
        default:
          return 'bg-botmatata-blue text-white';
      }
    } else {
      return 'bg-white text-gray-900';
    }
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.messages.some(msg => msg.text.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesPlatform = platformFilter === 'all' || conv.customer.platform === platformFilter;
    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'unread' && conv.unread > 0) ||
      (statusFilter === 'replied' && conv.messages[conv.messages.length - 1].sender === 'business');
    
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="lg:pl-64">
        <div className="flex h-screen">
          {/* Left Panel - Chat List */}
          <div className="w-80 border-r bg-white">
            {/* Header */}
            <div className="p-4 border-b">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Link to="/dashboard" className="hover:text-gray-700">
                  <Home size={16} />
                </Link>
                <ChevronRight size={16} className="mx-2" />
                <span>Conversations</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-botmatata-blue"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-center mt-4 space-x-2">
                <select
                  value={platformFilter}
                  onChange={(e) => setPlatformFilter(e.target.value)}
                  className="flex-1 rounded-md border-gray-300 text-sm"
                >
                  <option value="all">All Platforms</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="flex-1 rounded-md border-gray-300 text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="unread">Unread</option>
                  <option value="replied">Replied</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Chat List */}
            <div className="overflow-y-auto h-[calc(100vh-180px)]">
              {filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedConversation?.id === conv.id ? 'bg-gray-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <img
                        src={conv.customer.avatar}
                        alt={conv.customer.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {conv.customer.status === 'online' && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm font-medium ${conv.unread > 0 ? 'text-gray-900' : 'text-gray-700'}`}>
                          {conv.customer.name}
                        </h3>
                        <div className="flex items-center">
                          {getPlatformIcon(conv.customer.platform)}
                          {conv.unread > 0 && (
                            <span className="ml-2 bg-botmatata-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {conv.messages[conv.messages.length - 1].text}
                      </p>
                      <span className="text-xs text-gray-400">
                        {formatDistanceToNow(conv.messages[conv.messages.length - 1].timestamp, { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Chat Window */}
          {selectedConversation ? (
            <div className="flex-1 flex flex-col bg-gray-50">
              {/* Chat Header */}
              <div className="p-4 bg-white border-b flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedConversation.customer.avatar}
                    alt={selectedConversation.customer.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">
                      {selectedConversation.customer.name}
                    </h2>
                    <div className="flex items-center text-sm text-gray-500">
                      {getPlatformIcon(selectedConversation.customer.platform)}
                      <span className="ml-2">
                        {selectedConversation.customer.status === 'online'
                          ? 'Online'
                          : `Last seen ${formatDistanceToNow(selectedConversation.customer.lastSeen, { addSuffix: true })}`}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <MoreVertical className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Chat Messages */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
              >
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'business' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'customer' && (
                      <img
                        src={selectedConversation.customer.avatar}
                        alt={selectedConversation.customer.name}
                        className="w-8 h-8 rounded-full object-cover mr-2"
                      />
                    )}
                    <div
                      className={`max-w-xl px-4 py-2 rounded-lg ${
                        getChatBubbleStyle(selectedConversation.customer.platform, message.sender === 'business')
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div className="flex items-center justify-end mt-1 space-x-1">
                        <span className={`text-xs ${message.sender === 'business' ? 'text-white/75' : 'text-gray-500'}`}>
                          {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                        </span>
                        {message.sender === 'business' && (
                          <CheckCheck
                            className={`h-4 w-4 ${message.read ? 'text-white' : 'text-white/50'}`}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center space-x-2 text-gray-500">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                    <span className="text-sm">Customer is typing...</span>
                  </div>
                )}
              </div>

              {/* Quick Replies */}
              <div className="p-2 bg-white border-t">
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply.id}
                      onClick={() => setNewMessage(reply.message)}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full whitespace-nowrap hover:bg-gray-200"
                    >
                      {reply.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 bg-white border-t">
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Smile className="h-5 w-5 text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Paperclip className="h-5 w-5 text-gray-500" />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-botmatata-blue"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className={`p-2 rounded-full ${
                      newMessage.trim()
                        ? 'bg-botmatata-blue text-white hover:bg-opacity-90'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Select a conversation to start chatting</p>
              </div>
            </div>
          )}

          {/* Right Panel - Customer Info */}
          {selectedConversation && (
            <div className="w-80 border-l bg-white p-4">
              <div className="text-center mb-6">
                <img
                  src={selectedConversation.customer.avatar}
                  alt={selectedConversation.customer.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-2"
                />
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedConversation.customer.name}
                </h3>
                <p className="text-sm text-gray-500">Customer since March 2024</p>
              </div>

              <div className="space-y-6">
                {/* Contact Info */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="h-4 w-4 mr-2" />
                      {selectedConversation.customer.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail className="h-4 w-4 mr-2" />
                      {selectedConversation.customer.email}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedConversation.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Notes</h4>
                  <textarea
                    value={selectedConversation.notes}
                    onChange={() => {}}
                    className="w-full h-24 text-sm border rounded-md p-2"
                    placeholder="Add notes about this customer..."
                  />
                </div>

                {/* Order History */}
                {selectedConversation.orders.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Orders</h4>
                    {selectedConversation.orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-gray-50 rounded-lg p-3 text-sm"
                      >
                        <div className="flex justify-between text-gray-700">
                          <span>{order.id}</span>
                          <span>{order.amount}</span>
                        </div>
                        <div className="flex justify-between text-gray-500 mt-1">
                          <span>{order.date}</span>
                          <span>{order.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Conversations;