export class Reactor {
  constructor() {
    this.handlers = new Map();
  }

  register(event, handler) {
    this.handlers.set(event, handler);
  }

  dispatch(event, data) {
    const handler = this.handlers.get(event);
    if (handler) handler(data);
  }

  run(eventSource) {
    const poll = () => {
      const events = eventSource.getReadyEvents();
      if (events.length === 0) return;
      for (const { event, payload } of events) {
        this.dispatch(event, payload);
      }
      setImmediate(poll);
    };

    poll();
  }
}

// --- test ---
const reactor = new Reactor();

reactor.register('hello', (data) => console.log(`Hello, ${data.name}!`));
reactor.register('log', (data) => console.log(`Log: ${data.message}`));

const eventSource = {
  queue: [
    { event: 'hello', payload: { name: 'World' } },
    { event: 'log', payload: { message: 'reactor is running' } },
    { event: 'hello', payload: { name: 'Node.js' } },
  ],
  getReadyEvents() {
    return this.queue.splice(0);
  },
};

reactor.run(eventSource);
