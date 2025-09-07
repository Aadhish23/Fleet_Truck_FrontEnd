// First, define the required types
interface ApiResponse<T = any> {
  data: T;
  status: number;
}

interface ApiError extends Error {
  message: string;
  status?: number;
  data?: any;
}

interface RequestConfig extends RequestInit {
  headers?: Record<string, string>;
  timeout?: number;
}

// Your corrected ApiService class
class ApiService {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    this.timeout = 10000;
  }

  // Generic request method
  async request<T = any>(endpoint: string, options: RequestConfig = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestConfig = {
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        ) as ApiError;
        error.status = response.status;
        error.data = errorData;
        throw error;
      }

      const data = await response.json();
      return { data, status: response.status };
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  // GET request - improved params typing
  async get<T = any>(
    endpoint: string, 
    params: Record<string, string | number | boolean> = {}
  ): Promise<ApiResponse<T>> {
    // Convert params to string values for URLSearchParams
    const stringParams: Record<string, string> = {};
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        stringParams[key] = String(value);
      }
    });

    const queryString = new URLSearchParams(stringParams).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request<T>(url, {
      method: 'GET',
    });
  }

  // POST request
  async post<T = any, D = any>(endpoint: string, data: D): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put<T = any, D = any>(endpoint: string, data: D): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // PATCH request
  async patch<T = any, D = any>(endpoint: string, data: D): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  // Upload file
  async uploadFile<T = any>(
    endpoint: string, 
    file: File, 
    additionalData: Record<string, string> = {}
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);
    
    Object.keys(additionalData).forEach(key => {
      formData.append(key, additionalData[key]);
    });

    return this.request<T>(endpoint, {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    });
  }

  // Set auth token
  setAuthToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Remove auth token
  removeAuthToken(): void {
    localStorage.removeItem('authToken');
  }

  // Get auth token
  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Alternative: Export the class if you need multiple instances
export { ApiService };