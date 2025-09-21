'use client'

import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MessageCircle, Send, Circle, MoreVertical, Search, Filter, RefreshCw } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { Conversation, Message } from '@/payload-types'
import { ChatInterface } from './chat-interface'

export function AdminChatDashboard() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load conversations
  useEffect(() => {
    const loadConversations = async () => {
      try {
        const response = await fetch('/api/chat/conversations/admin')
        if (response.ok) {
          const data = await response.json()
          setConversations(data.docs || [])
        }
      } catch (error) {
        console.error('Error loading conversations:', error)
      }
    }

    loadConversations()
    const interval = setInterval(loadConversations, 5000) // Refresh every 5 seconds
    return () => clearInterval(interval)
  }, [])

  // Load messages for selected conversation
  useEffect(() => {
    if (!selectedConversation) return

    const loadMessages = async () => {
      try {
        const response = await fetch(`/api/chat/messages?conversation=${selectedConversation.id}`)
        if (response.ok) {
          const data = await response.json()
          setMessages(data.docs || [])
        }
      } catch (error) {
        console.error('Error loading messages:', error)
      }
    }

    loadMessages()
    const interval = setInterval(loadMessages, 2000) // Refresh every 2 seconds
    return () => clearInterval(interval)
  }, [selectedConversation])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages.length])

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversation: selectedConversation.id,
          content: newMessage,
          sender_type: 'agent',
        }),
      })

      if (response.ok) {
        setNewMessage('')
        // Refresh messages
        const data = await response.json()
        setMessages((prev) => [...prev, data.doc])
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = async (conversationId: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/chat/conversations/${conversationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === conversationId
              ? { ...conv, status: newStatus as 'active' | 'resolved' | 'closed' }
              : conv,
          ),
        )
        if (selectedConversation?.id === conversationId) {
          setSelectedConversation((prev) =>
            prev ? { ...prev, status: newStatus as 'active' | 'resolved' | 'closed' } : null,
          )
        }
      }
    } catch (error) {
      console.error('Error updating conversation status:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500'
      case 'resolved':
        return 'bg-blue-500'
      case 'closed':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default' as const
      case 'resolved':
        return 'secondary' as const
      case 'closed':
        return 'outline' as const
      default:
        return 'outline' as const
    }
  }

  const getUnreadCount = (_conversation: Conversation) => {
    // This would need to be calculated per conversation, but for now return 0
    // In a real implementation, you'd need to track unread counts per conversation
    return 0
  }

  // Filter conversations based on search and status
  const filteredConversations = conversations.filter((conversation) => {
    const matchesSearch =
      conversation.user_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.user_email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || conversation.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const activeConversations = conversations.filter((conv) => conv.status === 'active').length
  const totalUnread = conversations.reduce((acc, conv) => acc + getUnreadCount(conv), 0)

  return (
    <div className="flex h-screen bg-background text-gray-800">
      {/* Conversations Sidebar */}
      <div className="w-96 border-r bg-sidebar text-gray-800 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">Live Chat</h1>
            </div>
            <Button variant="outline" size="icon" className="border-border dark:border-border">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <Circle className="h-4 w-4 text-emerald-500" />
                <div>
                  <p className="text-sm font-medium">{activeConversations}</p>
                  <p className="text-xs text-muted-foreground">Active</p>
                </div>
              </div>
            </Card>
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">{totalUnread}</p>
                  <p className="text-xs text-muted-foreground">Unread</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="relative ">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 border-border text-muted-foreground"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="border-border text-muted-foreground">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conversations</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No conversations found</p>
            </div>
          ) : (
            filteredConversations.map((conversation) => {
              const unreadCount = getUnreadCount(conversation)
              return (
                <button
                  key={conversation.id}
                  type="button"
                  className={`w-full p-4 border-b  border-l-4 border-r-0 cursor-pointer transition-colors hover:bg-gray-300/20 text-left ${
                    selectedConversation?.id === conversation.id
                      ? 'bg-gray-200/30 border-l-primary'
                      : 'border-l-transparent  bg-gray-100'
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-sm truncate text-muted-foreground">
                          {conversation.user_name || 'Anonymous'}
                        </h3>
                        <div
                          className={`w-2 h-2 rounded-full ${getStatusColor(conversation.status)}`}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground truncate mb-1">
                        {conversation.user_email}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={getStatusBadgeVariant(conversation.status)}
                          className="text-xs"
                        >
                          {conversation.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(conversation.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                    {unreadCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="text-xs min-w-[20px] h-5 flex items-center justify-center"
                      >
                        {unreadCount}
                      </Badge>
                    )}
                  </div>
                </button>
              )
            })
          )}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-6 border-b bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {(selectedConversation.user_name || 'A').charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">
                      {selectedConversation.user_name || 'Anonymous User'}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {selectedConversation.user_email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Select
                    value={selectedConversation.status}
                    onValueChange={(value) => handleStatusChange(selectedConversation.id, value)}
                  >
                    <SelectTrigger className="border-border text-muted-foreground w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-muted/20">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground py-12">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender_type === 'user' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[70%] ${message.sender_type === 'user' ? 'order-1' : 'order-2'}`}
                    >
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          message.sender_type === 'user'
                            ? 'bg-background border shadow-sm'
                            : 'bg-primary text-primary-foreground'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                      <p
                        className={`text-xs text-muted-foreground mt-1 ${
                          message.sender_type === 'user' ? 'text-left' : 'text-right'
                        }`}
                      >
                        {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-3 border-t bg-card">
              <div className="flex gap-3 h-full">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="p-2 md:text-lg border-border h-10 text-muted-foreground flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || isLoading}
                  className="h-10 w-10 border-white dark:border-white"
                >
                  <Send className="h-10 w-10" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Card className="p-12 text-center max-w-md">
              <MessageCircle className="h-16 w-16 mx-auto mb-6 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Welcome to Live Chat</h3>
              <p className="text-muted-foreground">
                Select a conversation from the sidebar to start chatting with your customers.
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
