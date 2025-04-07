"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { useEffect, useMemo, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import AuthButton from "@/components/AuthButton"
import { User } from "@supabase/supabase-js"
import { AgentConfig } from "@/types/agent"

const navLinks = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/create-agent", label: "Create Agent", icon: "🧠" },
  { href: "/dashboard", label: "Dashboard", icon: "📁" },
  { href: "/admin", label: "Admin", icon: "🛠" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [agents, setAgents] = useState<AgentConfig[]>([])
  const [user, setUser] = useState<User | null>(null)

  const supabase = useMemo(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ), [])

  useEffect(() => {
    const fetchUserAndAgents = async () => {
      console.log("🔄 Fetching session...")
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
  
      if (sessionError) {
        console.error("❌ Session fetch error:", sessionError)
      }
  
      if (!session?.user) {
        console.log("⚠️ No user session found.")
        setUser(null)
        setAgents([])
        return
      }
  
      console.log("✅ Logged in as:", session.user.email)
      setUser(session.user)
  
      const { data, error } = await supabase
        .from("agents")
        .select("name, slug, user_id")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
  
      if (error) {
        console.error("❌ Error fetching agents:", error)
      } else {
        console.log("✅ Agents fetched:", data)
        setAgents(data)
      }
    }
  
    fetchUserAndAgents()
  
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      fetchUserAndAgents()
    })
  
    return () => subscription.unsubscribe()
  }, [supabase, pathname])

  return (
    <aside
      className={clsx(
        "h-screen bg-zinc-950 text-white flex flex-col justify-between border-r border-zinc-800 transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Top section */}
      <div>
        {/* Logo + toggle */}
        <div className="flex items-center justify-between px-4 py-6 border-b border-zinc-800">
          {!collapsed && <div className="text-xl font-bold tracking-tight">LangAgent</div>}
          <button
            onClick={() => setCollapsed((prev) => !prev)}
            className="text-zinc-400 hover:text-white transition"
          >
            {collapsed ? "👉" : "👈"}
          </button>
        </div>

        {/* Main nav */}
        <nav className="flex flex-col gap-1 mt-4">
          {navLinks.map(({ href, label, icon }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "flex items-center gap-3 px-4 py-2 text-sm font-medium transition-all rounded-md",
                  isActive
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                )}
              >
                <span className="text-lg">{icon}</span>
                {!collapsed && <span>{label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* My Agents */}
        {user && (
        <>
            <div className="border-t border-zinc-800 mt-6 pt-4 px-4 text-xs text-zinc-500 uppercase tracking-wider">
            {!collapsed && "My Agents"}
            </div>
            <div className="mt-2 flex flex-col gap-1">
            {agents.length === 0 && !collapsed && (
                <span className="text-sm px-4 text-zinc-500 italic">No agents yet</span>
            )}

            {agents.map((agent) => (
                <Link
                key={agent.slug}
                href={`/agent/${agent.slug}`}
                className={clsx(
                    "flex items-center px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 rounded transition",
                    pathname === `/agent/${agent.slug}` && "bg-zinc-800 text-white"
                )}
                >
                <span className="truncate">{collapsed ? "🤖" : agent.name}</span>
                </Link>
            ))}
            </div>
        </>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-800">
        {!collapsed && <AuthButton collapsed={collapsed} />}
      </div>
    </aside>
  )
}
