import toast from 'react-hot-toast';
import { ShoppingCart, Edit, Trash2, Star, Package, Heart, Sparkles, CheckCircle, XCircle } from 'lucide-react';
import { formatPrice, isProductInStock, getStockStatus } from '../utils/helper';
import { isUserLoggedIn, requireAuth, isAdmin } from '../utils/auth';

const ProductCard = ({ product, onAddToCart, onEdit, onDelete }) => {
  const userIsAdmin = isAdmin();
  const inStock = isProductInStock(product);
  const stockStatus = getStockStatus(product);

  const handleAddToCart = () => {
    if (!requireAuth()) return;
    
    if (!inStock) {
      toast.error('Product is out of stock');
      return;
    }
    
    onAddToCart(product.id, 1);
  };

  const handleEdit = () => {
    onEdit(product);
  };

  const handleDelete = () => {
    toast((t) => (
      <div className="flex flex-col space-y-3">
        <p>Are you sure you want to delete "{product.name}"?</p>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              onDelete(product.id);
            }}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: 0,
      style: {
        background: '#fff',
        color: '#000',
        maxWidth: '400px',
      },
    });
  };

  return (
    <div className="group bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-violet-200/50 overflow-hidden hover:shadow-violet-500/20 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 relative">
      <div className="absolute top-4 right-4 z-10">
        <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${
          inStock 
            ? 'bg-emerald-500/90 text-white' 
            : 'bg-red-500/90 text-white'
        }`}>
          {inStock ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
          {stockStatus}
        </div>
      </div>
      <div className="relative h-64 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        <img
          src={product.image_url || '/images/default-product.jpg'}
          alt={product.name}
          className="w-full h-full object-fill group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = '/images/default-product.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      <div className="p-6 relative">
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full blur-2xl opacity-50"></div>
        
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-violet-600 transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col">
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-slate-500 font-medium">Best Price Guaranteed</span>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-2 text-slate-600">
                <Package className="w-4 h-4" />
                <span className="text-sm font-semibold">{product.stock} units</span>
              </div>
              <span className="text-xs text-slate-500">Available Stock</span>
            </div>
          </div>
          <div className="flex gap-3">
            {userIsAdmin ? (
              <>
                <button
                  onClick={handleEdit}
                  className="group/btn flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 font-semibold"
                >
                  <Edit className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="group/btn flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white py-3 px-4 rounded-2xl hover:from-red-600 hover:to-rose-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/30 flex items-center justify-center gap-2 font-semibold"
                >
                  <Trash2 className="w-4 h-4 group-hover/btn:animate-bounce transition-transform duration-300" />
                  Delete
                </button>
              </>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`group/btn w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform shadow-xl flex items-center justify-center gap-3 ${
                  inStock
                    ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-800 text-white hover:scale-105 hover:-translate-y-1 hover:shadow-emerald-500/30'
                    : 'bg-slate-400 text-slate-600 cursor-not-allowed'
                }`}
              >
                {inStock ? (
                  <>
                    <ShoppingCart className="w-5 h-5 group-hover/btn:animate-bounce transition-transform duration-300" />
                    <span>
                      {isUserLoggedIn() ? 'Add to Cart' : 'Login to Add to Cart'}
                    </span>
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5" />
                    <span>Out of Stock</span>
                  </>
                )}
              </button>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-violet-200/50">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-500" />
                <span>Verified Product</span>
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-violet-500" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500" />
                <span>Top Rated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;