import { Mail, FileText, CalendarClock, Search } from "lucide-react";

const actions = [
  { icon: Mail, label: "Write an email", prompt: "Help me write a professional email. Ask me what it's about." },
  { icon: FileText, label: "Summarize notes", prompt: "I'll paste meeting notes and you summarize them into Key Points, Decisions, Action Items, and Deadlines." },
  { icon: CalendarClock, label: "Plan my day", prompt: "Help me plan my day. Ask me for my tasks and deadlines, then build a time-blocked schedule." },
  { icon: Search, label: "Research a topic", prompt: "I want quick research on a topic. Ask me what topic, then provide a summary, key insights, and recommendations." },
];

export const QuickActions = ({ onPick }: { onPick: (prompt: string) => void }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
    {actions.map(({ icon: Icon, label, prompt }) => (
      <button
        key={label}
        onClick={() => onPick(prompt)}
        className="group flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-[var(--shadow-soft)] transition-all text-left"
      >
        <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center group-hover:scale-105 transition-transform">
          <Icon className="h-5 w-5 text-accent-foreground" />
        </div>
        <span className="font-medium text-sm text-foreground">{label}</span>
      </button>
    ))}
  </div>
);
