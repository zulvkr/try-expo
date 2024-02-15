import axios from 'axios'
import { Movie } from './types'

export const postLogin = (email: string, password: string) => {
  return axios.post('/login', { email, password })
}

export const getRecommendations = async () => {
  const res = await axios.get<Movie[]>('/recommendations')
  return res.data
}

export const getUpcomings = async () => {
  const res = await axios.get<Movie[]>('/upcomings')
  return res.data
}

export const getMovie = async (movieId: string) => {
  const res = await axios.get<Movie>(`/movies/${movieId}`)
  return res.data
}
