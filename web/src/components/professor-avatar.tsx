import { ComponentProps } from 'react';

import professorAvatar from '@/assets/professor-avatar.png';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

import type { Omit } from '@/@types/omit';

export type ProfessorAvatarProps = Omit<
  ComponentProps<typeof Avatar>,
  'children'
>;

export function ProfessorAvatar(props: ProfessorAvatarProps) {
  return (
    <Avatar {...props}>
      <AvatarImage src={professorAvatar} />
      <AvatarFallback>PF</AvatarFallback>
    </Avatar>
  );
}
