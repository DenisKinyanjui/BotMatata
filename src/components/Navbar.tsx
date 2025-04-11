import { Bot, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
                to="/">
          <div className="flex items-center">
            <Bot className="h-8 w-8 text-botmatata-green" />
            <span className="ml-2 text-xl font-bold text-gray-900">BotMatata</span>
          </div>
            </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-botmatata-blue transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-botmatata-blue transition-colors">Pricing</a>
            <a href="#testimonials" className="text-gray-600 hover:text-botmatata-blue transition-colors">Testimonials</a>
            <Link 
              to="/signup"
              className="bg-botmatata-coral text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Get Started
            </Link>
            <Link 
              to="/login"
              className="text-botmatata-blue hover:text-botmatata-coral transition-colors"
            >
              Sign In
            </Link>
          </div>

          <div className="md:hidden">
            <Menu className="h-6 w-6 text-gray-600" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;