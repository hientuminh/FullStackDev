# FullStackDev
The repository for MERN + GraphQL

# Content
## Part 0: Fundamentals of Web apps
- [x] General info
- [x] Fundamentals of Web apps
## Part 1: Introduction to React
- [x] Introduction to React
- [x] JavaScript
- [x] Component state, event handlers
- [x] A more complex state, debugging React apps
## Part 2: Communicating with server
- [x] Rendering a collection, modules
- [x] Forms
- [x] Getting data from server
- [x] Altering data in server
- [x] Adding style to React app
## Part 3: Programming a server with NodeJS and Express
- [x] Node.js and Express
- [x] Deploying app to internet
  - [x] Exercise phonebook
    - https://github.com/hientuminh/phonebook
    - https://powerful-harbor-41906.herokuapp.com/
- [x] Saving data to MongoDB
  - https://cloud.mongodb.com/v2/5c7cf3d29ccf640d3d59ef13#metrics/replicaSet/5df85164f2a30bcfa429de94/explorer/phonebook/people/find
- [x] Validation and ESLint
## Part 4: Testing Express server, user administration
- [x] Structure of backend application, introduction to testing
  <details>
    <summary>Content</summary>

    ### Project structure
    ```md
    ### Project structure
    ### Exercises
    ### Testing Note applications
    ### Exercises
    ```
  </details>

- [x] Testing the backend
  <details>
    <summary>Content</summary>

    ```md
    ### Test environment
    ### supertest
    ### Logger
    ### Intializing the database before tests
    ### Running tests one by one
    ### async/await
    ### async/await in the backend
    ### More tests and refactoring the backend
    ### Error handling and async/await
    ### Optimizing the beforeEach function
    ### Exercises
    ### Refactoring tests
    ### Exercises
    ```
  </details>

- [x] User administration
  <details>
    <summary>Content</summary>

    ### References across
    - User and Note have one-to-many relationship
    ```javascript
      users = [
        {
          username: 'mluukkai',
          _id: 123456,
        },
        {
          username: 'hellas',
          _id: 141414,
        },
      ]

      notes = [
        {
          content: 'HTML is easy',
          important: false,
          _id: 221212,
          user: 123456,
        },
        {
          content: 'The most important operations of HTTP protocol are GET and POST',
          important: true,
          _id: 221255,
          user: 123456,
        },
        {
          content: 'A proper dinosaur codes with Java',
          important: false,
          _id: 221244,
          user: 141414,
        },
      ]
    ```
    ### Mongoose schema for users
    ```javascript
    const mongoose = require('mongoose')

    const userSchema = new mongoose.Schema({
      username: String,
      name: String,
      passwordHash: String,
      notes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Note'
        }
      ],
    })

    userSchema.set('toJSON', {
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
      }
    })

    const User = mongoose.model('User', userSchema)

    module.exports = User
    ```
    ```javascript
    const noteSchema = new mongoose.Schema({
      content: {
        type: String,
        required: true,
        minlength: 5
      },
      date: Date,
      important: Boolean,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    })
    ```
    ### Creating users
    - Using bcrypt `npm install bcrypt --save`
    ```javascript
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    ```
    ### Populate
    - The Mongoose join is done with the populate method.
    ```javascript
    const users = await User.find({}).populate('notes', { content: 1, date: 1 })
    ```
  </details>

- [x] Token authentication
  <details>
    <summary>Content</summary>

    ### Limiting creating new notes to logged in users
    - Using JWT `npm install jsonwebtoken --save`

    ```javascript
    const getTokenFrom = request => {
      const authorization = request.get('authorization')
      if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
      }
      return null
    }
    ```
    ### Error handling
    - using errorHandler with JsonWebTokenError
    ### Exercise
    - Add authen for bloglist
  </details>

## Part 5: Testing React apps, custom hooks
- [x] Login form
  <details>
    <summary>Content</summary>

    ### Creating new notes
    - services/login.js

    ```javascript
    import axios from 'axios'
    const baseUrl = '/api/login'

    const login = async credentials => {
      const response = await axios.post(baseUrl, credentials)
      return response.data
    }

    export default { login }
    ```
    - Condition rendering
    ```javascript
    {user === null && loginForm()}
    {user !== null && noteForm()}
    ```
    ### Saving the token to browsers local storage
    - setItem, getItem, removeItem
    ```javascript
    window.localStorage.setItem('name', 'juha tauriainen')
    ```
    ### Exercises
    - Using https://github.com/fullstackopen-2019/bloglist-frontend
    - Login frontend
  </details>

- [ ] props.children and proptypes
  <details>
    <summary>Content</summary>

    ```md
    ### Displaying the login form only when appropriate
    ### References to components with ref
    ### One point about components
    ### PropTypes
    ### ESlint
    ```
  </details>

## Part 6: State management with Redux
## Part 7: React router, styling app with CSS and webpack
## Part 8: GraphQL
