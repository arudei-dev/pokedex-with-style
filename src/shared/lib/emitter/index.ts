export type EventMap = Record<string, unknown>;

export type EventHandler<T> = [T] extends [null | undefined | never]
  ? () => void
  : (payload: T) => void;

export interface Emitter<E extends EventMap> {
  on<K extends keyof E>(type: K, handler: EventHandler<E[K]>): () => void;
  off<K extends keyof E>(type: K, handler: EventHandler<E[K]>): void;
  emit<K extends keyof E>(
    type: K,
    ...params: [E[K]] extends [null | undefined | never] ? [] : [payload: E[K]]
  ): void;
}

export function createEmitter<E extends EventMap>(): Emitter<E> {
  const registry = new Map<keyof E, Set<EventHandler<unknown>>>();

  return {
    on(type, handler) {
      const set = registry.get(type) ?? new Set();
      set.add(handler as EventHandler<unknown>);
      registry.set(type, set);
      return () => this.off(type, handler);
    },
    off(type, handler) {
      registry.get(type)?.delete(handler as EventHandler<unknown>);
    },
    emit(type, ...params) {
      registry.get(type)?.forEach((handler) => {
        handler(params[0]);
      });
    },
  };
}
