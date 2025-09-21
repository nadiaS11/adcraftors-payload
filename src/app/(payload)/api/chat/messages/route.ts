import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()

    const { conversation, content, sender_type, sender_name, message_type = 'text' } = body

    if (!conversation || !content || !sender_type) {
      return NextResponse.json(
        { error: 'Conversation ID, content, and sender type are required' },
        { status: 400 },
      )
    }

    // Verify the conversation exists
    const conversationDoc = await payload.findByID({
      collection: 'conversations',
      id: conversation,
    })

    if (!conversationDoc) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 })
    }

    // Create the message
    const message = await payload.create({
      collection: 'messages',
      data: {
        conversation,
        content,
        sender_type,
        sender_name,
        message_type,
        is_read: sender_type === 'user' ? false : true, // User messages start as unread
      },
    })

    return NextResponse.json({
      doc: message,
      message: 'Message sent successfully',
    })
  } catch (error) {
    console.error('Error creating message:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const { searchParams } = new URL(request.url)
    const conversationId = searchParams.get('conversation')

    if (!conversationId) {
      return NextResponse.json({ error: 'Conversation ID is required' }, { status: 400 })
    }

    const messages = await payload.find({
      collection: 'messages',
      where: {
        conversation: {
          equals: conversationId,
        },
      },
      sort: 'createdAt',
    })

    return NextResponse.json({
      docs: messages.docs,
      totalDocs: messages.totalDocs,
    })
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}
