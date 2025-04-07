"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import Link from "next/link"
import { AgentConfig } from "@/types/agent"

export default function MyAgents() {
  const [agents, setAgents] = useState<AgentConfig[]>([])

  useEffect(() => {
    const fetchAgents = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from("agents")
        .select("id, name, slug, description, system_prompt")
        .eq("user_id", user.id)
      setAgents(data || [])
    }

    fetchAgents()
  }, [])

  if (!agents.length) return null

  return (
    <div className="mt-6 px-4">
      <h3 className="text-xs text-muted-foreground mb-2">My Agents</h3>
      <ul className="space-y-1">
        {agents.map((a) => (
          <li key={a.id}>
            <Link
              href={`/agent/${a.slug}`}
              className="text-sm text-white hover:underline"
            >
              {a.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
