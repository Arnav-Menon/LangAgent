import { Suspense } from "react"
import LoginPageClient from "@/components/LoginPageClient"

export const dynamic = "force-dynamic"

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading login...</div>}>
      <LoginPageClient />
    </Suspense>
  )
}
