import { ProfessorDialog } from '@/components/professor-dialog';
import { queryKeys } from '@/config/query-keys';
import { makeGuildService } from '@/factories/make-guild-service';
import { useQuery } from '@tanstack/react-query';
import { Outlet, useLocation } from 'react-router-dom';

export function GuildsPage() {
  const location = useLocation();

  const { data: guilds = [], isLoading: isLoadingGuilds } = useQuery({
    queryKey: queryKeys.getGuilds(),
    queryFn: () => makeGuildService().getGuilds(),
  });

  const noGuildSelected =
    /^\/app\/guilds$/.test(location.pathname) ||
    /^\/app\/guilds\/$/.test(location.pathname);

  if (isLoadingGuilds || guilds.length === 0) {
    return null;
  }

  if (noGuildSelected) {
    return (
      <div className="flex w-full items-center justify-center">
        <ProfessorDialog isAnimated>Selecione um servidor!</ProfessorDialog>
      </div>
    );
  }

  return <Outlet />;
}
