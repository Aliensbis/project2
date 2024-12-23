import { ref } from 'firebase/database';
import { db } from '../../config/firebase';

export const chatRefs = {
  chats: ref(db, 'chats'),
  messages: (chatId: string) => ref(db, `chats/${chatId}/messages`),
  message: (chatId: string, messageId: string) => ref(db, `chats/${chatId}/messages/${messageId}`)
};