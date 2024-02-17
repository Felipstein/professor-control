import { ComponentProps } from 'react';

import { getGuildAvatarURL } from '@/utils/get-guild-avatar-url';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export type GuildAvatarProps = ComponentProps<typeof Avatar> & {
  guildName?: string;
  guildId?: string;
  avatarKey?: string;
  classNameForImage?: string;
  src?: string;
  width?: number;
  height?: number;
  extension?: 'png' | 'gif' | null;
};

export function GuildAvatar({
  guildName,
  guildId,
  avatarKey,
  src: srcByProps,
  classNameForImage,
  width,
  height,
  extension,
  ...props
}: GuildAvatarProps) {
  const guildNameAbbreviation =
    guildName && `${guildName[0]}${guildName[1] || ''}`.toUpperCase();

  const src =
    srcByProps ||
    (guildId && avatarKey && getGuildAvatarURL(guildId, avatarKey, extension));

  return (
    <Avatar {...props}>
      <AvatarImage
        src={src}
        className={classNameForImage}
        width={width}
        height={height}
      />
      <AvatarFallback>{guildNameAbbreviation || 'GD'}</AvatarFallback>
    </Avatar>
  );
}
