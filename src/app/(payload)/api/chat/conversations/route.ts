import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()

    const { user_email, user_name, status = 'active' } = body

    if (!user_email) {
      return NextResponse.json({ error: 'User email is required' }, { status: 400 })
    }

    // Check if a conversation already exists for this email
    const existingConversations = await payload.find({
      collection: 'conversations',
      where: {
        user_email: {
          equals: user_email,
        },
        status: {
          equals: 'active',
        },
      },
      limit: 1,
    })

    if (existingConversations.docs.length > 0) {
      return NextResponse.json({
        doc: existingConversations.docs[0],
        message: 'Existing conversation found',
      })
    }

    // Create new conversation
    const conversation = await payload.create({
      collection: 'conversations',
      data: {
        user_email,
        user_name,
        status,
        metadata: {
          user_agent: request.headers.get('user-agent'),
          ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        },
      },
    })

    return NextResponse.json({
      doc: conversation,
      message: 'Conversation created successfully',
    })
  } catch (error) {
    console.error('Error creating conversation:', error)
    return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const { searchParams } = new URL(request.url)
    const userEmail = searchParams.get('user_email')

    if (!userEmail) {
      return NextResponse.json({ error: 'User email is required' }, { status: 400 })
    }

    const conversations = await payload.find({
      collection: 'conversations',
      where: {
        user_email: {
          equals: userEmail,
        },
      },
      sort: '-created_at',
    })

    return NextResponse.json({
      docs: conversations.docs,
      totalDocs: conversations.totalDocs,
    })
  } catch (error) {
    console.error('Error fetching conversations:', error)
    return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 })
  }
}
