import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowLeft, CreditCard, Package, Sparkles, ShoppingBag, Heart, Star } from 'lucide-react';
import { getCart, removeFromCart } from '../services/cart.service';
import { getCurrentUserId } from '../utils/auth';
import { formatPrice, calculateCartTotal, showErrorMessage, showSuccessMessage } from '../utils/helper';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      const userId = getCurrentUserId();
      if (!userId) {
        navigate('/login');
        return;
      }

      const cartData = await getCart(userId);
      setCart(cartData);
    } catch (error) {
      showErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const userId = getCurrentUserId();
      await removeFromCart(userId, productId);
      showSuccessMessage('Item removed from cart');
      loadCart();
    } catch (error) {
      showErrorMessage(error.message);
    }
  };

  const handleCheckout = () => {
    if (!cart || !cart.items || cart.items.length === 0) {
      showErrorMessage('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-100 flex items-center justify-center">
        <div className="text-center bg-white/90 backdrop-blur-xl p-16 rounded-3xl shadow-2xl border border-violet-200/50">
          <div className="relative mb-8">
            <div className="w-20 h-20 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full animate-spin">
                <div className="w-full h-full bg-white rounded-full border-4 border-transparent bg-clip-padding"></div>
              </div>
              <ShoppingCart className="absolute inset-2 w-16 h-16 text-violet-600 animate-pulse" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Loading Your Cart</h2>
          <p className="text-lg text-slate-600 font-medium">Gathering your selected items...</p>
          <div className="flex justify-center mt-6 space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></div>
            <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-100 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-violet-200/50 p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-100 to-rose-100 rounded-full blur-2xl opacity-50"></div>
            
            <div className="relative z-10">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-violet-100 to-purple-200 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-16 h-16 text-violet-600" />
              </div>
              <h2 className="text-4xl font-black text-slate-800 mb-4">Your Cart Awaits</h2>
              <p className="text-xl text-slate-600 mb-12 font-medium max-w-md mx-auto">
                Ready to discover amazing products? Let's start your shopping journey!
              </p>
              <button
                onClick={() => navigate('/')}
                className="group bg-gradient-to-r from-violet-600 to-purple-700 text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-violet-500/30 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 flex items-center justify-center mx-auto gap-3"
              >
                <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
                Start Shopping
                <Sparkles className="w-5 h-5 animate-pulse" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const cartTotal = calculateCartTotal(cart.items);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-100 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-6 py-3 mb-6 border border-violet-200/50">
            <ShoppingCart className="w-5 h-5 mr-3 text-violet-600" />
            <span className="text-sm font-semibold text-violet-700">Your Shopping Cart</span>
            <Heart className="w-4 h-4 ml-3 text-pink-500 animate-pulse" />
          </div>
          <h1 className="text-5xl font-black text-slate-800 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
              Shopping Cart
            </span>
          </h1>
          <p className="text-xl text-slate-600 font-medium">
            Review your selected items and proceed to checkout
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-violet-200/50 overflow-hidden">
              <div className="p-8 border-b border-violet-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Your Items ({cart.items.length})
                  </h2>
                </div>
              </div>

              <div className="divide-y divide-violet-100">
                {cart.items.map((item, index) => (
                  <div key={index} className="p-8 hover:bg-violet-50/50 transition-colors duration-300">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-violet-100 to-purple-200 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
                        <img
                          src={item.product?.image_url || '/images/default-product.jpg'}
                          alt={item.product?.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = '/images/default-product.jpg';
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-800 mb-2">
                          {item.product?.name}
                        </h3>
                        <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                          {item.product?.description}
                        </p>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-500">Price:</span>
                            <span className="text-2xl font-bold text-emerald-600">
                              {formatPrice(item.product?.price)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-500">Qty:</span>
                            <div className="bg-violet-100 px-3 py-1 rounded-full">
                              <span className="font-bold text-violet-700">{item.quantity}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end gap-4">
                        <div className="text-3xl font-black text-slate-800">
                          {formatPrice((item.product?.price || 0) * item.quantity)}
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.product?.id)}
                          className="group bg-gradient-to-r from-red-500 to-rose-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-red-500/30 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4 group-hover:animate-bounce" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-violet-200/50 p-8 sticky top-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Order Summary</h3>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex justify-between items-center p-4 bg-violet-50 rounded-2xl">
                  <span className="text-lg font-semibold text-slate-700">
                    Total Items:
                  </span>
                  <span className="text-xl font-bold text-violet-600">
                    {cart.items.length}
                  </span>
                </div>
                
                <div className="border-t border-violet-200 pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-slate-800">
                      Grand Total:
                    </span>
                    <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => navigate('/')}
                  className="w-full group bg-gradient-to-r from-slate-600 to-slate-700 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-slate-500/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                  Continue Shopping
                </button>
                
                <button
                  onClick={handleCheckout}
                  className="w-full group bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white py-5 px-6 rounded-2xl font-black text-xl shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  <CreditCard className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  Proceed to Checkout
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </button>
              </div>
              <div className="mt-8 pt-6 border-t border-violet-200">
                <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="font-medium">Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;