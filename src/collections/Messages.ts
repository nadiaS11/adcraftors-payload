import type { CollectionConfig } from 'payload'

export const Messages: CollectionConfig = {
  slug: 'messages',
  admin: {
    useAsTitle: 'content',
    defaultColumns: ['conversation', 'sender_type', 'sender_name', 'created_at'],
    group: 'Chat',
  },
  access: {
    read: ({ req: { user } }) => {
      // Only authenticated users (admins) can read messages
      return Boolean(user)
    },
    create: () => true, // Allow anonymous users to create messages
    update: ({ req: { user } }) => {
      // Only authenticated users (admins) can update messages
      return Boolean(user)
    },
    delete: ({ req: { user } }) => {
      // Only authenticated users (admins) can delete messages
      return Boolean(user)
    },
  },
  fields: [
    {
      name: 'conversation',
      type: 'relationship',
      relationTo: 'conversations',
      required: true,
      admin: {
        description: 'The conversation this message belongs to',
      },
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      admin: {
        description: 'The message content',
      },
    },
    {
      name: 'sender_type',
      type: 'select',
      options: [
        {
          label: 'User',
          value: 'user',
        },
        {
          label: 'Agent',
          value: 'agent',
        },
      ],
      required: true,
      admin: {
        description: 'Who sent this message',
      },
    },
    {
      name: 'sender_name',
      type: 'text',
      admin: {
        description: 'Name of the sender (for user messages)',
      },
    },
    {
      name: 'sender_user',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'Admin user who sent this message (for agent messages)',
      },
    },
    {
      name: 'is_read',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Whether this message has been read',
      },
    },
    {
      name: 'message_type',
      type: 'select',
      options: [
        {
          label: 'Text',
          value: 'text',
        },
        {
          label: 'System',
          value: 'system',
        },
        {
          label: 'File',
          value: 'file',
        },
      ],
      defaultValue: 'text',
      admin: {
        description: 'Type of message',
      },
    },
    {
      name: 'attachments',
      type: 'array',
      fields: [
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'filename',
          type: 'text',
        },
        {
          name: 'size',
          type: 'number',
        },
      ],
      admin: {
        description: 'File attachments for this message',
      },
    },
  ],
  timestamps: true,
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation === 'create') {
          // Update the conversation's last_message_at timestamp
          try {
            await req.payload.update({
              collection: 'conversations',
              id: doc.conversation,
              data: {
                last_message_at: new Date().toISOString(),
              },
            })
          } catch (error) {
            console.error('Error updating conversation timestamp:', error)
          }
        }
      },
    ],
  },
}
