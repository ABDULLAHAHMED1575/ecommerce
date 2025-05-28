import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, ShoppingBag, CheckCircle, Clock, Calendar, Star, Sparkles, TrendingUp, Award, CreditCard } from 'lucide-react';
import { getUserOrders } from '../services/cart.service';
import { getCurrentUserId, isUserLoggedIn } from '../utils/auth';
import { formatPrice, formatDate, formatOrderStatus, showErrorMessage } from '../utils/helper';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigate('/login');
      return;
    }
    loadOrders();
  }, [navigate]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const userId = getCurrentUserId();
      if (!userId) return;

      const ordersData = await getUserOrders(userId);
      setOrders(ordersData || []);
    } catch (error) {
      showErrorMessage(error.message);
    } finally {
      setLoading(false);
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
              <Package className="absolute inset-2 w-16 h-16 text-violet-600 animate-pulse" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Loading Your Orders</h2>
          <p className="text-lg text-slate-600 font-medium">Fetching your purchase history...</p>
          <div className="flex justify-center mt-6 space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></div>
            <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-100">
      <div className="pt-8 pb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="relative">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-4 border border-violet-200/50">
                <Package className="w-4 h-4 mr-2 text-violet-600" />
                <span className="text-sm font-semibold text-violet-700">Order Management</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-slate-800 mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
                  Order History
                </span>
              </h1>
              <p className="text-lg text-slate-600 font-medium">Track your orders and purchase history</p>
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

      <div className="container mx-auto px-4 pb-16">
        {orders.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-violet-200/50 p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-100 to-rose-100 rounded-full blur-2xl opacity-50"></div>
            
            <div className="relative z-10">
              <div className="w-32 h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                <ShoppingBag className="w-16 h-16 text-slate-400" />
              </div>
              <h3 className="text-3xl font-black text-slate-800 mb-4">No Orders Yet</h3>
              <p className="text-xl text-slate-600 mb-12 max-w-md mx-auto leading-relaxed">
                You haven't placed any orders yet. Start shopping to see your orders here!
              </p>
              <Link
                to="/"
                className="group bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white px-12 py-5 rounded-2xl hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-800 shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 font-bold text-xl flex items-center justify-center gap-3 mx-auto"
              >
                <ShoppingBag className="w-6 h-6 group-hover:animate-bounce" />
                Start Shopping
                <Sparkles className="w-5 h-5 animate-pulse" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order.id} className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-violet-200/50 overflow-hidden hover:shadow-violet-500/20 transition-all duration-500">
                <div className="bg-gradient-to-r from-slate-50 to-violet-50 px-8 py-6 border-b border-violet-200/50">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">
                          Order #{order.id}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                        order.status === 'paid' 
                          ? 'bg-emerald-500 text-white'
                          : order.status === 'pending'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-slate-500 text-white'
                      }`}>
                        {order.status === 'paid' ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                        {formatOrderStatus(order.status)}
                      </div>
                      
                      <div className="text-right">
                        <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                          {formatPrice(order.total_amount)}
                        </div>
                        <span className="text-sm text-slate-500 font-medium">Order Total</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800">Order Items</h4>
                  </div>
                  
                  <div className="space-y-4">
                    {order.items && order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-6 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-violet-200/50 hover:shadow-lg transition-all duration-300">
                        <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
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
                          <h5 className="text-xl font-bold text-slate-800 mb-2">
                            {item.product?.name}
                          </h5>
                          <div className="flex items-center gap-4 text-slate-600">
                            <span className="font-medium">Quantity: {item.quantity}</span>
                            <span className="text-slate-400">×</span>
                            <span className="font-bold text-emerald-600">{formatPrice(item.price)}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-black text-slate-800">
                            {formatPrice(item.subtotal || (item.price * item.quantity))}
                          </div>
                          <span className="text-sm text-slate-500">Item Total</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t-2 border-violet-200">
                    <div className="flex justify-between items-center p-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl text-white shadow-xl">
                      <div>
                        <span className="text-lg font-bold">Total Items: {order.items?.length || 0}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black">
                          Total: {formatPrice(order.total_amount)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {orders.length > 0 && (
          <div className="mt-16 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-violet-200/50 p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full blur-3xl opacity-50"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-12">
                <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-6 py-3 mb-6 border border-violet-200/50">
                  <TrendingUp className="w-5 h-5 mr-3 text-violet-600" />
                  <span className="text-lg font-bold text-slate-700">Your Shopping Summary</span>
                  <Award className="w-4 h-4 ml-3 text-yellow-500 animate-pulse" />
                </div>
                <h3 className="text-3xl font-black text-slate-800 mb-4">
                  Shopping Statistics
                </h3>
                <p className="text-lg text-slate-600 font-medium">
                  Here's a summary of your shopping journey with us
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Package className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-black text-blue-600 mb-2">
                    {orders.length}
                  </div>
                  <div className="text-lg font-bold text-slate-700">Total Orders</div>
                  <div className="text-sm text-slate-500 mt-1">Orders placed</div>
                </div>
                
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-black text-emerald-600 mb-2">
                    {orders.filter(o => o.status === 'paid').length}
                  </div>
                  <div className="text-lg font-bold text-slate-700">Completed Orders</div>
                  <div className="text-sm text-slate-500 mt-1">Successfully delivered</div>
                </div>
                
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <CreditCard className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-black text-purple-600 mb-2">
                    {formatPrice(orders.reduce((sum, order) => sum + order.total_amount, 0))}
                  </div>
                  <div className="text-lg font-bold text-slate-700">Total Spent</div>
                  <div className="text-sm text-slate-500 mt-1">Lifetime value</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;