import { useState, useEffect, useCallback } from 'react';
import { ChatMessage } from '../types/Chat';
import { subscribeToChat, sendChatMessage } from '../services/firebase/chat';
import { useAuth } from './useAuth';

export function useRealtimeChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = subscribeToChat(setMessages);
    return () => unsubscribe();
  }, []);

  const sendMessage = useCallback((content: string) => {
    if (!user) return;

    const message: Omit<ChatMessage, 'id'> = {
      senderId: user.id,
      senderRole: user.role,
      content,
      createdAt: new Date().toISOString(),
      read: false
    };

    return sendChatMessage(message);
  }, [user]);

  return { messages, sendMessage };
}