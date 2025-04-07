"use client"

import { useState, useEffect } from "react"

export function ChatWindow({
  agentId,
  userId,
  systemPrompt,
  initialMessages = [],
}: {
  agentId: string
  userId: string
  systemPrompt: string
  initialMessages: { role: string; content: string }[]
}) {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { role: "user", content: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-maverick:free",
        agentId,
        userId,
        messages: [
          { role: "system", content: systemPrompt },
          ...newMessages,
        ],
      }),
    })

    const data = await res.json()

    if (data?.reply?.content) {
      const assistantMsg = { role: "assistant", content: data.reply.content }
      setMessages((prev) => [...prev, assistantMsg])
    }

    setLoading(false)
  }

  return (
    <div className="mt-10 border rounded-lg p-4 max-w-2xl mx-auto">
      <div className="h-96 overflow-y-auto flex flex-col gap-4 mb-4">
        {messages.map((m, i) => (
          <div key={i} className={`text-sm ${m.role === "assistant" ? "text-blue-600" : "text-black"}`}>
            <span className="font-bold">{m.role === "assistant" ? "🤖" : "🧑"} </span>
            {m.content}
          </div>
        ))}
        {loading && <div className="text-sm text-gray-500 italic">Typing...</div>}
      </div>

      <div className="flex gap-2">
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            e.target.style.height = "auto"
            e.target.style.height = `${e.target.scrollHeight}px`
          }}
          placeholder="Type a message..."
          className="flex-1 border rounded px-3 py-2 text-sm resize-none overflow-hidden"
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-500 transition"
        >
          Send
        </button>
      </div>
    </div>
  )
}
