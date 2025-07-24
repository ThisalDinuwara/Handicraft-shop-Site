import React, { useState } from 'react';
import { ShoppingCart, Heart, Eye, Star, Check } from 'lucide-react';
import { CartItem } from '../App';

interface ProductsProps {
  onAddToCart: (product: Omit<CartItem, 'quantity'>) => void;
}

const Products: React.FC<ProductsProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [addedToCart, setAddedToCart] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'masks', name: 'Traditional Masks' },
    { id: 'textiles', name: 'Textiles' },
    { id: 'wood', name: 'Wood Crafts' },
    { id: 'pottery', name: 'Pottery' },
    { id: 'jewelry', name: 'Jewelry' },
  ];

  const products = [
    {
      id: 1,
      name: 'Raksha Devil Mask',
      category: 'masks',
      price: 4500,
      originalPrice: 5500,
      image: 'https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      reviews: 24,
      isNew: true,
      isFeatured: true,
    },
    {
      id: 2,
      name: 'Handwoven Batik Sarong',
      category: 'textiles',
      price: 3200,
      originalPrice: 4000,
      image: 'https://images.pexels.com/photos/6069113/pexels-photo-6069113.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      reviews: 18,
      isNew: false,
      isFeatured: true,
    },
    {
      id: 3,
      name: 'Carved Elephant Sculpture',
      category: 'wood',
      price: 8900,
      originalPrice: 10500,
      image: 'https://images.pexels.com/photos/6069114/pexels-photo-6069114.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      reviews: 31,
      isNew: true,
      isFeatured: false,
    },
    {
      id: 4,
      name: 'Clay Water Pot Set',
      category: 'pottery',
      price: 2800,
      originalPrice: 3500,
      image: 'https://images.pexels.com/photos/6069115/pexels-photo-6069115.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.6,
      reviews: 15,
      isNew: false,
      isFeatured: false,
    },
    {
      id: 5,
      name: 'Silver Temple Jewelry',
      category: 'jewelry',
      price: 12500,
      originalPrice: 15000,
      image: 'https://images.pexels.com/photos/6069116/pexels-photo-6069116.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      reviews: 42,
      isNew: true,
      isFeatured: true,
    },
    {
      id: 6,
      name: 'Peacock Dance Mask',
      category: 'masks',
      price: 5200,
      originalPrice: 6200,
      image: 'https://images.pexels.com/photos/6069117/pexels-photo-6069117.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      reviews: 28,
      isNew: false,
      isFeatured: true,
    },
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const handleAddToCart = (product: typeof products[0]) => {
    const cartItem: Omit<CartItem, 'quantity'> = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
    };
    
    onAddToCart(cartItem);
    setAddedToCart(product.id);
    
    // Reset the button after 2 seconds
    setTimeout(() => {
      setAddedToCart(null);
    }, 2000);
  };
  return (
    <section id="products" className="py-20 bg-gradient-to-b from-red-50 to-white relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-red-900 mb-4">
            Our <span className="text-yellow-600">Collection</span>
          </h2>
          <p className="text-xl text-red-700 max-w-3xl mx-auto leading-relaxed">
            Each piece in our collection represents the finest Sri Lankan craftsmanship, 
            carefully curated to bring you authentic traditional art
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-red-900 text-white shadow-lg transform scale-105'
                  : 'bg-white text-red-900 border-2 border-red-200 hover:border-red-400 hover:bg-red-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-red-100"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {product.isNew && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      NEW
                    </span>
                  )}
                  {product.isFeatured && (
                    <span className="bg-yellow-500 text-red-900 px-3 py-1 rounded-full text-xs font-bold">
                      FEATURED
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors">
                    <Heart className="w-5 h-5 text-red-600" />
                  </button>
                  <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors">
                    <Eye className="w-5 h-5 text-red-600" />
                  </button>
                </div>

                {/* Discount Badge */}
                {product.originalPrice > product.price && (
                  <div className="absolute bottom-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-red-900 mb-2 group-hover:text-red-700 transition-colors">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl font-bold text-red-900">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-gray-500 line-through">
                      Rs. {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button 
                  onClick={() => handleAddToCart(product)}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 group ${
                    addedToCart === product.id
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-red-900 hover:bg-red-800 text-white'
                  }`}
                >
                  {addedToCart === product.id ? (
                    <>
                      <Check className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-yellow-500 hover:bg-yellow-400 text-red-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Load More Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;