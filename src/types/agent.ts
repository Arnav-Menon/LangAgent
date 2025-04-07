export type AgentConfig = {
    name: string
    description: string
    system_prompt: string
    tools?: string[]
    memory?: boolean
  }
  