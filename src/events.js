
class Events {
  constructor() {
    // singleton
    if (Events.instance) return Events.instance;
    Events.instance = this;
    // registry
    this.handlers = {};
  }

  on(eventName, handler) {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(handler);
  }

  emit(eventName, data) {
    if (!this.handlers[eventName]) return;
    this.handlers[eventName].forEach(handler => {
      handler(...data);
    });
  }
}

export default Events;