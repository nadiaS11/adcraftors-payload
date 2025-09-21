'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MessageCircle, Send, AlertCircle } from 'lucide-react'
import { ChatMessage } from './chat-message'
import { ChatHeader } from './chat-header'
import { TypingIndicator } from './typing-indicator'
import { useChat } from '@/hooks/use-chat'

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [hasStartedChat, setHasStartedChat] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const {
    messages,
    conversation,
    isLoading,
    error,
    isTyping,
    isOnline,
    isSupabaseAvailable,
    sendMessage,
    startConversation,
  } = useChat()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (message.trim() && userEmail.trim()) {
      try {
        await sendMessage(message, userEmail, userName || undefined)
        setMessage('')
        if (!hasStartedChat) {
          setHasStartedChat(true)
        }
      } catch (err) {
        console.error('Failed to send message:', err)
      }
    }
  }

  const handleStartChat = async () => {
    if (userEmail.trim()) {
      try {
        await startConversation(userEmail, userName || undefined)
        setHasStartedChat(true)
      } catch (err) {
        console.error('Failed to start chat:', err)
      }
    }
  }

  if (!isSupabaseAvailable) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-200 bg-muted hover:bg-muted/90"
          disabled
        >
          <AlertCircle className="h-6 w-6" />
        </Button>
        {isOpen && (
          <Card className="w-80 shadow-2xl mt-2">
            <div className="p-4 text-center">
              <AlertCircle className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Chat service is currently unavailable. Please contact us directly at
                <a href="mailto:nadia@gmail.com" className="text-primary hover:underline">
                  nadia@gmail.com
                </a>
              </p>
              <Button onClick={() => setIsOpen(false)} variant="outline" size="sm" className="mt-3">
                Close
              </Button>
            </div>
          </Card>
        )}
      </div>
    )
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card
        className={`w-[22rem] shadow-2xl py-0 transition-all duration-300 ${isMinimized ? 'h-14' : 'h-[30rem]'}`}
      >
        <ChatHeader
          isOnline={isOnline}
          onClose={() => setIsOpen(false)}
          onMinimize={() => setIsMinimized(!isMinimized)}
          isMinimized={isMinimized}
        />

        {!isMinimized &&
          (!hasStartedChat ? (
            <div className="p-4 space-y-4 flex-1">
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-2">Start a conversation with our team!</p>
                <p>We typically reply within a few minutes.</p>
              </div>
              {error && <div className="text-sm text-red-500 bg-red-50 p-2 rounded">{error}</div>}
              <div className="space-y-3 h-full flex flex-col max-h-64">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <Button
                  onClick={handleStartChat}
                  className="w-full mt-auto"
                  disabled={!userEmail.trim() || isLoading}
                >
                  {isLoading ? 'Starting...' : 'Start Chat'}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 p-4 h-full space-y-3 overflow-y-auto min-h-64">
                {messages.length === 0 && !isLoading && (
                  <div className="text-center text-sm text-muted-foreground py-8 flex items-center flex-col justify-center h-full">
                    <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Send a message to start the conversation!</p>
                  </div>
                )}
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t">
                {error && <div className="text-sm text-red-500 mb-2">{error}</div>}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    disabled={!message.trim() || isLoading}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ))}
      </Card>
    </div>
  )
}
