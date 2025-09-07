export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  _id?: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
  __v?: number;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  manager: User;
}

export interface ProfileResponse {
  success: boolean;
  data: User;
}

export interface RegisterResponse {
  success: boolean;
  token: string;
  user: User;
}