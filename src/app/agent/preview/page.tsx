import { Suspense } from "react"
import PreviewAgentPage from "@/components/PreviewAgentPage"

export const dynamic = "force-dynamic"

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading preview...</div>}>
      <PreviewAgentPage />
    </Suspense>
  )
}
