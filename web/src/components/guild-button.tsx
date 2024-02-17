import { GuildListed } from '@/@types/guild-listed';
import { GuildAvatar } from './guild-avatar';
import { Link } from 'react-router-dom';

export type GuildButtonProps = {
  guild: GuildListed;
};

export function GuildButton({ guild }: GuildButtonProps) {
  return (
    <Link to={`guilds/${guild.id}`} className="group">
      <GuildAvatar
        guildId={guild.id}
        guildName={guild.name}
        avatarKey={guild.avatarKey}
        className="size-12 ring-1 ring-transparent transition-all group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-800/30 group-hover:ring-slate-400"
      />
    </Link>
  );
}
