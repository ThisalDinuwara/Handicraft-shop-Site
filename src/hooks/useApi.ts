import { useState, useEffect } from 'react';
import { apiService, Product, Category, User, CartItem } from '../services/api';

// Custom hook for products
export const useProducts = (params?: {
  category?: string;
  featured?: boolean;
  limit?: number;
  search?: string;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await apiService.getProducts(params);
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params?.category, params?.featured, params?.limit, params?.search]);

  return { products, loading, error, refetch: () => fetchProducts() };
};

// Custom hook for categories
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await apiService.getCategories();
        setCategories(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

// Custom hook for cart
export const useCart = (userId?: number, sessionId?: string) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await apiService.getCart(userId, sessionId);
      setCartItems(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId || sessionId) {
      fetchCart();
    }
  }, [userId, sessionId]);

  const addToCart = async (productId: number, quantity: number = 1) => {
    try {
      await apiService.addToCart({
        user_id: userId,
        session_id: sessionId,
        product_id: productId,
        quantity,
      });
      await fetchCart(); // Refresh cart
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to cart');
      return false;
    }
  };

  const updateCartItem = async (id: number, quantity: number) => {
    try {
      await apiService.updateCartItem(id, quantity);
      await fetchCart(); // Refresh cart
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update cart');
      return false;
    }
  };

  const removeFromCart = async (id: number) => {
    try {
      await apiService.removeFromCart(id);
      await fetchCart(); // Refresh cart
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove from cart');
      return false;
    }
  };

  return {
    cartItems,
    loading,
    error,
    addToCart,
    updateCartItem,
    removeFromCart,
    refetch: fetchCart,
  };
};

// Custom hook for authentication
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing user in localStorage
    const savedUser = localStorage.getItem('current_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.login(email, password);
      
      if (response.success && response.data) {
        setUser(response.data);
        localStorage.setItem('current_user', JSON.stringify(response.data));
        return true;
      } else {
        setError(response.message || 'Login failed');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    address?: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.register(userData);
      
      if (response.success) {
        // Auto-login after successful registration
        return await login(userData.email, userData.password);
      } else {
        setError(response.message || 'Registration failed');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('current_user');
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
};