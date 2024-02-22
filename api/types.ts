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

export interface LoginResponse {
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

export interface Cinema {
  name: string
  rating: number // 1-5 with 1 decimal
  city: string
  favorite: boolean
  reviewCount: number
  image: string
  distance: string
}

export interface Ticket {
  id: number
  movie: Movie
  cinema: Cinema
  date: string
  time: string
  price: number
  booked: boolean
}

export interface Booking {
  id: number
  movieId: number
  cinemaId: number
  date: string
  startEndTimes: string
  hall: string
  row: string
  seat: string
  price: number
  serviceFee: number
  total: number
}
