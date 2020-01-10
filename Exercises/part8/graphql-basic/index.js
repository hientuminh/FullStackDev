const { ApolloServer, UserInputError, gql } = require('apollo-server')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const JWT_SECRET = "1234567890_989458234"

mongoose.set('useFindAndModify', false)
// const MONGODB_URI = 'mongodb+srv://fullstack:sekred@cluster0-ostce.mongodb.net/graphql-phonebook?retryWrites=true'
const MONGODB_URI = 'mongodb+srv://admin:livepass@cluster0-ra1o1.mongodb.net/graph?retryWrites=true&w=majority'
console.log('commecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`

  type User {
    username: String!,
    favoriteGenre: String!,
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    id: ID!,
    genres: [String!]
  }

  type Author {
    name: String,
    id: String,
    born: Int,
    bookCount: Int!
  }

  type Query {
    hello: String!,
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!],
    allAuthors: [Author!]
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      genres: [String!]
      published: Int!,
      author: String!
    ): Book

    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    hello: () => { return "world" },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.genre && !args.author) {
        return await Book.find({})
      }
      // author || genre
      let books = []
      let find_genre = {}
      let find_author = { path: 'author' }

      if (args.author) {
        find_author.match = { name: args.author }
      }

      if (args.genre) {
        find_genre = { genres: args.genre }
      }
      // if (args.author) {
      //   books = await Book
      //                   .find({})
      //                   .populate({
      //                     path: 'author',
      //                     match: { name: args.author },
      //                     select: 'name born'
      //                   })
      // }
      //
      // if (args.genre) {
      //   if (books.length === 0) {
      //     return await Book.find({ genres: args.genre }).populate('author')
      //   } else {
      //     books = books.filter(book => book.genres.includes(args.genre))
      //   }
      // }
      books = await Book
                      .find(find_genre)
                      .populate(find_author)
      return books.filter(book => book.author)
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let isAuthorSaved = await Author.findOne({name: args.author})
      try {
        if (!isAuthorSaved) {
          const person = new Author({name: args.author})
          isAuthorSaved = await person.save()
        }

        const book = new Book({
          title: args.title,
          published: args.published,
          genres: args.genres,
          author: isAuthorSaved._id
        })
        const newObject = await book.save()
        console.log(newObject)
        isAuthorSaved.books = isAuthorSaved.books.concat(newObject._id)
        await isAuthorSaved.save()
        return book
      } catch (e) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args) => {
      const updateAuthor = await Author.findOne({ name: args.name })
      try {
        if (updateAuthor) {
          updateAuthor.born = args.setBornTo
          return await updateAuthor.save()
        }
        return null
      } catch (e) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'pwd') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Author: {
    bookCount: (root) => {
      return root.books.length
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
