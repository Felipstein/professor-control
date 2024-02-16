import { cn } from '@/utils/cn';

import { ProfessorAvatar, ProfessorAvatarProps } from './professor-avatar';

export type ProfessorAvatarAnimatedProps = ProfessorAvatarProps;

export function ProfessorAvatarAnimated({
  className,
  ...props
}: ProfessorAvatarAnimatedProps) {
  return (
    <div className="group relative h-fit w-fit rounded-full">
      <div className="absolute inset-0 rounded-full bg-white/10 group-hover:animate-ping" />

      <ProfessorAvatar
        className={cn('group-hover:animate-spin', className)}
        {...props}
      />
    </div>
  );
}
