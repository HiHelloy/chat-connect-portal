import { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
}

const ChatInput = ({ onSend, isLoading }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="relative max-w-4xl mx-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          disabled={isLoading}
          className="
            w-full h-14 pl-5 pr-14 rounded-2xl
            bg-secondary/80 border border-border
            text-foreground placeholder:text-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
            transition-all duration-200
            disabled:opacity-50
          "
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="
            absolute right-2 top-1/2 -translate-y-1/2
            w-10 h-10 rounded-xl
            bg-gradient-hero text-white
            flex items-center justify-center
            hover:opacity-90 disabled:opacity-50
            transition-all duration-200
            disabled:cursor-not-allowed
          "
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
