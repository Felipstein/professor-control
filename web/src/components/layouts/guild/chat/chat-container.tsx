import { Guild } from '@/@types/guild';
import { Container } from '@/components/container';
import { queryKeys } from '@/config/query-keys';
import { makeChatService } from '@/factories/make-chat-service ';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useOutletContext, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ChatContainerSkeleton } from './chat-container-skeleton';
import { ProfessorDialog } from '@/components/professor-dialog';
import { useEffect, useMemo, useRef } from 'react';
import { AxiosError } from 'axios';
import { ChatMessage } from './chat-message';
import { InputSubmit } from './input-submit';
import { useSocket } from '@/hooks/use-socket';
import { TypingContainer } from './typing-container';

export function ChatContainer() {
  const guild = useOutletContext() as Guild;
  const { channelId } = useParams() as { channelId: string };

  const lastMessageRef = useRef<HTMLDivElement>(null);

  const { sendMessage, typing } = useSocket(channelId);

  const {
    data: messagesResult = [],
    isLoading: isLoadingMessages,
    error: errorOnFetchMessages,
  } = useQuery({
    queryKey: queryKeys.getMessages({ channelId }),
    queryFn: () => makeChatService().getMessages({ channelId }),
  });

  const errorMessage = useMemo(() => {
    if (errorOnFetchMessages instanceof AxiosError) {
      return (
        errorOnFetchMessages.response?.data?.message ||
        errorOnFetchMessages.message
      );
    }

    if (errorOnFetchMessages instanceof Error) {
      return errorOnFetchMessages.message;
    }

    return null;
  }, [errorOnFetchMessages]);

  const messages = useMemo(() => {
    const messages = messagesResult.slice().reverse();

    return messages;
  }, [messagesResult]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'instant' });
  }, [messages]);

  if (!guild.channels.some((channel) => channel.id === channelId)) {
    toast.error('Esse canal não existe');

    return <Navigate to={`/app/guilds/${guild.id}`} />;
  }

  if (isLoadingMessages) {
    return <ChatContainerSkeleton />;
  }

  if (errorOnFetchMessages) {
    return (
      <Container className="flex w-full flex-1 items-center justify-center">
        <ProfessorDialog isAnimated>
          <span className="text-red-400">
            Caraca hein, deu B.O aqui
            {errorMessage && <strong>: {errorMessage}</strong>}
          </span>
        </ProfessorDialog>
      </Container>
    );
  }

  if (messages.length === 0) {
    return (
      <Container className="flex w-full flex-1 items-center justify-center">
        <ProfessorDialog isAnimated>
          Sem mensagens por aqui ainda, bro...
        </ProfessorDialog>
      </Container>
    );
  }

  return (
    <Container className="flex w-full flex-1 flex-col overflow-hidden">
      <div className="flex h-full w-full flex-1 flex-col gap-2 overflow-y-auto py-4 scrollbar-none">
        {messages.map((message, index) => {
          const isLast = index === messages.length - 1;

          return (
            <ChatMessage
              ref={isLast ? lastMessageRef : null}
              key={message.id}
              message={message}
            />
          );
        })}
      </div>

      <div className="relative mb-6 px-6">
        <InputSubmit onSubmit={sendMessage} onType={typing} />

        <TypingContainer />
      </div>
    </Container>
  );
}
