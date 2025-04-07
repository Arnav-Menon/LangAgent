import Link from "next/link"
import { PageWrapper } from "@/components/page-wrapper"
import { createClient } from "@/lib/supabase/server"

export default async function LandingPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
          {user
            ? `Welcome back, ${user.email?.split("@")[0]} 👋`
            : "Build & Chat with Custom AI Agents"}
        </h1>

        <p className="mt-6 text-lg text-muted-foreground">
          {user
            ? "Jump back in to create, manage, or chat with your saved agents."
            : "LangAgent lets you design, test, and deploy GPT-powered agents using simple YAML/JSON — with built-in tools, memory, and more."}
        </p>

        <div className="mt-10 flex justify-center gap-x-6">
          {user ? (
            <>
              <Link
                href="/create-agent"
                className="rounded-md bg-green-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-green-500 transition"
              >
                + New Agent
              </Link>
              <Link
                href="/dashboard"
                className="rounded-md bg-zinc-900 border border-zinc-700 px-6 py-3 text-base font-semibold text-white hover:bg-zinc-800 transition"
              >
                View Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/create-agent"
                className="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition"
              >
                🚀 Get Started
              </Link>
              <a
                href="https://github.com/yourrepo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold leading-6 hover:underline underline-offset-4"
              >
                GitHub →
              </a>
            </>
          )}
        </div>
      </div>

      <section className="mt-32 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Why LangAgent?</h2>
        <div className="grid sm:grid-cols-2 gap-8 text-left">
          <div>
            <h3 className="text-lg font-bold mb-1">🧠 Define agents with code</h3>
            <p className="text-muted-foreground text-sm">
              Use simple YAML or JSON to define prompts, tools, and behavior.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-1">💬 Real-time chat</h3>
            <p className="text-muted-foreground text-sm">
              Chat with your agents instantly, with support for GPT-4 and tools.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-1">🔧 Function calling</h3>
            <p className="text-muted-foreground text-sm">
              Easily plug in calculators, web search, or your own functions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-1">📦 Share or embed</h3>
            <p className="text-muted-foreground text-sm">
              Deploy agents and share public links — or embed them in websites.
            </p>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}



// import { createClient } from "@/lib/supabase/server"
// import { redirect } from "next/navigation"

// export default async function Home() {
//   const supabase = await createClient()

//   const {
//     data: { user },
//   } = await supabase.auth.getUser()

//   // Redirect to login if feature flag is on and user is not signed in
//   if (process.env.LOGIN_REQUIRED === "true" && !user) {
//     return redirect("/login")
//   }

//   return (
//     <main className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-3xl font-bold">Welcome to LangAgent</h1>
//       <p className="mt-4 text-muted-foreground">
//         This is your home base. Let’s build some agents.
//       </p>
//     </main>
//   )
// }
