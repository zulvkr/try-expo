import { User } from '@/api/types'
import { Model, Response, createServer } from 'miragejs'
import { ModelDefinition } from 'miragejs/-types'

const UserModel: ModelDefinition<User> = Model.extend<User>({
  id: 0,
  name: '',
  email: '',
  avatar: ''
})

export const makeServer = () => {
  window.server = createServer({
    models: {
      users: UserModel
    },

    routes() {
      this.post(
        '/login',
        (schema, request) => {
          let attrs = JSON.parse(request.requestBody)
          const { email, password } = attrs
          const user = schema.db.users.findBy({ email, password })

          if (!user) {
            return new Response(
              401,
              {},
              {
                message: 'Invalid email or password'
              }
            )
          }

          return new Response(
            200,
            {},
            {
              token: 'fake-token',
              user
            }
          )
        },
        {
          timing: 1000
        }
      )

      this.passthrough()
    },

    seeds(server) {
      server.db.loadData({
        users: [
          {
            email: 'Admin@mail.com',
            password: 'admin',
            name: 'Admin Name',
            avatar: 'https://i.pravatar.cc/150?u=adminc'
          }
        ]
      })
    }
  })
}
