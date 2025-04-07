import OpenAI from "openai"
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
})

export async function POST(req: NextRequest) {
  const { messages, model, userId, agentId } = await req.json()

  const chat = await openai.chat.completions.create({
    model,
    messages,
    stream: false,
  })

  const reply = chat.choices[0].message

  const supabase = await createClient()

  // Save user + assistant message
  await supabase.from("messages").insert([
    {
      user_id: userId,
      agent_id: agentId,
      role: "user",
      content: messages[messages.length - 1].content,
      created_at: new Date().toISOString(),
    },
    {
      user_id: userId,
      agent_id: agentId,
      role: "assistant",
      content: reply.content,
      created_at: new Date(Date.now() + 1).toISOString(), // tiny offset
    },
  ])

  return NextResponse.json({ reply })
}
