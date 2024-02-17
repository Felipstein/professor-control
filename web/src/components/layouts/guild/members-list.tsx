import { GuildMember } from '@/@types/guild-member';
import { Container } from '@/components/container';
import { UserAvatar } from '@/components/user-avatar';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { DoubleArrowLeftIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

export type MembersListProps = {
  members: GuildMember[];
};

export function MembersList({ members }: MembersListProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Container
      data-expanded={isExpanded}
      className="flex w-20 flex-col gap-2 px-4 py-4 scrollbar-none data-[expanded=true]:w-64 data-[expanded=true]:gap-3"
    >
      <header className="flex items-center justify-between gap-4">
        <Button
          type="button"
          onClick={() => setIsExpanded((state) => !state)}
          className="w-fit"
          variant="ghost"
        >
          <DoubleArrowLeftIcon
            data-expanded={isExpanded}
            className="data-[expanded=true]:rotate-180"
          />
        </Button>

        {isExpanded && (
          <span className="text-sm text-slate-400">
            {members.length} membro(s)
          </span>
        )}
      </header>

      {!isExpanded &&
        members.map((member) => (
          <Tooltip key={member.id}>
            <TooltipTrigger asChild>
              <UserAvatar
                id={member.id}
                name={member.serverName || member.globalName}
                avatarKey={member.serverAvatar || member.avatar}
                width={48}
                height={48}
              />
            </TooltipTrigger>

            <TooltipContent>
              {member.serverName || member.globalName}
            </TooltipContent>
          </Tooltip>
        ))}

      {isExpanded &&
        members.map((member) => (
          <div key={member.id} className="flex select-none items-center gap-3">
            <UserAvatar
              id={member.id}
              name={member.serverName || member.globalName}
              avatarKey={member.serverAvatar || member.avatar}
              width={48}
              height={48}
            />

            <span className="truncate text-slate-300">
              {member.serverName || member.globalName}
            </span>
          </div>
        ))}
    </Container>
  );
}
