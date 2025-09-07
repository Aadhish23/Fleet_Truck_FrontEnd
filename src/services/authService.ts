import { apiService } from './api';
import { LoginCredentials, RegisterData, LoginResponse, ProfileResponse, RegisterResponse } from '../types/auth';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await apiService.post<LoginResponse>('/api/auth/login', credentials);
      
      // Store token after successful login
      if (response.data.success && response.data.token) {
        apiService.setAuthToken(response.data.token);
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  static async register(userData: RegisterData): Promise<RegisterResponse> {
    try {
      const response = await apiService.post<RegisterResponse>('/api/auth/register', userData);
      
      // Store token after successful registration
      if (response.data.success && response.data.token) {
        apiService.setAuthToken(response.data.token);
      }
      
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  static async getProfile(): Promise<ProfileResponse> {
    try {
      const response = await apiService.get<ProfileResponse>('/api/auth/me');
      return response.data;
    } catch (error) {
      console.error('Profile fetch error:', error);
      throw error;
    }
  }

  static logout(): void {
    apiService.removeAuthToken();
  }

  static isAuthenticated(): boolean {
    return !!apiService.getAuthToken();
  }
}