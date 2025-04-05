
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Send, ChevronRight, Bot, User, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface AIComplianceAssistantProps {
  className?: string;
}

const AIComplianceAssistant: React.FC<AIComplianceAssistantProps> = ({ className }) => {
  const { toast } = useToast();
  const [inputMessage, setInputMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI E-Waste Compliance Assistant. I can help with regulations, documentation requirements, or best practices for e-waste management. How can I assist you today?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      generateAIResponse(inputMessage);
    }, 1500);
  };

  const generateAIResponse = (query: string) => {
    let response = '';
    
    // Simple keyword-based responses for demo purposes
    if (query.toLowerCase().includes('regulation') || query.toLowerCase().includes('law')) {
      response = "The E-Waste (Management) Rules, 2022 govern electronic waste management in India. Key requirements include Extended Producer Responsibility (EPR), proper disposal channels, annual reporting, and consumer awareness initiatives. Would you like more specific information about any aspect of these regulations?";
    } 
    else if (query.toLowerCase().includes('report') || query.toLowerCase().includes('document')) {
      response = "Corporate entities need to maintain several documentation types: 1) Annual EPR compliance reports, 2) Inventory logs of e-waste collection, 3) Chain of custody records, 4) Disposal certificates from authorized recyclers, and 5) Awareness program documentation. Which specific document would you like to know more about?";
    }
    else if (query.toLowerCase().includes('deadline') || query.toLowerCase().includes('due date')) {
      response = "Important compliance deadlines include: 1) Annual EPR returns due by June 30th, 2) Quarterly processing reports due within 15 days of quarter end, 3) Authorization renewals 120 days before expiry. Your next upcoming deadline is the Q1 processing report due on April 15, 2025.";
    }
    else if (query.toLowerCase().includes('penalty') || query.toLowerCase().includes('fine')) {
      response = "Non-compliance penalties include: 1) Financial penalties up to ₹1 crore, 2) Potential imprisonment for severe violations, 3) Revocation of business authorization, 4) Public disclosure of non-compliance. These are enforced by the Central and State Pollution Control Boards.";
    }
    else if (query.toLowerCase().includes('recycler') || query.toLowerCase().includes('facility')) {
      response = "When selecting an e-waste recycler, ensure they: 1) Have valid authorization from CPCB/SPCB, 2) Maintain proper documentation, 3) Use environmentally sound technologies, 4) Follow occupational health standards, 5) Provide traceability for disposed waste. I can help you locate authorized recyclers in your region if needed.";
    }
    else {
      response = "Thank you for your question about " + query.split(' ').slice(0, 3).join(' ') + "... To provide accurate information, I'd need a bit more context. Are you asking about regulatory requirements, documentation processes, or best practices related to this topic? Feel free to provide more details so I can assist you better.";
    }
    
    // Add AI response
    const aiMessage: Message = {
      id: Date.now().toString(),
      content: response,
      sender: 'assistant',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const quickPrompts = [
    "What are the current e-waste regulations?",
    "What documentation do I need?",
    "When are compliance reports due?",
    "What are the penalties for non-compliance?",
    "How to choose a certified recycler?"
  ];

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>AI Compliance Assistant</CardTitle>
            <CardDescription>Ask questions about e-waste regulations and compliance</CardDescription>
          </div>
          <Badge variant="outline" className="bg-green-100 text-green-800">
            AI Powered
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Messages container */}
          <div className="bg-muted/30 rounded-lg p-3 h-[320px] overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`
                    max-w-[80%] p-3 rounded-lg
                    ${message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground ml-auto' 
                      : 'bg-muted border'
                    }
                  `}>
                    <div className="flex items-center gap-2 mb-1 text-xs opacity-70">
                      {message.sender === 'assistant' ? (
                        <>
                          <Bot size={12} />
                          <span>AI Assistant</span>
                        </>
                      ) : (
                        <>
                          <User size={12} />
                          <span>You</span>
                        </>
                      )}
                      <span>·</span>
                      <span>{formatTime(message.timestamp)}</span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted border p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      <span className="text-sm">AI is typing...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Quick prompts */}
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  setInputMessage(prompt);
                }}
              >
                {prompt}
              </Button>
            ))}
          </div>
          
          {/* Input form */}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              placeholder="Type your question here..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isTyping}
              className="flex-1"
            />
            <Button type="submit" disabled={!inputMessage.trim() || isTyping}>
              <Send size={16} />
            </Button>
          </form>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <p>This AI assistant provides general guidance on e-waste compliance. For legal advice, please consult with a compliance specialist.</p>
      </CardFooter>
    </Card>
  );
};

export default AIComplianceAssistant;
