import { HomeIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

import { Button, ButtonIcon } from '@/components/ui/button';

export function NotFoundPage() {
  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-center gap-4">
      <p>Tá perdido amigo?</p>

      <Button size="sm" variant="outline" asChild>
        <Link to="/app">
          <ButtonIcon icon={HomeIcon} />
        </Link>
      </Button>
    </div>
  );
}
