import yaml from "js-yaml"
import { AgentConfig } from "@/types/agent"

export function parseAgentConfig(input: string): AgentConfig | null {
  try {
    return yaml.load(input) as AgentConfig
  } catch (e) {
    console.error("Failed to parse config:", e)
    return null
  }
}