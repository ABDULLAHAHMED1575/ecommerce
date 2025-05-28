// Example usage in OrderForm.js or any form component
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, CreditCard, Truck, ArrowLeft, ShoppingBag, Sparkles, CheckCircle, Package, Star, AlertCircle } from 'lucide-react';
import { getCart, createOrder, processPayment } from '../services/cart.service';
import { getCurrentUserId } from '../utils/auth';
import { formatPrice, calculateCartTotal, showErrorMessage, showSuccessMessage, validatePhoneNumber, formatPhoneNumber } from '../utils/helper';

const OrderForm = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    phone: ''
  });
  const [phoneError, setPhoneError] = useState('');

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
      if (!cartData || !cartData.items || cartData.items.length === 0) {
        showErrorMessage('Your cart is empty');
        navigate('/cart');
        return;
      }
      setCart(cartData);
    } catch (error) {
      showErrorMessage(error.message);
      navigate('/cart');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Format phone number as user types
      const formattedPhone = formatPhoneNumber(value);
      setShippingInfo({
        ...shippingInfo,
        [name]: formattedPhone
      });
      
      // Clear phone error when user starts typing
      if (phoneError) {
        setPhoneError('');
      }
    } else {
      setShippingInfo({
        ...shippingInfo,
        [name]: value
      });
    }
  };

  const handlePhoneBlur = () => {
    // Validate phone number when user finishes typing
    if (shippingInfo.phone) {
      const phoneValidation = validatePhoneNumber(shippingInfo.phone);
      if (!phoneValidation.isValid) {
        setPhoneError(phoneValidation.error);
      } else {
        setPhoneError('');
        // Update with properly formatted phone number
        setShippingInfo({
          ...shippingInfo,
          phone: phoneValidation.formatted
        });
      }
    }
  };

  const validateForm = () => {
    if (!shippingInfo.address.trim()) {
      showErrorMessage('Please enter your address');
      return false;
    }
    if (!shippingInfo.city.trim()) {
      showErrorMessage('Please enter your city');
      return false;
    }
    if (!shippingInfo.phone.trim()) {
      showErrorMessage('Please enter your phone number');
      return false;
    }
    
    // Validate phone number
    const phoneValidation = validatePhoneNumber(shippingInfo.phone);
    if (!phoneValidation.isValid) {
      setPhoneError(phoneValidation.error);
      showErrorMessage(phoneValidation.error);
      return false;
    }
    
    return true;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setProcessing(true);
      const order = await createOrder(cart.id);
      await processPayment(order.id, paymentMethod);

      showSuccessMessage('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      showErrorMessage(error.message);
    } finally {
      setProcessing(false);
    }
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
              <ShoppingBag className="absolute inset-2 w-16 h-16 text-violet-600 animate-pulse" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Preparing Checkout</h2>
          <p className="text-lg text-slate-600 font-medium">Setting up your order details...</p>
        </div>
      </div>
    );
  }

  if (!cart) return null;

  const cartTotal = calculateCartTotal(cart.items);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-6 py-3 mb-6 border border-violet-200/50">
            <ShoppingBag className="w-5 h-5 mr-3 text-violet-600" />
            <span className="text-lg font-bold text-violet-700">Secure Checkout</span>
            <Sparkles className="w-4 h-4 ml-3 text-pink-500 animate-pulse" />
          </div>
          <h1 className="text-5xl font-black text-slate-800 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
              Checkout
            </span>
          </h1>
          <p className="text-xl text-slate-600 font-medium">
            Complete your order and get your products delivered
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-violet-200/50 p-8 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Shipping Information</h3>
              </div>
              
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-md flex items-center justify-center">
                      <MapPin className="w-2.5 h-2.5 text-white" />
                    </div>
                    Address *
                  </label>
                  <div className="relative">
                    <textarea
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full pl-12 pr-4 py-4 border-2 border-violet-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-violet-500/30 focus:border-violet-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-700 placeholder-violet-400/70 font-medium resize-none"
                      placeholder="Enter your complete delivery address"
                    />
                    <div className="absolute left-4 top-4">
                      <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                        <MapPin className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-md flex items-center justify-center">
                      <MapPin className="w-2.5 h-2.5 text-white" />
                    </div>
                    City *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-4 border-2 border-violet-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-violet-500/30 focus:border-violet-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-700 placeholder-violet-400/70 font-medium"
                      placeholder="Enter your city"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                        <MapPin className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-md flex items-center justify-center">
                      <Phone className="w-2.5 h-2.5 text-white" />
                    </div>
                    Phone Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleInputChange}
                      onBlur={handlePhoneBlur}
                      required
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 bg-white/80 backdrop-blur-sm text-slate-700 placeholder-violet-400/70 font-medium ${
                        phoneError 
                          ? 'border-red-300 focus:ring-red-500/30 focus:border-red-500' 
                          : 'border-violet-200 focus:ring-violet-500/30 focus:border-violet-500'
                      }`}
                      placeholder="03XX-XXX-XXXX"
                      maxLength="13"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                        <Phone className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>
                  {phoneError && (
                    <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{phoneError}</span>
                    </div>
                  )}
                  {!phoneError && shippingInfo.phone && (
                    <div className="flex items-center gap-2 text-emerald-500 text-sm mt-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>Phone number format looks good!</span>
                    </div>
                  )}
                  <div className="bg-blue-50 rounded-xl p-3 border border-blue-200 mt-2">
                    <div className="flex items-start gap-2">
                      <Phone className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-blue-800 mb-1">Accepted formats:</p>
                        <ul className="text-xs text-blue-700 space-y-1">
                          <li>• Pakistani Mobile: 03XX-XXX-XXXX (11 digits)</li>
                          <li>• Landline: XXX-XXX-XXXX (10 digits)</li>
                          <li>• Example: 0300-123-4567</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <div className="w-4 h-4 bg-gradient-to-r from-rose-500 to-pink-600 rounded-md flex items-center justify-center">
                      <CreditCard className="w-2.5 h-2.5 text-white" />
                    </div>
                    Payment Method
                  </label>
                  <div className="space-y-3">
                    <label className="group relative flex items-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-violet-200 hover:border-violet-400 transition-all duration-300 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-violet-600 mr-4"
                      />
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                          <Truck className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-800">Cash on Delivery</span>
                          <p className="text-sm text-slate-600">Pay when you receive your order</p>
                        </div>
                      </div>
                    </label>
                    
                    <label className="group relative flex items-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-violet-200 hover:border-violet-400 transition-all duration-300 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-violet-600 mr-4"
                      />
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-800">Credit/Debit Card</span>
                          <p className="text-sm text-slate-600">Secure online payment</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={processing || phoneError}
                  className={`group relative w-full py-5 px-6 rounded-2xl font-bold text-xl shadow-2xl transition-all duration-500 transform ${
                    processing || phoneError
                      ? 'bg-slate-400 cursor-not-allowed text-white'
                      : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-800 text-white hover:scale-105 hover:-translate-y-1 hover:shadow-emerald-500/30'
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    {processing ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Processing Order...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                        <span>Place Order - {formatPrice(cartTotal)}</span>
                        <Sparkles className="w-5 h-5 animate-pulse" />
                      </>
                    )}
                  </div>
                </button>
              </form>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-violet-200/50 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Order Summary</h3>
            </div>
            
            <div className="space-y-4 mb-6">
              {cart.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-violet-200/50">
                  <div className="flex-1">
                    <div className="font-bold text-slate-800 text-lg">{item.product?.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-slate-600 font-medium">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-slate-800">
                      {formatPrice((item.product?.price || 0) * item.quantity)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t-2 border-violet-200 pt-6 mb-6">
              <div className="flex justify-between items-center p-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl text-white shadow-xl">
                <span className="text-2xl font-bold">Total:</span>
                <span className="text-3xl font-black">{formatPrice(cartTotal)}</span>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/cart')}
              className="group w-full bg-gradient-to-r from-slate-600 to-slate-700 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-slate-500/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;