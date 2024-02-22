import { LoginResponse, LoginRequest, Movie } from '@/api/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { authSlice } from '../auth/stores/authSlice'

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery(),
  endpoints: builder => ({
    getRecommendations: builder.query<Movie[], any>({
      query: () => '/recommendations'
    }),
    getUpcomings: builder.query<Movie[], any>({
      query: () => '/upcomings'
    }),
    getMovie: builder.query<Movie, any>({
      query: (id: string) => `/movies/${id}`
    }),
    postLogin: builder.mutation<LoginResponse, LoginRequest>({
      query: body => ({
        url: '/login',
        method: 'POST',
        body
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const {
          data: { user }
        } = await queryFulfilled
        if (user) {
          dispatch(
            authSlice.actions.setUser({
              id: user.id,
              email: user.email,
              avatar: user.avatar,
              name: user.name
            })
          )
        }
      }
    })
  })
})

export const {
  useGetRecommendationsQuery,
  useGetUpcomingsQuery,
  useGetMovieQuery,
  usePostLoginMutation
} = apiSlice
