import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Truck, CreditCard, Key, Crown, User, Sparkles, Star, Heart } from 'lucide-react';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-100">
      <div className="pt-8 pb-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-violet-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-gradient-to-r from-pink-200/30 to-rose-200/30 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 max-w-md mx-auto px-4">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-4 border border-violet-200/50">
            <Sparkles className="w-4 h-4 mr-2 text-violet-600 animate-pulse" />
            <span className="text-sm font-semibold text-violet-700">ShopVerse Login Portal</span>
          </div>
          <h2 className="text-4xl font-black text-slate-800 mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
              Welcome Back!
            </span>
          </h2>
          <p className="text-lg text-slate-600 font-medium">
            Sign in to your account to continue shopping
          </p>
        </div>
      </div>
      <div className="px-4">
        <LoginForm />
      </div>
      <div className="mt-8 text-center px-4">
        <div className="max-w-md mx-auto space-y-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 border border-violet-200/50 shadow-lg">
            <p className="text-slate-600 mb-3 font-medium">
              Don't have an account?
            </p>
            <Link 
              to="/register" 
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105"
            >
              <User className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              Create your account
              <Sparkles className="w-4 h-4 group-hover:animate-spin transition-transform duration-300" />
            </Link>
          </div>
          
          <Link 
            to="/" 
            className="group inline-flex items-center gap-2 text-slate-600 hover:text-violet-600 font-semibold transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="group-hover:underline">Back to Products</span>
          </Link>
        </div>
      </div>
      <div className="mt-16 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-6 py-3 mb-6 border border-violet-200/50">
            <Star className="w-5 h-5 mr-3 text-yellow-500 animate-pulse" />
            <span className="text-lg font-bold text-slate-700">Why Choose ShopVerse?</span>
            <Heart className="w-4 h-4 ml-3 text-pink-500 animate-pulse" />
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-violet-200/50 shadow-2xl hover:shadow-violet-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <ShoppingBag className="w-10 h-10 text-white" />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-4">Easy Shopping</h4>
            <p className="text-slate-600 leading-relaxed">
              Browse and shop from our wide range of quality products with an intuitive interface
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-violet-200/50 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Truck className="w-10 h-10 text-white" />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-4">Fast Delivery</h4>
            <p className="text-slate-600 leading-relaxed">
              Quick and reliable delivery across Pakistan with real-time tracking
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-violet-200/50 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <CreditCard className="w-10 h-10 text-white" />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-4">Secure Payment</h4>
            <p className="text-slate-600 leading-relaxed">
              Multiple payment options including cash on delivery with bank-level security
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20 pb-8 text-center">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-violet-200/50">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-violet-600 animate-pulse" />
              <span className="text-sm font-bold text-slate-800">ShopVerse Pakistan</span>
              <Heart className="w-4 h-4 text-pink-500 animate-pulse" />
            </div>
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

export default Login;