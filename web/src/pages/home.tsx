import { RocketIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

import { ProfessorAvatarAnimated } from '@/components/professor-avatar-animated';
import { Button, ButtonIcon } from '@/components/ui/button';

export function HomePage() {
  return (
    <div className="flex h-full min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <ProfessorAvatarAnimated className="size-32" />

        <h1 className="mb-8 animate-pulse select-none text-3xl uppercase tracking-widest text-muted-foreground/80">
          Professor Control
        </h1>

        <Button className="w-full" asChild>
          <Link to="/app">
            <ButtonIcon icon={RocketIcon} />
            Acessar
          </Link>
        </Button>
        <small className="italic text-muted-foreground/40">
          psi psi... acesso restrito 👀...
        </small>
      </div>
    </div>
  );
}
