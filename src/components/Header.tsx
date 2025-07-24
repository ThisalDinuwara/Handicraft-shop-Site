import React, { useState } from 'react';
import { Menu, X, ShoppingCart, Search, User, Palette } from 'lucide-react';
import { CartItem } from '../App';
import CustomProduct from './CustomProduct';
import Cart from './Cart';
import Login from './Login';
import SearchBar from './SearchBar';

interface HeaderProps {
  cartItems: CartItem[];
}

const Header: React.FC<HeaderProps> = ({ cartItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCustomProductOpen, setIsCustomProductOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header className="bg-red-900/95 backdrop-blur-sm text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-yellow-300">K</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-yellow-300">Kandu Pinnawala</h1>
              <p className="text-xs text-red-200">Traditional Handicrafts</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="hover:text-yellow-300 transition-colors">Home</a>
            <a href="#products" className="hover:text-yellow-300 transition-colors">Products</a>
            <button 
              onClick={() => setIsCustomProductOpen(true)}
              className="hover:text-yellow-300 transition-colors flex items-center space-x-1"
            >
              <Palette className="w-4 h-4" />
              <span>Custom Order</span>
            </button>
            <a href="#about" className="hover:text-yellow-300 transition-colors">About</a>
            <a href="#gallery" className="hover:text-yellow-300 transition-colors">Gallery</a>
            <a href="#contact" className="hover:text-yellow-300 transition-colors">Contact</a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:bg-red-800 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="p-2 hover:bg-red-800 rounded-lg transition-colors"
            >
              <User className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-red-800 rounded-lg transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-red-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-red-800 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-red-800">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="hover:text-yellow-300 transition-colors">Home</a>
              <a href="#products" className="hover:text-yellow-300 transition-colors">Products</a>
              <button 
                onClick={() => {
                  setIsCustomProductOpen(true);
                  setIsMenuOpen(false);
                }}
                className="hover:text-yellow-300 transition-colors flex items-center space-x-2 text-left"
              >
                <Palette className="w-4 h-4" />
                <span>Custom Order</span>
              </button>
              <a href="#about" className="hover:text-yellow-300 transition-colors">About</a>
              <a href="#gallery" className="hover:text-yellow-300 transition-colors">Gallery</a>
              <a href="#contact" className="hover:text-yellow-300 transition-colors">Contact</a>
              <div className="flex items-center space-x-4 pt-4 border-t border-red-800">
                <button 
                  onClick={() => {
                    setIsSearchOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="p-2 hover:bg-red-800 rounded-lg transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => {
                    setIsLoginOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="p-2 hover:bg-red-800 rounded-lg transition-colors"
                >
                  <User className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => {
                    setIsCartOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="p-2 hover:bg-red-800 rounded-lg transition-colors relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-500 text-red-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
      </header>

      {/* Modals */}
      <CustomProduct 
        isOpen={isCustomProductOpen} 
        onClose={() => setIsCustomProductOpen(false)} 
      />
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
      />
      <Login 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
      <SearchBar 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};

export default Header;