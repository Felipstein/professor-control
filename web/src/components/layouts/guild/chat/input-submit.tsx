import { Input } from '@/components/ui/input';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { FormEvent, useState } from 'react';

export function InputSubmit() {
  const [input, setInput] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setInput('');
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="mb-6 flex w-full items-center gap-2 rounded-lg bg-muted/40 px-4 py-1.5"
    >
      <PaperPlaneIcon className="size-4 -rotate-45 text-muted-foreground" />

      <Input
        type="text"
        className="w-full border-none bg-transparent p-0 focus-visible:ring-0"
        placeholder="Bora lá..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
    </form>
  );
}
