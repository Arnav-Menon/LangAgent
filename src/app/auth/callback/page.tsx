import { Suspense } from "react"
import AuthCallbackPage from "@/components/AuthCallbackPage"

export const dynamic = "force-dynamic"

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Finishing login...</div>}>
      <AuthCallbackPage />
    </Suspense>
  )
}
