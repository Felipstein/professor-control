import { Message } from '@/@types/message';
import { queryKeys } from '@/config/query-keys';
import { events } from '@/libs/event-emitter';
import { getAPIBaseURL } from '@/utils/get-api-base-url';
import {
  ReceiveMessagePayload,
  ReceiveTypingPayload,
  SendMessagePayload,
  SendTypingPayload,
} from '@professor-control/contracts';
import { useQueryClient } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { useCallback, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(getAPIBaseURL());

export function useSocket(channelId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    console.info('Connecting to channel', channelId);

    socket.emit('joinChannel', channelId);

    function handleReceiveMessage(payload: ReceiveMessagePayload) {
      const { channelId, message } = payload;

      queryClient.setQueryData<Message[]>(
        queryKeys.getMessages({ channelId }),
        (messagesCached) => {
          return [message, ...(messagesCached || [])];
        },
      );
    }

    function handleReceiveTyping(payload: ReceiveTypingPayload) {
      events.emit('typing', payload);
    }

    socket.on('receive-message', handleReceiveMessage);
    socket.on('receive-typing', handleReceiveTyping);

    return () => {
      socket.off('receive-message', handleReceiveMessage);
      socket.off('receive-typing', handleReceiveTyping);

      socket.emit('leaveChannel', channelId);
    };
  }, [channelId, queryClient]);

  const sendMessage = useCallback(
    (message: string) => {
      const payload: SendMessagePayload = {
        message,
        channelId,
      };

      socket.emit('send-message', payload);
    },
    [channelId],
  );

  const typing = useCallback(() => {
    const payload: SendTypingPayload = {
      channelId,
    };

    socket.emit('send-typing', payload);
  }, [channelId]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sendTypingDebounced = useCallback(
    debounce(typing, 1000, { leading: true, trailing: false }),
    [typing],
  );

  return { sendMessage, typing: sendTypingDebounced };
}
