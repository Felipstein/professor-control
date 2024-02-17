import { cn } from '@/utils/cn';
import { Slot } from '@radix-ui/react-slot';
import { ComponentProps } from 'react';

export type ContainerProps = ComponentProps<'div'> & {
  noFillHeight?: boolean;
  asChild?: boolean;
};

export function Container({
  className,
  noFillHeight = false,
  asChild = false,
  ...props
}: ContainerProps) {
  const Comp = asChild ? Slot : 'div';

  return (
    // @ts-expect-error
    <Comp
      className={cn(
        'overflow-y-auto rounded-xl bg-gradient-to-br from-black/50 to-black/30 backdrop-blur-sm',
        className,
      )}
      style={!noFillHeight ? { height: 'calc(100vh - 24px)' } : undefined}
      {...props}
    />
  );
}
