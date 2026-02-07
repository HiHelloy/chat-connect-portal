import { ChevronLeft, ChevronRight, MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  onClearChat: () => void;
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

const ChatSidebar = ({
  isCollapsed,
  onToggle,
  onClearChat,
  suggestions,
  onSuggestionClick,
}: ChatSidebarProps) => {
  return (
    <aside
      className={`
        relative flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-16" : "w-72"}
      `}
    >
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-6 z-10 w-6 h-6 rounded-full bg-card border border-border shadow-md flex items-center justify-center hover:bg-secondary transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {/* Header */}
      <div className={`p-4 border-b border-sidebar-border ${isCollapsed ? "items-center" : ""}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="animate-fade-in">
              <h2 className="font-bold text-foreground">Spotline</h2>
              <p className="text-xs text-muted-foreground">Knowledge Assistant</p>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div className="flex-1 p-4 overflow-y-auto animate-fade-in">
          <p className="text-xs text-muted-foreground mb-4">
            Internal Q&A over SOPs, checklists, and UI locators.
          </p>

          <h3 className="text-sm font-semibold text-foreground mb-3">Try asking</h3>
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index}>
                <button
                  onClick={() => onSuggestionClick(suggestion)}
                  className="w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-sidebar-accent"
                >
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer */}
      <div className={`p-4 border-t border-sidebar-border ${isCollapsed ? "flex justify-center" : ""}`}>
        <Button
          variant="outline"
          size={isCollapsed ? "icon" : "default"}
          onClick={onClearChat}
          className="w-full bg-sidebar-accent hover:bg-sidebar-accent/80 border-sidebar-border"
        >
          <Trash2 className="w-4 h-4" />
          {!isCollapsed && <span className="ml-2">Clear chat</span>}
        </Button>
      </div>
    </aside>
  );
};

export default ChatSidebar;
