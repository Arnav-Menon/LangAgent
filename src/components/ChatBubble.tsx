export function ChatBubble({ role, content }: { role: string; content: string }) {
    return (
      <div className={`my-2 p-3 rounded-md ${role === "user" ? "bg-gray-100" : "bg-blue-100"}`}>
        <strong>{role === "user" ? "You" : "Agent"}:</strong>
        <div className="whitespace-pre-wrap">{content}</div>
      </div>
    )
  }
  