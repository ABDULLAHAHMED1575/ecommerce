import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Settings, Plus, Loader2, Star, ArrowRight, Sparkles, Zap, Heart, TrendingUp } from 'lucide-react';
import ProductList from '../components/ProductList';
import { getAllProducts } from '../services/product.service';
import { addToCart, getCart } from '../services/cart.service';
import { deleteProduct } from '../services/product.service';
import { getCurrentUserId, isUserLoggedIn, isAdmin } from '../utils/auth';
import { showErrorMessage, showSuccessMessage, debounce } from '../utils/helper';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const userIsAdmin = isAdmin();
  const isLoggedIn = isUserLoggedIn();

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      updateCartCount();
    } else {
      setCartItemsCount(0);
    }
  }, [isLoggedIn]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const productsData = await getAllProducts();
      setProducts(productsData);
      if (isLoggedIn) {
        updateCartCount();
      }
    } catch (error) {
      showErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateCartCount = async () => {
    try {
      const userId = getCurrentUserId();
      if (!userId) return;

      const cart = await getCart(userId);
      if (cart && cart.items) {
        const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        setCartItemsCount(totalItems);
      }
    } catch (error) {
      setCartItemsCount(0);
    }
  };

  const debouncedSearch = debounce((term) => {
    setSearchTerm(term);
  }, 300);

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const handleAddToCart = async (productId, quantity = 1) => {
    if (!isLoggedIn) {
      showErrorMessage('Please login to add items to cart');
      navigate('/login');
      return;
    }

    try {
      const userId = getCurrentUserId();
      await addToCart(userId, productId, quantity);
      showSuccessMessage('Item added to cart!');
      updateCartCount();
    } catch (error) {
      showErrorMessage(error.message);
    }
  };

  const handleProductEdit = (product) => {
    navigate('/admin', { state: { editProduct: product } });
  };

  const handleProductDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      showSuccessMessage('Product deleted successfully');
      loadDashboardData();
    } catch (error) {
      showErrorMessage(error.message);
    }
  };

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-100 flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-xl p-16 rounded-3xl shadow-2xl border border-violet-200/50">
          <div className="relative mb-8">
            <div className="w-20 h-20 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full animate-spin">
                <div className="w-full h-full bg-white rounded-full border-4 border-transparent bg-clip-padding"></div>
              </div>
              <Loader2 className="absolute inset-2 w-16 h-16 text-violet-600 animate-spin" />
            </div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-violet-300/30 rounded-full mx-auto animate-pulse"></div>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Crafting Your Experience</h2>
          <p className="text-lg text-slate-600 font-medium mb-6">Loading exceptional products just for you...</p>
          <div className="flex justify-center space-x-2">
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
      <div className="relative bg-gradient-to-br from-violet-600 via-purple-700 to-fuchsia-800 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-r from-pink-400/30 to-violet-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/30">
            <Zap className="w-5 h-5 mr-3 text-yellow-300 animate-pulse" />
            <span className="text-sm font-semibold tracking-wide">Next-Gen Shopping Platform</span>
            <Heart className="w-4 h-4 ml-3 text-pink-300 animate-pulse" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black leading-tight mb-6">
            {getWelcomeMessage()}, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-pink-300 to-yellow-300 animate-pulse">
              ShopVerse
            </span>
          </h1>
          <p className="text-2xl md:text-3xl mt-8 opacity-95 font-light max-w-3xl mx-auto leading-relaxed">
            Where innovation meets style. Discover curated collections that define tomorrow's trends.
          </p>

          {!isLoggedIn && (
            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6 max-w-xl mx-auto">
              <button
                onClick={() => navigate('/login')}
                className="group relative bg-white text-violet-700 font-bold px-10 py-5 rounded-2xl shadow-2xl hover:shadow-violet-500/25 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 flex items-center justify-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <span className="relative z-10 flex items-center">
                  Start Shopping
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </button>
              <button
                onClick={() => navigate('/register')}
                className="group relative bg-transparent border-2 border-white/80 backdrop-blur-md px-10 py-5 rounded-2xl font-bold hover:bg-white hover:text-violet-700 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10">Join Community</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="bg-white/90 backdrop-blur-xl shadow-2xl border-b border-violet-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="relative w-full max-w-3xl">
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-violet-400">
              <Search className="w-6 h-6" />
            </div>
            <input
              type="text"
              placeholder="Discover products, brands, collections, and more..."
              onChange={handleSearchChange}
              className="w-full pl-16 pr-8 py-5 border-2 border-violet-200 rounded-2xl shadow-lg focus:ring-4 focus:ring-violet-500/30 focus:border-violet-500 focus:outline-none transition-all duration-300 bg-white/95 backdrop-blur-sm text-slate-700 placeholder-violet-400/70 text-lg"
            />
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
              <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn && !userIsAdmin && (
              <button
                onClick={() => navigate('/cart')}
                className="group relative bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-emerald-500/30 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 flex items-center gap-3"
              >
                <ShoppingCart className="w-6 h-6 group-hover:animate-bounce" />
                <span className="font-bold text-lg">Cart</span>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-3 -right-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-full w-8 h-8 text-sm flex items-center justify-center font-bold shadow-lg animate-pulse ring-4 ring-white">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            )}

            {userIsAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="group relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-indigo-500/30 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 flex items-center gap-3"
              >
                <Settings className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                <span className="font-bold text-lg">Admin Hub</span>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 py-16">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-violet-200/50 p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-100 to-rose-100 rounded-full blur-2xl opacity-50"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
              <div>
                <h2 className="text-4xl lg:text-6xl font-black text-slate-800 mb-4 flex items-center gap-4">
                  {searchTerm ? (
                    <>
                      <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center">
                        <Search className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
                        "{searchTerm}"
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center animate-pulse">
                        <Star className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900">
                        Featured Collection
                      </span>
                    </>
                  )}
                </h2>
              </div>
              
              {userIsAdmin && (
                <button
                  onClick={() => navigate('/admin')}
                  className="group relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-purple-500/30 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 flex items-center gap-3"
                >
                  <Plus className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                  <span className="font-bold text-lg">Add Product</span>
                </button>
              )}
            </div>

            <ProductList
              searchTerm={searchTerm}
              onAddToCart={handleAddToCart}
              onProductEdit={handleProductEdit}
              onProductDelete={handleProductDelete}
            />
          </div>
        </div>
      </div>
      {!isLoggedIn && (
        <div className="relative bg-gradient-to-br from-violet-600 via-purple-700 to-fuchsia-800 text-white py-24 mt-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-r from-pink-400/30 to-rose-400/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 right-1/2 w-64 h-64 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
          
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-8 py-4 mb-10 border border-white/30">
              <Sparkles className="w-6 h-6 mr-4 text-yellow-300 animate-spin" />
              <span className="text-lg font-bold tracking-wide">Join 100K+ Happy Shoppers</span>
              <Heart className="w-5 h-5 ml-4 text-pink-300 animate-pulse" />
            </div>
            
            <h3 className="text-5xl lg:text-7xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-pink-300 to-yellow-300">
              Your Journey Awaits
            </h3>
            <p className="text-2xl mb-12 font-light max-w-3xl mx-auto leading-relaxed opacity-95">
              Experience personalized shopping like never before. Join our community and unlock exclusive collections, insider deals, and premium rewards.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-xl mx-auto">
              <button
                onClick={() => navigate('/register')}
                className="group relative bg-white text-violet-700 px-12 py-6 rounded-2xl font-black text-xl shadow-2xl hover:shadow-white/25 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 flex items-center justify-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <span className="relative z-10 flex items-center">
                  Start Your Adventure
                  <ArrowRight className="w-6 h-6 ml-4 group-hover:translate-x-3 transition-transform duration-300" />
                </span>
              </button>
              <button
                onClick={() => navigate('/login')}
                className="group relative border-3 border-white/80 backdrop-blur-md px-12 py-6 rounded-2xl font-black text-xl hover:bg-white hover:text-violet-700 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10">Welcome Back</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;