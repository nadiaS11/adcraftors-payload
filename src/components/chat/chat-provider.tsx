'use client'

import { Conversation, Message } from '@/payload-types'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

 

interface ChatContextType {
  messages: Message[]
  conversation: Conversation | null
  isTyping: boolean
  isOnline: boolean
  isLoading: boolean
  error: string | null
  sendMessage: (content: string, userEmail: string, userName?: string) => Promise<void>
  startConversation: (userEmail: string, userName?: string) => Promise<void>
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function useChatContext() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider')
  }
  return context
}

interface ChatProviderProps {
  children: ReactNode
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [isTyping] = useState(false)
  const [isOnline] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startConversation = async (userEmail: string, userName?: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/chat/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_email: userEmail,
          user_name: userName,
          status: 'active',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to start conversation')
      }

      const data = await response.json()
      setConversation(data.doc)
    } catch (error) {
      console.error('Error starting conversation:', error)
      setError(error instanceof Error ? error.message : 'Failed to start conversation')
    } finally {
      setIsLoading(false)
    }
  }

  const sendMessage = async (content: string, userEmail: string, userName?: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const currentConversation = conversation

      if (!currentConversation) {
        await startConversation(userEmail, userName)
        // Wait for conversation to be set
        return
      }

      const response = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversation: currentConversation.id,
          content,
          sender_type: 'user',
          sender_name: userName,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const data = await response.json()

      // Add the new message to the local state
      setMessages((prev) => [...prev, data.doc])
    } catch (error) {
      console.error('Error sending message:', error)
      setError(error instanceof Error ? error.message : 'Failed to send message')
    } finally {
      setIsLoading(false)
    }
  }

  // Load existing messages when conversation is set
  useEffect(() => {
    if (!conversation) return

    const loadMessages = async () => {
      try {
        const response = await fetch(`/api/chat/messages?conversation=${conversation.id}`)

        if (!response.ok) {
          throw new Error('Failed to load messages')
        }

        const data = await response.json()
        setMessages(data.docs || [])
      } catch (error) {
        console.error('Error loading messages:', error)
        setError(error instanceof Error ? error.message : 'Failed to load messages')
      }
    }

    loadMessages()
  }, [conversation])

  // Poll for new messages (simple polling for now, can be enhanced with WebSockets)
  useEffect(() => {
    if (!conversation) return

    const pollMessages = async () => {
      try {
        const response = await fetch(`/api/chat/messages?conversation=${conversation.id}`)

        if (!response.ok) {
          return
        }

        const data = await response.json()
        const newMessages = data.docs || []

        // Check if there are new messages
        if (newMessages.length > messages.length) {
          setMessages(newMessages)
        }
      } catch (error) {
        // Silently fail for polling
        console.error('Error polling messages:', error)
      }
    }

    const interval = setInterval(pollMessages, 2000) // Poll every 2 seconds
    return () => clearInterval(interval)
  }, [conversation, messages.length])

  const value: ChatContextType = {
    messages,
    conversation,
    isTyping,
    isOnline,
    isLoading,
    error,
    sendMessage,
    startConversation,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
