import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Package, Zap, Gift, User, CheckCircle, Shield, Heart, Sparkles, Star, MapPin } from 'lucide-react';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-100">
      <div className="pt-8 pb-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-violet-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-gradient-to-r from-pink-200/30 to-rose-200/30 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 max-w-lg mx-auto px-4">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-4 border border-violet-200/50">
            <Sparkles className="w-4 h-4 mr-2 text-violet-600 animate-pulse" />
            <span className="text-sm font-semibold text-violet-700">Join the ShopVerse Community</span>
          </div>
          <h2 className="text-4xl font-black text-slate-800 mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
              Join ShopVerse Today!
            </span>
          </h2>
          <p className="text-lg text-slate-600 font-medium">
            Create your account and start shopping amazing products
          </p>
        </div>
      </div>
      <div className="px-4">
        <RegisterForm />
      </div>
      <div className="mt-8 text-center px-4">
        <div className="max-w-lg mx-auto space-y-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 border border-violet-200/50 shadow-lg">
            <p className="text-slate-600 mb-3 font-medium">
              Already have an account?
            </p>
            <Link 
              to="/login" 
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
            >
              <User className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              Sign in here
              <Sparkles className="w-4 h-4 group-hover:animate-spin transition-transform duration-300" />
            </Link>
          </div>
          
          <Link 
            to="/" 
            className="group inline-flex items-center gap-2 text-slate-600 hover:text-violet-600 font-semibold transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="group-hover:underline">Continue Browsing Products</span>
          </Link>
        </div>
      </div>
      <div className="mt-16 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-6 py-3 mb-6 border border-violet-200/50">
            <Star className="w-5 h-5 mr-3 text-yellow-500 animate-pulse" />
            <span className="text-lg font-bold text-slate-700">What You Get With Your Account</span>
            <Heart className="w-4 h-4 ml-3 text-pink-500 animate-pulse" />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-violet-200/50 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <ShoppingCart className="w-10 h-10 text-white" />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-4">Shopping Cart</h4>
            <p className="text-slate-600 leading-relaxed">
              Save items and checkout when ready with our smart cart system
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-violet-200/50 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Package className="w-10 h-10 text-white" />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-4">Order Tracking</h4>
            <p className="text-slate-600 leading-relaxed">
              Track your orders and view complete purchase history
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-violet-200/50 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-4">Fast Checkout</h4>
            <p className="text-slate-600 leading-relaxed">
              Lightning-fast and secure ordering process
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-violet-200/50 shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Gift className="w-10 h-10 text-white" />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-4">Special Offers</h4>
            <p className="text-slate-600 leading-relaxed">
              Exclusive deals and discounts for registered users
            </p>
          </div>
        </div>
      </div>
      <div className="mt-16 max-w-4xl mx-auto px-4">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-violet-200/50">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800">
                Quick & Easy Registration Process
              </h4>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-black text-xl shadow-xl">
                1
              </div>
              <h5 className="text-lg font-bold text-slate-800 mb-3">Fill Form</h5>
              <p className="text-slate-600">
                Enter your basic information securely
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-black text-xl shadow-xl">
                2
              </div>
              <h5 className="text-lg font-bold text-slate-800 mb-3">Verify Account</h5>
              <p className="text-slate-600">
                Account created instantly - no waiting
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-black text-xl shadow-xl">
                3
              </div>
              <h5 className="text-lg font-bold text-slate-800 mb-3">Start Shopping</h5>
              <p className="text-slate-600">
                Begin adding items to your cart immediately
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 backdrop-blur-xl rounded-3xl p-8 border border-emerald-200/50 shadow-2xl">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-emerald-900 mb-4">
                Your Privacy & Security Matter
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-emerald-800 font-medium">Personal information kept secure</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-emerald-800 font-medium">No third-party data sharing</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-emerald-800 font-medium">Passwords securely encrypted</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-emerald-800 font-medium">Shopping data stays private</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-xl rounded-3xl p-8 border border-blue-200/50 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
            </div>
            <h4 className="text-2xl font-bold text-blue-900">
              Registration Tips
            </h4>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
                <span className="text-blue-800 font-medium">Use a valid email address for account verification</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
                <span className="text-blue-800 font-medium">Choose a strong password (at least 6 characters)</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
                <span className="text-blue-800 font-medium">Remember your login credentials securely</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
                <span className="text-blue-800 font-medium">Start shopping immediately after registration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 pb-8 text-center">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-violet-200/50 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-violet-600 animate-pulse" />
              <span className="text-sm font-bold text-slate-800">ShopVerse Pakistan</span>
              <Heart className="w-4 h-4 text-pink-500 animate-pulse" />
            </div>
            <p className="text-xs text-slate-600 mb-3">
              By creating an account, you agree to our terms of service and privacy policy.
            </p>
            <p className="text-xs text-slate-600">
              © {new Date().getFullYear()} ShopVerse Pakistan. 
              Built for educational purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;