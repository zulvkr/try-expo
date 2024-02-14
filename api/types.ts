export interface User {
  id: number
  email: string
  name?: string
  avatar?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: User
}
