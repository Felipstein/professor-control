import { GuildChannel } from '@/@types/guild-channel';
import { ChannelItemIcon } from './channel-item-icon';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

export type ChannelItemProps = {
  channel: GuildChannel;
  noSupport?: boolean;
};

export function ChannelItem({ channel, noSupport = false }: ChannelItemProps) {
  const location = useLocation();

  if (channel.type === 'category') {
    throw new Error(`Channel type not supported: ${channel.type}`);
  }

  const isSelected =
    channel.type === 'text' && location.pathname.includes(channel.id);

  const Comp = channel.type === 'text' ? Link : 'button';

  function handleJoinVoiceChannel() {
    if (channel.type !== 'voice') {
      return;
    }

    console.log('joined');
  }

  const content = (
    <Comp
      type="button"
      to={`channels/${channel.id}`}
      data-disabled={noSupport}
      disabled={noSupport}
      className={cn(
        'ml-1 flex w-full items-center justify-start gap-1.5 truncate rounded px-2 py-0.5 text-slate-300 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-40',
        !isSelected && 'hover:bg-slate-50/5 hover:text-slate-50',
        isSelected &&
          'pointer-events-none bg-slate-50/10 font-semibold text-slate-50',
      )}
      onClick={handleJoinVoiceChannel}
    >
      <ChannelItemIcon type={channel.type} nsfw={channel.nsfw} />

      <span className="truncate">{channel.name}</span>
    </Comp>
  );

  if (noSupport) {
    <Tooltip>
      <TooltipTrigger asChild>
        <div>{content}</div>
      </TooltipTrigger>

      <TooltipContent>
        <span>Ainda não consigo acessar ou entrar nesse tipo de canal :(</span>
      </TooltipContent>
    </Tooltip>;
  }

  return content;
}
