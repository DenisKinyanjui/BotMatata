import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Home,
  Search,
  Settings,
  MessageSquare,
  CreditCard,
  Code,
  User,
  HelpCircle,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  Send,
  Upload,
  Phone,
  Mail,
  Bot,
  AlertCircle,
} from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar';
import toast from 'react-hot-toast';

const categories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Settings,
    description: 'Setup tutorials, onboarding, FAQs',
    color: 'bg-blue-500',
  },
  {
    id: 'integrations',
    title: 'Integrations',
    icon: MessageSquare,
    description: 'WhatsApp, Instagram, Facebook guides',
    color: 'bg-green-500',
  },
  {
    id: 'chatbot',
    title: 'Chatbot Customization',
    icon: Bot,
    description: 'Bot behavior, training, settings',
    color: 'bg-purple-500',
  },
  {
    id: 'billing',
    title: 'Billing & Subscriptions',
    icon: CreditCard,
    description: 'Payments, upgrades, invoices',
    color: 'bg-orange-500',
  },
  {
    id: 'developer',
    title: 'Developer Help',
    icon: Code,
    description: 'API usage, webhooks, advanced tips',
    color: 'bg-red-500',
  },
  {
    id: 'account',
    title: 'Account Management',
    icon: User,
    description: 'Login issues, profile settings',
    color: 'bg-indigo-500',
  },
];

const faqs = [
  {
    category: 'getting-started',
    questions: [
      {
        id: 1,
        question: 'How do I get started with BotMatata?',
        answer: 'Getting started with BotMatata is easy! First, create an account, then follow our setup wizard to configure your chatbot. You can customize your bots responses and integrate it with your preferred messaging platforms.',
      },
      {
        id: 2,
        question: 'What platforms does BotMatata support?',
        answer: 'BotMatata currently supports WhatsApp Business API, Facebook Messenger, and Instagram Direct Messages. Were constantly working on adding more platforms to better serve your needs.',
      },
    ],
  },
  {
    category: 'integrations',
    questions: [
      {
        id: 3,
        question: 'How do I connect WhatsApp to BotMatata?',
        answer: 'To connect WhatsApp, go to Settings > Integrations, click on WhatsApp, and follow the step-by-step guide. Youll need a WhatsApp Business account and will need to complete the verification process.',
      },
      {
        id: 4,
        question: 'Why is my chatbot not responding?',
        answer: 'If your chatbot isnt responding, check: 1) Your integration status in Settings, 2) Your subscription status, 3) Your internet connection. If issues persist, contact our support team.',
      },
    ],
  },
  {
    category: 'billing',
    questions: [
      {
        id: 5,
        question: 'Can I switch from monthly to yearly plan?',
        answer: 'Yes! You can switch from monthly to yearly billing at any time. Go to Billing & Subscription page and click "Switch to Yearly". Youll save 15% compared to monthly billing.',
      },
      {
        id: 6,
        question: 'How do refunds work?',
        answer: 'We offer full refunds within 14 days of purchase if youre not satisfied with our service. Contact our support team with your request, and well process it within 3-5 business days.',
      },
    ],
  },
];

const Support = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('getting-started');
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const toggleQuestion = (questionId: number) => {
    setExpandedQuestions(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Support ticket submitted successfully! Well get back to you soon.');
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const handleFeedback = (helpful: boolean) => {
    toast.success(helpful ? 'Thanks for your feedback!' : 'Thanks for letting us know. Well improve this article.');
  };

  const filteredFaqs = faqs.flatMap(category => 
    category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
              <span>Help & Support</span>
            </div>
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900">How can we help you today?</h1>
              <p className="mt-2 text-gray-600">
                Find answers, read tutorials, or reach out to our team
              </p>
              <div className="mt-6 relative">
                <input
                  type="text"
                  placeholder="Search help articles..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-botmatata-blue"
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow ${
                  selectedCategory === category.id ? 'ring-2 ring-botmatata-blue' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${category.color} text-white`}>
                    <category.icon size={24} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-medium text-gray-900">{category.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{category.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {(searchTerm ? filteredFaqs : faqs.find(f => f.category === selectedCategory)?.questions)?.map((faq) => (
                <div key={faq.id} className="border rounded-lg">
                  <button
                    onClick={() => toggleQuestion(faq.id)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-500 transform transition-transform ${
                        expandedQuestions.includes(faq.id) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expandedQuestions.includes(faq.id) && (
                    <div className="px-4 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                      <div className="mt-4 flex items-center space-x-4">
                        <span className="text-sm text-gray-500">Was this helpful?</span>
                        <button
                          onClick={() => handleFeedback(true)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <ThumbsUp className="h-5 w-5 text-gray-400" />
                        </button>
                        <button
                          onClick={() => handleFeedback(false)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <ThumbsDown className="h-5 w-5 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Need more help?</h2>
              <p className="text-gray-600 mb-6">
                Our support team is here to help. We typically respond within 24 hours.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-4 border rounded-lg">
                  <Phone className="h-6 w-6 text-botmatata-blue mb-2" />
                  <h3 className="font-medium text-gray-900">Phone Support</h3>
                  <p className="text-gray-600 mt-1">+254 712 345 678</p>
                  <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9AM-6PM EAT</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <Mail className="h-6 w-6 text-botmatata-blue mb-2" />
                  <h3 className="font-medium text-gray-900">Email Support</h3>
                  <p className="text-gray-600 mt-1">support@botmatata.com</p>
                  <p className="text-sm text-gray-500 mt-1">24/7 Response</p>
                </div>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue"
                    required
                  />
                </div>
                <div>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Attach Screenshot
                  </button>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-botmatata-blue hover:bg-opacity-90"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Support;