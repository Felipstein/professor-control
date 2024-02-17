import { Input } from '@/components/ui/input';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { ChangeEvent, FormEvent, useState } from 'react';

export type InputSubmitProps = {
  onSubmit?: (message: string) => void;
  onType?: () => void;
};

export function InputSubmit({ onSubmit, onType }: InputSubmitProps) {
  const [input, setInput] = useState('');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setInput(value);
    onType?.();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!input) {
      return;
    }

    onSubmit?.(input);

    setInput('');
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex w-full items-center gap-2 rounded-lg bg-muted/40 px-4 py-1.5"
    >
      <PaperPlaneIcon className="size-4 -rotate-45 text-muted-foreground" />

      <Input
        type="text"
        className="w-full border-none bg-transparent p-0 focus-visible:ring-0"
        placeholder="Bora lá..."
        value={input}
        onChange={handleChange}
      />
    </form>
  );
}
