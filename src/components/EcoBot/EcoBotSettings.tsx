
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings } from 'lucide-react';
import { useEcoBotApi } from '@/hooks/useEcoBotApi';
import { useToast } from '@/hooks/use-toast';

export const EcoBotSettings: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { saveApiKey, hasApiKey } = useEcoBotApi();
  const { toast } = useToast();

  const handleSave = () => {
    if (apiKey.trim()) {
      saveApiKey(apiKey.trim());
      toast({
        title: 'API Key Saved',
        description: 'Your Gemini API key has been saved successfully.',
      });
      setIsOpen(false);
    } else {
      toast({
        title: 'Error',
        description: 'Please enter a valid API key.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="absolute top-2 right-2">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>EcoBot Settings</DialogTitle>
          <DialogDescription>
            Configure your Gemini API key to use the chatbot.
            {hasApiKey && " You already have an API key set."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="apiKey" className="col-span-4">
              Gemini API Key
            </Label>
            <Input
              id="apiKey"
              placeholder={hasApiKey ? "••••••••••••••••" : "Enter your Gemini API key"}
              className="col-span-4"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          <div className="col-span-4 text-xs text-muted-foreground">
            You can get a Gemini API key from the{" "}
            <a
              href="https://ai.google.dev/tutorials/setup"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Google AI Studio
            </a>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save API Key</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
