import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Download } from 'lucide-react';
import Navbar from '../components/Navbar';

const Legal = () => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>('terms');

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Homepage
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900">Legal Information</h1>
            <p className="mt-2 text-lg text-gray-600">
              Understand our terms of service and how we handle your data
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="border rounded-lg p-1 bg-white">
              <button
                onClick={() => setActiveTab('terms')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'terms'
                    ? 'bg-botmatata-blue text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Terms of Service
              </button>
              <button
                onClick={() => setActiveTab('privacy')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'privacy'
                    ? 'bg-botmatata-blue text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Privacy Policy
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-sm">
            {activeTab === 'terms' ? (
              <div className="p-8">
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms of Service</h2>
                  
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h3>
                    <p className="text-gray-600 mb-4">
                      By accessing or using BotMatata's services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Use of Service</h3>
                    <p className="text-gray-600 mb-4">
                      Our service is designed to help businesses automate their customer interactions through AI-powered chatbots. You agree to use the service only for lawful purposes and in accordance with these Terms.
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 mb-4">
                      <li>Do not use the service for any illegal activities</li>
                      <li>Do not attempt to breach or test our security measures</li>
                      <li>Do not interfere with other users' access to the service</li>
                      <li>Do not use the service to send spam or unsolicited messages</li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Account Responsibilities</h3>
                    <p className="text-gray-600 mb-4">
                      You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">4. Service Availability</h3>
                    <p className="text-gray-600 mb-4">
                      We strive to provide uninterrupted service but may need to perform maintenance or updates. We are not liable for any service interruptions or data loss.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">5. Termination</h3>
                    <p className="text-gray-600 mb-4">
                      We may terminate or suspend your account at any time for violations of these terms. You may also terminate your account at any time by contacting our support team.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">6. Governing Law</h3>
                    <p className="text-gray-600">
                      These terms are governed by the laws of Kenya. Any disputes shall be resolved in the courts of Kenya.
                    </p>
                  </section>
                </div>
              </div>
            ) : (
              <div className="p-8">
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy Policy</h2>

                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Information We Collect</h3>
                    <p className="text-gray-600 mb-4">We collect the following types of information:</p>
                    <ul className="list-disc pl-6 text-gray-600 mb-4">
                      <li>Personal information (name, email, phone number)</li>
                      <li>Business information</li>
                      <li>Usage data and analytics</li>
                      <li>Chat logs and conversation history</li>
                      <li>Payment information</li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">2. How We Use Information</h3>
                    <p className="text-gray-600 mb-4">Your information is used to:</p>
                    <ul className="list-disc pl-6 text-gray-600 mb-4">
                      <li>Provide and improve our services</li>
                      <li>Personalize your experience</li>
                      <li>Process payments</li>
                      <li>Send service updates and marketing communications</li>
                      <li>Analyze usage patterns and improve our platform</li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Data Sharing</h3>
                    <p className="text-gray-600 mb-4">
                      We may share your information with third parties only in the following circumstances:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 mb-4">
                      <li>With your explicit consent</li>
                      <li>To process payments</li>
                      <li>To comply with legal obligations</li>
                      <li>With service providers who assist in our operations</li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">4. Data Security</h3>
                    <p className="text-gray-600 mb-4">
                      We implement appropriate security measures to protect your information:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 mb-4">
                      <li>Encryption of data in transit and at rest</li>
                      <li>Regular security audits</li>
                      <li>Access controls and authentication</li>
                      <li>Secure data centers</li>
                    </ul>
                  </section>

                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">5. Your Rights</h3>
                    <p className="text-gray-600 mb-4">You have the right to:</p>
                    <ul className="list-disc pl-6 text-gray-600 mb-4">
                      <li>Access your personal data</li>
                      <li>Correct inaccurate data</li>
                      <li>Request deletion of your data</li>
                      <li>Object to data processing</li>
                      <li>Data portability</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">6. Contact Information</h3>
                    <p className="text-gray-600">
                      For privacy-related concerns, please contact our Data Protection Officer at:
                      <br />
                      Email: privacy@botmatata.com
                      <br />
                      Phone: +254 712 345 678
                    </p>
                  </section>
                </div>
              </div>
            )}
          </div>

          {/* Download Button */}
          <div className="mt-8 text-center">
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-botmatata-blue hover:bg-opacity-90">
              <Download className="h-4 w-4 mr-2" />
              Download as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;