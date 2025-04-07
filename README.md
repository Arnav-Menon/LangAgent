# 🧠 LangAgent

LangAgent lets you **build and chat with custom AI agents** using YAML/JSON configs. Define prompts, tools, and memory in code — then deploy and interact with your agents in real time.

Built with ❤️ using **Next.js, Supabase, OpenRouter, and Tailwind CSS**.

---

## 🚀 Features

- ✍️ **YAML-based Agent Configs** — Define agent behavior in code
- 💬 **Real-Time Chat Interface** — GPT-powered chat with streaming
- 🧰 **Built-in Tools** — Add calculator, web-search, memory, and more
- 🧠 **Agent Memory** — Store conversation history per user/agent
- 🔐 **Auth with Google** — Save & manage your agents
- 📁 **Dashboard** — Revisit and test saved agents
- 🛡️ **Row-Level Security** — Supabase RLS for user data isolation
- 🌐 **Deployed with Vercel**

---

## 🛠 Tech Stack

| Tech        | Purpose                          |
|-------------|----------------------------------|
| Next.js     | Frontend + API (App Router)      |
| Supabase    | Auth, Database, RLS              |
| TailwindCSS | UI Styling                       |
| OpenRouter  | Chat API (supports GPT-4, Claude, etc) |
| YAML        | Agent config format              |

---

## 📦 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/YOUR_USERNAME/langagent.git
cd langagent
npm install
```

### 2. Create a `.env.local` File

```bash
cp .env.local.example .env.local
```
Then add your keys from Supabase and OpenRouter
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
OPENROUTER_API_KEY=sk-your-openrouter-key
```

### 3. Start the Dev Server

```bash
make dev
```
