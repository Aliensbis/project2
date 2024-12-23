import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import ChatWindow from './ChatWindow';

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { unreadCount } = useChat();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 z-40"
      >
        <MessageCircle className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
    </>
  );
}