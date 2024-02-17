import { ProfessorAvatarAnimated } from './professor-avatar-animated';
import { ReactNode } from 'react';
import { ProfessorAvatar } from './professor-avatar';

export type ProfessorDialogProps = {
  isAnimated?: boolean;
  children: ReactNode;
};

export function ProfessorDialog({
  isAnimated = false,
  children,
}: ProfessorDialogProps) {
  return (
    <div className="flex items-center gap-2.5">
      {isAnimated ? <ProfessorAvatarAnimated /> : <ProfessorAvatar />}

      <div className="flex flex-col items-start gap-0.5">
        <strong className="font-helvetica text-lg font-medium tracking-tight text-slate-200">
          Professor
        </strong>

        <div className="select-none text-sm text-slate-400">{children}</div>
      </div>
    </div>
  );
}
