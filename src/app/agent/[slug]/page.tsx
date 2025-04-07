import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ChatWindow } from "@/components/ChatWindow"

type AgentPageProps = {
  params: Promise <{
    slug: string
  }>
}

export default async function AgentPage({ params }: AgentPageProps) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { slug } = await params

  const { data: agent, error } = await supabase
    .from("agents")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!agent || error) return notFound()

  const { data: messages } = await supabase
    .from("messages")
    .select("role, content")
    .eq("user_id", user?.id)
    .eq("agent_id", agent.id)
    .order("created_at", { ascending: true })
    .limit(20)

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{agent.name}</h1>
      <p className="text-muted-foreground mt-2">{agent.description}</p>

      <ChatWindow
        systemPrompt={agent.config.system_prompt}
        agentId={agent.id}
        userId={user?.id}
        initialMessages={messages || []}
      />
    </div>
  )
}
