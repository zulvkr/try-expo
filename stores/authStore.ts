import { makeAutoObservable, flow } from 'mobx'

type User = {
  id: number
  name: string
  email: string
  avatar: string
}

export class AuthStore {
  user: User | undefined | null = {
    id: 1,
    name: 'John Doe',
    email: 'john@gmail.com',
    avatar: 'https://example.com/avatar.png'
  }

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

  *login(): Generator<unknown, void, unknown> {
    this.loginRequestStatus = 'pending'
    try {
      const response = (yield fetch('https://api.example.com/user')) as Awaited<
        ReturnType<typeof fetch>
      >
      const user = (yield response.json()) as User
      this.setUser(user)
      this.loginRequestStatus = 'done'
    } catch (error) {
      this.loginRequestStatus = 'error'
    }
  }
}

export const authStore = new AuthStore()
