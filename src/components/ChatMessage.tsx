import ReactMarkdown from "react-markdown";
import { Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";

export type Msg = { role: "user" | "assistant"; content: string };

export const ChatMessage = ({ message }: { message: Msg }) => {
  const isUser = message.role === "user";
  return (
    <div className={cn("flex gap-3 w-full", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="h-9 w-9 rounded-full flex items-center justify-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-card text-card-foreground border border-border rounded-tl-sm shadow-[var(--shadow-soft)]"
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose prose-sm max-w-none prose-headings:mt-3 prose-headings:mb-2 prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5 prose-strong:text-foreground prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground">
            {message.content ? (
              <ReactMarkdown>{message.content}</ReactMarkdown>
            ) : (
              <span className="inline-flex gap-1">
                <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.3s]" />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.15s]" />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" />
              </span>
            )}
          </div>
        )}
      </div>
      {isUser && (
        <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
          <User className="h-4 w-4 text-secondary-foreground" />
        </div>
      )}
    </div>
  );
};
