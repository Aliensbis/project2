import React from 'react';
import { Users, UserCog } from 'lucide-react';
import { ChatUser } from '../../types/Chat';

interface ChatUserListProps {
  users: ChatUser[];
  selectedUser: ChatUser | null;
  onSelectUser: (user: ChatUser) => void;
}

export default function ChatUserList({ users, selectedUser, onSelectUser }: ChatUserListProps) {
  return (
    <div className="w-64 border-r overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-medium text-gray-900">Chat</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {users.map(user => (
          <div
            key={user.id}
            onClick={() => onSelectUser(user)}
            className={`p-4 cursor-pointer hover:bg-gray-50 ${
              selectedUser?.id === user.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              {user.role === 'admin' ? (
                <UserCog className="h-5 w-5 text-indigo-600" />
              ) : (
                <Users className="h-5 w-5 text-blue-600" />
              )}
              <div>
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">
                  {user.role === 'admin' ? 'Amministrazione' : 'Agente'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}