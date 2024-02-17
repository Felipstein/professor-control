import { useEvent } from '@/hooks/use-event';
import { ReceiveTypingPayload } from '@professor-control/contracts';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function TypingContainer() {
  const location = useLocation();

  const [isTyping, setIsTyping] = useState(false);
  const timerTypingRef = useRef<NodeJS.Timeout | null>(null);

  useEvent(
    'typing',
    ({ channelId }: ReceiveTypingPayload) => {
      if (!location.pathname.includes(channelId)) {
        return;
      }

      const timerTyping = timerTypingRef.current;

      setIsTyping(true);

      if (timerTyping) {
        clearTimeout(timerTyping);
      }

      timerTypingRef.current = setTimeout(() => {
        setIsTyping(false);
        timerTypingRef.current = null;
      }, 3000);
    },
    [location],
  );

  useEffect(
    () => () => {
      if (timerTypingRef.current) {
        clearTimeout(timerTypingRef.current);
      }
    },
    [],
  );

  if (!isTyping) {
    return null;
  }

  return (
    <div className="absolute">
      <span className="text-xs text-slate-400">
        <strong className="text-slate-300">Alguém</strong> está digitando...
      </span>
    </div>
  );
}
