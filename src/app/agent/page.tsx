export const dynamic = "force-dynamic"

import { supabase } from "@/lib/supabase"
import { notFound } from "next/navigation"
import { type PageProps } from "next"

export default async function AgentPage({ params }: PageProps<{ slug: string }>) {
  const { slug } = params

  const { data: agent, error } = await supabase
    .from("agents")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!agent || error) {
    return notFound()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{agent.name}</h1>
      <p className="text-muted-foreground mt-2">{agent.description}</p>

      <pre className="mt-6 bg-zinc-950 text-white p-4 rounded text-sm overflow-auto">
        {JSON.stringify(agent.config, null, 2)}
      </pre>
    </div>
  )
}
