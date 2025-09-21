'use client'

import { Message } from '@/payload-types'
import { formatDistanceToNow } from 'date-fns'

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender_type === 'user'
  const timeAgo = formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`px-3 py-2 rounded-lg text-sm ${
            isUser ? 'bg-primary text-primary-foreground ml-auto' : 'bg-muted text-muted-foreground'
          }`}
        >
          {!isUser && message.sender_name && (
            <p className="text-xs font-medium mb-1 opacity-70">{message.sender_name}</p>
          )}
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        <p className={`text-xs text-muted-foreground mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {timeAgo}
        </p>
      </div>
    </div>
  )
}
