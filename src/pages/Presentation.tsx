import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import {
  Sparkles, Mail, FileText, ListChecks, Search, Bot, Shield,
  Zap, Clock, MessageSquare, Layers, Workflow, Rocket, Mic,
  Calendar, Cloud, Languages, BarChart3, Brain, Briefcase,
  TrendingUp, ArrowRight, CheckCircle2, Code2, Lock, Eye, AlertTriangle,
  ChevronRight, PlayCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ---------- Reusable bits ---------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const Glass = ({ className = "", children }: { className?: string; children: React.ReactNode }) => (
  <div
    className={`relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(37,99,235,0.25)] ${className}`}
  >
    {children}
  </div>
);

const SectionTitle = ({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) => (
  <div className="max-w-3xl mx-auto text-center mb-14">
    <motion.div
      initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-blue-300 mb-4"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" /> {eyebrow}
    </motion.div>
    <motion.h2
      initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={1}
      className="text-4xl md:text-5xl font-bold tracking-tight text-slate-50"
    >
      {title}
    </motion.h2>
    {sub && (
      <motion.p
        initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} custom={2}
        className="mt-4 text-slate-300 text-lg"
      >
        {sub}
      </motion.p>
    )}
  </div>
);

/* Floating particles */
const Particles = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {Array.from({ length: 24 }).map((_, i) => (
      <motion.span
        key={i}
        className="absolute h-1 w-1 rounded-full bg-blue-400/40"
        style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
        animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: i * 0.2 }}
      />
    ))}
  </div>
);

/* ---------- Sections ---------- */

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(37,99,235,0.18),transparent_55%)]" />
        <motion.div
          className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-3xl"
          animate={{ x: [0, -60, 0], y: [0, -40, 0] }} transition={{ duration: 16, repeat: Infinity }}
        />
        <Particles />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div style={{ y }} className="container max-w-6xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial="hidden" animate="show" variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-blue-300 mb-6"
            >
              <Sparkles className="h-3.5 w-3.5" /> CAPACITI AI Skills Accelerator Programme
            </motion.div>
            <motion.h1
              initial="hidden" animate="show" variants={fadeUp} custom={1}
              className="text-5xl md:text-7xl font-bold tracking-tight text-slate-50 leading-[1.05]"
            >
              AI-Powered{" "}
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                Workplace Productivity
              </span>{" "}
              Assistant
            </motion.h1>
            <motion.p
              initial="hidden" animate="show" variants={fadeUp} custom={2}
              className="mt-6 text-lg md:text-xl text-slate-300 max-w-xl"
            >
              Automating Workplace Tasks Using Artificial Intelligence — emails, summaries, planning, and research in one intelligent workspace.
            </motion.p>
            <motion.div
              initial="hidden" animate="show" variants={fadeUp} custom={3}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#features"
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition shadow-[0_10px_40px_-10px_rgba(37,99,235,0.6)]"
              >
                View Features <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <Link
                to="/app"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-slate-100 font-medium transition"
              >
                <PlayCircle className="h-4 w-4" /> Try the Assistant
              </Link>
            </motion.div>
            <motion.div
              initial="hidden" animate="show" variants={fadeUp} custom={4}
              className="mt-10 flex items-center gap-4 text-sm text-slate-400"
            >
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-semibold text-white">LN</div>
              <div>
                <div className="text-slate-200 font-medium">Luyanda Ndaba</div>
                <div>Presenter · CAPACITI Programme</div>
              </div>
            </motion.div>
          </div>

          {/* Mock dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Glass className="p-5">
              <div className="flex items-center gap-2 pb-4 border-b border-white/10">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                <span className="ml-3 text-xs text-slate-400">productivity.ai / dashboard</span>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-5">
                {[
                  { i: Mail, l: "Emails", v: "128" },
                  { i: FileText, l: "Summaries", v: "47" },
                  { i: ListChecks, l: "Tasks", v: "92" },
                ].map((s, idx) => (
                  <motion.div
                    key={s.l}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="rounded-xl border border-white/10 bg-white/5 p-3"
                  >
                    <s.i className="h-4 w-4 text-blue-400" />
                    <div className="mt-2 text-xl font-bold text-slate-50">{s.v}</div>
                    <div className="text-[11px] text-slate-400">{s.l}</div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-slate-400 mb-3">Weekly activity</div>
                <div className="flex items-end gap-2 h-24">
                  {[40, 65, 50, 80, 45, 90, 70].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }} animate={{ height: `${h}%` }}
                      transition={{ delay: 0.8 + i * 0.07, duration: 0.6 }}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-blue-600 to-blue-400"
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="h-8 w-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-blue-300" />
                </div>
                <div className="text-xs text-slate-300">Assistant ready · streaming responses live</div>
              </div>
            </Glass>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const Overview = () => {
  const items = [
    { i: Clock, t: "Time-Heavy Workflows", d: "Professionals lose hours on repetitive admin tasks every week." },
    { i: Zap, t: "AI Acceleration", d: "Generative AI transforms minutes of work into seconds." },
    { i: Brain, t: "Intelligent Assistance", d: "Context-aware help across writing, planning, and research." },
    { i: Briefcase, t: "Workplace-First", d: "Built for the realities of modern knowledge work." },
  ];
  return (
    <section className="py-28 relative">
      <div className="container max-w-6xl mx-auto px-6">
        <SectionTitle eyebrow="Project Overview" title="Why this assistant exists" sub="Modern professionals juggle communication, organization, and research. AI can absorb the friction." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.t}
              initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}
            >
              <Glass className="p-6 h-full hover:border-blue-400/30 transition group">
                <div className="h-11 w-11 rounded-xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <it.i className="h-5 w-5 text-blue-300" />
                </div>
                <h3 className="text-slate-50 font-semibold mb-2">{it.t}</h3>
                <p className="text-sm text-slate-400">{it.d}</p>
              </Glass>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Problem = () => {
  const items = [
    { i: MessageSquare, t: "Time-Consuming Communication", d: "Drafting emails and replies eats into deep work." },
    { i: Layers, t: "Poor Task Organization", d: "Priorities get lost in scattered tools and notes." },
    { i: FileText, t: "Manual Summarization", d: "Meeting notes and docs require tedious distillation." },
    { i: Search, t: "Slow Research Processes", d: "Switching tabs and synthesizing sources is exhausting." },
  ];
  return (
    <section className="py-28 relative bg-[#111827]/40">
      <div className="container max-w-6xl mx-auto px-6">
        <SectionTitle eyebrow="Problem Statement" title="The friction professionals feel" />
        <div className="grid sm:grid-cols-2 gap-5">
          {items.map((it, i) => (
            <motion.div key={it.t} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}>
              <Glass className="p-6 flex gap-5 items-start hover:-translate-y-1 transition">
                <div className="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-blue-600/30 to-indigo-600/20 border border-white/10 flex items-center justify-center">
                  <it.i className="h-5 w-5 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-slate-50 font-semibold">{it.t}</h3>
                  <p className="mt-1 text-sm text-slate-400">{it.d}</p>
                </div>
              </Glass>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Objectives = () => {
  const items = [
    { t: "Automate Workplace Tasks", d: "Replace repetitive work with intelligent generation." },
    { t: "Improve Productivity", d: "Free up cognitive bandwidth for high-value thinking." },
    { t: "Demonstrate Prompt Engineering", d: "Showcase structured, role-based prompt design." },
    { t: "Apply Responsible AI", d: "Build with safety, transparency, and verification in mind." },
    { t: "Deliver Business Value", d: "Real outcomes: faster comms, better decisions." },
  ];
  return (
    <section className="py-28 relative">
      <div className="container max-w-6xl mx-auto px-6">
        <SectionTitle eyebrow="Objectives" title="What this project sets out to prove" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div key={it.t} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}>
              <Glass className="p-6 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-300 text-sm font-bold">
                    0{i + 1}
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-blue-400" />
                </div>
                <h3 className="text-slate-50 font-semibold mb-1">{it.t}</h3>
                <p className="text-sm text-slate-400">{it.d}</p>
              </Glass>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    { i: Mail, t: "Smart Email Generator", d: "Draft polished emails in any tone instantly.", b: "Cuts writing time by 70%" },
    { i: FileText, t: "Meeting Notes Summarizer", d: "Turn raw notes into key points and action items.", b: "Never miss a follow-up" },
    { i: ListChecks, t: "AI Task Planner", d: "Prioritize with the Eisenhower matrix automatically.", b: "Clarity in seconds" },
    { i: Search, t: "AI Research Assistant", d: "Quick insights and summaries across topics.", b: "Faster informed decisions" },
    { i: Bot, t: "AI Chatbot Interface", d: "Streaming, context-aware conversational UI.", b: "Natural workflow" },
  ];
  return (
    <section id="features" className="py-28 relative bg-[#111827]/40">
      <div className="container max-w-6xl mx-auto px-6">
        <SectionTitle eyebrow="Core Features" title="A complete productivity toolkit" sub="Five specialized AI modes, one elegant interface." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div key={f.t} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}>
              <Glass className="p-6 h-full group hover:border-blue-400/40 transition relative overflow-hidden">
                <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-blue-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition" />
                <div className="relative">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 shadow-[0_10px_30px_-10px_rgba(37,99,235,0.7)] group-hover:scale-110 transition">
                    <f.i className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-slate-50 font-semibold text-lg">{f.t}</h3>
                  <p className="mt-2 text-sm text-slate-400">{f.d}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1">
                    <Zap className="h-3 w-3" /> {f.b}
                  </div>
                </div>
              </Glass>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PromptEngineering = () => {
  const code = `You are a Workplace Productivity Assistant.

Mode: Email Generator
Tone: Professional, concise
Audience: My direct manager
Goal: Request leave for tomorrow

Output format:
- Subject: <subject>
- Body: <2-3 short paragraphs>
- Sign-off: <closing + name placeholder>`;
  return (
    <section className="py-28 relative">
      <div className="container max-w-6xl mx-auto px-6">
        <SectionTitle eyebrow="Prompt Engineering" title="Structured prompts that produce reliable outputs" />
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            {[
              { t: "Structured Prompting", d: "Clear sections for role, task, constraints, and format." },
              { t: "Role-Based Prompts", d: "Define the assistant's persona for consistent voice." },
              { t: "Tone Adaptation", d: "Switch between formal, friendly, or persuasive on demand." },
              { t: "Output Formatting", d: "Markdown structure for scannable, professional results." },
            ].map((it, i) => (
              <motion.div key={it.t} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Glass className="p-5 flex gap-4 items-start">
                  <ChevronRight className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="text-slate-50 font-semibold">{it.t}</h4>
                    <p className="text-sm text-slate-400 mt-1">{it.d}</p>
                  </div>
                </Glass>
              </motion.div>
            ))}
          </div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <Glass className="overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Code2 className="h-4 w-4 text-blue-300" /> example.prompt
                </div>
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-400/60" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
                  <span className="h-2 w-2 rounded-full bg-green-400/60" />
                </div>
              </div>
              <pre className="p-5 text-[13px] leading-6 text-slate-200 overflow-x-auto">
                <code>
                  {code.split("\n").map((line, i) => (
                    <div key={i}>
                      <span className="inline-block w-6 text-slate-600 select-none">{i + 1}</span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: line
                            .replace(/(Mode|Tone|Audience|Goal|Output format):/g, '<span style="color:#60a5fa">$1</span>:')
                            .replace(/(You are.*?Assistant\.)/, '<span style="color:#a5b4fc">$1</span>')
                            .replace(/(<[^>]+>)/g, '<span style="color:#86efac">$1</span>'),
                        }}
                      />
                    </div>
                  ))}
                </code>
              </pre>
            </Glass>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Responsible = () => {
  const items = [
    { i: Shield, t: "Ethical AI Practices", d: "Designed with fairness and respect for users." },
    { i: Eye, t: "Bias Prevention", d: "Awareness of model limitations baked into prompts." },
    { i: CheckCircle2, t: "Validation Checks", d: "Outputs prompt users to review critical info." },
    { i: AlertTriangle, t: "Verification Reminders", d: "Clear disclaimers — AI assists, humans decide." },
  ];
  return (
    <section className="py-28 relative bg-[#111827]/40">
      <div className="container max-w-6xl mx-auto px-6">
        <SectionTitle eyebrow="Responsible AI" title="Built on trust and safety" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it, i) => (
            <motion.div key={it.t} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}>
              <Glass className="p-6 h-full text-center">
                <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-600/30 to-indigo-700/30 border border-blue-500/30 flex items-center justify-center mb-4 shadow-[0_0_30px_-5px_rgba(37,99,235,0.5)]">
                  <it.i className="h-6 w-6 text-blue-300" />
                </div>
                <h3 className="text-slate-50 font-semibold">{it.t}</h3>
                <p className="text-sm text-slate-400 mt-2">{it.d}</p>
              </Glass>
            </motion.div>
          ))}
        </div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mt-10">
          <Glass className="p-6 flex items-center gap-4">
            <Lock className="h-5 w-5 text-blue-300 shrink-0" />
            <p className="text-sm text-slate-300">
              Every response includes a disclaimer encouraging users to verify critical information before acting.
            </p>
          </Glass>
        </motion.div>
      </div>
    </section>
  );
};

const Workflow_ = () => {
  const steps = [
    { i: ListChecks, t: "Select Feature", d: "Pick from email, summary, plan, or research." },
    { i: MessageSquare, t: "Enter Prompt", d: "Describe the goal in plain language." },
    { i: Bot, t: "AI Processes", d: "Streaming generation in real time." },
    { i: FileText, t: "Output Generated", d: "Structured, formatted, ready to use." },
    { i: Rocket, t: "Copy or Download", d: "Drop it into your workflow instantly." },
  ];
  return (
    <section className="py-28 relative">
      <div className="container max-w-6xl mx-auto px-6">
        <SectionTitle eyebrow="User Workflow" title="From prompt to output in seconds" />
        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {steps.map((s, i) => (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Glass className="p-5 text-center relative">
                  <div className="mx-auto h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-3 shadow-[0_0_30px_-5px_rgba(37,99,235,0.7)]">
                    <s.i className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-[11px] text-blue-300 font-bold tracking-wider mb-1">STEP {i + 1}</div>
                  <h3 className="text-slate-50 font-semibold text-sm">{s.t}</h3>
                  <p className="text-xs text-slate-400 mt-1">{s.d}</p>
                </Glass>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Impact = () => {
  const stats = [
    { i: Clock, v: "70%", l: "Time saved on email drafting" },
    { i: MessageSquare, v: "5x", l: "Faster meeting summaries" },
    { i: ListChecks, v: "3x", l: "Better task organization" },
    { i: TrendingUp, v: "100%", l: "Repetitive work automated" },
  ];
  return (
    <section className="py-28 relative bg-[#111827]/40">
      <div className="container max-w-6xl mx-auto px-6">
        <SectionTitle eyebrow="Productivity Impact" title="Measurable gains where it matters" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <motion.div key={s.l} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}>
              <Glass className="p-6 relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl" />
                <s.i className="h-5 w-5 text-blue-300" />
                <div className="mt-4 text-4xl font-bold bg-gradient-to-r from-blue-300 to-indigo-200 bg-clip-text text-transparent">
                  {s.v}
                </div>
                <div className="text-sm text-slate-400 mt-1">{s.l}</div>
              </Glass>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Future = () => {
  const items = [
    { i: Mic, t: "Voice Assistant" },
    { i: Calendar, t: "Calendar Sync" },
    { i: Cloud, t: "Cloud Deployment" },
    { i: Languages, t: "Multi-Language Support" },
    { i: BarChart3, t: "Analytics Dashboard" },
  ];
  return (
    <section className="py-28 relative">
      <div className="container max-w-6xl mx-auto px-6">
        <SectionTitle eyebrow="Future Improvements" title="What's coming next" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {items.map((it, i) => (
            <motion.div key={it.t} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}>
              <Glass className="p-6 text-center group hover:border-blue-400/40 transition">
                <div className="mx-auto h-12 w-12 rounded-xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center mb-3 group-hover:rotate-6 transition">
                  <it.i className="h-5 w-5 text-blue-300" />
                </div>
                <h3 className="text-slate-50 text-sm font-semibold">{it.t}</h3>
              </Glass>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Industry = () => {
  const roles = [
    { t: "AI Prompt Engineer", d: "Designs reliable prompts for production AI systems." },
    { t: "AI Productivity Specialist", d: "Helps teams adopt AI tools to eliminate friction." },
    { t: "Business Analyst", d: "Translates AI output into business decisions." },
    { t: "Digital Transformation Analyst", d: "Leads org-wide AI workflow modernization." },
  ];
  return (
    <section className="py-28 relative bg-[#111827]/40">
      <div className="container max-w-6xl mx-auto px-6">
        <SectionTitle eyebrow="Industry Relevance" title="Careers this project maps to" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {roles.map((r, i) => (
            <motion.div key={r.t} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}>
              <Glass className="p-6 h-full">
                <Briefcase className="h-5 w-5 text-blue-300" />
                <h3 className="mt-4 text-slate-50 font-semibold">{r.t}</h3>
                <p className="text-sm text-slate-400 mt-2">{r.d}</p>
              </Glass>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Conclusion = () => (
  <section className="py-32 relative overflow-hidden">
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.25),transparent_60%)]" />
      <Particles />
    </div>
    <div className="container max-w-4xl mx-auto px-6 text-center">
      <motion.h2
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
        className="text-4xl md:text-6xl font-bold tracking-tight text-slate-50 leading-tight"
      >
        Artificial Intelligence, working{" "}
        <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
          for the workplace
        </span>
      </motion.h2>
      <motion.p
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={1}
        className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto"
      >
        This project demonstrates how Artificial Intelligence can improve workplace productivity through automation, organization, and intelligent assistance.
      </motion.p>
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={2} className="mt-10">
        <Link
          to="/app"
          className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg transition shadow-[0_0_60px_-10px_rgba(37,99,235,0.8)] hover:shadow-[0_0_80px_-5px_rgba(37,99,235,1)]"
        >
          <PlayCircle className="h-5 w-5" /> Live Demo
          <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-white/10 bg-[#0B1120]">
    <div className="container max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-slate-100 font-semibold text-sm">AI Productivity Assistant</div>
            <div className="text-xs text-slate-400">Presented by Luyanda Ndaba</div>
          </div>
        </div>
        <div className="text-xs text-slate-400 text-center md:text-right">
          CAPACITI AI Skills Accelerator Programme<br />
          <span className="text-slate-500">© {new Date().getFullYear()} · Built with intelligence</span>
        </div>
      </div>
    </div>
  </footer>
);

/* ---------- Top nav ---------- */

const Nav = () => {
  const links = [
    { h: "#features", l: "Features" },
    { h: "#workflow", l: "Workflow" },
    { h: "#impact", l: "Impact" },
    { h: "#future", l: "Future" },
  ];
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-[#0F172A]/70 border-b border-white/10">
      <div className="container max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-slate-100 font-semibold text-sm">Productivity AI</span>
        </div>
        <nav className="hidden md:flex items-center gap-7 text-sm text-slate-300">
          {links.map((l) => (
            <a key={l.h} href={l.h} className="hover:text-white transition">{l.l}</a>
          ))}
        </nav>
        <Link
          to="/app"
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition"
        >
          Try Live <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </header>
  );
};

/* ---------- Page ---------- */

const Presentation = () => {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 antialiased selection:bg-blue-500/30">
      <Nav />
      <main className="pt-16">
        <Hero />
        <Overview />
        <Problem />
        <Objectives />
        <Features />
        <PromptEngineering />
        <Responsible />
        <div id="workflow"><Workflow_ /></div>
        <div id="impact"><Impact /></div>
        <div id="future"><Future /></div>
        <Industry />
        <Conclusion />
      </main>
      <Footer />
    </div>
  );
};

export default Presentation;
