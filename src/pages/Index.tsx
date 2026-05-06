import { useEffect, useRef, useState } from "react";
import { Sparkles, SendHorizonal } from "lucide-react";
import { ChatMessage, type Msg } from "@/components/ChatMessage";
import { QuickActions } from "@/components/QuickActions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const Index = () => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Msg = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setIsLoading(true);

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!resp.ok || !resp.body) {
        if (resp.status === 429) toast.error("Rate limit exceeded. Try again shortly.");
        else if (resp.status === 402) toast.error("AI credits exhausted. Add funds in Settings.");
        else toast.error("Failed to reach assistant.");
        setMessages(next);
        setIsLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistant = "";
      let done = false;

      while (!done) {
        const { done: rDone, value } = await reader.read();
        if (rDone) break;
        buffer += decoder.decode(value, { stream: true });

        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line || line.startsWith(":")) continue;
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const c = parsed.choices?.[0]?.delta?.content;
            if (c) {
              assistant += c;
              setMessages((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: "assistant", content: assistant };
                return copy;
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong.");
      setMessages(next);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--gradient-subtle)" }}>
      <header className="border-b border-border bg-card/60 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-4xl flex items-center gap-3 py-4">
          <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base font-semibold leading-tight">Productivity Assistant</h1>
            <p className="text-xs text-muted-foreground">Emails · Summaries · Planning · Research</p>
          </div>
        </div>
      </header>

      <main ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="container max-w-4xl py-8">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center text-center gap-6 py-12">
              <div className="h-14 w-14 rounded-2xl flex items-center justify-center shadow-[var(--shadow-elegant)]" style={{ background: "var(--gradient-primary)" }}>
                <Sparkles className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">What would you like help with today?</h2>
                <p className="text-muted-foreground">Email, Summary, Tasks, or Research — pick one to get started.</p>
              </div>
              <QuickActions onPick={send} />
            </div>
          ) : (
            <div className="space-y-5">
              {messages.map((m, i) => <ChatMessage key={i} message={m} />)}
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-border bg-card/60 backdrop-blur-sm sticky bottom-0">
        <form onSubmit={handleSubmit} className="container max-w-4xl py-4">
          <div className="flex items-end gap-2 bg-card border border-border rounded-2xl p-2 shadow-[var(--shadow-soft)] focus-within:border-primary/40 transition-colors">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask for an email, summary, plan, or research…"
              rows={1}
              className="flex-1 resize-none border-0 bg-transparent focus-visible:ring-0 shadow-none min-h-[40px] max-h-40 py-2"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="rounded-xl shrink-0">
              <SendHorizonal className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-[11px] text-muted-foreground text-center mt-2">
            AI can make mistakes — verify important information.
          </p>
        </form>
      </footer>
    </div>
  );
};

export default Index;
