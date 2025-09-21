import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })

    // Get all conversations ordered by last activity
    const conversations = await payload.find({
      collection: 'conversations',
      sort: '-last_message_at',
      limit: 100,
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
