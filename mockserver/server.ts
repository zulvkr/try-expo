import { Movie, User } from '@/api/types'
import { Model, Response, createServer } from 'miragejs'
import { ModelDefinition } from 'miragejs/-types'

const synopsis = `After graduating from Emory University, top student and athlete Christopher McCandless abandons his possessions, gives his entire $24,000 savings account to charity and hitchhikes to Alaska to live in the wilderness. Along the way, Christopher encounters a series of characters that shape his life.`

const UserModel: ModelDefinition<User> = Model.extend<User>({
  id: 0,
  name: '',
  email: '',
  avatar: ''
})

const MovieModel: ModelDefinition<Partial<Movie>> = Model.extend<Movie>({
  id: 0,
  title: '',
  image: '',
  synopsis: '',
  genres: [],
  duration: 0,
  director: '',
  directorAvatar: '',
  casts: []
})

export const makeServer = () => {
  window.server = createServer({
    models: {
      users: UserModel,
      recommendations: MovieModel,
      upcomings: MovieModel
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

      this.get(
        '/recommendations',
        (schema, request) => {
          return new Response(200, {}, schema.db.recommendations)
        },
        {
          timing: 200
        }
      )

      this.get(
        '/upcomings',
        (schema, request) => {
          return new Response(200, {}, schema.db.upcomings)
        },
        {
          timing: 200
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
            avatar: 'https://i.pravatar.cc/150?u=adminc',
            synopsis,
            genres: ['Adventure', 'Drama'],
            duration: 148,
            director: 'Sean Penn',
            directorAvatar: 'https://i.pravatar.cc/150?u=seanpenn'
          }
        ],
        recommendations: [
          {
            title: 'Into the Wild',
            image: 'https://picsum.photos/id/211/280/400',
            synopsis,
            genres: ['Adventure', 'Drama'],
            duration: 148,
            director: 'Sean Penn',
            directorAvatar: 'https://i.pravatar.cc/150?u=seanpenn'
          },
          {
            title: 'The Shawshank Redemption',
            image: 'https://picsum.photos/id/222/280/400',
            synopsis,
            genres: ['Drama', 'Crime'],
            duration: 142,
            director: 'Frank Darabont',
            directorAvatar: 'https://i.pravatar.cc/150?u=frankdarabont'
          },
          {
            title: 'The Godfather',
            image: 'https://picsum.photos/id/212/280/400',
            synopsis,
            genres: ['Science Fiction', 'Adventure', 'Action', 'Thriller'],
            duration: 175,
            director: 'Christopher Nolan',
            directorAvatar: 'https://i.pravatar.cc/150?u=christophernolan'
          },
          {
            title: 'The Dark Knight',
            image: 'https://picsum.photos/id/200/280/400',
            synopsis,
            genres: ['Adventure', 'Drama'],
            duration: 152,
            director: 'Christopher Nolan',
            directorAvatar: 'https://i.pravatar.cc/150?u=christophernolan'
          },

          {
            title: 'Inception',
            image: 'https://picsum.photos/id/275/280/400',
            synopsis,
            genres: ['Action', 'Adventure', 'Sci-Fi'],
            duration: 148,
            director: 'Christopher Nolan',
            directorAvatar: 'https://i.pravatar.cc/150?u=christophernolan'
          },
          {
            title: 'Pulp Fiction',
            image: 'https://picsum.photos/id/25/280/400',
            synopsis,
            genres: ['Crime', 'Drama'],
            duration: 154,
            director: 'Quentin Tarantino',
            directorAvatar: 'https://i.pravatar.cc/150?u=quentintarantino'
          },
          {
            title: 'The Matrix',
            image: 'https://picsum.photos/id/234/280/400',
            synopsis,
            genres: ['Action', 'Sci-Fi'],
            duration: 136,
            director: 'Lana Wachowski',
            directorAvatar: 'https://i.pravatar.cc/150?u=lanawachowski'
          },
          {
            title: 'Fight Club',
            image: 'https://picsum.photos/id/232/280/400',
            synopsis,
            genres: ['Drama'],
            duration: 136,
            director: 'Lana Wachowski',
            directorAvatar: 'https://i.pravatar.cc/150?u=lanawachowski'
          },
          {
            title: 'The Lord of the Rings: The Fellowship of the Ring',
            image: 'https://picsum.photos/id/233/280/400',
            synopsis,
            genres: ['Adventure', 'Fantasy'],
            duration: 136,
            director: 'Lana Wachowski',
            directorAvatar: 'https://i.pravatar.cc/150?u=lanawachowski'
          }
        ],
        upcomings: [
          {
            title: 'The Revenant',
            image: 'https://picsum.photos/id/101/280/400',
            synopsis: null,
            genres: ['Adventure', 'Drama', 'Thriller'],
            director: 'Alejandro González Iñárritu',
            directorAvatar: 'https://i.pravatar.cc/150?u=alejandro'
          },
          {
            title: 'Forrest Gump',
            image: 'https://picsum.photos/id/102/280/400',
            synopsis: null,
            genres: ['Drama', 'Romance'],
            director: 'Robert Zemeckis',
            directorAvatar: 'https://i.pravatar.cc/150?u=robertzemeckis'
          },
          {
            title: 'Interstellar',
            image: 'https://picsum.photos/id/103/280/400',
            synopsis: null,
            genres: ['Adventure', 'Drama', 'Sci-Fi'],
            director: 'Christopher Nolan',
            directorAvatar: 'https://i.pravatar.cc/150?u=christophernolan'
          },
          {
            title: 'The Silence of the Lambs',
            image: 'https://picsum.photos/id/104/280/400',
            synopsis: null,
            genres: ['Crime', 'Drama', 'Thriller'],
            director: 'Jonathan Demme',
            directorAvatar: 'https://i.pravatar.cc/150?u=jonathandemme'
          },
          {
            title: "Schindler's List",
            image: 'https://picsum.photos/id/105/280/400',
            synopsis: null,
            genres: ['Biography', 'Drama', 'History'],
            director: 'Steven Spielberg',
            directorAvatar: 'https://i.pravatar.cc/150?u=stevenspielberg'
          },
          {
            title: 'The Green Mile',
            image: 'https://picsum.photos/id/106/280/400',
            synopsis: null,
            genres: ['Crime', 'Drama', 'Fantasy'],
            director: 'Frank Darabont',
            directorAvatar: 'https://i.pravatar.cc/150?u=frankdarabont'
          },
          {
            title: 'City of God',
            image: 'https://picsum.photos/id/107/280/400',
            synopsis: null,
            genres: ['Crime', 'Drama'],
            director: 'Fernando Meirelles',
            directorAvatar: 'https://i.pravatar.cc/150?u=fernandomeirelles'
          },
          {
            title: 'The Departed',
            image: 'https://picsum.photos/id/108/280/400',
            synopsis: null,
            genres: ['Crime', 'Drama', 'Thriller'],
            director: 'Martin Scorsese',
            directorAvatar: 'https://i.pravatar.cc/150?u=martinscorsese'
          },
          {
            title: 'Gladiator',
            image: 'https://picsum.photos/id/109/280/400',
            synopsis: null,
            genres: ['Action', 'Adventure', 'Drama'],
            director: 'Ridley Scott',
            directorAvatar: 'https://i.pravatar.cc/150?u=ridleyscott'
          }
        ]
      })
    }
  })
}
