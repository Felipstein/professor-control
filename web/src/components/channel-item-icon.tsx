import { ChannelType } from '@/@types/channel-type';
import {
  ExclamationTriangleIcon,
  FrameIcon,
  LayersIcon,
  PersonIcon,
  SpeakerLoudIcon,
} from '@radix-ui/react-icons';
import { ElementType } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

type ChannelTypeAccepted = Exclude<ChannelType, 'category'>;

const icons: Record<
  ChannelTypeAccepted,
  ElementType<{ className?: string }>
> = {
  text: FrameIcon,
  voice: SpeakerLoudIcon,
  stage: PersonIcon,
  forum: LayersIcon,
};

export type ChannelItemIconProps = {
  type: ChannelTypeAccepted;
  nsfw?: boolean;
};

export function ChannelItemIcon({ type, nsfw = false }: ChannelItemIconProps) {
  const Icon = icons[type];

  if (!Icon) {
    throw new Error(`Icon not found for channel type ${type}`);
  }

  if (nsfw) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative">
            <Icon className="size-4 flex-shrink-0" />

            <ExclamationTriangleIcon className="absolute -bottom-1 -right-1.5 size-2.5 text-slate-50" />
          </div>
        </TooltipTrigger>

        <TooltipContent>
          <span>Canal NSFW</span>
        </TooltipContent>
      </Tooltip>
    );
  }

  return <Icon className="size-4 flex-shrink-0" />;
}
