import { Container } from '@/components/container';
import { Skeleton } from '@/components/ui/skeleton';

export function ChatContainerSkeleton() {
  return (
    <Container className="relative flex flex-1 flex-col gap-8 px-6 py-8 scrollbar-none">
      <div className="flex w-full items-start gap-4">
        <Skeleton className="size-12 flex-shrink-0 rounded-full" />

        <div className="flex w-full flex-col gap-2.5">
          <Skeleton className="h-6 w-16" />

          <Skeleton className="h-14 w-1/2" />
        </div>
      </div>

      <div className="flex w-full items-start gap-4">
        <Skeleton className="size-12 flex-shrink-0 rounded-full" />

        <div className="flex w-full flex-col gap-2.5">
          <Skeleton className="h-6 w-32" />

          <Skeleton className="h-12 w-[400px]" />
          <Skeleton className="h-20 w-[600px]" />
        </div>
      </div>

      <div className="flex w-full items-start gap-4">
        <Skeleton className="size-12 flex-shrink-0 rounded-full" />

        <div className="flex w-full flex-col gap-2.5">
          <Skeleton className="h-6 w-24" />

          <Skeleton className="h-[300px] w-[400px]" />
        </div>
      </div>

      <div className="flex w-full items-start gap-4">
        <Skeleton className="size-12 flex-shrink-0 rounded-full" />

        <div className="flex w-full flex-col gap-2.5">
          <Skeleton className="h-6 w-[200px]" />

          <Skeleton className="h-8 w-44" />
        </div>
      </div>
    </Container>
  );
}
