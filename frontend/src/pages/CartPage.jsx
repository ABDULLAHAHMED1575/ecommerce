import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Shield, CreditCard, Truck, RotateCcw, Sparkles, CheckCircle, Star } from 'lucide-react';
import Cart from '../components/Cart';

const CartPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-100">
      <div className="pt-8 pb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="relative">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-4 border border-violet-200/50">
                <ShoppingBag className="w-4 h-4 mr-2 text-violet-600" />
                <span className="text-sm font-semibold text-violet-700">ShopVerse Cart</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-slate-800 mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
                  Shopping Cart
                </span>
              </h1>
              <p className="text-lg text-slate-600 font-medium">Review your items before checkout</p>
            </div>
            
            <Link
              to="/"
              className="group bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-2xl hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 font-bold"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
      <Cart />
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-violet-200/50 p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-100 to-rose-100 rounded-full blur-2xl opacity-50"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-12">
                <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-6 py-3 mb-6 border border-violet-200/50">
                  <Sparkles className="w-5 h-5 mr-3 text-violet-600 animate-pulse" />
                  <span className="text-lg font-bold text-slate-700">Shopping Tips</span>
                  <Star className="w-4 h-4 ml-3 text-yellow-500 animate-pulse" />
                </div>
                <h3 className="text-3xl font-black text-slate-800 mb-4">
                  Why Shop with Confidence?
                </h3>
                <p className="text-lg text-slate-600 font-medium">
                  Enjoy a premium shopping experience with these exclusive benefits
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-violet-200/50 hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-500 hover:scale-105">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-slate-800 mb-3">Secure Checkout</h4>
                      <p className="text-slate-600 leading-relaxed">
                        Your payment information is protected with industry-standard encryption and bank-level security
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-emerald-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-semibold">SSL Certificate</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-violet-200/50 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-slate-800 mb-3">Multiple Payment Options</h4>
                      <p className="text-slate-600 leading-relaxed">
                        Choose from cash on delivery, credit card, or debit card payment for your convenience
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-blue-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-semibold">Flexible Options</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-violet-200/50 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <Truck className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-slate-800 mb-3">Fast Delivery</h4>
                      <p className="text-slate-600 leading-relaxed">
                        Get your orders delivered quickly across Pakistan with real-time tracking updates
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-purple-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-semibold">Nationwide Coverage</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-violet-200/50 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-105">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <RotateCcw className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-slate-800 mb-3">Easy Returns</h4>
                      <p className="text-slate-600 leading-relaxed">
                        Not satisfied? Return items within 7 days of delivery with hassle-free processing
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-orange-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-semibold">7-Day Guarantee</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-violet-200">
                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-slate-800 mb-2">Additional Benefits</h4>
                  <p className="text-slate-600">More reasons to choose ShopVerse</p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
                  <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-violet-200/50">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="font-semibold text-slate-700">Free Shipping Above Rs. 2000</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-violet-200/50">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold text-slate-700">24/7 Customer Support</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-violet-200/50">
                    <CheckCircle className="w-4 h-4 text-purple-500" />
                    <span className="font-semibold text-slate-700">Quality Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-violet-600/80 text-lg font-bold bg-white/60 backdrop-blur-xl rounded-full px-6 py-3 border border-violet-200/50">
            <Shield className="w-5 h-5 animate-pulse" />
            <span>Your Cart is Secure with ShopVerse</span>
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;