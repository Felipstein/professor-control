import { Container } from '@/components/container';
import { Skeleton } from '@/components/ui/skeleton';

export function ChannelsListSkeleton() {
  return (
    <Container className="flex w-72 flex-col gap-4 px-4 py-4 scrollbar-none">
      {Array.from({ length: 20 }).map((_, index) => (
        <Skeleton key={index} className="h-6 w-full" />
      ))}
    </Container>
  );
}
