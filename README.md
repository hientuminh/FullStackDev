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
- [x] Custom hooks
  <details>
    <summary>Content</summary>

    ### Custom hooks
    - React offer 10 built-in hooks
    - Custom hooks must start with the word `use`
    ### Spread attributes
    - Since the name object has exactly all of the attributes that the input element expects to receive as props, we can pass the props to the element using the spread syntax in the following way
    ```javascript
    <input {...name} />
    const App = () => {
      const name = useField('text')
      const born = useField('date')
      const height = useField('number')

      return (
        <div>
          <form>
            name:
            <input  {...name} />
            <br/>
            birthdate:
            <input {...born} />
            <br />
            height:
            <input {...height} />
          </form>
          <div>
            {name.value} {born.value} {height.value}
          </div>
        </div>
      )
    }
    ```
    ### Revisited hook
    > npm install --save eslint-plugin-react-hooks
    ```javascript
    module.exports = {
      // ...
      "plugins": [
        // ...
        "react-hooks"
      ],
      "rules": {
        "react-hooks/rules-of-hooks": "error",
        // ...
      }
    }
    - https://github.com/rehooks/awesome-react-hooks
    - https://overreacted.io/why-do-hooks-rely-on-call-order/
    - https://usehooks.com/
    ```
  </details>
## Part 6: State management with Redux
- [x] Flux-architecture and Redux
  <details>
    <summary>Content</summary>

    ### Flux-architecture
    - Facebook developed the Flux- architecture to make state management easier. In Flux, the state is separated completely from the React-components into its own stores. State in the store is not changed directly, but with different actions.
    - [Flux Offical](https://facebook.github.io/flux/docs/in-depth-overview/)
    ### Redux
    - Facebook has an implementation for Flux, but we will be using the Redux - library. It works with the same principle, but is a bit simpler. Facebook also uses Redux now instead of their original Flux.
    - [Redux offical](https://redux.js.org/)
    > npm install redux --save
    - The impact of the action to the state of the application is defined using a reducer.
    - Reducer is never supposed to be called directly from the applications code. Reducer is only given as a parameter to the createStore-function which creates the store
    ```javascript
    import { createStore } from 'redux'
    const counterReducer = (state = 0, action) => {
      // ...
    }
    const store = createStore(counterReducer)
    ```
    - The third important method the store has is subscribe, which is used to create recall functions the store calls when its state is changed.
    ### Pure functions, immutable
    ```javascript
    const noteReducer = (state = [], action) => {
      if (action.type === 'NEW_NOTE') {
        state.push(action.data)
        return state
      }

      return state
    }
    ```
    - The application seems to be working, but the reducer we have declared is bad. It breaks the basic assumption of Redux reducer that reducers must be pure functions. A reducer state must be composed of immutable objects. If there is a change in the state, the old object is not changed, but it is replaced with a new, changed, object. This is exactly what we did with the new reducer: the old array is replaced with the new.
    ### Array spread syntax
    ```javascript
    case 'NEW_NOTE':
      return [...state, action.data]
    ```
    ### DeepFreeze
    ```javascript
    test('good is incremented', () => {
      const action = {
        type: 'GOOD'
      }
      const state = initialState

      deepFreeze(state)
      const newState = counterReducer(state, action)
      expect(newState).toEqual({
        good: 1,
        ok: 0,
        bad: 0
      })
    })
    ```
    ### Uncontrolled form
    - The implementation of both functionalities is straightforward. It is noteworthy that we have not bound the state of the form fields to the state of the App component like we have previously done. React calls this kind of form uncontrolled.
    - https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/
    - https://travisnguyen.net/reactjs/2018/04/17/reactjs-form-uncontrolled-controlled/
    - https://techblog.vn/reactjs-uncontrolled-vs-controlled-forms
    ### Action creators
    ```javascript
    const createNote = (content) => {
      return {
        type: 'NEW_NOTE',
        data: {
          content,
          important: false,
          id: generateId()
        }
      }
    }
    const addNote = (event) => {
      event.preventDefault()
      const content = event.target.note.value
      noteStore.dispatch(createNote(content))
      event.target.note.value = ''
    }
    ```
    ### Passing the state using props
    ```javascript
    import React from 'react'
    import ReactDOM from 'react-dom'
    import { createStore } from 'redux'
    import App from './App'
    import noteReducer from './reducers/noteReducer'

    const store = createStore(noteReducer)

    const renderApp = () => {
      ReactDOM.render(
        <App store={store}/>,
        document.getElementById('root')
      )
    }

    renderApp()
    store.subscribe(renderApp)
    ```
  </details>
- [x] Many reducers, connect
  <details>
    <summary>Content</summary>

    ### Combine
    ```javascript
    import { createStore, combineReducers } from 'redux'

    const reducer = combineReducers({
      notes: noteReducer,
      filter: filterReducer
    })
    ```
    ### Store with complex state
    ```javascript
        all          <input type="radio" name="filter"
      onChange={filterSelected('ALL')} />
    important    <input type="radio" name="filter"
      onChange={filterSelected('IMPORTANT')} />
    nonimportant <input type="radio" name="filter"
      onChange={filterSelected('NONIMPORTANT')} />
    ```
    ### Connect
    - To get rid of this unpleasantness we will use the connect function provided by the React Redux library. This is currently the de facto solution for passing the Redux store to React components.
    > npm install --save react-redux
    ```javascript
    <Provider store={store}>
      <App />
    </Provider>
    ```
    - The component needs the list of notes and the value of the filter from the Redux store. The connect function accepts a so-called mapStateToProps function as its first parameter. The function can be used for defining the props of the connected component that are based on the state of the Redux store.
    ### Referencing action creators passed as props
    ```javascript
    const mapDispatchToProps = dispatch => {
      return {
        createNote: value => {
          dispatch(createNote(value))
        }
      }
    }

    export default connect(
      null,
      mapDispatchToProps
    )(NewNote)
    ```
    - Previously mapStateToProps was simply used for selecting pieces of state from the store, but in this case we are also using the notesToShow function to map the state into the desired filtered list of notes. The new version of notesToShow receives the store's state in its entirety, and selects an appropriate piece of the store that is passed to the component. Functions like this are called selectors.
    - Our new Notes component is almost entirely focused on rendering notes and is quite close to being a so-called presentational component. According to the description provided by Dan Abramov, presentation components:
      - Are concerned with how things look.
      - May contain both presentational and container components inside, and usually have some DOM markup and styles of their own.
      - Often allow containment via props.children.
      - Have no dependencies on the rest of the app, such as Redux actions or stores.
      - Don’t specify how the data is loaded or mutated.
      - Receive data and callbacks exclusively via props.
      - Rarely have their own state (when they do, it’s UI state rather than data).
      - Are written as functional components unless they need state, lifecycle hooks, or performance optimizations.
    - Fits the description of a container component. According to the description provided by Dan Abramov, container components:
      - Are concerned with how things work.
      - May contain both presentational and container components inside but usually don’t have any DOM markup of their own except for some wrapping divs, and never have any styles.
      - Provide the data and behavior to presentational or other container components.
      - Call Redux actions and provide these as callbacks to the presentational components.
      - Are often stateful, as they tend to serve as data sources.
      - Are usually generated using higher order components such as connect from React Redux, rather than written by hand.

  </details>
- [x] Commnicating with server in a redux application
  <details>
    <summary>Content</summary>

    ### Exercises
    ```javascript
    import noteService from './services/notes'

    const reducer = combineReducers({
      notes: noteReducer,
      filter: filterReducer,
    });

    const store = createStore(reducer);

    noteService.getAll().then(notes =>
      notes.forEach(note => {
        store.dispatch({ type: 'NEW_NOTE', data: note })
      })
    )
    ```
    - Other
    ```javascript
    import noteReducer, { initializeNotes } from './reducers/noteReducer'
    // ...

    noteService.getAll().then(notes =>
      store.dispatch(initializeNotes(notes))
    )
    ```
    - Why didn't we use await in place of promises and event handlers (registered to `then` -methods):
    > Await only works inside async functions, and the code in index.js is not inside a function, so due to the simple nature of the operation, we'll abstain from using async this time.
    - Improve
    ```javascript
    import React, { useEffect } from 'react'
    import { connect } from 'react-redux'
    import NewNote from './components/NewNote'
    import Notes from './components/Notes'
    import VisibilityFilter from './components/VisibilityFilter'
    import noteService from './services/notes'
    import { initializeNotes } from './reducers/noteReducer'

    const App = (props) => {
      useEffect(() => {
        noteService
          .getAll().then(notes => props.initializeNotes(notes))
      },[])

      return (
        <div>
          <NewNote />
          <VisibilityFilter />
          <Notes />
        </div>
      )
    }

    export default connect(null, { initializeNotes })(App)
    ```
    - New Note
    ```javascript
    import React from 'react'
    import { connect } from 'react-redux'
    import { createNote } from '../reducers/noteReducer'
    import noteService from '../services/notes'

    const NewNote = (props) => {
      const addNote = async (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        const newNote = await noteService.createNew(content)
        props.createNote(newNote)
      }

      return (
        // ...
      )
    }

    export default connect(null, { createNote } )(NewNote)
    // createNote in noteReducer
    export const createNote = (data) => {
      return {
        type: 'NEW_NOTE',
        data,
      }
    }
    ```
    ### Asynchronous actions and redux thunk
    - Both components would only use the function provided to them as a prop without caring about the communication with the server that is happening in the background.
    > npm install --save redux-thunk
    ### Redux DevTools
    > npm install --save redux-devtools-extension
    - Add redux-thunk
    - Create store.js
    - move store, reducer from index.js to store.js
    - Move services in component to reducer
    - Using dispatch in reducer to call other reducer or setTimeout
  </details>
## Part 7: React router, styling app with CSS and webpack
- [x] React router
  <details>
    <summary>Content</summary>

    ### React router
    > npm install --save react-router-dom
    ```javascript
    import {
      BrowserRouter as Router,
      Route, Link, Redirect, withRouter
    } from 'react-router-dom'

    const App = () => {

      const padding = { padding: 5 }

      return (
        <div>
          <Router>
            <div>
              <div>
                <Link style={padding} to="/">home</Link>
                <Link style={padding} to="/notes">notes</Link>
                <Link style={padding} to="/users">users</Link>
              </div>
              <Route exact path="/" render={() => <Home />} />
              <Route path="/notes" render={() => <Notes />} />
              <Route path="/users" render={() => <Users />} />
            </div>
          </Router>
        </div>
      )
    }
    ```
    - BrowserRouter is a Router that uses the HTML5 history API (pushState, replaceState and the popState event) to keep your UI in sync with the URL.
    ### Parameterized route
    ### withRouter and history
    - There are a few notable things about the implementation of the form. When logging in, we call the function onSubmit, which calls a method called push of the history-object received by the component as a prop. The command props.history.push('/') results in the address bar of the browser changing its address to /thereby making the application render the respective component, which in this case is Home.
    - The component gets access to the history-prop after it is "wrapped" by the function withRouter.
    ```javascript
    const LoginWithNoHistory = (props) => {
      const onSubmit = (event) => {
        event.preventDefault()
        props.onLogin('mluukkai')
        props.history.push('/')
      }

      return (
        <div>
          <h2>login</h2>
          <form onSubmit={onSubmit}>
            <div>
              username: <input />
            </div>
            <div>
              password: <input type='password' />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      )
    }

    const Login = withRouter(LoginWithNoHistory)
    ```

    ### redirect
    ```javascript
    <Route path="/users" render={() =>
      user ? <Users /> : <Redirect to="/login" />
    } />
    ```
  </details>
- [x] More about styles
  <details>
    <summary>Content</summary>

    ### Ready-made UI libraries
    > npm install --save react-bootstrap

    > npm install --save semantic-ui-react

    > import { Table } from 'react-bootstrap'
    ### Closing thoughts
    - Instead of using the React Bootstrap library, we could have just as well used Bootstrap directly by defining CSS classes to our application's HTML elements. Instead of defining the table with the Table component:
    ```javascript
    ```
    ### Other UI frameworks
    - [Material](http://www.material-ui.com/)
    - [Bulma](https://bulma.io/)
    - [Ant](https://ant.design/)
    - [Zurb](https://foundation.zurb.com/)
    ### Styled components
    >
    ```javascript
    const Button = styled.button`
      background: Bisque;
      font-size: 1em;
      margin: 1em;
      padding: 0.25em 1em;
      border: 2px solid Chocolate;
      border-radius: 3px;
    `

    const Input = styled.input`
      margin: 0.25em;
    `
    ```
  </details>
- [x] Webpack
  <details>
    <summary>Content</summary>

    ### Bundling
    - build directory
    ```md
    ├── asset-manifest.json
    ├── favicon.ico
    ├── index.html
    ├── manifest.json
    ├── precache-manifest.8082e70dbf004a0fe961fc1f317b2683.js
    ├── service-worker.js
    └── static
        ├── css
        │   ├── main.f9a47af2.chunk.css
        │   └── main.f9a47af2.chunk.css.map
        └── js
            ├── 1.578f4ea1.chunk.js
            ├── 1.578f4ea1.chunk.js.map
            ├── main.8209a8f2.chunk.js
            ├── main.8209a8f2.chunk.js.map
            ├── runtime~main.229c360f.js
            └── runtime~main.229c360f.js.map
    ```
    > npm installl --save-dev webpack webpack-cli
    ### Configuration file
    ```javascript
    const path = require('path')

    const config = {
      entry: './src/index.js',
      output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.js'
      }
    }

    module.exports = config
    ```
    ### Building React
    > npm install --save react react-dom
    ### Loaders
    ```javascript
    {
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['@babel/preset-react']
      }
    }
    ```
    > npm install @babel/core babel-loader @babel/preset-react --save-dev
    - It's worth noting that if the bundled application's source code uses async/await, the browser will not render anything on some browsers. Googling the error message in the console will shed some light on the issue. We have to install one more missing dependency, that is @babel/polyfill:
    > npm install --save @babel/polyfill
    ### Transpilers
    - The process of transforming code from one form of JavaScript to another is called transpiling. The general definition of the term is to compile source code by transforming it from one language to another.
    - The transpilation process that is executed by Babel is defined with plugins. In practice, most developers use ready-made presets that are groups of pre-configured plugins.
    - Currently we are using the @babel/preset-react preset for transpiling the source code of our application. Let's add the @babel/preset-env plugin that contains everything needed to take code using all of the latest features and transpile it to code that is compatible with the ES5 standard:
    ```javascript
    {
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['@babel/preset-env', '@babel/preset-react']
      }
    }
    ```
    - This will cause the transpilation process to break:
    ```javascript
    {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
    }
    ```
    > npm install style-loader css-loader --save-dev
    ### Webpack-dev-server
    - The current configuration makes it possible to develop our application but the workflow is awful (to the point where it resembles the development workflow with Java). Every time we make a change to the code we have to bundle it and refresh the browser in order to test the code.
    > npm install --save-dev webpack-dev-server
    ### Minifying the code
    - UglifyJS
    ### Development and production configuration
    > npx static-server
    ```javascript
    const path = require('path')
    const webpack = require('webpack')

    const config = (env, argv) => {
      console.log('argv', argv.mode)

      const backend_url = argv.mode === 'production'
        ? 'https://radiant-plateau-25399.herokuapp.com/api/notes'
        : 'http://localhost:3001/notes'

      return {
        entry: './src/index.js',
        output: {
          path: path.resolve(__dirname, 'build'),
          filename: 'main.js'
        },
        devServer: {
          contentBase: path.resolve(__dirname, 'build'),
          compress: true,
          port: 3000,
        },
        devtool: 'source-map',
        module: {
          // ...
        },
        plugins: [
          new webpack.DefinePlugin({
            BACKEND_URL: JSON.stringify(backend_url)
          })
        ]
      }
    }

    module.exports = config
    ```
    ### Polyfill
    - Our application is finished and works with all relatively recent versions of modern browsers, with the exception of Internet Explorer. The reason for this is that because of axios our code uses Promises, and no existing version of IE supports them:
    - The polyfill provided by the promise-polyfill library is easy to use, we simply have to add the following to our existing application code:

  </details>
- [x] Class components, E2E-testing
  <details>
    <summary>content</summary>

    ### Class components
    ```javascript
    import React from 'react'

    class App extends React.Component {
      constructor(props) {
        super(props)

        this.state = {
          anecdotes: [],
          current: 0
        }
      }

      componentDidMount = () => {
        axios.get('http://localhost:3001/anecdotes').then(response => {
          this.setState({ anecdotes: response.data })
        })
      }

      handleClick = () => {
        const current = Math.round(
          Math.random() * this.state.anecdotes.length
        )
        this.setState({ current })
      }

      render() {
        if (this.state.anecdotes.length === 0 ) {
          return <div>no anecdotes...</div>
        }

        return (
          <div>
            <h1>anecdote of the day</h1>
            <div>{this.state.anecdotes[this.state.current].content}</div>
            <button onClick={this.handleClick}>next</button>
          </div>
        )
      }
    }

    export default App
    ```
    ### End to end testing of the application
    - In the year 2018 a software library called **Cypress** has quickly grown in favor in E2E-testing. Cypress is exceptionally easy to use. The amount of legwork one has to do compared to using, e.g. Selenium, is practically non existent. Cypress' way of operating differs radically from most libraries used for E2E-testing. This is because Cypress-tests are all run entirely within the browser. With other approaches the tests are in a Node-process, which is connected to the browser through the APIs that it offers
    ```javascript
    describe('Note app',  function() {
      // ...

      it('login form can be opened', function() {
        cy.visit('http://localhost:3000')
        cy.contains('log in')
          .click()
      })
    })
    ```
    ### Controlling the state of the database
    ```javascript
    describe('Note app', function() {
      beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
          name: 'Matti Luukkainen',
          username: 'mluukkai',
          password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
      })

      it('front page can be opened', function() {
        cy.contains('Notes')
      })
    })
    ```
  </details>
- [x] Miscellaneous
  <details>
    <summary>Content</summary>

    ### Organization of code in React application
    - https://medium.com/hackernoon/the-100-correct-way-to-structure-a-react-app-or-why-theres-no-such-thing-3ede534ef1ed
    - Directory: components, reducers, services, ...
    ### Frontend and backend in the same repository
    - Using one "single-repository-code" with buildpack
    ### Changes on the server
    - WebSockets
    ### On the role of React in applications
    ### Security
    - OWSAP
    - Snyk
    - Helmet to backend
    ### Current trends
    - Typed versions of JS => TypeScript
    - Server side rendering
    - PWA
    - Microservice architecture: A microservice architecture (microservices) is a way of composing the backend of an application from many separate, independent services, which communicate with each other over the network. An individual microservice's purpose is to take care of a particular logical functional whole. In a pure microservice architecture the services do not use a shared database.
    - Serverless
    - Useful libraries and interesting links: immutable.js, remmber, Immer, redux-saga
    - https://reactpatterns.com/
  </details>
- [ ] Exercise (not yet)
## Part 8: GraphQL
- [x] GraphQL-server
  <details>
    <summary>Content</summary>

    ### Schemas and queries
    - In the recent years GraphQL, developed by Facebook, has become popular for communication between web applications and servers.
    - The GraphQL philosophy is very different from REST. REST is resource based. Every resource, for example a user has its own address which identifies it, for example /users/10. All operations done to the resource are done with HTTP requests to its URL. The action depends on the used HTTP-method.
    - The main principle of GraphQL is, that the code on the browser forms **a query describing the data wanted**, and sends it to the API with an HTTP POST request. Unlike REST, all GraphQL queries are sent to the same address, and their type is POST.
    - In the heart of all GraphQL applications is a schema, which describes the data sent between client and the server. The initial schema for our phonebook is as follows:
    ```javascript
    type Person {
      name: String!
      phone: String
      street: String!
      city: String!
      id: ID!
    }

    type Query {
      personCount: Int!
      allPersons: [Person!]!
      findPerson(name: String!): Person
    }
    ```
    - The schema describles 2 types. The first type, Person, determines that persons have five fields. Four of the fields are type String, which is one of the scalar types of GraphQL. All of the String fields, except phone, must be given a value. This is marked by the exclamation mark on the schema. The type of the field id is ID. ID fields are strings, but GraphQL ensures they are unique. The second type is a Query. Practically every GraphQL schema describes a Query, which tells what kind of queries can be made to the API.
    - Despite its name, GraphQL does not actually have anything to do with databases. It does not care how the data is saved. The data a GraphQL API uses can be saved into a relational database, document database, or to other servers which GraphQL-server can access with for example REST.
    ### Apllo server
    > npm install --save apollo-server graphql
    - The heart of the code is an ApolloServer, which is given two parameters
    ```javascript
    const server = new ApolloServer({
      typeDefs, // The first parameter, typeDefs, contains the GraphQL schema.
      resolvers, //The second parameter is an object, which contains the resolvers of the server. These are the code, which defines how GraphQL queries are responded to.
    })
    ```
    ### GraphQL-playground
    > node index.js
    ```json
    query {
      allPersons {
        name,
        phone
      }
    }
    ```
    ### Parameters of a resolver
    - A GraphQL-server must define resolvers for each field of each type in the schema. We have so far only defined resolvers for fields of the type Query, so for each query of the application.
    ```javascript
    const resolvers = {
      Query: {
        ...
      },
      Person: {
        name: (root) => root.name,
        phone: (root) => root.phone,
        street: (root) => root.street,
        city: (root) => root.city,
        id: (root) => root.id,
      }
    }
    ```
    ### Object within an object
    - So every time a Person object is returned, the fields name, phone and id are returned using their default resolvers, but the field address is formed by using a self defined resolver. The parameter root of the resolver function is the person-object, so the street and the city of the address can be taken from its fields.
    ```javascript
    const resolvers = {
      Query: {
        ...
      },
      Person: {
        address: (root) => {
          return {
            street: root.street,
            city: root.city,
            country: 'VietNam'
          }
        }
      }
    }
    ```
    ### Mutation
    - Let's add functionality for adding new persons to the phonebook. In GraphQL, all operations which cause a change are done with mutations. Mutations are described in the schema as the keys of type Mutation. The schema for a mutation for adding a new person looks as follows:
    ```javascript
    type Mutation {
      addPerson(
        name: String!
        phone: String
        street: String!
        city: String!
      ): Person
    }
    const resolvers = {
      // ...
      Mutation: {
        addPerson: (root, args) => {
          const person = { ...args, id: uuid() }
          persons = persons.concat(person)
          return person
        }
      }
    }
    ```
    - So the resolver of the address field of the Person type formats the response object to the right form.
    ### Error handling
    - UserInputError

    ### Enum
    ```javascript
    enum YesNo {
      YES
      NO
    }

    type Query {
      personCount: Int!
      allPersons(phone: YesNo): [Person!]!
      findPerson(name: String!): Person
    }

    Query: {
      personCount: () => persons.length,
      allPersons: (root, args) => {
        if (!args.phone) {
          return persons
        }
        const byPhone = (person) =>
          args.phone === 'YES' ? person.phone : !person.phone
        return persons.filter(byPhone)
      },
      findPerson: (root, args) =>
        persons.find(p => p.name === args.name)
    },
    ```
    ### Changing a phone number
    ```javascript
    type Mutation {
      addPerson(
        name: String!
        phone: String
        street: String!
        city: String!
      ): Person
      editNumber(
        name: String!
        phone: String!
      ): Person
    }
    ```
    ### More on queries
    ```javascript
    query {
      havePhone: allPersons(phone: YES){
        name
      }
      phoneless: allPersons(phone: NO){
        name
      }
    }
    ```
    ### Exercise (done)
  </details>
- [x] React and GraphQL
  <details>
    <summary>Content</summary>

    ### Apollo client
    > npm install apollo-boost react-apollo graphql --save
    ```javascript
    import React from 'react'
    import ReactDOM from 'react-dom'

    import ApolloClient, { gql } from 'apollo-boost'

    const client = new ApolloClient({
      uri: 'http://localhost:4000/graphql'
    })

    const query = gql`
    {
      allPersons  {
        name,
        phone,
        address {
          street,
          city
        }
        id
      }
    }
    `

    client.query({ query })
      .then((response) => {
        console.log(response.data)
      })

    const App = () => {
      return <div>
        test
      </div>
    }

    ReactDOM.render(<App />, document.getElementById('root'))
    ```
    ### Query-component
    ```javascript
    const App = () => {
      return <Query query={ALL_PERSONS}>
        {(result) => <Persons result={result} />}
      </Query>
    }
    ```
    ### Named queries and variables
    - The component we just used,Query, is not optimal for our purposes, because we would like to make the query only when a user wants to see the details of a person. One way would be to use the query method of the client object. All components of the application can access the query object via the ApolloConsumer component. Let's modify the App component to fetch a reference to the query object via ApolloConsumer, and pass it on to the Persons component.
    ```javascript
    const Persons = ({ result, client }) => {
      const [person, setPerson] = useState(null)

      if (result.loading) {
        return <div>loading...</div>
      }

      const showPerson = async (name) => {
        const { data } = await client.query({
          query: FIND_PERSON,
          variables: { nameToSearch: name }
        })
        setPerson(data.findPerson)
      }
    }
    ```
    ### Cache
    - When we do multiple queries for example the address details of Arto Hellas, we notice something interesting: The query to the backend is done only the first time around. After this, despite of the same query being done again by the code, the query is not sent to the backend.
    - Apollo client saves the responses of queries to cache. To optimize performance if the response to a query is already in the cache, the query is not sent to the server at all.
    - Data in the cache is organized by query. Because Person objects have an identifying field id which is type ID, if the same object is returned by multiple queries, Apollo is able to combine them into one. Because of this, doing findPerson queries for the address details of Arto Hellas has updated the address details also for the query allPersons.
    ### Mutation-component
    - The pros and cons of this solution are almost opposite of the previous one. There is no extra web traffic, because queries are not done just in case. However if one user now updates the state of the server, the changes do not show to other users immediately. There are other ways to update the cache. More about those later in this part.
    ```javascript
    const CREATE_PERSON = gql`
      mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
        addPerson(
          name: $name,
          street: $street,
          city: $city,
          phone: $phone
        ) {
          name
          phone
          id
          address {
            street
            city
          }
        }
      }
    `

    const PersonForm = (props) => {
      const [name, setName] = useState('')
      const [phone, setPhone] = useState('')
      const [street, setStreet] = useState('')
      const [city, setCity] = useState('')

      const submit = async (e) => {
        e.preventDefault()
        await props.addPerson({
          variables: { name, phone, street, city }
        })

        setName('')
        setPhone('')
        setStreet('')
        setCity('')
      }

      return (
        <div>
          <form onSubmit={submit}>
            <div>
              name <input
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </div>
            <div>
              phone <input
                value={phone}
                onChange={({ target }) => setPhone(target.value)}
              />
            </div>
            <div>
              street <input
                value={street}
                onChange={({ target }) => setStreet(target.value)}
              />
            </div>
            <div>
              city <input
                value={city}
                onChange={({ target }) => setCity(target.value)}
              />
            </div>
            <button type='submit'>add!</button>
          </form>
        </div>
      )
    }

    const App = () => {
      return (
        <div>
          <ApolloConsumer>
            {(client =>
              <Query query={ALL_PERSONS}>
                {(result) =>
                  <Persons result={result} client={client} />
                }
              </Query>
            )}
          </ApolloConsumer>
          <h2>create new</h2>
          <Mutation mutation={CREATE_PERSON} refetchQueries={[{query: ALL_PERSONS}]}>
            {(addPerson) =>
              <PersonForm
                addPerson={addPerson}
              />
            }
          </Mutation>
        </div>
      )
    }
    ```
    ### Handling mutation error messages
    ```javascript
    const [errorMessage, setErrorMessage] = useState(null)
    const handleError = (error) => {
      setErrorMessage(error.graphQLErrors[0].message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 10000)
    }
    <Mutation
      mutation={createPerson}
      refetchQueries={[{ query: allPersons }]}
      onError={handleError}
    >
    ```
    ### Updating a phone number
    ```javascript
    const EDIT_NUMBER = gql`
    mutation editNumber($name: String!, $phone: String!) {
      editNumber(name: $name, phone: $phone)  {
        name
        phone
        address {
          street
          city
        }
        id
      }
    }
    `
    ```
    ### Apollo Client and the applications state
    ### Render props
    - GraphQL components Query, Mutation and ApolloConsumer follow the so called render props principle. A component following this principle is given, as props or as a child between its tags (which technically is also a props), a function which defines how the component is rendered. With the render props -principle it is possible to move data or function references to the component responsible for rendering.
    - The Render props -principle has been quite popular. For example react router we used in part 7 uses it. Using the component Route of the React router it is defined what the application renders when the browser is in a certain url. The following defines, that if the url is /notes, the component Notes is rendered, and if the url is for example /notes/10, a Note component which has been given id 10 as a parameter is rendered.
    ### Apollo with hooks
    > npm install --save react-apollo
    ```javascript
      import { useQuery } from '@apollo/react-hooks'
      const persons = useQuery(ALL_PERSONS)
      <ApolloConsumer>
        {(client =>
          <Query query={ALL_PERSONS}>
            {(result) =>
              <Persons result={result} client={client} />
            }
          </Query>
        )}
      </ApolloConsumer>

    <Query query={ALL_PERSONS}>
      {(result) => <Persons result={result} />}
    </Query>

    <Persons result={persons} />
    ```
    ### Exercise
    > npm install --save graphql react-apollo
    - Add apollo for index.js
    ```javascript
    import ApploClient from 'apollo-boost'
    import { ApolloProvider } from "@apollo/react-hooks"

    const client = new ApploClient({
      uri: 'http://localhost:4000/graphql'
    })

    ReactDOM.render(
      <ApolloProvider client={client} >
        <App />
      </ApolloProvider>,
      document.getElementById('root')
    )
    ```
    - Add query for Authors
  </details>
- [x] Database and user administration
  <details>
    <summary>Content</summary>

    ### Mongoose and Apollo
    ```javascript
    const { ApolloServer, UserInputError, gql } = require('apollo-server')
    const mongoose = require('mongoose')
    const Person = require('./models/person')

    mongoose.set('useFindAndModify', false)

    const MONGODB_URI = 'mongodb+srv://fullstack:fullstack@cluster0-ostce.mongodb.net/graphql?retryWrites=true'

    console.log('connecting to', MONGODB_URI)

    mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
      .then(() => {
        console.log('connected to MongoDB')
      })
      .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
      })

    const typeDefs = gql`
      ...
    `

    const resolvers = {
      Query: {
        personCount: () => Person.collection.countDocuments(),
        allPersons: (root, args) => {
          // filters missing
          return Person.find({})
        },
        findPerson: (root, args) => Person.findOne({ name: args.name })
      },
      Person: {
        address: root => {
          return {
            street: root.street,
            city: root.city
          }
        }
      },
      Mutation: {
        addPerson: (root, args) => {
          const person = new Person({ ...args })
          return person.save()
        },
        editNumber: async (root, args) => {
          const person = await Person.findOne({ name: args.name })
          person.phone = args.phone
          return person.save()
        }
      }
    }
    ```
    ### Validation
    ```javascript
    Mutation: {
        addPerson: async (root, args) => {
        const person = new Person({ ...args })

        try {
          await person.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return person
      },
        editNumber: async (root, args) => {
          const person = await Person.findOne({ name: args.name })
          person.phone = args.phone

          try {
            await person.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
          return person
        }
    }
    ```
    ### User and log in
    ```javascript
    const jwt = require('jsonwebtoken')

    const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

    Mutation: {
      // ..
      createUser: (root, args) => {
        const user = new User({ username: args.username })

        return user.save()
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })

        if ( !user || args.password !== 'secred' ) {
          throw new UserInputError("wrong credentials")
        }

        const userForToken = {
          username: user.username,
          id: user._id,
        }

        return { value: jwt.sign(userForToken, JWT_SECRET) }
      },
    },
    ```
    - Server with context
    ```javascript
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
          const decodedToken = jwt.verify(
            auth.substring(7), JWT_SECRET
          )
          const currentUser = await User.findById(decodedToken.id).populate('friends')
          return { currentUser }
        }
      }
    })
    Query: {
      // ...
      me: (root, args, context) => {
        return context.currentUser
      }
    },
    ```
    ### Friends list
    - mutation
    ```javascript
      addAsFriend: async (root, args, { currentUser }) => {
      const nonFriendAlready = (person) =>
        !currentUser.friends.map(f => f._id).includes(person._id)

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const person = await Person.findOne({ name: args.name })
      if ( nonFriendAlready(person) ) {
        currentUser.friends = currentUser.friends.concat(person)
      }

      await currentUser.save()

      return currentUser
    },
    ```
    ### Excercise
    - Add index.js
  </details>
- [x] Login and updateding the cache
  <details>
    <summary>Content</summary>

    ### User log in
    ```javascript
    const LOGIN = gql`
      mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password)  {
          value
        }
      }
    `

    const App = () => {
      const [token, setToken] = useState(null)

      // ...

      const [login] = useMutation(LOGIN, {
        onError: handleError
      })

      const errorNotification = () => errorMessage &&
        <div style={{ color: 'red' }}>
          {errorMessage}
        </div>

      if (!token) {
        return (
          <div>
            {errorNotification()}
            <h2>Login</h2>
            <LoginForm
              login={login}
              setToken={(token) => setToken(token)}
            />
          </div>
        )
      }

      return (
        // ...
      )
    }

    // LoginForm
    import React, { useState } from 'react'

    const LoginForm = (props) => {
      const [username, setUsername] = useState('')
      const [password, setPassword] = useState('')

      const submit = async (event) => {
        event.preventDefault()

        const result = await props.login({
          variables: { username, password }
        })

        if (result) {
          const token = result.data.login.value
          props.setToken(token)
          localStorage.setItem('phonenumbers-user-token', token)
        }
      }

      return (
        <div>
          <form onSubmit={submit}>
            <div>
              username <input
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password <input
                type='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type='submit'>login</button>
          </form>
        </div>
      )
    }

    export default LoginForm
    ```
    ### Adding a token to a header
    - After the backend changes, creating new persons requires that a valid user token is sent with the request. In order to send the token, we have to change the way we define the ApolloClient-object in index.js a little.
    > npm install --save apollo-link apollo-link-context

    ```javascript
    import { ApolloClient } from 'apollo-client'
    import { createHttpLink } from 'apollo-link-http'
    import { InMemoryCache } from 'apollo-cache-inmemory'
    import { setContext } from 'apollo-link-context'

    const httpLink = createHttpLink({
      uri: 'http://localhost:4000/graphql',
    })

    const authLink = setContext((_, { headers }) => {
      const token = localStorage.getItem('phonenumbers-user-token')
      return {
        headers: {
          ...headers,
          authorization: token ? `bearer ${token}` : null,
        }
      }
    })

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    })
    ```
    ### Updating cache, revisited
    ```javascript
    const App = () => {
      // ...

      const [addPerson] = useMutation(CREATE_PERSON, {
        onError: handleError,
        refetchQueries: [{ query: ALL_PERSONS }]
      })

      // ..
    }

    const App = () => {
    // ...

    const [addPerson] = useMutation(CREATE_PERSON, {
      onError: handleError,
      update: (store, response) => {
        const dataInStore = store.readQuery({ query: ALL_PERSONS })
        dataInStore.allPersons.push(response.data.addPerson)
        store.writeQuery({
          query: ALL_PERSONS,
          data: dataInStore
        })
      }
    })

    // ..
  }  
    ```
  </details>
- [x] Fragments and subcriptions
  <details>
    <summary>Content</summary>

    ### fragments
    ```javascript
    fragment PersonDetails on Person {
      name
      phone
      address {
        street
        city
      }
    }
    ```
    ### Subscriptions
    - Along with query- and mutation types, GraphQL offers a third operation type: subscriptions. With subscriptions clients can subscribe to updates about changes in the server.
    ### Subscriptions on the server
    ```javascript
    type Subscription {
      personAdded: Person!
    }

    const { PubSub } = require('apollo-server')
    const pubsub = new PubSub()

      Mutation: {
        addPerson: async (root, args, context) => {
          const person = new Person({ ...args })
          const currentUser = context.currentUser

          if (!currentUser) {
            throw new AuthenticationError("not authenticated")
          }

          try {
            await person.save()
            currentUser.friends = currentUser.friends.concat(person)
            await currentUser.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }

          pubsub.publish('PERSON_ADDED', { personAdded: person })

          return person
        },  
      },
      Subscription: {
        personAdded: {
          subscribe: () => pubsub.asyncIterator(['PERSON_ADDED'])
        },
      },

    server.listen().then(({ url, subscriptionsUrl }) => {
      console.log(`Server ready at ${url}`)
      console.log(`Subscriptions ready at ${subscriptionsUrl}`)
    })
    ```
    ### Subscriptions on the client
    ```javascript
    import React from 'react'
    import ReactDOM from 'react-dom'
    import App from './App'

    import { ApolloProvider } from '@apollo/react-hooks'

    import { ApolloClient } from 'apollo-client'
    import { createHttpLink } from 'apollo-link-http'
    import { InMemoryCache } from 'apollo-cache-inmemory'
    import { setContext } from 'apollo-link-context'

    import { split } from 'apollo-link'
    import { WebSocketLink } from 'apollo-link-ws'
    import { getMainDefinition } from 'apollo-utilities'

    const wsLink = new WebSocketLink({
      uri: `ws://localhost:4000/graphql`,
      options: { reconnect: true }
    })

    const httpLink = createHttpLink({
      uri: 'http://localhost:4000/graphql',
    })

    const authLink = setContext((_, { headers }) => {
      const token = localStorage.getItem('phonenumbers-user-token')
      return {
        headers: {
          ...headers,
          authorization: token ? `bearer ${token}` : null,
        }
      }
    })

    const link = split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
      },
      wsLink,
      authLink.concat(httpLink),
    )

    const client = new ApolloClient({
      link,
      cache: new InMemoryCache()
    })

    ReactDOM.render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>,
      document.getElementById('root')
    )
    ```
    - The subscriptions are done using either the Subscription component or the useSubscription hook that is available in Apollo Client 3.0. We will use the hook-based solution
    ```javascript
    import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks'

    // ...

    const PERSON_ADDED = gql`
      subscription {
        personAdded {
          ...PersonDetails
        }
      }

    ${PERSON_DETAILS}
    `

    const App = () => {
      // ...

      useSubscription(PERSON_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
          console.log(subscriptionData)
        }
      })

      // ...
    }
    ```
    ### n+1-problem
    ```javascript
    Query: {
      allPersons: (root, args) => {    
        console.log('Person.find')
        if (!args.phone) {
          return Person.find({}).populate('friendOf')
        }

        return Person.find({ phone: { $exists: args.phone === 'YES' } })
          .populate('friendOf')
      },
      // ...
    }
    ```
  </details>
