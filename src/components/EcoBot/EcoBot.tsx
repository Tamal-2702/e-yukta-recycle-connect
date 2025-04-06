
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { MessageCircle, Send, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { EcoBotMessage } from './EcoBotMessage';
import { useEcoBotApi } from '@/hooks/useEcoBotApi';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const EcoBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I am EcoBot, your sustainable e-waste assistant. Ask me anything about e-waste disposal, recycling tips, or how to reduce your environmental impact!',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { sendMessage } = useEcoBotApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call API and get response
      const response = await sendMessage(input);
      
      // Add bot message
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I couldn't process your request. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* Floating action button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button size="icon" className="h-12 w-12 rounded-full shadow-lg">
              <MessageCircle className="h-6 w-6" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[80vh] rounded-t-xl">
            <DrawerHeader className="border-b">
              <DrawerTitle className="flex items-center">
                <MessageCircle className="mr-2 h-5 w-5 text-primary" />
                EcoBot
                <Badge variant="outline" className="ml-2">AI Assistant</Badge>
              </DrawerTitle>
            </DrawerHeader>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <EcoBotMessage key={message.id} message={message} />
                ))}
                {isLoading && (
                  <div className="flex items-start gap-2.5">
                    <div className="flex-1 bg-muted p-3 rounded-lg">
                      <div className="animate-pulse flex space-x-2">
                        <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input area */}
            <DrawerFooter className="border-t pt-2">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about e-waste recycling..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <div className="flex justify-center text-xs text-muted-foreground pt-1">
                <Info className="h-3 w-3 mr-1" />
                Powered by Gemini AI
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};
