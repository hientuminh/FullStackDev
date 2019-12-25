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
      - Adding bcrypt | bcryptjs
      - Update models and controllers
      - Add validation
      - Show more details with populate
      - Add token and permission
  </details>

## Part 5: Testing React apps, custom hooks
- [x] Login form
  <details>
    <summary>Content</summary>

    ### Creating new notes
    - Using `examples/part5a` as ui and `examples/part4d` as backend
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
    - Using backend at `part4/blog`
  </details>

- [x] props.children and proptypes
  <details>
    <summary>Content</summary>

    ### Displaying the login form only when appropriate

    ### The components children, aka. props.children
    - Using props.children to passing component as slot
    ```javascript
    <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
    ```
    ### References to components with ref
    - How can we access it outside of the component?
    - The createRef method is used to create a noteFormRef ref, that is assigned to the Togglable component containing the creation note form. The noteFormRef variable acts as a reference to the component.
    - To recap, the useImperativeHandle function is a React hook, that is used for defining functions in a component which can be invoked from outside of the component.    
    - noteFormRef.current.toggleVisibility()
    ### One point about components

    ```javascript
    <div>
      <Togglable buttonLabel="1" ref={togglable1}>
        first
      </Togglable>

      <Togglable buttonLabel="2" ref={togglable2}>
        second
      </Togglable>

      <Togglable buttonLabel="3" ref={togglable3}>
        third
      </Togglable>
    </div>
  ```
  ### Exercise
  ```javascript
  <div style={hideWhenVisible}>
    // button
  </div>
  <div style={showWhenVisible}>
    {props.children}
    // button
  </div>
  ```
  ### PropTypes
  - `npm install --save prop-types`
  ### ESLint
  - `npm add --save-dev eslint-plugin-jest`
  </details>


- [x] Testing react app

  <details>
    <summary>Content</summary>
    - Using `npm install --save-dev @testing-library/react @testing-library/jest-dom`

    ### Rendering the component for tests

    - Command: CI=true npm test
    - the console may issue a warning if you have not installed Watchman

    ### Test file location
    - In React there are (at least) two different conventions for the test file's location.
    ### Searching for content in a component
    ```javascript
    test('renders content', () => {
      const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
      }

      const component = render(
        <Note note={note} />
      )

      // method 1
      expect(component.container).toHaveTextContent(
        'Component testing is done with react-testing-library'
      )

      // method 2
      const element = component.getByText(
        'Component testing is done with react-testing-library'
      )
      expect(element).toBeDefined()

      // method 3
      const div = component.container.querySelector('.note')
      expect(div).toHaveTextContent(
        'Component testing is done with react-testing-library'
      )
    })
    ```
    ### Debug
    - `component.debug()`
    ### Clicking buttons in tests
    - using mock and fireEvent
    ### Tests for the Togglable component
    ```javascript
    const mockHandler = jest.fn()

    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={mockHandler}/>
    )

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
    ```
    ### Testing forms
    - The operating principle of the form is to synchronize the state of the input with the state of its parent React component. It is quite difficult to test the form on its own.
    - We will use wraper component for it
    ```javascript
    const Wrapper = (props) => {
      const onChange = (event) => {
        props.state.value = event.target.value
      }

      return (
        <NoteForm
          value={props.state.value}
          onSubmit={props.onSubmit}
          handleChange={onChange}
        />
      )
    }
    ```
    ### Frontend integration tests
    - Two challenge: localStore, fetchAPI
    - The manual mock concept from Jest provides us with a good solution. 
    - setupTests.js
    ```javascript
    import '@testing-library/jest-dom/extend-expect'
    let savedItems = {}

    const localStorageMock = {
      setItem: (key, item) => {
        savedItems[key] = item
      },
      getItem: (key) => savedItems[key],
      clear: () => {
        savedItems = {}
      }
    }

    Object.defineProperty(window, 'localStorage', { value: localStorageMock })
    ```
    ### Test coverage
    > CI=true npm test -- --coverage
    - Examples/part5c-testing-react-app/coverage/lcov-report/index.html
    ### Snapshot testing
    ### E2E Testing
  </details>
## Part 6: State management with Redux
## Part 7: React router, styling app with CSS and webpack
## Part 8: GraphQL
