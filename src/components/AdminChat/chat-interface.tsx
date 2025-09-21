'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Send, User } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { Conversation, Message } from '@/payload-types'

interface ChatInterfaceProps {
  conversationId: number | undefined
  messages: Message[]
  agentName: string
  onSendMessage: (content: string) => Promise<void>
  onUpdateStatus: (status: string) => Promise<void>
  conversation?: Conversation
}

export function ChatInterface({
  conversationId,
  messages,
  agentName,
  onSendMessage,
  onUpdateStatus,
  conversation,
}: ChatInterfaceProps) {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!message.trim()) return

    setIsLoading(true)
    try {
      await onSendMessage(message)
      setMessage('')
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = async (newStatus: string) => {
    try {
      await onUpdateStatus(newStatus)
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
          <div>
            <div className="font-medium">{conversation?.user_name || conversation?.user_email}</div>
            {conversation?.user_name && (
              <div className="text-sm text-muted-foreground">{conversation.user_email}</div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={conversation?.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="waiting">Waiting</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender_type === 'agent' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${msg.sender_type === 'agent' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`px-4 py-2 rounded-lg ${
                    msg.sender_type === 'agent'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {msg.sender_type === 'agent' && msg.sender_name && (
                    <p className="text-xs font-medium mb-1 opacity-70">{msg.sender_name}</p>
                  )}
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
                <p
                  className={`text-xs text-muted-foreground mt-1 ${
                    msg.sender_type === 'agent' ? 'text-right' : 'text-left'
                  }`}
                >
                  {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your response..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            className="flex-1 px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            disabled={isLoading || conversation?.status === 'closed'}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim() || isLoading || conversation?.status === 'closed'}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        {conversation?.status === 'closed' && (
          <p className="text-xs text-muted-foreground mt-2">
            This conversation is closed. Change status to reply.
          </p>
        )}
      </div>
    </div>
  )
}
