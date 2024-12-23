import React, { useState, useRef, useEffect } from 'react';
import { Send, X } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../hooks/useAuth';
import MessageList from './MessageList';
import ChatUserList from './ChatUserList';

interface ChatWindowProps {
  onClose: () => void;
  initialUserId?: string;
}

export default function ChatWindow({ onClose, initialUserId }: ChatWindowProps) {
  const { 
    availableUsers,
    selectedUser,
    messages,
    selectUser,
    sendMessage 
  } = useChat();
  
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialUserId) {
      const user = availableUsers.find(u => u.id === initialUserId);
      if (user) {
        selectUser(user);
      }
    }
  }, [initialUserId, availableUsers]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;
    
    sendMessage(selectedUser.id, newMessage.trim());
    setNewMessage('');
  };

  return (
    <div className="fixed bottom-4 right-4 w-[800px] h-[600px] bg-white rounded-lg shadow-xl z-50">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-semibold">Chat</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex h-[calc(100%-64px)]">
        <ChatUserList
          users={availableUsers}
          selectedUser={selectedUser}
          onSelectUser={selectUser}
        />

        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              <MessageList 
                messages={messages}
                messagesEndRef={messagesEndRef}
              />

              <form onSubmit={handleSubmit} className="p-4 border-t mt-auto">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Scrivi un messaggio..."
                    className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Seleziona un utente per iniziare la chat
            </div>
          )}
        </div>
      </div>
    </div>
  );
}