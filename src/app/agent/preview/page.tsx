"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { ChatWindow } from "@/components/ChatWindow"
import { User } from "@supabase/supabase-js"

export default function PreviewAgentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const raw = searchParams.get("config")
  const [user, setUser] = useState<User | null>(null)

  const supabase = useMemo(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ), [])

  const config = useMemo(() => {
    try {
      return raw ? JSON.parse(decodeURIComponent(raw)) : null
    } catch {
      console.error("Invalid config param")
      return null
    }
  }, [raw])

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [supabase])

  if (!config) {
    return <div className="p-6 text-red-500">Invalid or missing agent config.</div>
  }

  const handleSave = () => {
    const encoded = encodeURIComponent(JSON.stringify(config))
    if (!user) {
      router.push(`/login?redirect=/create-agent?config=${encoded}`)
    } else {
      router.push(`/create-agent?config=${encoded}`)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{config.name} (Unsaved)</h1>
      <p className="text-muted-foreground mt-2">{config.description}</p>

      <div className="bg-yellow-100 text-yellow-800 text-sm rounded px-4 py-3 mt-4 mb-6">
        <p>
          You are not signed in — this agent is temporary and will not be saved.{" "}
          <a href={`/login?redirect=/create-agent?config=${encodeURIComponent(JSON.stringify(config))}`} className="underline text-blue-600">
            Log in to save it
          </a>
        </p>

        <button
          onClick={handleSave}
          className="mt-3 text-sm text-blue-600 underline"
        >
          Save this agent →
        </button>
      </div>

      <ChatWindow
        agentId="preview-agent"
        userId={user?.id}
        systemPrompt={config.system_prompt || ""}
        initialMessages={[]}
      />
    </div>
  )
}
