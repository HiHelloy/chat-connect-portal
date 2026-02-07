import { User, Bot, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  isError?: boolean;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const [showSources, setShowSources] = useState(false);
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-4 animate-slide-up ${isUser ? "flex-row-reverse" : ""}`}>
      {/* Avatar */}
      <div
        className={`
          flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
          ${isUser 
            ? "bg-gradient-accent" 
            : message.isError 
              ? "bg-destructive" 
              : "bg-gradient-primary"
          }
        `}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-[80%] ${isUser ? "text-right" : ""}`}>
        <div
          className={`
            inline-block p-4 rounded-2xl
            ${isUser 
              ? "bg-gradient-hero text-white rounded-tr-md" 
              : message.isError
                ? "bg-destructive/10 border border-destructive/20 text-foreground rounded-tl-md"
                : "bg-card border border-border shadow-sm text-foreground rounded-tl-md"
            }
          `}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>

        {/* Sources */}
        {message.sources && message.sources.length > 0 && (
          <div className="mt-2">
            <button
              onClick={() => setShowSources(!showSources)}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              {showSources ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              Sources
            </button>
            {showSources && (
              <div className="mt-2 p-3 bg-secondary/50 rounded-lg border border-border animate-fade-in">
                <ul className="space-y-1">
                  {message.sources.map((source, index) => (
                    <li key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {source}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
