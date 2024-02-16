import { ComponentProps } from 'react';

import { getGuildAvatarURL } from '@/utils/get-guild-avatar-url';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export type GuildAvatarProps = ComponentProps<typeof Avatar> & {
  guildName?: string;
  guildId?: string;
  avatarKey?: string;
  src?: string;
};

export function GuildAvatar({
  guildName,
  guildId,
  avatarKey,
  src: srcByProps,
  ...props
}: GuildAvatarProps) {
  const guildNameAbbreviation =
    guildName && `${guildName[0]}${guildName[1] || ''}`.toUpperCase();

  const src =
    srcByProps ||
    (guildId && avatarKey && getGuildAvatarURL(guildId, avatarKey));

  return (
    <Avatar {...props}>
      <AvatarImage src={src} />
      <AvatarFallback>{guildNameAbbreviation || 'GD'}</AvatarFallback>
    </Avatar>
  );
}
