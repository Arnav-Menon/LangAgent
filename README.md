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

## 🧪 Demo Agents
Try some pre-built sample agents:
- Startup Coach
- Math Solver
- Web Search Bot

Or define your own using YAML with tools and memory.

## 📁 Project Structure
```bash
src/
├── app/                 # Pages, layouts, routes
├── components/          # UI and shared components
├── lib/                 # Supabase client, YAML parser, etc
├── styles/              # Tailwind config + globals
```

## ✅ Deployment (Vercel)
1. Push to GitHub
2. Go to vercel.com -> Import Project
3. Add the same environment variables to Vercel
4. Deploy!

## 🔐 Supabase Setup
Make sure your Supabase project has:
* An `agents` table with RLS
* A `messages` table (for chat history)
* Policies like:
```sql
-- Agents table
create policy "Users can insert their agents"
on agents for insert
with check (auth.uid() = user_id);

create policy "Users can read their agents"
on agents for select
using (auth.uid() = user_id);

-- Messages table
create policy "Users can insert messages"
on messages for insert
with check (auth.uid() = user_id);

create policy "Users can read their messages"
on messages for select
using (auth.uid() = user_id);
```

## 🧠 Example YAML Config
```yaml
name: Research Assistant
description: Helps search and solve problems
system_prompt: You are a helpful AI assistant.
tools:
  - calculator
  - web-search
memory: true
```