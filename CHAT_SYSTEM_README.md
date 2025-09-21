# Live Chat System Implementation

This document describes the live chat system that has been implemented for the PayloadCMS website.

## Features

- **Anonymous Chat**: Users can start conversations without authentication
- **Real-time Messaging**: Messages are delivered in real-time using polling
- **Admin Dashboard**: Admins can manage conversations and respond to users
- **Conversation Management**: Track conversation status (active, resolved, closed)
- **Message History**: Full conversation history is preserved

## Components

### Frontend Components

- `ChatWidget`: Main chat interface for users
- `ChatProvider`: Context provider for chat state management
- `ChatMessage`: Individual message component
- `ChatHeader`: Chat widget header with controls
- `TypingIndicator`: Shows when agent is typing

### Admin Components

- `AdminChatDashboard`: Full admin interface for managing chats
- Admin API endpoints for conversation and message management

### Collections

- `Conversations`: Stores chat conversations with user info and status
- `Messages`: Stores individual messages with sender information

## API Endpoints

### Public Endpoints (for users)

- `POST /api/chat/conversations` - Start a new conversation
- `GET /api/chat/conversations?user_email=...` - Get user's conversations
- `POST /api/chat/messages` - Send a message
- `GET /api/chat/messages?conversation=...` - Get messages for a conversation

### Admin Endpoints (authenticated)

- `GET /api/chat/conversations/admin` - Get all conversations for admin
- `PATCH /api/chat/conversations/[id]` - Update conversation status
- `GET /api/chat/conversations/[id]` - Get specific conversation

## Setup Instructions

1. **Environment Variables**: Add these to your `.env.local`:

   ```
   DATABASE_URI=postgresql://username:password@localhost:5432/your_db
   PAYLOAD_SECRET=your-secret-key
   ```

2. **Database Migration**: Run the following to create the new collections:

   ```bash
   pnpm payload generate:types
   ```

3. **Admin Access**: Navigate to `/admin/chat` to access the admin dashboard

## Usage

### For Users

1. Click the chat widget in the bottom-right corner
2. Enter your email and optional name
3. Start typing messages
4. Messages are delivered in real-time

### For Admins

1. Go to `/admin/chat` in your admin panel
2. View all active conversations
3. Click on a conversation to start chatting
4. Update conversation status as needed
5. Respond to user messages

## Technical Details

- **Database**: Uses PostgreSQL with PayloadCMS collections
- **Real-time**: Currently uses polling (can be enhanced with WebSockets)
- **Authentication**: Public endpoints for users, authenticated for admins
- **State Management**: React Context for chat state
- **UI**: Built with Tailwind CSS and Radix UI components

## Future Enhancements

- WebSocket integration for true real-time messaging
- File upload support for messages
- Push notifications for new messages
- Chat analytics and reporting
- Multi-agent support
- Chat transcripts export
