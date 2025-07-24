// API Configuration and Service Functions
const API_BASE_URL = 'http://localhost/backend/api';

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  category_id: number;
  category_name: string;
  price: number;
  original_price?: number;
  stock_quantity: number;
  sku: string;
  is_featured: boolean;
  is_new: boolean;
  primary_image: string;
  avg_rating: number;
  review_count: number;
  images?: ProductImage[];
  reviews?: ProductReview[];
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  alt_text: string;
  is_primary: boolean;
}

export interface ProductReview {
  id: number;
  product_id: number;
  name: string;
  email: string;
  rating: number;
  title: string;
  review_text: string;
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  product_count: number;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface CartItem {
  id: number;
  product_id: number;
  name: string;
  price: number;
  original_price?: number;
  image_url: string;
  category_name: string;
  quantity: number;
}

// API Service Class
class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Products API
  async getProducts(params?: {
    category?: string;
    featured?: boolean;
    limit?: number;
    search?: string;
  }): Promise<Product[]> {
    const searchParams = new URLSearchParams();
    
    if (params?.category) searchParams.append('category', params.category);
    if (params?.featured) searchParams.append('featured', '1');
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.search) searchParams.append('search', params.search);
    
    const query = searchParams.toString();
    return this.request<Product[]>(`/products.php${query ? `?${query}` : ''}`);
  }

  async getProduct(id: number): Promise<Product> {
    return this.request<Product>(`/products.php?id=${id}`);
  }

  // Categories API
  async getCategories(): Promise<Category[]> {
    return this.request<Category[]>('/categories.php');
  }

  // Users API
  async register(userData: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    address?: string;
    password: string;
  }): Promise<ApiResponse> {
    return this.request<ApiResponse>('/users.php', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(email: string, password: string): Promise<ApiResponse<User>> {
    return this.request<ApiResponse<User>>('/users.php', {
      method: 'POST',
      body: JSON.stringify({
        action: 'login',
        email,
        password,
      }),
    });
  }

  async getUser(id: number): Promise<User> {
    return this.request<User>(`/users.php?id=${id}`);
  }

  // Cart API
  async getCart(userId?: number, sessionId?: string): Promise<CartItem[]> {
    const params = new URLSearchParams();
    if (userId) params.append('user_id', userId.toString());
    if (sessionId) params.append('session_id', sessionId);
    
    return this.request<CartItem[]>(`/cart.php?${params.toString()}`);
  }

  async addToCart(data: {
    user_id?: number;
    session_id?: string;
    product_id: number;
    quantity: number;
  }): Promise<ApiResponse> {
    return this.request<ApiResponse>('/cart.php', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCartItem(id: number, quantity: number): Promise<ApiResponse> {
    return this.request<ApiResponse>('/cart.php', {
      method: 'PUT',
      body: JSON.stringify({ id, quantity }),
    });
  }

  async removeFromCart(id: number): Promise<ApiResponse> {
    return this.request<ApiResponse>(`/cart.php?id=${id}`, {
      method: 'DELETE',
    });
  }

  // Custom Products API
  async submitCustomRequest(data: {
    user_id?: number;
    name: string;
    email: string;
    phone?: string;
    product_type: string;
    size_description: string;
    colors: string[];
    materials: string[];
    description: string;
    budget_range: string;
    timeline: string;
    reference_images?: string[];
  }): Promise<ApiResponse> {
    return this.request<ApiResponse>('/custom-products.php', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Contact API
  async submitContactMessage(data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }): Promise<ApiResponse> {
    return this.request<ApiResponse>('/contact.php', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Newsletter API
  async subscribeNewsletter(email: string): Promise<ApiResponse> {
    return this.request<ApiResponse>('/newsletter.php', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Promo Codes API
  async validatePromoCode(code: string, orderAmount: number): Promise<ApiResponse> {
    return this.request<ApiResponse>(
      `/promo-codes.php?validate=1&code=${code}&order_amount=${orderAmount}`
    );
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Utility functions
export const generateSessionId = (): string => {
  return 'session_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

export const getSessionId = (): string => {
  let sessionId = localStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('current_user');
  return userStr ? JSON.parse(userStr) : null;
};

export const setCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem('current_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('current_user');
  }
};