import { User } from '@/api/types'
import { RootState } from '@/stores/redux'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  user?: User
}

const initialState: AuthState = {}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    logout: state => {
      state.user = undefined
    }
  }
})

export const isLoggedInSelector = (state: RootState) => !!state.auth.user

export const { logout, setUser } = authSlice.actions

export default authSlice.reducer
