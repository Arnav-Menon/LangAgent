"use client"

import { useSearchParams } from "next/navigation"
import { createBrowserClient } from "@supabase/ssr"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/"

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirect)}`
      }
    })
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Sign in to save your agent</h1>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500 transition"
        onClick={loginWithGoogle}
      >
        Sign in with Google
      </button>
    </div>
  )
}
