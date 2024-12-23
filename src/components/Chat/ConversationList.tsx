import React from 'react';
import { ChatConversation } from '../../types/Chat';
import { formatDate } from '../../utils/dateUtils';

interface ConversationListProps {
  conversations: ChatConversation[];
  activeConversation: string | null;
  onSelectConversation: (id: string) => void;
}

export default function ConversationList({
  conversations,
  activeConversation,
  onSelectConversation
}: ConversationListProps) {
  return (
    <div className="w-64 border-r overflow-y-auto">
      {conversations.map(conversation => (
        <div
          key={conversation.id}
          onClick={() => onSelectConversation(conversation.id)}
          className={`p-4 cursor-pointer hover:bg-gray-50 ${
            activeConversation === conversation.id ? 'bg-blue-50' : ''
          }`}
        >
          <div className="font-medium">
            {conversation.participants[1].name}
          </div>
          {conversation.lastMessage && (
            <>
              <p className="text-sm text-gray-500 truncate">
                {conversation.lastMessage.content}
              </p>
              <p className="text-xs text-gray-400">
                {formatDate(conversation.lastMessage.createdAt)}
              </p>
            </>
          )}
          {conversation.unreadCount > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}