# Overview
- Rendering a collection, modules
- Forms
- Getting data from server
- Altering data in server
- Adding styles to React app
# Rendering a collection, modules
## Console.log
- Use , instead of +
## JS Arrays
- Functional Programming in Javascript https://www.youtube.com/playlist?list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84
- Key-attribute: https://reactjs.org/docs/reconciliation.html#recursing-on-children
- anti-pattern: array indexes as keys: https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318
  - notes.map((note, i) => ...): not recommended

# Forms
```
<form onSubmit={addNote} onChange>
```
# Getting Data from server
- Using JSON Server
```
npm install -g json-server
npx json-server --port 3001 --watch db.json
```
- Asynchronous model: https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop
- Non-Blocking vs Blocking
  - Blocking means sync, NOn-Blocking means async
- Effect Hooks
  - By default, effects run after every completed render, but you can choose to fire it only when certain values have changed.
  - useEffect(hook, []): 2 parameters
    - The first is a function, the effect itself
    - The second parameter of useEffect is used to specify how often the effect is run. If the second parameter is an empty array [], then the effect is only run along with the first render of the component.
