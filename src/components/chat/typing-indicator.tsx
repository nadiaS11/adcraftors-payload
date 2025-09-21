"use client"

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-muted text-muted-foreground px-3 py-2 rounded-lg text-sm max-w-[80%]">
        <div className="flex items-center gap-1">
          <span className="text-xs">Agent is typing</span>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    </div>
  )
}
