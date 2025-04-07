"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createBrowserClient } from "@supabase/ssr"

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/"

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    supabase.auth.getSession().then(() => {
      router.replace(redirect)
    })
  }, [router, redirect])

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg text-muted-foreground">Logging you in...</p>
    </div>
  )
}
