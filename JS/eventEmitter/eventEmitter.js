export default class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */
  on(eventName, listener) {
    const listeners = this.events.get(eventName) ?? [];
    listeners.push(listener);
    this.events.set(eventName, listeners);
    return this;
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */
  off(eventName, listener) {
    const listeners = this.events.get(eventName) ?? [];
    const index = listeners.indexOf(listener);
    const newListeners = listeners.filter((_, i) => index !== i);
    this.events.set(eventName, newListeners);
    return this;
  }

  /**
   * @param {string} eventName
   * @param  {...any} args
   * @returns {boolean}
   */
  emit(eventName, ...args) {
    const listeners = this.events.get(eventName);
    if (!listeners || listeners.length < 1) return false;

    listeners.forEach((l) => l(...args));
    return true;
  }
}
