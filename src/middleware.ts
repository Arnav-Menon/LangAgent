import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/ssr"

export async function middleware(req: NextRequest) {
  const LOGIN_REQUIRED = process.env.LOGIN_REQUIRED === "true"

  if (!LOGIN_REQUIRED) return NextResponse.next()

  const res = NextResponse.next()

  const supabase = createMiddlewareClient({
    req,
    res,
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isLoginPage = req.nextUrl.pathname === "/login"

  if (!user && !isLoginPage) {
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = "/login"
    loginUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname)

    return NextResponse.redirect(loginUrl)
  }

  return res
}

export const config = {
    matcher: [
      "/((?!_next|favicon.ico|public|api|auth|fonts).*)",
    ],
  }