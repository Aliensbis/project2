import { onValue, query, orderByChild } from 'firebase/database';
import { ChatMessage } from '../../types/Chat';
import { chatRefs } from './refs';

export const subscribeToChat = (chatId: string, callback: (messages: ChatMessage[]) => void) => {
  const messagesQuery = query(chatRefs.messages(chatId), orderByChild('createdAt'));
  
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