# Overview
- Node.js and Express
- Deploying app to internet
- Saving data to MongoDB
- Validation and ESLint

# Note.js and Express
- Node.js uses so-called CommonJS instead of ES6
- Express: help your app when it grows in size
  - Transitive dependencies
  - semantic versioning
  - Update the dependencies by `npm update`
- nodemon: nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.
- REST: RESTful API (GET /notes/10 , GET /notes, POST /notes, DELETE /notes/10, PUT /notes/10, PATCH /notes/10)
- Receiving data

# Deploying app to internet
- We can allow requests from other origins by using Node's cors middleware.
- https://pacific-spire-21588.herokuapp.com/
- source: https://github.com/hientuminh/notes_test
```
npm install cors --save
```
- We use heroku to deploy nodejs app
```
heroku login
heroku create
heroku git:remote -a <app>
heroku push heroku master
```
- Deploy react app
```
npm install
npm run build
```
- We have two solutions
  - Create 2 seperate repo (1 backend, 1 frontend)
    - Run npm run build then copy build folder to backend repo and deploy
  - Use one repository
    - create src folder (keep name) and copy source frontend into.
    - Add lib to package.json and build
# MongoDB
- Install: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
- Conection: mongodb+srv://admin:<password>@cluster0-ra1o1.mongodb.net/test?retryWrites=true&w=majority
- password was configured at https://cloud.mongodb.com/v2/5c7cf3d29ccf640d3d59ef13#security/database/users
- Using dotenv
- Command
```
node mongo.js <> <>
```
- Mongo command
```
- save()
- find, findById
- deleteOne
- findOneAndUpdate ({new: true}) && mongoose.set('useFindAndModify', false)
```
- Error handling: using catch
- Moving error handling into middleware
  - The error that is passed forwards is given to the next function as a parameter. If next was called without a parameter, then the execution would simply move onto the next route or middleware. If the next function is called with a parameter, then the execution will continue to the error handler middleware.
- The order of middleware loading
  - The execution order of middleware is the same as the order that they are loaded into express with the app.use function. For this reason it is important to be careful when defining middleware.
  - https://github.com/fullstackopen-2019/part3-notes-backend/blob/part3-4/index.js
- Middleware
- Logger will empty
```
app.use(logger) // request.body is empty!

app.post('/api/notes', (request, response) => {
  // request.body is empty!
  const body = request.body
  // ...
})

app.use(bodyParser.json())
```
- It's also important that the middleware for handling unsupported routes is next to the last middleware that is loaded into Express, just before the error handler.

# Validation and ESLint
- Using validation in Schema
- Promise Chaining
```
note
  .save()
  .then(savedNote) => return savedNote.toJSON())
  .then(savedAndFormattedNote => {
    response.json(savedAndFormattedNote)
  })
  .catch(error => next(error))
```
- Deploying the database backend to production
  - heroku config:set MONGODB_URI=mongodb+srv://fullstack:secred@cluster0-ostce.mongodb.net/note-app?retryWrites=true
-
```
return request.then(response => response.data).catch(error => Promise.reject(error.response))
```
