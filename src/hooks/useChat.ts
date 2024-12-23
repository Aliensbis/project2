import { useState, useEffect, useCallback } from 'react';
import { ChatMessage, ChatUser } from '../types/Chat';
import { useAuth } from './useAuth';
import { useAgents } from './useAgents';
import { createChat, sendMessage, subscribeToChat, markMessageAsRead } from '../services/chat';

export function useChat() {
  const { user } = useAuth();
  const { agents } = useAgents();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [availableUsers, setAvailableUsers] = useState<ChatUser[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  // Setup available users based on current user role
  useEffect(() => {
    if (!user) return;

    if (user.role === 'admin') {
      setAvailableUsers(
        agents
          .filter(agent => agent.active)
          .map(agent => ({
            id: agent.id,
            name: agent.name,
            role: 'agent'
          }))
      );
    } else if (user.role === 'production') {
      setAvailableUsers([
        { id: 'admin', name: 'Amministrazione', role: 'admin' },
        ...agents
          .filter(agent => agent.active)
          .map(agent => ({
            id: agent.id,
            name: agent.name,
            role: 'agent'
          }))
      ]);
    } else if (user.role === 'agent') {
      setAvailableUsers([
        { id: 'admin', name: 'Amministrazione', role: 'admin' },
        { id: 'production', name: 'Produzione', role: 'production' }
      ]);
    }
  }, [user, agents]);

  // Subscribe to messages when chat changes
  useEffect(() => {
    if (!currentChatId) return;

    const unsubscribe = subscribeToChat(currentChatId, (newMessages) => {
      setMessages(newMessages);
      
      // Mark unread messages as read
      newMessages
        .filter(msg => !msg.read && msg.recipientId === user?.id)
        .forEach(msg => markMessageAsRead(currentChatId, msg.id));
    });

    return () => unsubscribe();
  }, [currentChatId, user]);

  const selectUser = useCallback(async (chatUser: ChatUser) => {
    if (!user) return;
    
    setSelectedUser(chatUser);
    const chatId = [user.id, chatUser.id].sort().join('-');
    await createChat(user.id, chatUser.id);
    setCurrentChatId(chatId);
  }, [user]);

  const sendNewMessage = useCallback(async (content: string) => {
    if (!user || !selectedUser || !currentChatId) return;

    const message: Omit<ChatMessage, 'id'> = {
      senderId: user.id,
      recipientId: selectedUser.id,
      content,
      createdAt: new Date().toISOString(),
      read: false
    };

    await sendMessage(currentChatId, message);
  }, [user, selectedUser, currentChatId]);

  return {
    messages,
    availableUsers,
    selectedUser,
    selectUser,
    sendMessage: sendNewMessage
  };
}