import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utils/cn';

import { LoaderIcon } from '../icons/loader-icon';

import type { Omit } from '@/@types/omit';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type IconComponentExpected = React.ElementType;

export type ButtonIconProps<TIconComponent extends IconComponentExpected> = {
  icon: TIconComponent;
  className?: string;
} & React.ComponentProps<TIconComponent>;

function ButtonIcon<TIconComponent extends IconComponentExpected>({
  icon: Icon,
  className,
  ...props
}: ButtonIconProps<TIconComponent>) {
  return (
    <Icon className={cn('size-[18px] flex-shrink-0', className)} {...props} />
  );
}

export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'disabled' | 'onClick'
> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isDisabled?: boolean;
    isLoading?: boolean;
    onClick?: (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => void | Promise<void>;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isDisabled = false,
      isLoading: isLoadingByProps = false,
      onClick,
      children: _children,
      ...props
    },
    ref,
  ) => {
    const [isLoadingByClickFn, setIsLoadingByClickFn] = React.useState(false);

    const Comp = asChild ? Slot : 'button';

    const handleClick = React.useCallback(
      async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!onClick) {
          return;
        }

        const result = onClick?.(event);

        if (result instanceof Promise) {
          try {
            setIsLoadingByClickFn(true);

            await result;
            // eslint-disable-next-line no-useless-catch
          } catch (error) {
            throw error;
          } finally {
            setIsLoadingByClickFn(false);
          }
        }
      },
      [onClick],
    );

    const isLoading = isLoadingByClickFn || isLoadingByProps;

    const firstChildIsIcon = React.useMemo(() => {
      if (!_children) {
        return false;
      }

      const firstChild = React.Children.toArray(_children)[0];

      return (
        firstChild &&
        React.isValidElement(firstChild) &&
        'icon' in firstChild.props
      );
    }, [_children]);

    const children = React.useMemo(() => {
      if (firstChildIsIcon && isLoading) {
        return React.Children.toArray(_children).slice(1);
      }

      return _children;
    }, [_children, firstChildIsIcon, isLoading]);

    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, className }),
          'flex items-center justify-center gap-2',
        )}
        disabled={isDisabled || isLoading}
        onClick={handleClick}
        {...props}
      >
        {!asChild && isLoading ? (
          <>
            <ButtonIcon icon={LoaderIcon} className="animate-spin" />

            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, ButtonIcon };
