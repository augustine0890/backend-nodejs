# Backend app with Javascript
- Technologies: JS, Node.js, Express.js, APIs, SQL, HTTP
- How information moves through a web app - from the user to the server and back.
- Connect web app to (interact with) databases.
- Use javascript and Express.js to create backend APIs.

## Runtime Enviroment
- A runtime enviroment is where your program will be executed. It determines what global objects your program can access and it also impact how it runs.
- The `Node` runtime enviroment was created for the purpose of executing JS code without a browser.
- The `Node` RE can have access to the file system, databases, and networks attached to the server.

## Modules
- Modules are reusable pieces of code in a file that can be exported and then imported for use in another file.

## Async/Await
### Event Loops
- JS is a single-threaded programming language which means that only one task can run at a time.
- `Marco` is a task that runs after all of the tasks in the Event Loop.
- The call stack is a LIFO queue (Last In, First Out)
- The loop gives priority to the call stack, and it first processes everything it finds in the call stack, and once there's nothing in there, it goes to pick up things in the message queue.

### Promises
- Job queue (promise) is a way to execute the result of an async function as soon as possible.
- The `Promise` takes two parameters, resolve and reject -> when something goes wrong, reject is called, or else resolve is called.

### async/await
- `async` is a keyword that can be added before any function -> it makes sure that the function returns a promise.
- `await` used in a block declared as `async`. Once you place `await` before any asynchronous call, it will wait for that particular `promise` to settle and then further execution from the async block will take place.
