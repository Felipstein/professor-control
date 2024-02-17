import {
  CrossCircledIcon,
  ExclamationTriangleIcon,
} from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';

import { GuildAvatarSkeleton } from '@/components/guild-avatar-skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { queryKeys } from '@/config/query-keys';
import { makeGuildService } from '@/factories/make-guild-service';
import { GuildButton } from '@/components/guild-button';
import { Container } from '@/components/container';

export function GuildsList() {
  const {
    data: guilds = [],
    isLoading: isLoadingGuilds,
    error: errorOnFetchGuilds,
  } = useQuery({
    queryKey: queryKeys.getGuilds(),
    queryFn: () => makeGuildService().getGuilds(),
  });

  return (
    <Container className="my-3 mr-3 w-20 rounded-l-none px-4 py-8">
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
                  <GuildButton guild={guild} />

                  <TooltipContent>{guild.name}</TooltipContent>
                </TooltipTrigger>
              </Tooltip>
            </li>
          ))}
      </ul>
    </Container>
  );
}
