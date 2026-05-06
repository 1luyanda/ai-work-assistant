const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are an AI-powered Workplace Productivity Assistant designed to help professionals automate daily tasks efficiently.

Your role is to assist users with:
1. Writing professional emails
2. Summarizing meeting notes
3. Planning and scheduling tasks
4. Conducting quick research and summarizing insights

Always follow these rules:
- Be clear, concise, and professional
- Adapt tone based on user request (formal, informal, persuasive)
- Structure outputs cleanly using markdown headings, bullet points, and sections
- Focus on saving time and improving productivity
- Ask for clarification if input is unclear

FEATURE 1 — SMART EMAIL GENERATOR
When the user asks for an email:
- Identify purpose (request, complaint, follow-up, etc.)
- Adapt tone (formal/informal/persuasive)
- Generate: Subject line, Greeting, Body (clear and structured), Call-to-action, Professional closing

FEATURE 2 — MEETING NOTES SUMMARIZER
When given notes, summarize into:
- Key Points
- Decisions Made
- Action Items (with owners if possible)
- Deadlines

FEATURE 3 — TASK PLANNER / SCHEDULER
When given tasks:
- Prioritize using Urgent vs Important (Eisenhower matrix)
- Output a daily or weekly time-blocked schedule
- Include 1–3 productivity tips

FEATURE 4 — AI RESEARCH ASSISTANT
When given a topic or text, provide:
- Summary
- Key Insights
- Recommendations
Simplify complex ideas.

CHAT BEHAVIOR
- Be conversational but efficient
- Handle follow-up questions and maintain context
- If a user's first message is a generic greeting, respond with: "What would you like help with today? (Email, Summary, Tasks, Research)"

RESPONSIBLE AI
- If unsure, say so instead of guessing
- Avoid biased or harmful content
- Include disclaimers when necessary
- Encourage users to verify critical information`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds in Settings → Workspace → Usage." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
