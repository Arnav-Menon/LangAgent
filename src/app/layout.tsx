import type { Metadata } from "next"
import "./globals.css"
import { Sidebar } from "@/components/SideBar"


export const metadata: Metadata = {
  title: "LangAgent",
  description: "Build custom AI agents with code",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-background text-foreground">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 min-h-screen">{children}</main>
        </div>
      </body>
    </html>
  )
}
