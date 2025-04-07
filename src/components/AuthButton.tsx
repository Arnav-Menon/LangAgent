"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"

export default function AuthButton({ collapsed }: { collapsed: boolean }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google", // ✅ Google login
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push("/") // Redirect to login page after sign out
  }

  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-zinc-600 rounded-full flex items-center justify-center text-sm font-bold">
        {user?.email?.[0]?.toUpperCase() || "?"}
      </div>
      {!collapsed && (
        <div className="flex flex-col text-sm">
          {user ? (
            <>
              <span className="text-zinc-400">{user.email}</span>
              <button onClick={handleSignOut} className="text-red-400 underline mt-1 text-xs">
                Log out
              </button>
            </>
          ) : (
            <button onClick={handleSignIn} className="text-blue-400 underline text-xs">
              Log in with Google
            </button>
          )}
        </div>
      )}
    </div>
  )
}
