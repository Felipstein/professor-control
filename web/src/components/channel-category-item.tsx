import type { ChannelCategory } from '@/@types/channel-category';
import { ReactNode, useState } from 'react';
import { GuildChannel } from '@/@types/guild-channel';
import { ChevronUpIcon } from '@radix-ui/react-icons';

export type ChannelCategoryItemProps = {
  category: ChannelCategory;
  children: (channel: GuildChannel) => ReactNode;
};

export function ChannelCategoryItem({
  category,
  children,
}: ChannelCategoryItemProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="font-mono">
      {category.id !== 'none' && (
        <button
          type="button"
          className="mb-1.5 flex w-full select-none items-center justify-start gap-1 truncate text-slate-300 hover:text-slate-100"
          onClick={() => setIsExpanded((state) => !state)}
        >
          <ChevronUpIcon
            data-expanded={isExpanded}
            className="flex-shrink-0 data-[expanded=true]:rotate-180"
          />

          {category.name}
        </button>
      )}

      {isExpanded && (
        <ul className="flex flex-col gap-1 truncate">
          {category.channels.map((channel) => (
            <li key={channel.id}>{children(channel)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
