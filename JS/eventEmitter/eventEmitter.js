export default class EventEmitter {
  #events;
  constructor() {
    this.#events = new Map();
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */
  on(eventName, listener) {
    const arr = this.#events.get(eventName) ?? [];
    arr.push(listener);
    this.#events.set(eventName, arr);
    return this;
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */
  off(eventName, listener) {
    const listeners = this.#events.get(eventName) ?? [];
    const index = listeners.indexOf(listener);

    if (index < 0) return this;

    const newListeners = listeners.filter((_, i) => index !== i);

    this.#events.set(eventName, newListeners);

    return this;
  }

  /**
   * @param {string} eventName
   * @param  {...any} args
   * @returns {boolean}
   */
  emit(eventName, ...args) {
    const listeners = this.#events.get(eventName);

    if (!listeners || listeners.length < 1) return false;

    listeners.forEach((listener) => listener(...args));

    return true;
  }
}
