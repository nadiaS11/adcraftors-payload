'use client'

import { useState, useEffect, useCallback } from 'react'
import { useChatContext } from '@/components/chat/chat-provider'

export const useChat = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSupabaseAvailable, setIsSupabaseAvailable] = useState(false)

  // Check if Supabase is available
  useEffect(() => {
    const checkSupabase = () => {
      const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
      const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      setIsSupabaseAvailable(hasUrl && hasKey)
    }

    checkSupabase()
  }, [])

  const context = useChatContext()

  const sendMessage = useCallback(
    async (content: string, userEmail: string, userName?: string) => {
      if (!isSupabaseAvailable) {
        setError('Chat service is not available')
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        await context.sendMessage(content, userEmail, userName)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to send message')
      } finally {
        setIsLoading(false)
      }
    },
    [context, isSupabaseAvailable],
  )

  const startConversation = useCallback(
    async (userEmail: string, userName?: string) => {
      if (!isSupabaseAvailable) {
        setError('Chat service is not available')
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        await context.startConversation(userEmail, userName)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to start conversation')
      } finally {
        setIsLoading(false)
      }
    },
    [context, isSupabaseAvailable],
  )

  return {
    ...context,
    isLoading,
    error,
    isSupabaseAvailable,
    sendMessage,
    startConversation,
  }
}
