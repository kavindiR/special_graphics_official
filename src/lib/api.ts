// API utility for backend communication

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    bio?: string;
  };
  token: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

// Get auth token from localStorage
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
};

// Set auth token in localStorage
export const setAuthToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('auth_token', token);
};

// Remove auth token from localStorage
export const removeAuthToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth_token');
};

// Get user data from localStorage
export const getUserData = (): AuthResponse['user'] | null => {
  if (typeof window === 'undefined') return null;
  const userData = localStorage.getItem('user_data');
  return userData ? JSON.parse(userData) : null;
};

// Set user data in localStorage
export const setUserData = (user: AuthResponse['user']): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('user_data', JSON.stringify(user));
};

// Remove user data from localStorage
export const removeUserData = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('user_data');
};

// Make API request with error handling
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const token = getAuthToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || data.error || 'An error occurred',
        message: data.message || data.error || 'An error occurred',
      };
    }

    return {
      success: true,
      data: data.data || data,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Network error occurred';
    return {
      success: false,
      error: errorMessage,
      message: errorMessage,
    };
  }
}

// Auth API functions
export const authApi = {
  // Sign up
  signUp: async (data: SignUpData): Promise<ApiResponse<AuthResponse>> => {
    return apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Sign in
  signIn: async (data: SignInData): Promise<ApiResponse<AuthResponse>> => {
    return apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get current user
  getCurrentUser: async (): Promise<ApiResponse<{ user: AuthResponse['user'] }>> => {
    return apiRequest<{ user: AuthResponse['user'] }>('/auth/me', {
      method: 'GET',
    });
  },

  // Update profile
  updateProfile: async (data: {
    name?: string;
    bio?: string;
    avatar?: string;
  }): Promise<ApiResponse<{ user: AuthResponse['user'] }>> => {
    return apiRequest<{ user: AuthResponse['user'] }>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Sign out (client-side only)
  signOut: (): void => {
    removeAuthToken();
    removeUserData();
  },
};

// Inspiration API interfaces
export interface Inspiration {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface InspirationSearchParams {
  query?: string;
  category?: string;
  tags?: string[];
}

// Inspirations API functions
export const inspirationsApi = {
  // Get all inspirations
  getAll: async (): Promise<ApiResponse<Inspiration[]>> => {
    return apiRequest<Inspiration[]>('/inspirations', {
      method: 'GET',
    });
  },

  // Get inspiration by ID
  getById: async (id: string): Promise<ApiResponse<Inspiration>> => {
    return apiRequest<Inspiration>(`/inspirations/${id}`, {
      method: 'GET',
    });
  },

  // Search inspirations
  search: async (params: InspirationSearchParams): Promise<ApiResponse<Inspiration[]>> => {
    const queryParams = new URLSearchParams();
    if (params.query) queryParams.append('query', params.query);
    if (params.category) queryParams.append('category', params.category);
    if (params.tags) params.tags.forEach(tag => queryParams.append('tags', tag));
    
    return apiRequest<Inspiration[]>(`/inspirations/search?${queryParams.toString()}`, {
      method: 'GET',
    });
  },

  // Toggle like on inspiration
  toggleLike: async (id: string): Promise<ApiResponse<{ liked: boolean; likes: number }>> => {
    return apiRequest<{ liked: boolean; likes: number }>(`/inspirations/${id}/like`, {
      method: 'POST',
    });
  },
};

// Design API interfaces
export interface Design {
  id: string;
  title: string;
  description: string;
  image: string;
  tools: string;
  category: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDesignData {
  title: string;
  description: string;
  image: string;
  tools: string;
  category?: string;
}

export interface UpdateDesignData {
  title?: string;
  description?: string;
  image?: string;
  tools?: string;
  category?: string;
}

// Designs API functions
export const designsApi = {
  // Get all designs
  getAll: async (): Promise<ApiResponse<Design[]>> => {
    return apiRequest<Design[]>('/designs', {
      method: 'GET',
    });
  },

  // Get design by ID
  getById: async (id: string): Promise<ApiResponse<Design>> => {
    return apiRequest<Design>(`/designs/${id}`, {
      method: 'GET',
    });
  },

  // Create design
  create: async (data: CreateDesignData): Promise<ApiResponse<Design>> => {
    return apiRequest<Design>('/designs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update design
  update: async (id: string, data: UpdateDesignData): Promise<ApiResponse<Design>> => {
    return apiRequest<Design>(`/designs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete design
  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiRequest<void>(`/designs/${id}`, {
      method: 'DELETE',
    });
  },
};

