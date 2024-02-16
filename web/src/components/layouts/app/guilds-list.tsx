import {
  CrossCircledIcon,
  ExclamationTriangleIcon,
} from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';

import { GuildAvatar } from '@/components/guild-avatar';
import { GuildAvatarSkeleton } from '@/components/guild-avatar-skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { queryKeys } from '@/config/query-keys';
import { makeGuildService } from '@/factories/make-guild-service';

export function GuildsList() {
  const {
    data: guilds = [],
    isLoading: isLoadingGuilds,
    error: errorOnFetchGuilds,
  } = useQuery({
    queryKey: queryKeys.guilds(),
    queryFn: () => makeGuildService().getGuilds(),
  });

  return (
    <div className="w-20 bg-black/30 px-4 py-8">
      <ul className="flex flex-col gap-4">
        {isLoadingGuilds &&
          Array.from({ length: 12 }).map((_, index) => (
            <li key={index}>
              <GuildAvatarSkeleton className="size-12" />
            </li>
          ))}

        {!isLoadingGuilds && errorOnFetchGuilds && (
          <li>
            <Tooltip>
              <TooltipTrigger>
                <CrossCircledIcon className="size-12 text-red-500" />
              </TooltipTrigger>

              <TooltipContent>Rapaaaz, deu B.O viu...</TooltipContent>
            </Tooltip>
          </li>
        )}

        {!isLoadingGuilds && !errorOnFetchGuilds && guilds.length === 0 && (
          <li>
            <Tooltip>
              <TooltipTrigger>
                <ExclamationTriangleIcon className="size-12" />
              </TooltipTrigger>

              <TooltipContent>
                Não estou em nenhum servidor no momento :(
              </TooltipContent>
            </Tooltip>
          </li>
        )}

        {!isLoadingGuilds &&
          !errorOnFetchGuilds &&
          guilds.map((guild) => (
            <li key={guild.id}>
              <Tooltip>
                <TooltipTrigger>
                  <GuildAvatar
                    guildId={guild.id}
                    guildName={guild.name}
                    avatarKey={guild.avatarKey}
                    className="size-12"
                  />

                  <TooltipContent>{guild.name}</TooltipContent>
                </TooltipTrigger>
              </Tooltip>
            </li>
          ))}
      </ul>
    </div>
  );
}
