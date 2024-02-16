import { GuildsList } from '@/components/layouts/app/guilds-list';

export function AppPage() {
  return (
    <div className="flex min-h-screen items-stretch">
      <GuildsList />
    </div>
  );
}
