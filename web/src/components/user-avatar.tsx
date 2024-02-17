import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Avatar } from './ui/avatar';
import { cn } from '@/utils/cn';
import { getUserAvatarURL } from '@/utils/get-user-avatar-url';
import { getDiscordAvatarURL } from '@/utils/get-discord-avatar-url';

export type UserAvatarProps = {
  id: string;
  name: string;
  avatarKey: string;
  className?: string;
  classNameForImage?: string;
  width?: number;
  height?: number;
};

export function UserAvatar({
  id,
  name,
  avatarKey,
  className,
  classNameForImage,
  width,
  height,
}: UserAvatarProps) {
  const src =
    avatarKey === 'none'
      ? getDiscordAvatarURL()
      : getUserAvatarURL(id, avatarKey);

  return (
    <Avatar className={cn(className)}>
      <AvatarImage
        src={src}
        className={classNameForImage}
        width={width}
        height={height}
      />

      <AvatarFallback>
        <img
          src={getDiscordAvatarURL()}
          alt={name}
          className={classNameForImage}
        />
      </AvatarFallback>
    </Avatar>
  );
}
