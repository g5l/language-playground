# Reactor Pattern in Node.js

The **Reactor Pattern** is a design pattern used for handling concurrent I/O operations efficiently. It is the foundation of how Node.js manages asynchronous, non-blocking operations using a single-threaded event loop.

### Core Components

- **Event Demultiplexer**  
  Waits for events (e.g., epoll, kqueue)

- **Event Loop**  
  Continuously checks for new events and dispatches them

- **Event Handlers (Callbacks)**  
  Functions executed when events occur

## ⚙️ How Node.js Uses the Reactor Pattern

Node.js relies on:
- **libuv** (C library)
- **Event Loop**
- **Callback Queue**

### Flow

1. A request is made (e.g., file read, HTTP request)
2. Node delegates it to the system (libuv / OS)
3. The event loop keeps running
4. When the operation completes, a callback is queued
5. The event loop executes the callback

## 🔁 Event Loop Phases

Node.js event loop has multiple phases:

1. **Timers** (`setTimeout`, `setInterval`)
2. **Pending Callbacks**
3. **Idle, Prepare**
4. **Poll** (I/O events)
5. **Check** (`setImmediate`)
6. **Close Callbacks**

---

## 📬 Task Queue (Macrotasks)

The **Task Queue** (AKA **Macrotask Queue**) stores callbacks from:

- `setTimeout`
- `setInterval`
- `setImmediate`
- I/O operations

### Example

```js
setTimeout(() => console.log("Timeout"), 0);
console.log("Sync");
```

Output:
```js
Sync
Timeout
```
Even with 0ms, the callback waits for the event loop.

## Priority Queue (Microtasks)

Microtasks have **higher** priority than macrotasks.

They run immediately after the current operation, before the event loop continues.

### Sources of Microtasks
- `Promise.then`
- `queueMicrotask`
- `process.nextTick` (Node-specific, even higher priority)

### Example

```js
setTimeout(() => console.log("Timeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("Sync");
```

### process.nextTick vs Promise

```js
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("promise"));
```

Output:
```js
nextTick
promise
```

### Priority Order
- `process.nextTick`
- Microtasks (Promises)
- Macrotasks (Timers, I/O)

### Blocking vs Non-Blocking
#### Blocking (bad for Node.js)
```js
while (true) {}
```
Blocks the event loop → no other code runs.

#### Non-Blocking
```js
setTimeout(() => console.log("Done"), 1000);
```
Allows the event loop to continue processing.