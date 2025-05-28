import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ShoppingBag, CreditCard, Shield, Headphones, Sparkles, Star } from 'lucide-react';
import OrderForm from '../components/OrderForm';

const CheckoutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-100">
      <div className="pt-8 pb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="relative">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-4 border border-violet-200/50">
                <ShoppingBag className="w-4 h-4 mr-2 text-violet-600" />
                <span className="text-sm font-semibold text-violet-700">ShopVerse Checkout</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-slate-800 mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
                  Checkout
                </span>
              </h1>
              <p className="text-lg text-slate-600 font-medium">Complete your order securely</p>
            </div>
            
            <Link
              to="/cart"
              className="group bg-gradient-to-r from-slate-600 to-slate-700 text-white px-6 py-3 rounded-2xl hover:from-slate-700 hover:to-slate-800 shadow-lg hover:shadow-slate-500/30 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 font-bold"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
      <div className="pb-8">
        <div className="container mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-violet-200/50 shadow-2xl">
            <div className="flex items-center justify-center">
              <div className="flex items-center max-w-2xl w-full">
                <div className="flex flex-col items-center flex-1">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center shadow-xl">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                  </div>
                  <span className="mt-3 text-sm font-bold text-emerald-600">Cart</span>
                  <span className="text-xs text-slate-500">Completed</span>
                </div>
                <div className="flex-1 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mx-4"></div>
                <div className="flex flex-col items-center flex-1">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center shadow-xl animate-pulse">
                      <span className="text-lg font-black">2</span>
                    </div>
                    <div className="absolute -inset-2 bg-blue-500/20 rounded-full animate-ping"></div>
                  </div>
                  <span className="mt-3 text-sm font-bold text-blue-600">Checkout</span>
                  <span className="text-xs text-slate-500">Current Step</span>
                </div>
                <div className="flex-1 h-1 bg-slate-300 rounded-full mx-4"></div>
                <div className="flex flex-col items-center flex-1">
                  <div className="relative">
                    <div className="w-12 h-12 bg-slate-300 text-slate-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-lg font-black">3</span>
                    </div>
                  </div>
                  <span className="mt-3 text-sm font-bold text-slate-500">Complete</span>
                  <span className="text-xs text-slate-400">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OrderForm />
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-violet-200/50 p-8 lg:p-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-6 py-3 mb-6 border border-violet-200/50">
                <Shield className="w-5 h-5 mr-3 text-emerald-600" />
                <span className="text-lg font-bold text-slate-700">Secure & Trusted Checkout</span>
                <Star className="w-4 h-4 ml-3 text-yellow-500 animate-pulse" />
              </div>
              <h3 className="text-3xl font-black text-slate-800 mb-4">
                Your information is protected
              </h3>
              <p className="text-lg text-slate-600 font-medium">
                We use industry-standard security measures to keep your data safe
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3">SSL Encrypted</h4>
                <p className="text-slate-600 leading-relaxed">
                  All data is encrypted with bank-level security during transmission
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-emerald-600 font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">256-bit Encryption</span>
                </div>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <CreditCard className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3">Secure Payment</h4>
                <p className="text-slate-600 leading-relaxed">
                  Multiple payment options with advanced fraud protection
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-blue-600 font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">PCI Compliant</span>
                </div>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <Headphones className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3">Customer Support</h4>
                <p className="text-slate-600 leading-relaxed">
                  Dedicated support team available to help with your orders
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-purple-600 font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">24/7 Available</span>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-violet-200">
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="font-medium">Money Back Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">Trusted by 10,000+ Customers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span className="font-medium">Fast & Reliable Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-violet-600/80 text-lg font-bold bg-white/60 backdrop-blur-xl rounded-full px-6 py-3 border border-violet-200/50">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span>Protected by ShopVerse Security</span>
            <Shield className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;