import React from 'react';
import { ChatMessage } from '../../types/Chat';
import MessageBubble from './MessageBubble';

interface MessageListProps {
  messages: ChatMessage[];
  currentUserId?: string;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export default function MessageList({ 
  messages, 
  currentUserId,
  messagesEndRef 
}: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map(message => (
        <MessageBubble
          key={message.id}
          message={message}
          isOwnMessage={message.senderId === currentUserId}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}