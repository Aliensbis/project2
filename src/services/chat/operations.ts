import { push, set, onValue, query, orderByChild } from 'firebase/database';
import { ChatMessage } from '../../types/Chat';
import { chatRefs } from './refs';

export const createChat = async (senderId: string, recipientId: string) => {
  const chatId = [senderId, recipientId].sort().join('-');
  
  await set(chatRefs.messages(chatId), {
    participants: [senderId, recipientId],
    createdAt: new Date().toISOString()
  });
  
  return chatId;
};

export const sendMessage = async (chatId: string, message: Omit<ChatMessage, 'id'>) => {
  const newMessageRef = push(chatRefs.messages(chatId));
  await set(newMessageRef, message);
  return newMessageRef.key;
};

export const markMessageAsRead = async (chatId: string, messageId: string) => {
  await set(chatRefs.message(chatId, messageId), { read: true });
};