import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Factory, UserCog, ArrowLeft } from 'lucide-react';

interface LoginFormProps {
  role: 'production' | 'admin';
  onBack: () => void;
  onLogin: (password: string) => boolean;
}

export default function LoginForm({ role, onBack, onLogin }: LoginFormProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = onLogin(password);
      if (!success) {
        setError('Password non valida');
        setPassword('');
      }
    } catch (err) {
      setError('Si è verificato un errore durante l\'accesso');
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = role === 'production' ? Factory : UserCog;
  const title = role === 'production' ? 'Area Produzione' : 'Area Amministrazione';

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-xl shadow-lg"
    >
      <button
        onClick={onBack}
        className="flex items-center text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-1" />
        Torna alla selezione
      </button>

      <div className="flex items-center justify-center mb-8">
        <Icon className="h-16 w-16 text-blue-600" />
      </div>

      <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
        Accesso {title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                       placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              autoComplete="new-password"
              disabled={isLoading}
            />
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-600 text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md 
                   shadow-sm text-sm font-medium text-white ${
                     isLoading 
                       ? 'bg-blue-400 cursor-not-allowed' 
                       : 'bg-blue-600 hover:bg-blue-700'
                   } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            'Accedi'
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}