import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Settings, Package, Sparkles, Crown, Star } from 'lucide-react';
import { isUserLoggedIn, isAdmin, getUserFullName, clearUserData } from '../utils/auth';

const Header = ({ cartItemsCount = 0 }) => {
  const navigate = useNavigate();
  const isLoggedIn = isUserLoggedIn();
  const userIsAdmin = isAdmin();
  const userName = getUserFullName();

  const handleLogout = () => {
    clearUserData();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-violet-200/50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="group flex items-center gap-3 text-3xl font-black text-slate-800 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-600 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <Sparkles className="w-7 h-7 text-white group-hover:animate-pulse" />
            </div>
            <span className="group-hover:scale-105 transition-transform duration-300">
              ShopVerse
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="group flex items-center gap-2 px-4 py-2 text-lg font-semibold text-slate-700 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-all duration-300"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Package className="w-4 h-4 text-white" />
              </div>
              Products
            </Link>

            {isLoggedIn && !userIsAdmin && (
              <Link 
                to="/cart" 
                className="group relative flex items-center gap-2 px-4 py-2 text-lg font-semibold text-slate-700 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-all duration-300"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ShoppingCart className="w-4 h-4 text-white" />
                </div>
                Cart
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-full w-7 h-7 text-sm font-bold shadow-lg animate-pulse ring-2 ring-white flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            )}

            {isLoggedIn && !userIsAdmin && (
              <Link 
                to="/orders" 
                className="group flex items-center gap-2 px-4 py-2 text-lg font-semibold text-slate-700 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-all duration-300"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-4 h-4 text-white" />
                </div>
                Orders
              </Link>
            )}

            {userIsAdmin && (
              <Link 
                to="/admin" 
                className="group flex items-center gap-2 px-4 py-2 text-lg font-semibold text-slate-700 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-all duration-300"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Settings className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-300" />
                </div>
                <span className="flex items-center gap-1">
                  Admin Panel
                  <Crown className="w-4 h-4 text-yellow-500 animate-pulse" />
                </span>
              </Link>
            )}
          </nav>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center gap-3 bg-gradient-to-r from-violet-50 to-purple-50 px-6 py-3 rounded-2xl border border-violet-200/50">
                  <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-slate-700 font-medium">
                    Welcome, <span className="font-bold text-violet-600">{userName}</span>
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-red-500/30 transition-all duration-300 transform hover:scale-105"
                >
                  <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="group flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-700 text-white rounded-2xl font-bold shadow-lg hover:shadow-violet-500/30 transition-all duration-300 transform hover:scale-105"
                >
                  <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="group flex items-center gap-2 px-8 py-3 bg-white border-2 border-violet-200 text-violet-700 rounded-2xl font-bold hover:bg-violet-50 hover:border-violet-300 shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 group-hover:animate-spin transition-transform duration-300" />
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="md:hidden px-6 pb-4">
        <nav className="flex items-center justify-around bg-violet-50/80 backdrop-blur-md rounded-2xl py-3 border border-violet-200/50">
          <Link 
            to="/" 
            className="flex flex-col items-center gap-1 p-2 text-slate-700 hover:text-violet-600 transition-colors duration-300"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-medium">Products</span>
          </Link>

          {isLoggedIn && (
            <Link 
              to="/cart" 
              className="relative flex flex-col items-center gap-1 p-2 text-slate-700 hover:text-violet-600 transition-colors duration-300"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-medium">Cart</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-full w-5 h-5 text-xs font-bold flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          )}

          {isLoggedIn && (
            <Link 
              to="/orders" 
              className="flex flex-col items-center gap-1 p-2 text-slate-700 hover:text-violet-600 transition-colors duration-300"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-medium">Orders</span>
            </Link>
          )}

          {userIsAdmin && (
            <Link 
              to="/admin" 
              className="flex flex-col items-center gap-1 p-2 text-slate-700 hover:text-violet-600 transition-colors duration-300"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Settings className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-medium flex items-center gap-1">
                Admin
                <Crown className="w-3 h-3 text-yellow-500" />
              </span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;