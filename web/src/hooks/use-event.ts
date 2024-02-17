import { Event, ListenerFn, events } from '@/libs/event-emitter';
import { DependencyList, useEffect } from 'react';

export function useEvent<TEvent extends Event>(
  event: TEvent,
  listenerFn: ListenerFn,
  deps: DependencyList = [],
) {
  useEffect(() => {
    events.on(event, listenerFn);

    return () => {
      events.off(event, listenerFn);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event, listenerFn, ...deps]);
}
