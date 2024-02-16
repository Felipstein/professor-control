import { cn } from '@/utils/cn';

import { Skeleton } from './ui/skeleton';

export type GuildAvatarSkeletonProps = {
  className?: string;
};

export function GuildAvatarSkeleton({ className }: GuildAvatarSkeletonProps) {
  return <Skeleton className={cn('rounded-full', className)} />;
}
