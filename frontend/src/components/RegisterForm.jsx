import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Sparkles, ArrowRight, Eye, EyeOff, Shield, CheckCircle, AlertCircle, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { register } from '../services/auth.service';
import { validateEmail, validatePassword, getPasswordStrength } from '../utils/helper';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (name === 'password') {
      if (value.length > 0) {
        setPasswordStrength(getPasswordStrength(value));
      } else {
        setPasswordStrength(null);
      }
    }
  };

  const validateForm = () => {
    if (!formData.first_name.trim()) {
      toast.error('First name is required');
      return false;
    }
    if (formData.first_name.trim().length < 2) {
      toast.error('First name must be at least 2 characters');
      return false;
    }
    if (!formData.last_name.trim()) {
      toast.error('Last name is required');
      return false;
    }
    if (formData.last_name.trim().length < 2) {
      toast.error('Last name must be at least 2 characters');
      return false;
    }
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      toast.error(emailValidation.error);
      return false;
    }
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      toast.error(passwordValidation.error);
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    if (passwordValidation.strength === 'weak') {
      toast((t) => (
        <div className="flex flex-col space-y-2">
          <p className="font-medium">⚠️ Weak Password Detected</p>
          <p className="text-sm">Your password is weak. Continue anyway?</p>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                proceedWithRegistration();
              }}
              className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
            >
              Continue
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
            >
              Fix Password
            </button>
          </div>
        </div>
      ), {
        duration: 0,
        style: {
          background: '#fff',
          color: '#000',
          maxWidth: '400px',
        },
      });
      return false;
    }

    return true;
  };

  const proceedWithRegistration = async () => {
    setLoading(true);

    try {
      const userData = {
        email: formData.email.trim(),
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        password: formData.password
      };

      await register(userData);
      
      toast.success('🎉 Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    await proceedWithRegistration();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-violet-200/50 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-100 to-rose-100 rounded-full blur-2xl opacity-50"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-xl">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-black text-slate-800 mb-2">
                Join ShopVerse!
              </h2>
              <p className="text-slate-600 font-medium">
                Create your account and start shopping
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-md flex items-center justify-center">
                      <User className="w-2.5 h-2.5 text-white" />
                    </div>
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border-2 border-violet-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-violet-500/30 focus:border-violet-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-700 placeholder-violet-400/70 font-medium"
                      placeholder="John"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-5 h-5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-md flex items-center justify-center">
                        <User className="w-2.5 h-2.5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-md flex items-center justify-center">
                      <User className="w-2.5 h-2.5 text-white" />
                    </div>
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border-2 border-violet-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-violet-500/30 focus:border-violet-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-700 placeholder-violet-400/70 font-medium"
                      placeholder="Doe"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-5 h-5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-md flex items-center justify-center">
                        <User className="w-2.5 h-2.5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <div className="w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-md flex items-center justify-center">
                    <Mail className="w-2.5 h-2.5 text-white" />
                  </div>
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-700 placeholder-violet-400/70 font-medium ${
                      formData.email && !validateEmail(formData.email).isValid
                        ? 'border-red-300 focus:ring-red-500/30 focus:border-red-500'
                        : 'border-violet-200 focus:ring-violet-500/30 focus:border-violet-500'
                    }`}
                    placeholder="john@example.com"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-5 h-5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-md flex items-center justify-center">
                      <Mail className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>
                </div>
                {formData.email && !validateEmail(formData.email).isValid && (
                  <div className="flex items-center gap-2 text-red-500 text-xs mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {validateEmail(formData.email).error}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-md flex items-center justify-center">
                    <Lock className="w-2.5 h-2.5 text-white" />
                  </div>
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-10 py-3 border-2 border-violet-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-violet-500/30 focus:border-violet-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-700 placeholder-violet-400/70 font-medium"
                    placeholder="Create a strong password"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-5 h-5 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-md flex items-center justify-center">
                      <Lock className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {passwordStrength && (
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-slate-700">Password Strength</span>
                      <span className={`font-bold ${
                        passwordStrength.color === 'red' ? 'text-red-600' :
                        passwordStrength.color === 'yellow' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {passwordStrength.text}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.bgColor}`}
                        style={{ width: `${passwordStrength.percentage}%` }}
                      />
                    </div>
                    {passwordStrength.suggestions.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 text-xs text-slate-600">
                          <Sparkles className="w-3 h-3 text-violet-500 mt-0.5 flex-shrink-0" />
                          <span><strong>Tip:</strong> {passwordStrength.suggestions[0]}</span>
                        </div>
                        {passwordStrength.suggestions.length > 1 && (
                          <details className="text-xs">
                            <summary className="text-violet-600 cursor-pointer hover:text-violet-800 font-medium">
                              More suggestions
                            </summary>
                            <ul className="text-slate-600 mt-1 ml-4 space-y-1">
                              {passwordStrength.suggestions.slice(1).map((suggestion, index) => (
                                <li key={index} className="list-disc">{suggestion}</li>
                              ))}
                            </ul>
                          </details>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                  <div className="w-4 h-4 bg-gradient-to-r from-rose-500 to-pink-600 rounded-md flex items-center justify-center">
                    <Shield className="w-2.5 h-2.5 text-white" />
                  </div>
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className={`w-full pl-10 pr-10 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-700 placeholder-violet-400/70 font-medium ${
                      formData.confirmPassword && formData.password !== formData.confirmPassword
                        ? 'border-red-300 focus:ring-red-500/30 focus:border-red-500'
                        : 'border-violet-200 focus:ring-violet-500/30 focus:border-violet-500'
                    }`}
                    placeholder="Confirm your password"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-5 h-5 bg-gradient-to-r from-rose-400 to-pink-500 rounded-md flex items-center justify-center">
                      <Shield className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {formData.confirmPassword && (
                  <div className="flex items-center gap-2 text-xs mt-1">
                    {formData.password !== formData.confirmPassword ? (
                      <>
                        <AlertCircle className="w-3 h-3 text-red-500" />
                        <span className="text-red-500">Passwords do not match</span>
                      </>
                    ) : formData.password.length > 0 && (
                      <>
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span className="text-green-500">Passwords match</span>
                      </>
                    )}
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full py-4 px-6 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-500 transform ${
                  loading 
                    ? 'bg-slate-400 cursor-not-allowed text-white' 
                    : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-800 text-white hover:scale-105 hover:-translate-y-1 hover:shadow-emerald-500/30'
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating your account...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      <span>Create Account</span>
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
                  <span className="px-4 bg-white text-slate-500 font-medium">Already have an account?</span>
                </div>
              </div>
              
              <div className="mt-6">
                <Link 
                  to="/login" 
                  className="group inline-flex items-center gap-2 text-slate-600 hover:text-violet-600 font-semibold transition-all duration-300"
                >
                  <User className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="group-hover:underline">Sign in here</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 text-violet-600/80 text-sm font-medium">
            <Shield className="w-4 h-4 animate-pulse" />
            <span>Your data is secure with us</span>
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;