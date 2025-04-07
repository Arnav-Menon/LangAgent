"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { parseAgentConfig } from "@/lib/yaml"
import { createBrowserClient } from "@supabase/ssr"
import { v4 as uuidv4 } from "uuid"
import { Textarea, Button } from "@/components/ui"
import Link from "next/link"
import YamlReference from "@/components/YamlReference"
import { User } from "@supabase/supabase-js"

const sampleAgents: { name: string; yaml: string }[] = [
  {
    name: "Startup Coach",
    yaml: `name: Startup Coach
description: Helps founders refine and validate startup ideas.
system_prompt: You are a helpful startup advisor. Ask smart questions.
tools: []
memory: false`,
  },
  {
    name: "Math Solver",
    yaml: `name: Math Solver
description: Solves complex math problems and explains the steps.
system_prompt: You are a math expert. Help the user solve equations and word problems.
tools: []
memory: false`,
  },
  {
    name: "Web Search Bot",
    yaml: `name: Web Search Bot
description: Searches the web for real-time answers.
system_prompt: You can look things up on the internet. Be fast and precise.
tools:
  - search
memory: true`,
  },
]

export default function CreateAgentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [yamlText, setYamlText] = useState("")
  const [error, setError] = useState("")
  const [user, setUser] = useState<User | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const raw = searchParams.get("config")
    if (raw) {
      try {
        const config = JSON.parse(decodeURIComponent(raw))
        const yaml = `name: ${config.name}
description: ${config.description}
tools:
${(config.tools || []).map((t: string) => `  - ${t}`).join("\n")}`
        setYamlText(yaml)
        const url = new URL(window.location.href)
        url.searchParams.delete("config")
        window.history.replaceState({}, "", url.toString())
      } catch {
        console.error("Invalid config param")
      }
    }

    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user || null)
    }
    getSession()
  }, [searchParams, supabase.auth])

  const handleSave = async () => {
    const config = parseAgentConfig(yamlText)
    if (!config) return setError("Invalid YAML")

    const {
      data: { session },
    } = await supabase.auth.getSession()

    const user = session?.user
    if (!user) {
      const encoded = encodeURIComponent(JSON.stringify(config))
      router.push(`/agent/preview?config=${encoded}`)
      return
    }

    const { data, error: dbErr } = await supabase
      .from("agents")
      .insert({
        id: uuidv4(),
        name: config.name,
        slug: config.name.toLowerCase().replace(/\s+/g, "-"),
        description: config.description,
        config,
        user_id: user.id,
      })
      .select()
      .single()

    if (dbErr) {
      setError(dbErr.message)
    } else {
      router.push(`/agent/${data.slug}`)
    }
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mt-10">
      {!user && (
        <div className="bg-yellow-100 text-yellow-800 text-sm rounded px-4 py-3 mb-4 border border-yellow-300">
          <p>
            <strong>You are not signed in</strong> — this agent may not be saved.
            <br />
            <Link href="/login" className="underline hover:text-yellow-900">
              Log in to save it permanently
            </Link>
          </p>
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4">Create Your Agent</h1>
      <div className="mb-4">
        <p className="text-sm font-medium mb-2 text-muted-foreground">
          Or try one of these samples:
        </p>
        <div className="flex flex-wrap gap-2">
          {sampleAgents.map((sample) => (
            <button
              key={sample.name}
              onClick={() => setYamlText(sample.yaml)}
              className="text-xs border border-zinc-300 px-3 py-1 rounded hover:bg-zinc-100 transition"
            >
              {sample.name}
            </button>
          ))}
        </div>
      </div>
      <Textarea
        rows={15}
        value={yamlText}
        onChange={(e) => setYamlText(e.target.value)}
        placeholder="Paste your agent YAML config here..."
      />
      <Button className="mt-4" onClick={handleSave}>
        Save Agent
      </Button>
      <YamlReference />
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}
