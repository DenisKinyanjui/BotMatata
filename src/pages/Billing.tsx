import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  ChevronRight,
  Home,
  Download,
  Check,
  AlertCircle,
  X,
  Plus,
  Phone,
} from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar';
import toast from 'react-hot-toast';

// Mock data for billing history
const billingHistory = [
  {
    id: 'INV-2024-001',
    date: '2024-03-01',
    amount: 'KES 1,300',
    status: 'Paid',
    paymentMethod: 'M-Pesa',
  },
  {
    id: 'INV-2024-002',
    date: '2024-02-01',
    amount: 'KES 1,300',
    status: 'Paid',
    paymentMethod: 'M-Pesa',
  },
  {
    id: 'INV-2024-003',
    date: '2024-01-01',
    amount: 'KES 1,300',
    status: 'Paid',
    paymentMethod: 'M-Pesa',
  },
];

const plans = [
  {
    name: 'Freemium',
    price: '0',
    interval: 'month',
    features: [
      '10 responses/day',
      'Limited Integrations',
      'Basic Support',
      'Standard Features',
    ],
    cta: 'Current Plan',
    disabled: true,
  },
  {
    name: 'Pro Monthly',
    price: '1,300',
    interval: 'month',
    features: [
      'Unlimited responses',
      'All Platform Integrations',
      'Priority Support',
      'Advanced Analytics',
    ],
    cta: 'Upgrade to Pro Monthly',
    popular: true,
  },
  {
    name: 'Pro Yearly',
    price: '13,200',
    interval: 'year',
    features: [
      'All Pro Monthly features',
      'Save KES 2,400 annually',
      'Priority Support',
      'Early Access to Features',
    ],
    cta: 'Upgrade to Pro Yearly',
    priceSubtext: '(KES 1,100/month)',
  },
];

const Billing = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('+254');

  const handleUpgrade = (plan: string) => {
    setShowPaymentModal(true);
  };

  const handlePayment = () => {
    if (paymentMethod === 'mpesa' && !phoneNumber.match(/^\+254\d{9}$/)) {
      toast.error('Please enter a valid phone number');
      return;
    }
    
    toast.success('Processing payment...');
    setShowPaymentModal(false);
    
    // Simulate payment processing
    setTimeout(() => {
      toast.success('Upgrade successful! Welcome to Pro!');
    }, 2000);
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
              <span>Billing & Subscription</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your plan, view invoices, and update payment settings
                </p>
              </div>
            </div>
          </div>

          {/* Current Plan Overview */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Current Plan</h2>
                <p className="mt-1 text-sm text-gray-500">Your subscription details and usage</p>
              </div>
              <div className="flex items-center">
                <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                  Active
                </span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Plan</p>
                <p className="mt-2 text-lg font-medium text-gray-900">Freemium</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Billing Cycle</p>
                <p className="mt-2 text-lg font-medium text-gray-900">Monthly</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Next Payment</p>
                <p className="mt-2 text-lg font-medium text-gray-900">April 1, 2024</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Usage</p>
                <p className="mt-2 text-lg font-medium text-gray-900">8/10 responses today</p>
              </div>
            </div>
          </div>

          {/* Available Plans */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Available Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative bg-white rounded-xl shadow-sm p-6 ${
                    plan.popular ? 'ring-2 ring-botmatata-blue' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                      <span className="inline-flex rounded-full bg-botmatata-blue px-4 py-1 text-sm font-semibold text-white">
                        Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                  <p className="mt-4 flex items-baseline text-gray-900">
                    <span className="text-4xl font-extrabold tracking-tight">KES {plan.price}</span>
                    <span className="ml-1 text-xl font-semibold">/{plan.interval}</span>
                  </p>
                  {plan.priceSubtext && (
                    <p className="mt-1 text-sm text-gray-500">{plan.priceSubtext}</p>
                  )}
                  <ul role="list" className="mt-6 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex">
                        <Check className="flex-shrink-0 w-5 h-5 text-botmatata-green" />
                        <span className="ml-3 text-sm text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleUpgrade(plan.name)}
                    disabled={plan.disabled}
                    className={`mt-8 block w-full py-3 px-6 border rounded-md text-center font-medium ${
                      plan.disabled
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : plan.popular
                        ? 'bg-botmatata-blue text-white hover:bg-opacity-90'
                        : 'bg-white border-gray-300 text-botmatata-blue hover:bg-gray-50'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Payment Method</h2>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="ml-3 text-sm text-gray-900">M-Pesa (+254712345678)</span>
              </div>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="text-sm text-botmatata-blue hover:text-botmatata-coral"
              >
                Update
              </button>
            </div>
          </div>

          {/* Billing History */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Billing History</h2>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                Download All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Download
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {billingHistory.map((invoice) => (
                    <tr key={invoice.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {invoice.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {invoice.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {invoice.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {invoice.paymentMethod}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-botmatata-blue hover:text-botmatata-coral">
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Update Payment Method</h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue sm:text-sm"
                >
                  <option value="mpesa">M-Pesa</option>
                  <option value="card">Credit/Debit Card</option>
                </select>
              </div>
              {paymentMethod === 'mpesa' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    M-Pesa Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+254712345678"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue sm:text-sm"
                  />
                </div>
              )}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue sm:text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        CVC
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}
              <button
                onClick={handlePayment}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-botmatata-blue hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-botmatata-blue"
              >
                Update Payment Method
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;