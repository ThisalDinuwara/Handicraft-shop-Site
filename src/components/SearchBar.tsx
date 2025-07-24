import React, { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'masks', name: 'Traditional Masks' },
    { id: 'textiles', name: 'Textiles & Fabrics' },
    { id: 'wood', name: 'Wood Crafts' },
    { id: 'pottery', name: 'Pottery & Ceramics' },
    { id: 'jewelry', name: 'Jewelry & Accessories' },
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: '0-5000', name: 'Under Rs. 5,000' },
    { id: '5000-15000', name: 'Rs. 5,000 - 15,000' },
    { id: '15000-30000', name: 'Rs. 15,000 - 30,000' },
    { id: '30000+', name: 'Above Rs. 30,000' },
  ];

  const searchResults = [
    {
      id: 1,
      name: 'Raksha Devil Mask',
      category: 'Traditional Masks',
      price: 4500,
      image: 'https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      id: 2,
      name: 'Handwoven Batik Sarong',
      category: 'Textiles & Fabrics',
      price: 3200,
      image: 'https://images.pexels.com/photos/6069113/pexels-photo-6069113.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      id: 3,
      name: 'Carved Elephant Sculpture',
      category: 'Wood Crafts',
      price: 8900,
      image: 'https://images.pexels.com/photos/6069114/pexels-photo-6069114.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      id: 4,
      name: 'Silver Temple Jewelry',
      category: 'Jewelry & Accessories',
      price: 12500,
      image: 'https://images.pexels.com/photos/6069116/pexels-photo-6069116.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
  ];

  const filteredResults = searchResults.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === categories.find(c => c.id === selectedCategory)?.name;
    
    let matchesPrice = true;
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
      if (max) {
        matchesPrice = item.price >= parseInt(min) && item.price <= parseInt(max);
      } else {
        matchesPrice = item.price >= parseInt(min);
      }
    }
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery, selectedCategory, priceRange);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-2xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-red-100 p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-red-900">Search Products</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-red-600" />
          </button>
        </div>

        {/* Search Form */}
        <div className="p-6 border-b border-red-100">
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for handicrafts, masks, textiles..."
                className="w-full pl-12 pr-4 py-4 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-red-900 mb-2">
                  <Filter className="w-4 h-4 inline mr-1" />
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-red-900 mb-2">
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-4 py-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {priceRanges.map((range) => (
                    <option key={range.id} value={range.id}>
                      {range.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-900 hover:bg-red-800 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Search Products
            </button>
          </form>
        </div>

        {/* Search Results */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-red-900">
              {searchQuery ? `Results for "${searchQuery}"` : 'Popular Products'}
            </h3>
            <span className="text-red-600">
              {filteredResults.length} {filteredResults.length === 1 ? 'item' : 'items'} found
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResults.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 p-4 bg-red-50 rounded-lg border border-red-100 hover:shadow-md transition-shadow cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-red-900 mb-1">{item.name}</h4>
                  <p className="text-sm text-red-600 mb-2">{item.category}</p>
                  <p className="font-bold text-red-900">Rs. {item.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredResults.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-red-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-red-900 mb-2">No results found</h3>
              <p className="text-red-600">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;