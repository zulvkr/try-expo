import { Server } from 'miragejs'

export declare global {
  interface Window {
    server?: Server
  }
  const server: Server
}
