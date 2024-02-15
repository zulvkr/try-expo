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

export interface Movie {
  id: number
  genres: string[]
  duration: number
  director: string
  directorAvatar: string
  title: string
  image: string
  synopsis: string
  casts: Cast[]
}

export interface Cast {
  id: number
  name: string
  avatar: string
  role: string
}
