export function PageWrapper({ children }: { children: React.ReactNode }) {
    return (
      <div className="max-w-5xl w-full mx-auto px-6 py-12">
        {children}
      </div>
    )
  }
  