import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'

interface User {
  id: string
  name: string
  email: string
  avatar: string
}

export interface AuthState {
  user?: User
}

const initialState: AuthState = {}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    logout: state => {
      state.user = undefined
    }
  }
})

export const isLoggedIn = createSelector(
  [(state: AuthState) => state.user],
  user => !!user
)

export const { login, logout } = authSlice.actions

export default authSlice.reducer
