export type AgentConfig = {
    id: string
    slug: string
    name: string
    description: string
    system_prompt: string
    tools?: string[]
    memory?: boolean
  }
  