import { Message } from '@/@types/message';
import { UserAvatar } from '@/components/user-avatar';
import { forwardRef } from 'react';

export type ChatMessageProps = {
  message: Message;
};

export const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ message }, ref) => {
    const { author, content } = message;

    return (
      <div
        ref={ref}
        className="group relative flex items-start gap-3.5 px-6 py-2 hover:bg-gradient-to-br hover:from-slate-800/20 hover:to-slate-950/10"
      >
        <UserAvatar
          id={author.id}
          name={author.serverName || author.globalName}
          avatarKey={author.serverAvatar || author.avatar}
        />

        <div className="flex flex-col gap-0.5">
          <span className="font-helvetica font-medium tracking-wide text-slate-200/70">
            {author.serverName || author.globalName}
          </span>

          <p className="break-words">{content}</p>
        </div>
      </div>
    );
  },
);

ChatMessage.displayName = 'ChatMessage';
