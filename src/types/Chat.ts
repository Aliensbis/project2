export interface ChatMessage {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface ChatUser {
  id: string;
  name: string;
  role: 'admin' | 'production' | 'agent';
}

export interface ChatNotification {
  id: string;
  chatId: string;
  message: string;
  createdAt: string;
  read: boolean;
}