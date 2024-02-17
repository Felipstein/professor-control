export type Event = string;
export type ListenerFn<TPayload = any> = (
  payload: TPayload,
) => Promise<void> | void;

class EventEmitter {
  private readonly listeners = new Map<Event, ListenerFn[]>();

  on<TEvent extends Event>(event: TEvent, listener: ListenerFn) {
    const listeners = this.listeners.get(event) || [];

    listeners.push(listener);

    this.listeners.set(event, listeners);
  }

  off<TEvent extends Event>(event: TEvent, listener: ListenerFn) {
    const listeners = this.listeners.get(event) || [];

    const index = listeners.indexOf(listener);

    if (index !== -1) {
      listeners.splice(index, 1);
    }

    this.listeners.set(event, listeners);
  }

  emit<TEvent extends Event>(event: TEvent, payload: any) {
    const listeners = this.listeners.get(event) || [];

    listeners.forEach((listener) => listener(payload));
  }
}

export const events = new EventEmitter();
