'use client'

import { useState } from 'react';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Login data:', formData);
      // Handle login logic here
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-white items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="w-64 h-64 mx-auto mb-8 bg-[#bb00cc] bg-opacity-10 rounded-full flex items-center justify-center">
  <span className="text-9xl"></span>
</div>
          <h2 className="text-3xl font-bold text-[#302652] mb-4">Welcome Back Rider!</h2>
          <p className="text-gray-600 text-lg">
            Sign in to access your account and continue your riding journey with us.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#302652]">Sign In</h1>
            <p className="text-gray-600 mt-2">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#bb00cc] focus:border-transparent transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'
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
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#bb00cc] focus:border-transparent transition-all ${errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-[#bb00cc] border-gray-300 rounded focus:ring-[#bb00cc]" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-[#bb00cc] hover:text-[#302652] transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#bb00cc] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#a500b8] transition-all duration-200 text-lg"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="text-[#bb00cc] font-semibold hover:text-[#302652] transition-colors">
                Create one here
              </a>
            </p>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[#302652]">500+</div>
              <div className="text-sm text-gray-600">Riders</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#302652]">1.2k</div>
              <div className="text-sm text-gray-600">Vehicles</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#302652]">99%</div>
              <div className="text-sm text-gray-600">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}