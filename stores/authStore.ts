import { postLogin } from '@/api/api'
import { LoginResponse, LoginRequest, User } from '@/api/types'
import axios from 'axios'
import { makeAutoObservable, flow } from 'mobx'

export class AuthStore {
  user: User | undefined | null = undefined
  loginErrorMessage: string | null = null
  loginRequestStatus: 'idle' | 'pending' | 'done' | 'error' = 'idle'

  constructor() {
    makeAutoObservable(this, {
      login: flow
    })
  }

  setUser(user: User) {
    this.user = user
  }

  logout() {
    this.user = null
  }

  get isAuth() {
    return !!this.user
  }

  *login(user: LoginRequest) {
    try {
      this.loginErrorMessage = null
      this.loginRequestStatus = 'pending'
      const res = (yield postLogin(user.email, user.password)) as Awaited<
        ReturnType<typeof axios.post<LoginResponse>>
      >
      this.setUser(res.data.user)
      this.loginRequestStatus = 'done'
    } catch (error) {
      this.loginRequestStatus = 'error'
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          this.loginErrorMessage = 'Invalid email or password'
        }
      } else if (error instanceof Error) {
        this.loginErrorMessage = error.message
      }
    }
  }
}

// Singleton
export const authStore = new AuthStore()
