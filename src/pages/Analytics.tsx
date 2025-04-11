import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, Download, Calendar, MessageSquare, Send, Users, TrendingUp, ChevronRight, Home, MapIcon as WhatsappIcon, Instagram, Facebook, Filter } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { format } from 'date-fns';
import DashboardSidebar from '../components/DashboardSidebar';

// Mock data for analytics
const messageData = [
  { date: '2024-03-01', incoming: 45, outgoing: 52 },
  { date: '2024-03-02', incoming: 38, outgoing: 42 },
  { date: '2024-03-03', incoming: 52, outgoing: 61 },
  { date: '2024-03-04', incoming: 40, outgoing: 44 },
  { date: '2024-03-05', incoming: 65, outgoing: 72 },
  { date: '2024-03-06', incoming: 48, outgoing: 53 },
  { date: '2024-03-07', incoming: 55, outgoing: 59 },
];

const platformData = [
  { name: 'WhatsApp', value: 60 },
  { name: 'Instagram', value: 25 },
  { name: 'Facebook', value: 15 },
];

const engagementData = [
  { time: '9AM', engagement: 45 },
  { time: '12PM', engagement: 75 },
  { time: '3PM', engagement: 85 },
  { time: '6PM', engagement: 65 },
  { time: '9PM', engagement: 40 },
];

const responseData = [
  { name: 'Quick Replies', value: 65 },
  { name: 'Manual Responses', value: 35 },
];

const conversationLogs = [
  {
    id: 1,
    date: '2024-03-07',
    customer: 'John Doe',
    platform: 'whatsapp',
    messageCount: 12,
    outcome: 'Resolved',
  },
  {
    id: 2,
    date: '2024-03-07',
    customer: 'Sarah Smith',
    platform: 'instagram',
    messageCount: 8,
    outcome: 'Pending',
  },
  {
    id: 3,
    date: '2024-03-06',
    customer: 'Mike Johnson',
    platform: 'facebook',
    messageCount: 15,
    outcome: 'Resolved',
  },
  {
    id: 4,
    date: '2024-03-06',
    customer: 'Emily Brown',
    platform: 'whatsapp',
    messageCount: 6,
    outcome: 'Resolved',
  },
  {
    id: 5,
    date: '2024-03-05',
    customer: 'David Wilson',
    platform: 'instagram',
    messageCount: 10,
    outcome: 'Pending',
  },
];

const COLORS = ['#02d980', '#E6A8D7', '#003366'];

const Analytics = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState('7days');

  const metrics = {
    totalConversations: 1234,
    messagesSent: 5678,
    engagementRate: '78%',
    conversionRate: '25%',
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'whatsapp':
        return <WhatsappIcon className="h-4 w-4 text-green-500" />;
      case 'instagram':
        return <Instagram className="h-4 w-4 text-pink-500" />;
      case 'facebook':
        return <Facebook className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
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
              <span>Analytics</span>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
              <div className="flex items-center space-x-4">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue"
                >
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="custom">Custom Range</option>
                </select>
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-botmatata-coral hover:bg-opacity-90">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </button>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-green-100">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Conversations</p>
                  <h3 className="text-2xl font-bold text-gray-900">{metrics.totalConversations}</h3>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-100">
                  <Send className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Messages Sent</p>
                  <h3 className="text-2xl font-bold text-gray-900">{metrics.messagesSent}</h3>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-purple-100">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Engagement Rate</p>
                  <h3 className="text-2xl font-bold text-gray-900">{metrics.engagementRate}</h3>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-orange-100">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                  <h3 className="text-2xl font-bold text-gray-900">{metrics.conversionRate}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Messages Overview */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Messages Overview</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={messageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(date) => format(new Date(date), 'MMM d')}
                    />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="incoming"
                      stackId="1"
                      stroke="#02d980"
                      fill="#02d980"
                      fillOpacity={0.3}
                      name="Incoming"
                    />
                    <Area
                      type="monotone"
                      dataKey="outgoing"
                      stackId="1"
                      stroke="#003366"
                      fill="#003366"
                      fillOpacity={0.3}
                      name="Outgoing"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Engagement Trends */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Engagement Trends</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="engagement" fill="#02d980" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Platform Distribution */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Customer Sources</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Response Effectiveness */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Response Effectiveness</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={responseData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label
                    >
                      <Cell fill="#02d980" />
                      <Cell fill="#003366" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Conversation Logs */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Conversation Logs</h2>
              <div className="flex items-center space-x-4">
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </button>
                <button className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-botmatata-coral hover:bg-opacity-90">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Platform
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Messages
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Outcome
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {conversationLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {format(new Date(log.date), 'MMM d, yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {log.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getPlatformIcon(log.platform)}
                          <span className="ml-2 text-sm text-gray-900">
                            {log.platform.charAt(0).toUpperCase() + log.platform.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {log.messageCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            log.outcome === 'Resolved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {log.outcome}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;