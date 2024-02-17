import { Container } from '@/components/container';
import { Skeleton } from '@/components/ui/skeleton';

export function MembersListSkeleton() {
  return (
    <Container className="flex w-20 flex-col gap-2 px-4 py-4 scrollbar-none">
      <Skeleton className="mb-3 h-8 rounded-md" />

      {Array.from({ length: 12 }).map((_, index) => (
        <Skeleton key={index} className="size-12 rounded-full" />
      ))}
    </Container>
  );
}
