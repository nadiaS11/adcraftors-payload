import type { CollectionConfig } from 'payload'

export const Conversations: CollectionConfig = {
  slug: 'conversations',
  admin: {
    useAsTitle: 'user_email',
    defaultColumns: ['user_email', 'user_name', 'status', 'created_at'],
    group: 'Chat',
  },
  access: {
    read: ({ req: { user } }) => {
      // Only authenticated users (admins) can read conversations
      return Boolean(user)
    },
    create: () => true, // Allow anonymous users to create conversations
    update: ({ req: { user } }) => {
      // Only authenticated users (admins) can update conversations
      return Boolean(user)
    },
    delete: ({ req: { user } }) => {
      // Only authenticated users (admins) can delete conversations
      return Boolean(user)
    },
  },
  fields: [
    {
      name: 'user_email',
      type: 'email',
      required: true,
      admin: {
        description: 'Email address of the user who started the conversation',
      },
    },
    {
      name: 'user_name',
      type: 'text',
      admin: {
        description: 'Optional name of the user',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Resolved',
          value: 'resolved',
        },
        {
          label: 'Closed',
          value: 'closed',
        },
      ],
      defaultValue: 'active',
      required: true,
    },
    {
      name: 'assigned_to',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'Admin user assigned to handle this conversation',
      },
    },
    {
      name: 'last_message_at',
      type: 'date',
      admin: {
        description: 'Timestamp of the last message in this conversation',
      },
    },
    {
      name: 'metadata',
      type: 'json',
      admin: {
        description: 'Additional metadata like user agent, IP, etc.',
      },
    },
  ],
  timestamps: true,
}
