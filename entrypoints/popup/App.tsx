import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function App() {
  const [value, setValue] = useState('');

  return (
    <div className="flex w-80 flex-col gap-4 p-4">
      <h1 className="text-lg font-semibold">SwiftText</h1>

      <Input
        placeholder="Shadcn Input smoke test"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />

      <Select defaultValue="anthropic">
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="anthropic">Anthropic</SelectItem>
          <SelectItem value="openai">OpenAI</SelectItem>
          <SelectItem value="google">Google</SelectItem>
          <SelectItem value="fuelix">FueliX</SelectItem>
        </SelectContent>
      </Select>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Shadcn Dialog smoke test</DialogTitle>
            <DialogDescription>
              Tailwind CSS v4 + Shadcn components are wired up correctly.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
