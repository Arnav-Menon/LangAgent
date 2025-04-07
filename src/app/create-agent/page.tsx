import { Suspense } from "react"
import CreateAgentPage from "@/components/CreateAgentPage"

export const dynamic = "force-dynamic"

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading agent creator...</div>}>
      <CreateAgentPage />
    </Suspense>
  )
}
