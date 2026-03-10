class Reactor {
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
      for (const { event, payload } of events) {
        this.dispatch(event, payload);
      }
      setImmediate(poll);
    };
    
    poll();
  }
}