import { ref, push, set, onValue, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../../config/firebase';
import { ChatMessage, ChatConversation } from '../../types/Chat';

export function subscribeToConversations(userId: string, onUpdate: (conversations: ChatConversation[]) => void) {
  const conversationsRef = ref(db, `conversations`);
  const conversationsQuery = query(conversationsRef, 
    orderByChild('participants/id'), 
    equalTo(userId)
  );
  
  return onValue(conversationsQuery, (snapshot) => {
    const conversations: ChatConversation[] = [];
    snapshot.forEach((child) => {
      conversations.push({ id: child.key!, ...child.val() });
    });
    onUpdate(conversations);
  });
}

export function subscribeToChat(conversationId: string, onUpdate: (messages: ChatMessage[]) => void) {
  const chatRef = ref(db, `chats/${conversationId}/messages`);
  const chatQuery = query(chatRef, orderByChild('createdAt'));
  
  return onValue(chatQuery, (snapshot) => {
    const messages: ChatMessage[] = [];
    snapshot.forEach((child) => {
      messages.push({ id: child.key!, ...child.val() });
    });
    onUpdate(messages.reverse());
  });
}

export function sendChatMessage(conversationId: string, message: Omit<ChatMessage, 'id'>) {
  const chatRef = ref(db, `chats/${conversationId}/messages`);
  const newMessageRef = push(chatRef);
  
  // Update last message in conversation
  const conversationRef = ref(db, `conversations/${conversationId}`);
  set(conversationRef, {
    lastMessage: {
      content: message.content,
      createdAt: new Date().toISOString()
    }
  });
  
  return set(newMessageRef, message);
}

export function createConversation(conversation: Omit<ChatConversation, 'id'>) {
  const conversationsRef = ref(db, 'conversations');
  const newConversationRef = push(conversationsRef);
  return set(newConversationRef, conversation);
}