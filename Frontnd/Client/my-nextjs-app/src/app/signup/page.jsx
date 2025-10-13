'use client'

import { useState } from 'react';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Signup data:', formData);
      // Handle signup logic here
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#302652]">Create Account</h1>
            <p className="text-gray-600 mt-2">Join our riding community today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#bb00cc] focus:border-transparent transition-all ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="First name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#bb00cc] focus:border-transparent transition-all ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Last name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#bb00cc] focus:border-transparent transition-all ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#bb00cc] focus:border-transparent transition-all ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Create a password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#bb00cc] focus:border-transparent transition-all ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#bb00cc] border-gray-300 rounded focus:ring-[#bb00cc] mt-1"
                />
                <span className="ml-2 text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="#" className="text-[#bb00cc] hover:text-[#302652]">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-[#bb00cc] hover:text-[#302652]">
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#bb00cc] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#a500b8] transition-all duration-200 text-lg"
            >
              Create Account
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-[#bb00cc] font-semibold hover:text-[#302652] transition-colors">
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-white items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="w-64 h-64 mx-auto mb-8 bg-[#bb00cc] bg-opacity-10 rounded-full flex items-center justify-center">
            <svg className="w-32 h-32 text-[#bb00cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-[#302652] mb-4">Start Your Riding Journey!</h2>
          <p className="text-gray-600 text-lg mb-6">
            Join thousands of riders who trust us for their motorcycle and bicycle needs.
          </p>
          
          {/* Benefits List */}
          <div className="space-y-4 text-left">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-[#bb00cc] bg-opacity-10 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-[#bb00cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <span className="text-gray-700">Exclusive member discounts</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-[#bb00cc] bg-opacity-10 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-[#bb00cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <span className="text-gray-700">Early access to new arrivals</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-[#bb00cc] bg-opacity-10 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-[#bb00cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <span className="text-gray-700">Personalized recommendations</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-[#bb00cc] bg-opacity-10 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-[#bb00cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <span className="text-gray-700">24/7 customer support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}