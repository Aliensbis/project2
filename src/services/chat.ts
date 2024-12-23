import { ref, push, set, onValue, query, orderByChild } from 'firebase/database';
import { db } from '../config/firebase';
import { ChatMessage, ChatUser } from '../types/Chat';

export const createChat = async (senderId: string, recipientId: string) => {
  const chatId = [senderId, recipientId].sort().join('-');
  const chatRef = ref(db, `chats/${chatId}`);
  
  await set(chatRef, {
    participants: [senderId, recipientId],
    createdAt: new Date().toISOString()
  });
  
  return chatId;
};

export const sendMessage = async (chatId: string, message: Omit<ChatMessage, 'id'>) => {
  const messagesRef = ref(db, `chats/${chatId}/messages`);
  const newMessageRef = push(messagesRef);
  await set(newMessageRef, message);
  return newMessageRef.key;
};

export const subscribeToChat = (chatId: string, callback: (messages: ChatMessage[]) => void) => {
  const messagesRef = ref(db, `chats/${chatId}/messages`);
  const messagesQuery = query(messagesRef, orderByChild('createdAt'));
  
  return onValue(messagesQuery, (snapshot) => {
    const messages: ChatMessage[] = [];
    snapshot.forEach((child) => {
      messages.push({
        id: child.key!,
        ...child.val()
      });
    });
    callback(messages);
  });
};

export const markMessageAsRead = async (chatId: string, messageId: string) => {
  const messageRef = ref(db, `chats/${chatId}/messages/${messageId}`);
  await set(messageRef, { read: true });
};