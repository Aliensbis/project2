import React from 'react';
import { ChatMessage } from '../../types/Chat';
import { formatDate } from '../../utils/dateUtils';

interface MessageBubbleProps {
  message: ChatMessage;
  isOwnMessage: boolean;
}

export default function MessageBubble({ message, isOwnMessage }: MessageBubbleProps) {
  return (
    <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          isOwnMessage
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        <p>{message.content}</p>
        <p className={`text-xs mt-1 ${
          isOwnMessage ? 'text-blue-100' : 'text-gray-500'
        }`}>
          {formatDate(message.createdAt)}
        </p>
      </div>
    </div>
  );
}