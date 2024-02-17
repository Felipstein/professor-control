import { ChannelCategory } from '@/@types/channel-category';
import type { GuildChannel } from '@/@types/guild-channel';
import { ChannelCategoryItem } from '@/components/channel-category-item';
import { ChannelItem } from '@/components/channel-item';
import { Container } from '@/components/container';
import { useMemo } from 'react';

export type ChannelsListProps = {
  channels: GuildChannel[];
};

export function ChannelsList({ channels }: ChannelsListProps) {
  const channelsGroupedByCategory = useMemo(() => {
    const channelsGroupedByCategory: Map<string, ChannelCategory> = new Map();

    channels.forEach((channel) => {
      if (channel.type === 'category') {
        return;
      }

      const categoryId = channel.parentId;

      if (!categoryId) {
        const noCategory = channelsGroupedByCategory.get('none');

        if (noCategory) {
          noCategory.channels.push(channel);
          channelsGroupedByCategory.set('none', noCategory);

          return;
        }

        const newNoCategory: ChannelCategory = {
          id: 'none',
          name: 'Sem categoria',
          position: -1,
          channels: [channel],
        };

        channelsGroupedByCategory.set('none', newNoCategory);

        return;
      }

      const category = channelsGroupedByCategory.get(categoryId);

      if (category) {
        category.channels.push(channel);
        channelsGroupedByCategory.set(categoryId, category);

        return;
      }

      const categoryChannel = channels.find(
        (channel) => channel.id === categoryId,
      );

      if (!categoryChannel) {
        return;
      }

      const newCategory: ChannelCategory = {
        id: categoryChannel.id,
        name: categoryChannel.name,
        position: categoryChannel.position,
        channels: [channel],
      };

      channelsGroupedByCategory.set(categoryId, newCategory);
    });

    return channelsGroupedByCategory;
  }, [channels]);

  return (
    <Container className="flex w-72 flex-col gap-6 px-4 py-4 scrollbar-none">
      {Array.from(channelsGroupedByCategory.entries()).map(
        ([categoryId, category]) => (
          <ChannelCategoryItem key={categoryId} category={category}>
            {(channel) => (
              <ChannelItem
                channel={channel}
                noSupport={channel.type === 'forum' || channel.type === 'stage'}
              />
            )}
          </ChannelCategoryItem>
        ),
      )}
    </Container>
  );
}
