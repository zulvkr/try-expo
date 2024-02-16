import { Cast, Movie, User } from '@/api/types'
import { Model, Response, belongsTo, createServer, hasMany } from 'miragejs'
import { ModelDefinition } from 'miragejs/-types'

const synopsis = `After graduating from Emory University, top student and athlete Christopher McCandless abandons his possessions, gives his entire $24,000 savings account to charity and hitchhikes to Alaska to live in the wilderness. Along the way, Christopher encounters a series of characters that shape his life.`

const picsumGenerator = (
  id: number,
  width: number = 280,
  height: number = 400
) => `https://picsum.photos/id/${id}/${width}/${height}`
const avatarGenerator = (id: number) => `https://i.pravatar.cc/150?u=${id}`
const randomId = () => Math.floor(Math.random() * 500) + 1
const randomPicsum = () => picsumGenerator(randomId())
const randomAvatar = () => avatarGenerator(randomId())

const UserModel: ModelDefinition<User> = Model.extend({})

const MovieModel: ModelDefinition<Partial<Movie>> = Model.extend({
  casts: hasMany('cast')
})

const CastModel: ModelDefinition<Partial<Cast>> = Model.extend({
  movie: hasMany('recommendation')
})

export const makeServer = () => {
  window.server = createServer({
    models: {
      user: UserModel,
      recommendation: MovieModel,
      upcoming: MovieModel,
      cast: CastModel
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

      this.get('/recommendations', (schema, request) => {
        return new Response(200, {}, schema.db.recommendations)
      })

      this.get('/upcomings', (schema, request) => {
        return new Response(200, {}, schema.db.upcomings)
      })

      this.get('/movies/:id', (schema, request) => {
        let id = request.params.id
        return schema.db.recommendations.find(id)
      })

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
            directorAvatar: randomAvatar()
          }
        ],
        recommendations: [
          {
            id: 1,
            title: 'Into the Wild',
            image: randomPicsum(),
            synopsis,
            genres: ['Adventure', 'Drama'],
            duration: 148,
            director: 'Sean Penn',
            directorAvatar: randomAvatar()
          },
          {
            title: 'The Shawshank Redemption',
            image: randomPicsum(),
            synopsis,
            genres: ['Drama', 'Crime'],
            duration: 142,
            director: 'Frank Darabont',
            directorAvatar: randomAvatar()
          },
          {
            title: 'The Godfather',
            image: randomPicsum(),
            synopsis,
            genres: ['Science Fiction', 'Adventure', 'Action', 'Thriller'],
            duration: 175,
            director: 'Christopher Nolan',
            directorAvatar: randomAvatar()
          },
          {
            title: 'The Dark Knight',
            image: randomPicsum(),
            synopsis,
            genres: ['Adventure', 'Drama'],
            duration: 152,
            director: 'Christopher Nolan',
            directorAvatar: randomAvatar()
          },

          {
            title: 'Inception',
            image: randomPicsum(),
            synopsis,
            genres: ['Action', 'Adventure', 'Sci-Fi'],
            duration: 148,
            director: 'Christopher Nolan',
            directorAvatar: randomAvatar()
          },
          {
            title: 'Pulp Fiction',
            image: randomPicsum(),
            synopsis,
            genres: ['Crime', 'Drama'],
            duration: 154,
            director: 'Quentin Tarantino',
            directorAvatar: randomAvatar()
          },
          {
            title: 'The Matrix',
            image: randomPicsum(),
            synopsis,
            genres: ['Action', 'Sci-Fi'],
            duration: 136,
            director: 'Lana Wachowski',
            directorAvatar: randomAvatar()
          },
          {
            title: 'Fight Club',
            image: randomPicsum(),
            synopsis,
            genres: ['Drama'],
            duration: 136,
            director: 'Lana Wachowski',
            directorAvatar: randomAvatar()
          },
          {
            title: 'The Lord of the Rings: The Fellowship of the Ring',
            image: randomPicsum(),
            synopsis,
            genres: ['Adventure', 'Fantasy'],
            duration: 136,
            director: 'Lana Wachowski',
            directorAvatar: randomAvatar()
          }
        ],
        upcomings: [
          {
            title: 'The Revenant',
            image: randomPicsum(),
            synopsis,
            genres: ['Adventure', 'Drama', 'Thriller'],
            director: 'Alejandro González Iñárritu',
            directorAvatar: randomAvatar()
          },
          {
            title: 'Forrest Gump',
            image: randomPicsum(),
            synopsis,
            genres: ['Drama', 'Romance'],
            director: 'Robert Zemeckis',
            directorAvatar: randomAvatar()
          },
          {
            title: 'Interstellar',
            image: randomPicsum(),
            synopsis,
            genres: ['Adventure', 'Drama', 'Sci-Fi'],
            director: 'Christopher Nolan',
            directorAvatar: randomAvatar()
          },
          {
            title: 'The Silence of the Lambs',
            image: randomPicsum(),
            synopsis,
            genres: ['Crime', 'Drama', 'Thriller'],
            director: 'Jonathan Demme',
            directorAvatar: randomAvatar()
          },
          {
            title: "Schindler's List",
            image: randomPicsum(),
            synopsis,
            genres: ['Biography', 'Drama', 'History'],
            director: 'Steven Spielberg',
            directorAvatar: randomAvatar()
          },
          {
            title: 'The Green Mile',
            image: randomPicsum(),
            synopsis,
            genres: ['Crime', 'Drama', 'Fantasy'],
            director: 'Frank Darabont',
            directorAvatar: randomAvatar()
          },
          {
            title: 'City of God',
            image: randomPicsum(),
            synopsis,
            genres: ['Crime', 'Drama'],
            director: 'Fernando Meirelles',
            directorAvatar: randomAvatar()
          },
          {
            title: 'The Departed',
            image: randomPicsum(),
            synopsis,
            genres: ['Crime', 'Drama', 'Thriller'],
            director: 'Martin Scorsese',
            directorAvatar: randomAvatar()
          },
          {
            title: 'Gladiator',
            image: randomPicsum(),
            synopsis,
            genres: ['Action', 'Adventure', 'Drama'],
            director: 'Ridley Scott',
            directorAvatar: randomAvatar()
          }
        ]
      })
    }
  })
}
