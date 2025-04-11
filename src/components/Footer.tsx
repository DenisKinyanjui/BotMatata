import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Bot } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center">
              <Bot className="h-8 w-8 text-botmatata-green" />
              <span className="ml-2 text-xl font-bold text-white">BotMatata</span>
            </div>
            <p className="mt-4 text-gray-400">
              Empowering businesses with intelligent chatbot solutions.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#features" className="text-base text-gray-300 hover:text-white">Features</a></li>
              <li><a href="#pricing" className="text-base text-gray-300 hover:text-white">Pricing</a></li>
              <li><a href="#testimonials" className="text-base text-gray-300 hover:text-white">Testimonials</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="/about" className="text-base text-gray-300 hover:text-white">About Us</a></li>
              <li><a href="/contact" className="text-base text-gray-300 hover:text-white">Contact</a></li>
              <li><a href="/careers" className="text-base text-gray-300 hover:text-white">Careers</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/legal" className="text-base text-gray-300 hover:text-white">
                  Terms & Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8">
          <div className="flex justify-between items-center">
            <p className="text-base text-gray-400">
              © {new Date().getFullYear()} BotMatata. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-botmatata-green">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-botmatata-green">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-botmatata-green">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-botmatata-green">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;