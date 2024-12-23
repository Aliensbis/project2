import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users } from 'lucide-react';
import { LoadingSpinner } from '../../common/LoadingSpinner';

interface AgentLoginFormProps {
  onBack: () => void;
  onLogin: (email: string, password: string) => void;
  error?: string;
  isLoading?: boolean;
}

export default function AgentLoginForm({ 
  onBack, 
  onLogin,
  error,
  isLoading = false 
}: AgentLoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      onLogin(email, password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <motion.button
            whileHover={{ x: -2 }}
            onClick={onBack}
            className="flex items-center text-gray-500 hover:text-gray-700 mb-8"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Torna alla selezione
          </motion.button>

          <div className="text-center mb-8">
            <Users className="h-16 w-16 text-purple-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900">
              Accesso Area Agenti
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg
                       shadow-sm text-lg font-medium text-white bg-purple-600 hover:bg-purple-700
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <LoadingSpinner /> : 'Accedi'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}