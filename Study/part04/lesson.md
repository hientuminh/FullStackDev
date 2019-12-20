# Overview
- Structure of backend application, use administraction
- Testing backend
- User administration
- Token authentication

# Structure of backend application, use administration
```
├── index.js
├── app.js
├── build
│   ├── ...
├── controllers
│   └── notes.js
├── models
│   └── note.js
├── package-lock.json
├── package.json
├── utils
│   ├── config.js
│   └── middleware.js  
```

# Testing in backend
- lib
  - mongo-mock
  - cross-env: fix on window
  - supertest: write tests for testing the API
```
test('there are four notes', async () => {
  const response = await api.get('/api/notes')

  expect(response.body.length).toBe(4)
})
```
- Async/sync
```
notesRouter.get('/', async (request, response) => {
 const notes = await Note.find({})
 response.json(notes.map(note => note.toJSON()))
})
```
- Structure test
```
describe -> test
         -> describe -> test
```
# User administration
- 
