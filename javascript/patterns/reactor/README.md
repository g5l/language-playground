# Reactor Pattern

## What is it?

A design pattern for handling concurrent I/O with a single thread. Instead of spawning one thread per connection (expensive), we delegate I/O to the OS and react to completions via callbacks.

## How it works

```
  Application Code
  fs.readFile('x.txt', callback)
        │
        ▼
  Event Demultiplexer          ← OS-level: epoll (Linux), kqueue (macOS), IOCP (Windows)
  Watches multiple I/O sources simultaneously
        │
        ▼  "resource X is ready"
  Event Queue
  [{ callback, data }, ...]
        │
        ▼  dequeue one at a time
  Event Loop
  Executes each callback on the main thread
        │
        └──▶ back to demultiplexer (loop continues until nothing left)
```

The code requests an I/O operation and registers a callback. The **Event Demultiplexer** hands it off to the OS, which watches all pending I/O in parallel. When an operation completes, the result and its callback go into the **Event Queue**. The **Event Loop** then picks events off the queue one at a time and runs each callback on the main thread.

## Why it works

I/O happens in parallel at the OS level, but JavaScript execution is sequential, only one callback runs at a time. This means no locks or synchronization are needed. The process exits naturally when the queue is empty and nothing is being watched.

## The tradeoff

CPU-bound work is the bottleneck. If a callback takes 500ms of computation, every other callback waits. That's why Node offloads heavy CPU work to `worker_threads`.

## Origin

Douglas Schmidt's 1995 paper on networked servers. libuv generalized it to file I/O, DNS, timers, and child processes, making Node.js a general-purpose runtime, not just a networking toolkit.