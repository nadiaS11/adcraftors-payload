"use client"

import { Button } from "@/components/ui/button"
import { X, Minimize2, Maximize2 } from "lucide-react"

interface ChatHeaderProps {
  isOnline: boolean
  onClose: () => void
  onMinimize: () => void
  isMinimized: boolean
}

export function ChatHeader({ isOnline, onClose, onMinimize, isMinimized }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-400" : "bg-gray-400"}`} />
        <div>
          <h3 className="font-medium text-sm">AdCraftors Support</h3>
          <p className="text-xs opacity-90">{isOnline ? "Online" : "Offline"}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" onClick={onMinimize} className="h-6 w-6 p-0 hover:bg-primary-foreground/20">
          {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
        </Button>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0 hover:bg-primary-foreground/20">
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
