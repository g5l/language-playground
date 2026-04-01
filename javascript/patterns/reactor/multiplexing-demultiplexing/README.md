# Multiplexing and Demultiplexing

## Multiplexing

Multiplexing is the technique of combining multiple signals or data streams into a single shared channel. Think of a highway: instead of building one road per car, you build one wide road and let all cars share it. In the context of I/O, multiplexing means a single thread can monitor multiple I/O sources (sockets, files, timers) through one mechanism instead of dedicating a thread to each.

## Demultiplexing

Demultiplexing is the reverse, taking that single shared channel and separating the signals back out to their individual destinations. When the OS detects that socket #3 has data ready, it "demultiplexes" that notification from the pool of all watched resources and delivers it specifically to the callback registered for socket #3.

## How it looks in practice
 ```
  Multiplexing (combining):
 
  Socket A ──┐
  Socket B ──┼──▶  Single monitoring channel (epoll/kqueue/IOCP)
  Socket C ──┘
 
 
  Demultiplexing (separating):
 
  Single channel ──▶  "Socket B is ready" ──▶ callback for Socket B
                      "Socket A is ready" ──▶ callback for Socket A
```

## How Node.js uses this

In Node.js, the Event Demultiplexer (powered by `epoll` on Linux, `kqueue` on macOS, or `IOCP` on Windows) does exactly this. You hand it 10,000 sockets and say "tell me when any of them are ready." It watches all of them through a single system call, and when something happens, it tells you *which* resource is ready and *what* type of event occurred. That's the demultiplexing step: separating one notification stream back into individual, actionable events.

## Why it matters for the Reactor Pattern

Without demultiplexing, you'd need either one thread per I/O source (the thread-per-connection model, which is expensive in memory and context switching) or you'd have to manually loop through every resource asking "are you ready yet?" (busy polling, which wastes CPU cycles). The OS-level demultiplexer solves both problems, it blocks efficiently until something actually happens, then wakes your thread with exactly the information it needs.