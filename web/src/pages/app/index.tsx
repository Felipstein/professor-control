import { GuildsList } from '@/components/layouts/app/guilds-list';
import { ProfessorDialog } from '@/components/professor-dialog';
import { queryKeys } from '@/config/query-keys';
import { makeGuildService } from '@/factories/make-guild-service';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { Outlet, useLocation } from 'react-router-dom';

export function AppPage() {
  const location = useLocation();

  const { data: guilds = [], isLoading: isLoadingGuilds } = useQuery({
    queryKey: queryKeys.getGuilds(),
    queryFn: () => makeGuildService().getGuilds(),
  });

  const noGuildSelected = /^\/app$/.test(location.pathname);

  return (
    <div className="flex h-screen items-stretch">
      <GuildsList />

      {!isLoadingGuilds && guilds.length === 0 && (
        <div className="flex w-full items-center justify-center">
          <ProfessorDialog isAnimated>
            Não estou conectado em nenhum servidor{' '}
            <ExclamationTriangleIcon className="inline" />
          </ProfessorDialog>
        </div>
      )}

      {guilds.length > 0 && noGuildSelected && (
        <div className="flex w-full items-center justify-center">
          <ProfessorDialog isAnimated>Selecione um servidor!</ProfessorDialog>
        </div>
      )}

      <Outlet />
    </div>
  );
}
