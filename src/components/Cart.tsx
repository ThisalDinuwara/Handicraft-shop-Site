import React, { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard, Truck } from 'lucide-react';
import { CartItem } from '../App';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, cartItems }) => {
  const [localCartItems, setLocalCartItems] = useState<CartItem[]>(cartItems);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');

  // Update local cart items when props change
  React.useEffect(() => {
    setLocalCartItems(cartItems);
  }, [cartItems]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setLocalCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setLocalCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'welcome10') {
      setAppliedPromo('WELCOME10');
      setPromoCode('');
    }
  };

  const subtotal = localCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedPromo === 'WELCOME10' ? subtotal * 0.1 : 0;
  const shipping = subtotal > 10000 ? 0 : 500;
  const total = subtotal - discount + shipping;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex">
      <div className="ml-auto bg-white w-full max-w-md h-full overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-red-100 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-bold text-red-900">Shopping Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-red-600" />
          </button>
        </div>

        {localCartItems.length === 0 ? (
          /* Empty Cart */
          <div className="flex flex-col items-center justify-center h-96 p-6 text-center">
            <ShoppingBag className="w-16 h-16 text-red-300 mb-4" />
            <h3 className="text-xl font-semibold text-red-900 mb-2">Your cart is empty</h3>
            <p className="text-red-600 mb-6">Add some beautiful handicrafts to get started!</p>
            <button
              onClick={onClose}
              className="bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="p-6 space-y-4">
              {localCartItems.map((item) => (
                <div key={item.id} className="flex space-x-4 p-4 bg-red-50 rounded-lg border border-red-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-red-600 mb-2">{item.category}</p>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-bold text-red-900">
                        Rs. {item.price.toLocaleString()}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          Rs. {item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-red-600" />
                        </button>
                        <span className="w-8 text-center font-semibold text-red-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code */}
            <div className="px-6 pb-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="flex-1 px-4 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <button
                  onClick={applyPromoCode}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
                >
                  Apply
                </button>
              </div>
              {appliedPromo && (
                <p className="text-green-600 text-sm mt-2">✓ Promo code {appliedPromo} applied!</p>
              )}
            </div>

            {/* Order Summary */}
            <div className="px-6 py-4 bg-red-50 border-t border-red-100">
              <h3 className="font-semibold text-red-900 mb-4">Order Summary</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-red-700">Subtotal</span>
                  <span className="text-red-900">Rs. {subtotal.toLocaleString()}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedPromo})</span>
                    <span>-Rs. {discount.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-red-700 flex items-center">
                    <Truck className="w-4 h-4 mr-1" />
                    Shipping
                  </span>
                  <span className="text-red-900">
                    {shipping === 0 ? 'Free' : `Rs. ${shipping.toLocaleString()}`}
                  </span>
                </div>
                
                {shipping === 0 && (
                  <p className="text-xs text-green-600">Free shipping on orders over Rs. 10,000</p>
                )}
                
                <div className="border-t border-red-200 pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span className="text-red-900">Total</span>
                    <span className="text-red-900">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="p-6">
              <button className="w-full bg-red-900 hover:bg-red-800 text-white py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2 mb-4">
                <CreditCard className="w-5 h-5" />
                <span>Proceed to Checkout</span>
              </button>
              
              <button
                onClick={onClose}
                className="w-full border border-red-300 text-red-700 py-3 rounded-lg font-medium hover:bg-red-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;