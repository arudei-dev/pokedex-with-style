import { type RefObject, useRef } from "react";

import {
  type Emitter,
  type EventHandler,
  type EventMap,
  createEmitter,
} from "../emitter";
import useHandler from "../react-hooks/use-handler";
import { useIsomorphicEffect } from "../react-hooks/use-isomorphic-effect";
import { buildContext } from "./build-context";

export default function buildEmitter<const Scope extends string>(scope: Scope) {
  const [Provider, useContext] = buildContext(`EventRegistryFor${scope}`)(
    () => {
      const refEmitter = useRef<Emitter<EventMap> | null>(null);

      if (refEmitter.current == null) {
        refEmitter.current = createEmitter();
      }

      return refEmitter as RefObject<Emitter<EventMap>>;
    },
  );

  function registerEvents<
    const InnerScope extends string,
    RawEvents extends EventMap,
  >() {
    type E = {
      [K in keyof RawEvents as `${Scope}/${InnerScope}/${Extract<K, string>}`]: RawEvents[K];
    };

    function useSubscribe<K extends keyof E>(
      eventName: K,
      eventListener: EventHandler<E[K]>,
    ) {
      const refEvents = useContext();

      const handleListener = useHandler(eventListener);

      useIsomorphicEffect(() => {
        const event = refEvents.current;

        event.on(eventName as string, handleListener as EventHandler<unknown>);

        return () => {
          event.off(
            eventName as string,
            handleListener as EventHandler<unknown>,
          );
        };
      }, [eventName, handleListener, refEvents]);
    }

    const useEmit = () => {
      const refEvents = useContext() as { current: Emitter<E> };

      return useHandler<Emitter<E>["emit"]>((type, ...params) => {
        refEvents.current.emit(type, ...params);
      });
    };

    return [useEmit, useSubscribe] as const;
  }

  return [Provider, registerEvents] as const;
}
