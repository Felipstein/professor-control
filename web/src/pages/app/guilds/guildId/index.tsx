import { Container } from '@/components/container';
import { ChannelsList } from '@/components/layouts/guild/channels-list';
import { ChannelsListSkeleton } from '@/components/layouts/guild/channels-list-skeleton';
import { ChatContainerSkeleton } from '@/components/layouts/guild/chat/chat-container-skeleton';
import { MembersList } from '@/components/layouts/guild/members-list';
import { MembersListSkeleton } from '@/components/layouts/guild/members-list-skeleton';
import { ProfessorDialog } from '@/components/professor-dialog';
import { queryKeys } from '@/config/query-keys';
import { makeGuildService } from '@/factories/make-guild-service';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useMemo } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';

export function GuildIdPage() {
  const location = useLocation();
  const { guildId } = useParams() as { guildId: string };

  const {
    data: guild,
    isLoading: isLoadingGuild,
    error: errorOnFetchGuild,
  } = useQuery({
    queryKey: queryKeys.getGuildById({ guildId }),
    queryFn: () => makeGuildService().getGuildById({ guildId }),
  });

  const errorMessage = useMemo(() => {
    if (errorOnFetchGuild instanceof AxiosError) {
      return (
        (errorOnFetchGuild.response?.data?.message as string) ||
        errorOnFetchGuild.message
      );
    }

    if (errorOnFetchGuild instanceof Error) {
      return errorOnFetchGuild.message;
    }

    return null;
  }, [errorOnFetchGuild]);

  if (!isLoadingGuild && errorOnFetchGuild) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <ProfessorDialog isAnimated>
          <span className="text-red-400">
            Oops, deu ruim{errorMessage && <strong>: {errorMessage}</strong>}
          </span>
        </ProfessorDialog>
      </div>
    );
  }

  const isLoading = isLoadingGuild || !guild;

  const hasChannelSelected = location.pathname.includes('channels');

  return (
    <div className="my-3 mr-3 flex w-full items-stretch gap-3">
      {isLoading ? (
        <ChannelsListSkeleton />
      ) : (
        <ChannelsList channels={guild.channels} />
      )}

      {isLoading ? (
        <ChatContainerSkeleton />
      ) : (
        <>
          {hasChannelSelected && <Outlet context={guild} />}

          {!hasChannelSelected && (
            <Container
              className="flex flex-1 items-center justify-center"
              noFillHeight
            >
              <ProfessorDialog isAnimated>
                Eii! Selecione um canal de texto aí pô!
              </ProfessorDialog>
            </Container>
          )}
        </>
      )}

      {isLoading ? (
        <MembersListSkeleton />
      ) : (
        <MembersList members={guild.members} />
      )}
    </div>
  );
}
