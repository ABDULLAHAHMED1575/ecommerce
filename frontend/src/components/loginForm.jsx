import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Sparkles, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { login } from '../services/auth.service';
import { saveUserData } from '../utils/auth';
import { showErrorMessage, showSuccessMessage } from '../utils/helper';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = await login(formData.email, formData.password);
      saveUserData(userData);
      
      showSuccessMessage('Login successful!');
      if (userData.role && userData.role.name === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      showErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-violet-200/50 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-100 to-rose-100 rounded-full blur-2xl opacity-50"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl mb-4 shadow-xl">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-black text-slate-800 mb-2">
                Welcome Back!
              </h2>
              <p className="text-slate-600 font-medium">
                Sign in to continue to ShopVerse
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-md flex items-center justify-center">
                    <Mail className="w-2.5 h-2.5 text-white" />
                  </div>
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-violet-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-violet-500/30 focus:border-violet-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-700 placeholder-violet-400/70 font-medium"
                    placeholder="Enter your email address"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                      <Mail className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-md flex items-center justify-center">
                    <Lock className="w-2.5 h-2.5 text-white" />
                  </div>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-12 py-4 border-2 border-violet-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-violet-500/30 focus:border-violet-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-700 placeholder-violet-400/70 font-medium"
                    placeholder="Enter your password"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                      <Lock className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full py-4 px-6 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-500 transform ${
                  loading 
                    ? 'bg-slate-400 cursor-not-allowed text-white' 
                    : 'bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700 hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-800 text-white hover:scale-105 hover:-translate-y-1 hover:shadow-violet-500/30'
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing you in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </div>
              </button>
            </form>
            <div className="mt-8 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-violet-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500 font-medium">New to ShopVerse?</span>
                </div>
              </div>
              
              <div className="mt-6">
                <Link 
                  to="/register" 
                  className="group inline-flex items-center gap-2 text-slate-600 hover:text-violet-600 font-semibold transition-all duration-300"
                >
                  <Sparkles className="w-4 h-4 group-hover:animate-spin transition-transform duration-300" />
                  <span className="group-hover:underline">Create your account</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 text-violet-600/80 text-sm font-medium">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Secure & Encrypted Login</span>
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;