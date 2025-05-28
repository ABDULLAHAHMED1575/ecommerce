import React, { useState, useEffect } from 'react';
import { Search, Package, Sparkles, Star, ShoppingBag } from 'lucide-react';
import ProductCard from './ProductCard';
import { getAllProducts } from '../services/product.service';
import { addToCart } from '../services/cart.service';
import { getCurrentUserId } from '../utils/auth';
import { showErrorMessage, showSuccessMessage } from '../utils/helper';

const ProductList = ({ onProductEdit, onProductDelete, searchTerm = '' }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  useEffect(() => {
    loadProducts();
  }, []);
  
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [products, searchTerm]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const productsData = await getAllProducts();
      setProducts(productsData);
    } catch (error) {
      showErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    try {
      const userId = getCurrentUserId();
      if (!userId) {
        showErrorMessage('Please login first');
        return;
      }

      await addToCart(userId, productId, quantity);
      showSuccessMessage('Item added to cart!');
    } catch (error) {
      showErrorMessage(error.message);
    }
  };

  const handleProductEdit = (product) => {
    if (onProductEdit) {
      onProductEdit(product);
    }
  };

  const handleProductDelete = async (productId) => {
    try {
      if (onProductDelete) {
        await onProductDelete(productId);
        loadProducts();
      }
    } catch (error) {
      showErrorMessage(error.message);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative mb-8">
            <div className="w-16 h-16 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full animate-spin">
                <div className="w-full h-full bg-white rounded-full border-4 border-transparent bg-clip-padding"></div>
              </div>
              <ShoppingBag className="absolute inset-2 w-12 h-12 text-violet-600 animate-pulse" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Loading Products</h3>
          <p className="text-lg text-slate-600 font-medium mb-6">Discovering amazing products for you...</p>
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></div>
            <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mb-8 shadow-xl">
            {searchTerm ? (
              <Search className="w-12 h-12 text-slate-400" />
            ) : (
              <Package className="w-12 h-12 text-slate-400" />
            )}
          </div>
          
          <h3 className="text-3xl font-bold text-slate-800 mb-4">
            {searchTerm ? 'No Products Found' : 'No Products Available'}
          </h3>
          
          <div className="text-center max-w-md">
            <p className="text-lg text-slate-600 mb-6">
              {searchTerm 
                ? 'No products found matching your search criteria.' 
                : 'There are no products available at the moment.'
              }
            </p>
            
            {searchTerm && (
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-blue-800">Search Tips</span>
                </div>
                <p className="text-sm text-blue-700 leading-relaxed">
                  Try searching with different keywords or check your spelling. You can also browse all products to discover something new!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {searchTerm && (
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-violet-200/50 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  Search Results for "{searchTerm}"
                </h3>
                <p className="text-slate-600 font-medium">
                  Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} matching your search
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onEdit={handleProductEdit}
            onDelete={handleProductDelete}
          />
        ))}
      </div>
      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl rounded-full px-8 py-4 border border-violet-200/50 shadow-lg">
          <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
            <Star className="w-4 h-4 text-white" />
          </div>
          <span className="text-slate-700 font-semibold">
            Showing {filteredProducts.length} of {products.length} products
          </span>
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;