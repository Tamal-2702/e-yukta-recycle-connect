
import React from 'react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface EcoBotMessageProps {
  message: Message;
}

export const EcoBotMessage: React.FC<EcoBotMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={cn(
      "flex items-start gap-2.5",
      isBot ? "justify-start" : "justify-end"
    )}>
      {isBot && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-primary-foreground">
          🤖
        </div>
      )}
      
      <div className={cn(
        "flex-1 max-w-[80%] p-3 rounded-lg",
        isBot ? "bg-muted" : "bg-primary text-primary-foreground"
      )}>
        <p className="text-sm">{message.text}</p>
        <div className={cn(
          "text-xs mt-1",
          isBot ? "text-muted-foreground" : "text-primary-foreground/70"
        )}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {!isBot && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-secondary text-secondary-foreground">
          👤
        </div>
      )}
    </div>
  );
};
