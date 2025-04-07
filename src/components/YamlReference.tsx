"use client"

export default function YamlReference() {
  return (
    <div className="mt-10 border border-zinc-200 rounded p-4 bg-zinc-50 text-sm text-zinc-800 max-w-full">
      <details>
        <summary className="font-medium cursor-pointer mb-4 text-base">
          ℹ️ YAML Reference & Tools Guide
        </summary>

        {/* YAML Params Table */}
        <h3 className="font-semibold mb-2">🔧 YAML Parameters</h3>
        <div className="overflow-x-auto">
          <table className="w-full mb-6 text-left border-separate border-spacing-y-1">
            <thead>
              <tr className="text-xs uppercase text-zinc-500">
                <th>Param</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr>
                <td className="font-mono">name</td>
                <td>string</td>
                <td>The display name of the agent</td>
              </tr>
              <tr>
                <td className="font-mono">description</td>
                <td>string</td>
                <td>A short summary of the agent&apos;s purpose</td>
              </tr>
              <tr>
                <td className="font-mono">system_prompt</td>
                <td>string</td>
                <td>Defines the agent&apos;s personality, tone, and behavior</td>
              </tr>
              <tr>
                <td className="font-mono">tools</td>
                <td>array</td>
                <td>Enable features like <code>calculator</code> or <code>web-search</code></td>
              </tr>
              <tr>
                <td className="font-mono">memory</td>
                <td>boolean</td>
                <td>Should the agent remember prior messages? (`true` / `false`)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tools Table */}
        <h3 className="font-semibold mb-2">🧰 Supported Tools</h3>
        <div className="overflow-x-auto">
          <table className="w-full mb-6 text-left border-separate border-spacing-y-1">
            <thead>
              <tr className="text-xs uppercase text-zinc-500">
                <th>Tool</th>
                <th>Description</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr>
                <td className="font-mono">calculator</td>
                <td>Basic and advanced math operations</td>
                <td><code>2 * (5 + 3)</code></td>
              </tr>
              <tr>
                <td className="font-mono">web-search</td>
                <td>Fetch real-time info from the web</td>
                <td><code>latest Tesla news</code></td>
              </tr>
              <tr>
                <td className="font-mono">memory</td>
                <td>Enable memory between chats</td>
                <td><code>true</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* YAML Example */}
        <h3 className="font-semibold mb-2">📄 YAML Example</h3>
        <div className="overflow-x-auto">
          <pre className="bg-zinc-900 text-white text-xs p-4 rounded overflow-x-auto">
{`name: Research Assistant
description: Helps search and solve problems
system_prompt: You are a helpful AI assistant.
tools:
  - calculator
  - web-search
memory: true`}
          </pre>
        </div>
      </details>
    </div>
  )
}
