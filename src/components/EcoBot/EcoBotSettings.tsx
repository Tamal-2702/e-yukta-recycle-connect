
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

export const EcoBotSettings: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            EcoBot is powered by Gemini AI and ready to answer your questions about e-waste management
            and sustainable electronics practices.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="text-sm text-muted-foreground">
            To learn more about how EcoBot can help you with sustainable electronics practices,
            just click the chat button and start asking questions!
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
