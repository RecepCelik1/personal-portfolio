export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-muted-foreground">
          <span className="text-primary">{">"}</span>Recep_Celik
        </span>

        <div className="flex items-center gap-6">
          <span className="font-mono text-xs text-muted-foreground">
            Built with precision.
          </span>
          <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
        </div>
      </div>
    </footer>
  )
}
