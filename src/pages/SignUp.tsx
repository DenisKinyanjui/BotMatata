import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Facebook, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';

const businessTypes = [
  'E-commerce',
  'Hospitality',
  'Retail',
  'Healthcare',
  'Education',
  'Technology',
  'Financial Services',
  'Other'
];

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    businessName: 'Demo Business',
    fullName: 'John Doe',
    email: 'demo@example.com',
    phone: '+254712345678',
    password: 'Password123',
    confirmPassword: 'Password123',
    businessType: 'Technology',
    agreeToTerms: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.businessName) newErrors.businessName = 'Business name is required';
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+(?:[0-9] ?){6,14}[0-9]$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format (e.g., +254XXXXXXXXX)';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with one uppercase letter and one number';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.businessType) newErrors.businessType = 'Business type is required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success('Account created successfully!');
      navigate('/login');
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.success(`Signing up with ${provider}`);
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => 
      typeof value === 'boolean' ? true : Boolean(value)
    ) && formData.agreeToTerms;
  };

  return (
    <div>
      <Navbar/>
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-botmatata-blue hover:text-botmatata-coral">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                Business Name
              </label>
              <input
                id="businessName"
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue sm:text-sm ${
                  errors.businessName ? 'border-red-500' : ''
                }`}
              />
              {errors.businessName && (
                <p className="mt-2 text-sm text-red-600">{errors.businessName}</p>
              )}
            </div>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue sm:text-sm ${
                  errors.fullName ? 'border-red-500' : ''
                }`}
              />
              {errors.fullName && (
                <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue sm:text-sm ${
                  errors.email ? 'border-red-500' : ''
                }`}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+254XXXXXXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue sm:text-sm ${
                  errors.phone ? 'border-red-500' : ''
                }`}
              />
              {errors.phone && (
                <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">
                Business Type
              </label>
              <select
                id="businessType"
                value={formData.businessType}
                onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue sm:text-sm ${
                  errors.businessType ? 'border-red-500' : ''
                }`}
              >
                <option value="">Select a business type</option>
                {businessTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.businessType && (
                <p className="mt-2 text-sm text-red-600">{errors.businessType}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue sm:text-sm ${
                    errors.password ? 'border-red-500' : ''
                  }`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-botmatata-blue focus:ring-botmatata-blue sm:text-sm ${
                  errors.confirmPassword ? 'border-red-500' : ''
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
                className="h-4 w-4 text-botmatata-blue focus:ring-botmatata-blue border-gray-300 rounded"
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <a href="#" className="text-botmatata-blue hover:text-botmatata-coral">
                  Terms and Conditions
                </a>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="mt-2 text-sm text-red-600">{errors.agreeToTerms}</p>
            )}

            <button
              type="submit"
              disabled={!isFormValid()}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isFormValid()
                  ? 'bg-botmatata-coral hover:bg-opacity-90'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Create Account
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSocialLogin('Google')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <Mail className="h-5 w-5 text-red-500" />
                <span className="ml-2">Google</span>
              </button>
              <button
                onClick={() => handleSocialLogin('Facebook')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <Facebook className="h-5 w-5 text-blue-600" />
                <span className="ml-2">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
  );
};

export default SignUp;