import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/OrderPage';
import AdminPage from './pages/AdminPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import { getCurrentUserId, isUserLoggedIn } from './utils/auth';
import { getCart } from './services/cart.service';

function App() {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    updateCartCount();
  }, []);

  const updateCartCount = async () => {
    try {
      if (!isUserLoggedIn()) {
        setCartItemsCount(0);
        return;
      }

      const userId = getCurrentUserId();
      if (!userId) return;

      setLoading(true);
      const cart = await getCart(userId);
      
      if (cart && cart.items) {
        const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        setCartItemsCount(totalItems);
      } else {
        setCartItemsCount(0);
      }
    } catch (error) {
      setCartItemsCount(0);
    } finally {
      setLoading(false);
    }
  };
  const refreshCartCount = () => {
    updateCartCount();
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: '',
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
            error: {
              duration: 4000,
              theme: {
                primary: 'red',
                secondary: 'black',
              },
            },
          }}
        />
        <Header cartItemsCount={cartItemsCount} />

        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={<Dashboard onCartUpdate={refreshCartCount} />} 
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-9xl font-bold text-gray-400 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <div className="space-x-4">
          <a
            href="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </a>
          <a
            href="/login"
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;