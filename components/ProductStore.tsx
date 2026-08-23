import React, { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Star, ChevronDown, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { productAPI } from '../services/api';
import { mockProducts } from '../data/mockProducts';
import type { Product } from '../types';

const ProductStore: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useCart();

  // Debug: Log component mount
  console.log('ProductStore component mounted');

  // Fetch products from API
  useEffect(() => {
    console.log('useEffect running');
    
    // Use full mock products with Indian pricing
    console.log('Setting mock products:', mockProducts);
    setProducts(mockProducts);
    setCategories(['All', 'Food', 'Toys', 'Grooming', 'Beds', 'Treats', 'Accessories', 'Bowls', 'Crates']);
    setLoading(false);
    setError(null);
  }, []);

  // Debug logging
  useEffect(() => {
    console.log('Products state:', products);
    console.log('Selected category:', selectedCategory);
    console.log('Search term:', searchTerm);
  }, [products, selectedCategory, searchTerm]);

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    console.log('Added to cart:', product);
  };

  // Filter products based on category and search
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Debug filtered products
  console.log('Filtered products:', filteredProducts);
  console.log('Loading:', loading, 'Error:', error);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-heading font-bold text-gray-800 mb-2">Pawsome Picks</h2>
        <p className="text-gray-600">Curated essentials for your furry friend.</p>
        
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {categories.map((cat, index) => (
            <button 
              key={`${cat}-${index}`} 
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all shadow-sm border ${
                selectedCategory === cat 
                  ? 'bg-coral-500 text-white border-coral-500' 
                  : 'bg-white text-gray-600 border-gray-100 hover:border-coral-300 hover:text-coral-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="max-w-md mx-auto mt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-coral-500 focus:ring-2 focus:ring-coral-200"
            />
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral-500"></div>
        </div>
      )}
      
      {error && (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600"
          >
            Retry
          </button>
        </div>
      )}
      
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, idx) => (
            <div 
              key={product.id} 
              className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 relative overflow-hidden"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-gray-100">
                 <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                 <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center shadow-sm">
                   <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
                   <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                 </div>
              </div>

              <div className="px-2">
                <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider">{product.category}</span>
                <h3 className="text-lg font-heading font-bold text-gray-800 mt-1 mb-2 group-hover:text-coral-500 transition-colors">{product.name}</h3>
                <div className="flex items-center justify-between mt-4 mb-2">
                  <span className="text-xl font-bold text-gray-900">{product.price}₹</span>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="bg-gray-900 text-white p-2.5 rounded-xl hover:bg-coral-500 transition-colors shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      )}
    </div>
  );
};

export default ProductStore;
