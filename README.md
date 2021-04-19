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
- We can take advantage of chaining `.then()` and `.catch()` calls to compose a series of tasks into a single function.
- `Promise.all()` is globally available and handles multiple async actions concurrently.

### async/await
- `async` is a keyword that can be added before any function -> it makes sure that the function returns a promise.
- `await` used in a block declared as `async`. Once you place `await` before any asynchronous call, it will wait for that particular `promise` to settle and then further execution from the async block will take place.
- With `async/await` is able to use a more synchronous coding style and `try/catch` for error handling.

## NodeJS REPL (Read-Eval-Print)
- A `Read` state where it reads the input from a user.
- The `Eval` state where it evaluates the user's input.
- The `Print` state where it prints out the evaluation to console.

## Backend
- The front-end of a website consists of HTML, CSS, JS, and static assets sent to a client.
- A web server is a process running on a computer that listens for incoming requests for information over the internet and sends back responses.
- Storing, accessing, and manipulating data is a large part of a web application's backend.
- Data is stored in databases which can be relational datbases or NoSQL databases.
- Application server (server-side) is handles important tasks such as authorization and authentication.
- The Web API is a way of interacting with application's data through HTTP requests and responses.

## Server Sent Events (SSE)
- Traditionally, a web page has to send a request to the server to receive new data; that is, the page requests data from the server. With server-sent events, it's possible for a server to send new data to a web page at any time, by pushing messages to the web page. These incoming messages can be treated as _Events_ + data inside the web page.

<!-- ## WebSockets -->
<!-- - The server can send a message to the client without the client explicitly requesting something. -->
<!-- - The client and the server can talk to each other simultaneously -->
<!-- - A little data overhead needs to be exchanged to send messages -> low latency communication. -->
<!-- - Good for real-time and long-lived communications. -->